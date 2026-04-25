import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Initialize Gemini Client (optional — falls back to rule-based if key missing)
let ai = null;
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}


// ==========================================
// 1. VAULT AGENT  (Privacy-Preserving Identity Vault)
// ==========================================
// Simulated customer records — in production this hits the real vault DB.
// Verification is a fast '==' condition check.  True → verified, False → unverified.
const vaultCustomerDB = {
  "9876543210": {
    phoneNumber: "9876543210",
    name: "Ravi Kumar",
    email: "ravi.kumar@airtel.com",
    dob: "1990-01-01",
    plan: "Postpaid ₹499",
  },
  "8765432109": {
    phoneNumber: "8765432109",
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    dob: "1995-06-15",
    plan: "Prepaid ₹299",
  },
  "7654321098": {
    phoneNumber: "7654321098",
    name: "Amit Verma",
    email: "amit.v@yahoo.com",
    dob: "1988-12-03",
    plan: "Fiber ₹1099",
  },
};

/**
 * POST /api/vault/verify
 *
 * The Vault Agent.  Receives an object of attributes and verifies each
 * one against the stored record using a strict '==' comparison.
 *
 * Request body example:
 *   { "phoneNumber": "9876543210", "name": "Ravi Kumar" }
 *
 * Response:
 *   {
 *     status: "verified" | "unverified",
 *     verifiedFields: [...],
 *     unverifiedFields: [...],
 *     message: "..."
 *   }
 */
app.post('/api/vault/verify', (req, res) => {
  const attributes = req.body;
  console.log("\n🔒 [Vault Agent] Received verification request:", JSON.stringify(attributes));

  if (!attributes || Object.keys(attributes).length === 0) {
    console.log("🔒 [Vault Agent] Result: NO ATTRIBUTES PROVIDED ⚠️");
    return res.json({
      status: "unverified",
      verifiedFields: [],
      unverifiedFields: [],
      message: "No attributes were provided for verification.",
    });
  }

  // Look up the customer record by phone number first
  const phone = attributes.phoneNumber || attributes.mobile;
  const customerRecord = phone ? vaultCustomerDB[phone] : null;

  if (!customerRecord) {
    console.log("🔒 [Vault Agent] Result: CUSTOMER NOT FOUND ❌");
    return res.json({
      status: "unverified",
      verifiedFields: [],
      unverifiedFields: Object.keys(attributes),
      message: `No customer record found for phone number: ${phone || '(not provided)'}`,
    });
  }

  const verifiedFields = [];
  const unverifiedFields = [];

  // Fast '==' condition check for every submitted attribute
  for (const [key, value] of Object.entries(attributes)) {
    if (customerRecord[key] !== undefined) {
      if (customerRecord[key] === value) {
        verifiedFields.push(key);
      } else {
        unverifiedFields.push(key);
      }
    }
    // Attributes not tracked in vault are silently ignored
  }

  const isVerified = unverifiedFields.length === 0 && verifiedFields.length > 0;

  if (isVerified) {
    console.log("🔒 [Vault Agent] Result: VERIFIED ✅  Fields:", verifiedFields);
  } else {
    console.log("🔒 [Vault Agent] Result: UNVERIFIED ❌  Failed:", unverifiedFields);
  }

  return res.json({
    status: isVerified ? "verified" : "unverified",
    verifiedFields,
    unverifiedFields,
    message: isVerified
      ? "All provided attributes match the Vault records."
      : `Verification failed for: ${unverifiedFields.join(', ')}`,
  });
});


// ==========================================
// 2. ORCHESTRATOR AGENT  (Airtel Intelligent Agent)
// ==========================================

/**
 * Fallback rule-based attribute extractor.
 * Used when Gemini API key is not configured.
 */
