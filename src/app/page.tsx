"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, FileText, BarChart, Users, ArrowRight, ShieldAlert, Cpu, Globe, CheckCircle, Siren, MessageSquare, Clock, Phone } from "lucide-react"
import Link from "next/link"
import { Language } from "@/lib/translations"
import { useLanguage } from "@/context/language-context"

// Dictionary for supported languages
const translations = {
  en: {
    secureReporting: "Secure Crime Reporting",
    madeSimple: "Made Simple",
    heroText: "A trusted platform connecting citizens with law enforcement. Report crimes securely, track your cases, and access safety resources – all in one place.",
    userLogin: "User Login",
    policeLogin: "Police Officer Login",
    featuresTitle: "Why Choose CyberSuraksha?",
    featuresSubtitle: "Built with security, accessibility, and user experience in mind",
    secure: "Secure & Confidential",
    secureDesc: "End-to-end encryption ensures your reports remain confidential and secure",
    easy: "Easy Reporting",
    easyDesc: "Simple forms with voice recording, photo uploads, and step-by-step guidance",
    tracking: "Real-time Tracking",
    trackingDesc: "Track your complaint status and receive updates throughout the process",
    policeDashboard: "Police Dashboard",
    policeDashboardDesc: "Dedicated interface for law enforcement to manage and respond to reports",
    aiAssistant: "AI Legal Assistant",
    aiAssistantDesc: "Get instant guidance on legal procedures and your rights",
    multilingual: "Multilingual Support",
    multilingualDesc: "Available in multiple languages to serve diverse communities",
    quickTitle: "Quick Actions",
    quickSubtitle: "Get started with the most common tasks",
    fileNow: "File New Complaint",
    fileNowDesc: "Report a crime or incident with our secure, guided process",
    startEmergency: "Start Emergency Report",
    safety: "Safety Resources",
    safetyDesc: "Access safety tips, legal information, and support resources",
    learnMore: "Learn More",
    emergencyTitle: "In Case of Emergency",
    emergencySubtitle: "For immediate assistance or life-threatening situations",
    callNow: "Call 100 Now",
    services: "Services",
    fileComplaint: "File Complaint",
    dashboard: "Dashboard",
    aiAssistantFooter: "AI Assistant",
    resources: "Resources",
    safetyTips: "Safety Tips",
    legalInfo: "Legal Info",
    support: "Support",
    contact: "Contact",
    emergencyPhone: "Emergency: 100",
    nonEmergency: "Non-Emergency: (555) 123-4567",
    email: "support@CyberSuraksha.gov",
    copyright: "© 2025 CyberSuraksha Platform. All rights reserved. | Privacy Policy | Terms of Service",
    platformDesc: "Secure crime reporting platform connecting citizens with law enforcement."
  },
  hi: {
    secureReporting: "सुरक्षित अपराध रिपोर्टिंग",
    madeSimple: "आसान बनाया गया",
    heroText: "एक विश्वसनीय मंच जो नागरिकों को कानून प्रवर्तन से जोड़ता है। अपराधों को सुरक्षित रूप से रिपोर्ट करें, अपने मामलों को ट्रैक करें, और सुरक्षा संसाधनों तक पहुँचें – सब एक ही जगह।",
    userLogin: "यूज़र लॉगिन",
    policeLogin: "पुलिस अधिकारी लॉगिन",
    featuresTitle: "साइबर सुरक्षा क्यों चुनें?",
    featuresSubtitle: "सुरक्षा, पहुँच, और उपयोगकर्ता अनुभव के साथ निर्मित",
    secure: "सुरक्षित और गोपनीय",
    secureDesc: "एंड-टू-एंड एन्क्रिप्शन आपकी रिपोर्ट्स को गोपनीय और सुरक्षित रखता है",
    easy: "आसान रिपोर्टिंग",
    easyDesc: "आवाज़ रिकॉर्डिंग, फोटो अपलोड और स्टेप-बाय-स्टेप गाइडेंस के साथ आसान फॉर्म",
    tracking: "रीयल-टाइम ट्रैकिंग",
    trackingDesc: "अपनी शिकायत की स्थिति को ट्रैक करें और प्रक्रिया भर में अपडेट्स प्राप्त करें",
    policeDashboard: "पुलिस डैशबोर्ड",
    policeDashboardDesc: "रिपोर्ट्स को प्रबंधित और उत्तर देने के लिए कानून प्रवर्तन के लिए समर्पित इंटरफेस",
    aiAssistant: "एआई कानूनी सहायक",
    aiAssistantDesc: "कानूनी प्रक्रियाओं और आपके अधिकारों पर त्वरित मार्गदर्शन पाएं",
    multilingual: "बहुभाषी समर्थन",
    multilingualDesc: "विविध समुदायों की सेवा के लिए कई भाषाओं में उपलब्ध",
    quickTitle: "त्वरित कार्य",
    quickSubtitle: "सबसे आम कार्यों से शुरुआत करें",
    fileNow: "नई शिकायत दर्ज करें",
    fileNowDesc: "हमारी सुरक्षित, मार्गदर्शित प्रक्रिया के साथ अपराध या घटना की रिपोर्ट करें",
    startEmergency: "आपातकालीन रिपोर्ट शुरू करें",
    safety: "सुरक्षा संसाधन",
    safetyDesc: "सुरक्षा टिप्स, कानूनी जानकारी और सहायता संसाधनों तक पहुँचें",
    learnMore: "और जानें",
    emergencyTitle: "आपातकाल की स्थिति में",
    emergencySubtitle: "तत्काल सहायता या जीवन-धमकी स्थिति के लिए",
    callNow: "अभी 100 पर कॉल करें",
    services: "सेवाएँ",
    fileComplaint: "शिकायत दर्ज करें",
    dashboard: "डैशबोर्ड",
    aiAssistantFooter: "एआई सहायक",
    resources: "संसाधन",
    safetyTips: "सुरक्षा टिप्स",
    legalInfo: "कानूनी जानकारी",
    support: "सहायता",
    contact: "संपर्क करें",
    emergencyPhone: "आपातकाल: 100",
    nonEmergency: "गैर-आपातकाल: (555) 123-4567",
    email: "support@CyberSuraksha.gov",
    copyright: "© 2025 साइबर सुरक्षा मंच. सर्वाधिकार सुरक्षित. | गोपनीयता नीति | सेवा की शर्तें",
    platformDesc: "नागरिकों को कानून प्रवर्तन से जोड़ने वाला सुरक्षित अपराध रिपोर्टिंग मंच।"
  },
  mr: {
    secureReporting: "सुरक्षित गुन्हा अहवाल",
    madeSimple: "सोपं केले",
    heroText: "नागरिकांना कायदा अंमलबजावणीशी जोडणारा विश्वासू प्लॅटफॉर्म. गुन्हे सुरक्षितपणे अहवाल द्या, आपल्या प्रकरणांचा मागोवा घ्या आणि सर्व एकाच ठिकाणी सुरक्षा संसाधनांचा लाभ घ्या.",
    userLogin: "वापरकर्ता लॉगिन",
    policeLogin: "पोलीस अधिकारी लॉगिन",
    featuresTitle: "CyberSuraksha का निवडा?",
    featuresSubtitle: "सुरक्षा, प्रवेश आणि वापरकर्ता अनुभव लक्षात घेऊन बांधलेले.",
    secure: "सुरक्षित आणि गोपनीय",
    secureDesc: "एंड-टू-एंड एनक्रिप्शनमुळे तुमचे अहवाल गोपनीय आणि सुरक्षित राहतात.",
    easy: "सोप्या सुविधा",
    easyDesc: "व्हॉइस रेकॉर्डिंग, फोटो अपलोड आणि चरणानुसार मार्गदर्शन.",
    tracking: "रीअल-टाइम ट्रॅकिंग",
    trackingDesc: "तुमच्या तक्रारींची स्थिती ट्रॅक करा आणि अद्यतने मिळवा.",
    policeDashboard: "पोलीस डॅशबोर्ड",
    policeDashboardDesc: "तक्रारी हाताळण्याकरिता कायदा अंमलबजावणीसाठी समर्पित इंटरफेस.",
    aiAssistant: "एआय कायदेशीर सहाय्यक",
    aiAssistantDesc: "कायदेशीर प्रक्रियेवरील झटपट मार्गदर्शन मिळवा.",
    multilingual: "बहुभाषिक समर्थन",
    multilingualDesc: "विविध समाजांसाठी अधिक भाषांमध्ये उपलब्ध.",
    quickTitle: "जलद कृती",
    quickSubtitle: "सर्वाधिक वापरण्यात येणाऱ्या कामांपासून सुरू करा.",
    fileNow: "नवा अहवाल द्या",
    fileNowDesc: "आमच्या सुरक्षित प्रक्रियेतून गुन्हा किंवा घटना अहवाल द्या.",
    startEmergency: "तत्काळ अहवाल सुरु करा",
    safety: "सुरक्षा संसाधने",
    safetyDesc: "सुरक्षा टीपा, कायदेशीर माहिती व मदतीचे संसाधन.",
    learnMore: "अधिक जाणून घ्या",
    emergencyTitle: "आपत्कालीन प्रसंगी",
    emergencySubtitle: "तात्काळ मदतीसाठी किंवा जीवघेण्या परिस्थित्यासाठी.",
    callNow: "आत्ताच 100 ला कॉल करा",
    services: "सेवा",
    fileComplaint: "शिकायत द्या",
    dashboard: "डॅशबोर्ड",
    aiAssistantFooter: "एआय सहाय्यक",
    resources: "संसाधने",
    safetyTips: "सुरक्षा टीपा",
    legalInfo: "कायदेशीर माहिती",
    support: "मदत",
    contact: "संपर्क",
    emergencyPhone: "आपत्कालीन: 100",
    nonEmergency: "तात्काळ नाही: (555) 123-4567",
    email: "support@CyberSuraksha.gov",
    copyright: "© 2025 CyberSuraksha प्लॅटफॉर्म. सर्व हक्क राखीव. | गोपनीयता धोरण | सेवा अटी",
    platformDesc: "नागरिकांना कायदा अंमलबजावणीशी जोडणारे सुरक्षित गुन्हा अहवाल प्लॅटफॉर्म."
  },
  te: {
    secureReporting: "భద్రమైన నేర నివేదిక",
    madeSimple: "సులభతరం చేసింది",
    heroText: "పౌరులను చట్ట అమలు సంస్థలతో అనుసంధానించే నమ్మదగిన వేదిక. నేరాలను భద్రంగా నివేదించండి, మీ కేసులను ట్రాక్ చేయండి, మరియు ఒకేచోట భద్రతా వనరులను పొందండి.",
    userLogin: "వినియోగదారు లాగిన్",
    policeLogin: "పోలీసు లాగిన్",
    featuresTitle: "CyberSuraksha ఎందుకు ఎంచుకోాలి?",
    featuresSubtitle: "భద్రత, ప్రాప్యత మరియు వినియోగదారు అనుభవంతో నిర్మించబడింది.",
    secure: "భద్రమైన మరియు గోప్యమైన",
    secureDesc: "ఎండ్-టు-ఎండ్ సంకేతీకరణ మీ నివేదికలను గోప్యంగా మరియు భద్రంగా ఉంచుతుంది.",
    easy: "సులభంగా నివేదిక చేయండి",
    easyDesc: "వాయిస్ రికార్డింగ్, ఫోటో అప్లోడ్, స్టెప్-బై-స్టెప్ మార్గదర్శకంతో సులభతరం.",
    tracking: "రియల్-టైమ్ ట్రాకింగ్",
    trackingDesc: "మీ ఫిర్యాదు స్థితిని ట్రాక్ చేయండి మరియు తాజా వివరాలు పొందండి.",
    policeDashboard: "పోలీసు డ్యాష్‌బోర్డ్",
    policeDashboardDesc: "ఫిర్యాదులను నిర్వహించడానికి మరియు స్పందించడానికి చట్ట అమలు సంస్థలకు ప్రత్యేక ఇంటర్‌ఫేస్.",
    aiAssistant: "ఏఐ లీగల్ అసిస్టెంట్",
    aiAssistantDesc: "చట్టపరమైన విధానాలపై వెంటనే మార్గదర్శనం పొందండి.",
    multilingual: "బహుభాషా మద్దతు",
    multilingualDesc: "విభిన్న వర్గాలకు అనేక భాషల్లో అందుబాటులో ఉంటుంది.",
    quickTitle: "తక్షణ చర్యలు",
    quickSubtitle: "ఎక్కువగా ఉపయోగించబడే పనులను ప్రారంభించండి.",
    fileNow: "కొత్త ఫిర్యాదు చేయండి",
    fileNowDesc: "మా భద్రమైన మార్గదర్శక ప్రక్రియతో నేరాన్ని నివేదించండి.",
    startEmergency: "తక్షణ ఫిర్యాదు ప్రారంభించండి",
    safety: "భద్రతా వనరులు",
    safetyDesc: "భద్రతా సూచనలు, చట్టపరమైన సమాచారం మరియు మద్దతు వనరులకు యాక్సెస్ చేయండి.",
    learnMore: "మరింత తెలుసుకోండి",
    emergencyTitle: "అత్యవసరం అయితే",
    emergencySubtitle: "తక్షణ సహాయానికి లేదా ప్రాణాపాయ పరిస్థితులకు.",
    callNow: "100 నంబరుకు కాల్ చేయండి",
    services: "సేవలు",
    fileComplaint: "ఫిర్యాదు చేయండి",
    dashboard: "డ్యాష్‌బోర్డ్",
    aiAssistantFooter: "ఏఐ సహాయకుడు",
    resources: "వనరులు",
    safetyTips: "భద్రతా సూచనలు",
    legalInfo: "చట్టపరమైన సమాచారం",
    support: "మద్దతు",
    contact: "సంప్రదించండి",
    emergencyPhone: "అత్యవసరం: 100",
    nonEmergency: "అత్యవసరం కాదు: (555) 123-4567",
    email: "support@CyberSuraksha.gov",
    copyright: "© 2025 CyberSuraksha సంస్థ. అన్ని హక్కులూ సంగ్రహించబడ్డాయి. | గోప్యతా విధానం | సేవా నిబంధనలు",
    platformDesc: "పౌరులను చట్ట అమలు సంస్థలతో అనుసంధానించే భద్రమైన నేర నివేదిక వేదిక."
  },
  ta: {
    secureReporting: "பாதுகாப்பான குற்ற அறிக்கை",
    madeSimple: "எளிமைப்படுத்தப்பட்டது",
    heroText: "பொதுமக்களை சட்ட அமல் அதிகாரிகளுடன் இணைக்கும் நம்பகமான தளம். குற்றங்களை பாதுகாப்பாக புகாரளிக்கவும், உங்கள் வழக்குகளை கண்காணிக்கவும் மற்றும் ஒரே இடத்தில் பாதுகாப்பு வளங்களை அணுகவும்.",
    userLogin: "பயனர் உள்நுழைவு",
    policeLogin: "போலீஸ் உள்நுழைவு",
    featuresTitle: "ஏன் CyberSuraksha?",
    featuresSubtitle: "பாதுகாப்பு, அணுகல் மற்றும் பயனர் அனுபவத்துடன் உருவாக்கப்பட்டது.",
    secure: "பாதுகாப்பும் ரகசியமும்",
    secureDesc: "முடிவற்ற குறியீடு உங்கள் அறிக்கைகளை பாதுகாக்கிறது.",
    easy: "எளிதான அறிக்கை",
    easyDesc: "குரல் பதிவு, புகைப்படங்களைப் பதிவேற்றுதல், படி படி வழிகாட்டுதல் உட்பட எளிதான படிவம்.",
    tracking: "உண்மை நேர கண்காணிப்பு",
    trackingDesc: "உங்கள் புகாரின் நிலையை கண்காணிக்கவும், செயல்நிலை புதுப்பிப்புகளைப் பெறவும்.",
    policeDashboard: "போலீஸ் டாஷ்போர்ட்",
    policeDashboardDesc: "சட்ட அமலுக்கு பிரத்தியேக இடைமுகம்.",
    aiAssistant: "ஏஐ சட்ட உதவி",
    aiAssistantDesc: "சட்டச் செயல்முறைகளிலும் உங்கள் உரிமைகளிலும் உடனடித் திசைவு பெறுங்கள்.",
    multilingual: "பலமொழி ஆதரவு",
    multilingualDesc: "பல்கலைகளுக்கு பல மொழிகளில் கிடைக்கும்.",
    quickTitle: "விரைவு செயல்கள்",
    quickSubtitle: "அதிகமாக பயன்படுத்தப்படும் பணிகளுடன் தொடங்கு.",
    fileNow: "புதிய புகார் சமர்ப்பிக்கவும்",
    fileNowDesc: "இணைந்த பாதுகாப்பான செயல்முறையுடன் குற்றத்தைப் புகாரளிக்கவும்.",
    startEmergency: "அவசர புகார் தொடங்கவும்",
    safety: "பாதுகாப்பு வளங்கள்",
    safetyDesc: "பாதுகாப்பு குறிப்புகள், சட்டத் தகவல் மற்றும் ஆதரவு வளங்களை அணுகவும்.",
    learnMore: "மேலும் அறிக",
    emergencyTitle: "அவசரம் ஏற்பட்டால்",
    emergencySubtitle: "உடனடி உதவிக்கு அல்லது உயிர் ஆபத்து ஏற்பட்டால்.",
    callNow: "100க்கு அழைப்பு",
    services: "சேவை",
    fileComplaint: "புகாரளிக்கவும்",
    dashboard: "டாஷ்போர்ட்",
    aiAssistantFooter: "ஏஐ உதவி",
    resources: "வளங்கள்",
    safetyTips: "பாதுகாப்பு குறிப்புகள்",
    legalInfo: "சட்டத் தகவல்",
    support: "ஆதரவு",
    contact: "தொடர்புக்கு",
    emergencyPhone: "அவசரம்: 100",
    nonEmergency: "அவசரம் இல்லை: (555) 123-4567",
    email: "support@CyberSuraksha.gov",
    copyright: "© 2025 CyberSuraksha தளம். எல்லா உரிமைகளும் பாதுகாக்கப்படுகின்றன. | தனியுரிமைக் கொள்கை | சேவை விதிகள்",
    platformDesc: "சட்ட அமல் அதிகாரிகள் மற்றும் பொதுமக்களை இணைக்கும் பாதுகாப்பான குற்ற அறிக்கைத்தளம்."
  },
  bn: {
    secureReporting: "নিরাপদ অপরাধ রিপোর্টিং",
    madeSimple: "সহজতর করা হয়েছে",
    heroText: "নাগরিকদের আইন প্রয়োগকারীদের সাথে সংযুক্ত করে এমন একটি বিশ্বস্ত প্ল্যাটফর্ম। নিরাপদে অপরাধ রিপোর্ট করুন, আপনার মামলা ট্র্যাক করুন এবং সমস্ত নিরাপত্তা সম্পদ একটি জায়গায় অ্যাক্সেস করুন।",
    userLogin: "ব্যবহারকারী লগইন",
    policeLogin: "পুলিশ লগইন",
    featuresTitle: "কেন CyberSuraksha বেছে নেবেন?",
    featuresSubtitle: "নিরাপত্তা, অ্যাক্সেসিবিলিটি এবং ব্যবহারকারীর অভিজ্ঞতা বজায় রেখে তৈরি।",
    secure: "নিরাপদ ও গোপনীয়",
    secureDesc: "এন্ড-টু-এন্ড এনক্রিপশনের মাধ্যমে আপনার রিপোর্টগুলি গোপনীয় এবং নিরাপদ থাকে।",
    easy: "সহজ রিপোর্টিং",
    easyDesc: "ভয়েস রেকর্ডিং, ছবি আপলোড এবং ধাপে ধাপে নির্দেশনার মাধ্যমে সহজ ফর্ম।",
    tracking: "রিয়েল-టైম ট্র্যাকিং",
    trackingDesc: "আপনার অভিযোগের অবস্থা ট্র্যাক করুন এবং আপডেট পান।",
    policeDashboard: "পুলিশ ড্যাশবোর্ড",
    policeDashboardDesc: "রিপোর্ট পরিচালনা ও সাড়া দেওয়ার জন্য আইন প্রয়োগকারীদের জন্য পৃথক ইন্টারফেস।",
    aiAssistant: "এআই আইনি সহকারী",
    aiAssistantDesc: "আইনি পদ্ধতি এবং আপনার অধিকার সম্পর্কে দ্রুত দিকনির্দেশনা পান।",
    multilingual: "বহুভাষিক সহায়তা",
    multilingualDesc: "বিভিন্ন সম্প্রদায়ের সেবা দিতে একাধিক ভাষায় উপলব্ধ।",
    quickTitle: "দ্রুত ক্রিয়া",
    quickSubtitle: "সবচেয়ে সাধারণ কাজগুলি দিয়ে শুরু করুন।",
    fileNow: "নতুন অভিযোগ জানান",
    fileNowDesc: "আমাদের নিরাপদ, নির্দেশনা ভিত্তিক প্রক্রিয়া দিয়ে অপরাধ বা ঘটনা রিপোর্ট করুন।",
    startEmergency: "জরুরী রিপোর্ট শুরু করুন",
    safety: "নিরাপত্তা রিসোর্স",
    safetyDesc: "নিরাপত্তা টিপস, আইনি তথ্য এবং সহায়তা রিসোর্সে প্রবেশ করুন।",
    learnMore: "আরও জানুন",
    emergencyTitle: "জরুরী প্রয়োজনে",
    emergencySubtitle: "তাৎক্ষণিক সহায়তা বা জীবন-হুমকির পরিস্থিতিতে।",
    callNow: "এখনই 100-এ কল করুন",
    services: "সেবা",
    fileComplaint: "অভিযোগ জানান",
    dashboard: "ড্যাশবোর্ড",
    aiAssistantFooter: "এআই সহায়তা",
    resources: "রিসোর্স",
    safetyTips: "নিরাপত্তা পরামর্শ",
    legalInfo: "আইনি তথ্য",
    support: "সহায়তা",
    contact: "যোগাযোগ",
    emergencyPhone: "জরুরী: 100",
    nonEmergency: "জরুরী নয়: (555) 123-4567",
    email: "support@CyberSuraksha.gov",
    copyright: "© 2025 CyberSuraksha প্ল্যাটফর্ম. সর্বস্বত্ব সংরক্ষিত। | গোপনীয়তা নীতি | পরিষেবার শর্তাবলী",
    platformDesc: "নাগরিক ও আইন প্রয়োগকারীদের সংযুক্ত করে নিরাপদ অপরাধ রিপোর্টিং প্ল্যাটফর্ম."
  },
  kn: {
    secureReporting: "ಸುರಕ್ಷಿತ ಅಪರಾಧ ವರದಿ",
    madeSimple: "ಸರಳಗೊಳಿಸಲಾಗಿದೆ",
    heroText: "ನಗರಿಕರನ್ನು ಕಾನೂನು ಅನುಷ್ಠಾತೃಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವ ವಿಶ್ವಾಸಾರ್ಹ ವೇದಿಕೆ. ಅಪರಾಧಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ವರದಿ ಮಾಡಿ, ನಿಮ್ಮ ಪ್ರಕರಣಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ, ಮತ್ತು ಎಲ್ಲಾ ಸಂಖ್ಯೆಯಲ್ಲಿ ಸುರಕ್ಷತಾ ಸಂಪನ್ಮೂಲಗಳನ್ನು ಪಡೆಯಿರಿ.",
    userLogin: "ಬಳಕೆದಾರ ಲಾಗಿನ್",
    policeLogin: "ಪೊಲೀಸ್ ಲಾಗಿನ್",
    featuresTitle: "ಏಕೆ CyberSuraksha?",
    featuresSubtitle: "ಭದ್ರತೆ, ಪ್ರವೇಶ ಮತ್ತು ಬಳಕೆದಾರ ಅನುಭವದೊಂದಿಗೆ ನಿರ್ಮಿಸಲಾಗಿದೆ.",
    secure: "ಭದ್ರ ಮತ್ತು ಗೌಪ್ಯ",
    secureDesc: "ಎಂಡ್-ಟು-ಎಂಡ್ ಎನ್ಕ್ರಿಪ್ಶನ್ ನಿಮ್ಮ ವರದಿಗಳನ್ನು ಗೌಪ್ಯವಾಗಿರಿಸುತ್ತದೆ.",
    easy: "ಸರಳ ವರದಿ",
    easyDesc: "ಧ್ವನಿ ದಾಖಲೆ, ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮತ್ತು ಹಂತ ಹಂತವಾಗಿ ಮಾರ್ಗದರ್ಶನ.",
    tracking: "ರಿಯಲ್-ಟೈಮ್ ಟ್ರ್ಯಾಕಿಂಗ್",
    trackingDesc: "ನಿಮ್ಮ ದೂರಿನ ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ನವೀಕರಣಗಳನ್ನು ಪಡೆಯಿರಿ.",
    policeDashboard: "ಪೊಲೀಸ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    policeDashboardDesc: "ದೂರುಗಳನ್ನು ನಿರ್ವಹಿಸಲು ಮತ್ತು ಪ್ರತಿಕ್ರಿಯಿಸಲು ಕಾನೂನು ಅನುಷ್ಠಾತೃಗಳಿಗೆ ಸಮರ್ಪಿತ ಇಂಟರ್ಫೇಸ್.",
    aiAssistant: "ಎಐ ಕಾನೂನು ಸಹಾಯ",
    aiAssistantDesc: "ಕಾನೂನು ಪ್ರಕ್ರಿಯೆಗಳಲ್ಲಿ ಮತ್ತು ನಿಮ್ಮ ಹಕ್ಕುಗಳಲ್ಲಿ ತ್ವರಿತ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.",
    multilingual: "ಬಹುಭಾಷಾ ಬೆಂಬಲ",
    multilingualDesc: "ವೈವಿಧ್ಯಮಯ ಸಮುದಾಯಗಳಿಗೆ ಅನೇಕ ಭಾಷೆಗಳಲ್ಲಿ ಲಭ್ಯವಿದೆ.",
    quickTitle: "ತಕ್ಷಣದ ಕ್ರಿಯೆಗಳು",
    quickSubtitle: "ಅತಿ ಹೆಚ್ಚು ಬಳಸುವ ಕಾರ್ಯಗಳಿಂದ ಪ್ರಾರಂಭಿಸಿ.",
    fileNow: "ಹೊಸ ದೂರು ಸಲ್ಲಿಸಿ",
    fileNowDesc: "ನಮ್ಮ ಸುರಕ್ಷಿತ ಮಾರ್ಗದರ್ಶನ ಪ್ರಕ್ರಿಯೆಯೊಂದಿಗೆ ಅಪರಾಧ ಅಥವಾ ಘಟನೆಯನ್ನು ವರದಿ ಮಾಡಿ.",
    startEmergency: "ತುರ್ತು ವರದಿ ಪ್ರಾರಂಭಿಸಿ",
    safety: "ಸುರಕ್ಷತಾ ಸಂಪನ್ಮೂಲಗಳು",
    safetyDesc: "ಸುರಕ್ಷತಾ ಟಿಪ್ಪಣಿಗಳು, ಕಾನೂನು ಮಾಹಿತಿ ಮತ್ತು ಬೆಂಬಲ ಸಂಪನ್ಮೂಲಗಳಿಗೆ ಪ್ರವೇಶವನ್ನು ಪಡೆಯಿರಿ.",
    learnMore: "ಹೆಚ್ಚು ತಿಳಿದುಕೊಳ್ಳಿ",
    emergencyTitle: "ತುರ್ತು ಅವಶ್ಯಕತೆ",
    emergencySubtitle: "ತಕ್ಷಣದ ಸಹಾಯ ಅಥವಾ ಜೀವ ಅಪಾಯದ ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ.",
    callNow: "ಈಗಲೇ 100 ಕ್ಕೆ ಕಾಲ್ ಮಾಡಿ",
    services: "ಸೇವೆಗಳು",
    fileComplaint: "ದೂರು ಸಲ್ಲಿಸಿ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    aiAssistantFooter: "ಎಐ ಸಹಾಯ",
    resources: "ಸಂಪನ್ಮೂಲಗಳು",
    safetyTips: "ಸುರಕ್ಷತಾ ಟಿಪ್ಪಣಿಗಳು",
    legalInfo: "ಕಾನೂನು ಮಾಹಿತಿ",
    support: "ಬೆಂಬಲ",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    emergencyPhone: "ತುರ್ತು: 100",
    nonEmergency: "ತುರ್ತು ಅಲ್ಲ: (555) 123-4567",
    email: "support@CyberSuraksha.gov",
    copyright: "© 2025 CyberSuraksha ವೇದಿಕೆ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ. | ಗುಪ್ತತಾ ನೀತಿ | ಸೇವಾ ನಿಯಮಗಳು",
    platformDesc: "ನಗರಿಕರು ಮತ್ತು ಕಾನೂನು ಅನುಷ್ಠಾತೃಗಳನ್ನು ಸಂಪರ್ಕಿಸುವ ಸುರಕ್ಷಿತ ಅಪರಾಧ ವರದಿ ವೇದಿಗೆ."
  }
};

