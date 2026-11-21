"use client";

import React, { useState, useEffect, useRef } from "react";
import { INITIAL_SCHEMES, Scheme } from "@/data/schemes";
import {
  Mic,
  Volume2,
  ShieldCheck,
  ShieldAlert,
  ExternalLink,
  CheckCircle2,
  Circle,
  Clock,
  Sliders,
  Sparkles,
  Languages,
  AlertTriangle,
  FileCheck2,
  Printer,
  HelpCircle,
  MapPin,
  Share2,
  Layers,
  Landmark,
  Search,
  TrendingUp,
  EyeOff,
  Eye,
  Users,
  CalendarPlus,
  Type,
  Contrast,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

const LOCATION_HIERARCHY: Record<string, Record<string, string[]>> = {
  Telangana: {
    "Medchal-Malkajgiri": ["Ghatkesar", "Uppal", "Kukatpally", "Malkajgiri", "Medchal"],
    Hyderabad: ["Secunderabad", "Amberpet", "Ameerpet", "Charminar", "Khairatabad"],
    Hanamkonda: ["Hanamkonda", "Kazipet", "Dharmasagar", "Elkathurthy"],
    Warangal: ["Warangal", "Narsampet", "Wardhannapet", "Parvathagiri"],
    Jangaon: ["Station Ghanpur", "Jangaon", "Raghunathpally", "Zaffergadh"],
    Karimnagar: ["Karimnagar", "Huzurabad", "Jammikunta", "Choppadandi"],
    Nalgonda: ["Nalgonda", "Miryalaguda", "Devarakonda", "Nakrekal"],
  },
  "Andhra Pradesh": {
    NTR: ["Vijayawada Urban", "Vijayawada Rural", "Nandigama", "Jaggayyapeta"],
    Guntur: ["Guntur East", "Guntur West", "Tenali", "Mangalagiri"],
    Visakhapatnam: ["Visakhapatnam Urban", "Gajuwaka", "Bheemunipatnam", "Anakapalli"],
    Tirupati: ["Tirupati Urban", "Tirupati Rural", "Chandragiri", "Srikalahasti"],
  },
  "All India": {
    "All Districts": ["All Mandals / Blocks"],
  },
  Karnataka: {
    "Bengaluru Urban": ["Bengaluru North", "Bengaluru South", "Yelahanka", "Anekal"],
    Mysuru: ["Mysuru", "Nanjangud", "Hunsur"],
  },
  Maharashtra: {
    Pune: ["Pune City", "Haveli", "Baramati", "Mulshi"],
    "Mumbai Suburban": ["Andheri", "Borivali", "Kurla"],
  },
  "Tamil Nadu": {
    Chennai: ["Ambattur", "Egmore", "Guindy", "Mylapore"],
    Coimbatore: ["Coimbatore North", "Coimbatore South", "Pollachi"],
  },
};

const SAMPLE_PROFILES = [
  {
    label: "Rural B.Tech Student (Telangana)",
    label_te: "గ్రామీణ B.Tech విద్యార్థి (తెలంగాణ)",
    state: "Telangana",
    district: "Medchal-Malkajgiri",
    mandal: "Ghatkesar",
    text_en: "Nenu 2nd year B.Tech student ni, rural village in Ghatkesar Telangana, BC-B category, annual family income 1.2 lakh, convener quota.",
    text_te: "నేను తెలంగాణ ఘట్‌కేసర్ గ్రామీణ ప్రాంతానికి చెందిన 2వ సంవత్సరం B.Tech విద్యార్థిని, BC-B కేటగిరీ, కుటుంబ వార్షిక ఆదాయం 1.2 లక్షలు, కన్వీనర్ కోటా.",
  },
  {
    label: "AP Degree Student (Urban)",
    label_te: "ఆంధ్రప్రదేశ్ డిగ్రీ విద్యార్థి (పట్టణ)",
    state: "Andhra Pradesh",
    district: "NTR",
    mandal: "Vijayawada Urban",
    text_en: "I am studying B.Sc Degree in Vijayawada Andhra Pradesh, BC category, urban area, annual family income 1.8 lakh.",
    text_te: "నేను ఆంధ్రప్రదేశ్ విజయవాడలో B.Sc డిగ్రీ చదువుతున్నాను, BC కేటగిరీ, పట్టణ ప్రాంతం, కుటుంబ వార్షిక ఆదాయం 1.8 లక్షలు.",
  },
  {
    label: "All-India Youth Tailoring Unit",
    label_te: "అఖిల భారత యువత టైలరింగ్ యూనిట్",
    state: "All India",
    district: "All Districts",
    mandal: "All Mandals / Blocks",
    text_en: "I am 24 years old unemployed youth in rural India, BC category, want to start a tailoring micro business, income 1.1 lakh.",
    text_te: "నేను గ్రామీణ ప్రాంతంలో 24 ఏళ్ల నిరుద్యోగ యువకుడిని, BC కేటగిరీ, టైలరింగ్ చిన్న వ్యాపారం ప్రారంభించాలనుకుంటున్నాను, ఆదాయం 1.1 లక్షలు.",
  },
  {
    label: "Missing Details Test",
    label_te: "వివరాలు అసంపూర్తిగా ఉన్న విద్యార్థి",
    state: "Telangana",
    district: "Hyderabad",
    mandal: "Secunderabad",
    text_en: "I am studying degree and need scholarship help.",
    text_te: "నేను డిగ్రీ చదువుతున్నాను, నాకు స్కాలర్‌షిప్ సహాయం కావాలి.",
  },
];

const HOUSEHOLD_MEMBERS = [
  { id: "senior", label: "+ Elderly Parent (70+)", label_te: "+ వృద్ధ తల్లిదండ్రులు (70+)", group: "health" },
  { id: "sibling", label: "+ College Sibling", label_te: "+ కాలేజీ సోదరి/సోదరుడు", group: "student" },
  { id: "artisan", label: "+ Home Business / Artisan", label_te: "+ గృహ వ్యాపారం / చేతివృత్తి", group: "business" },
];

const estimateRupeeValue = (benefitText: string): number => {
  const lakhMatch = benefitText.match(/(\d+(\.\d+)?)\s*Lakh/i);
  if (lakhMatch) return Math.round(parseFloat(lakhMatch[1]) * 100000);
  const commaNum = benefitText.match(/Rs\s*([\d,]+)/i);
  if (commaNum) return Number(commaNum[1].replace(/,/g, ""));
  if (benefitText.includes("100% Tuition")) return 115000;
  return 50000;
};

export default function ManaSahayamApp() {
  // 3-Step Guided Flow State: "details" -> "opportunities" -> "opportunity-detail"
  const [step, setStep] = useState<"details" | "opportunities" | "opportunity-detail">("details");

  const [lang, setLang] = useState<"en" | "te">("en");
  const [schemes, setSchemes] = useState<Scheme[]>(INITIAL_SCHEMES);
  const [inputText, setInputText] = useState(SAMPLE_PROFILES[0].text_en);
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [privacyWarning, setPrivacyWarning] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Accessibility States
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Geographic Hierarchy State
  const [selectedState, setSelectedState] = useState<string>("Telangana");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Medchal-Malkajgiri");
  const [selectedMandal, setSelectedMandal] = useState<string>("Ghatkesar");
  const [area, setArea] = useState<"Rural" | "Urban">("Rural");

  const [income, setIncome] = useState<number | null>(120000);
  const [category, setCategory] = useState<string>("BC");
  const [keyword, setKeyword] = useState<string>("btech");

  // Household Multi-Member Tags
  const [activeMembers, setActiveMembers] = useState<string[]>([]);

  // Search, Sort, Lifecycle & Transparency States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"default" | "deadline" | "value">("default");
  const [lifecycleFilter, setLifecycleFilter] = useState<"All" | "Live" | "Upcoming" | "Completed">("All");
  const [showIneligible, setShowIneligible] = useState<boolean>(false);

  // Scam Link Shield Modal State
  const [showScamModal, setShowScamModal] = useState(false);
  const [scamUrlInput, setScamUrlInput] = useState("");

  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(INITIAL_SCHEMES[0].id);
  const [pinnedIds, setPinnedIds] = useState<string[]>(["ts-epass-pms", "pm-vidyalaxmi"]);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [showRuleEditor, setShowRuleEditor] = useState(false);
  const [showSlipModal, setShowSlipModal] = useState(false);

  const districtsForState = Object.keys(LOCATION_HIERARCHY[selectedState] || { "All Districts": ["All Mandals"] });
  const mandalsForDistrict =
    LOCATION_HIERARCHY[selectedState]?.[selectedDistrict] || ["All Mandals / Blocks"];

  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    const firstDistrict = Object.keys(LOCATION_HIERARCHY[newState])[0];
    setSelectedDistrict(firstDistrict);
    setSelectedMandal(LOCATION_HIERARCHY[newState][firstDistrict][0]);
  };

  const handleDistrictChange = (newDistrict: string) => {
    setSelectedDistrict(newDistrict);
    const firstMandal = LOCATION_HIERARCHY[selectedState]?.[newDistrict]?.[0] || "All Mandals / Blocks";
    setSelectedMandal(firstMandal);
  };

  const toggleHouseholdMember = (id: string) => {
    setActiveMembers((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]));
  };

  useEffect(() => {
    const saved = localStorage.getItem("mana_sahayam_docs");
    if (saved) setCheckedDocs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = largeText ? "19px" : "16px";
  }, [largeText]);

  // Sync 3-step navigation with URL hash so Next.js never clears Back history
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#details");
    }
    const syncFromHash = () => {
      const h = window.location.hash.replace("#", "");
      if (h === "opportunities" || h === "opportunity-detail" || h === "details") {
        setStep(h);
      } else {
        setStep("details");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);
    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
    };
  }, []);

  const navigateStep = (nextStep: "details" | "opportunities" | "opportunity-detail") => {
    setStep(nextStep);
    if (typeof window !== "undefined") {
      window.location.hash = nextStep;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const toggleDoc = (key: string) => {
    const updated = { ...checkedDocs, [key]: !checkedDocs[key] };
    setCheckedDocs(updated);
    localStorage.setItem("mana_sahayam_docs", JSON.stringify(updated));
  };

  const togglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPinnedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev.slice(-1), id]
    );
  };

  const switchLanguage = () => {
    const nextLang = lang === "en" ? "te" : "en";
    setLang(nextLang);
    const matchedSample = SAMPLE_PROFILES.find(
      (p) => p.text_en === inputText || p.text_te === inputText
    );
    if (matchedSample) {
      setInputText(nextLang === "te" ? matchedSample.text_te : matchedSample.text_en);
    }
  };

  const speakText = (id: string, textToRead: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    if (speakingId === id) {
      setSpeakingId(null);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    const teVoice = voices.find((v) => v.lang.toLowerCase().startsWith("te"));
    let finalSpeech = textToRead;
    let speechLang = "en-IN";

    if (lang === "te" && teVoice) {
      speechLang = teVoice.lang;
    } else if (lang === "te" && !teVoice) {
      finalSpeech =
        textToRead.replace(/[\u0C00-\u0C7F]+/g, " ").replace(/\s+/g, " ").trim() ||
        "Scheme eligibility details are shown on screen.";
    }

    const utterance = new SpeechSynthesisUtterance(finalSpeech);
    if (lang === "te" && teVoice) utterance.voice = teVoice;
    utterance.lang = speechLang;
    utterance.rate = 0.92;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleAnalyze = (
    rawText: string,
    overrideLoc?: { state: string; district: string; mandal: string }
  ) => {
    if (/\b\d{12}\b/.test(rawText)) {
      setPrivacyWarning(true);
      rawText = rawText.replace(/\b\d{12}\b/g, "[REDACTED-ID]");
    } else {
      setPrivacyWarning(false);
    }
    setInputText(rawText);

    const lower = rawText.toLowerCase();
    if (overrideLoc) {
      setSelectedState(overrideLoc.state);
      setSelectedDistrict(overrideLoc.district);
      setSelectedMandal(overrideLoc.mandal);
    } else {
      if (lower.includes("andhra") || lower.includes("vijayawada") || lower.includes("ఆంధ్రప్రదేశ్")) {
        handleStateChange("Andhra Pradesh");
      } else if (
        lower.includes("telangana") ||
        lower.includes("hyderabad") ||
        lower.includes("secunderabad") ||
        lower.includes("ghatkesar") ||
        lower.includes("తెలంగాణ")
      ) {
        handleStateChange("Telangana");
      }
    }

    const lakhMatch = lower.match(/(\d+(\.\d+)?)\s*(lakh|lakhs|l|లక్షలు|లక్షల)\b/);
    const numMatch = lower.match(/\b(\d{5,7})\b/);
    if (lakhMatch) {
      setIncome(Math.round(parseFloat(lakhMatch[1]) * 100000));
    } else if (numMatch) {
      setIncome(Number(numMatch[1]));
    } else if (lower.includes("need scholarship help") || lower.includes("స్కాలర్‌షిప్ సహాయం కావాలి")) {
      setIncome(null);
    }

    if (lower.includes("urban") || lower.includes("hyderabad") || lower.includes("vijayawada") || lower.includes("పట్టణ")) {
      setArea("Urban");
    } else if (lower.includes("rural") || lower.includes("village") || lower.includes("గ్రామీణ")) {
      setArea("Rural");
    }

    if (/\bbc\b|bc-/.test(lower)) setCategory("BC");
    else if (/\bsc\b/.test(lower)) setCategory("SC");
    else if (/\bst\b/.test(lower)) setCategory("ST");
    else if (/\bebc\b/.test(lower)) setCategory("EBC");
    else if (/\bminority\b/.test(lower)) setCategory("Minority");
    else if (/\boc\b|\bgeneral\b/.test(lower)) setCategory("OC");
    else if (lower.includes("need scholarship help") || lower.includes("స్కాలర్‌షిప్ సహాయం కావాలి")) setCategory("Unknown");

    if (lower.includes("business") || lower.includes("tailoring") || lower.includes("టైలరింగ్") || lower.includes("వ్యాపారం")) setKeyword("business");
    else if (lower.includes("b.tech") || lower.includes("btech") || lower.includes("degree") || lower.includes("డిగ్రీ") || lower.includes("విద్యార్థి")) setKeyword("btech");
    else setKeyword("family");
  };

  const toggleVoiceInput = () => {
    setVoiceError(null);
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: new () => any; webkitSpeechRecognition?: new () => any })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError("Open http://localhost:3000 in Google Chrome or Microsoft Edge for voice typing.");
      return;
    }

    const startRecognition = (recLang: string, allowFallback: boolean) => {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = recLang;
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        let gotSpeech = false;

        recognition.onstart = () => {
          setIsListening(true);
          setVoiceError(null);
        };

        recognition.onspeechstart = () => {
          gotSpeech = true;
        };

        recognition.onresult = (event: any) => {
          gotSpeech = true;
          let interim = "";
          let finalStr = "";
          for (let i = 0; i < event.results.length; i++) {
            const txt = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalStr += txt;
            } else {
              interim += txt;
            }
          }
          const liveText = (finalStr || interim).trim();
          if (liveText) {
            setInputText(liveText);
            if (finalStr.trim()) {
              handleAnalyze(finalStr.trim());
            }
          }
        };

        recognition.onerror = (event: any) => {
          setIsListening(false);
          if ((event.error === "language-not-supported" || event.error === "service-not-allowed") && allowFallback) {
            startRecognition("en-IN", false);
            return;
          }
          if (event.error === "not-allowed") {
            setVoiceError("Mic blocked: Click the icon next to localhost:3000 in the address bar and Allow Microphone.");
          } else if (event.error === "network") {
            setVoiceError("Speech service blocked by browser. Use Google Chrome or Microsoft Edge.");
          } else if (event.error === "no-speech") {
            setVoiceError("Mic is active, but 0% audio was heard. Check Windows Sound -> Input volume.");
          } else {
            setVoiceError(`Voice error: ${event.error}`);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
          if (!gotSpeech && allowFallback && recLang === "te-IN") {
            startRecognition("en-IN", false);
          }
        };

        recognition.start();
      } catch (err: any) {
        setIsListening(false);
        setVoiceError(`Mic start failed: ${err?.message || "Unknown error"}`);
      }
    };

    startRecognition(lang === "te" ? "te-IN" : "en-IN", true);
  };

  const activeGroups = [
    keyword,
    "family",
    ...HOUSEHOLD_MEMBERS.filter((m) => activeMembers.includes(m.id)).map((m) => m.group),
  ];

  const evaluatedSchemes = schemes.map((scheme) => {
    const stateMatch =
      selectedState === "All India"
        ? true
        : scheme.state === "All India" || scheme.state === selectedState;

    const cap = area === "Rural" ? scheme.max_income_rural : scheme.max_income_urban;
    const incomeOk = income !== null ? income <= cap : null;
    const categoryOk =
      category !== "Unknown" ? scheme.eligible_categories.includes(category) : null;
    const groupMatch = scheme.target_group.some((tg) => activeGroups.includes(tg));

    let status: "Likely Eligible" | "Needs More Info" | "Unlikely" = "Likely Eligible";
    const exclusionReasons: string[] = [];

    if (!stateMatch) {
      status = "Unlikely";
      exclusionReasons.push(`State restriction: Only for ${scheme.state} residents (Selected: ${selectedState})`);
    }
    if (!groupMatch) {
      status = "Unlikely";
      exclusionReasons.push(`Household / Role mismatch (Designed for: ${scheme.target_group.slice(0, 3).join(", ")})`);
    }
    if (incomeOk === false) {
      status = "Unlikely";
      exclusionReasons.push(`Income ₹${income?.toLocaleString("en-IN")} exceeds ${area} cap of ₹${cap.toLocaleString("en-IN")}`);
    }
    if (categoryOk === false) {
      status = "Unlikely";
      exclusionReasons.push(`Category ${category} not covered (Eligible: ${scheme.eligible_categories.join(", ")})`);
    }

    if (status !== "Unlikely" && (incomeOk === null || categoryOk === null)) {
      status = "Needs More Info";
    }

    return { scheme, status, cap, exclusionReasons, estimatedValue: estimateRupeeValue(scheme.benefit) };
  });

  const eligibleAreaSchemes = evaluatedSchemes.filter((s) => s.status !== "Unlikely");
  const excludedSchemes = evaluatedSchemes.filter((s) => s.status === "Unlikely");

  const totalLiveBenefitValue = eligibleAreaSchemes
    .filter((s) => s.scheme.lifecycle === "Live")
    .reduce((acc, item) => acc + item.estimatedValue, 0);

  const displayedSchemes = eligibleAreaSchemes
    .filter((s) => (lifecycleFilter === "All" ? true : s.scheme.lifecycle === lifecycleFilter))
    .filter((s) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        s.scheme.name.toLowerCase().includes(q) ||
        s.scheme.name_te.toLowerCase().includes(q) ||
        s.scheme.benefit.toLowerCase().includes(q) ||
        s.scheme.state.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "deadline") {
        return new Date(a.scheme.deadline).getTime() - new Date(b.scheme.deadline).getTime();
      }
      if (sortBy === "value") {
        return b.estimatedValue - a.estimatedValue;
      }
      return 0;
    });

  const counts = {
    All: eligibleAreaSchemes.length,
    Live: eligibleAreaSchemes.filter((s) => s.scheme.lifecycle === "Live").length,
    Upcoming: eligibleAreaSchemes.filter((s) => s.scheme.lifecycle === "Upcoming").length,
    Completed: eligibleAreaSchemes.filter((s) => s.scheme.lifecycle === "Completed").length,
  };

  const selectedEval =
    evaluatedSchemes.find((e) => e.scheme.id === selectedSchemeId) ||
    displayedSchemes[0] ||
    eligibleAreaSchemes[0] ||
    evaluatedSchemes[0];
  const selectedScheme = selectedEval.scheme;

  const pinnedSchemes = schemes.filter((s) => pinnedIds.includes(s.id));

  const activeDocsList = lang === "en" ? selectedScheme.documents : selectedScheme.documents_te;
  const completedDocsCount = activeDocsList.filter((_, idx) => !!checkedDocs[`${selectedScheme.id}-${idx}`]).length;
  const docProgressPct = activeDocsList.length > 0 ? Math.round((completedDocsCount / activeDocsList.length) * 100) : 0;

  const daysUntil = (dateStr: string) => {
    const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const downloadCalendarReminder = () => {
    const deadlineDate = new Date(selectedScheme.deadline);
    deadlineDate.setDate(deadlineDate.getDate() - 7);
    const pad = (n: number) => String(n).padStart(2, "0");
    const ymd = `${deadlineDate.getUTCFullYear()}${pad(deadlineDate.getUTCMonth() + 1)}${pad(deadlineDate.getUTCDate())}`;
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Mana Sahayam//Civic Reminder//EN",
      "BEGIN:VEVENT",
      `UID:${selectedScheme.id}-${Date.now()}@manasahayam.gov.in`,
      `DTSTAMP:${ymd}T090000Z`,
      `DTSTART;VALUE=DATE:${ymd}`,
      `SUMMARY:Apply for ${selectedScheme.name} (7 Days Left)`,
      `DESCRIPTION:Official Portal: ${selectedScheme.official_url} | Carry MeeSeva Income & Caste certificates.`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedScheme.id}-reminder.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const checkLinkSafety = (rawUrl: string) => {
    const cleaned = rawUrl.trim().toLowerCase();
    if (!cleaned) return null;
    try {
      const withProto = cleaned.startsWith("http") ? cleaned : `https://${cleaned}`;
      const hostname = new URL(withProto).hostname;
      const isOfficial =
        hostname.endsWith(".gov.in") ||
        hostname.endsWith(".nic.in") ||
        hostname === "pmvidyalaxmi.co.in" ||
        hostname.endsWith(".pmvidyalaxmi.co.in");
      return {
        isOfficial,
        hostname,
        message: isOfficial
          ? `VERIFIED OFFICIAL PORTAL (${hostname}): Safe Indian government domain with ₹0 application fee.`
          : `HIGH SCAM RISK (${hostname}): Not an official .gov.in or .nic.in portal! Do NOT enter Aadhaar, OTP, or pay registration fees.`,
      };
    } catch {
      return {
        isOfficial: false,
        hostname: cleaned,
        message: "INVALID OR SUSPICIOUS LINK: Never click shortened WhatsApp/SMS links asking for money.",
      };
    }
  };

  const scamVerdict = checkLinkSafety(scamUrlInput);

  const shareToWhatsApp = () => {
    const title = lang === "en" ? selectedScheme.name : selectedScheme.name_te;
    const docs = activeDocsList.map((d, i) => `${i + 1}. ${d}`).join("\n");
    const locLabel = `${selectedMandal}, ${selectedDistrict}, ${selectedState} (${area})`;
    const msg =
      lang === "en"
        ? `*Mana Sahayam — Scheme Action Slip*\n\n*Scheme:* ${title}\n*Location:* ${locLabel}\n*Status:* ${selectedScheme.lifecycle}\n*Deadline:* ${selectedScheme.deadline}\n\n*Documents Required (${completedDocsCount}/${activeDocsList.length} Ready):*\n${docs}\n\n*Official Portal (₹0 Fee):* ${selectedScheme.official_url}`
        : `*మన సహాయం — పథకం యాక్షన్ స్లిప్*\n\n*పథకం:* ${title}\n*ప్రాంతం:* ${locLabel}\n*స్థితి:* ${selectedScheme.lifecycle}\n*చివరి తేదీ:* ${selectedScheme.deadline}\n\n*అవసరమైన పత్రాలు:*\n${docs}\n\n*అధికారిక పోర్టల్ (₹0 ఫీజు):* ${selectedScheme.official_url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const openOpportunityDetails = (schemeId: string) => {
    setSelectedSchemeId(schemeId);
    navigateStep("opportunity-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        highContrast ? "bg-black text-white" : "bg-slate-950 text-slate-100"
      }`}
    >
      {/* Top Civic Command Bar */}
      <header
        className={`sticky top-0 z-30 border-b px-4 md:px-8 pt-4 pb-3 ${
          highContrast ? "border-yellow-400 bg-black" : "border-slate-800 bg-slate-900/95 backdrop-blur"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-3.5">
          {/* Row 1: Centered Main Title & Government Welfare Emblem */}
          <div
            onClick={() => navigateStep("details")}
            className="flex flex-col items-center justify-center text-center cursor-pointer group"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 via-emerald-500/20 to-indigo-500/20 border border-amber-400/40 flex items-center justify-center shadow-inner group-hover:scale-105 transition">
                <Landmark className="w-5 h-5 text-amber-300" />
              </div>
              <h1 className="font-extrabold text-xl md:text-2xl tracking-tight text-white">
                {lang === "en"
                  ? "Mana Sahayam — All-India Scheme Navigator"
                  : "మన సహాయం — అఖిల భారత పథకాల మార్గదర్శి"}
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {lang === "en"
                ? "Central & State Government Welfare, Scholarship & Subsidy Discovery Portal"
                : "కేంద్ర & రాష్ట్ర ప్రభుత్వ సంక్షేమ, స్కాలర్‌షిప్ & సబ్సిడీ పథకాల వేదిక"}
            </p>
          </div>

          {/* Row 2: Balanced Navigation Stepper (Left) & Action Controls (Right) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-slate-800/80">
            {/* Stepper Breadcrumb */}
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-full text-xs">
              <button
                onClick={() => navigateStep("details")}
                className={`font-bold px-2.5 py-0.5 rounded-full transition ${
                  step === "details" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                1. {lang === "en" ? "Enter Details" : "వివరాలు"}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <button
                onClick={() => navigateStep("opportunities")}
                className={`font-bold px-2.5 py-0.5 rounded-full transition ${
                  step === "opportunities" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                2. {lang === "en" ? `Opportunities (${eligibleAreaSchemes.length})` : `పథకాలు (${eligibleAreaSchemes.length})`}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <button
                onClick={() => navigateStep("opportunity-detail")}
                className={`font-bold px-2.5 py-0.5 rounded-full transition ${
                  step === "opportunity-detail" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                3. {lang === "en" ? "Scheme Guide" : "పూర్తి వివరాలు"}
              </button>
            </div>

            {/* Spaced Utility Controls */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setLargeText(!largeText)}
                  title="Toggle Large Text"
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    largeText
                      ? "bg-emerald-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Type className="w-3.5 h-3.5" /> A+
                </button>

                <button
                  onClick={() => setHighContrast(!highContrast)}
                  title="Toggle High Contrast"
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition ${
                    highContrast
                      ? "bg-yellow-400 text-black"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Contrast className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => setShowScamModal(true)}
                className="flex items-center gap-1.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-500/50 text-rose-200 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
              >
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                {lang === "en" ? "Scam Link Shield" : "నకిలీ లింక్ తనిఖీ"}
              </button>

              <button
                onClick={switchLanguage}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
              >
                <Languages className="w-4 h-4 text-emerald-400" />
                {lang === "en" ? "తెలుగులోకి మార్చండి" : "Switch to English"}
              </button>

              <button
                onClick={() => setShowRuleEditor(true)}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow transition"
              >
                <Sliders className="w-4 h-4" />
                {lang === "en" ? "Live Rule Editor" : "నియమాల ఎడిటర్"}
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* ===================================================================== */}
      {/* PAGE 1: DETAILS SLIDE (Only shown on initial load or when editing)    */}
      {/* ===================================================================== */}
      {step === "details" && (
        <main key="step-details" className="animate-page-enter flex-1 flex items-center justify-center p-4 md:p-8">
          <div
            className={`max-w-3xl w-full border rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 ${
              highContrast ? "bg-black border-yellow-400" : "bg-slate-900 border-slate-800"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {lang === "en" ? "Step 1 of 3 • Citizen & Household Profile" : "దశ 1 / 3 • మీ & కుటుంబ వివరాలు"}
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  {lang === "en"
                    ? "Tell us about yourself & your location"
                    : "మీ గురించి మరియు మీ ప్రాంతం గురించి చెప్పండి"}
                </h2>
              </div>

              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition shadow-lg ${
                  isListening
                    ? "bg-rose-600 text-white animate-pulse"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white"
                }`}
              >
                <Mic className="w-4 h-4" />
                {isListening
                  ? lang === "en"
                    ? "Listening... (Tap to Stop)"
                    : "వింటోంది... (ఆపడానికి నొక్కండి)"
                  : lang === "en"
                  ? "Speak to Write (Te/En)"
                  : "మాట్లాడి రాయండి (తెలుగు/En)"}
              </button>
            </div>

            {/* Plain-Language & Voice Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                {lang === "en"
                  ? "Describe your situation in plain words (English or Telugu):"
                  : "మీ పరిస్థితిని సాధారణ మాటల్లో వివరించండి:"}
              </label>
              <textarea
                rows={3}
                value={inputText}
                onChange={(e) => handleAnalyze(e.target.value)}
                placeholder={
                  lang === "en"
                    ? "E.g., Nenu 2nd year B.Tech student ni, rural village in Ghatkesar Telangana, BC-B category, annual family income 1.2 lakh..."
                    : "ఉదా: నేను తెలంగాణ ఘట్‌కేసర్ గ్రామీణ ప్రాంతానికి చెందిన 2వ సంవత్సరం B.Tech విద్యార్థిని, కుటుంబ ఆదాయం 1.2 లక్షలు..."
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-3.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />
              {voiceError && (
                <div className="bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs p-2.5 rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>{voiceError}</span>
                </div>
              )}
              {privacyWarning && (
                <div className="bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs p-2.5 rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>12-digit ID automatically redacted. Zero personal IDs are stored.</span>
                </div>
              )}
            </div>

            {/* 1-Click Regional Sample Personas */}
            <div>
              <p className="text-xs text-slate-400 mb-2 font-medium">
                {lang === "en" ? "Quick-Fill Sample Profiles (1-Click):" : "నమూనా ప్రొఫైల్ ఎంచుకోండి (1-క్లిక్):"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SAMPLE_PROFILES.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      handleAnalyze(lang === "te" ? p.text_te : p.text_en, {
                        state: p.state,
                        district: p.district,
                        mandal: p.mandal,
                      })
                    }
                    className="text-left bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 p-3 rounded-xl text-xs transition"
                  >
                    <div className="font-semibold text-slate-200">
                      {lang === "en" ? p.label : p.label_te}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Hierarchical Location Grid: State -> District -> Mandal -> Area */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-400" />
                {lang === "en"
                  ? "Select Your Region (State → District → Mandal → Area)"
                  : "మీ ప్రాంతాన్ని ఎంచుకోండి (రాష్ట్రం → జిల్లా → మండలం → ప్రాంతం)"}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
                <label className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">{lang === "en" ? "State" : "రాష్ట్రం"}</span>
                  <select
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="bg-transparent font-bold text-emerald-300 w-full mt-1 focus:outline-none"
                  >
                    {Object.keys(LOCATION_HIERARCHY).map((st) => (
                      <option key={st} value={st} className="bg-slate-900">
                        {st}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">{lang === "en" ? "District" : "జిల్లా"}</span>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="bg-transparent font-bold text-emerald-300 w-full mt-1 focus:outline-none"
                  >
                    {districtsForState.map((dist) => (
                      <option key={dist} value={dist} className="bg-slate-900">
                        {dist}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">{lang === "en" ? "Mandal" : "మండలం"}</span>
                  <select
                    value={selectedMandal}
                    onChange={(e) => setSelectedMandal(e.target.value)}
                    className="bg-transparent font-bold text-emerald-300 w-full mt-1 focus:outline-none"
                  >
                    {mandalsForDistrict.map((m) => (
                      <option key={m} value={m} className="bg-slate-900">
                        {m}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">{lang === "en" ? "Area Type" : "ప్రాంతం"}</span>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value as "Rural" | "Urban")}
                    className="bg-transparent font-bold text-emerald-300 w-full mt-1 focus:outline-none"
                  >
                    <option value="Rural" className="bg-slate-900">
                      {lang === "en" ? "Rural" : "గ్రామీణ (Rural)"}
                    </option>
                    <option value="Urban" className="bg-slate-900">
                      {lang === "en" ? "Urban" : "పట్టణ (Urban)"}
                    </option>
                  </select>
                </label>
              </div>
            </div>

            {/* Social Category, Income & Household Bundler */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2.5">
                <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  {lang === "en" ? "Category & Annual Income" : "కేటగిరీ & వార్షిక ఆదాయం"}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">{lang === "en" ? "Category" : "కేటగిరీ"}</span>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-transparent font-bold text-emerald-300 w-full mt-1 focus:outline-none"
                    >
                      <option value="BC" className="bg-slate-900">BC / OBC</option>
                      <option value="SC" className="bg-slate-900">SC</option>
                      <option value="ST" className="bg-slate-900">ST</option>
                      <option value="EBC" className="bg-slate-900">EBC / EWS</option>
                      <option value="Minority" className="bg-slate-900">Minority</option>
                      <option value="OC" className="bg-slate-900">OC / General</option>
                      <option value="Unknown" className="bg-slate-900">Not Sure</option>
                    </select>
                  </label>

                  <label className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block">
                      {lang === "en" ? "Income (₹/yr)" : "ఆదాయం (₹/సం.)"}
                    </span>
                    <input
                      type="number"
                      value={income ?? ""}
                      placeholder="120000"
                      onChange={(e) => setIncome(e.target.value ? Number(e.target.value) : null)}
                      className="bg-transparent font-bold text-emerald-300 w-full mt-1 focus:outline-none"
                    />
                  </label>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2.5">
                <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {lang === "en" ? "Household Benefit Bundler (Optional)" : "కుటుంబ సభ్యులను కలపండి (ఐచ్ఛికం)"}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {HOUSEHOLD_MEMBERS.map((m) => {
                    const active = activeMembers.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => toggleHouseholdMember(m.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                          active
                            ? "bg-indigo-600 text-white border-indigo-400"
                            : "bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500"
                        }`}
                      >
                        {lang === "en" ? m.label : m.label_te}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Primary CTA Button to Open Opportunities Page */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {lang === "en"
                    ? "Zero Aadhaar/ID required • Instant eligibility check"
                    : "ఆధార్/ID అవసరం లేదు • తక్షణ అర్హత తనిఖీ"}
                </span>
              </div>

              <button
                onClick={() => {
                  navigateStep("opportunities");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm px-7 py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition"
              >
                {lang === "en"
                  ? `Find Eligible Opportunities (${eligibleAreaSchemes.length})`
                  : `అర్హత గల పథకాలను చూడండి (${eligibleAreaSchemes.length})`}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ===================================================================== */}
      {/* PAGE 2: OPPORTUNITIES LIST PAGE (Shown after entering details)        */}
      {/* ===================================================================== */}
      {step === "opportunities" && (
        <main key="step-opportunities" className="animate-page-enter flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 space-y-5">
          {/* Top Navigation & Profile Summary Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateStep("details")}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 px-3.5 py-2 rounded-xl text-xs font-bold transition"
              >
                <ArrowLeft className="w-4 h-4" />
                {lang === "en" ? "Edit Details" : "వివరాలు మార్చండి"}
              </button>
              <div>
                <h2 className="font-extrabold text-lg text-white">
                  {lang === "en"
                    ? `Matched Opportunities for ${selectedMandal}, ${selectedDistrict}`
                    : `${selectedMandal}, ${selectedDistrict} కోసం అర్హత గల పథకాలు`}
                </h2>
                <p className="text-xs text-slate-400">
                  {selectedState} • {area} • Category: <strong className="text-slate-200">{category}</strong> • Income:{" "}
                  <strong className="text-slate-200">
                    {income !== null ? `₹${income.toLocaleString("en-IN")}` : "Not Specified"}
                  </strong>
                </p>
              </div>
            </div>

            {/* Combined Benefit Estimator Pill */}
            <div className="bg-gradient-to-r from-emerald-950 to-teal-950 border border-emerald-500/40 rounded-xl px-4 py-2.5 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold">
                  {lang === "en" ? "Est. Combined Live Support" : "అంచనా మొత్తం లైవ్ ప్రయోజనం"}
                </div>
                <div className="text-base font-extrabold text-white">
                  Up to ₹{totalLiveBenefitValue.toLocaleString("en-IN")} / yr
                </div>
              </div>
            </div>
          </div>

          {/* Missing Details Prompt if applicable */}
          {(income === null || category === "Unknown") && (
            <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-3.5 text-xs text-amber-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {lang === "en"
                    ? "Some details (income or category) were not specified. Go back to Edit Details for exact filtering."
                    : "ఆదాయం లేదా కేటగిరీ వివరాలు నమోదు కాలేదు. ఖచ్చితమైన ఫలితాల కోసం వివరాలు మార్చండి."}
                </span>
              </div>
              <button
                onClick={() => navigateStep("details")}
                className="bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-lg"
              >
                {lang === "en" ? "Complete Profile" : "వివరాలు పూర్తి చేయండి"}
              </button>
            </div>
          )}

          {/* Filter Bar: Lifecycle Tabs + Search + Sort */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-6 grid grid-cols-4 gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs font-bold">
              {(["All", "Live", "Upcoming", "Completed"] as const).map((tab) => {
                const active = lifecycleFilter === tab;
                const badgeColor =
                  tab === "Live"
                    ? "text-emerald-400"
                    : tab === "Upcoming"
                    ? "text-amber-400"
                    : tab === "Completed"
                    ? "text-slate-400"
                    : "text-white";
                return (
                  <button
                    key={tab}
                    onClick={() => setLifecycleFilter(tab)}
                    className={`py-2 px-2 rounded-lg transition flex items-center justify-center gap-1 ${
                      active ? "bg-slate-800 border border-slate-700 shadow" : "hover:bg-slate-950 opacity-80"
                    }`}
                  >
                    <span className={badgeColor}>{tab}</span>
                    <span className="text-[11px] text-slate-400">({counts[tab]})</span>
                  </button>
                );
              })}
            </div>

            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "en" ? "Search schemes by keyword..." : "పథకాలను వెతకండి..."}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "default" | "deadline" | "value")}
              className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-semibold focus:outline-none"
            >
              <option value="default">Sort: Best Match</option>
              <option value="value">Sort: Highest ₹ Value</option>
              <option value="deadline">Sort: Closing Soon</option>
            </select>
          </div>

          {/* Stackability Banner */}
          {pinnedSchemes.length > 0 && (
            <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl px-4 py-2.5 text-xs flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-indigo-200">
                  {lang === "en" ? "Stackability Comparison:" : "పథకాల కలయిక:"}
                </span>
                <span className="text-slate-300">
                  {pinnedSchemes.map((s) => s.name.split(" ")[0]).join(" + ")} —{" "}
                  <strong className="text-emerald-300">
                    {lang === "en"
                      ? "100% Stackable! You can claim State + Central benefits together."
                      : "100% కలిపి పొందవచ్చు! రాష్ట్ర + కేంద్ర ప్రయోజనాలు."}
                  </strong>
                </span>
              </div>
            </div>
          )}

          {/* Opportunities Cards Grid */}
          {displayedSchemes.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center text-sm text-slate-400">
              No {lifecycleFilter.toLowerCase()} opportunities match the current filters. Try switching tabs or editing details.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedSchemes.map(({ scheme, status, cap }) => {
                const isPinned = pinnedIds.includes(scheme.id);
                const readContent =
                  lang === "te"
                    ? `${scheme.name_te}. ప్రయోజనం: ${scheme.benefit_te}.`
                    : `${scheme.name}. Benefit: ${scheme.benefit}. Status: ${scheme.lifecycle}.`;
                const reasons = lang === "en" ? scheme.rule_reasons : scheme.rule_reasons_te;

                const lifecycleBadge =
                  scheme.lifecycle === "Live"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    : scheme.lifecycle === "Upcoming"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    : "bg-slate-700/40 text-slate-300 border-slate-600";

                return (
                  <div
                    key={scheme.id}
                    onClick={() => openOpportunityDetails(scheme.id)}
                    className={`card-smooth-hover cursor-pointer rounded-2xl p-5 border flex flex-col justify-between gap-4 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-950/25 ${
                      highContrast ? "bg-black border-yellow-400" : "bg-slate-900 border-slate-800"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${lifecycleBadge}`}>
                            ● {scheme.lifecycle}
                          </span>
                          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                            {scheme.state}
                          </span>
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950 text-emerald-300 border border-slate-700">
                            {status}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={(e) => speakText(scheme.id, readContent, e)}
                            className={`px-2 py-1 rounded-lg border text-[11px] flex items-center gap-1 ${
                              speakingId === scheme.id
                                ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                                : "bg-slate-950 text-slate-300 border-slate-700 hover:border-slate-500"
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            {lang === "en" ? "Listen" : "వినండి"}
                          </button>
                          <button
                            onClick={(e) => togglePin(scheme.id, e)}
                            className={`px-2 py-1 rounded-lg border text-[11px] font-semibold ${
                              isPinned
                                ? "bg-indigo-600/40 border-indigo-400 text-indigo-200"
                                : "bg-slate-950 border-slate-700 text-slate-400"
                            }`}
                          >
                            {isPinned ? "Pinned" : "+ Compare"}
                          </button>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-base text-white">
                          {lang === "en" ? scheme.name : scheme.name_te}
                        </h3>
                        <p className="text-xs text-emerald-300 font-semibold mt-1">
                          {lang === "en" ? scheme.benefit : scheme.benefit_te}
                        </p>
                      </div>

                      <div className="bg-slate-950 rounded-xl p-3 text-xs space-y-1 border border-slate-800/80">
                        <div className="font-semibold text-slate-300">
                          {lang === "en" ? "Why this matches:" : "ఈ పథకం ఎందుకు సరిపోతుంది:"}
                        </div>
                        <ul className="list-disc pl-4 text-slate-400 space-y-0.5">
                          <li>
                            Income cap ({area}): <strong className="text-slate-200">₹{cap.toLocaleString("en-IN")}</strong>{" "}
                            {income !== null ? `(Your input: ₹${income.toLocaleString("en-IN")})` : ""}
                          </li>
                          {reasons.slice(0, 2).map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                      <span className="text-slate-400">
                        {scheme.lifecycle === "Completed"
                          ? `Closed: ${scheme.deadline}`
                          : scheme.lifecycle === "Upcoming"
                          ? `Opens: ${scheme.deadline}`
                          : `Deadline: ${scheme.deadline}`}
                      </span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        {lang === "en" ? "View Full Guide & Checklist" : "పూర్తి వివరాలు & చెక్‌లిస్ట్ చూడండి"}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* "Why Not Eligible?" Transparency Drawer */}
          {excludedSchemes.length > 0 && (
            <div className="pt-2">
              <button
                onClick={() => setShowIneligible(!showIneligible)}
                className="w-full flex items-center justify-between bg-slate-900 hover:bg-slate-800 border border-slate-800 px-4 py-3 rounded-xl text-xs text-slate-300 font-semibold"
              >
                <span className="flex items-center gap-2">
                  {showIneligible ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                  {lang === "en"
                    ? `Show Excluded Schemes (${excludedSchemes.length}) — Explain Why They Didn't Match`
                    : `వర్తించని పథకాలు (${excludedSchemes.length}) — కారణాలు చూడండి`}
                </span>
                <span>{showIneligible ? "▲" : "▼"}</span>
              </button>

              {showIneligible && (
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {excludedSchemes.map(({ scheme, exclusionReasons }) => (
                    <div key={scheme.id} className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 text-xs space-y-1.5">
                      <div className="font-bold text-slate-200 flex items-center justify-between">
                        <span>{scheme.name}</span>
                        <span className="text-[10px] text-rose-400 bg-rose-950/60 border border-rose-500/30 px-2 py-0.5 rounded-full">
                          Not Matched
                        </span>
                      </div>
                      <ul className="list-disc pl-4 text-rose-300/90 text-[11px]">
                        {exclusionReasons.map((er, i) => (
                          <li key={i}>{er}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      )}

      {/* ===================================================================== */}
      {/* PAGE 3: FULL OPPORTUNITY DETAILS PAGE (Shown when an item is clicked) */}
      {/* ===================================================================== */}
      {step === "opportunity-detail" && (
        <main key="step-detail-view" className="animate-page-enter flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 space-y-5">
          {/* Top Back Button & Lifecycle Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => navigateStep("opportunities")}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-100 px-4 py-2 rounded-xl text-xs font-bold transition"
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === "en" ? "Back to All Opportunities" : "అన్ని పథకాలకు తిరిగి వెళ్ళండి"}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                {selectedScheme.state} • {selectedScheme.lifecycle}
              </span>
              <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                <Clock className="w-3.5 h-3.5" />
                {selectedScheme.lifecycle === "Completed"
                  ? "Window Closed (Prep Next)"
                  : selectedScheme.lifecycle === "Upcoming"
                  ? `Starts in ${daysUntil(selectedScheme.deadline)} days`
                  : `${daysUntil(selectedScheme.deadline)} days left (${selectedScheme.deadline})`}
              </span>
            </div>
          </div>

          {/* Hero Opportunity Card */}
          <div
            className={`border rounded-3xl p-6 space-y-4 ${
              highContrast ? "bg-black border-yellow-400" : "bg-slate-900 border-slate-800"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <h2 className="text-2xl font-extrabold text-white">
                  {lang === "en" ? selectedScheme.name : selectedScheme.name_te}
                </h2>
                <p className="text-base text-emerald-300 font-semibold">
                  {lang === "en" ? selectedScheme.benefit : selectedScheme.benefit_te}
                </p>
                <p className="text-xs text-slate-400">
                  Verified: {selectedScheme.last_verified} • Official Portal Fee: ₹0 • Region: {selectedMandal}, {selectedDistrict} ({area})
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    speakText(
                      "detail-hero",
                      lang === "te"
                        ? `${selectedScheme.name_te}. ప్రయోజనం: ${selectedScheme.benefit_te}.`
                        : `${selectedScheme.name}. Benefit: ${selectedScheme.benefit}.`
                    )
                  }
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold"
                >
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  {lang === "en" ? "Read Aloud" : "వినండి"}
                </button>

                <a
                  href={selectedScheme.official_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-lg transition"
                >
                  {lang === "en" ? "Apply on Official Portal" : "అధికారిక పోర్టల్‌లో దరఖాస్తు చేయండి"}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Eligibility Breakdown Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {lang === "en" ? "Eligibility & Policy Rules Breakdown" : "అర్హత & నియమాల వివరాలు"}
              </div>
              <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
                <li>
                  Income Cap ({area}):{" "}
                  <strong className="text-white">₹{selectedEval.cap.toLocaleString("en-IN")}</strong>{" "}
                  {income !== null ? `(Your Entered Income: ₹${income.toLocaleString("en-IN")})` : ""}
                </li>
                <li>
                  Eligible Categories:{" "}
                  <strong className="text-white">{selectedScheme.eligible_categories.join(", ")}</strong> (Your Category:{" "}
                  {category})
                </li>
                {(lang === "en" ? selectedScheme.rule_reasons : selectedScheme.rule_reasons_te).map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 2-Column Interactive Checklist & Step-by-Step Guide */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Column: Document Checklist + Readiness Bar */}
            <div
              className={`border rounded-3xl p-5 space-y-4 ${
                highContrast ? "bg-black border-yellow-400" : "bg-slate-900 border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-emerald-400" />
                  {lang === "en" ? "Required Documents Checklist" : "అవసరమైన పత్రాల చెక్‌లిస్ట్"}
                </h3>
                <button
                  onClick={() =>
                    speakText(
                      "checklist",
                      lang === "te"
                        ? `${selectedScheme.name_te} కోసం అవసరమైన పత్రాలు: ${selectedScheme.documents_te.slice(0, 2).join(", ")}`
                        : `Required documents for ${selectedScheme.name}: ${selectedScheme.documents.join(". ")}`
                    )
                  }
                  className="text-xs text-emerald-300 hover:underline flex items-center gap-1"
                >
                  <Volume2 className="w-4 h-4" /> {lang === "en" ? "Read List" : "వినండి"}
                </button>
              </div>

              {/* Readiness Progress Bar */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">
                    {lang === "en"
                      ? `Readiness: ${completedDocsCount}/${activeDocsList.length} Docs Checked`
                      : `సిద్ధత: ${completedDocsCount}/${activeDocsList.length} పత్రాలు సిద్ధం`}
                  </span>
                  <span className={`font-bold ${docProgressPct === 100 ? "text-emerald-400" : "text-amber-300"}`}>
                    {docProgressPct === 100 ? "100% Ready to Apply!" : `${docProgressPct}%`}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      docProgressPct === 100 ? "bg-emerald-500" : "bg-amber-400"
                    }`}
                    style={{ width: `${docProgressPct}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                {activeDocsList.map((doc, idx) => {
                  const key = `${selectedScheme.id}-${idx}`;
                  const done = !!checkedDocs[key];
                  return (
                    <button
                      key={key}
                      onClick={() => toggleDoc(key)}
                      className="w-full text-left flex items-start gap-3 text-xs p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition"
                    >
                      {done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      )}
                      <span className={done ? "line-through text-slate-500" : "text-slate-200 font-medium"}>
                        {doc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Step-by-Step Instructions + Citizen Action Tools */}
            <div
              className={`border rounded-3xl p-5 flex flex-col justify-between gap-5 ${
                highContrast ? "bg-black border-yellow-400" : "bg-slate-900 border-slate-800"
              }`}
            >
              <div className="space-y-3">
                <h3 className="font-bold text-base text-white">
                  {lang === "en" ? "Step-by-Step Application & Follow-Up" : "దరఖాస్తు చేసే విధానం (దశలవారీగా)"}
                </h3>
                <ol className="list-decimal pl-5 space-y-2.5 text-xs text-slate-300 leading-relaxed">
                  {(lang === "en" ? selectedScheme.steps : selectedScheme.steps_te).map((stepItem, i) => (
                    <li key={i} className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl">
                      {stepItem}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-800">
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`https://www.google.com/maps/search/MeeSeva+or+CSC+center+in+${encodeURIComponent(
                      `${selectedMandal}, ${selectedDistrict}, ${selectedState}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-semibold text-xs py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <MapPin className="w-4 h-4 text-rose-400" />
                    {lang === "en" ? `MeeSeva (${selectedMandal})` : `మీసేవ (${selectedMandal})`}
                  </a>
                  <button
                    onClick={downloadCalendarReminder}
                    className="bg-indigo-700 hover:bg-indigo-600 text-white font-semibold text-xs py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    {lang === "en" ? "Calendar Alert (-7d)" : "క్యాలెండర్ అలర్ట్"}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={shareToWhatsApp}
                    className="bg-teal-700 hover:bg-teal-600 text-white font-semibold text-xs py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <Share2 className="w-4 h-4" />
                    {lang === "en" ? "Send to Parents" : "WhatsApp పంపండి"}
                  </button>
                  <button
                    onClick={() => setShowSlipModal(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <Printer className="w-4 h-4" />
                    {lang === "en" ? "Print Action Slip" : "యాక్షన్ స్లిప్ ప్రింట్"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* SCAM LINK SHIELD MODAL */}
      {showScamModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="animate-modal-enter bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <h2 className="font-bold text-base">Anti-Fraud Link Shield (Verify Official Portal)</h2>
              </div>
              <button
                onClick={() => setShowScamModal(false)}
                className="bg-slate-800 px-3 py-1 rounded-lg text-xs font-bold"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Received a scholarship or free laptop link on WhatsApp/SMS? Paste it below to verify if it is a real Indian government domain (<code>.gov.in</code> / <code>.nic.in</code>).
            </p>
            <input
              type="text"
              value={scamUrlInput}
              onChange={(e) => setScamUrlInput(e.target.value)}
              placeholder="Paste link (e.g., https://telanganaepass.cgg.gov.in or http://free-laptop-scheme.xyz)"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
            {scamVerdict && (
              <div
                className={`p-3 rounded-xl border text-xs font-semibold flex items-start gap-2 ${
                  scamVerdict.isOfficial
                    ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-200"
                    : "bg-rose-950/70 border-rose-500/50 text-rose-200"
                }`}
              >
                {scamVerdict.isOfficial ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <span>{scamVerdict.message}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LIVE RULE & STATUS EDITOR MODAL */}
      {showRuleEditor && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
          <div className="animate-modal-enter bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="font-bold text-base">Live Scheme Rules & Lifecycle Editor</h2>
                <p className="text-xs text-slate-400">
                  Switch schemes between Live, Upcoming, or Completed or edit income caps live.
                </p>
              </div>
              <button
                onClick={() => setShowRuleEditor(false)}
                className="bg-slate-800 px-3 py-1 rounded-lg text-xs font-bold"
              >
                Done
              </button>
            </div>

            <div className="space-y-3">
              {schemes.map((s, idx) => (
                <div key={s.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-2 text-xs">
                  <div className="font-bold text-emerald-300">
                    {s.name} ({s.state})
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <label>
                      <span className="text-slate-400 block">Lifecycle Status</span>
                      <select
                        value={s.lifecycle}
                        onChange={(e) => {
                          const copy = [...schemes];
                          copy[idx] = { ...s, lifecycle: e.target.value as "Live" | "Upcoming" | "Completed" };
                          setSchemes(copy);
                        }}
                        className="bg-slate-900 border border-slate-700 rounded px-2 py-1 w-full mt-1"
                      >
                        <option value="Live">Live</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </label>
                    <label>
                      <span className="text-slate-400 block">Rural Income Cap (₹)</span>
                      <input
                        type="number"
                        value={s.max_income_rural}
                        onChange={(e) => {
                          const copy = [...schemes];
                          copy[idx] = { ...s, max_income_rural: Number(e.target.value) };
                          setSchemes(copy);
                        }}
                        className="bg-slate-900 border border-slate-700 rounded px-2 py-1 w-full mt-1"
                      />
                    </label>
                    <label>
                      <span className="text-slate-400 block">Deadline / Date</span>
                      <input
                        type="date"
                        value={s.deadline}
                        onChange={(e) => {
                          const copy = [...schemes];
                          copy[idx] = { ...s, deadline: e.target.value };
                          setSchemes(copy);
                        }}
                        className="bg-slate-900 border border-slate-700 rounded px-2 py-1 w-full mt-1"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAMILY ACTION SLIP MODAL */}
      {showSlipModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
          <div className="animate-modal-enter bg-white text-slate-900 rounded-2xl max-w-md w-full p-5 space-y-3">
            <div className="border-b pb-2 flex justify-between items-center">
              <h3 className="font-bold text-base">Mana Sahayam — Action Slip</h3>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                {selectedScheme.lifecycle} • {selectedMandal}, {selectedState}
              </span>
            </div>
            <p className="text-xs text-slate-600">
              <strong>Scheme:</strong> {selectedScheme.name}
              <br />
              <strong>Location:</strong> {selectedMandal} Mandal, {selectedDistrict} District, {selectedState} ({area})
              <br />
              <strong>Target Date:</strong> {selectedScheme.deadline} • <strong>Verified:</strong> {selectedScheme.last_verified}
            </p>
            <div className="text-xs space-y-1">
              <strong>Documents Required ({completedDocsCount}/{activeDocsList.length} Ready):</strong>
              <ul className="list-disc pl-4">
                {selectedScheme.documents.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
            <p className="text-[11px] text-slate-500 border-t pt-2">
              Anti-Scam Note: Official government portals charge ₹0 application fee ({selectedScheme.official_url}).
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-slate-900 text-white text-xs font-bold py-2 rounded-lg"
              >
                Print / Save PDF
              </button>
              <button
                onClick={() => setShowSlipModal(false)}
                className="px-4 bg-slate-200 text-slate-800 text-xs font-bold py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





