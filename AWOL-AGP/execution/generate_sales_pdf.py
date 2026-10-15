import os
import subprocess

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AWOL Autonomous AI Voice Dispatcher — Cost Per Call Analysis</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 12mm 8mm 12mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.35;
      font-size: 10px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0c2340;
      padding-bottom: 8px;
      margin-bottom: 10px;
    }
    .brand-title {
      font-size: 18px;
      font-weight: 900;
      color: #0c2340;
      letter-spacing: -0.5px;
    }
    .brand-subtitle {
      font-size: 10px;
      color: #0284c7;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-top: 1px;
    }
    .badge-live {
      display: inline-block;
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #10b981;
      padding: 3px 8px;
      border-radius: 999px;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.5px;
    }
    .doc-meta {
      text-align: right;
      font-size: 9px;
      color: #64748b;
    }
    .doc-meta strong {
      color: #0c2340;
    }

    /* Key Metrics Highlights Row */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 10px;
    }
    .kpi-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 7px 10px;
      text-align: left;
    }
    .kpi-label {
      font-size: 8px;
      font-weight: 800;
      text-transform: uppercase;
      color: #64748b;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
    }
    .kpi-value {
      font-size: 19px;
      font-weight: 900;
      color: #0c2340;
      line-height: 1.1;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    }
    .kpi-value.green {
      color: #059669;
    }
    .kpi-sub {
      font-size: 8px;
      color: #64748b;
      margin-top: 2px;
    }

    /* Section Styling */
    .section-title {
      font-size: 10.5px;
      font-weight: 800;
      color: #0c2340;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .section-title::before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 11px;
      background: #14b8a6;
      border-radius: 2px;
    }

    /* Table Styling */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
      font-size: 9.5px;
    }
    th {
      background: #0c2340;
      color: #ffffff;
      font-weight: 800;
      text-transform: uppercase;
      font-size: 8.5px;
      letter-spacing: 0.5px;
      padding: 4.5px 7px;
      text-align: left;
    }
    th.right, td.right {
      text-align: right;
    }
    td {
      padding: 4px 7px;
      border-bottom: 1px solid #e2e8f0;
      color: #1e293b;
    }
    tr:nth-child(even) td {
      background: #f8fafc;
    }
    tr.total-row td {
      background: #f0fdf4;
      border-top: 2px solid #10b981;
      border-bottom: 2px solid #10b981;
      font-weight: 900;
      font-size: 10px;
      color: #065f46;
    }
    .tag {
      display: inline-block;
      padding: 1.5px 5px;
      border-radius: 4px;
      font-size: 8px;
      font-weight: 700;
      text-transform: uppercase;
    }
    .tag-blue { background: #e0f2fe; color: #0369a1; }
    .tag-purple { background: #f3e8ff; color: #7e22ce; }
    .tag-green { background: #dcfce7; color: #15803d; }
    .tag-slate { background: #f1f5f9; color: #475569; }

    /* Visual Distribution Bar */
    .bar-container {
      margin-bottom: 10px;
      background: #f8fafc;
      padding: 7px 10px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    .progress-bar {
      display: flex;
      height: 12px;
      border-radius: 5px;
      overflow: hidden;
      margin: 5px 0;
    }
    .bar-seg {
      height: 100%;
    }
    .legend-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      font-size: 8.5px;
      margin-top: 4px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .legend-dot {
      width: 7px;
      height: 7px;
      border-radius: 2px;
    }

    /* 2 Column Comparison & Projections */
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 10px;
    }
    .box {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 8px 10px;
    }
    .box-title {
      font-size: 9.5px;
      font-weight: 800;
      color: #0c2340;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 3px;
    }

    /* Profit Strategy Card */
    .highlight-box {
      background: #0c2340;
      color: #ffffff;
      border-radius: 8px;
      padding: 8px 10px;
      margin-bottom: 8px;
    }
    .highlight-box h4 {
      font-size: 10px;
      font-weight: 900;
      color: #14e7c7;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .highlight-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-top: 6px;
      text-align: center;
    }
    .highlight-item {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(20, 231, 199, 0.25);
      border-radius: 6px;
      padding: 6px;
    }
    .highlight-item .val {
      font-size: 14px;
      font-weight: 900;
      color: #ffffff;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    }
    .highlight-item .lbl {
      font-size: 7.5px;
      color: #94a3b8;
      text-transform: uppercase;
      margin-top: 1px;
      font-weight: 700;
    }

    .footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
      display: flex;
      justify-content: space-between;
      color: #64748b;
      font-size: 8px;
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div class="header">
    <div>
      <div class="brand-title">AgentWorkforce.online (AWOL)</div>
      <div class="brand-subtitle">Commercial &amp; Residential HVAC Voice Dispatch Economics</div>
    </div>
    <div class="doc-meta">
      <div class="badge-live">EXECUTIVE SALES SHEET</div>
      <div style="margin-top: 5px;">Standard Benchmark: <strong>2-Min Call (120s)</strong></div>
      <div>Platform: <strong>Google Cloud Run &bull; Twilio &bull; Gemini</strong></div>
    </div>
  </div>

  <!-- Key Metrics Row -->
  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-label">Total Cost Per Call</div>
      <div class="kpi-value green">$0.11</div>
      <div class="kpi-sub">All infrastructure combined</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Human Call Center Cost</div>
      <div class="kpi-value">$2.85</div>
      <div class="kpi-sub">Avg outsourced answering svc</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Contractor Savings</div>
      <div class="kpi-value green">95.9%</div>
      <div class="kpi-sub">Direct gross margin advantage</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Avg Ticket Captured</div>
      <div class="kpi-value">$1,850</div>
      <div class="kpi-sub">Emergency HVAC replacement/repair</div>
    </div>
  </div>

  <!-- Detailed Cost Breakdown Table -->
  <div class="section-title">Itemized Component Cost Breakdown (Per 2-Minute Call)</div>
  <table>
    <thead>
      <tr>
        <th>Layer</th>
        <th>Service &amp; Technology</th>
        <th>Unit Pricing Standard</th>
        <th class="right">Cost / Call</th>
        <th class="right">% of Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="tag tag-blue">Telephony</span></td>
        <td><strong>Twilio Voice (Inbound)</strong></td>
        <td>$0.0085 per minute</td>
        <td class="right font-mono">$0.0170</td>
        <td class="right">15.0%</td>
      </tr>
      <tr>
        <td><span class="tag tag-blue">Audio Bridge</span></td>
        <td><strong>Twilio Media Streams (WebSocket)</strong></td>
        <td>$0.0040 per minute (raw μ-law audio)</td>
        <td class="right font-mono">$0.0080</td>
        <td class="right">7.1%</td>
      </tr>
      <tr>
        <td><span class="tag tag-purple">Speech-to-Text</span></td>
        <td><strong>Deepgram Nova-2 (Streaming)</strong></td>
        <td>$0.0043 per minute (sub-250ms STT)</td>
        <td class="right font-mono">$0.0086</td>
        <td class="right">7.6%</td>
      </tr>
      <tr>
        <td><span class="tag tag-green">AI Brain / LLM</span></td>
        <td><strong>Gemini 2.0 Flash (Reasoning &amp; Tools)</strong></td>
        <td>$0.10/1M In &bull; $0.40/1M Out (~3,000 tokens)</td>
        <td class="right font-mono">$0.0008</td>
        <td class="right">0.7%</td>
      </tr>
      <tr>
        <td><span class="tag tag-purple">Voice Audio (TTS)</span></td>
        <td><strong>Cartesia Sonic / ElevenLabs Turbo</strong></td>
        <td>$0.075 - $0.080 per 1,000 characters (~900 chars)</td>
        <td class="right font-mono">$0.0720</td>
        <td class="right">63.7%</td>
      </tr>
      <tr>
        <td><span class="tag tag-slate">Cloud Compute</span></td>
        <td><strong>Google Cloud Run Container</strong></td>
        <td>1 vCPU, 512MB RAM ($0.00002525/active sec)</td>
        <td class="right font-mono">$0.0030</td>
        <td class="right">2.6%</td>
      </tr>
      <tr>
        <td><span class="tag tag-slate">Database &amp; Logging</span></td>
        <td><strong>Cloud Firestore</strong></td>
        <td>Ticket writes + technician status reads</td>
        <td class="right font-mono">$0.0001</td>
        <td class="right">&lt; 0.1%</td>
      </tr>
      <tr>
        <td><span class="tag tag-slate">Audio Archive</span></td>
        <td><strong>Google Cloud Storage (GCS)</strong></td>
        <td>90-day retention of call audio (1.2 MB file)</td>
        <td class="right font-mono">$0.0001</td>
        <td class="right">&lt; 0.1%</td>
      </tr>
      <tr class="total-row">
        <td colspan="3"><strong>TOTAL ESTIMATED OPERATIONAL COST (PER 2-MIN CALL)</strong></td>
        <td class="right font-mono"><strong>$0.1096 (~$0.11)</strong></td>
        <td class="right"><strong>100.0%</strong></td>
      </tr>
    </tbody>
  </table>

  <!-- Cost Distribution Visual Chart -->
  <div class="bar-container">
    <div style="font-weight: 800; font-size: 10px; color: #0c2340; text-transform: uppercase; margin-bottom: 4px;">
      Expense Distribution Across Infrastructure Layers
    </div>
    <div class="progress-bar">
      <div class="bar-seg" style="width: 64%; background: #8b5cf6;" title="Voice Generation (TTS) - 64%"></div>
      <div class="bar-seg" style="width: 22%; background: #0284c7;" title="Twilio Telephony - 22%"></div>
      <div class="bar-seg" style="width: 8%; background: #a855f7;" title="Deepgram STT - 8%"></div>
      <div class="bar-seg" style="width: 3%; background: #64748b;" title="Cloud Run Compute - 3%"></div>
      <div class="bar-seg" style="width: 3%; background: #10b981;" title="AI LLM Reasoning - 3%"></div>
    </div>
    <div class="legend-grid">
      <div class="legend-item"><div class="legend-dot" style="background: #8b5cf6;"></div><span>Voice TTS: <strong>$0.072</strong> (64%)</span></div>
      <div class="legend-item"><div class="legend-dot" style="background: #0284c7;"></div><span>Twilio Voice &amp; Stream: <strong>$0.025</strong> (22%)</span></div>
      <div class="legend-item"><div class="legend-dot" style="background: #a855f7;"></div><span>Deepgram STT: <strong>$0.009</strong> (8%)</span></div>
      <div class="legend-item"><div class="legend-dot" style="background: #64748b;"></div><span>Cloud Run: <strong>$0.003</strong> (3%)</span></div>
      <div class="legend-item"><div class="legend-dot" style="background: #10b981;"></div><span>Gemini 2.0 Flash: <strong>$0.001</strong> (1%)</span></div>
    </div>
  </div>

  <!-- 2-Column: Volume Scaling & Competitor Comparison -->
  <div class="two-col">
    <!-- Volume Projections -->
    <div class="box">
      <div class="box-title">Monthly Volume &amp; Infrastructure Scale</div>
      <table style="margin-bottom: 0;">
        <thead>
          <tr>
            <th>Calls/Mo</th>
            <th>Contractor Profile</th>
            <th class="right">Total Infra Cost</th>
            <th class="right">Cost/Call</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>50</strong></td>
            <td>1-Truck Emergency Line</td>
            <td class="right font-mono">$6.65</td>
            <td class="right font-mono">$0.133</td>
          </tr>
          <tr>
            <td><strong>250</strong></td>
            <td>Mid-Sized 5-Tech Fleet</td>
            <td class="right font-mono">$28.65</td>
            <td class="right font-mono">$0.115</td>
          </tr>
          <tr>
            <td><strong>1,000</strong></td>
            <td>Commercial HVAC Operations</td>
            <td class="right font-mono">$111.15</td>
            <td class="right font-mono">$0.111</td>
          </tr>
          <tr>
            <td><strong>5,000</strong></td>
            <td>Enterprise Dispatch Center</td>
            <td class="right font-mono">$551.15</td>
            <td class="right font-mono">$0.110</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Competitive Advantage -->
    <div class="box">
      <div class="box-title">Traditional Answering vs. AWOL AI</div>
      <table style="margin-bottom: 0;">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Human Svc</th>
            <th>AWOL Dispatcher</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Cost / Call</strong></td>
            <td>$2.50 – $4.50</td>
            <td style="color: #059669; font-weight: 800;">$0.11</td>
          </tr>
          <tr>
            <td><strong>Pickup Speed</strong></td>
            <td>3 to 7 Rings</td>
            <td style="color: #059669; font-weight: 800;">1st Ring (&lt; 1.8s)</td>
          </tr>
          <tr>
            <td><strong>Dispatch Time</strong></td>
            <td>4 to 7 Mins</td>
            <td style="color: #059669; font-weight: 800;">90 – 110 Secs</td>
          </tr>
          <tr>
            <td><strong>Tech Sync</strong></td>
            <td>Manual Phone Tag</td>
            <td style="color: #059669; font-weight: 800;">Auto-Calendar Sync</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Commercial Monetization Strategy Card for Sales Team -->
  <div class="highlight-box">
    <h4>Sales Pitch &amp; Profit Monetization Model</h4>
    <p style="font-size: 10px; color: #e2e8f0; line-height: 1.4;">
      HVAC owners currently pay human call centers $300–$800/mo and still lose jobs due to hold times. 
      Selling AWOL at standard SaaS rates provides massive contractor ROI while yielding <strong>90%+ software margins</strong>:
    </p>
    <div class="highlight-grid">
      <div class="highlight-item">
        <div class="val">$499 / mo</div>
        <div class="lbl">Starter Plan (Up to 250 Calls)</div>
      </div>
      <div class="highlight-item">
        <div class="val">$999 / mo</div>
        <div class="lbl">Pro Fleet (Up to 1,000 Calls)</div>
      </div>
      <div class="highlight-item">
        <div class="val">91% &ndash; 94%</div>
        <div class="lbl">Net Gross Profit Margin</div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <div><strong>AgentWorkforce.online</strong> &bull; Confidential Sales Operations Document</div>
    <div>Generated: October 2026 &bull; Production Architecture: Cloud Run + Twilio + Gemini 2.0</div>
  </div>

</body>
</html>
"""

html_path = "/tmp/awol_sales_sheet.html"
with open(html_path, "w") as f:
    f.write(html_content)

print(f"[+] HTML written to {html_path}")

out_dirs = [
    "/Users/seku389/Desktop/AWOL/AWOL-AGP/public",
    "/Users/seku389/Desktop/AWOL",
    "/Users/seku389/.gemini/antigravity-ide/brain/25946a21-7e16-45db-b037-b61b81c641d2",
]

for d in out_dirs:
    os.makedirs(d, exist_ok=True)

target_pdf = "/Users/seku389/Desktop/AWOL/AWOL_AI_Voice_Dispatch_Cost_Analysis.pdf"
public_pdf = "/Users/seku389/Desktop/AWOL/AWOL-AGP/public/AWOL_AI_Voice_Dispatch_Cost_Analysis.pdf"
artifact_pdf = "/Users/seku389/.gemini/antigravity-ide/brain/25946a21-7e16-45db-b037-b61b81c641d2/AWOL_AI_Voice_Dispatch_Cost_Analysis.pdf"

cmd = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={target_pdf}",
    html_path,
]

print(f"[*] Running Chrome headless print: {' '.join(cmd)}")
res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

if os.path.exists(target_pdf):
    size = os.path.getsize(target_pdf)
    print(f"[✓] Successfully generated PDF at {target_pdf} ({size} bytes)")
    import shutil
    shutil.copy2(target_pdf, public_pdf)
    shutil.copy2(target_pdf, artifact_pdf)
    print(f"[✓] Copied to public web: {public_pdf}")
    print(f"[✓] Copied to artifacts: {artifact_pdf}")
else:
    print(f"[!] PDF generation failed: {res.stderr}")
