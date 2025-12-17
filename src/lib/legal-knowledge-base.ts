export interface LegalStatute {
    id: string;
    crimeType: string; // e.g., "Phishing", "Identity Theft"
    keywords: string[]; // For basic mapping
    bnsSection: string; // Bharatiya Nyaya Sanhita 2023
    itActSection: string; // IT Act 2000
    description: string; // Simple explanation
    punishment: string; // Overview of punishment
    bailable: boolean;
    cognizable: boolean;
    sourceUrl: string; // Link to official text
}

export const VLKB: LegalStatute[] = [
    {
        id: "cyber-fraud-001",
        crimeType: "Financial Fraud / Phishing",
        keywords: ["bank", "money", "upi", "paytm", "otp", "lottery", "kyc", "refund"],
        bnsSection: "Section 318 (Cheating)",
        itActSection: "Section 66C, 66D",
        description: "Whoever cheats by using a computer resource or communication device.",
        punishment: "Imprisonment up to 3 years and fine.",
        bailable: true,
        cognizable: true,
        sourceUrl: "https://www.indiacode.nic.in/handle/123456789/1362"
    },
    {
        id: "identity-theft-002",
        crimeType: "Identity Theft (Impersonation)",
        keywords: ["fake account", "profile", "photo", "impersonator", "pretending"],
        bnsSection: "Section 319 (Cheating by Personation)",
        itActSection: "Section 66C",
        description: "Fraudulently or dishonestly making use of the electronic signature, password or any other unique identification feature of any other person.",
        punishment: "Imprisonment up to 3 years and fine up to ₹1 Lakh.",
        bailable: true,
        cognizable: true,
        sourceUrl: "https://www.meity.gov.in/content/information-technology-act-2000"
    },
    {
        id: "cyber-stalking-003",
        crimeType: "Cyber Stalking / Harassment",
        keywords: ["stalking", "harassment", "messages", "following", "threats", "women"],
        bnsSection: "Section 78 (Stalking)",
        itActSection: "Section 67",
        description: "Monitoring the use by a woman of the internet, email or any other form of electronic communication.",
        punishment: "First conviction: Imprisonment up to 3 years + fine.",
        bailable: true,
        cognizable: true,
        sourceUrl: "https://www.mha.gov.in/sites/default/files/2023-01/BNS-2023.pdf"
    },
    {
        id: "sextortion-004",
        crimeType: "Sextortion / Obscene Content",
        keywords: ["nude", "video call", "blackmail", "porn", "obscene", "private photos"],
        bnsSection: "Section 308 (Extortion)",
        itActSection: "Section 67A",
        description: "Publishing or transmitting of material containing sexually explicit act, etc., in electronic form.",
        punishment: "Imprisonment up to 5 years and fine up to ₹10 Lakhs.",
        bailable: false,
        cognizable: true,
        sourceUrl: "https://cybercrime.gov.in"
    },
    {
        id: "digital-arrest-005",
        crimeType: "Digital Arrest Scam (Impersonating Public Servant)",
        keywords: ["police", "cbi", "arrest", "skype", "video call", "customs", "fedex"],
        bnsSection: "Section 204 (Personating a public servant)",
        itActSection: "Section 66D",
        description: "Falsely pretending to be a public servant (Police, CBI, Customs) to intimidate and extort money.",
        punishment: "Imprisonment up to 2 years.",
        bailable: true,
        cognizable: true,
        sourceUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2015694"
    }
];

export function findLegalProvision(text: string): LegalStatute | null {
    const lowerText = text.toLowerCase();
    // Simple keyword matching for now (Deterministic)
    // In a real government system, this would be a more advanced NLP classifier trained on legal datasets
    // But it MUST map back to these static IDs.

    let bestMatch: LegalStatute | null = null;
    let maxMatches = 0;

    for (const statute of VLKB) {
        let matches = 0;
        for (const keyword of statute.keywords) {
            if (lowerText.includes(keyword)) {
                matches++;
            }
        }
        if (matches > maxMatches) {
            maxMatches = matches;
            bestMatch = statute;
        }
    }

    return bestMatch;
}