// Define supported language codes and labels:
const languageOptions = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "mr", label: "मराठी" },
  { code: "te", label: "తెలుగు" },
  { code: "ta", label: "தமிழ்" },
  { code: "bn", label: "বাংলা" },
  { code: "kn", label: "ಕನ್ನಡ" }
];

export default function HomePage() {
  const { language, setLanguage } = useLanguage();

  // Use local translations for landing page specific content
  // Fallback to English if the current global language doesn't have a translation key here
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Header />
      <div className="flex justify-end px-6 pt-4">
        <select
          value={language}
          onChange={e => setLanguage(e.target.value as Language)}
          className="border px-2 py-1 rounded bg-white dark:bg-slate-800 text-sm ring-1 ring-slate-200 dark:ring-slate-700"
        >
          {languageOptions.map(l => (
            <option value={l.code} key={l.code}>{l.label}</option>
          ))}
        </select>
      </div>
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-8 lg:px-10">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl glassy shadow-2xl rounded-3xl p-10 text-center space-y-8 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight text-foreground drop-shadow-md">
              {t.secureReporting}
              <span className="block bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                {t.madeSimple}
              </span>
            </h1>
            <p className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.heroText}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg">
                <Link href="/signin">{t.userLogin}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg">
                <Link href="/police/signin">{t.policeLogin}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-8 lg:px-10 bg-gradient-to-r from-blue-50/30 to-blue-100/10 dark:from-gray-900/40 dark:to-gray-950/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-3">{t.featuresTitle}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.featuresSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Card className="hover:scale-[1.03] transition-transform duration-200 glassy border-0 shadow-xl">
              <CardHeader>
                <Lock className="h-12 w-12 text-primary drop-shadow mb-4" />
                <CardTitle>{t.secure}</CardTitle>
                <CardDescription>
                  {t.secureDesc}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:scale-[1.03] transition-transform duration-200 glassy border-0 shadow-xl">
              <CardHeader>
                <FileText className="h-12 w-12 text-primary drop-shadow mb-4" />
                <CardTitle>{t.easy}</CardTitle>
                <CardDescription>
                  {t.easyDesc}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:scale-[1.03] transition-transform duration-200 glassy border-0 shadow-xl">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary drop-shadow mb-4" />
                <CardTitle>{t.tracking}</CardTitle>
                <CardDescription>
                  {t.trackingDesc}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:scale-[1.03] transition-transform duration-200 glassy border-0 shadow-xl">
              <CardHeader>
                <Users className="h-12 w-12 text-primary drop-shadow mb-4" />
                <CardTitle>{t.policeDashboard}</CardTitle>
                <CardDescription>
                  {t.policeDashboardDesc}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:scale-[1.03] transition-transform duration-200 glassy border-0 shadow-xl">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-primary drop-shadow mb-4" />
                <CardTitle>{t.aiAssistant}</CardTitle>
                <CardDescription>
                  {t.aiAssistantDesc}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:scale-[1.03] transition-transform duration-200 glassy border-0 shadow-xl">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary drop-shadow mb-4" />
                <CardTitle>{t.multilingual}</CardTitle>
                <CardDescription>
                  {t.multilingualDesc}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
      {/* Quick Actions */}
      <section className="py-20 px-4 sm:px-8 lg:px-10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-foreground mb-2">{t.quickTitle}</h2>
            <p className="text-lg text-muted-foreground">{t.quickSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-7 glassy shadow-xl hover:scale-[1.02] border-red-500/20 bg-red-50/50 dark:bg-red-950/10">
              <CardContent className="space-y-4">
                <Siren className="h-16 w-16 text-red-600 mx-auto drop-shadow animate-pulse" />
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-1 text-red-700 dark:text-red-400">Emergency / Anonymous</h3>
                  <p className="text-muted-foreground mb-3">
                    Report urgent incidents anonymously without logging in.
                  </p>
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30">
                    <Link href="/emergency-report">{t.startEmergency}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="p-7 glassy shadow-xl hover:scale-[1.02]">
              <CardContent className="space-y-4">
                <Shield className="h-16 w-16 text-primary mx-auto drop-shadow" />
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-1">{t.safety}</h3>
                  <p className="text-muted-foreground mb-3">
                    {t.safetyDesc}
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/safety">{t.learnMore}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Emergency Contact */}
      <section className="py-16 px-4 sm:px-8 lg:px-10 bg-emergency/10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-6">
            <Phone className="h-16 w-16 text-emergency mx-auto drop-shadow" />
            <h2 className="text-3xl font-bold text-foreground">{t.emergencyTitle}</h2>
            <p className="text-lg text-muted-foreground">{t.emergencySubtitle}</p>
            <Button
              size="lg"
              className="text-xl px-14 py-7 bg-emergency hover:bg-emergency/90 text-emergency-foreground animate-pulse"
              onClick={() => (window.location.href = "tel:100")}
            >
              {t.callNow}
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-12 px-4 sm:px-8 lg:px-10 border-t bg-white/60 dark:bg-gray-900/40 shadow-inner">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">CyberSuraksha</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t.platformDesc}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t.services}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/file-complaint" className="hover:text-foreground">
                    {t.fileComplaint}
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-foreground">
                    {t.dashboard}
                  </Link>
                </li>
                <li>
                  <Link href="/ai-assistant" className="hover:text-foreground">
                    {t.aiAssistantFooter}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t.resources}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/safety" className="hover:text-foreground">
                    {t.safetyTips}
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="hover:text-foreground">
                    {t.legalInfo}
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-foreground">
                    {t.support}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t.contact}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{t.emergencyPhone}</li>
                <li>{t.nonEmergency}</li>
                <li>{t.email}</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>{t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
