"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Folder,
  Brain,
  MapPin,
  Scale,
  FileDown,
  MessageSquare,
  Menu,
  X,
  AlertCircle,
  CheckCircle,
  MapIcon,
  Phone,
  Mail,
  Globe,
  Loader,
  Plus,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const translations = {
  en: {
    welcome: "Welcome to CyberSuraksha",
    subtitle: "Your Cybersecurity Complaint Platform",
    fileComplaint: "File Complaint",
    myComplaints: "My Complaints",
    aiClassifier: "AI Classifier",
    nearbyHelp: "Nearby Help",
    legalOptions: "Legal Options",
    exportPDF: "Export as PDF",
    safetyTips: "Safety Tips",
    dashboard: "Dashboard",
    newComplaint: "New Complaint",
    fileNewComplaint: "File a New Complaint",
    title: "Title",
    description: "Description",
    category: "Category",
    location: "Location",
    submitComplaint: "Submit Complaint",
    complaintSubmitted: "Complaint filed successfully. Police notified.",
    referenceID: "Reference ID: CS-2024-001",
    myComplaintsList: "My Complaints",
    viewComplaints: "View your filed complaints",
    complaintID: "Complaint ID",
    status: "Status",
    date: "Date",
    analyzeText: "Analyze Text",
    fraudClassifier: "AI Fraud Classifier",
    analyzeDescription: "Analyze text or upload files to detect fraud types",
    pasteText: "Paste suspicious text here...",
    analyze: "Analyze",
    analysisResult: "Analysis Result",
    fraudType: "Fraud Type",
    confidence: "Confidence",
    rationale: "Rationale",
    languageDetected: "Language Detected",
    uploadFile: "Upload File",
    dragDrop: "Drag and drop or click to upload",
    nearbyHelpTitle: "Nearby Help",
    findHelp: "Find nearest police stations and cyber lawyers",
    nearestPolice: "Nearest Police Station",
    nearbyCyberLawyer: "Nearby Cyber Lawyer",
    distanceAway: "away",
    address: "Address",
    phone: "Phone",
    legalTitle: "Legal Options",
    understandRights: "Understand your rights and legal remedies",
    legalFramework: "Legal Framework",
    yourRights: "Your Rights",
    itAct: "Information Technology Act, 2000",
    ipcSections: "Indian Penal Code Sections 420, 468",
    consumerAct: "Consumer Protection Act, 2019",
    fileIFR: "Right to file FIR",
    compensation: "Right to compensation",
    legalRepresentation: "Right to legal representation",
    contactLegal: "Contact Legal Support",
    safetyTipsTitle: "Safety Tips",
    learnProtect: "Learn how to protect yourself online",
    nextTip: "Next Tip →",
    strongPasswords: "Strong Passwords",
    passwordDesc: "Use 12+ characters with mixed case, numbers, and symbols.",
    enable2FA: "Enable 2FA",
    twoFADesc: "Two-factor authentication adds an extra security layer.",
    verifyURLs: "Verify URLs",
    urlDesc: "Always check the URL before entering sensitive information.",
    updateSoftware: "Update Software",
    softwareDesc: "Keep your OS and applications updated for security patches.",
    activeComplaints: "Active Complaints",
    resolvedCases: "Resolved Cases",
    pendingReview: "Pending Review",
    language: "Language",
    fileUpload: "File Upload",
    knowledgeMore: "Know More",
    connect: "Connect",
    cyberCrimeLegal: "Cyber Crime Legal Advisory",
    cyberCrimeLegalDesc: "Get free consultation for victims of cyber crimes",
    digitalEvidence: "Digital Evidence Verification",
    digitalEvidenceDesc: "Verify screenshots or files for legal use",
    cyberLawyer: "Cyber Cell Lawyer Connect",
    cyberLawyerDesc: "Book a consultation with a certified cyber lawyer",
    onlineFIR: "Online FIR Assistance",
    onlineFIRDesc: "Step-by-step FIR filing help and guidance",
    legalAwareness: "Legal Awareness Guide",
    legalAwarenessDesc: "Downloadable PDF about rights and procedures",
    cyberLawResources: "Cyber Law Resources",
    cyberLawResourcesDesc: "Quick access to IT Act Sections (66A, 67, 72, etc.)",
    proBonoSupport: "Pro Bono Legal Support",
    proBonoSupportDesc: "Volunteer lawyers for low-income victims",
    victimCompensation: "Victim Compensation Information",
    victimCompensationDesc: "Learn about government aid schemes",
    dataProtection: "Data Protection and Privacy Consulting",
    dataProtectionDesc: "Guidance on data misuse or leaks",
    close: "Close",
    selectCategory: "Select a category",
    financialFraud: "Financial Fraud / Online Scam",
    otpFraud: "OTP / UPI Fraud",
    cyberHarassment: "Cyber Harassment",
    cyberstalking: "Cyberstalking",
    identityTheft: "Identity Theft",
    impersonation: "Impersonation / Fake Profile",
    phishing: "Phishing / Spam Links",
    blackmail: "Blackmail / Extortion",
    defamation: "Defamation / Reputation Damage",
    hacking: "Hacking / Unauthorized Access",
    dataBreach: "Data Breach",
    jobScam: "Job / Lottery / Loan Scam",
    socialMediaMisuse: "Social Media Misuse",
    childExploitation: "Child Exploitation / Obscene Content",
    other: "Other (Custom Description)",
    analyzing: "Analyzing...",
    loading: "Loading...",
  },
  hi: {
    welcome: "CyberSuraksha में आपका स्वागत है",
    subtitle: "आपका साइबर सुरक्षा शिकायत मंच",
    fileComplaint: "शिकायत दर्ज करें",
    myComplaints: "मेरी शिकायतें",
    aiClassifier: "एआई वर्गीकरण",
    nearbyHelp: "पास की मदद",
    legalOptions: "कानूनी विकल्प",
    exportPDF: "पीडीएफ के रूप में निर्यात करें",
    safetyTips: "सुरक्षा सुझाव",
    dashboard: "डैशबोर्ड",
    newComplaint: "नई शिकायत",
    fileNewComplaint: "नई शिकायत दर्ज करें",
    title: "शीर्षक",
    description: "विवरण",
    category: "श्रेणी",
    location: "स्थान",
    submitComplaint: "शिकायत जमा करें",
    complaintSubmitted: "शिकायत सफलतापूर्वक दर्ज हुई। पुलिस को सूचित किया गया।",
    referenceID: "संदर्भ आईडी: CS-2024-001",
    myComplaintsList: "मेरी शिकायतें",
    viewComplaints: "अपनी दर्ज की गई शिकायतें देखें",
    complaintID: "शिकायत आईडी",
    status: "स्थिति",
    date: "तारीख",
    analyzeText: "पाठ का विश्लेषण करें",
    fraudClassifier: "एआई धोखाधड़ी वर्गीकरण",
    analyzeDescription: "धोखाधड़ी के प्रकार का पता लगाने के लिए पाठ का विश्लेषण करें",
    pasteText: "संदिग्ध पाठ यहाँ पेस्ट करें...",
    analyze: "विश्लेषण करें",
    analysisResult: "विश्लेषण परिणाम",
    fraudType: "धोखाधड़ी का प्रकार",
    confidence: "आत्मविश्वास",
    rationale: "तर्क",
    languageDetected: "भाषा का पता चला",
    uploadFile: "फाइल अपलोड करें",
    dragDrop: "खींचें और छोड़ें या अपलोड करने के लिए क्लिक करें",
    nearbyHelpTitle: "पास की मदद",
    findHelp: "निकटतम पुलिस स्टेशन और साइबर वकील खोजें",
    nearestPolice: "निकटतम पुलिस स्टेशन",
    nearbyCyberLawyer: "पास का साइबर वकील",
    distanceAway: "दूर",
    address: "पता",
    phone: "फोन",
    legalTitle: "कानूनी विकल्प",
    understandRights: "अपने अधिकारों और कानूनी उपचारों को समझें",
    legalFramework: "कानूनी ढांचा",
    yourRights: "आपके अधिकार",
    itAct: "सूचना प्रौद्योगिकी अधिनियम, 2000",
    ipcSections: "भारतीय दंड संहिता धारा 420, 468",
    consumerAct: "उपभोक्ता संरक्षण अधिनियम, 2019",
    fileIFR: "एफआईआर दर्ज करने का अधिकार",
    compensation: "मुआवजे का अधिकार",
    legalRepresentation: "कानूनी प्रतिनिधित्व का अधिकार",
    contactLegal: "कानूनी सहायता से संपर्क करें",
    safetyTipsTitle: "सुरक्षा सुझाव",
    learnProtect: "ऑनलाइन अपनी सुरक्षा कैसे करें यह जानें",
    nextTip: "अगला सुझाव →",
    strongPasswords: "मजबूत पासवर्ड",
    passwordDesc: "12+ वर्णों का उपयोग करें जिसमें मिश्रित केस, संख्याएं और प्रतीक हों।",
    enable2FA: "2FA सक्षम करें",
    twoFADesc: "दो-कारक प्रमाणीकरण एक अतिरिक्त सुरक्षा परत जोड़ता है।",
    verifyURLs: "यूआरएल सत्यापित करें",
    urlDesc: "संवेदनशील जानकारी दर्ज करने से पहले हमेशा यूआरएल की जांच करें।",
    updateSoftware: "सॉफ्टवेयर अपडेट करें",
    softwareDesc: "सुरक्षा पैच के लिए अपने ओएस और एप्लिकेशन को अपडेट रखें।",
    activeComplaints: "सक्रिय शिकायतें",
    resolvedCases: "समाधान किए गए मामले",
    pendingReview: "समीक्षा के लिए लंबित",
    language: "भाषा",
    fileUpload: "फाइल अपलोड",
    knowledgeMore: "और जानें",
    connect: "जुड़ें",
    cyberCrimeLegal: "साइबर अपराध कानूनी सलाह",
    cyberCrimeLegalDesc: "साइबर अपराध के पीड़ितों के लिए मुफ्त परामर्श प्राप्त करें",
    digitalEvidence: "डिजिटल साक्ष्य सत्यापन",
    digitalEvidenceDesc: "कानूनी उपयोग के लिए स्क्रीनशॉट या फाइलों को सत्यापित करें",
    cyberLawyer: "साइबर सेल वकील कनेक्ट",
    cyberLawyerDesc: "प्रमाणित साइबर वकील के साथ परामर्श बुक करें",
    onlineFIR: "ऑनलाइन एफआईआर सहायता",
    onlineFIRDesc: "चरण-दर-चरण एफआईआर दाखिल करने में मदद",
    legalAwareness: "कानूनी जागरूकता गाइड",
    legalAwarenessDesc: "अधिकारों और प्रक्रियाओं के बारे में डाउनलोड करने योग्य पीडीएफ",
    cyberLawResources: "साइबर कानून संसाधन",
    cyberLawResourcesDesc: "आईटी अधिनियम धारा (66A, 67, 72, आदि) तक त्वरित पहुंच",
    proBonoSupport: "प्रो बोनो कानूनी सहायता",
    proBonoSupportDesc: "कम आय वाले पीड़ितों के लिए स्वेच्छा से वकील",
    victimCompensation: "पीड़ित मुआवजा जानकारी",
    victimCompensationDesc: "सरकारी सहायता योजनाओं के बारे में जानें",
    dataProtection: "डेटा सुरक्षा और गोपनीयता परामर्श",
    dataProtectionDesc: "डेटा दुरुपयोग या रिसाव पर मार्गदर्शन",
    close: "बंद करें",
    selectCategory: "एक श्रेणी चुनें",
    financialFraud: "वित्तीय धोखाधड़ी / ऑनलाइन घोटाला",
    otpFraud: "ओटीपी / यूपीआई धोखाधड़ी",
    cyberHarassment: "साइबर उत्पीड़न",
    cyberstalking: "साइबर स्टॉकिंग",
    identityTheft: "पहचान की चोरी",
    impersonation: "प्रतिरूपण / नकली प्रोफाइल",
    phishing: "फिशिंग / स्पैम लिंक",
    blackmail: "ब्लैकमेल / जबरदस्ती",
    defamation: "मानहानि / प्रतिष्ठा को नुकसान",
    hacking: "हैकिंग / अनधिकृत पहुंच",
    dataBreach: "डेटा ब्रीच",
    jobScam: "नौकरी / लॉटरी / ऋण घोटाला",
    socialMediaMisuse: "सोशल मीडिया का दुरुपयोग",
    childExploitation: "बाल शोषण / अश्लील सामग्री",
    other: "अन्य (कस्टम विवरण)",
    analyzing: "विश्लेषण जारी है...",
    loading: "लोड हो रहा है...",
  },
  mr: {
    welcome: "CyberSuraksha मध्ये आपले स्वागत आहे",
    subtitle: "आपला साइबर सुरक्षा तक्रार प्लॅटफॉर्म",
    fileComplaint: "तक्रार दाखल करा",
    myComplaints: "माझ्या तक्रारी",
    aiClassifier: "एआई वर्गीकरण",
    nearbyHelp: "जवळपास मदत",
    legalOptions: "कायदेशीर पर्याय",
    exportPDF: "पीडीएफ म्हणून निर्यात करा",
    safetyTips: "सुरक्षा टिप्स",
    dashboard: "डॅशबोर्ड",
    newComplaint: "नवीन तक्रार",
    fileNewComplaint: "नवीन तक्रार दाखल करा",
    title: "शीर्षक",
    description: "वर्णन",
    category: "श्रेणी",
    location: "स्थान",
    submitComplaint: "तक्रार सबमिट करा",
    complaintSubmitted: "तक्रार यशस्वीरित्या दाखल झाली। पोलिसांना सूचित केले गेले।",
    referenceID: "संदर्भ आयडी: CS-2024-001",
    myComplaintsList: "माझ्या तक्रारी",
    viewComplaints: "आपल्या दाखल केलेल्या तक्रारी पहा",
    complaintID: "तक्रार आयडी",
    status: "स्थिती",
    date: "तारीख",
    analyzeText: "मजकूर विश्लेषण करा",
    fraudClassifier: "एआई फ्रॉड वर्गीकरण",
    analyzeDescription: "फ्रॉड प्रकार शोधण्यासाठी मजकूर विश्लेषण करा",
    pasteText: "संदिग्ध मजकूर येथे पेस्ट करा...",
    analyze: "विश्लेषण करा",
    analysisResult: "विश्लेषण परिणाम",
    fraudType: "फ्रॉड प्रकार",
    confidence: "आत्मविश्वास",
    rationale: "तर्क",
    languageDetected: "भाषा शोधली गेली",
    uploadFile: "फाइल अपलोड करा",
    dragDrop: "ड्रॅग आणि ड्रॉप करा किंवा अपलोड करण्यासाठी क्लिक करा",
    nearbyHelpTitle: "जवळपास मदत",
    findHelp: "जवळचे पोलिस स्टेशन आणि साइबर वकील शोधा",
    nearestPolice: "जवळचे पोलिस स्टेशन",
    nearbyCyberLawyer: "जवळचा साइबर वकील",
    distanceAway: "दूर",
    address: "पत्ता",
    phone: "फोन",
    legalTitle: "कायदेशीर पर्याय",
    understandRights: "आपल्या अधिकार आणि कायदेशीर उपचार समजून घ्या",
    legalFramework: "कायदेशीर फ्रेमवर्क",
    yourRights: "आपले अधिकार",
    itAct: "माहिती तंत्रज्ञान अधिनियम, 2000",
    ipcSections: "भारतीय दंड संहिता कलम 420, 468",
    consumerAct: "ग्राहक संरक्षण अधिनियम, 2019",
    fileIFR: "एफआयआर दाखल करण्याचा अधिकार",
    compensation: "नुकसान भरपाईचा अधिकार",
    legalRepresentation: "कायदेशीर प्रतिनिधित्वाचा अधिकार",
    contactLegal: "कायदेशीर सहाय्यासाठी संपर्क करा",
    safetyTipsTitle: "सुरक्षा टिप्स",
    learnProtect: "ऑनलाइन स्वतःची सुरक्षा कशी करावी हे जाणून घ्या",
    nextTip: "पुढील टिप →",
    strongPasswords: "मजबूत पासवर्ड",
    passwordDesc: "12+ वर्णांचा वापर करा ज्यामध्ये मिश्रित केस, संख्या आणि चिन्हे असतील।",
    enable2FA: "2FA सक्षम करा",
    twoFADesc: "दोन-घटक प्रमाणीकरण अतिरिक्त सुरक्षा स्तर जोडते।",
    verifyURLs: "यूआरएल सत्यापित करा",
    urlDesc: "संवेदनशील माहिती प्रविष्ट करण्यापूर्वी नेहमी यूआरएल तपासा।",
    updateSoftware: "सॉफ्टवेअर अपडेट करा",
    softwareDesc: "सुरक्षा पॅच्सच्या लिए आपल्या ओएस आणि अनुप्रयोग अपडेट ठेवा।",
    activeComplaints: "सक्रिय तक्रारी",
    resolvedCases: "सोडवलेले प्रकरण",
    pendingReview: "समीक्षेसाठी प्रलंबित",
    language: "भाषा",
    fileUpload: "फाइल अपलोड",
    knowledgeMore: "अधिक जाणून घ्या",
    connect: "जुळवा",
    cyberCrimeLegal: "साइबर अपराध कायदेशीर सल्ला",
    cyberCrimeLegalDesc: "साइबर अपराधाच्या पीडितांसाठी मुक्त सल्ला मिळवा",
    digitalEvidence: "डिजिटल पुरावा सत्यापन",
    digitalEvidenceDesc: "कायदेशीर वापरासाठी स्क्रीनशॉट किंवा फाइलांची पडताळणी करा",
    cyberLawyer: "साइबर सेल वकील कनेक्ट",
    cyberLawyerDesc: "प्रमाणित साइबर वकीलांशी सल्ला बुक करा",
    onlineFIR: "ऑनलाइन एफआयआर सहायता",
    onlineFIRDesc: "चरण-दर-चरण एफआयआर दाखल करण्यात मदत",
    legalAwareness: "कायदेशीर जागरूकता मार्गदर्शक",
    legalAwarenessDesc: "अधिकार आणि प्रक्रियांबद्दल डाउनलोड करण्यायोग्य पीडीएफ",
    cyberLawResources: "साइबर कायदा संसाधने",
    cyberLawResourcesDesc: "आयटी कायदा विभाग (66A, 67, 72, इ.) तक त्वरित प्रवेश",
    proBonoSupport: "प्रो बोनो कायदेशीर सहायता",
    proBonoSupportDesc: "कमी उत्पन्न असलेल्या पीडितांसाठी स्वेच्छा वकील",
    victimCompensation: "पीडित मुआवजा माहिती",
    victimCompensationDesc: "सरकारी मदत योजनांबद्दल जाणून घ्या",
    dataProtection: "डेटा संरक्षण आणि गोपनीयता सल्ला",
    dataProtectionDesc: "डेटा दुरुपयोग किंवा गळती बद्दल मार्गदर्शन",
    close: "बंद करा",
    selectCategory: "एक श्रेणी निवडा",
    financialFraud: "आर्थिक फ्रॉड / ऑनलाइन घोटाळा",
    otpFraud: "ओटीपी / यूपीआय फ्रॉड",
    cyberHarassment: "साइबर छळ",
    cyberstalking: "साइबर स्टॉकिंग",
    identityTheft: "ओळख चोरी",
    impersonation: "प्रतिरूपण / खोटा प्रोफाइल",
    phishing: "फिशिंग / स्पॅम लिंक",
    blackmail: "ब्लॅकमेल / जबरदस्ती",
    defamation: "मानहानि / प्रतिष्ठा नुकसान",
    hacking: "हॅकिंग / अनधिकृत प्रवेश",
    dataBreach: "डेटा ब्रीच",
    jobScam: "नोकरी / लॉटरी / कर्ज घोटाळा",
    socialMediaMisuse: "सोशल मीडिया दुरुपयोग",
    childExploitation: "बाल शोषण / अश्लील सामग्री",
    other: "इतर (कस्टम विवरण)",
    analyzing: "विश्लेषण सुरू आहे...",
    loading: "लोड होत आहे...",
  },
  bn: {
    welcome: "CyberSuraksha তে আপনাকে স্বাগতম",
    subtitle: "আপনার সাইবার নিরাপত্তা অভিযোগ প্ল্যাটফর্ম",
    fileComplaint: "অভিযোগ দাখিল করুন",
    myComplaints: "আমার অভিযোগ",
    aiClassifier: "এআই শ্রেণীবিভাগ",
    nearbyHelp: "কাছাকাছি সাহায্য",
    legalOptions: "আইনি বিকল্প",
    exportPDF: "পিডিএফ হিসাবে রপ্তানি করুন",
    safetyTips: "নিরাপত্তা টিপস",
    dashboard: "ড্যাশবোর্ড",
    newComplaint: "নতুন অভিযোগ",
    fileNewComplaint: "নতুন অভিযোগ দাখিল করুন",
    title: "শিরোনাম",
    description: "বর্ণনা",
    category: "বিভাগ",
    location: "অবস্থান",
    submitComplaint: "অভিযোগ জমা দিন",
    complaintSubmitted: "অভিযোগ সফলভাবে দাখিল করা হয়েছে। পুলিশকে অবহিত করা হয়েছে।",
    referenceID: "রেফারেন্স আইডি: CS-2024-001",
    myComplaintsList: "আমার অভিযোগ",
    viewComplaints: "আপনার দাখিল করা অভিযোগ দেখুন",
    complaintID: "অভিযোগ আইডি",
    status: "অবস্থা",
    date: "তারিখ",
    analyzeText: "পাঠ্য বিশ্লেষণ করুন",
    fraudClassifier: "এআই জালিয়াতি শ্রেণীবিভাগ",
    analyzeDescription: "জালিয়াতির ধরন সনাক্ত করতে পাঠ্য বিশ্লেষণ করুন",
    pasteText: "সন্দেহজনক পাঠ্য এখানে পেস্ট করুন...",
    analyze: "বিশ্লেষণ করুন",
    analysisResult: "বিশ্লেষণ ফলাফল",
    fraudType: "জালিয়াতির ধরন",
    confidence: "আত্মবিশ্বাস",
    rationale: "যুক্তি",
    languageDetected: "ভাষা সনাক্ত করা হয়েছে",
    uploadFile: "ফাইল আপলোড করুন",
    dragDrop: "টেনে আনুন এবং ছেড়ে দিন বা আপলোড করতে ক্লিক করুন",
    nearbyHelpTitle: "কাছাকাছি সাহায্য",
    findHelp: "নিকটতম পুলিশ স্টেশন এবং সাইবার আইনজীবী খুঁজুন",
    nearestPolice: "নিকটতম পুলিশ স্টেশন",
    nearbyCyberLawyer: "কাছাকাছি সাইবার আইনজীবী",
    distanceAway: "দূরে",
    address: "ঠিকানা",
    phone: "ফোন",
    legalTitle: "আইনি বিকল্প",
    understandRights: "আপনার অধিকার এবং আইনি প্রতিকার বুঝুন",
    legalFramework: "আইনি কাঠামো",
    yourRights: "আপনার অধিকার",
    itAct: "তথ্য প্রযুক্তি আইন, 2000",
    ipcSections: "ভারতীয় দণ্ড সংহিতা ধারা 420, 468",
    consumerAct: "ভোক্তা সুরক্ষা আইন, 2019",
    fileIFR: "এফআইআর দাখিল করার অধিকার",
    compensation: "ক্ষতিপূরণের অধিকার",
    legalRepresentation: "আইনি প্রতিনিধিত্বের অধিকার",
    contactLegal: "আইনি সহায়তার সাথে যোগাযোগ করুন",
    safetyTipsTitle: "নিরাপত্তা টিপস",
    learnProtect: "অনলাইনে নিজেকে কীভাবে রক্ষা করতে হয় তা শিখুন",
    nextTip: "পরবর্তী টিপ →",
    strongPasswords: "শক্তিশালী পাসওয়ার্ড",
    passwordDesc: "12+ অক্ষর ব্যবহার করুন যাতে মিশ্র কেস, সংখ্যা এবং প্রতীক থাকে।",
    enable2FA: "2FA সক্ষম করুন",
    twoFADesc: "দুই-ফ্যাক্টর প্রমাণীকরণ একটি অতিরিক্ত নিরাপত্তা স্তর যোগ করে।",
    verifyURLs: "ইউআরএল যাচাই করুন",
    urlDesc: "সংবেদনশীল তথ্য প্রবেশ করার আগে সর্বদা ইউআরএল পরীক্ষা করুন।",
    updateSoftware: "সফটওয়্যার আপডেট করুন",
    softwareDesc: "নিরাপত্তা প্যাচের জন্য আপনার ওএস এবং অ্যাপ্লিকেশন আপডেট রাখুন।",
    activeComplaints: "সক্রিয় অভিযোগ",
    resolvedCases: "সমাধান করা কেস",
    pendingReview: "পর্যালোচনার জন্য অপেক্ষমাণ",
    language: "ভাষা",
    fileUpload: "ফাইল আপলোড",
    knowledgeMore: "আরও জানুন",
    connect: "সংযোগ করুন",
    cyberCrimeLegal: "সাইবার অপরাধ আইনি পরামর্শ",
    cyberCrimeLegalDesc: "সাইবার অপরাধের শিকারদের জন্য বিনামূল্যে পরামর্শ পান",
    digitalEvidence: "ডিজিটাল প্রমাণ যাচাইকরণ",
    digitalEvidenceDesc: "আইনি ব্যবহারের জন্য স্ক্রিনশট বা ফাইল যাচাই করুন",
    cyberLawyer: "সাইবার সেল আইনজীবী সংযোগ",
    cyberLawyerDesc: "প্রত্যয়িত সাইবার আইনজীবীর সাথে পরামর্শ বুক করুন",
    onlineFIR: "অনলাইন এফআইআর সহায়তা",
    onlineFIRDesc: "ধাপে ধাপে এফআইআর দাখিল করার সহায়তা",
    legalAwareness: "আইনি সচেতনতা গাইড",
    legalAwarenessDesc: "অধিকার এবং পদ্ধতি সম্পর্কে ডাউনলোডযোগ্য পিডিএফ",
    cyberLawResources: "সাইবার আইন সংস্থান",
    cyberLawResourcesDesc: "আইটি আইন বিভাগ (66A, 67, 72, ইত্যাদি) দ্রুত অ্যাক্সেস",
    proBonoSupport: "প্রো বোনো আইনি সহায়তা",
    proBonoSupportDesc: "কম আয়ের শিকারদের জন্য স্বেচ্ছাসেবক আইনজীবী",
    victimCompensation: "শিকার ক্ষতিপূরণ তথ্য",
    victimCompensationDesc: "সরকারি সহায়তা প্রকল্প সম্পর্কে জানুন",
    dataProtection: "ডেটা সুরক্ষা এবং গোপনীয়তা পরামর্শ",
    dataProtectionDesc: "ডেটা অপব্যবহার বা লিক সম্পর্কে নির্দেশনা",
    close: "বন্ধ করুন",
    selectCategory: "একটি বিভাগ নির্বাচন করুন",
    financialFraud: "আর্থিক জালিয়াতি / অনলাইন জালিয়াতি",
    otpFraud: "ওটিপি / ইউপিআই জালিয়াতি",
    cyberHarassment: "সাইবার হয়রানি",
    cyberstalking: "সাইবার স্টকিং",
    identityTheft: "পরিচয় চুরি",
    impersonation: "প্রতিরূপণ / নকল প্রোফাইল",
    phishing: "ফিশিং / স্প্যাম লিংক",
    blackmail: "ব্ল্যাকমেল / জোরপূর্বক",
    defamation: "মানহানি / খ্যাতি ক্ষতি",
    hacking: "হ্যাকিং / অননুমোদিত অ্যাক্সেস",
    dataBreach: "ডেটা লঙ্ঘন",
    jobScam: "চাকরি / লটারি / ঋণ জালিয়াতি",
    socialMediaMisuse: "সোশ্যাল মিডিয়া অপব্যবহার",
    childExploitation: "শিশু শোষণ / অশ্লীল সামগ্রী",
    other: "অন্যান্য (কাস্টম বর্ণনা)",
    analyzing: "বিশ্লেষণ চলছে...",
    loading: "লোড হচ্ছে...",
  },
  ta: {
    welcome: "CyberSuraksha க்கு வரவேற்கிறோம்",
    subtitle: "உங்கள் சைபர் பாதுகாப்பு புகார் தளம்",
    fileComplaint: "புகார் தாக்கல் செய்யுங்கள்",
    myComplaints: "என் புகார்கள்",
    aiClassifier: "AI வகைப்பாடு",
    nearbyHelp: "அருகிலுள்ள உதவி",
    legalOptions: "சட்ட விருப்பங்கள்",
    exportPDF: "PDF ஆக ஏற்றுமதி செய்யுங்கள்",
    safetyTips: "பாதுகாப்பு குறிப்புகள்",
    dashboard: "டேஷ்போர்ட்",
    newComplaint: "புதிய புகார்",
    fileNewComplaint: "புதிய புகார் தாக்கல் செய்யுங்கள்",
    title: "தலைப்பு",
    description: "விளக்கம்",
    category: "வகை",
    location: "இருப்பிடம்",
    submitComplaint: "புகார் சமர்ப்பிக்கவும்",
    complaintSubmitted: "புகார் வெற்றிகரமாக தாக்கல் செய்யப்பட்டது. பொலிசாரை அறிவிக்கப்பட்டது.",
    referenceID: "குறிப்பு ID: CS-2024-001",
    myComplaintsList: "என் புகார்கள்",
    viewComplaints: "உங்கள் தாக்கல் செய்த புகார்களைக் காண்க",
    complaintID: "புகார் ID",
    status: "நிலை",
    date: "தேதி",
    analyzeText: "உரையை பகுப்பாய்வு செய்யுங்கள்",
    fraudClassifier: "AI மோசடி வகைப்பாடு",
    analyzeDescription: "மோசடி வகைகளைக் கண்டறிய உரையை பகுப்பாய்வு செய்யுங்கள்",
    pasteText: "சந்தேகத்திற்குரிய உரையை இங்கே ஒட்டவும்...",
    analyze: "பகுப்பாய்வு செய்யுங்கள்",
    analysisResult: "பகுப்பாய்வு முடிவு",
    fraudType: "மோசடி வகை",
    confidence: "நம்பிக்கை",
    rationale: "காரணம்",
    languageDetected: "ভাষা সনাক্ত করা হয়েছে",
    uploadFile: "கோப்பை பதிவேற்றவும்",
    dragDrop: "இழுத்து விடவும் அல்லது பதிவேற்ற கிளிக் செய்யவும்",
    nearbyHelpTitle: "அருகிலுள்ள உதவி",
    findHelp: "அருகிலுள்ள போலீஸ் நிலையம் மற்றும் சைபர் வழக்கறிஞரைக் கண்டறியவும்",
    nearestPolice: "அருகிலுள்ள போலீஸ் நிலையம்",
    nearbyCyberLawyer: "அருகிலுள்ள சைபர் வழக்கறிஞர்",
    distanceAway: "தொலைவில்",
    address: "முகவரி",
    phone: "தொலைபேசி",
    legalTitle: "சட்ட விருப்பங்கள்",
    understandRights: "உங்கள் உரிமைகள் மற்றும் சட்ட நிவாரணங்களைப் புரிந்து கொள்ளுங்கள்",
    legalFramework: "சட்ட கட்டமைப்பு",
    yourRights: "உங்கள் உரிமைகள்",
    itAct: "தகவல் தொழில்நுட்ப சட்டம், 2000",
    ipcSections: "இந்திய தண்டனை சட்டம் பிரிவு 420, 468",
    consumerAct: "நுகர்வோர் பாதுகாப்பு சட்டம், 2019",
    fileIFR: "FIR தாக்கல் செய்ய உரிமை",
    compensation: "ஈடுசெய்ய உரிமை",
    legalRepresentation: "சட்ட பிரதிநி஧ி உரிமை",
    contactLegal: "சட்ட ஆதரவைத் தொடர்பு கொள்ளவும்",
    safetyTipsTitle: "பாதுகாப்பு குறிப்புகள்",
    learnProtect: "ஆன்லைனில் உங்களை எவ்வாறு பாதுகாத்துக் கொள்வது என்பதை அறிக",
    nextTip: "அடுத்த குறிப்பு →",
    strongPasswords: "வலுவான கடவுச்சொற்கள்",
    passwordDesc: "12+ எழுத்துக்கள் கொண்ட கலவை வழக்கு, எண்கள் மற்றும் சின்னங்களைப் பயன்படுத்தவும்.",
    enable2FA: "2FA ஐ இயக்கவும்",
    twoFADesc: "இரண்டு-காரணி அங்கீகாரம் கூடுதல் பாதுகாப்பு ஸ்தரைச் சேர்க்கிறது.",
    verifyURLs: "URL களை சரிபார்க்கவும்",
    urlDesc: "உணர்வுशीல தகவலை உள்ளிடுவதற்கு முன் எப்போதும் URL ஐ சரிபார்க்கவும்.",
    updateSoftware: "மென்பொருளை புதுப்பிக்கவும்",
    softwareDesc: "பாதுகாப்பு பேச்சுகளுக்கு உங்கள் OS மற்றும் பயன்பாடுகளை புதுப்பிக்கவும்.",
    activeComplaints: "செயல்பட்ட புகார்கள்",
    resolvedCases: "தீர்க்கப்பட்ட வழக்குகள்",
    pendingReview: "மதிப்பாய்வுக்கு நிலுவையில் உள்ளது",
    language: "மொழி",
    fileUpload: "கோப்பு பதிவேற்றம்",
    knowledgeMore: "மேலும் அறிக",
    connect: "இணைக்கவும்",
    cyberCrimeLegal: "சைபர் குற்றம் சட்ட ஆலோசனை",
    cyberCrimeLegalDesc: "சைபர் குற்றங்களின் பாதிக்கப்பட்டவர்களுக்கு இலவச ஆலோசனை பெறுங்கள்",
    digitalEvidence: "டிஜிடல் சான்று சரிபார்ப்பு",
    digitalEvidenceDesc: "சட்ட பயன்பாட்டிற்கான ஸ்கிரீன்ஷாட் அல்லது கோப்புகளை சரிபார்க்கவும்",
    cyberLawyer: "சைபர் செல் வழக்கறிஞர் இணைப்பு",
    cyberLawyerDesc: "சான்றளிக்கப்பட்ட சைபர் வழக்கறிஞருடன் ஆலோசனை பதிவு செய்யவும்",
    onlineFIR: "ஆன்லைன் FIR உதவி",
    onlineFIRDesc: "படிப்படியாக FIR தாக்கல் செய்ய உதவி",
    legalAwareness: "சட்ட விழிப்புணர்வு வழிகாட்டி",
    legalAwarenessDesc: "உரிமைகள் மற்றும் நடைமுறைகள் பற்றிய பதிவிறக்கயோग்य PDF",
    cyberLawResources: "சைபர் சட்ட வளங்கள்",
    cyberLawResourcesDesc: "IT சட்ட பிரிவுகளுக்கு (66A, 67, 72, முதலியன) விரைவு அணுகல்",
    proBonoSupport: "Pro Bono சட்ட ஆதரவு",
    proBonoSupportDesc: "குறைந்த வருமான பாதிக்கப்பட்டவர்களுக்கான தன்னார்வ வழக்கறிஞர்",
    victimCompensation: "பாதிக்கப்பட்ட ஈடுசெய்தல் தகவல்",
    victimCompensationDesc: "அரசு உதவி திட்டங்கள் பற்றி அறிக",
    dataProtection: "டேடா ஸூரக்ஷா மற்றும் கோபனியதா ஆலோசனை",
    dataProtectionDesc: "டேடா अपव्यवहार अथवा लीक पर मार्गदर्शन",
    close: "மூசிవेయुम்",
    selectCategory: "ஒரு வகையைத் தேர்ந்தெடுக்கவும்",
    financialFraud: "நிதி மோசடி / ஆன்லைன் மோசடி",
    otpFraud: "OTP / UPI மோசடி",
    cyberHarassment: "சைபர்騚ல்",
    cyberstalking: "சைபர் பின்தொடர்தல்",
    identityTheft: "அடையாள திருட்டு",
    impersonation: "பிரதிநिधित्व / போலி சுயவிவரம்",
    phishing: "ফিশিং / ஸ்பாம் இணைப்புகள்",
    blackmail: "ब्लॅकमेल / பலவந்தம்",
    defamation: "மானஹானி / நற்பெயர் சேதம்",
    hacking: "ஹ்யாகிங் / அனனுமோதித அணுகல்",
    dataBreach: "டேடா लঙ्ঘन",
    jobScam: "வேலை / லாட்டரி / கடன் மோசடி",
    socialMediaMisuse: "சामाजिक माध्यम दुरुपयोग",
    childExploitation: "শিশु शोषण / अश्लील सामग्री",
    other: "अन्य (कस्टम विवरण)",
    analyzing: "பகுப்பாய்வு செய்யப்படுகிறது...",
    loading: "लोड हो रहा है...",
  },
  te: {
    welcome: "CyberSuraksha కు స్వాగతం",
    subtitle: "మీ సైబర్ సెక్యూరిటీ ఫిర్యాదు ప్లాట్‌ఫారమ్",
    fileComplaint: "ఫిర్యాదు దాఖలు చేయండి",
    myComplaints: "నా ఫిర్యాదులు",
    aiClassifier: "AI వర్గీకరణ",
    nearbyHelp: "సమీపంలో సహాయం",
    legalOptions: "చట్ట ఎంపికలు",
    exportPDF: "PDF గా ఎగుమతి చేయండి",
    safetyTips: "సేఫ్టీ టిప్‌లు",
    dashboard: "డ్యాష్‌బోర్డ్",
    newComplaint: "కొత్త ఫిర్యాదు",
    fileNewComplaint: "కొత్త ఫిర్యాదు దాఖలు చేయండి",
    title: "శీర్షిక",
    description: "వివరణ",
    category: "వర్గం",
    location: "స్థానం",
    submitComplaint: "ఫిర్యాదు సమర్పించండి",
    complaintSubmitted: "ఫిర్యాదు విజయవంతంగా దాఖలు చేయబడింది. పోలీసులకు తెలియజేయబడింది.",
    referenceID: "సూచన ID: CS-2024-001",
    myComplaintsList: "నా ఫిర్యాదులు",
    viewComplaints: "మీ దాఖలు చేసిన ఫిర్యాదులను చూడండి",
    complaintID: "ఫిర్యాదు ID",
    status: "స్థితి",
    date: "తేదీ",
    analyzeText: "టెక్‌స్ట్‌ను విశ్లేషించండి",
    fraudClassifier: "AI మోసం వర్గీకరణ",
    analyzeDescription: "మోసం రకాలను గుర్తించడానికి టెక్‌స్ట్‌ను విశ్లేషించండి",
    pasteText: "సందేహాస్పద టెక్‌స్ట్‌ను ఇక్కడ అతికించండి...",
    analyze: "విశ్లేషించండి",
    analysisResult: "విశ్లేషణ ఫలితం",
    fraudType: "మోసం రకం",
    confidence: "విశ్వాసం",
    rationale: "కారణం",
    languageDetected: "భాష గుర్తించబడింది",
    uploadFile: "ఫైల్‌ను అప్‌లోడ్ చేయండి",
    dragDrop: "లాగండి మరియు వదిలివేయండి లేదా అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి",
    nearbyHelpTitle: "సమీపంలో సహాయం",
    findHelp: "సమీపంలో పోలీస్ స్టేషన్ మరియు సైబర్ న్యాయవాదిని కనుగొనండి",
    nearestPolice: "సమీపంలో పోలీస్ స్టేషన్",
    nearbyCyberLawyer: "సమీపంలో సైబర్ న్యాయవాది",
    distanceAway: "దూరం",
    address: "చిరునామా",
    phone: "ఫోన్",
    legalTitle: "చట్ట ఎంపికలు",
    understandRights: "మీ హక్కులు మరియు చట్ట నిరసనలను అర్థం చేసుకోండి",
    legalFramework: "చట్ట ఫ్రేమ్‌వర్క్",
    yourRights: "మీ హక్కులు",
    itAct: "సమాచార సాంకేతికత చట్టం, 2000",
    ipcSections: "భారతీయ శిక్ష సంహిత విభాగాలు 420, 468",
    consumerAct: "ఉపభోక్త సంరక్షణ చట్టం, 2019",
    fileIFR: "FIR దాఖలు చేయడానికి హక్కు",
    compensation: "నష్టపూరణ హక్కు",
    legalRepresentation: "చట్ట ప్రతినిధిత్వ హక్కు",
    contactLegal: "చట్ట సహాయ సంప్రదించండి",
    safetyTipsTitle: "సేఫ్టీ టిప్‌లు",
    learnProtect: "ఆన్‌లైన్‌లో మిమ్మల్ని ఎలా రక్షించుకోవాలో తెలుసుకోండి",
    nextTip: "తదుపరి చిట్కా →",
    strongPasswords: "బలమైన పాస్‌వర్డ్‌లు",
    passwordDesc: "12+ అక్షరాలను మిశ్రమ కేస్, సంఖ్యలు మరియు చిహ్నాలతో ఉపయోగించండి.",
    enable2FA: "2FA ను ప్రారంభించండి",
    twoFADesc: "రెండు-కారక ప్రామాణీకరణ అదనపు సురక్ష స్థరాన్ని జోడిస్తుంది.",
    verifyURLs: "URLలను ధృవీకరించండి",
    urlDesc: "సున్నితమైన సమాచారాన్ని నమోదు చేయడానికి ముందు ఎల్లప్పుడూ URLని తనిఖీ చేయండి.",
    updateSoftware: "సాఫ్ట్‌వేర్‌ను నవీకరించండి",
    softwareDesc: "సురక్ష ప్యాచ్‌ల కోసం మీ OS మరియు అనువర్తనాలను నవీకరించండి.",
    activeComplaints: "క్రియాశీల ఫిర్యాదులు",
    resolvedCases: "పరిష్కరించిన కేసులు",
    pendingReview: "సమీక్ష కోసం పెండింగ్",
    language: "భాష",
    fileUpload: "ఫైల్ అప్‌లోడ్",
    knowledgeMore: "మరిన్ని తెలుసుకోండి",
    connect: "కనెక్ట్ చేయండి",
    cyberCrimeLegal: "సైబర్ క్రైమ్ లీగల్ సలహా",
    cyberCrimeLegalDesc: "సైబర్ క్రైమ్ బాధితులకు ఉచిత సలహా పొందండి",
    digitalEvidence: "డిజిటల్ సాక్ష్య ధృవీకరణ",
    digitalEvidenceDesc: "చట్ట ఉపయోగం కోసం స్క్రీన్‌షాట్‌లు లేదా ఫైల్‌లను ధృవీకరించండి",
    cyberLawyer: "సైబర్ సెల్ లాయర్ కనెక్ట్",
    cyberLawyerDesc: "ప్రమాణిత సైబర్ న్యాయవాదితో సలహా బుక్ చేయండి",
    onlineFIR: "ఆన్‌లైన్ FIR సహాయం",
    onlineFIRDesc: "దశ-దశ FIR ఫైలింగ్ సహాయం",
    legalAwareness: "లీగల్ అవేర్‌నెస్ గైడ్",
    legalAwarenessDesc: "హక్కులు మరియు విధానాల గురించిన డౌన్‌లోడ్‌చేయదగిన PDF",
    cyberLawResources: "సైబర్ లా రిసోర్సెస్",
    cyberLawResourcesDesc: "IT చట్ట విభాగాలకు (66A, 67, 72, మొదలైనవి) త్వరిత ప్రాప్యత",
    proBonoSupport: "ప్రో బోనో లీగల్ సపోర్ట్",
    proBonoSupportDesc: "తక్కువ ఆదాయ బాధితుల కోసం స్వచ్ఛంద న్యాయవాదులు",
    victimCompensation: "బాధిత నష్టపూరణ సమాచారం",
    victimCompensationDesc: "ప్రభుత్వ సహాయ పథకాల గురించి తెలుసుకోండి",
    dataProtection: "డేటా సురక్ష మరియు గోప్యతా సలహా",
    dataProtectionDesc: "డేటా దుర్వినియోగం లేదా లీక్‌ల గురించిన మార్గదర్శకత",
    close: "మూసివేయండి",
    selectCategory: "ఒక వర్గాన్ని ఎంచుకోండి",
    financialFraud: "ఆర్థిక మోసం / ఆన్‌లైన్ మోసం",
    otpFraud: "OTP / UPI మోసం",
    cyberHarassment: "సైబర్ వేధింపు",
    cyberstalking: "సైబర్ స్టాకింగ్",
    identityTheft: "గుర్తింపు దొంగతనం",
    impersonation: "ప్రతిరూపణ / నకిలీ ప్రొఫైల్",
    phishing: "ఫిషింగ్ / స్పామ్ లింక్‌లు",
    blackmail: "బ్లాక్‌మెయిల్ / బలవంతం",
    defamation: "అపవాదు / ఖ్యాతి నష్టం",
    hacking: "హ్యాకింగ్ / అనధికృత ప్రాప్యత",
    dataBreach: "డేటా ఉల్లంఘన",
    jobScam: "ఉద్యోగం / లాటరీ / రుణ మోసం",
    socialMediaMisuse: "సోషల్ మీడియా దుర్వినియోగం",
    childExploitation: "బాల శోషణ / అశ్లీల సామగ్రి",
    other: "ఇతర (కస్టమ్ వివరణ)",
    analyzing: "విశ్లేషణ జరుగుతోంది...",
    loading: "లోడ్ అవుతోంది...",
  },
  kn: {
    welcome: "CyberSuraksha ಗೆ ಸ್ವಾಗತ",
    subtitle: "ನಿಮ್ಮ ಸೈಬರ್ ಸುರಕ್ಷತೆ ದೂರುವಾತಿ ವೇದಿಕೆ",
    fileComplaint: "ದೂರುವಾತಿ ಸಲ್ಲಿಸಿ",
    myComplaints: "ನನ್ನ ದೂರುವಾತಿಗಳು",
    aiClassifier: "AI ವರ್ಗೀಕರಣ",
    nearbyHelp: "ಹತ್ತಿರದ ಸಹಾಯ",
    legalOptions: "ಕಾನೂನು ಆಯ್ಕೆಗಳು",
    exportPDF: "PDF ಆಗಿ ರಫ್ತು ಮಾಡಿ",
    safetyTips: "ಸುರಕ್ಷತೆ ಸುಳಿವುಗಳು",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    newComplaint: "ಹೊಸ ದೂರುವಾತಿ",
    fileNewComplaint: "ಹೊಸ ದೂರುವಾತಿ ಸಲ್ಲಿಸಿ",
    title: "ಶೀರ್ಷಿಕೆ",
    description: "ವಿವರಣೆ",
    category: "ವರ್ಗ",
    location: "ಸ್ಥಳ",
    submitComplaint: "ದೂರುವಾತಿ ಸಲ್ಲಿಸಿ",
    complaintSubmitted: "ದೂರುವಾತಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ. ಪೋಲೀಸ್ ಅವಗತಿಗೊಂಡಿದೆ.",
    referenceID: "ಉಲ್ಲೇಖ ID: CS-2024-001",
    myComplaintsList: "ನನ್ನ ದೂರುವಾತಿಗಳು",
    viewComplaints: "ನಿಮ್ಮ ಸಲ್ಲಿಸಿದ ದೂರುವಾತಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    complaintID: "ದೂರುವಾತಿ ID",
    status: "ಸ್ಥಿತಿ",
    date: "ದಿನಾಂಕ",
    analyzeText: "ಪಠ್ಯವನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    fraudClassifier: "AI ವಂಚನೆ ವರ್ಗೀಕರಣ",
    analyzeDescription: "ವಂಚನೆ ಪ್ರಕಾರಗಳನ್ನು ಪತ್ತೆ ಮಾಡಲು ಪಠ್ಯವನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    pasteText: "ಅನುಮಾನಾಸ್ಪದ ಪಠ್ಯವನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ...",
    analyze: "ವಿಶ್ಲೇಷಿಸಿ",
    analysisResult: "ವಿಶ್ಲೇಷಣೆ ಫಲಿತಾಂಶ",
    fraudType: "ವಂಚನೆ ಪ್ರಕಾರ",
    confidence: "ಆತ್ಮವಿಶ್ವಾಸ",
    rationale: "ಕಾರಣ",
    languageDetected: "ಭಾಷೆ ಪತ್ತೆಯಾಗಿದೆ",
    uploadFile: "ಫೈಲ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    dragDrop: "ಎಳೆಯಿರಿ ಮತ್ತು ಬಿಡಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
    nearbyHelpTitle: "ಹತ್ತಿರದ ಸಹಾಯ",
    findHelp: "ಹತ್ತಿರದ ಪೋಲೀಸ್ ಠಾಣೆ ಮತ್ತು ಸೈಬರ್ ವಕೀಲನನ್ನು ಹುಡುಕಿ",
    nearestPolice: "ಹತ್ತಿರದ ಪೋಲೀಸ್ ಠಾಣೆ",
    nearbyCyberLawyer: "ಹತ್ತಿರದ ಸೈಬರ್ ವಕೀಲ",
    distanceAway: "ದೂರ",
    address: "ವಿಳಾಸ",
    phone: "ಫೋನ್",
    legalTitle: "ಕಾನೂನು ಆಯ್ಕೆಗಳು",
    understandRights: "ನಿಮ್ಮ ಹಕ್ಕುಗಳು ಮತ್ತು ಕಾನೂನು ಪರಿಹಾರಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
    legalFramework: "ಕಾನೂನು ಚೌಕಟ್ಟು",
    yourRights: "ನಿಮ್ಮ ಹಕ್ಕುಗಳು",
    itAct: "ಮಾಹಿತಿ ತಂತ್ರಜ್ಞಾನ ಕಾಯಿದೆ, 2000",
    ipcSections: "ಭಾರತೀಯ ದಂಡ ಸಂಹಿತೆ ವಿಭಾಗಗಳು 420, 468",
    consumerAct: "ಗ್ರಾಹಕ ಸುರಕ್ಷತೆ ಕಾಯಿದೆ, 2019",
    fileIFR: "FIR ಸಲ್ಲಿಸುವ ಹಕ್ಕು",
    compensation: "ಪರಿಹಾರದ ಹಕ್ಕು",
    legalRepresentation: "ಕಾನೂನು ಪ್ರತಿನಿಧಿತ್ವದ ಹಕ್ಕು",
    contactLegal: "ಕಾನೂನು ಸಹಾಯವನ್ನು ಸಂಪರ್ಕಿಸಿ",
    safetyTipsTitle: "ಸುರಕ್ಷತೆ ಸುಳಿವುಗಳು",
    learnProtect: "ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ನಿಮ್ಮನ್ನು ಹೇಗೆ ರಕ್ಷಿಸಿಕೊಳ್ಳಬೇಕೆಂದು ತಿಳಿಯಿರಿ",
    nextTip: "ಮುಂದಿನ ಸುಳಿವು →",
    strongPasswords: "ಬಲವಾದ ಪಾಸ್‌ವರ್ಡ್‌ಗಳು",
    passwordDesc: "ಮಿಶ್ರ ಕೇಸ್, ಸಂಖ್ಯೆಗಳು ಮತ್ತು ಚಿಹ್ನೆಗಳೊಂದಿಗೆ 12+ ಅಕ್ಷರಗಳನ್ನು ಬಳಸಿ.",
    enable2FA: "2FA ಸಕ್ರಿಯಗೊಳಿಸಿ",
    twoFADesc: "ಎರಡು-ಅಂಶ ಪ್ರಮಾಣೀಕರಣವು ಹೆಚ್ಚುವರಿ ಸುರಕ್ಷತೆ ಪದರವನ್ನು ಸೇರಿಸುತ್ತದೆ.",
    verifyURLs: "URL ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
    urlDesc: "ಸೂಕ್ಷ್ಮ ಮಾಹಿತಿಯನ್ನು ನಮೂದಿಸುವ ಮೊದಲು ಯಾವಾಗಲೂ URL ಅನ್ನು ಪರಿಶೀಲಿಸಿ.",
    updateSoftware: "ಸಾಫ್ಟ್‌ವೇರ್ ಅಪ್‌ಡೇಟ್ ಮಾಡಿ",
    softwareDesc: "ಸುರಕ್ಷತೆ ಪ್ಯಾಚ್‌ಗಳಿಗಾಗಿ ನಿಮ್ಮ OS ಮತ್ತು ಅಪ್ಲಿಕೇಶನ್‌ಗಳನ್ನು ಅಪ್‌ಡೇಟ್ ಮಾಡಿ.",
    activeComplaints: "ಸಕ್ರಿಯ ದೂರುವಾತಿಗಳು",
    resolvedCases: "ಪರಿಹರಿಸಿದ ಪ್ರಕರಣಗಳು",
    pendingReview: "ಪರಿಶೀಲನೆಗೆ ಬಾಕಿ",
    language: "ಭಾಷೆ",
    fileUpload: "ಫೈಲ್ ಅಪ್‌ಲೋಡ್",
    knowledgeMore: "ಹೆಚ್ಚು ತಿಳಿಯಿರಿ",
    connect: "ಸಂಪರ್ಕ ಸಾಧಿಸಿ",
    cyberCrimeLegal: "ಸೈಬರ್ ಅಪರಾಧ ಕಾನೂನು ಸಲಹೆ",
    cyberCrimeLegalDesc: "ಸೈಬರ್ ಅಪರಾಧ ಬಾಧಿತರಿಗೆ ಉಚಿತ ಸಲಹೆ ಪಡೆಯಿರಿ",
    digitalEvidence: "ಡಿಜಿಟಲ್ ಪುರಾವೆ ಪರಿಶೀಲನೆ",
    digitalEvidenceDesc: "ಕಾನೂನು ಬಳಕೆಗಾಗಿ ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳು ಅಥವಾ ಫೈಲ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
    cyberLawyer: "ಸೈಬರ್ ಸೆಲ್ ವಕೀಲ ಸಂಪರ್ಕ",
    cyberLawyerDesc: "ಪ್ರಮಾಣಿತ ಸೈಬರ್ ವಕೀಲರೊಂದಿಗೆ ಸಲಹೆ ಬುಕ್ ಮಾಡಿ",
    onlineFIR: "ಆನ್‌ಲೈನ್ FIR ಸಹಾಯ",
    onlineFIRDesc: "ಹಂತ-ಹಂತದ FIR ಫೈಲಿಂಗ್ ಸಹಾಯ",
    legalAwareness: "ಕಾನೂನು ಜಾಗೃತತೆ ಮಾರ್ಗದರ್ಶಿ",
    legalAwarenessDesc: "ಹಕ್ಕುಗಳು ಮತ್ತು ಕಾರ್ಯವಿಧಾನಗಳ ಬಗ್ಗೆ ಡೌನ್‌ಲೋಡ್‌ಯೋಗ್ಯ PDF",
    cyberLawResources: "ಸೈಬರ್ ಕಾನೂನು ಸಂಪನ್ಮೂಲಗಳು",
    cyberLawResourcesDesc: "IT ಕಾನೂನು ವಿಭಾಗಗಳಿಗೆ (66A, 67, 72, ಇತ್ಯಾದಿ) ತ್ವರಿತ ಪ್ರವೇಶ",
    proBonoSupport: "ಪ್ರೋ ಬೋನೋ ಕಾನೂನು ಸಹಾಯ",
    proBonoSupportDesc: "ಕಡಿಮೆ ಆದಾಯದ ಬಾಧಿತರಿಗೆ ಸ್ವಯಂಸೇವಕ ವಕೀಲರು",
    victimCompensation: "ಬಾಧಿತ ಪರಿಹಾರ ಮಾಹಿತಿ",
    victimCompensationDesc: "ಸರ್ಕಾರಿ ಸಹಾಯ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ",
    dataProtection: "ಡೇಟಾ ಸುರಕ್ಷತೆ ಮತ್ತು ಗೋಪ್ಯತೆ ಸಲಹೆ",
    dataProtectionDesc: "ಡೇಟಾ ದುರುಪಯೋಗ ಅಥವಾ ಸೋರಿಕೆಯ ಬಗ್ಗೆ ಮಾರ್ಗದರ್ಶನ",
    close: "ಮುಚ್ಚಿ",
    selectCategory: "ವರ್ಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
    financialFraud: "ಆರ್ಥಿಕ ವಂಚನೆ / ಆನ್‌ಲೈನ್ ವಂಚನೆ",
    otpFraud: "OTP / UPI ವಂಚನೆ",
    cyberHarassment: "ಸೈಬರ್ ಚಿಡಿಮಾರಣೆ",
    cyberstalking: "ಸೈಬರ್ ಸ್ಟಾಕಿಂಗ್",
    identityTheft: "ಗುರುತು ಕಳ್ಳತನ",
    impersonation: "ಪ್ರತಿರೂಪಣ / ನಕಲಿ ಪ್ರೊಫೈಲ್",
    phishing: "ಫಿಶಿಂಗ್ / ಸ್ಪ್ಯಾಮ್ ಲಿಂಕ್‌ಗಳು",
    blackmail: "ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ / ಬಲವಂತ",
    defamation: "ಮಾನನಷ್ಟ / ಖ್ಯಾತಿ ಹಾನಿ",
    hacking: "ಹ್ಯಾಕಿಂಗ್ / ಅನಧಿಕೃತ ಪ್ರವೇಶ",
    dataBreach: "ಡೇಟಾ ಉಲ್ಲಂಘನೆ",
    jobScam: "ಉದ್ಯೋಗ / ಲಾಟರಿ / ಸಾಲ ವಂಚನೆ",
    socialMediaMisuse: "ಸೋಶಿಯಲ್ ಮೀಡಿಯಾ ದುರುಪಯೋಗ",
    childExploitation: "ಮಕ್ಕಳ ಶೋಷಣೆ / ಅಶ್ಲೀಲ ವಿಷಯವಸ್ತು",
    other: "ಇತರೆ (ಕಸ್ಟಮ್ ವಿವರಣೆ)",
    analyzing: "ವಿಶ್ಲೇಷಣೆ ಜರುಗುತ್ತಿದೆ...",
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
  },
}

