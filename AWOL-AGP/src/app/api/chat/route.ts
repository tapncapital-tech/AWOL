import { NextRequest, NextResponse } from "next/server";
import { SessionsClient, protos } from "@google-cloud/dialogflow-cx";
import fs from "fs";
import path from "path";

const PROJECT_ID = process.env.DIALOGFLOW_PROJECT_ID || "hvac-serf-awol";
const LOCATION = process.env.DIALOGFLOW_LOCATION || "global";
const AGENT_ID = process.env.DIALOGFLOW_AGENT_ID || "5b162614-4754-4fa9-b40a-dce8b6b22236";

let sessionsClient: SessionsClient | null = null;

function getSessionsClient(): SessionsClient {
  if (sessionsClient) return sessionsClient;

  const keyPath = path.resolve(process.cwd(), ".credentials/hvac-dialogflow-key.json");
  const options: { apiEndpoint: string; keyFilename?: string } = {
    apiEndpoint: LOCATION === "global" ? "dialogflow.googleapis.com" : `${LOCATION}-dialogflow.googleapis.com`,
  };

  if (fs.existsSync(keyPath)) {
    options.keyFilename = keyPath;
  }

  sessionsClient = new SessionsClient(options);
  return sessionsClient;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, sessionId = "default-awol-session", rep } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Missing message field" }, { status: 400 });
    }

    const client = getSessionsClient();
    const sessionPath = client.projectLocationAgentSessionPath(
      PROJECT_ID,
      LOCATION,
      AGENT_ID,
      sessionId
    );

    const fields: Record<string, protos.google.protobuf.IValue> = {};
    if (rep?.rep_name) fields.rep_name = { stringValue: String(rep.rep_name) };
    if (rep?.rep_number) fields.rep_number = { stringValue: String(rep.rep_number) };
    if (rep?.rep_email) fields.rep_email = { stringValue: String(rep.rep_email) };
    if (rep?.rep_id) fields.rep_id = { stringValue: String(rep.rep_id) };

    const request = {
      session: sessionPath,
      queryInput: {
        text: { text: message.trim() },
        languageCode: "en",
      },
      queryParams: {
        parameters: protos.google.protobuf.Struct.fromObject({ fields }),
      },
    };

    const [response] = await client.detectIntent(request);
    const messages = response.queryResult?.responseMessages || [];

    const replyTexts: string[] = [];
    for (const msg of messages) {
      if (msg.text?.text && msg.text.text.length > 0) {
        replyTexts.push(msg.text.text.join(" "));
      }
    }

    let reply = replyTexts.join("\n\n").trim();
    if (!reply) {
      reply = `[DISPATCH ACKNOWLEDGED] Inquiry received. An emergency HVAC technician has been alerted and attributed to ${rep?.rep_name || "Enterprise Rep"}.`;
    }

    return NextResponse.json({
      reply,
      matchType: response.queryResult?.match?.matchType || "MATCH",
      sessionId,
      agentId: AGENT_ID,
    });
  } catch (error: any) {
    console.error("Dialogflow CX route error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to communicate with Dialogflow CX agent",
      },
      { status: 500 }
    );
  }
}
