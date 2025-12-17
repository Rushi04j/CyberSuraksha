import { LegalStatute, findLegalProvision } from "./legal-knowledge-base"

// Intent Types
export type Intent = 'REPORT_FRAUD' | 'LEGAL_INFO' | 'PROCEDURE' | 'EVIDENCE' | 'DRAFTING' | 'RIGHTS' | 'UNKNOWN'

// Structured Response Interface
export interface AIResponse {
    text: string
    legalInfo?: LegalStatute
    steps?: string[]
    evidenceRequired?: string[]
    recommendedTool?: {
        name: string
        url: string
    }
    riskLevel?: 'Golden Hour (High Chance)' | 'Delayed (Lower Chance)' | 'Unknown'
    source: 'Official Govt Sources via VLKB' | 'General Guidance'
}

// ✅ Legacy exports to prevent errors in other files
export const knowledgeBase = [];
export const defaultAnswer = "Please contact 1930.";

// Helper to determine risk based on time (simple keyword check)
function assessRisk(input: string): AIResponse['riskLevel'] {
    const lower = input.toLowerCase()
    if (lower.includes('just now') || lower.includes('1 hour') || lower.includes('2 hour') || lower.includes('minutes') || lower.includes('moment ago')) {
        return 'Golden Hour (High Chance)'
    }
    if (lower.includes('yesterday') || lower.includes('2 days') || lower.includes('week') || lower.includes('month') || lower.includes('days ago')) {
        return 'Delayed (Lower Chance)'
    }
    return 'Unknown'
}

export const getAIResponse = (input: string): AIResponse => {
    const lowerInput = input.toLowerCase()

    // 1. Identify Crime Type using VLKB keywords
    // We use specific "trigger words" that we know exist in the VLKB keywords array to ensure a match
    let matchedStatute: LegalStatute | null = null;

    if (lowerInput.includes('money') || lowerInput.includes('fraud') || lowerInput.includes('upi') || lowerInput.includes('bank') || lowerInput.includes('paytm')) {
        matchedStatute = findLegalProvision('money') // 'money' is a keyword in VLKB
    } else if (lowerInput.includes('photo') || lowerInput.includes('video') || lowerInput.includes('harass') || lowerInput.includes('blackmail') || lowerInput.includes('nude')) {
        matchedStatute = findLegalProvision('blackmail') // 'blackmail' is a keyword
    } else if (lowerInput.includes('identity') || lowerInput.includes('fake profile') || lowerInput.includes('impersonat') || lowerInput.includes('pretending')) {
        matchedStatute = findLegalProvision('fake account') // 'fake account' is a keyword
    } else if (lowerInput.includes('police') && (lowerInput.includes('call') || lowerInput.includes('video') || lowerInput.includes('arrest'))) {
        matchedStatute = findLegalProvision('arrest') // 'arrest' is a keyword
    }

    // 2. Draft Assistance Intent
    if (lowerInput.includes('draft') || lowerInput.includes('write') || lowerInput.includes('fir') || lowerInput.includes('complaint letter')) {
        return {
            text: "I can help you draft a legally compliant FIR application. This document can be submitted to your local police station.",
            recommendedTool: {
                name: "AI FIR Drafter",
                url: "/tools/fir-drafter"
            },
            source: 'Official Govt Sources via VLKB'
        }
    }

    // 3. Digital Arrest / Fake Police Intent (Specific Override for Safety)
    if (lowerInput.includes('police calling') || lowerInput.includes('arrest') || lowerInput.includes('video call') || lowerInput.includes('cbi') || lowerInput.includes('customs')) {
        return {
            text: "STOP! Indian Police, CBI, or Customs NEVER make video calls to investigate or ask for money. This is a 'Digital Arrest' scam.",
            steps: [
                "Cut the call immediately.",
                "Do NOT transfer any money.",
                "Report the number on Chakshu Portal (Sanchar Saathi).",
                "Dial 1930 to report attempted fraud."
            ],
            recommendedTool: {
                name: "Digital Arrest Simulator (Learn More)",
                url: "/tools/digital-arrest"
            },
            source: 'Official Govt Sources via VLKB'
        }
    }

    // 4. Incident Reporting Flow (Financial/General)
    if (matchedStatute) {
        const risk = assessRisk(input)
        const refundChanceText = risk === 'Golden Hour (High Chance)'
            ? "You are within the 'Golden Hour'. Immediate reporting increases chances of freezing funds."
            : risk === 'Delayed (Lower Chance)'
                ? "Since some time has passed, immediate action is critical to trace the money trail."
                : "Timely reporting is key."

        return {
            text: `I understand you are facing a case of ${matchedStatute.crimeType}. ${refundChanceText}\n\nAccording to ${matchedStatute.sourceUrl ? 'official sources' : 'law'}, this is a punishable offense.`,
            legalInfo: matchedStatute,
            steps: [
                "Call 1930 immediately (National Cyber Crime Helpline).",
                "File a complaint at cybercrime.gov.in.",
                "Visit your nearest police station with the evidence below."
            ],
            evidenceRequired: [
                "Transaction ID / Reference Number (UTR)",
                "Screenshots of chat/messages/profiles",
                "Bank Statement highlighting the deduction",
                "Suspect's phone number/UPI ID"
            ],
            riskLevel: risk,
            source: 'Official Govt Sources via VLKB'
        }
    }

    // 5. General / Default / Rights
    if (lowerInput.includes('jurisdiction') || lowerInput.includes('refus')) {
        return {
            text: "Police cannot refuse to register your complaint based on jurisdiction. This is your right under 'Zero FIR'.",
            steps: [
                "Request them to file a 'Zero FIR'.",
                "They are legally bound to register it and transfer it to the relevant station.",
                "Cite Ministry of Home Affairs Advisory (2020)."
            ],
            source: 'Official Govt Sources via VLKB'
        }
    }

    // Fallback
    return {
        text: "I can guide you on Cybercrime laws (BNS 2023) and reporting procedures. Please describe the incident (e.g. 'UPI fraud', 'Blackmail').\n\nFor emergencies, always dial 1930.",
        source: 'General Guidance'
    }
}