const dummyComplaints = [
  {
    id: "CS-2024-001",
    title: "Phishing Email Attack",
    description: "Received suspicious email asking for bank details",
    category: "Phishing / Spam Links",
    status: "Pending",
    date: "2024-01-15",
  },
  {
    id: "CS-2024-002",
    title: "Online Fraud",
    description: "Unauthorized transaction from my account",
    category: "Financial Fraud / Online Scam",
    status: "In Progress",
    date: "2024-01-14",
  },
  {
    id: "CS-2024-003",
    title: "Cyber Harassment",
    description: "Receiving abusive messages on social media",
    category: "Cyber Harassment",
    status: "Resolved",
    date: "2024-01-13",
  },
]

const detectFraudType = (
  text: string,
): { category: string; confidence: number; language: string; rationale: string } => {
  const lowerText = text.toLowerCase()

  // Detect language and keywords
  const financialKeywords = [
    "money",
    "otp",
    "bank",
    "transaction",
    "payment",
    "card",
    "account",
    "पैसे",
    "धोका",
    "लेनदेन",
    "ओटीपी",
    "बैंक",
    "पेमेंट",
    "खाता",
    "पैसा",
    "लेनदेन",
    "ओटीपी",
    "बैंक",
    "पेमेंट",
    "खाता",
  ]
  const harassmentKeywords = [
    "harass",
    "threat",
    "insult",
    "abuse",
    "bully",
    "हैरास",
    "अपमान",
    "गाली",
    "धमकी",
    "छळ",
    "अपमान",
    "गाली",
    "धमकी",
  ]
  const impersonationKeywords = [
    "fake profile",
    "impersonate",
    "duplicate",
    "खोटा प्रोफाइल",
    "नकल",
    "डुप्लिकेट",
    "खोटा प्रोफाइल",
    "नकल",
    "डुप्लिकेट",
  ]
  const blackmailKeywords = [
    "photo",
    "video",
    "blackmail",
    "threaten",
    "ब्लॅकमेल",
    "व्हिडिओ",
    "फोटो",
    "धमकी",
    "ब्लॅकमेल",
    "व्हिडिओ",
    "फोटो",
  ]
  const hackingKeywords = [
    "hack",
    "login",
    "password",
    "access",
    "breach",
    "हॅक",
    "पासवर्ड",
    "लॉगिन",
    "एक्सेस",
    "हॅक",
    "पासवर्ड",
    "लॉगिन",
  ]

  let detectedCategory = "Other / Unidentified"
  let confidence = 0.5
  let rationale = "Unable to classify with high confidence"
  let language = "English"

  if (financialKeywords.some((kw) => lowerText.includes(kw))) {
    detectedCategory = "Financial Fraud / Online Scam"
    confidence = 0.92
    rationale = "Detected keywords related to money/transaction/OTP/bank"
    language = lowerText.includes("पैसे") || lowerText.includes("धोका") ? "Hindi" : "English"
  } else if (harassmentKeywords.some((kw) => lowerText.includes(kw))) {
    detectedCategory = "Cyber Harassment"
    confidence = 0.88
    rationale = "Detected keywords related to harassment/threats/abuse"
    language = lowerText.includes("हैरास") ? "Hindi" : "English"
  } else if (impersonationKeywords.some((kw) => lowerText.includes(kw))) {
    detectedCategory = "Impersonation / Fake Profile"
    confidence = 0.85
    rationale = "Detected keywords related to fake profiles/impersonation"
    language = lowerText.includes("खोटा") ? "Hindi" : "English"
  } else if (blackmailKeywords.some((kw) => lowerText.includes(kw))) {
    detectedCategory = "Blackmail / Extortion"
    confidence = 0.9
    rationale = "Detected keywords related to blackmail/extortion/threats"
    language = lowerText.includes("ब्लॅकमेल") ? "Hindi" : "English"
  } else if (hackingKeywords.some((kw) => lowerText.includes(kw))) {
    detectedCategory = "Hacking / Unauthorized Access"
    confidence = 0.87
    rationale = "Detected keywords related to hacking/password/unauthorized access"
    language = lowerText.includes("हॅक") ? "Hindi" : "English"
  }

  return { category: detectedCategory, confidence, language, rationale }
}