function extractAttributesRuleBased(ticketData) {
  const attrs = {};

  // Phone number
  if (ticketData.mobile) {
    attrs.phoneNumber = ticketData.mobile.replace(/\D/g, '');
  }

  // Name
  if (ticketData.name) {
    attrs.name = ticketData.name.trim();
  }

  // Try to find an email in the message
  const emailMatch = (ticketData.message || '').match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );
  if (emailMatch) {
    attrs.email = emailMatch[0];
  }

  // Try to find a date-of-birth pattern in the message (YYYY-MM-DD or DD/MM/YYYY)
  const dobMatch = (ticketData.message || '').match(
    /\b(\d{4}-\d{2}-\d{2})\b|\b(\d{2}\/\d{2}\/\d{4})\b/
  );
  if (dobMatch) {
    attrs.dob = dobMatch[1] || dobMatch[2];
  }

  return attrs;
}

/**
 * POST /api/orchestrator/ticket
 *
 * The Airtel Agent endpoint connected to the Help Desk form.
 * Flow:
 *   1. Receives ticket data from the frontend form.
 *   2. Intelligently extracts identity attributes (via Gemini or rule-based).
 *   3. Sends those attributes to the Vault Agent via fetch for verification.
 *   4. Returns the ticket ID + vault verification result to the frontend.
 *
 * Request body:
 *   { name, mobile, issueType, message, supportOptionId?, timestamp? }
 */
