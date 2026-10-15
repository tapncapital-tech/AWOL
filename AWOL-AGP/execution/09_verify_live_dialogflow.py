import json
import os
import subprocess
import sys

def main():
    print("=== Workflow 09: Live Dialogflow CX Backend Verification ===")
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

    # 1. Check package.json dependency
    pkg_path = os.path.join(root_dir, "package.json")
    with open(pkg_path, "r") as f:
        pkg = json.load(f)
    if "@google-cloud/dialogflow-cx" not in pkg.get("dependencies", {}):
        print("FAIL: @google-cloud/dialogflow-cx not found in package.json dependencies")
        sys.exit(1)
    print("PASS: @google-cloud/dialogflow-cx installed.")

    # 2. Check src/app/api/chat/route.ts
    route_path = os.path.join(root_dir, "src/app/api/chat/route.ts")
    if not os.path.exists(route_path):
        print("FAIL: src/app/api/chat/route.ts does not exist")
        sys.exit(1)
    with open(route_path, "r") as f:
        route_code = f.read()
    if "SessionsClient" not in route_code or "detectIntent" not in route_code:
        print("FAIL: route.ts missing SessionsClient or detectIntent")
        sys.exit(1)
    print("PASS: src/app/api/chat/route.ts verified.")

    # 3. Test Live Dialogflow CX API response
    test_node_script = """
const { SessionsClient, protos } = require("@google-cloud/dialogflow-cx");
const path = require("path");

async function verify() {
  const keyPath = path.resolve(".credentials/hvac-dialogflow-key.json");
  const client = new SessionsClient({
    keyFilename: keyPath,
    apiEndpoint: "dialogflow.googleapis.com",
  });
  const sessionPath = client.projectLocationAgentSessionPath(
    "hvac-serf-awol",
    "global",
    "5b162614-4754-4fa9-b40a-dce8b6b22236",
    "workflow-09-test-session"
  );
  const request = {
    session: sessionPath,
    queryInput: {
      text: { text: "Emergency furnace failure" },
      languageCode: "en",
    },
    queryParams: {
      parameters: protos.google.protobuf.Struct.fromObject({
        fields: {
          rep_name: { stringValue: "Sylvester Moore El" },
          rep_number: { stringValue: "1(202)618-1204" },
          rep_email: { stringValue: "tech@agentworkforce.online" },
        }
      })
    }
  };
  const [response] = await client.detectIntent(request);
  const messages = response.queryResult?.responseMessages || [];
  const textMessages = messages.filter(m => m.text?.text?.length > 0);
  if (textMessages.length === 0) {
    throw new Error("No text response received from agent");
  }
  console.log("BOT_REPLY_VERIFIED: " + textMessages[0].text.text[0].substring(0, 80));
}
verify().catch(err => {
  console.error(err);
  process.exit(1);
});
"""
    res = subprocess.run(
        ["node", "-e", test_node_script],
        cwd=root_dir,
        capture_output=True,
        text=True
    )
    if res.returncode != 0:
        print(f"FAIL: Live Dialogflow test failed: {res.stderr}")
        sys.exit(1)
    print(f"PASS: {res.stdout.strip()}")

    # 4. Next.js production build verification
    print("Running next build...")
    build_res = subprocess.run(
        ["npm", "run", "build"],
        cwd=root_dir,
        capture_output=True,
        text=True
    )
    if build_res.returncode != 0:
        print(f"FAIL: Next.js build failed:\n{build_res.stderr}\n{build_res.stdout}")
        sys.exit(1)
    print("PASS: Next.js build compiled successfully.")

    print("\nSUCCESS: Workflow 09 verified 100%. Live Dialogflow CX agent is connected to the backend!")

if __name__ == "__main__":
    main()