const legalServices = [
  {
    title: "cyberCrimeLegal",
    description: "cyberCrimeLegalDesc",
    icon: Scale,
  },
  {
    title: "digitalEvidence",
    description: "digitalEvidenceDesc",
    icon: FileText,
  },
  {
    title: "cyberLawyer",
    description: "cyberLawyerDesc",
    icon: Phone,
  },
  {
    title: "onlineFIR",
    description: "onlineFIRDesc",
    icon: FileDown,
  },
  {
    title: "legalAwareness",
    description: "legalAwarenessDesc",
    icon: Brain,
  },
  {
    title: "cyberLawResources",
    description: "cyberLawResourcesDesc",
    icon: Globe,
  },
  {
    title: "proBonoSupport",
    description: "proBonoSupportDesc",
    icon: Mail,
  },
  {
    title: "victimCompensation",
    description: "victimCompensationDesc",
    icon: CheckCircle,
  },
  {
    title: "dataProtection",
    description: "dataProtectionDesc",
    icon: AlertCircle,
  },
]

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [language, setLanguage] = useState<keyof typeof translations>("en")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [classifierResult, setClassifierResult] = useState<{
    category: string
    confidence: number
    language: string
    rationale: string
  } | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [complaints, setComplaints] = useState(dummyComplaints)
  const [showComplaintModal, setShowComplaintModal] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  })
  const [analyzerText, setAnalyzerText] = useState("")

  const t = translations[language]

  const safetyTips = [
    {
      title: t.strongPasswords,
      description: t.passwordDesc,
    },
    {
      title: t.enable2FA,
      description: t.twoFADesc,
    },
    {
      title: t.verifyURLs,
      description: t.urlDesc,
    },
    {
      title: t.updateSoftware,
      description: t.softwareDesc,
    },
  ]

  const menuItems = [
    { icon: FileText, label: t.fileComplaint, id: "file" },
    { icon: Folder, label: t.myComplaints, id: "complaints" },
    { icon: Brain, label: t.aiClassifier, id: "classifier" },
    { icon: MapPin, label: t.nearbyHelp, id: "help" },
    { icon: Scale, label: t.legalOptions, id: "legal" },
    { icon: FileDown, label: t.exportPDF, id: "pdf" },
    { icon: MessageSquare, label: t.safetyTips, id: "tips" },
  ]

  const handleAnalyzeText = async () => {
    if (!analyzerText.trim()) return

    setIsAnalyzing(true)
    setTimeout(() => {
      const result = detectFraudType(analyzerText)
      setClassifierResult(result)
      // Auto-prefill category in complaint form
      setFormData((prev) => ({ ...prev, category: result.category }))
      setIsAnalyzing(false)
    }, 1000)
  }

  const handleSubmitComplaint = () => {
    if (formData.title && formData.description && formData.category) {
      const newComplaint = {
        id: `CS-2024-${complaints.length + 1}`,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
      }
      setComplaints([...complaints, newComplaint])
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
      setFormData({ title: "", description: "", category: "", location: "" })
      setShowComplaintModal(false)
    }
  }

  const handleExportPDF = () => {
    alert("PDF Exported Successfully!")
  }

  const handleTipRotation = () => {
    setCurrentTipIndex((prev) => (prev + 1) % safetyTips.length)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div>
              <h1 className="text-2xl font-bold text-primary">CyberSuraksha</h1>
              <p className="text-sm text-muted-foreground">{t.welcome}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select value={language} onValueChange={(val) => setLanguage(val as keyof typeof translations)}>
              <SelectTrigger className="w-40">
                <Globe size={16} className="mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="mr">मराठी</SelectItem>
                <SelectItem value="bn">বাংলা</SelectItem>
                <SelectItem value="ta">தமிழ்</SelectItem>
                <SelectItem value="te">తెలుగు</SelectItem>
                <SelectItem value="kn">ಕನ್ನಡ</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">U</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -250 }}
          animate={{ x: sidebarOpen ? 0 : -250 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed lg:static w-64 h-[calc(100vh-80px)] bg-card border-r border-border overflow-y-auto z-30 lg:translate-x-0"
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 5 }}
                onClick={() => {
                  setActiveSection(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === item.id
                    ? "bg-primary/20 text-primary border border-primary/50 glow-pulse"
                    : "text-muted-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {/* File Complaint Section */}
          {activeSection === "file" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{t.fileComplaint}</h2>
                <p className="text-muted-foreground">{t.analyzeDescription}</p>
              </div>

              <Dialog open={showComplaintModal} onOpenChange={setShowComplaintModal}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="mr-2" size={20} />
                    {t.newComplaint}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{t.fileNewComplaint}</DialogTitle>
                    <button
                      onClick={() => setShowComplaintModal(false)}
                      className="absolute right-4 top-4 p-1 hover:bg-muted rounded-lg transition-colors"
                      aria-label="Close"
                    >
                      <X size={20} />
                    </button>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">{t.title}</label>
                      <input
                        type="text"
                        placeholder={t.title}
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-2 border border-border rounded-lg bg-background text-foreground mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t.description}</label>
                      <textarea
                        placeholder={t.description}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-2 border border-border rounded-lg bg-background text-foreground mt-1"
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t.category}</label>
                      <Select
                        value={formData.category}
                        onValueChange={(val) => setFormData({ ...formData, category: val })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder={t.selectCategory} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={t.financialFraud}>{t.financialFraud}</SelectItem>
                          <SelectItem value={t.otpFraud}>{t.otpFraud}</SelectItem>
                          <SelectItem value={t.cyberHarassment}>{t.cyberHarassment}</SelectItem>
                          <SelectItem value={t.cyberstalking}>{t.cyberstalking}</SelectItem>
                          <SelectItem value={t.identityTheft}>{t.identityTheft}</SelectItem>
                          <SelectItem value={t.impersonation}>{t.impersonation}</SelectItem>
                          <SelectItem value={t.phishing}>{t.phishing}</SelectItem>
                          <SelectItem value={t.blackmail}>{t.blackmail}</SelectItem>
                          <SelectItem value={t.defamation}>{t.defamation}</SelectItem>
                          <SelectItem value={t.hacking}>{t.hacking}</SelectItem>
                          <SelectItem value={t.dataBreach}>{t.dataBreach}</SelectItem>
                          <SelectItem value={t.jobScam}>{t.jobScam}</SelectItem>
                          <SelectItem value={t.socialMediaMisuse}>{t.socialMediaMisuse}</SelectItem>
                          <SelectItem value={t.childExploitation}>{t.childExploitation}</SelectItem>
                          <SelectItem value={t.other}>{t.other}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t.location}</label>
                      <input
                        type="text"
                        placeholder={t.location}
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full p-2 border border-border rounded-lg bg-background text-foreground mt-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={() => setShowComplaintModal(false)} variant="outline" className="flex-1">
                        Back to Dashboard
                      </Button>
                      <Button
                        onClick={handleSubmitComplaint}
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {t.submitComplaint}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {showSuccessMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-primary/20 border border-primary/50 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle className="text-primary" size={24} />
                  <div>
                    <p className="font-semibold text-primary">✅ {t.complaintSubmitted}</p>
                    <p className="text-sm text-muted-foreground">{t.referenceID}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* My Complaints Section */}
          {activeSection === "complaints" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{t.myComplaintsList}</h2>
                <p className="text-muted-foreground">{t.viewComplaints}</p>
              </div>

              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <Card key={complaint.id} className="bg-card border-border p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">{t.complaintID}</p>
                        <p className="font-mono text-primary font-bold">{complaint.id}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                        {complaint.status}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2">{complaint.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{complaint.description}</p>
                    <div className="flex justify-between text-sm">
                      <span>{complaint.category}</span>
                      <span className="text-muted-foreground">{complaint.date}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* AI Classifier Section */}
          {activeSection === "classifier" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{t.fraudClassifier}</h2>
                <p className="text-muted-foreground">{t.analyzeDescription}</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-card border-border p-6">
                  <h3 className="text-lg font-semibold mb-4">{t.analyzeText}</h3>
                  <textarea
                    placeholder={t.pasteText}
                    value={analyzerText}
                    onChange={(e) => setAnalyzerText(e.target.value)}
                    className="w-full p-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                    rows={6}
                  />
                  <Button
                    onClick={handleAnalyzeText}
                    disabled={isAnalyzing}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader className="mr-2 animate-spin" size={18} />
                        {t.analyzing}
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2" size={18} />
                        {t.analyze}
                      </>
                    )}
                  </Button>
                </Card>

                {classifierResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <Card className="bg-card border-border/50 border-2 border-primary/30 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-primary">{t.analysisResult}</h3>
                        <AlertCircle className="text-secondary" size={24} />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">{t.fraudType}</p>
                          <p className="text-lg font-bold text-primary">{classifierResult.category}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t.confidence}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${classifierResult.confidence * 100}%` }}
                              />
                            </div>
                            <span className="text-primary font-bold">
                              {Math.round(classifierResult.confidence * 100)}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t.languageDetected}</p>
                          <p className="text-sm text-foreground">{classifierResult.language}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t.rationale}</p>
                          <p className="text-sm text-foreground mt-1">{classifierResult.rationale}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Nearby Help Section */}
          {activeSection === "help" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{t.nearbyHelpTitle}</h2>
                <p className="text-muted-foreground">{t.findHelp}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: t.nearestPolice,
                    distance: "2.5 km",
                    address: "Central Police Station, Main Street",
                    phone: "+91-XXXX-XXXX-XX",
                    icon: MapIcon,
                  },
                  {
                    title: t.nearbyCyberLawyer,
                    distance: "1.8 km",
                    address: "Legal Associates, Business Park",
                    phone: "+91-XXXX-XXXX-XX",
                    icon: Phone,
                  },
                ].map((item, idx) => (
                  <motion.div key={idx} whileHover={{ y: -5 }} className="group">
                    <Card className="bg-card border-border p-6 hover:border-primary/50 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <p className="text-sm text-primary font-medium">
                            {item.distance} {t.distanceAway}
                          </p>
                        </div>
                        <item.icon className="text-primary" size={24} />
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-muted-foreground">{item.address}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Phone size={16} />
                          {item.phone}
                        </p>
                      </div>
                      <div className="h-32 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                        Map Placeholder
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Legal Options Section - EXPANDED with 9 services */}
          {activeSection === "legal" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{t.legalTitle}</h2>
                <p className="text-muted-foreground">{t.understandRights}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {legalServices.map((service, idx) => (
                  <motion.div key={idx} whileHover={{ y: -8 }} className="group">
                    <Card className="bg-card border-border p-6 hover:border-primary/50 hover:shadow-lg transition-all h-full">
                      <div className="flex items-start gap-3 mb-3">
                        <service.icon className="text-primary mt-1" size={24} />
                        <h3 className="text-base font-semibold group-hover:text-primary transition-colors">
                          {t[service.title as keyof typeof t]}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{t[service.description as keyof typeof t]}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs group-hover:bg-primary/10 transition-colors bg-transparent"
                        onClick={() => alert(`${t[service.title as keyof typeof t]} - Coming Soon!`)}
                      >
                        {t.knowledgeMore}
                        <ArrowRight size={14} className="ml-1" />
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Export PDF Section */}
          {activeSection === "pdf" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{t.exportPDF}</h2>
                <p className="text-muted-foreground">Export your complaints and documents as PDF</p>
              </div>

              <Card className="bg-card border-border p-8">
                <div className="text-center space-y-4">
                  <FileDown className="mx-auto text-primary" size={48} />
                  <h3 className="text-xl font-semibold">Export Your Data</h3>
                  <p className="text-muted-foreground">Download all your complaints and documents in PDF format</p>
                  <Button onClick={handleExportPDF} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <FileDown className="mr-2" size={18} />
                    Export as PDF
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Safety Tips Section */}
          {activeSection === "tips" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{t.safetyTipsTitle}</h2>
                <p className="text-muted-foreground">{t.learnProtect}</p>
              </div>

              <motion.div
                key={currentTipIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="group"
              >
                <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 border-2 p-8">
                  <h3 className="text-2xl font-bold text-primary mb-3">{safetyTips[currentTipIndex].title}</h3>
                  <p className="text-lg text-foreground mb-6">{safetyTips[currentTipIndex].description}</p>
                  <Button
                    onClick={handleTipRotation}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {t.nextTip}
                  </Button>
                </Card>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4">
                {safetyTips.map((tip, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setCurrentTipIndex(idx)}
                    className="cursor-pointer"
                  >
                    <Card
                      className={`bg-card border p-4 transition-all ${
                        idx === currentTipIndex
                          ? "border-primary/50 bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <p className="font-semibold text-sm">{tip.title}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Default Dashboard View */}
          {activeSection === "dashboard" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{t.dashboard}</h2>
                <p className="text-muted-foreground">{t.welcome}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    label: t.activeComplaints,
                    value: complaints.filter((c) => c.status === "Pending").length,
                    color: "text-primary",
                  },
                  {
                    label: t.resolvedCases,
                    value: complaints.filter((c) => c.status === "Resolved").length,
                    color: "text-secondary",
                  },
                  {
                    label: t.pendingReview,
                    value: complaints.filter((c) => c.status === "In Progress").length,
                    color: "text-accent",
                  },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="bg-card border-border p-6">
                      <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                      <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}

export default UserDashboard
