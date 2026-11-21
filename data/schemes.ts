export interface Scheme {
  id: string;
  name: string;
  name_te: string;
  state: string; // "All India" or specific state name
  lifecycle: "Live" | "Upcoming" | "Completed";
  benefit: string;
  benefit_te: string;
  max_income_rural: number;
  max_income_urban: number;
  eligible_categories: string[];
  target_group: string[];
  rule_reasons: string[];
  rule_reasons_te: string[];
  documents: string[];
  documents_te: string[];
  steps: string[];
  steps_te: string[];
  official_url: string;
  last_verified: string;
  deadline: string;
}

export const INITIAL_SCHEMES: Scheme[] = [
  {
    id: "ts-epass-pms",
    name: "TS ePASS Post-Matric Scholarship (RTF & MTF)",
    name_te: "TS ePASS పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్ (RTF & MTF)",
    state: "Telangana",
    lifecycle: "Live",
    benefit: "100% Tuition Fee Reimbursement + Monthly Maintenance Allowance",
    benefit_te: "100% ట్యూషన్ ఫీజు రీయింబర్స్‌మెంట్ + నెలవారీ నిర్వహణ భత్యం",
    max_income_rural: 150000,
    max_income_urban: 200000,
    eligible_categories: ["SC", "ST", "BC", "EBC", "Minority"],
    target_group: ["student", "btech", "degree", "diploma", "inter", "pg"],
    rule_reasons: [
      "Telangana resident enrolled in post-matric course (Inter, Diploma, B.Tech, Degree, PG)",
      "Annual family income within limit (<= Rs 1.5L Rural / <= Rs 2.0L Urban)",
      "Convener / Counselling quota admission & 75% attendance"
    ],
    rule_reasons_te: [
      "తెలంగాణలో గుర్తింపు పొందిన పోస్ట్-మెట్రిక్ కోర్సు (ఇంటర్, డిప్లొమా, B.Tech, డిగ్రీ, PG) చదువుతుండాలి",
      "కుటుంబ వార్షిక ఆదాయం పరిమితిలో ఉండాలి (గ్రామీణ <= ₹1.5 లక్షలు / పట్టణ <= ₹2.0 లక్షలు)",
      "కన్వీనర్ / కౌన్సెలింగ్ కోటా అడ్మిషన్ & 75% హాజరు తప్పనిసరి"
    ],
    documents: [
      "Latest MeeSeva Income Certificate (Current Financial Year)",
      "MeeSeva Caste / Community Certificate",
      "Last 7 Years Study / Bonafide Certificates",
      "Counselling / CET Allotment Order (TG EAPCET / DOST)",
      "Student Active Bank Passbook (1st Page)"
    ],
    documents_te: [
      "తాజా మీసేవ ఆదాయ ధృవీకరణ పత్రం (ప్రస్తుత ఆర్థిక సంవత్సరం)",
      "మీసేవ కుల ధృవీకరణ పత్రం (Caste Certificate)",
      "గత 7 సంవత్సరాల స్టడీ / బోనఫైడ్ సర్టిఫికెట్లు",
      "కౌన్సెలింగ్ / CET అలాట్‌మెంట్ ఆర్డర్ (TG EAPCET / DOST)",
      "విద్యార్థి బ్యాంక్ పాస్‌బుక్ మొదటి పేజీ కాపీ"
    ],
    steps: [
      "Open telanganaepass.cgg.gov.in and choose Post-Matric Registration.",
      "Enter SSC Hall Ticket number, MeeSeva Income & Caste certificate IDs.",
      "Complete biometric authentication at your nearest MeeSeva center."
    ],
    steps_te: [
      "telanganaepass.cgg.gov.in తెరిచి Post-Matric రిజిస్ట్రేషన్ ఎంచుకోండి.",
      "SSC హాల్ టికెట్ నంబర్, మీసేవ ఆదాయం & కుల ధృవీకరణ పత్రాల IDలు నమోదు చేయండి.",
      "మీ సమీప మీసేవ కేంద్రంలో బయోమెట్రిక్ ధృవీకరణ పూర్తి చేయండి."
    ],
    official_url: "https://telanganaepass.cgg.gov.in/",
    last_verified: "Nov 2026",
    deadline: "2026-12-31"
  },
  {
    id: "pm-vidyalaxmi",
    name: "PM-Vidyalaxmi Central Education Loan & Interest Subsidy",
    name_te: "PM-విద్యాలక్ష్మి కేంద్ర విద్యా రుణం & వడ్డీ రాయితీ",
    state: "All India",
    lifecycle: "Live",
    benefit: "Collateral-Free Education Loan + 3% to 100% Interest Subvention across India",
    benefit_te: "దేశవ్యాప్తంగా హామీ లేని విద్యా రుణం + 3% నుండి 100% వడ్డీ రాయితీ",
    max_income_rural: 800000,
    max_income_urban: 800000,
    eligible_categories: ["SC", "ST", "BC", "EBC", "Minority", "OC"],
    target_group: ["student", "btech", "degree", "pg", "loan"],
    rule_reasons: [
      "All-India Central Scheme open to all categories (including OC/General)",
      "Family annual income <= Rs 8,00,000 qualifies for 3% interest subvention up to Rs 10 Lakhs",
      "Zero collateral or third-party guarantor required"
    ],
    rule_reasons_te: [
      "అన్ని రాష్ట్రాల & అన్ని కేటగిరీల విద్యార్థులకు (OC/జనరల్ సహా) కేంద్ర పథకం",
      "కుటుంబ వార్షిక ఆదాయం <= ₹8,00,000 ఉంటే ₹10 లక్షల వరకు 3% వడ్డీ రాయితీ",
      "ఎలాంటి ఆస్తి హామీ లేదా గ్యారెంటర్ అవసరం లేదు"
    ],
    documents: [
      "Institution Admission Letter & Fee Structure",
      "State Income Certificate (< Rs 8 Lakhs)",
      "10th & 12th / Diploma Marksheets"
    ],
    documents_te: [
      "విద్యా సంస్థ అడ్మిషన్ లెటర్ & ఫీజు వివరాలు",
      "ఆదాయ ధృవీకరణ పత్రం (< ₹8 లక్షలు)",
      "10వ తరగతి & ఇంటర్ / డిప్లొమా మార్కుల మెమోలు"
    ],
    steps: [
      "Apply via unified PM-Vidyalaxmi national portal.",
      "Select preferred public-sector banks and upload admission proof.",
      "Track digital sanction and interest subvention credit."
    ],
    steps_te: [
      "PM-విద్యాలక్ష్మి జాతీయ పోర్టల్ ద్వారా దరఖాస్తు చేయండి.",
      "ప్రభుత్వ రంగ బ్యాంకులను ఎంచుకుని అడ్మిషన్ పత్రాలు అప్‌లోడ్ చేయండి.",
      "డిజిటల్ మంజూరును ట్రాక్ చేసి వడ్డీ రాయితీ పొందండి."
    ],
    official_url: "https://pmvidyalaxmi.co.in/",
    last_verified: "Nov 2026",
    deadline: "2027-01-31"
  },
  {
    id: "nsp-central-sector",
    name: "NSP Central Sector Scheme of Scholarship (PM-USP)",
    name_te: "NSP కేంద్ర రంగ కళాశాల & విశ్వవిద్యాలయ స్కాలర్‌షిప్",
    state: "All India",
    lifecycle: "Completed",
    benefit: "Rs 12,000/year (UG) to Rs 20,000/year (PG) Direct Benefit Transfer",
    benefit_te: "డిగ్రీకి ₹12,000/సంవత్సరం & PGకి ₹20,000/సంవత్సరం నేరుగా బ్యాంక్ ఖాతాలో జమ",
    max_income_rural: 450000,
    max_income_urban: 450000,
    eligible_categories: ["SC", "ST", "BC", "EBC", "Minority", "OC"],
    target_group: ["student", "btech", "degree", "pg"],
    rule_reasons: [
      "All-India merit-cum-means scholarship for students above 80th percentile in Class 12",
      "Annual family income ceiling of Rs 4,50,000 across Rural & Urban India",
      "2026-27 Fresh Window closed on Oct 30, 2026 — keep docs ready for next cycle"
    ],
    rule_reasons_te: [
      "12వ తరగతిలో 80 పర్సంటైల్ పైన సాధించిన దేశవ్యాప్త విద్యార్థులకు మెరిట్ స్కాలర్‌షిప్",
      "గ్రామీణ & పట్టణ ప్రాంతాలలో కుటుంబ వార్షిక ఆదాయ పరిమితి ₹4,50,000",
      "2026-27 దరఖాస్తు గడువు ముగిసింది — తదుపరి విడత కోసం పత్రాలు సిద్ధం చేసుకోండి"
    ],
    documents: [
      "Class 12 Board Marksheet (Top 20 Percentile)",
      "Valid State Income Certificate (< Rs 4.5 Lakhs)",
      "College Bonafide & Bank Account Seeded with NPCI"
    ],
    documents_te: [
      "12వ తరగతి బోర్డు మార్కుల మెమో (టాప్ 20 పర్సంటైల్)",
      "చెల్లుబాటు అయ్యే ఆదాయ ధృవీకరణ పత్రం (< ₹4.5 లక్షలు)",
      "కాలేజీ బోనఫైడ్ & NPCI లింక్ అయిన బ్యాంక్ ఖాతా"
    ],
    steps: [
      "Register One-Time Registration (OTR) on scholarships.gov.in.",
      "Verify institution nodal officer approval before next cycle opens."
    ],
    steps_te: [
      "scholarships.gov.in పోర్టల్‌లో One-Time Registration (OTR) పూర్తి చేయండి.",
      "తదుపరి విడత ప్రారంభమైన వెంటనే కాలేజీ నోడల్ అధికారి ధృవీకరణ పూర్తి చేయండి."
    ],
    official_url: "https://scholarships.gov.in/",
    last_verified: "Nov 2026",
    deadline: "2026-10-30"
  },
  {
    id: "ap-jagananna-vidya",
    name: "AP Post-Matric Scholarship (RTF & MTF — Jnanabhumi)",
    name_te: "ఆంధ్రప్రదేశ్ పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్ (జ్ఞానభూమి)",
    state: "Andhra Pradesh",
    lifecycle: "Live",
    benefit: "Full Tuition Fee Reimbursement + Hostel & Mess Allowance in Andhra Pradesh",
    benefit_te: "ఆంధ్రప్రదేశ్ విద్యార్థులకు పూర్తి ట్యూషన్ ఫీజు రీయింబర్స్‌మెంట్ + హాస్టల్ భత్యం",
    max_income_rural: 250000,
    max_income_urban: 250000,
    eligible_categories: ["SC", "ST", "BC", "EBC", "Minority"],
    target_group: ["student", "btech", "degree", "diploma", "pg"],
    rule_reasons: [
      "Andhra Pradesh domicile student enrolled in Diploma, B.Tech, Degree, or PG",
      "Annual family income below Rs 2,50,000 (Rural & Urban)",
      "75% mandatory attendance recorded via Jnanabhumi biometric"
    ],
    rule_reasons_te: [
      "ఆంధ్రప్రదేశ్ స్థానిక విద్యార్థి అయి ఉండి డిప్లొమా, B.Tech, డిగ్రీ లేదా PG చదువుతుండాలి",
      "కుటుంబ వార్షిక ఆదాయం ₹2,50,000 కంటే తక్కువగా ఉండాలి",
      "జ్ఞానభూమి బయోమెట్రిక్ ప్రకారం 75% హాజరు తప్పనిసరి"
    ],
    documents: [
      "AP Integrated Caste & Income Certificate / Rice Card",
      "CET Allotment Order (AP EAPCET / ICET)",
      "Mother / Student Joint Bank Passbook"
    ],
    documents_te: [
      "AP ఇంటిగ్రేటెడ్ కుల & ఆదాయ ధృవీకరణ పత్రం / రైస్ కార్డు",
      "CET అలాట్‌మెంట్ ఆర్డర్ (AP EAPCET / ICET)",
      "తల్లి / విద్యార్థి జాయింట్ బ్యాంక్ పాస్‌బుక్"
    ],
    steps: [
      "Login to jnanabhumi.ap.gov.in through college login verification.",
      "Complete e-KYC biometric authentication at Village/Ward Secretariat."
    ],
    steps_te: [
      "jnanabhumi.ap.gov.in పోర్టల్‌లో కాలేజీ లాగిన్ ద్వారా వివరాలు తనిఖీ చేయండి.",
      "గ్రామ/వార్డు సచివాలయంలో బయోమెట్రిక్ e-KYC పూర్తి చేయండి."
    ],
    official_url: "https://jnanabhumi.ap.gov.in/",
    last_verified: "Nov 2026",
    deadline: "2026-12-28"
  },
  {
    id: "pm-vishwakarma-india",
    name: "PM Vishwakarma Artisan & Micro-Enterprise Scheme",
    name_te: "PM విశ్వకర్మ హస్తకళాకారులు & చిన్న వ్యాపార పథకం",
    state: "All India",
    lifecycle: "Live",
    benefit: "Rs 15,000 Toolkit Grant + Up to Rs 3 Lakh Collateral-Free Loan at 5% Interest",
    benefit_te: "₹15,000 టూల్‌కిట్ గ్రాంట్ + 5% వడ్డీతో ₹3 లక్షల వరకు హామీ లేని రుణం",
    max_income_rural: 300000,
    max_income_urban: 300000,
    eligible_categories: ["SC", "ST", "BC", "EBC", "Minority", "OC"],
    target_group: ["business", "youth", "unemployed", "tailoring", "shop", "entrepreneur"],
    rule_reasons: [
      "All-India Central scheme covering 18 traditional trades including Tailoring (Darzi)",
      "Includes 5-day paid skill training (Rs 500/day stipend) + Rs 15,000 e-Voucher",
      "Available across Rural & Urban India with zero collateral"
    ],
    rule_reasons_te: [
      "టైలరింగ్ (దర్జీ) సహా 18 వృత్తులకు వర్తించే అఖిల భారత కేంద్ర ప్రభుత్వ పథకం",
      "రోజుకు ₹500 స్టైపెండ్‌తో 5 రోజుల శిక్షణ + ₹15,000 టూల్‌కిట్ వోచర్",
      "గ్రామీణ & పట్టణ ప్రాంతాలలో ఎలాంటి పూచీకత్తు లేకుండా రుణం"
    ],
    documents: [
      "Ration Card / Family ID Proof",
      "Active Bank Passbook & Mobile Linked Account",
      "Trade Self-Declaration at CSC Center"
    ],
    documents_te: [
      "రేషన్ కార్డు / కుటుంబ గుర్తింపు పత్రం",
      "మొబైల్ నంబర్ లింక్ అయిన బ్యాంక్ పాస్‌బుక్",
      "CSC కేంద్రంలో వృత్తి స్వీయ ధృవీకరణ"
    ],
    steps: [
      "Visit nearest Common Service Centre (CSC) for biometric registration.",
      "Complete Gram Panchayat / Urban Local Body verification.",
      "Finish basic training to unlock toolkit voucher and 5% loan."
    ],
    steps_te: [
      "బయోమెట్రిక్ రిజిస్ట్రేషన్ కోసం సమీప CSC కేంద్రాన్ని సందర్శించండి.",
      "గ్రామ పంచాయతీ / మున్సిపల్ ధృవీకరణ పూర్తి చేయండి.",
      "శిక్షణ పూర్తి చేసి టూల్‌కిట్ వోచర్ & 5% వడ్డీ రుణం పొందండి."
    ],
    official_url: "https://pmvishwakarma.gov.in/",
    last_verified: "Nov 2026",
    deadline: "2027-03-31"
  },
  {
    id: "pm-yuva-internship-2027",
    name: "PM Internship Scheme (Phase 2 — Upcoming 2027 Cohort)",
    name_te: "PM ఇంటర్న్‌షిప్ పథకం (ఫేజ్ 2 — త్వరలో ప్రారంభం 2027)",
    state: "All India",
    lifecycle: "Upcoming",
    benefit: "Rs 5,000/Month Stipend + Rs 6,000 One-Time Grant in Top 500 Indian Companies",
    benefit_te: "టాప్ 500 కంపెనీలలో నెలకు ₹5,000 స్టైపెండ్ + ₹6,000 ఒకేసారి గ్రాంట్",
    max_income_rural: 800000,
    max_income_urban: 800000,
    eligible_categories: ["SC", "ST", "BC", "EBC", "Minority", "OC"],
    target_group: ["student", "btech", "degree", "diploma", "youth", "unemployed"],
    rule_reasons: [
      "All-India 12-month paid internship for youth aged 21–24 (ITI, Diploma, Degree, B.Tech)",
      "Family annual income below Rs 8,00,000 with no permanent govt job in family",
      "Upcoming portal window opens Jan 2027 — prepare resume & certificates now"
    ],
    rule_reasons_te: [
      "21–24 ఏళ్ల యువతకు (ITI, డిప్లొమా, డిగ్రీ, B.Tech) 12 నెలల పెయిడ్ ఇంటర్న్‌షిప్",
      "కుటుంబ వార్షిక ఆదాయం ₹8,00,000 లోపు ఉండాలి",
      "జనవరి 2027లో తదుపరి విడత ప్రారంభమవుతుంది — ఇప్పుడే పత్రాలు సిద్ధం చేసుకోండి"
    ],
    documents: [
      "10th / 12th / Diploma / Degree Certificates",
      "Family Income Self-Declaration (< Rs 8 Lakhs)",
      "Updated Resume & Active Bank Account"
    ],
    documents_te: [
      "10వ తరగతి / ఇంటర్ / డిప్లొమా / డిగ్రీ సర్టిఫికెట్లు",
      "కుటుంబ ఆదాయ ధృవీకరణ (< ₹8 లక్షలు)",
      "అప్‌డేట్ చేసిన రెజ్యూమ్ & బ్యాంక్ ఖాతా వివరాలు"
    ],
    steps: [
      "Pre-register profile on pminternship.mca.gov.in before window opens.",
      "Shortlist up to 5 preferred companies in your district or state."
    ],
    steps_te: [
      "దరఖాస్తు విండో తెరవకముందే pminternship.mca.gov.in లో ప్రొఫైల్ సిద్ధం చేసుకోండి.",
      "మీ జిల్లా లేదా రాష్ట్రంలోని 5 కంపెనీలను ఎంచుకోండి."
    ],
    official_url: "https://pminternship.mca.gov.in/",
    last_verified: "Nov 2026",
    deadline: "2027-01-15"
  },
  {
    id: "ayushman-bharat-india",
    name: "Ayushman Bharat PM-JAY + State Health Assurance",
    name_te: "ఆయుష్మాన్ భారత్ PM-JAY + రాష్ట్ర ఆరోగ్య భరోసా",
    state: "All India",
    lifecycle: "Live",
    benefit: "Rs 5 Lakhs to Rs 10 Lakhs/Year Cashless Hospital Cover across India",
    benefit_te: "దేశవ్యాప్తంగా ఏటా ₹5 లక్షల నుండి ₹10 లక్షల వరకు ఉచిత నగదు రహిత వైద్యం",
    max_income_rural: 250000,
    max_income_urban: 300000,
    eligible_categories: ["SC", "ST", "BC", "EBC", "Minority", "OC"],
    target_group: ["family", "health", "student", "youth", "farmer", "medical"],
    rule_reasons: [
      "All-India cashless hospitalization across 29,000+ public & private hospitals",
      "Covers all low-income families & senior citizens (70+) regardless of caste",
      "Zero waiting period for pre-existing conditions"
    ],
    rule_reasons_te: [
      "దేశవ్యాప్తంగా 29,000+ ప్రభుత్వ & ప్రైవేట్ ఆసుపత్రులలో ఉచిత నగదు రహిత వైద్యం",
      "కుల భేదం లేకుండా తక్కువ ఆదాయ కుటుంబాలు & 70+ వృద్ధులకు వర్తిస్తుంది",
      "పాత వ్యాధులకు కూడా ఎలాంటి నిరీక్షణ సమయం లేకుండా చికిత్స"
    ],
    documents: [
      "State Ration Card / Food Security Card",
      "Family Income Certificate"
    ],
    documents_te: [
      "రాష్ట్ర రేషన్ కార్డు / ఆహార భద్రత కార్డు",
      "కుటుంబ ఆదాయ ధృవీకరణ పత్రం"
    ],
    steps: [
      "Check family eligibility on beneficiary.nha.gov.in.",
      "Download Ayushman / State Health Card at nearest CSC or hospital kiosk."
    ],
    steps_te: [
      "beneficiary.nha.gov.in వెబ్‌సైట్‌లో మీ కుటుంబ అర్హతను తనిఖీ చేయండి.",
      "సమీప CSC లేదా ఆసుపత్రి హెల్ప్‌డెస్క్ వద్ద హెల్త్ కార్డు డౌన్‌లోడ్ చేసుకోండి."
    ],
    official_url: "https://beneficiary.nha.gov.in/",
    last_verified: "Nov 2026",
    deadline: "2027-03-31"
  }
];
