export interface KnowledgeItem {
    keywords: string[];
    answer: string;
}

export const knowledgeBase: KnowledgeItem[] = [
    {
        keywords: ["file", "report", "police", "complaint", "fir"],
        answer: "To file a police report (FIR), you can visit your nearest police station or use the online portal if available in your state. You will need to provide details of the incident, your identification, and any evidence you have. Under the IT Act, cybercrimes can be reported to any cyber crime cell irrespective of jurisdiction."
    },
    {
        keywords: ["anonymous", "identity", "hide", "secret"],
        answer: "Yes, you can report cybercrimes anonymously through various government portals like the National Cyber Crime Reporting Portal (cybercrime.gov.in). Our platform also provides an 'Emergency / Anonymous Report' feature for high-priority incidents where your identity remains protected."
    },
    {
        keywords: ["evidence", "proof", "screenshot", "save"],
        answer: "Crucial evidence includes screenshots of chats/posts, URLs of the content, transaction IDs for financial fraud, email headers, and device logs. Do not delete any data. Save everything on a separate drive if possible."
    },
    {
        keywords: ["bullying", "harassment", "stalking", "troll"],
        answer: "Cyberbullying and stalking are punishable offenses under Section 66A of the IT Act (for offensive messages - *subject to current legal standing*) and Section 354D of the IPC (for stalking). You should block the user, save evidence, and file a report immediately. You can also report the profile to the social media platform."
    },
    {
        keywords: ["fraud", "money", "bank", "scam", "phishing", "upi"],
        answer: "For financial fraud, call 1930 (National Cyber Crime Helpline) immediately to freeze the funds. Report the transaction to your bank and file a complaint on cybercrime.gov.in. Early reporting increases the chances of recovering your money."
    },
    {
        keywords: ["hack", "hacked", "account", "password"],
        answer: "If your account is hacked, immediately try to reset your password using the 'Forgot Password' option. Enable Two-Factor Authentication (2FA). Check your connected devices and log out of all unknown sessions. Inform your contacts not to trust messages from your account."
    },
    {
        keywords: ["rights", "lawyer", "arrest"],
        answer: "You have the right to know the grounds of arrest, the right to inform a family member, and the right to consult a lawyer (Article 22 of the Constitution). For bailable offenses, you have the right to be released on bail immediately."
    },
    {
        keywords: ["time", "long", "duration"],
        answer: "The duration of a legal case varies significantly based on complexity and court load. However, cyber cells aim for preliminary investigation within 14-30 days. Regular follow-ups with your Investigating Officer (IO) can help track progress."
    },
    {
        keywords: ["hello", "hi", "hey", "greetings"],
        answer: "Hello! I am your AI Legal Assistant. I can help you understand cyber laws, filing procedures, and safety tips. How can I assist you today?"
    },
    {
        keywords: ["thank", "thanks", "bye"],
        answer: "You're welcome! Stay safe and vigilant. Remember, 'CyberSuraksha' is always here to help."
    }
];

export const defaultAnswer = "I'm not sure about that specific query. However, generally, for any cybercrime, you should preserve evidence and contact the Cyber Crime Helpline at 1930. Could you rephrase your question with keywords like 'fraud', 'bullying', or 'filing a report'?";
