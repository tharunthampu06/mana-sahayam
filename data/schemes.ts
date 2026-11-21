export interface Scheme {
  id: string;
  name: string;
  name_te: string;
  name_hi: string;
  state: string;
  lifecycle: "Live" | "Upcoming" | "Completed";
  benefit: string;
  benefit_te: string;
  benefit_hi: string;
  max_income_rural: number;
  max_income_urban: number;
  eligible_categories: string[];
  target_group: string[];
  deadline: string;
  last_verified: string;
  official_url: string;
  rule_reasons: string[];
  rule_reasons_te: string[];
  rule_reasons_hi: string[];
  documents: string[];
  documents_te: string[];
  documents_hi: string[];
  steps: string[];
  steps_te: string[];
  steps_hi: string[];
}

export const INITIAL_SCHEMES: Scheme[] = [
  {
    id: "ts-epass-pms",
    name: "Telangana ePASS Post-Matric Scholarship (RTF & MTF)",
    name_te: "తెలంగాణ ePASS పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్ (RTF & MTF)",
    name_hi: "तेलंगाना ePASS पोस्ट-मैट्रिक छात्रवृत्ति (RTF और MTF)",
    state: "Telangana",
    lifecycle: "Live",
    benefit: "100% Tuition Fee Reimbursement + Monthly Maintenance Allowance",
    benefit_te: "100% ట్యూషన్ ఫీజు రీయింబర్స్‌మెంట్ + నెలవారీ నిర్వహణ భత్యం",
    benefit_hi: "100% ट्यूशन फीस प्रतिपूर्ति + मासिक रखरखाव भत्ता",
    max_income_rural: 150000,
    max_income_urban: 200000,
    eligible_categories: ["BC", "SC", "ST", "EBC", "Minority"],
    target_group: ["btech", "degree", "student"],
    deadline: "2026-12-31",
    last_verified: "Nov 2026",
    official_url: "https://telanganaepass.cgg.gov.in",
    rule_reasons: [
      "Convener quota B.Tech / Degree students in Telangana are eligible.",
      "Requires valid MeeSeva Income & Caste certificates issued after April 1.",
    ],
    rule_reasons_te: [
      "తెలంగాణలో కన్వీనర్ కోటా B.Tech / డిగ్రీ విద్యార్థులు అర్హులు.",
      "ఏప్రిల్ 1 తర్వాత జారీ చేసిన మీసేవ ఆదాయ మరియు కుల ధృవీకరణ పత్రాలు అవసరం.",
    ],
    rule_reasons_hi: [
      "तेलंगाना में कन्वीनर कोटा के B.Tech / डिग्री छात्र पात्र हैं।",
      "1 अप्रैल के बाद जारी वैध मीसेवा आय और जाति प्रमाण पत्र आवश्यक हैं।",
    ],
    documents: [
      "MeeSeva Income Certificate (Current Financial Year)",
      "MeeSeva Caste / Community Certificate",
      "TS EAPCET / DOST Allotment Order & Bonafide Certificate",
      "SSC (10th) & Previous Year Marks Memo",
      "Aadhaar-linked Student Bank Passbook",
    ],
    documents_te: [
      "మీసేవ ఆదాయ ధృవీకరణ పత్రం (ప్రస్తుత ఆర్థిక సంవత్సరం)",
      "మీసేవ కుల ధృవీకరణ పత్రం",
      "TS EAPCET / DOST అలాట్‌మెంట్ ఆర్డర్ & బోనఫైడ్ సర్టిఫికెట్",
      "10వ తరగతి & గత సంవత్సరం మార్కుల మెమో",
      "ఆధార్ లింక్ అయిన విద్యార్థి బ్యాంక్ పాస్‌బుక్",
    ],
    documents_hi: [
      "मीसेवा आय प्रमाण पत्र (वर्तमान वित्तीय वर्ष)",
      "मीसेवा जाति / समुदाय प्रमाण पत्र",
      "TS EAPCET / DOST आवंटन आदेश और बोनाफाइड प्रमाण पत्र",
      "10वीं (SSC) और पिछले वर्ष की अंकतालिका",
      "आधार से लिंक छात्र बैंक पासबुक",
    ],
    steps: [
      "Visit your nearest MeeSeva center to obtain updated Income & Caste certificates.",
      "Open telanganaepass.cgg.gov.in and select Fresh / Renewal Registration.",
      "Enter SSC hall ticket number, college admission details, and MeeSeva certificate numbers.",
      "Submit printed acknowledgment copy with documents to your college scholarship clerk.",
    ],
    steps_te: [
      "సమీపంలోని మీసేవ కేంద్రానికి వెళ్లి తాజా ఆదాయ & కుల ధృవీకరణ పత్రాలు పొందండి.",
      "telanganaepass.cgg.gov.in తెరిచి Fresh / Renewal రిజిస్ట్రేషన్ ఎంచుకోండి.",
      "SSC హాల్ టికెట్ నంబర్, కాలేజీ వివరాలు మరియు మీసేవ సర్టిఫికెట్ నంబర్లు నమోదు చేయండి.",
      "ప్రింట్ చేసిన రసీదు మరియు పత్రాలను మీ కాలేజీ స్కాలర్‌షిప్ క్లర్క్‌కు సమర్పించండి.",
    ],
    steps_hi: [
      "नजदीकी मीसेवा केंद्र पर जाकर नवीनतम आय और जाति प्रमाण पत्र प्राप्त करें।",
      "telanganaepass.cgg.gov.in खोलें और Fresh / Renewal पंजीकरण चुनें।",
      "SSC हॉल टिकट नंबर, कॉलेज प्रवेश विवरण और मीसेवा प्रमाण पत्र नंबर दर्ज करें।",
      "प्रिंट की गई रसीद और दस्तावेज अपने कॉलेज के छात्रवृत्ति क्लर्क को जमा करें।",
    ],
  },
  {
    id: "pm-vidyalaxmi",
    name: "PM-Vidyalaxmi Central Education Financial Support",
    name_te: "PM-విద్యాలక్ష్మి కేంద్ర విద్యా ఆర్థిక సహాయం",
    name_hi: "पीएम-विद्यालक्ष्मी केंद्रीय शिक्षा वित्तीय सहायता",
    state: "All India",
    lifecycle: "Live",
    benefit: "Up to Rs 7.5 Lakh Collateral-Free Loan + 3% Interest Subvention",
    benefit_te: "రూ. 7.5 లక్షల వరకు పూచీకత్తు లేని రుణం + 3% వడ్డీ రాయితీ",
    benefit_hi: "₹7.5 लाख तक बिना गारंटी शिक्षा ऋण + 3% ब्याज सब्सिडी",
    max_income_rural: 800000,
    max_income_urban: 800000,
    eligible_categories: ["BC", "SC", "ST", "EBC", "Minority", "OC"],
    target_group: ["btech", "degree", "student"],
    deadline: "2027-03-31",
    last_verified: "Nov 2026",
    official_url: "https://pmvidyalaxmi.co.in",
    rule_reasons: [
      "Available across all Indian states for merit-based higher education admissions.",
      "3% interest subvention applies for annual family income up to ₹8 Lakh.",
    ],
    rule_reasons_te: [
      "మెరిట్ ఆధారిత ఉన్నత విద్యా ప్రవేశాలకు భారతదేశంలోని అన్ని రాష్ట్రాలలో అందుబాటులో ఉంది.",
      "రూ. 8 లక్షల వరకు వార్షిక కుటుంబ ఆదాయం ఉన్నవారికి 3% వడ్డీ రాయితీ వర్తిస్తుంది.",
    ],
    rule_reasons_hi: [
      "मेरिट आधारित उच्च शिक्षा प्रवेश के लिए भारत के सभी राज्यों में उपलब्ध है।",
      "₹8 लाख तक की वार्षिक पारिवारिक आय पर 3% ब्याज सब्सिडी लागू होती है।",
    ],
    documents: [
      "College Admission Offer Letter & Fee Structure",
      "Family Annual Income Certificate (Below ₹8 Lakh)",
      "10th, 12th & Entrance Exam Scorecards",
      "Student & Co-Applicant KYC + Bank Statements",
    ],
    documents_te: [
      "కాలేజీ అడ్మిషన్ ఆఫర్ లెటర్ & ఫీజు వివరాలు",
      "కుటుంబ వార్షిక ఆదాయ ధృవీకరణ పత్రం (రూ. 8 లక్షల లోపు)",
      "10వ, 12వ తరగతి & ప్రవేశ పరీక్ష మార్కుల కార్డులు",
      "విద్యార్థి & సహ-దరఖాస్తుదారు KYC + బ్యాంక్ స్టేట్‌మెంట్లు",
    ],
    documents_hi: [
      "कॉलेज प्रवेश प्रस्ताव पत्र और शुल्क विवरण",
      "पारिवारिक वार्षिक आय प्रमाण पत्र (₹8 लाख से कम)",
      "10वीं, 12वीं और प्रवेश परीक्षा स्कोरकार्ड",
      "छात्र और सह-आवेदक KYC + बैंक स्टेटमेंट",
    ],
    steps: [
      "Register on pmvidyalaxmi.co.in using your mobile number and email.",
      "Fill out the Common Education Loan Application Form (CELAF).",
      "Select up to 3 banks for instant digital sanction and interest subvention tracking.",
    ],
    steps_te: [
      "మీ మొబైల్ నంబర్ మరియు ఇమెయిల్‌తో pmvidyalaxmi.co.in లో నమోదు చేసుకోండి.",
      "కామన్ ఎడ్యుకేషన్ లోన్ అప్లికేషన్ ఫారమ్ (CELAF) పూర్తి చేయండి.",
      "తక్షణ డిజిటల్ మంజూరు మరియు వడ్డీ రాయితీ కోసం గరిష్టంగా 3 బ్యాంకులను ఎంచుకోండి.",
    ],
    steps_hi: [
      "अपने मोबाइल नंबर और ईमेल का उपयोग करके pmvidyalaxmi.co.in पर पंजीकरण करें।",
      "कॉमन एजुकेशन लोन एप्लीकेशन फॉर्म (CELAF) भरें।",
      "त्वरित डिजिटल स्वीकृति और ब्याज सब्सिडी ट्रैकिंग के लिए अधिकतम 3 बैंक चुनें।",
    ],
  },
  {
    id: "ap-vidya-deevena",
    name: "Andhra Pradesh Post-Matric Fee Reimbursement Scheme",
    name_te: "ఆంధ్రప్రదేశ్ పోస్ట్-మెట్రిక్ ఫీజు రీయింబర్స్‌మెంట్ పథకం",
    name_hi: "आंध्र प्रदेश पोस्ट-मैट्रिक शुल्क प्रतिपूर्ति योजना",
    state: "Andhra Pradesh",
    lifecycle: "Live",
    benefit: "Full Tuition Fee Credit Directly to Mother's Bank Account",
    benefit_te: "పూర్తి ట్యూషన్ ఫీజు నేరుగా తల్లి బ్యాంక్ ఖాతాలో జమ",
    benefit_hi: "पूर्ण ट्यूशन फीस सीधे माता के बैंक खाते में जमा",
    max_income_rural: 250000,
    max_income_urban: 250000,
    eligible_categories: ["BC", "SC", "ST", "EBC", "Minority"],
    target_group: ["btech", "degree", "student"],
    deadline: "2026-12-20",
    last_verified: "Nov 2026",
    official_url: "https://jnanabhumi.ap.gov.in",
    rule_reasons: [
      "Applicable to permanent residents of Andhra Pradesh enrolled in Degree/B.Tech.",
      "Minimum 75% classroom attendance required for quarterly release.",
    ],
    rule_reasons_te: [
      "డిగ్రీ/B.Tech చదువుతున్న ఆంధ్రప్రదేశ్ శాశ్వత నివాసితులకు వర్తిస్తుంది.",
      "త్రైమాసిక ఫీజు విడుదలకు కనీసం 75% హాజరు అవసరం.",
    ],
    rule_reasons_hi: [
      "डिग्री/B.Tech में नामांकित आंध्र प्रदेश के स्थायी निवासियों के लिए लागू।",
      "त्रैमासिक किस्त जारी होने के लिए न्यूनतम 75% उपस्थिति अनिवार्य है।",
    ],
    documents: [
      "Rice Card / Integrated Caste & Income Certificate",
      "College Admission & CET Allotment Letter",
      "Mother's Aadhaar-Seeded Active Bank Passbook",
      "Biometric Authentication at Village/Ward Secretariat",
    ],
    documents_te: [
      "రైస్ కార్డ్ / ఇంటిగ్రేటెడ్ కుల & ఆదాయ ధృవీకరణ పత్రం",
      "కాలేజీ అడ్మిషన్ & CET అలాట్‌మెంట్ లెటర్",
      "తల్లి ఆధార్ సీడెడ్ యాక్టివ్ బ్యాంక్ పాస్‌బుక్",
      "గ్రామ/వార్డు సచివాలయంలో బయోమెట్రిక్ ధృవీకరణ",
    ],
    documents_hi: [
      "राइस कार्ड / एकीकृत जाति और आय प्रमाण पत्र",
      "कॉलेज प्रवेश और CET आवंटन पत्र",
      "माता की आधार-सीडेड सक्रिय बैंक पासबुक",
      "ग्राम/वार्ड सचिवालय में बायोमेट्रिक सत्यापन",
    ],
    steps: [
      "Verify student & mother eKYC at your Grama/Ward Sachivalayam.",
      "Submit admission details through college login on jnanabhumi.ap.gov.in.",
      "Track quarterly payment status online using student Aadhaar/application ID.",
    ],
    steps_te: [
      "మీ గ్రామ/వార్డు సచివాలయంలో విద్యార్థి & తల్లి eKYC ధృవీకరించండి.",
      "jnanabhumi.ap.gov.in లో కాలేజీ లాగిన్ ద్వారా అడ్మిషన్ వివరాలు సమర్పించండి.",
      "ఆన్‌లైన్‌లో త్రైమాసిక చెల్లింపు స్థితిని ట్రాక్ చేయండి.",
    ],
    steps_hi: [
      "अपने ग्राम/वार्ड सचिवालय में छात्र और माता का eKYC सत्यापित करें।",
      "jnanabhumi.ap.gov.in पर कॉलेज लॉगिन के माध्यम से प्रवेश विवरण जमा करें।",
      "ऑनलाइन त्रैमासिक भुगतान स्थिति को ट्रैक करें।",
    ],
  },
  {
    id: "pm-vishwakarma",
    name: "PM Vishwakarma Artisan & Tailoring Toolkit Support",
    name_te: "PM విశ్వకర్మ చేతివృత్తి & టైలరింగ్ టూల్‌కిట్ సహాయం",
    name_hi: "पीएम विश्वकर्मा कारीगर और सिलाई टूलकिट सहायता",
    state: "All India",
    lifecycle: "Live",
    benefit: "Rs 15,000 Free Toolkit Grant + Rs 1 Lakh Loan at 5% Interest",
    benefit_te: "రూ. 15,000 ఉచిత టూల్‌కిట్ గ్రాంట్ + 5% వడ్డీతో రూ. 1 లక్ష రుణం",
    benefit_hi: "₹15,000 निःशुल्क टूलकिट अनुदान + 5% ब्याज पर ₹1 लाख ऋण",
    max_income_rural: 300000,
    max_income_urban: 300000,
    eligible_categories: ["BC", "SC", "ST", "EBC", "Minority", "OC"],
    target_group: ["business", "artisan"],
    deadline: "2027-02-28",
    last_verified: "Nov 2026",
    official_url: "https://pmvishwakarma.gov.in",
    rule_reasons: [
      "Covers 18 traditional trades including Tailoring (Darzi), Carpentry, and Masonry.",
      "Includes 5-day paid skill training at ₹500/day stipend.",
    ],
    rule_reasons_te: [
      "టైలరింగ్ (దర్జీ), వడ్రంగి మరియు తాపీ పనితో సహా 18 సంప్రదాయ వృత్తులకు వర్తిస్తుంది.",
      "రోజుకు రూ. 500 స్టైపెండ్‌తో 5 రోజుల నైపుణ్య శిక్షణ ఉంటుంది.",
    ],
    rule_reasons_hi: [
      "सिलाई (दर्जी), बढ़ईगीरी और राजमिस्त्री सहित 18 पारंपरिक व्यवसायों को कवर करता है।",
      "₹500/दिन वजीफे के साथ 5-दिवसीय कौशल प्रशिक्षण शामिल है।",
    ],
    documents: [
      "Aadhaar Card & Active Mobile Number",
      "Ration Card / Family Member Details",
      "Bank Passbook for DBT Stipend & Toolkit Voucher",
    ],
    documents_te: [
      "ఆధార్ కార్డ్ & యాక్టివ్ మొబైల్ నంబర్",
      "రేషన్ కార్డ్ / కుటుంబ సభ్యుల వివరాలు",
      "DBT స్టైపెండ్ & టూల్‌కిట్ వోచర్ కోసం బ్యాంక్ పాస్‌బుక్",
    ],
    documents_hi: [
      "आधार कार्ड और सक्रिय मोबाइल नंबर",
      "राशन कार्ड / परिवार के सदस्यों का विवरण",
      "DBT वजीफा और टूलकिट वाउचर के लिए बैंक पासबुक",
    ],
    steps: [
      "Visit your nearest Common Service Centre (CSC) with Aadhaar and bank passbook.",
      "Complete biometric verification on pmvishwakarma.gov.in.",
      "Finish 5-day training to receive your ₹15,000 e-RUPI toolkit voucher.",
    ],
    steps_te: [
      "ఆధార్ మరియు బ్యాంక్ పాస్‌బుక్‌తో సమీపంలోని CSC కేంద్రానికి వెళ్లండి.",
      "pmvishwakarma.gov.in లో బయోమెట్రిక్ ధృవీకరణ పూర్తి చేయండి.",
      "రూ. 15,000 టూల్‌కిట్ వోచర్ పొందడానికి 5 రోజుల శిక్షణ పూర్తి చేయండి.",
    ],
    steps_hi: [
      "आधार और बैंक पासबुक के साथ अपने नजदीकी कॉमन सर्विस सेंटर (CSC) पर जाएं।",
      "pmvishwakarma.gov.in पर बायोमेट्रिक सत्यापन पूरा करें।",
      "₹15,000 का ई-रूपी टूलकिट वाउचर प्राप्त करने के लिए 5-दिवसीय प्रशिक्षण पूरा करें।",
    ],
  },
  {
    id: "ayushman-vay-vandana",
    name: "Ayushman Bharat Vay Vandana Senior Health Cover (70+)",
    name_te: "ఆయుష్మాన్ భారత్ వయ వందన సీనియర్ ఆరోగ్య బీమా (70+)",
    name_hi: "आयुष्मान भारत वय वंदना वरिष्ठ स्वास्थ्य बीमा (70+)",
    state: "All India",
    lifecycle: "Live",
    benefit: "Rs 5 Lakh Annual Free Hospitalization Cover for Citizens Aged 70+",
    benefit_te: "70 ఏళ్లు పైబడిన వారికి ఏటా రూ. 5 లక్షల ఉచిత ఆసుపత్రి చికిత్స బీమా",
    benefit_hi: "70+ वर्ष के वरिष्ठ नागरिकों के लिए ₹5 लाख का वार्षिक निःशुल्क अस्पताल उपचार बीमा",
    max_income_rural: 9999999,
    max_income_urban: 9999999,
    eligible_categories: ["BC", "SC", "ST", "EBC", "Minority", "OC"],
    target_group: ["health", "family"],
    deadline: "2027-03-31",
    last_verified: "Nov 2026",
    official_url: "https://beneficiary.nha.gov.in",
    rule_reasons: [
      "Universal coverage for all Indian senior citizens aged 70 and above regardless of income.",
      "Valid across all empanelled government and private hospitals.",
    ],
    rule_reasons_te: [
      "ఆదాయంతో సంబంధం లేకుండా 70 ఏళ్లు పైబడిన భారతీయ సీనియర్ సిటిజన్లందరికీ వర్తిస్తుంది.",
      "అన్ని ప్రభుత్వ మరియు ప్రైవేట్ నెట్‌వర్క్ ఆసుపత్రులలో చెల్లుబాటు అవుతుంది.",
    ],
    rule_reasons_hi: [
      "आय की परवाह किए बिना 70 वर्ष और उससे अधिक आयु के सभी भारतीय वरिष्ठ नागरिकों के लिए उपलब्ध।",
      "सभी सूचीबद्ध सरकारी और निजी अस्पतालों में मान्य।",
    ],
    documents: [
      "Senior Citizen Aadhaar Card (Showing Age 70+)",
      "Aadhaar-Linked Mobile Number for OTP eKYC",
    ],
    documents_te: [
      "సీనియర్ సిటిజన్ ఆధార్ కార్డ్ (వయస్సు 70+)",
      "OTP eKYC కోసం ఆధార్ లింక్ అయిన మొబైల్ నంబర్",
    ],
    documents_hi: [
      "वरिष्ठ नागरिक आधार कार्ड (आयु 70+ दर्शाते हुए)",
      "OTP eKYC के लिए आधार से लिंक मोबाइल नंबर",
    ],
    steps: [
      "Open beneficiary.nha.gov.in or the Ayushman App.",
      "Select Senior Citizen (70+) Enrollment and complete Aadhaar OTP eKYC.",
      "Download your Vay Vandana Health Card immediately.",
    ],
    steps_te: [
      "beneficiary.nha.gov.in లేదా ఆయుష్మాన్ యాప్ తెరవండి.",
      "సీనియర్ సిటిజన్ (70+) నమోదు ఎంచుకుని ఆధార్ OTP eKYC పూర్తి చేయండి.",
      "వెంటనే మీ వయ వందన హెల్త్ కార్డును డౌన్‌లోడ్ చేసుకోండి.",
    ],
    steps_hi: [
      "beneficiary.nha.gov.in या आयुष्मान ऐप खोलें।",
      "वरिष्ठ नागरिक (70+) नामांकन चुनें और आधार OTP eKYC पूरा करें।",
      "अपना वय वंदना हेल्थ कार्ड तुरंत डाउनलोड करें।",
    ],
  },
  {
    id: "nsp-central-sector",
    name: "NSP Central Sector Scheme of Scholarship (Upcoming Cycle)",
    name_te: "NSP సెంట్రల్ సెక్టార్ స్కాలర్‌షిప్ పథకం (రాబోయే దశ)",
    name_hi: "NSP केंद्रीय क्षेत्र छात्रवृत्ति योजना (आगामी चक्र)",
    state: "All India",
    lifecycle: "Upcoming",
    benefit: "Rs 12,000 to Rs 20,000/Year Direct DBT Merit Scholarship",
    benefit_te: "ఏటా రూ. 12,000 నుండి రూ. 20,000 వరకు నేరుగా DBT మెరిట్ స్కాలర్‌షిప్",
    benefit_hi: "₹12,000 से ₹20,000/वर्ष सीधे DBT मेरिट छात्रवृत्ति",
    max_income_rural: 450000,
    max_income_urban: 450000,
    eligible_categories: ["BC", "SC", "ST", "EBC", "Minority", "OC"],
    target_group: ["btech", "degree", "student"],
    deadline: "2027-01-15",
    last_verified: "Nov 2026",
    official_url: "https://scholarships.gov.in",
    rule_reasons: [
      "For students scoring above 80th percentile in Class 12 Board Exams.",
      "Annual family income must be below ₹4.5 Lakh.",
    ],
    rule_reasons_te: [
      "12వ తరగతి బోర్డు పరీక్షల్లో 80 పర్సంటైల్ కంటే ఎక్కువ సాధించిన విద్యార్థులకు.",
      "కుటుంబ వార్షిక ఆదాయం రూ. 4.5 లక్షల లోపు ఉండాలి.",
    ],
    rule_reasons_hi: [
      "कक्षा 12वीं बोर्ड परीक्षा में 80 पर्सेंटाइल से अधिक अंक प्राप्त करने वाले छात्रों के लिए।",
      "वार्षिक पारिवारिक आय ₹4.5 लाख से कम होनी चाहिए।",
    ],
    documents: [
      "NSP One-Time Registration (OTR) ID",
      "Class 12th Board Marksheet",
      "Income Certificate & College Bonafide",
    ],
    documents_te: [
      "NSP వన్-టైమ్ రిజిస్ట్రేషన్ (OTR) ID",
      "12వ తరగతి బోర్డు మార్కుల జాబితా",
      "ఆదాయ ధృవీకరణ పత్రం & కాలేజీ బోనఫైడ్",
    ],
    documents_hi: [
      "NSP वन-टाइम रजिस्ट्रेशन (OTR) ID",
      "कक्षा 12वीं बोर्ड अंकतालिका",
      "आय प्रमाण पत्र और कॉलेज बोनाफाइड",
    ],
    steps: [
      "Complete your NSP One-Time Registration (OTR) on scholarships.gov.in.",
      "Keep your Class 12 scorecard and income certificate ready before Jan 15.",
      "Submit online once the window opens and complete institute biometric verification.",
    ],
    steps_te: [
      "scholarships.gov.in లో మీ NSP వన్-టైమ్ రిజిస్ట్రేషన్ (OTR) పూర్తి చేయండి.",
      "జనవరి 15 లోపు మీ 12వ తరగతి స్కోర్‌కార్డ్ మరియు ఆదాయ పత్రం సిద్ధంగా ఉంచుకోండి.",
      "దరఖాస్తు ప్రారంభమైన వెంటనే ఆన్‌లైన్‌లో సమర్పించండి.",
    ],
    steps_hi: [
      "scholarships.gov.in पर अपना NSP वन-टाइम रजिस्ट्रेशन (OTR) पूरा करें।",
      "15 जनवरी से पहले अपनी कक्षा 12वीं की अंकतालिका और आय प्रमाण पत्र तैयार रखें।",
      "विंडो खुलते ही ऑनलाइन आवेदन जमा करें और संस्थान में बायोमेट्रिक सत्यापन पूरा करें।",
    ],
  },
];