app.post('/api/orchestrator/ticket', async (req, res) => {
  const ticketData = req.body;
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`🤖 [Airtel Agent] NEW TICKET RECEIVED`);
  console.log(`${'═'.repeat(60)}`);
  console.log(`   Name      : ${ticketData.name}`);
  console.log(`   Mobile    : ${ticketData.mobile}`);
  console.log(`   Issue     : ${ticketData.issueType}`);
  console.log(`   Message   : ${ticketData.message?.substring(0, 80)}...`);

  if (!ticketData.name || !ticketData.mobile) {
    return res.status(400).json({ error: "Name and mobile number are required." });
  }

  // ---- Step 1: Intelligent attribute extraction ----
  let extractedAttributes = {};

  if (ai) {
    // Use Gemini to intelligently understand the ticket
    console.log("\n🤖 [Airtel Agent] Using Gemini AI to extract identity attributes...");
    try {
      const prompt = `
You are an intelligent identity-extraction agent for the Airtel customer service portal.
Given the following support ticket data, extract ALL identity attributes that can be verified against the customer vault.

Form fields:
- Name: "${ticketData.name}"
- Mobile Number: "${ticketData.mobile}"
- Issue Type: "${ticketData.issueType}"
- Description: "${ticketData.message}"

Extract into a JSON object with these EXACT keys (only include keys that have values):
- "phoneNumber" — the 10-digit mobile number
- "name" — the customer's full name  
- "email" — email address if mentioned anywhere
- "dob" — date of birth in YYYY-MM-DD format if mentioned

Return ONLY the raw JSON object, no markdown, no explanation.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
      });

      const textOutput = response.text;
      const jsonStr = textOutput.replace(/```json\n?|\n?```|```/g, '').trim();

      try {
        extractedAttributes = JSON.parse(jsonStr);
      } catch {
        console.warn("🤖 [Airtel Agent] Gemini JSON parse failed, falling back to rule-based.");
        extractedAttributes = extractAttributesRuleBased(ticketData);
      }
    } catch (err) {
      console.warn("🤖 [Airtel Agent] Gemini call failed:", err.message, "— using rule-based.");
      extractedAttributes = extractAttributesRuleBased(ticketData);
    }
  } else {
    console.log("\n🤖 [Airtel Agent] No Gemini key — using rule-based attribute extraction.");
    extractedAttributes = extractAttributesRuleBased(ticketData);
  }

  console.log("🤖 [Airtel Agent] Extracted attributes:", JSON.stringify(extractedAttributes));

  // ---- Step 2: Ask the Vault Agent to verify (via fetch) ----
  console.log("\n🤖 [Airtel Agent] ──▶ Sending attributes to Vault Agent for verification...");
  let vaultResult;
  try {
    const vaultResponse = await fetch(`http://localhost:${PORT}/api/vault/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(extractedAttributes),
    });
    vaultResult = await vaultResponse.json();
  } catch (err) {
    console.error("🤖 [Airtel Agent] Vault Agent call failed:", err.message);
    vaultResult = { status: "error", message: "Could not reach the Vault Agent." };
  }

  console.log("🤖 [Airtel Agent] ◀── Vault Agent responded:", vaultResult.status);

  // ---- Step 3: Generate ticket ID and respond ----
  const ticketId = `SR-${Math.floor(1000000 + Math.random() * 9000000)}`;

  console.log(`\n🤖 [Airtel Agent] Ticket ${ticketId} created.`);
  console.log(`   Verification: ${vaultResult.status === 'verified' ? '✅ VERIFIED' : '❌ UNVERIFIED'}`);
  console.log(`${'═'.repeat(60)}\n`);

  return res.json({
    success: true,
    ticketId,
    message: "Your Airtel support request has been raised.",
    extractedAttributes,
    vaultVerification: vaultResult,
  });
});


// ==========================================
// 3. GENERIC ORCHESTRATOR (free-text query — kept for backward compatibility)
// ==========================================
app.post('/api/orchestrator', async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  console.log(`\n🤖 [Orchestrator] Processing query: "${query}"`);

  const fallbackAttributes = {};
  const phoneMatch = query.match(/\b(\d{10})\b/);
  if (phoneMatch) fallbackAttributes.phoneNumber = phoneMatch[1];

  if (!ai) {
    const vaultResponse = await fetch(`http://localhost:${PORT}/api/vault/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fallbackAttributes),
    });
    const vaultResult = await vaultResponse.json();
    return res.json({
      query,
      extractedAttributes: fallbackAttributes,
      vaultVerification: vaultResult,
      warning: "Used fallback extraction (no GEMINI_API_KEY).",
    });
  }

  try {
    const prompt = `
You are an intelligent entity resolution agent for Airtel customer service.
Read the following user query and extract any identity attributes into a JSON object.
Keys must be camelCase: phoneNumber, dob, email, name.
Return ONLY a raw JSON object, no markdown, no extra text.

User Query: "${query}"
`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });

    const textOutput = response.text;
    const jsonStr = textOutput.replace(/```json\n?|\n?```|```/g, '').trim();

    let extractedAttributes = {};
    try {
      extractedAttributes = JSON.parse(jsonStr);
    } catch {
      return res.status(500).json({ error: "Agent could not parse extracted attributes." });
    }

    const vaultResponse = await fetch(`http://localhost:${PORT}/api/vault/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(extractedAttributes),
    });
    const vaultResult = await vaultResponse.json();

    return res.json({ query, extractedAttributes, vaultVerification: vaultResult });
  } catch (error) {
    console.error("🤖 [Orchestrator] Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});


// ==========================================
// START SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`
${'═'.repeat(60)}
🤖  AGENTIC ORCHESTRATION SYSTEM — RUNNING
${'═'.repeat(60)}

Base URL: http://localhost:${PORT}

┌──────────────────────────────────────────────────────────┐
│ Endpoints                                                │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ 1. Airtel Agent (Help Desk Ticket Integration)           │
│    POST http://localhost:${PORT}/api/orchestrator/ticket   │
│    Body: { name, mobile, issueType, message }            │
│                                                          │
│ 2. Generic Orchestrator (free-text query)                │
│    POST http://localhost:${PORT}/api/orchestrator           │
│    Body: { "query": "..." }                              │
│                                                          │
│ 3. Vault Agent (direct verification)                     │
│    POST http://localhost:${PORT}/api/vault/verify           │
│    Body: { "phoneNumber": "...", "name": "..." }         │
│                                                          │
└──────────────────────────────────────────────────────────┘

Vault Test Customers:
  📱 9876543210 — Ravi Kumar
  📱 8765432109 — Priya Sharma
  📱 7654321098 — Amit Verma
${'═'.repeat(60)}
`);
});
