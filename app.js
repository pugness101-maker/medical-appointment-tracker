const STORAGE_KEY = "medical-appointment-tracker-v1";
const NEW_PROVIDER_OPTION = "__new_provider__";
const PROVIDER_OPTION_PREFIX = "provider:";
const CARE_PLAN_LEGACY_PROVIDER_PREFIX = "care-plan-legacy:";
const CARE_PLAN_DELETE_CONFIRM =
  "Delete this care plan item? This will not delete providers, appointments, or visit logs.";
const STORAGE_VERSION = 2;
const STORAGE_BACKUP_KEY = `${STORAGE_KEY}-backup`;
const DEFAULT_PROVIDER_OPTIONS = ["Dr. Smith", "Dr. Patel", "Dr. Johnson", "Dentist Office", "Eye Doctor", "Primary Care"];
const DEFAULT_SPECIALTY_OPTIONS = [
  "Primary care",
  "Dentist",
  "Eye doctor",
  "OB-GYN",
  "Dermatologist",
  "Cardiologist",
  "Psychiatrist",
  "Therapist",
  "Gastroenterologist",
  "Endocrinologist",
  "Neurologist",
  "Orthopedist",
  "Pulmonologist",
  "Urgent care",
];
const DEFAULT_REASON_OPTIONS = [
  "Annual checkup",
  "Follow-up",
  "Screening",
  "Medication refill",
  "Lab review",
  "Dental cleaning",
  "Eye exam",
  "Vaccination",
  "Pain or symptoms",
  "Test results review",
];

const QUICK_VISIT_LOG_TEMPLATES = {
  "annual-checkup": {
    reason: "Annual checkup",
    summaryPlaceholder: "Routine annual preventive visit and health review.",
    followUpNeeded: "Review in 12 months unless the clinician recommends sooner.",
    status: "Completed",
    followUpDueMonths: 12,
  },
  "dental-cleaning": {
    reason: "Dental cleaning",
    summaryPlaceholder: "Dental hygiene visit with cleaning, exam, and any treatment notes.",
    followUpNeeded: "Return for dental cleaning in 6 months.",
    status: "Completed",
    followUpDueMonths: 6,
  },
  "eye-exam": {
    reason: "Eye exam",
    summaryPlaceholder: "Vision exam, lens prescription check, and eye health review.",
    followUpNeeded: "Follow up in 12 months or sooner if vision changes.",
    status: "Completed",
    followUpDueMonths: 12,
  },
  "lab-review": {
    reason: "Lab review",
    summaryPlaceholder: "Review of recent lab results and next-step recommendations.",
    followUpNeeded: "Follow up once results are available or if a repeat lab is ordered.",
    status: "Waiting on results",
  },
  "medication-refill": {
    reason: "Medication refill",
    summaryPlaceholder: "Medication review and refill authorization details.",
    followUpNeeded: "Check back when the refill is due or if side effects occur.",
    status: "Completed",
  },
  "follow-up": {
    reason: "Follow-up",
    summaryPlaceholder: "Follow-up visit for ongoing care, treatment review, or test results.",
    followUpNeeded: "Continue monitoring and return as the clinician recommends.",
    status: "Follow-up needed",
  },
  "sick-visit": {
    reason: "Sick visit",
    summaryPlaceholder: "Acute care visit for illness, symptoms, or urgent concerns.",
    followUpNeeded: "Return if symptoms worsen or do not improve.",
    status: "Follow-up needed",
  },
  screening: {
    reason: "Screening",
    summaryPlaceholder: "Screening exam for preventive testing or health maintenance.",
    followUpNeeded: "Schedule the next screening as recommended.",
    status: "Completed",
  },
  custom: {},
};

const VISIT_LOG_NOTE_PRESETS = {
  "normal": {
    status: "Completed",
    summary: "Normal visit with no urgent concerns.",
  },
  "waiting-results": {
    status: "Waiting on results",
    summary: "Waiting on results from labs or imaging.",
    followUpNeeded: "Review results and follow up when available.",
  },
  "needs-follow-up": {
    status: "Follow-up needed",
    summary: "Needs follow-up to complete care plan.",
    followUpNeeded: "Schedule a follow-up appointment based on provider recommendations.",
  },
  "paid-copay": {
    summary: "Copay paid at the visit.",
  },
  "no-concerns": {
    status: "Completed",
    summary: "No concerns noted during the visit.",
  },
};

const INITIAL_APPOINTMENT_LOGS = [
  {
    key: "primary-care-pcp",
    title: "Primary Care (PCP)",
    doctor: "VIMAL GEORGE",
    specialty: "Primary care",
    place: "ADC Steiner Ranch; Family Practice, Podiatry, Rheumatology 5145 FM 620 N Austin, TX 78732",
    appointmentDate: "2026-03-19",
    appointmentTime: "10:00",
    lastVisitDate: "2025-06-09",
    nextRecommendedVisit: "2026-06-01",
    intervalMonths: 12,
    reminderDaysBefore: 14,
    reminderEnabled: true,
    reasonForVisit: "Annual checkup",
    notes:
      "Annual physical, labs, referrals, vaccines. Last visit was 06/09/2025 at Bee Cave Pediatrics with Dr. Grier. Portal user saved: AdrianaHyatt2007. Password intentionally not stored in the app.",
    questionsToAsk: "Transition to adult PCP and review annual preventive care plan.",
    medications: "",
    testResults: "",
    resultFiles: [],
    contactPhone: "",
    insuranceAccepted: "",
  },
  {
    key: "vaccines-review",
    title: "Vaccines (Review with PCP)",
    doctor: "VIMAL GEORGE",
    specialty: "Primary care",
    place: "ADC Steiner Ranch; Family Practice, Podiatry, Rheumatology 5145 FM 620 N Austin, TX 78732",
    appointmentDate: "",
    appointmentTime: "",
    lastVisitDate: "2023-01-19",
    nextRecommendedVisit: "2026-03-19",
    intervalMonths: 12,
    reminderDaysBefore: 14,
    reminderEnabled: true,
    reasonForVisit: "Vaccination",
    notes: "Review flu, Tdap, HPV, COVID, Hep A/B. Last review noted all immunizations up to date.",
    questionsToAsk: "Review adult vaccine schedule and what is due next.",
    medications: "",
    testResults: "",
    resultFiles: [],
    contactPhone: "",
    insuranceAccepted: "",
  },
  {
    key: "labs-bloodwork",
    title: "Labs / Bloodwork",
    doctor: "VIMAL GEORGE",
    specialty: "Primary care",
    place: "ADC Steiner Ranch; Family Practice, Podiatry, Rheumatology 5145 FM 620 N Austin, TX 78732",
    appointmentDate: "",
    appointmentTime: "",
    lastVisitDate: "2025-06-09",
    nextRecommendedVisit: "2026-06-01",
    intervalMonths: 12,
    reminderDaysBefore: 14,
    reminderEnabled: true,
    reasonForVisit: "Lab review",
    notes: "General health labs, iron, vitamin D, cholesterol.",
    questionsToAsk: "Ask whether yearly labs are due and which markers to check.",
    medications: "",
    testResults: "",
    resultFiles: [],
    contactPhone: "",
    insuranceAccepted: "",
  },
  {
    key: "obgyn-womens-health",
    title: "OB-GYN / Women's Health",
    doctor: "Dr. Souhail Asfouri, MD, FACOG",
    specialty: "OB-GYN",
    place: "Austin Southwest OB / GYN - 4316 James Casey St, Bldg. F, Ste 200, Austin, TX 78745",
    appointmentDate: "",
    appointmentTime: "",
    lastVisitDate: "2026-03-18",
    nextRecommendedVisit: "2027-01-01",
    intervalMonths: 12,
    reminderDaysBefore: 21,
    reminderEnabled: true,
    reasonForVisit: "Annual checkup",
    notes:
      "Cycle health and pelvic care. Liletta IUD placed 01/29/2026 and noted effective for 8 years. Past provider: Central Texas OB/GYN Associates, Mary Brown. Prior IUD history: Skyla inserted 03/28/2022.",
    questionsToAsk: "Check IUD follow-up timing and any annual pelvic care needs.",
    medications: "",
    testResults: "",
    resultFiles: [],
    contactPhone: "",
    insuranceAccepted: "",
  },
  {
    key: "sti-std-screening",
    title: "STI / STD Screening",
    doctor: "Austin Public Health Sexual Health Clinic or Planned Parenthood",
    specialty: "Sexual health",
    place: "Austin Public Health Sexual Health Clinic or Planned Parenthood",
    appointmentDate: "",
    appointmentTime: "",
    lastVisitDate: "2026-03-18",
    nextRecommendedVisit: "",
    intervalMonths: 12,
    reminderDaysBefore: 14,
    reminderEnabled: true,
    reasonForVisit: "Screening",
    notes:
      "Preventive sexual health screening. Positive chlamydia result on 02/03/2026; medications taken from 02/04/2026 to 02/11/2026; follow-up noted for March 2026.",
    questionsToAsk: "Discuss screening frequency based on sexual activity and partner changes.",
    medications: "Chlamydia treatment completed 02/04/2026 to 02/11/2026.",
    testResults: "Positive chlamydia test on 02/03/2026.",
    resultFiles: [],
    contactPhone: "",
    insuranceAccepted: "",
  },
  {
    key: "dentist-log",
    title: "Dentist",
    doctor: "Dr. Jason Sampat",
    specialty: "Dentist",
    place: "Quinlan Park Dental - 5145 N FM 620 G-150 Austin, TX 78732",
    appointmentDate: "",
    appointmentTime: "",
    lastVisitDate: "2025-11-04",
    nextRecommendedVisit: "2026-05-01",
    intervalMonths: 6,
    reminderDaysBefore: 14,
    reminderEnabled: true,
    reasonForVisit: "Dental cleaning",
    notes: "Cleaning, cavity and gum check, X-rays. Prior visit logged as Lone Star Pediatric Dental. Appointment requested.",
    questionsToAsk: "Ask about cleaning timing, X-rays, and any cavity or gum follow-up.",
    medications: "",
    testResults: "",
    resultFiles: [],
    contactPhone: "",
    insuranceAccepted: "",
  },
  {
    key: "eye-exam-log",
    title: "Eye Exam",
    doctor: "Dr. Amber Nelson",
    specialty: "Eye doctor",
    place: "Bristol Family Eyecare - Bee Cave",
    appointmentDate: "",
    appointmentTime: "",
    lastVisitDate: "2026-02-27",
    nextRecommendedVisit: "2027-02-01",
    intervalMonths: 12,
    reminderDaysBefore: 21,
    reminderEnabled: true,
    reasonForVisit: "Eye exam",
    notes: "Vision check, eye strain review, and prescription update.",
    questionsToAsk: "Ask whether prescription or eye-strain management changed.",
    medications: "",
    testResults: "",
    resultFiles: [],
    contactPhone: "",
    insuranceAccepted: "",
  },
  {
    key: "dermatologist-log",
    title: "Dermatologist",
    doctor: "Melinda Conroy, DO",
    specialty: "Dermatologist",
    place: "Westlake Dermatology & Cosmetic Surgery - Lakeway 401 RR 620 South, Suite 200, Lakeway, TX 78734",
    appointmentDate: "2026-02-19",
    appointmentTime: "08:40",
    lastVisitDate: "",
    nextRecommendedVisit: "",
    intervalMonths: 12,
    reminderDaysBefore: 14,
    reminderEnabled: true,
    reasonForVisit: "Pain or symptoms",
    notes: "Acne, rashes, moles, and skin baseline. Last completed visit date was not confirmed in the source notes.",
    questionsToAsk: "Ask whether yearly skin checks make sense or if visits should stay as needed.",
    medications: "",
    testResults: "",
    resultFiles: [],
    contactPhone: "",
    insuranceAccepted: "",
  },
];
const RECOMMENDATION_LIBRARY = [
  {
    key: "dentist",
    title: "Dental checkup",
    specialty: "Dentist",
    intervalMonths: 6,
    reason: "Baseline reminder template for routine dental visits.",
    sourceLabel: "Always included baseline appointment",
    sourceUrl: "",
    matches: () => true,
  },
  {
    key: "eye-exam",
    title: "Eye exam",
    specialty: "Eye doctor",
    intervalMonths: 12,
    reason: "Baseline reminder template for routine vision care.",
    sourceLabel: "Always included baseline appointment",
    sourceUrl: "",
    matches: () => true,
  },
  {
    key: "pcp",
    title: "Primary care check-in",
    specialty: "Primary care",
    intervalMonths: 12,
    reason: "Baseline reminder template for keeping up with a PCP visit.",
    sourceLabel: "Always included baseline appointment",
    sourceUrl: "",
    matches: () => true,
  },
  {
    key: "blood-pressure",
    title: "Blood pressure screening",
    specialty: "Primary care",
    intervalMonths: 12,
    reason: "USPSTF recommends screening adults 18 and older for hypertension.",
    sourceLabel: "USPSTF Hypertension in Adults: Screening (April 27, 2021)",
    sourceUrl:
      "https://www.uspreventiveservicestaskforce.org/uspstf/document/RecommendationStatementFinal/hypertension-in-adults-screening",
    matches: ({ age }) => age >= 18,
  },
  {
    key: "depression",
    title: "Depression screening discussion",
    specialty: "Primary care or mental health",
    intervalMonths: 12,
    reason: "USPSTF recommends screening adults, including pregnant and postpartum persons, for depression.",
    sourceLabel: "USPSTF Depression and Suicide Risk in Adults: Screening (June 20, 2023)",
    sourceUrl:
      "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/screening-depression-suicide-risk-adults",
    matches: ({ age }) => age >= 18,
  },
  {
    key: "anxiety",
    title: "Anxiety screening discussion",
    specialty: "Primary care or mental health",
    intervalMonths: 12,
    reason: "USPSTF recommends screening adults age 64 or younger for anxiety disorders.",
    sourceLabel: "USPSTF Anxiety Disorders in Adults: Screening (June 20, 2023)",
    sourceUrl: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/anxiety-adults-screening",
    matches: ({ age }) => age >= 18 && age <= 64,
  },
  {
    key: "diabetes",
    title: "Prediabetes and type 2 diabetes screening",
    specialty: "Primary care",
    intervalMonths: 36,
    reason: "USPSTF recommends screening adults age 35 to 70 who have overweight or obesity.",
    sourceLabel: "USPSTF Prediabetes and Type 2 Diabetes: Screening (August 24, 2021)",
    sourceUrl:
      "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/screening-for-prediabetes-and-type-2-diabetes",
    matches: ({ age, hasOverweightOrObesity }) => age >= 35 && age <= 70 && hasOverweightOrObesity === "yes",
  },
  {
    key: "colorectal",
    title: "Colorectal cancer screening discussion",
    specialty: "Primary care or gastroenterology",
    intervalMonths: 12,
    reason: "USPSTF recommends colorectal cancer screening starting at age 45 through 75.",
    sourceLabel: "USPSTF Colorectal Cancer: Screening (May 18, 2021)",
    sourceUrl: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/colorectal-cancer-screening",
    matches: ({ age }) => age >= 45 && age <= 75,
  },
  {
    key: "breast-cancer",
    title: "Breast cancer screening discussion",
    specialty: "Primary care or imaging center",
    intervalMonths: 24,
    reason: "USPSTF recommends biennial breast cancer screening for women age 40 to 74.",
    sourceLabel: "USPSTF Breast Cancer: Screening (April 30, 2024)",
    sourceUrl: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/breast-cancer-screening",
    matches: ({ age, sexAtBirth }) => sexAtBirth === "female" && age >= 40 && age <= 74,
  },
  {
    key: "cervical-cancer",
    title: "Cervical cancer screening discussion",
    specialty: "OB-GYN or primary care",
    intervalMonths: 36,
    reason: "USPSTF recommends cervical cancer screening for people age 21 to 65 with a cervix.",
    sourceLabel: "USPSTF Cervical Cancer: Screening (August 21, 2018)",
    sourceUrl:
      "https://www.uspreventiveservicestaskforce.org/uspstf/document/RecommendationStatementFinal/cervical-cancer-screening",
    matches: ({ age, hasCervix }) => hasCervix === "yes" && age >= 21 && age <= 65,
  },
  {
    key: "lung-cancer",
    title: "Lung cancer screening discussion",
    specialty: "Primary care or pulmonary",
    intervalMonths: 12,
    reason: "USPSTF recommends annual lung cancer screening for adults age 50 to 80 with a 20 pack-year history who currently smoke or quit within the last 15 years.",
    sourceLabel: "USPSTF Lung Cancer: Screening (March 9, 2021)",
    sourceUrl:
      "https://www.uspreventiveservicestaskforce.org/uspstf/document/RecommendationStatementFinal/lung-cancer-screening",
    matches: ({ age, smokingStatus, packYears, yearsSinceQuit }) =>
      age >= 50 &&
      age <= 80 &&
      packYears >= 20 &&
      (smokingStatus === "current" || (smokingStatus === "former" && yearsSinceQuit <= 15)),
  },
  {
    key: "osteoporosis",
    title: "Osteoporosis screening discussion",
    specialty: "Primary care or women's health",
    intervalMonths: 24,
    reason: "USPSTF recommends osteoporosis screening for women 65 and older and some postmenopausal women under 65 who are at increased risk.",
    sourceLabel: "USPSTF Osteoporosis to Prevent Fractures: Screening (January 14, 2025)",
    sourceUrl: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/osteoporosis-screening",
    matches: ({ age, sexAtBirth, postmenopausal }) =>
      sexAtBirth === "female" && (age >= 65 || (age < 65 && postmenopausal === "yes")),
  },
  {
    key: "adult-vaccines",
    title: "Adult vaccine review",
    specialty: "Primary care or pharmacy",
    intervalMonths: 12,
    reason: "CDC publishes age-based adult immunization schedules, including annual influenza vaccination and age-based updates.",
    sourceLabel: "CDC Adult Immunization Schedule by Age (October 7, 2025)",
    sourceUrl: "https://www.cdc.gov/vaccines/hcp/imz-schedules/adult-age.html",
    matches: ({ age }) => age >= 19,
  },
];

const INITIAL_CARE_PLAN = [
  {
    key: "vaccines-immunization-review",
    category: "Vaccines & Labs",
    name: "Vaccines / Immunization Review",
    summary: "Flu, Tdap, HPV, COVID, Hep A/B",
    frequency: "Review 1x per year",
    frequencyMonths: 12,
    lastCompletedDate: "2023-01-19",
    nextDueDate: "",
    nextDueLabel: "2026 PCP visit",
    provider: "VIMAL GEORGE / PCP",
    notes: "All immunizations were up to date on 01/19/2023. Review with adult PCP.",
  },
  {
    key: "labs-bloodwork-plan",
    category: "Vaccines & Labs",
    name: "Labs / Bloodwork",
    summary: "General health, iron, vitamin D, cholesterol",
    frequency: "1x per year or as needed",
    frequencyMonths: 12,
    lastCompletedDate: "2025-06-09",
    nextDueDate: "2026-06-01",
    provider: "PCP",
    notes: "Annual bloodwork. Include CBC, iron/ferritin, vitamin D, cholesterol if needed.",
  },
  {
    key: "obgyn-womens-health-plan",
    category: "Women's Health",
    name: "OB-GYN / Women's Health",
    summary: "Cycle health, pelvic care, IUD follow-up",
    frequency: "1x per year",
    frequencyMonths: 12,
    lastCompletedDate: "2026-03-18",
    nextDueDate: "2027-01-01",
    provider: "Dr. Souhail Asfouri, MD, FACOG",
    place: "Austin Southwest OB / GYN - 4316 James Casey St, Bldg. F, Ste 200, Austin, TX 78745",
    notes:
      "Liletta IUD placed 01/29/2026, effective 8 years. Past: Central Texas OB/GYN Associates, Mary Brown. Skyla inserted 03/28/2022, expired/displaced.",
  },
  {
    key: "sti-std-screening",
    category: "Sexual Health",
    name: "STI / STD Screening",
    summary: "Preventive sexual health screening",
    frequency: "1x per year if sexually active; every 3–6 months with new partners",
    frequencyMonths: 12,
    lastCompletedDate: "2026-03-18",
    scheduledDate: "2026-04-28",
    scheduledTime: "13:20",
    nextDueDate: "2026-04-28",
    provider: "Austin Public Health Sexual Health Clinic or Planned Parenthood",
    notes: "Positive chlamydia 02/03/2026, treated 02/04/2026–02/11/2026, follow-up in March 2026.",
  },
  {
    key: "dentist-care-plan",
    category: "Dental",
    name: "Dentist",
    summary: "Cleaning, cavity and gum check, X-rays",
    frequency: "Every 6 months",
    frequencyMonths: 6,
    lastCompletedDate: "2025-11-04",
    scheduledDate: "2026-05-05",
    scheduledTime: "08:00",
    nextDueDate: "2026-05-05",
    place: "Lone Star Pediatric Dental & Braces - Bee Cave, 14058 Bee Cave Pkwy building d suite b, Austin, TX 78738",
  },
  {
    key: "eye-exam-care-plan",
    category: "Vision",
    name: "Eye Exam",
    summary: "Vision check, eye strain, prescription update",
    frequency: "1x per year",
    frequencyMonths: 12,
    lastCompletedDate: "2026-02-27",
    nextDueDate: "2027-02-01",
    provider: "Dr. Amber Nelson",
    place: "Bristol Family Eyecare - Bee Cave",
  },
  {
    key: "dermatologist-care-plan",
    category: "Dermatology",
    name: "Dermatologist",
    summary: "Acne, rashes, moles, skin baseline",
    frequency: "As needed / optional yearly",
    frequencyMonths: null,
    isOptional: true,
    scheduledDate: "2026-04-28",
    scheduledTime: "14:10",
    provider: "Melinda Conroy, DO",
    place: "Westlake Dermatology & Cosmetic Surgery - Lakeway, 401 RR 620 South, Suite 200, Lakeway, TX 78734",
    notes: "Optional yearly skin baseline.",
  },
  {
    key: "mental-health-care-plan",
    category: "Mental Health",
    name: "Mental Health",
    summary: "Stress regulation, emotional health, and prevention",
    frequency: "2x/week",
    frequencyMonths: null,
    lastCompletedDate: "2026-02-27",
    nextDueDate: "2026-03-04",
    scheduledDate: "2026-03-04",
    scheduledTime: "20:00",
    provider: "Amanda Roberts; Marianne Nemri - Grow Therapy; Heidi Simpson - Headway",
    notes: "Last sessions: 02/27 Lisa, 02/24 Marianne, 02/23 Heidi. Heidi Simpson $30. Recovery code: 7EURUXDP49QSKNDJEALXSEFR",
  },
  {
    key: "medications-review-plan",
    category: "Medications",
    name: "Medications Review",
    summary: "Current meds, refills, side effects",
    frequency: "Review at every appointment",
    frequencyMonths: null,
    lastCompletedDate: "2025-06-09",
    nextDueLabel: "Next PCP visit",
    provider: "PCP",
    notes: "Review at each appointment.",
  },
  {
    key: "annual-health-reset",
    category: "Annual Reset",
    name: "Annual Health Reset",
    summary: "Book yearly appointments and update health info",
    frequency: "1x per year",
    frequencyMonths: 12,
    lastCompletedDate: "2025-06-01",
    nextDueLabel: "2026-01-01 to 2026-06-30",
    notes:
      "Review providers, insurance, vaccines, labs, dental, eye, OB-GYN, STI screening, dermatology, and mental health.",
  },
];

const state = loadState();

const appointmentForm = document.querySelector("#appointmentForm");
const appointmentFormTitle = document.querySelector("#appointmentFormTitle");
const appointmentCancelButton = document.querySelector("#appointmentCancelButton");
const appointmentList = document.querySelector("#appointmentList");
const dashboardAppointmentList = document.querySelector("#dashboardAppointmentList");
const reminderList = document.querySelector("#reminderList");
const dashboardStats = document.querySelector("#dashboardStats");
const insuranceForm = document.querySelector("#insuranceForm");
const insuranceSummary = document.querySelector("#insuranceSummary");
const heroReminderCount = document.querySelector("#heroReminderCount");
const heroProviderCount = document.querySelector("#heroProviderCount");
const homeReminderCount = document.querySelector("#homeReminderCount");
const homeProviderCount = document.querySelector("#homeProviderCount");
const quickAddButton = document.querySelector("#quickAddButton");
const dashboardAddAppointmentButton = document.querySelector("#dashboardAddAppointmentButton");
const dashboardAddVisitLogButton = document.querySelector("#dashboardAddVisitLogButton");
const dashboardViewCareTeamButton = document.querySelector("#dashboardViewCareTeamButton");
const dashboardInsuranceButton = document.querySelector("#dashboardInsuranceButton");
const notificationButton = document.querySelector("#notificationButton");
const suggestionPreview = document.querySelector("#suggestionPreview");
const reminderPreview = document.querySelector("#reminderPreview");
const profileForm = document.querySelector("#profileForm");
const recommendationList = document.querySelector("#recommendationList");
const providerSelect = document.querySelector("#providerSelect");
const specialtySelect = document.querySelector("#specialtySelect");
const reasonSelect = document.querySelector("#reasonSelect");
const repeatVisitToggle = document.querySelector("#repeatVisitToggle");
const repeatRuleGroup = document.querySelector("#repeatRuleGroup");
const appointmentSearchInput = document.querySelector("#appointmentSearchInput");
const appointmentStatusFilter = document.querySelector("#appointmentStatusFilter");
const appointmentSpecialtyFilter = document.querySelector("#appointmentSpecialtyFilter");
const appointmentProviderFilter = document.querySelector("#appointmentProviderFilter");
const recordTypeFilter = document.querySelector("#recordTypeFilter");
const recordSortSelect = document.querySelector("#recordSortSelect");
const visitsPanels = [...document.querySelectorAll("[data-visits-view]")];
const visitsAddAppointmentButton = document.querySelector("#visitsAddAppointmentButton");
const visitsLogVisitButton = document.querySelector("#visitsLogVisitButton");
const visitsSearchFilterButton = document.querySelector("#visitsSearchFilterButton");
const visitsFiltersPanel = document.querySelector("#visitsFiltersPanel");
const appointmentFormBack = document.querySelector("#appointmentFormBack");
const visitLogFormBack = document.querySelector("#visitLogFormBack");
const visitLogFollowUpHint = document.querySelector("#visitLogFollowUpHint");
const appointmentFollowUpHint = document.querySelector("#appointmentFollowUpHint");
const homeViewVisitsAction = document.querySelector("#homeViewVisitsAction");
const homeCareTeamAction = document.querySelector("#homeCareTeamAction");
const homeInsuranceAction = document.querySelector("#homeInsuranceAction");
const visitLogFormMount = document.querySelector("#visitLogFormMount");
const providerForm = document.querySelector("#providerForm");
const providerSpecialtySelect = document.querySelector("#providerSpecialtySelect");
const providerCustomSpecialtyLabel = document.querySelector("#providerCustomSpecialtyLabel");
const careTeamList = document.querySelector("#careTeamList");
const customProviderLabel = document.querySelector("#customProviderLabel");
const customSpecialtyLabel = document.querySelector("#customSpecialtyLabel");
const customReasonLabel = document.querySelector("#customReasonLabel");
const visitLogForm = document.querySelector("#visitLogForm");
const visitLogFormTitle = document.querySelector("#visitLogFormTitle");
const visitLogProviderSelect = document.querySelector("#visitLogProviderSelect");
const editProvidersButton = document.querySelector("#editProvidersButton");
const careTeamAddProviderButton = document.querySelector("#careTeamAddProviderButton");
const careTeamManageProvidersButton = document.querySelector("#careTeamManageProvidersButton");
const providerFormId = document.querySelector("#providerFormId");
const providerSubmitButton = document.querySelector("#providerSubmitButton");
const providerFormCancelButton = document.querySelector("#providerFormCancelButton");
const visitLogQuickTemplate = document.querySelector("#visitLogQuickTemplate");
const visitLogSpecialtySelect = document.querySelector("#visitLogSpecialtySelect");
const visitLogCustomSpecialtyLabel = document.querySelector("#visitLogCustomSpecialtyLabel");
const visitLogSaveAddAnotherButton = document.querySelector("#visitLogSaveAddAnotherButton");
const visitLogSaveFollowUpButton = document.querySelector("#visitLogSaveFollowUpButton");
const visitLogLastAppointmentInfo = document.querySelector("#visitLogLastAppointmentInfo");
const visitLogSubmitButton = document.querySelector("#visitLogSubmitButton");
const visitLogCancelButton = document.querySelector("#visitLogCancelButton");
const visitHistoryGlobalList = document.querySelector("#visitHistoryGlobalList");
const visitHistorySelectButton = document.querySelector("#visitHistorySelectButton");
const visitHistoryDeleteSelectedButton = document.querySelector("#visitHistoryDeleteSelectedButton");
const visitHistoryCancelSelectButton = document.querySelector("#visitHistoryCancelSelectButton");
const visitHistoryDeleteAllButton = document.querySelector("#visitHistoryDeleteAllButton");
const visitHistoryFilterButtons = [...document.querySelectorAll("[data-visit-history-filter]")];
const screenButtons = [...document.querySelectorAll("[data-screen-target]")];
const actionButtons = [...document.querySelectorAll("[data-action]")];
const screens = [...document.querySelectorAll("[data-screen]")];
const subtabButtons = [...document.querySelectorAll("[data-subtab-group][data-subtab-target]")];
const subviews = [...document.querySelectorAll("[data-subview-group][data-subview]")];
const exportBackupButton = document.querySelector("#exportBackupButton");
const importBackupButton = document.querySelector("#importBackupButton");
const importBackupInput = document.querySelector("#importBackupInput");
const homeAddAppointmentAction = document.querySelector("#homeAddAppointmentAction");
const homeLogVisitAction = document.querySelector("#homeLogVisitAction");
const homeTodayList = document.querySelector("#homeTodayList");
const homeUpcomingList = document.querySelector("#homeUpcomingList");
const homeOverdueList = document.querySelector("#homeOverdueList");
const homeRecentLogsList = document.querySelector("#homeRecentLogsList");
const homeOverdueCount = document.querySelector("#homeOverdueCount");
const homeScheduledCount = document.querySelector("#homeScheduledCount");
const recordViewButtons = [...document.querySelectorAll("[data-record-view]")];
const visitTimelineContainer = document.querySelector("#visitTimelineContainer");
const visitTimelineList = document.querySelector("#visitTimelineList");
const carePlanList = document.querySelector("#carePlanList");
const carePlanSearchInput = document.querySelector("#carePlanSearchInput");
const carePlanFilterButtons = [...document.querySelectorAll("[data-care-plan-filter]")];
const carePlanPanels = [...document.querySelectorAll("[data-care-plan-view]")];
const carePlanForm = document.querySelector("#carePlanForm");
const carePlanFormTitle = document.querySelector("#carePlanFormTitle");
const carePlanFormBack = document.querySelector("#carePlanFormBack");
const carePlanAddItemButton = document.querySelector("#carePlanAddItemButton");
const carePlanSubmitButton = document.querySelector("#carePlanSubmitButton");
const carePlanCancelButton = document.querySelector("#carePlanCancelButton");
const carePlanNextDueHint = document.querySelector("#carePlanNextDueHint");
const carePlanProviderSelect = document.querySelector("#carePlanProviderSelect");
const carePlanDeleteButton = document.querySelector("#carePlanDeleteButton");
const homeCarePlanAction = document.querySelector("#homeCarePlanAction");

let editingAppointmentId = "";
let activeRecordView = "list";
let editingVisitLogId = "";
let visitLogSaveInProgress = false;
let editingVisitHistory = [];
let inlineEditingVisitLogId = "";
let activeAddEditMode = "appointment";
let visitHistorySelectMode = false;
let selectedRecordIds = new Set();
let activeVisitHistoryFilter = "all";
let activeVisitsView = "list";
let activeSubtabs = {
  dashboard: "overview",
};
let editingProviderId = "";
let pendingProviderSelection = null;
let activeCarePlanFilter = "all";
let editingCarePlanId = "";
let pendingCarePlanItemId = "";

function on(element, eventName, handler) {
  if (element) element.addEventListener(eventName, handler);
}

function onAll(elements, eventName, handlerFactory) {
  elements.forEach((element) => {
    if (element) element.addEventListener(eventName, handlerFactory(element));
  });
}

bindEvents();
migrateProvidersInPlace();
mergeInitialAppointmentLogs();
mergeInitialCarePlan();
syncForms();
showVisitsList();
render();
renderVisitHistoryGlobalList();
maybeSendBrowserNotifications();

function bindEvents() {
  on(appointmentForm, "submit", handleAppointmentSubmit);
  on(insuranceForm, "submit", handleInsuranceSubmit);
  on(profileForm, "submit", handleProfileSubmit);
  on(providerForm, "submit", handleProviderSubmit);
  on(visitLogForm, "submit", handleVisitLogSubmit);
  on(visitLogForm, "click", handleVisitLogFormClick);
  on(visitLogForm, "click", handleVisitLogFollowUpShortcutClick);
  on(appointmentForm, "click", handleAppointmentFollowUpShortcutClick);
  if (visitLogForm?.elements.date) {
    on(visitLogForm.elements.date, "change", () => syncFollowUpShortcutButtons(visitLogForm, "follow-up"));
  }
  if (appointmentForm?.elements.appointmentDate) {
    on(appointmentForm.elements.appointmentDate, "change", () => {
      syncAppointmentPreview();
      syncFollowUpShortcutButtons(appointmentForm, "next-visit");
    });
  }
  on(visitLogQuickTemplate, "change", handleVisitLogTemplateChange);
  on(visitLogSaveAddAnotherButton, "click", () => saveVisitLog({ addAnother: true }));
  if (visitLogSaveFollowUpButton) {
    on(visitLogSaveFollowUpButton, "click", () => saveVisitLog({ addAnother: false, scheduleFollowUp: true }));
  }
  on(appointmentCancelButton, "click", () => {
    pendingCarePlanItemId = "";
    resetAppointmentForm();
    showVisitsList();
  });
  on(visitLogCancelButton, "click", () => {
    pendingCarePlanItemId = "";
    resetVisitLogForm();
    showVisitsList();
  });
  on(appointmentList, "click", handleAppointmentListClick);
  on(appointmentList, "submit", handleInlineVisitLogSubmit);
  on(dashboardAppointmentList, "click", handleAppointmentListClick);
  on(careTeamList, "click", handleCareTeamClick);
  on(recommendationList, "click", handleRecommendationListClick);
  on(visitHistoryGlobalList, "click", handleVisitHistoryEditorClick);
  on(visitHistoryGlobalList, "submit", handleInlineVisitLogSubmit);
  on(visitHistorySelectButton, "click", enableVisitHistorySelectMode);
  on(visitHistoryDeleteSelectedButton, "click", deleteSelectedRecords);
  on(visitHistoryCancelSelectButton, "click", cancelVisitHistorySelectMode);
  on(visitHistoryDeleteAllButton, "click", deleteAllVisitLogs);
  visitHistoryFilterButtons.forEach((button) => {
    if (button) button.addEventListener("click", () => {
      activeVisitHistoryFilter = button.dataset.visitHistoryFilter;
      selectedRecordIds.clear();
      render();
    });
  });
  on(appointmentSearchInput, "input", render);
  on(appointmentStatusFilter, "change", render);
  on(appointmentSpecialtyFilter, "change", render);
  on(appointmentProviderFilter, "change", render);
  on(recordTypeFilter, "change", render);
  on(recordSortSelect, "change", render);
  if (visitsAddAppointmentButton) {
    on(visitsAddAppointmentButton, "click", openAppointmentForm);
  }
  if (visitsLogVisitButton) {
    on(visitsLogVisitButton, "click", () => openVisitLogTab("", true));
  }
  if (visitsSearchFilterButton) {
    on(visitsSearchFilterButton, "click", focusVisitsSearchAndFilters);
  }
  if (appointmentFormBack) {
    on(appointmentFormBack, "click", () => {
      pendingCarePlanItemId = "";
      resetAppointmentForm();
      showVisitsList();
    });
  }
  if (visitLogFormBack) {
    on(visitLogFormBack, "click", () => {
      pendingCarePlanItemId = "";
      resetVisitLogForm();
      showVisitsList();
    });
  }
  if (exportBackupButton) {
    on(exportBackupButton, "click", exportBackup);
  }
  if (importBackupButton) {
    on(importBackupButton, "click", () => importBackupInput?.click());
  }
  if (importBackupInput) {
    on(importBackupInput, "change", handleImportBackupFile);
  }
  if (homeAddAppointmentAction) {
    on(homeAddAppointmentAction, "click", openAppointmentForm);
  }
  if (homeLogVisitAction) {
    on(homeLogVisitAction, "click", () => openVisitLogTab("", true));
  }
  if (homeViewVisitsAction) {
    on(homeViewVisitsAction, "click", () => {
      switchScreen("appointments");
      showVisitsList();
    });
  }
  if (homeCareTeamAction) {
    on(homeCareTeamAction, "click", () => openCareTeamProviders({ scrollToList: true }));
  }
  if (editProvidersButton) {
    on(editProvidersButton, "click", () => openCareTeamProviders({ scrollToList: true }));
  }
  if (careTeamAddProviderButton) {
    on(careTeamAddProviderButton, "click", () => openCareTeamProviders({ focusForm: true }));
  }
  if (careTeamManageProvidersButton) {
    on(careTeamManageProvidersButton, "click", () => openCareTeamProviders({ scrollToList: true }));
  }
  if (providerFormCancelButton) {
    on(providerFormCancelButton, "click", resetProviderForm);
  }
  if (homeInsuranceAction) {
    on(homeInsuranceAction, "click", () => switchScreen("insurance"));
  }
  if (homeCarePlanAction) {
    on(homeCarePlanAction, "click", () => switchScreen("care-plan"));
  }
  if (carePlanAddItemButton) {
    on(carePlanAddItemButton, "click", () => openCarePlanForm());
  }
  if (carePlanFormBack) {
    on(carePlanFormBack, "click", showCarePlanList);
  }
  if (carePlanCancelButton) {
    on(carePlanCancelButton, "click", showCarePlanList);
  }
  if (carePlanForm) {
    on(carePlanForm, "submit", handleCarePlanSubmit);
    on(carePlanForm, "click", handleCarePlanDueShortcutClick);
    if (carePlanForm.elements.lastCompletedDate) {
      on(carePlanForm.elements.lastCompletedDate, "change", () => syncCarePlanDueShortcutButtons());
    }
  }
  if (carePlanProviderSelect) {
    on(carePlanProviderSelect, "change", handleCarePlanProviderSelectChange);
  }
  if (carePlanDeleteButton) {
    on(carePlanDeleteButton, "click", () => {
      if (editingCarePlanId) {
        deleteCarePlanItem(editingCarePlanId);
      }
    });
  }
  if (carePlanList) {
    on(carePlanList, "click", handleCarePlanListClick);
  }
  if (carePlanSearchInput) {
    on(carePlanSearchInput, "input", render);
  }
  carePlanFilterButtons.forEach((button) => {
    if (button) {
      button.addEventListener("click", () => {
        activeCarePlanFilter = button.dataset.carePlanFilter || "all";
        carePlanFilterButtons.forEach((item) => {
          item.classList.toggle("is-active", item === button);
        });
        render();
      });
    }
  });
  recordViewButtons.forEach((button) => {
    if (button) button.addEventListener("click", () => setRecordView(button.dataset.recordView));
  });
  on(quickAddButton, "click", () => {
    openAppointmentForm();
  });
  on(dashboardAddAppointmentButton, "click", openAppointmentForm);
  on(dashboardAddVisitLogButton, "click", () => openVisitLogTab(editingAppointmentId || ""));
  on(dashboardViewCareTeamButton, "click", () => openCareTeamProviders({ scrollToList: true }));
  on(dashboardInsuranceButton, "click", () => switchScreen("insurance"));
  on(notificationButton, "click", requestNotificationPermission);
  screenButtons.forEach((button) => {
    if (button) button.addEventListener("click", () => switchScreen(button.dataset.screenTarget));
  });
  actionButtons.forEach((button) => {
    if (button && button.dataset.action === "add") {
      on(button, "click", openAppointmentForm);
    }
  });
  subtabButtons.forEach((button) => {
    if (button) button.addEventListener("click", () => setSubtab(button.dataset.subtabGroup, button.dataset.subtabTarget));
  });

  document.body.addEventListener("click", (event) => {
    const targetButton = event.target.closest("[data-screen-target]");
    if (targetButton) {
      event.preventDefault();
      switchScreen(targetButton.dataset.screenTarget);
      return;
    }

    const actionButton = event.target.closest("[data-action=add]");
    if (actionButton) {
      event.preventDefault();
      openAppointmentForm();
      return;
    }

    const subtabButton = event.target.closest("[data-subtab-group][data-subtab-target]");
    if (subtabButton) {
      event.preventDefault();
      setSubtab(subtabButton.dataset.subtabGroup, subtabButton.dataset.subtabTarget);
    }
  });
  on(providerSelect, "change", handleAppointmentProviderSelectChange);
  on(specialtySelect, "change", syncCustomFieldVisibility);
  on(reasonSelect, "change", syncCustomFieldVisibility);
  on(providerSpecialtySelect, "change", syncProviderCustomSpecialtyVisibility);
  on(visitLogProviderSelect, "change", syncVisitLogProviderSelection);
  on(visitLogSpecialtySelect, "change", syncVisitLogCustomSpecialtyVisibility);
  if (repeatVisitToggle) {
    on(repeatVisitToggle, "change", () => {
      syncRepeatRuleVisibility();
      syncAppointmentPreview();
    });
  }
  ["appointmentDate", "nextRecommendedVisit", "intervalMonths", "reminderDaysBefore"].forEach((fieldName) => {
    if (appointmentForm?.elements[fieldName]) {
      appointmentForm.elements[fieldName].addEventListener("input", syncAppointmentPreview);
    }
  });
}

function showVisitsView(view) {
  activeVisitsView = view;
  visitsPanels.forEach((panel) => {
    panel.classList.toggle("is-hidden", panel.dataset.visitsView !== view);
    panel.classList.toggle("is-active", panel.dataset.visitsView === view);
  });
}

function showVisitsList() {
  showVisitsView("list");
  setAddEditMode("none");
}

function focusVisitsSearchAndFilters() {
  switchScreen("appointments");
  showVisitsList();
  if (visitsFiltersPanel) {
    visitsFiltersPanel.open = true;
  }
  if (appointmentSearchInput) {
    appointmentSearchInput.focus();
    appointmentSearchInput.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function openAppointmentForm() {
  pendingCarePlanItemId = "";
  switchScreen("appointments");
  showVisitsView("appointment-form");
  setAddEditMode("appointment");
  resetAppointmentForm();
  renderAllProviderDropdowns();
}

function openVisitLogTab(appointmentId = "", setToday = false) {
  pendingCarePlanItemId = "";
  switchScreen("appointments");
  showVisitsView("visit-log-form");
  setAddEditMode("visit-log");
  renderAllProviderDropdowns();
  if (appointmentId) {
    prefillVisitLogForm(appointmentId);
    if (setToday && !visitLogForm.elements.date.value) {
      visitLogForm.elements.date.value = todayString();
    }
  } else {
    resetVisitLogForm();
  }
}

function setAddEditMode(mode) {
  activeAddEditMode = mode;
}

function setSubtab(group, target) {
  activeSubtabs[group] = target;
  subtabButtons.forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.subtabGroup === group && button.dataset.subtabTarget === target
    );
  });
  subviews.forEach((view) => {
    if (view.dataset.subviewGroup === group) {
      view.classList.toggle("is-active", view.dataset.subview === target);
    }
  });

}

function handleAppointmentSubmit(event) {
  event.preventDefault();
  const formData = new FormData(appointmentForm);
  const clinicValue = cleanText(formData.get("clinic"));
  const placeValue = cleanText(formData.get("place"));
  const existingAppointment = state.appointments.find(
    (item) => item.id === cleanText(formData.get("appointmentId"))
  );
  const resultFiles = appointmentForm.elements.resultFiles?.files
    ? Array.from(appointmentForm.elements.resultFiles.files).map((file) => file.name)
    : [];
  const appointment = {
    id: cleanText(formData.get("appointmentId")) || crypto.randomUUID(),
    doctor: resolveAppointmentDoctorValue(cleanText(formData.get("doctor")), cleanText(formData.get("customDoctor"))),
    specialty:
      cleanText(formData.get("specialty")) === "__custom__"
        ? cleanText(formData.get("customSpecialty"))
        : cleanText(formData.get("specialty")),
    clinic: clinicValue || extractClinicName(placeValue),
    place: placeValue,
    insuranceAccepted: cleanText(formData.get("insuranceAccepted")),
    portalLink: cleanText(formData.get("portalLink")),
    appointmentDate: cleanText(formData.get("appointmentDate")),
    appointmentTime: cleanText(formData.get("appointmentTime")),
    appointmentStatus: cleanText(formData.get("appointmentStatus")) || "Planned",
    nextRecommendedVisit: cleanText(formData.get("nextRecommendedVisit")),
    intervalMonths:
      formData.get("repeatVisit") === "on"
        ? numberOrFallback(formData.get("intervalMonths"), 1)
        : null,
    reminderDaysBefore: numberOrFallback(formData.get("reminderDaysBefore"), 0),
    reminderEnabled: cleanText(formData.get("reminderEnabled")) !== "no",
    contactPhone: cleanText(formData.get("contactPhone")),
    reasonForVisit:
      cleanText(formData.get("reasonForVisit")) === "__custom__"
        ? cleanText(formData.get("customReasonForVisit"))
        : cleanText(formData.get("reasonForVisit")),
    questionsToAsk: cleanText(formData.get("questionsToAsk")),
    medications: cleanText(formData.get("medications")),
    testResults: cleanText(formData.get("testResults")),
    resultFiles: resultFiles.length ? resultFiles : existingAppointment?.resultFiles || [],
    visitHistory: [],
    notes: cleanText(formData.get("notes")),
    userCreated: true,
    autoGeneratedFromVisitLog: false,
    updatedAt: new Date().toISOString(),
  };

  if (!appointment.doctor) {
    return;
  }

  const existingIndex = state.appointments.findIndex((item) => item.id === appointment.id);
  if (existingIndex >= 0) {
    state.appointments[existingIndex] = {
      ...state.appointments[existingIndex],
      ...appointment,
      userCreated: true,
      autoGeneratedFromVisitLog: false,
    };
  } else {
    state.appointments.unshift({ ...appointment, createdAt: new Date().toISOString(), userCreated: true });
  }

  persist();
  if (pendingCarePlanItemId) {
    applyCarePlanAppointmentScheduled(pendingCarePlanItemId, appointment);
    pendingCarePlanItemId = "";
  }
  resetAppointmentForm();
  render();
  showVisitsList();
}

function handleInsuranceSubmit(event) {
  event.preventDefault();
  const formData = new FormData(insuranceForm);
  state.insurance = {
    provider: cleanText(formData.get("provider")),
    planName: cleanText(formData.get("planName")),
    memberId: cleanText(formData.get("memberId")),
    groupNumber: cleanText(formData.get("groupNumber")),
    copay: cleanText(formData.get("copay")),
    phone: cleanText(formData.get("phone")),
    notes: cleanText(formData.get("notes")),
    updatedAt: new Date().toISOString(),
  };
  persist();
  renderInsuranceSummary();
}

function handleProfileSubmit(event) {
  event.preventDefault();
  const formData = new FormData(profileForm);
  state.profile = {
    birthDate: cleanText(formData.get("birthDate")),
    sexAtBirth: cleanText(formData.get("sexAtBirth")),
    hasCervix: cleanText(formData.get("hasCervix")),
    postmenopausal: cleanText(formData.get("postmenopausal")),
    smokingStatus: cleanText(formData.get("smokingStatus")),
    packYears: numberOrFallback(formData.get("packYears"), 0),
    yearsSinceQuit: numberOrFallback(formData.get("yearsSinceQuit"), 0),
    hasOverweightOrObesity: cleanText(formData.get("hasOverweightOrObesity")),
    updatedAt: new Date().toISOString(),
  };
  persist();
  render();
}

function handleProviderSubmit(event) {
  event.preventDefault();
  const formData = new FormData(providerForm);
  const doctor = cleanText(formData.get("doctor"));
  const clinic = cleanText(formData.get("clinic"));
  const rawSpecialty = cleanText(formData.get("specialty"));
  const specialty = rawSpecialty === "__custom__" ? cleanText(formData.get("customSpecialty")) || "General" : rawSpecialty || "General";

  if (!doctor) {
    return;
  }

  const providerKey = normalizeLookupKey(`${doctor}|${specialty}|${clinic || "unspecified"}`);
  const savedProviderId = cleanText(formData.get("providerId"));
  const existingIndex = savedProviderId
    ? state.providers.findIndex((provider) => provider.id === savedProviderId)
    : state.providers.findIndex((provider) => provider.key === providerKey);

  const providerRecord = normalizeProvider({
    id: existingIndex >= 0 ? state.providers[existingIndex].id : crypto.randomUUID(),
    key: providerKey,
    doctor,
    name: doctor,
    specialty,
    clinic: clinic || "",
    address: cleanText(formData.get("place")),
    phone: cleanText(formData.get("contactPhone")),
    insuranceAccepted: cleanText(formData.get("insuranceAccepted")),
    portalLink: cleanText(formData.get("portalLink")),
    notes: cleanText(formData.get("notes")),
    createdAt: existingIndex >= 0 ? state.providers[existingIndex].createdAt || new Date().toISOString() : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  if (!providerRecord) {
    return;
  }

  if (existingIndex >= 0) {
    state.providers[existingIndex] = providerRecord;
  } else {
    state.providers.push(providerRecord);
  }

  persist();
  resetProviderForm();
  renderAllProviderDropdowns();
  render();
  const hadPendingSelection = Boolean(pendingProviderSelection);
  applyPendingProviderSelection(providerRecord);
  if (!hadPendingSelection) {
    openCareTeamProviders({ scrollToList: true });
  }
}

function syncProviderCustomSpecialtyVisibility() {
  providerCustomSpecialtyLabel.classList.toggle("is-hidden", providerSpecialtySelect.value !== "__custom__");
}

function openCareTeamProviders({ focusForm = false, scrollToList = false } = {}) {
  switchScreen("care-team");
  renderCareTeam();
  requestAnimationFrame(() => {
    if (scrollToList && careTeamList) {
      careTeamList.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (focusForm && providerForm) {
      providerForm.scrollIntoView({ behavior: "smooth", block: "start" });
      providerForm.elements.doctor?.focus();
    }
  });
}

function openCareTeamForNewProvider(target) {
  pendingProviderSelection = { target };
  resetProviderForm();
  openCareTeamProviders({ focusForm: true });
}

function resetProviderForm() {
  editingProviderId = "";
  providerForm.reset();
  if (providerFormId) {
    providerFormId.value = "";
  }
  if (providerSubmitButton) {
    providerSubmitButton.textContent = "Add Provider";
  }
  if (providerFormCancelButton) {
    providerFormCancelButton.classList.add("is-hidden");
  }
  syncProviderCustomSpecialtyVisibility();
}

function loadProviderIntoForm(provider) {
  editingProviderId = provider.id;
  if (providerFormId) {
    providerFormId.value = provider.id;
  }
  providerForm.elements.doctor.value = getProviderRecordName(provider);
  providerForm.elements.clinic.value = provider.clinic || "";
  providerForm.elements.place.value = provider.address || "";
  providerForm.elements.contactPhone.value = provider.phone || "";
  providerForm.elements.insuranceAccepted.value = provider.insuranceAccepted || "";
  providerForm.elements.portalLink.value = provider.portalLink || "";
  if (providerForm.elements.notes) {
    providerForm.elements.notes.value = provider.notes || "";
  }
  setSelectWithCustomValue(providerSpecialtySelect, providerForm.elements.customSpecialty, provider.specialty || "");
  syncProviderCustomSpecialtyVisibility();
  if (providerSubmitButton) {
    providerSubmitButton.textContent = "Save Provider";
  }
  if (providerFormCancelButton) {
    providerFormCancelButton.classList.remove("is-hidden");
  }
}

function applyPendingProviderSelection(providerRecord) {
  if (!pendingProviderSelection || !providerRecord) {
    return;
  }

  const { target, carePlanId } = pendingProviderSelection;
  pendingProviderSelection = null;
  renderAllProviderDropdowns();

  if (target === "appointment") {
    providerSelect.value = `${PROVIDER_OPTION_PREFIX}${providerRecord.id}`;
    syncAppointmentProviderDetails();
    syncCustomFieldVisibility();
    switchScreen("appointments");
    showVisitsView("appointment-form");
    return;
  }

  if (target === "visitLog") {
    visitLogProviderSelect.value = `${PROVIDER_OPTION_PREFIX}${providerRecord.id}`;
    syncVisitLogProviderSelection();
    switchScreen("appointments");
    showVisitsView("visit-log-form");
    return;
  }

  if (target === "carePlan") {
    const carePlanItem = carePlanId ? state.carePlan.find((entry) => entry.id === carePlanId) : null;
    switchScreen("care-plan");
    showCarePlanView("form");
    renderCarePlanProviderSelect(carePlanItem);
    if (carePlanProviderSelect) {
      carePlanProviderSelect.value = `${PROVIDER_OPTION_PREFIX}${providerRecord.id}`;
      carePlanProviderSelect.dataset.lastValue = carePlanProviderSelect.value;
    }
  }
}

function handleAppointmentProviderSelectChange() {
  if (providerSelect.value === NEW_PROVIDER_OPTION) {
    providerSelect.value = "";
    openCareTeamForNewProvider("appointment");
    return;
  }
  syncAppointmentProviderDetails();
  syncCustomFieldVisibility();
}

function syncAppointmentProviderDetails() {
  const provider = getProviderFromSelectValue(providerSelect.value);
  if (!provider) {
    return;
  }

  setSelectWithCustomValue(specialtySelect, appointmentForm.elements.customSpecialty, provider.specialty || "");
  appointmentForm.elements.clinic.value = provider.clinic || "";
  appointmentForm.elements.place.value = provider.address || "";
  appointmentForm.elements.contactPhone.value = provider.phone || "";
  appointmentForm.elements.insuranceAccepted.value = provider.insuranceAccepted || "";
  appointmentForm.elements.portalLink.value = provider.portalLink || "";
  syncCustomFieldVisibility();
}

function getProviderRecordName(provider) {
  if (!provider) {
    return "";
  }
  return (
    cleanText(provider.name) ||
    cleanText(provider.doctor) ||
    cleanText(provider.provider) ||
    cleanText(provider.providerName)
  );
}

function findCareTeamProviderByDoctor(doctor) {
  const doctorKey = normalizeLookupKey(doctor);
  return getAllProviders().find((provider) => normalizeLookupKey(getProviderRecordName(provider)) === doctorKey);
}

function formatProviderDropdownLabel(name, specialty) {
  const providerName = cleanText(name) || "Unknown provider";
  const detail = cleanText(specialty);
  return detail ? `${providerName} • ${detail}` : providerName;
}

function getAllProviders() {
  return (state.providers || [])
    .map((provider) => normalizeProvider(provider) || provider)
    .filter((provider) => getProviderRecordName(provider))
    .sort((a, b) =>
      getProviderRecordName(a).localeCompare(getProviderRecordName(b), undefined, { sensitivity: "base" })
    );
}

function getCareTeamProviders() {
  return getAllProviders();
}

function migrateProvidersInPlace() {
  const previousSnapshot = JSON.stringify(state.providers || []);
  state.providers = (state.providers || []).map(normalizeProvider).filter(Boolean);
  if (JSON.stringify(state.providers) !== previousSnapshot) {
    persist();
  }
}

function getProviderFromSelectValue(value) {
  const selection = cleanText(value);
  if (!selection || selection === "__custom__" || selection === NEW_PROVIDER_OPTION) {
    return null;
  }
  if (selection.startsWith(PROVIDER_OPTION_PREFIX)) {
    return getAllProviders().find((provider) => provider.id === selection.slice(PROVIDER_OPTION_PREFIX.length)) || null;
  }
  return findCareTeamProviderByDoctor(selection);
}

function resolveAppointmentDoctorValue(rawDoctorValue, customDoctorValue) {
  if (rawDoctorValue === "__custom__") {
    return cleanText(customDoctorValue);
  }
  const provider = getProviderFromSelectValue(rawDoctorValue);
  if (provider) {
    return getProviderRecordName(provider);
  }
  return cleanText(rawDoctorValue);
}

function buildCareTeamProviderSelectOptions({
  placeholder = "Select provider",
  includeCustom = false,
} = {}) {
  const lines = [`<option value="">${escapeHtml(placeholder)}</option>`];

  getAllProviders().forEach((provider) => {
    lines.push(
      `<option value="${PROVIDER_OPTION_PREFIX}${escapeHtml(provider.id)}">${escapeHtml(
        formatProviderDropdownLabel(getProviderRecordName(provider), provider.specialty)
      )}</option>`
    );
  });

  lines.push(`<option value="${NEW_PROVIDER_OPTION}">+ Add new provider</option>`);
  if (includeCustom) {
    lines.push(`<option value="__custom__">Custom provider name</option>`);
  }
  return lines.join("");
}

function providerMatchesAppointment(provider, appointment) {
  return (
    normalizeLookupKey(getProviderRecordName(provider)) === normalizeLookupKey(appointment.doctor) &&
    normalizeLookupKey(provider.specialty || "") === normalizeLookupKey(appointment.specialty || "") &&
    normalizeLookupKey(provider.clinic || "") ===
      normalizeLookupKey(appointment.clinic || extractClinicName(appointment.place) || "")
  );
}

function getVisitLogSelectValueForAppointment(appointmentId) {
  const appointment = getDisplayableAppointments().find((item) => item.id === appointmentId);
  if (!appointment) {
    const linkedLog = state.visitLogs.find((log) => log.linkedAppointmentId === appointmentId);
    if (linkedLog?.providerId) {
      return `${PROVIDER_OPTION_PREFIX}${linkedLog.providerId}`;
    }
    return appointmentId;
  }
  const provider = getAllProviders().find((item) => providerMatchesAppointment(item, appointment));
  return provider ? `${PROVIDER_OPTION_PREFIX}${provider.id}` : appointmentId;
}

function getDisplayableAppointments() {
  return state.appointments.filter((appointment) => !shouldHideAutoGeneratedAppointment(appointment, state.visitLogs));
}

function getVisitLogProviderContext(selection) {
  const value = cleanText(selection);
  if (!value) {
    return null;
  }

  if (value.startsWith(PROVIDER_OPTION_PREFIX)) {
    const provider = getAllProviders().find((item) => item.id === value.slice(PROVIDER_OPTION_PREFIX.length));
    if (!provider) {
      return null;
    }
    return {
      providerId: provider.id,
      linkedAppointmentId: "",
      provider: getProviderRecordName(provider),
      specialty: provider.specialty,
      clinic: provider.clinic,
      phone: provider.phone,
      portalLink: provider.portalLink,
      insuranceAccepted: provider.insuranceAccepted,
    };
  }

  const appointment = state.appointments.find((item) => item.id === value);
  if (!appointment) {
    return null;
  }

  const careProvider = findCareTeamProviderByDoctor(appointment.doctor);
  return {
    providerId: careProvider?.id || "",
    linkedAppointmentId: shouldHideAutoGeneratedAppointment(appointment, state.visitLogs) ? "" : appointment.id,
    provider: appointment.doctor,
    specialty: appointment.specialty,
    clinic: appointment.clinic || extractClinicName(appointment.place),
    phone: appointment.contactPhone,
    portalLink: appointment.portalLink,
    insuranceAccepted: appointment.insuranceAccepted,
  };
}

function deleteProviderVisitLogs(provider) {
  const providerKey = normalizeLookupKey(getProviderRecordName(provider));
  const idsToDelete = getAllVisitHistoryEntries()
    .filter((entry) => normalizeLookupKey(entry.provider) === providerKey)
    .map((entry) => entry.id);

  if (!idsToDelete.length) {
    window.alert(`No visit logs found for ${getProviderRecordName(provider)}.`);
    return;
  }

  const confirmed = window.confirm(
    `Delete ${idsToDelete.length} visit log(s) for ${getProviderRecordName(provider)}? Appointments and the provider record will stay.`
  );
  if (!confirmed) {
    return;
  }

  deleteRecordsByIds(idsToDelete);
}

function handleAppointmentListClick(event) {
  const selectedCheckbox = event.target.closest("[data-select-record]");
  const logVisitId = event.target.closest("[data-log-visit]")?.dataset.logVisit;
  const editId = event.target.closest("[data-edit-appointment]")?.dataset.editAppointment;
  const deleteId = event.target.closest("[data-delete-appointment]")?.dataset.deleteAppointment;
  const editVisitLogButton = event.target.closest("[data-edit-visit-log]");
  const editVisitLogId = editVisitLogButton?.dataset.editVisitLog;
  const editVisitLogAppointmentId = editVisitLogButton?.dataset.appointmentId;

  if (selectedCheckbox) {
    if (selectedCheckbox.checked) {
      selectedRecordIds.add(selectedCheckbox.dataset.selectRecord);
    } else {
      selectedRecordIds.delete(selectedCheckbox.dataset.selectRecord);
    }
    renderVisitHistoryControls();
    return;
  }

  if (logVisitId) {
    openVisitLogTab(logVisitId, true);
    return;
  }

  if (editId) {
    switchScreen("appointments");
    showVisitsView("appointment-form");
    setAddEditMode("appointment");
    loadAppointmentIntoForm(editId);
    return;
  }

  if (editVisitLogId) {
    switchScreen("appointments");
    showVisitsView("visit-log-form");
    setAddEditMode("visit-log");
    loadVisitLogIntoEditor(editVisitLogId);
    return;
  }

  const viewAllHistoryAppointmentId = event.target.closest("[data-view-all-history]")?.dataset.viewAllHistory;
  if (viewAllHistoryAppointmentId) {
    openProviderVisitLogsInRecords(viewAllHistoryAppointmentId);
    return;
  }

  if (deleteId) {
    const appointmentToDelete = state.appointments.find((item) => item.id === deleteId);
    if (appointmentToDelete) {
      addDeletedSeedKey(appointmentToDelete);
    }
    state.appointments = state.appointments.filter((item) => item.id !== deleteId);
    persist();
    if (editingAppointmentId === deleteId) {
      resetAppointmentForm();
    }
    render();
    return;
  }

  handleVisitHistoryEditorClick(event);
}

function handleCareTeamClick(event) {
  const providerEditId = event.target.closest("[data-edit-provider]")?.dataset.editProvider;
  const providerDeleteId = event.target.closest("[data-delete-provider]")?.dataset.deleteProvider;
  const providerDeleteLogsId = event.target.closest("[data-delete-provider-logs]")?.dataset.deleteProviderLogs;

  if (providerEditId) {
    const provider = (state.providers || []).find((item) => item.id === providerEditId);
    if (!provider) {
      return;
    }
    loadProviderIntoForm(provider);
    openCareTeamProviders({ focusForm: true });
    return;
  }

  if (providerDeleteId) {
    const provider = (state.providers || []).find((item) => item.id === providerDeleteId);
    if (!provider) {
      return;
    }
    const confirmed = window.confirm(
      `Remove ${getProviderRecordName(provider)} from your care team? Appointments and visit logs will stay saved.`
    );
    if (!confirmed) {
      return;
    }
    state.providers = (state.providers || []).filter((item) => item.id !== providerDeleteId);
    if (editingProviderId === providerDeleteId) {
      resetProviderForm();
    }
    persist();
    render();
    return;
  }

  if (providerDeleteLogsId) {
    const provider = (state.providers || []).find((item) => item.id === providerDeleteLogsId);
    if (!provider) {
      return;
    }
    deleteProviderVisitLogs(provider);
  }
}

function handleRecommendationListClick(event) {
  const recommendationKey = event.target.closest("[data-use-recommendation]")?.dataset.useRecommendation;
  if (!recommendationKey) {
    return;
  }

  const recommendation = RECOMMENDATION_LIBRARY.find((item) => item.key === recommendationKey);
  if (!recommendation) {
    return;
  }

  resetAppointmentForm();
  setAddEditMode("appointment");
  setSelectWithCustomValue(specialtySelect, appointmentForm.elements.customSpecialty, recommendation.specialty);
  setSelectWithCustomValue(reasonSelect, appointmentForm.elements.customReasonForVisit, recommendation.title);
  appointmentForm.elements.repeatVisit.checked = true;
  appointmentForm.elements.intervalMonths.value = recommendation.intervalMonths;
  appointmentForm.elements.reminderDaysBefore.value = 14;
  appointmentForm.elements.notes.value = `${recommendation.reason}\nSource: ${recommendation.sourceLabel}`;
  syncRepeatRuleVisibility();
  syncCustomFieldVisibility();
  syncAppointmentPreview();
  switchScreen("appointments");
  showVisitsView("appointment-form");
}

function handleVisitLogSubmit(event) {
  event.preventDefault();
  saveVisitLog();
}

function handleVisitHistoryEditorClick(event) {
  const selectedCheckbox = event.target.closest("[data-select-record]");
  const editId = event.target.closest("[data-edit-visit-log]")?.dataset.editVisitLog;
  const cancelInlineEditId = event.target.closest("[data-cancel-inline-visit-log]")?.dataset.cancelInlineVisitLog;
  const deleteInlineEditId = event.target.closest("[data-delete-inline-visit-log]")?.dataset.deleteInlineVisitLog;
  const deleteId = event.target.closest("[data-delete-visit-log]")?.dataset.deleteVisitLog;
  const deleteProviderId = event.target.closest("[data-delete-provider-visit-logs]")?.dataset.deleteProviderVisitLogs;

  if (selectedCheckbox) {
    if (selectedCheckbox.checked) {
      selectedRecordIds.add(selectedCheckbox.dataset.selectRecord);
    } else {
      selectedRecordIds.delete(selectedCheckbox.dataset.selectRecord);
    }
    renderVisitHistoryControls();
    return;
  }

  if (editId) {
    switchScreen("appointments");
    showVisitsView("visit-log-form");
    setAddEditMode("visit-log");
    loadVisitLogIntoEditor(editId);
    return;
  }

  if (cancelInlineEditId) {
    inlineEditingVisitLogId = "";
    renderVisitHistoryGlobalList();
    scrollVisitLogIntoView(cancelInlineEditId);
    return;
  }

  if (deleteInlineEditId) {
    const confirmed = window.confirm("Delete this visit log? This cannot be undone.");
    if (!confirmed) {
      return;
    }
    deleteRecordsByIds([deleteInlineEditId]);
    return;
  }

  if (deleteProviderId) {
    const providerEntry = getAllVisitHistoryEntries().find((entry) => entry.id === deleteProviderId);
    if (!providerEntry) {
      return;
    }
    const confirmed = window.confirm(`Delete all visit logs for ${providerEntry.provider || "this provider"}? Appointments and provider details will stay.`);
    if (!confirmed) {
      return;
    }
    const providerKey = getVisitLogProviderKey(providerEntry);
    const idsToDelete = getAllVisitHistoryEntries()
      .filter((entry) => getVisitLogProviderKey(entry) === providerKey)
      .map((entry) => entry.id);
    deleteRecordsByIds(idsToDelete);
    return;
  }

  if (!deleteId) {
    return;
  }

  const confirmed = window.confirm("Delete this visit log? This cannot be undone.");
  if (!confirmed) {
    return;
  }
  deleteRecordsByIds([deleteId]);
}

function handleInlineVisitLogSubmit(event) {
  const form = event.target.closest("[data-inline-visit-log-form]");
  if (!form) {
    return;
  }

  event.preventDefault();
  const visitLogId = form.dataset.inlineVisitLogForm;
  const saved = updateVisitLogFromForm(visitLogId, form);
  if (!saved) {
    return;
  }

  inlineEditingVisitLogId = "";
  persist();
  render();
  scrollVisitLogIntoView(visitLogId);
}

function updateVisitLogFromForm(visitLogId, form) {
  const existingIndex = state.visitLogs.findIndex((log) => log.id === visitLogId);
  if (existingIndex < 0) {
    return false;
  }

  const existingLog = state.visitLogs[existingIndex];
  const formData = new FormData(form);
  state.visitLogs[existingIndex] = normalizeVisitLog({
    ...existingLog,
    id: visitLogId,
    date: cleanText(formData.get("date")),
    clinic: cleanText(formData.get("clinic")) || existingLog.clinic,
    specialty: cleanText(formData.get("specialty")) || existingLog.specialty,
    reason: cleanText(formData.get("reason")),
    status: cleanText(formData.get("status")) || "Completed",
    summary: cleanText(formData.get("summary")),
    results: cleanText(formData.get("results")),
    followUpNeeded: cleanText(formData.get("followUpNeeded")),
    followUpDueDate: cleanText(formData.get("followUpDueDate")),
    costCopay: cleanText(formData.get("costCopay")),
    updatedAt: new Date().toISOString(),
  });
  return true;
}

function loadAppointmentIntoForm(appointmentId) {
  const appointment = state.appointments.find((item) => item.id === appointmentId);
  if (!appointment) {
    return;
  }

  editingAppointmentId = appointment.id;
  appointmentForm.elements.appointmentId.value = appointment.id;
  const linkedProvider = (state.providers || []).find(
    (provider) => normalizeLookupKey(provider.doctor) === normalizeLookupKey(appointment.doctor)
  );
  if (linkedProvider) {
    providerSelect.value = `${PROVIDER_OPTION_PREFIX}${linkedProvider.id}`;
  } else {
    setSelectWithCustomValue(providerSelect, appointmentForm.elements.customDoctor, appointment.doctor || "");
  }
  setSelectWithCustomValue(specialtySelect, appointmentForm.elements.customSpecialty, appointment.specialty || "");
  appointmentForm.elements.clinic.value = appointment.clinic || extractClinicName(appointment.place) || "";
  appointmentForm.elements.place.value = appointment.place || "";
  appointmentForm.elements.insuranceAccepted.value = appointment.insuranceAccepted || "";
  appointmentForm.elements.portalLink.value = appointment.portalLink || "";
  appointmentForm.elements.appointmentDate.value = appointment.appointmentDate || "";
  appointmentForm.elements.appointmentTime.value = appointment.appointmentTime || "";
  appointmentForm.elements.appointmentStatus.value = appointment.appointmentStatus || "Planned";
  appointmentForm.elements.nextRecommendedVisit.value = appointment.nextRecommendedVisit || "";
  appointmentForm.elements.repeatVisit.checked = Boolean(appointment.intervalMonths);
  appointmentForm.elements.intervalMonths.value = appointment.intervalMonths ?? 1;
  syncRepeatRuleVisibility();
  appointmentForm.elements.reminderDaysBefore.value = appointment.reminderDaysBefore ?? 0;
  appointmentForm.elements.reminderEnabled.value = appointment.reminderEnabled === false ? "no" : "yes";
  appointmentForm.elements.contactPhone.value = appointment.contactPhone || "";
  setSelectWithCustomValue(reasonSelect, appointmentForm.elements.customReasonForVisit, appointment.reasonForVisit || "");
  appointmentForm.elements.questionsToAsk.value = appointment.questionsToAsk || "";
  appointmentForm.elements.medications.value = appointment.medications || "";
  appointmentForm.elements.testResults.value = appointment.testResults || "";
  appointmentForm.elements.notes.value = appointment.notes || "";
  appointmentFormTitle.textContent = "Edit appointment";
  appointmentCancelButton.classList.remove("is-hidden");
  editingVisitHistory = getVisitLogsForAppointment(appointment);
  syncCustomFieldVisibility();
  syncAppointmentPreview();
  syncFollowUpShortcutButtons(appointmentForm, "next-visit");
}

function resetAppointmentForm() {
  editingAppointmentId = "";
  appointmentForm.reset();
  appointmentForm.elements.appointmentId.value = "";
  appointmentForm.elements.repeatVisit.checked = false;
  appointmentForm.elements.intervalMonths.value = 6;
  syncRepeatRuleVisibility();
  appointmentForm.elements.reminderDaysBefore.value = 14;
  appointmentForm.elements.reminderEnabled.value = "yes";
  appointmentForm.elements.appointmentStatus.value = "Planned";
  appointmentFormTitle.textContent = "Add appointment";
  appointmentCancelButton.classList.add("is-hidden");
  editingVisitHistory = [];
  renderSelectOptions();
  syncCustomFieldVisibility();
  syncAppointmentPreview();
  if (appointmentFollowUpHint) {
    appointmentFollowUpHint.textContent = "";
    appointmentFollowUpHint.classList.add("is-hidden");
  }
  syncFollowUpShortcutButtons(appointmentForm, "next-visit");
}

function syncForms() {
  renderSelectOptions();
  resetAppointmentForm();
  resetVisitLogForm();
  if (profileForm) {
    profileForm.elements.birthDate.value = state.profile?.birthDate || "";
    profileForm.elements.sexAtBirth.value = state.profile?.sexAtBirth || "";
    profileForm.elements.hasCervix.value = state.profile?.hasCervix || "";
    profileForm.elements.postmenopausal.value = state.profile?.postmenopausal || "";
    profileForm.elements.smokingStatus.value = state.profile?.smokingStatus || "";
    profileForm.elements.packYears.value = state.profile?.packYears ?? "";
    profileForm.elements.yearsSinceQuit.value = state.profile?.yearsSinceQuit ?? "";
    profileForm.elements.hasOverweightOrObesity.value = state.profile?.hasOverweightOrObesity || "";
  }
  if (insuranceForm) {
    insuranceForm.elements.provider.value = state.insurance.provider || "";
    insuranceForm.elements.planName.value = state.insurance.planName || "";
    insuranceForm.elements.memberId.value = state.insurance.memberId || "";
    insuranceForm.elements.groupNumber.value = state.insurance.groupNumber || "";
    insuranceForm.elements.copay.value = state.insurance.copay || "";
    insuranceForm.elements.phone.value = state.insurance.phone || "";
    insuranceForm.elements.notes.value = state.insurance.notes || "";
  }
}

function render() {
  const summaries = getAppointmentSummaries();
  const reminderItems = getActiveReminderItems(summaries);
  const recommendations = getProfileRecommendations();
  const providerCount = new Set(
    getDisplayableAppointments().map((item) => item.doctor).concat(state.visitLogs.map((log) => log.provider))
  ).size;

  if (heroReminderCount) heroReminderCount.textContent = String(reminderItems.length);
  if (heroProviderCount) heroProviderCount.textContent = String(providerCount);
  if (homeReminderCount) homeReminderCount.textContent = String(reminderItems.length);
  if (homeProviderCount) homeProviderCount.textContent = String(providerCount);

  renderDashboardStats(summaries, reminderItems);
  renderHomeSections(summaries);
  renderReminderList(reminderItems);
  renderAppointmentLists(summaries);
  renderVisitHistoryGlobalList();
  renderRecommendations(recommendations);
  renderInsuranceSummary();
  renderCareTeam();
  renderAppointmentFilters();
  renderSelectOptions(false);
  renderVisitTimelineList(summaries);
  renderRecordView();
  renderCarePlan();
  updateNotificationButton();
}

function renderDashboardStats(summaries, reminderItems) {
  if (!dashboardStats) return;
  const overdueCount = reminderItems.filter((item) => item.reminderStatus === "overdue").length;
  const dueSoonCount = reminderItems.filter((item) => item.reminderStatus === "soon").length;
  const nextItem = summaries[0];

  dashboardStats.innerHTML = [
    metricCard("Tracked appointments", getDisplayableAppointments().length),
    metricCard("Reminder alerts", reminderItems.length),
    metricCard("Overdue", overdueCount),
    metricCard("Due soon", dueSoonCount),
    metricCard("Next visit", nextItem ? formatDate(nextItem.nextVisitDate) : "None"),
  ].join("");
}

function getActiveReminderItems(summaries) {
  const appointmentReminders = summaries.filter((item) => item.reminderEnabled !== false && item.reminderStatus !== "ok");
  const visitLogReminders = getVisitLogFollowUpReminders().filter((item) => item.reminderStatus !== "ok");
  return appointmentReminders.concat(visitLogReminders);
}

function getVisitLogFollowUpReminders() {
  return normalizeVisitLogs(state.visitLogs)
    .filter((log) => isValidIsoDate(log.followUpDueDate) || hasFollowUpAlert(log))
    .map((log) => {
      const followUpState = isValidIsoDate(log.followUpDueDate) ? getFollowUpState(log.followUpDueDate) : "soon";
      return {
        id: `visit-log-followup-${log.id}`,
        doctor: log.provider,
        specialty: log.specialty,
        reasonForVisit: log.reason,
        nextVisitDate: log.followUpDueDate,
        nextVisitLabel: "Follow-up due",
        reminderStatus: followUpState,
        reminderEnabled: true,
        isVisitLogFollowUp: true,
        followUpNeeded: log.followUpNeeded,
      };
    });
}

function renderReminderList(reminderItems) {
  if (!reminderList) return;
  reminderList.innerHTML = reminderItems.length
    ? reminderItems
        .map(
          (item) => `
            <article class="reminder-card">
              <div class="card-head">
                <div>
                  <strong>${escapeHtml(getRecordTitle(item))}</strong>
                  <span class="meta">${escapeHtml(
                    item.isVisitLogFollowUp
                      ? item.followUpNeeded || item.reasonForVisit || "Visit log follow-up"
                      : item.reasonForVisit || item.doctor || "No provider saved"
                  )}</span>
                </div>
                ${statusPill(item.reminderStatus)}
              </div>
              <div class="detail-grid">
                ${
                  item.isVisitLogFollowUp
                    ? `<span><strong>Follow-up due</strong>${formatFollowUpDueLabel(item.nextVisitDate)}</span>
                       <span><strong>Reason</strong>${escapeHtml(item.reasonForVisit || "Not saved")}</span>`
                    : `<span><strong>Last visit</strong>${formatDate(item.lastVisitDate)}</span>
                       <span><strong>${escapeHtml(item.nextVisitLabel || "Auto next visit")}</strong>${formatDate(item.nextVisitDate)}</span>
                       <span><strong>Reminder starts</strong>${formatDate(item.reminderStartDate)}</span>
                       <span><strong>Appointment</strong>${formatAppointmentDateTime(item.appointmentDate, item.appointmentTime)}</span>`
                }
              </div>
            </article>
          `
        )
        .join("")
    : `<p class="muted">No reminders are active right now.</p>`;
}

function renderAppointmentLists(summaries) {
  if (!appointmentList && !dashboardAppointmentList) return;
  const filteredSummaries = filterAppointmentSummaries(summaries);
  const markup = filteredSummaries.length
    ? filteredSummaries
        .map(
          (item) => `
            <details class="appointment-card appointment-dropdown">
              <summary class="appointment-summary">
                <div>
                  <strong>${escapeHtml(getRecordTitle(item))}</strong>
                  <span class="meta">${escapeHtml(item.reasonForVisit || "No reason saved")}</span>
                  <span class="meta">Clinic: ${escapeHtml(item.clinic || extractClinicName(item.place) || "Not saved")}</span>
                  <span class="meta">Status: ${escapeHtml(item.appointmentStatus || "Planned")} • Next: ${formatDate(item.nextVisitDate)} • Appointment: ${formatAppointmentDateTime(item.appointmentDate, item.appointmentTime)}</span>
                </div>
                ${statusPill(item.reminderStatus)}
              </summary>
              <div class="appointment-dropdown-body">
                <div class="detail-grid">
                  <span><strong>Appointment</strong>${formatAppointmentDateTime(item.appointmentDate, item.appointmentTime)}</span>
                  <span><strong>Status</strong>${escapeHtml(item.appointmentStatus || "Planned")}</span>
                  <span><strong>Clinic</strong>${escapeHtml(item.clinic || extractClinicName(item.place) || "Not saved")}</span>
                  <span><strong>Address</strong>${escapeHtml(item.place || "Not saved")}</span>
                  <span><strong>Last visit</strong>${formatDate(item.lastVisitDate)}</span>
                  <span><strong>Rule</strong>Every ${item.intervalMonths} month${item.intervalMonths === 1 ? "" : "s"}</span>
                  <span><strong>${escapeHtml(item.nextVisitLabel || "Auto next visit")}</strong>${formatDate(item.nextVisitDate)}</span>
                  <span><strong>Reminder lead time</strong>${item.reminderDaysBefore} day${item.reminderDaysBefore === 1 ? "" : "s"}</span>
                  <span><strong>Reason</strong>${escapeHtml(item.reasonForVisit || "Not saved")}</span>
                  <span><strong>Notifications</strong>${item.reminderEnabled === false ? "Disabled" : "Enabled"}</span>
                </div>
                <details class="nested-dropdown">
                  <summary class="nested-summary">Visit History / Past Visits</summary>
                  <div class="nested-body visit-history-list">
                    ${
                      item.visitHistory?.length
                        ? item.visitHistory
                            .slice(0, 2)
                            .map(
                              (log) => `
                                <article class="summary-card">
                                  <div class="card-head">
                                    <div>
                                      <strong>${formatDate(log.date)}</strong>
                                      <span class="meta">${escapeHtml(log.reason || "Not saved")}</span>
                                      <span class="meta">${escapeHtml(log.specialty || item.specialty || "General")}</span>
                                    </div>
                                    <div class="inline-row">
                                      <span class="pill ${visitLogStatusClass(log.status)}">${escapeHtml(log.status || "Completed")}</span>
                                      <button class="button-secondary" type="button" data-edit-visit-log="${log.id}" data-appointment-id="${item.id}">Edit</button>
                                    </div>
                                  </div>
                                  <div class="summary-row"><strong>Summary</strong><span>${escapeHtml(log.summary || "Not saved")}</span></div>
                                  <div class="summary-row"><strong>Results</strong><span>${escapeHtml(log.results || "Not saved")}</span></div>
                                  <div class="summary-row"><strong>Follow-up needed</strong><span>${escapeHtml(log.followUpNeeded || "Not saved")}</span></div>
                                  <div class="summary-row"><strong>Follow-up due</strong><span>${formatFollowUpDueLabel(log.followUpDueDate)}</span></div>
                                  <div class="summary-row"><strong>Cost / copay</strong><span>${escapeHtml(log.costCopay || "Not saved")}</span></div>
                                </article>
                              `
                            )
                            .join("") +
                          (item.visitHistory.length > 2
                            ? `<button class="button-secondary" type="button" data-view-all-history="${item.id}">View all visit history</button>`
                            : "")
                        : `<span class="meta">No visit history logged yet.</span>`
                    }
                  </div>
                </details>
                <details class="nested-dropdown">
                  <summary class="nested-summary">Edit Appointment</summary>
                  <div class="nested-body">
                    <div class="detail-grid">
                      <span><strong>Questions</strong>${escapeHtml(item.questionsToAsk || "None saved")}</span>
                      <span><strong>Medications</strong>${escapeHtml(item.medications || "None saved")}</span>
                      <span><strong>Test results</strong>${escapeHtml(item.testResults || "None saved")}</span>
                    </div>
                    ${
                      item.resultFiles?.length
                        ? `<div class="file-list">${item.resultFiles.map((fileName) => `<span class="pill ok">${escapeHtml(fileName)}</span>`).join("")}</div>`
                        : `<span class="meta">No test-result file names saved.</span>`
                    }
                    <span class="meta">${escapeHtml(item.notes || "No notes saved.")}</span>
                    <div class="inline-row">
                      <button class="button-secondary" type="button" data-edit-appointment="${item.id}">Edit Appointment</button>
                      <button class="button-danger" type="button" data-delete-appointment="${item.id}">Delete</button>
                    </div>
                  </div>
                </details>
              </div>
            </details>
          `
        )
        .join("")
    : `<p class="muted">No appointments match the current filters.</p>`;

  appointmentList.innerHTML = renderRecordsList(summaries);
  dashboardAppointmentList.innerHTML = markup;
}

function getRecordTitle(record) {
  const specialty = cleanText(record.specialty);
  const provider = cleanText(record.provider || record.doctor);

  if (specialty && provider) {
    return `${specialty} • ${provider}`;
  }
  if (specialty) {
    return specialty;
  }
  if (provider) {
    return provider;
  }
  return "Visit";
}

function renderAppointmentFilters() {
  if (!appointmentSpecialtyFilter || !appointmentProviderFilter) return;
  const visitLogEntries = getAllVisitHistoryEntries();
  const specialtyOptions = mergeTextLists(
    [],
    state.appointments.map((item) => item.specialty).concat(visitLogEntries.map((entry) => entry.specialty))
  );
  const providerOptions = mergeTextLists(
    [],
    state.appointments.map((item) => item.doctor).concat(visitLogEntries.map((entry) => entry.provider))
  );
  const currentSpecialty = appointmentSpecialtyFilter.value || "all";
  const currentProvider = appointmentProviderFilter.value || "all";

  appointmentSpecialtyFilter.innerHTML = [`<option value="all">All specialties</option>`]
    .concat(specialtyOptions.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`))
    .join("");
  appointmentProviderFilter.innerHTML = [`<option value="all">All providers</option>`]
    .concat(providerOptions.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`))
    .join("");

  appointmentSpecialtyFilter.value = [...appointmentSpecialtyFilter.options].some((option) => option.value === currentSpecialty)
    ? currentSpecialty
    : "all";
  appointmentProviderFilter.value = [...appointmentProviderFilter.options].some((option) => option.value === currentProvider)
    ? currentProvider
    : "all";
}

function renderHomeSections(summaries) {
  if (!homeTodayList || !homeUpcomingList || !homeOverdueList || !homeRecentLogsList) {
    return;
  }

  const today = todayString();
  const visitLogFollowUps = getVisitLogFollowUpReminders();
  const todayItems = summaries
    .filter(
      (item) =>
        item.appointmentDate === today || item.reminderStartDate === today || item.nextVisitDate === today
    )
    .concat(visitLogFollowUps.filter((item) => item.nextVisitDate === today));
  const overdueItems = summaries
    .filter((item) => item.reminderStatus === "overdue")
    .concat(visitLogFollowUps.filter((item) => item.reminderStatus === "overdue"));
  const upcomingItems = summaries
    .filter((item) => item.reminderStatus === "soon" && !todayItems.includes(item))
    .concat(visitLogFollowUps.filter((item) => item.reminderStatus === "soon" && item.nextVisitDate !== today));
  const recentLogs = getAllVisitHistoryEntries()
    .slice()
    .sort((a, b) => compareOptionalDates(b.date, a.date))
    .slice(0, 4);

  homeTodayList.innerHTML = todayItems.length
    ? todayItems.map(renderHomeSummaryCard).join("")
    : `<p class="muted">No visits or reminders scheduled for today.</p>`;
  homeUpcomingList.innerHTML = upcomingItems.length
    ? upcomingItems.map(renderHomeSummaryCard).join("")
    : `<p class="muted">No upcoming reminders found.</p>`;
  homeOverdueList.innerHTML = overdueItems.length
    ? overdueItems.map(renderHomeSummaryCard).join("")
    : `<p class="muted">No overdue items right now.</p>`;
  homeRecentLogsList.innerHTML = recentLogs.length
    ? recentLogs.map(renderHomeVisitLogCard).join("")
    : `<p class="muted">No recent visit logs yet.</p>`;

  if (homeOverdueCount) {
    homeOverdueCount.textContent = String(overdueItems.length);
  }
  if (homeScheduledCount) {
    homeScheduledCount.textContent = String(summaries.filter((item) => item.appointmentStatus === "Scheduled").length);
  }
}

function renderHomeSummaryCard(item) {
  const metaLine = item.isVisitLogFollowUp
    ? `Follow-up due ${formatFollowUpCardDate(item.nextVisitDate) || "Not set"}`
    : `${formatDate(item.nextVisitDate)} • ${formatAppointmentDateTime(item.appointmentDate, item.appointmentTime)}`;
  const reasonLine = item.isVisitLogFollowUp
    ? item.followUpNeeded || item.reasonForVisit || "Visit log follow-up"
    : item.reasonForVisit || item.appointmentStatus || "No reason saved";

  return `
    <article class="summary-card">
      <div class="card-head">
        <div>
          <strong>${escapeHtml(getRecordTitle(item))}</strong>
          <span class="meta">${escapeHtml(reasonLine)}</span>
          <span class="meta">${escapeHtml(metaLine)}</span>
        </div>
        ${statusPill(item.reminderStatus || item)}
      </div>
    </article>
  `;
}

function renderHomeVisitLogCard(entry) {
  const followUpLine = isValidIsoDate(entry.followUpDueDate)
    ? `<span class="meta">Follow-up due: ${formatFollowUpCardDate(entry.followUpDueDate)}</span>`
    : "";
  return `
    <article class="summary-card">
      <div class="card-head">
        <div>
          <strong>${escapeHtml(getRecordTitle(entry))}</strong>
          <span class="meta">${escapeHtml(entry.reason || "No reason saved")}</span>
          <span class="meta">${formatDate(entry.date)} • ${escapeHtml(entry.clinic || "No clinic saved")}</span>
          ${followUpLine}
        </div>
        ${statusPill(entry)}
      </div>
      <div class="summary-row"><strong>Summary</strong><span>${escapeHtml(entry.summary || "Not saved")}</span></div>
    </article>
  `;
}

function renderVisitTimelineList(summaries) {
  if (!visitTimelineList) return;
  if (!visitTimelineList) {
    return;
  }

  const records = getFilteredSortedRecords(summaries);
  const timeline = records
    .filter((record) => getRecordDate(record))
    .sort((a, b) => compareOptionalDates(getRecordDate(a), getRecordDate(b)));

  if (!timeline.length) {
    visitTimelineList.innerHTML = `<p class="muted">No timeline entries match the current filters.</p>`;
    return;
  }

  const grouped = timeline.reduce((acc, record) => {
    const dateKey = formatDate(getRecordDate(record));
    acc[dateKey] = acc[dateKey] || [];
    acc[dateKey].push(record);
    return acc;
  }, {});

  visitTimelineList.innerHTML = Object.keys(grouped)
    .sort((a, b) => compareOptionalDates(a, b))
    .map(
      (dateKey) => `
        <div class="timeline-day">
          <h4>${escapeHtml(dateKey)}</h4>
          ${grouped[dateKey]
            .map((record) => renderTimelineEntry(record))
            .join("")}
        </div>
      `
    )
    .join("");
}

function renderTimelineEntry(record) {
  const item = record.item;
  const entryLabel = record.type === "appointment" ? "Appointment" : "Visit Log";
  const dateLabel = record.type === "appointment" ? formatAppointmentDateTime(item.appointmentDate, item.appointmentTime) : formatDate(item.date);

  return `
    <article class="timeline-card">
      <div class="timeline-card-meta">
        <strong>${escapeHtml(getRecordTitle(item))}</strong>
        <span class="meta">${escapeHtml(dateLabel)} • ${escapeHtml(record.type === "appointment" ? item.appointmentStatus || "Planned" : entryLabel)}</span>
      </div>
      <div class="inline-row wrap">
        ${statusPill(item)}
        <span class="pill ${record.type === "appointment" ? "scheduled" : "ok"}">${entryLabel}</span>
      </div>
    </article>
  `;
}

function renderRecordView() {
  if (!visitTimelineContainer || !appointmentList) return;
  if (!visitTimelineContainer || !appointmentList) {
    return;
  }
  const isTimeline = activeRecordView === "timeline";
  visitTimelineContainer.classList.toggle("is-hidden", !isTimeline);
  appointmentList.classList.toggle("is-hidden", isTimeline);
}

function setRecordView(view) {
  activeRecordView = view;
  recordViewButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.recordView === view));
  renderRecordView();
}

function filterAppointmentSummaries(summaries) {
  const query = cleanText(appointmentSearchInput.value).toLowerCase();
  const status = appointmentStatusFilter.value;
  const specialty = appointmentSpecialtyFilter.value;
  const provider = appointmentProviderFilter.value;

  return summaries.filter((item) => {
    const visitHistory = normalizeVisitHistory(item.visitHistory || []);
    const hasWaitingOnResults = visitHistory.some((log) => log.status === "Waiting on results");
    const hasFollowUpNeeded = visitHistory.some((log) => hasFollowUpAlert(log));
    const matchesQuery =
      !query ||
      [
        item.title,
        item.doctor,
        item.specialty,
        item.clinic,
        item.place,
        item.reasonForVisit,
        item.appointmentStatus,
        ...visitHistory.flatMap((log) => [log.provider, log.reason, log.summary, log.results, log.followUpNeeded, log.specialty, log.clinic]),
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    const matchesStatus =
      status === "all" ||
      (status === "overdue" && item.reminderStatus === "overdue") ||
      (status === "soon" && item.reminderStatus === "soon") ||
      (status === "has-history" && visitHistory.length > 0) ||
      (status === "missing-history" && visitHistory.length === 0) ||
      (status === "follow-up-needed" && hasFollowUpNeeded) ||
      (status === "waiting-on-results" && hasWaitingOnResults) ||
      item.appointmentStatus === status;
    const matchesSpecialty = specialty === "all" || item.specialty === specialty;
    const matchesProvider = provider === "all" || item.doctor === provider;
    return matchesQuery && matchesStatus && matchesSpecialty && matchesProvider;
  });
}

function renderRecordsList(summaries) {
  const records = getFilteredSortedRecords(summaries);
  return records.length
    ? records.map((record) => (record.type === "appointment" ? renderAppointmentRecordCard(record.item) : renderVisitLogRecordCard(record.item))).join("")
    : `<p class="muted">No records match the current filters.</p>`;
}

function getFilteredSortedRecords(summaries) {
  const type = recordTypeFilter.value || "all";
  const appointmentRecords =
    type === "visit-logs" ? [] : filterAppointmentSummaries(summaries).map((item) => ({ type: "appointment", item }));
  const visitLogRecords =
    type === "appointments"
      ? []
      : filterRecordVisitLogs(getAllVisitHistoryEntries()).map((item) => ({ type: "visit-log", item }));

  return appointmentRecords.concat(visitLogRecords).sort(compareRecords);
}

function filterRecordVisitLogs(entries) {
  const query = cleanText(appointmentSearchInput.value).toLowerCase();
  const status = appointmentStatusFilter.value;
  const specialty = appointmentSpecialtyFilter.value;
  const provider = appointmentProviderFilter.value;

  return entries.filter((entry) => {
    const matchesQuery =
      !query ||
      [entry.provider, entry.specialty, entry.clinic, entry.reason, entry.status, entry.summary, entry.results, entry.followUpNeeded]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    const matchesStatus =
      status === "all" ||
      (status === "follow-up-needed" && hasFollowUpAlert(entry)) ||
      (status === "waiting-on-results" && entry.status === "Waiting on results") ||
      (status === "overdue" && getFollowUpState(entry.followUpDueDate) === "overdue") ||
      (status === "soon" && getFollowUpState(entry.followUpDueDate) === "soon") ||
      entry.status === status;
    const matchesSpecialty = specialty === "all" || entry.specialty === specialty;
    const matchesProvider = provider === "all" || entry.provider === provider;
    return matchesQuery && matchesStatus && matchesSpecialty && matchesProvider;
  });
}

function compareRecords(a, b) {
  const sort = recordSortSelect.value || "newest";
  if (sort === "overdue") {
    return getRecordOverdueRank(b) - getRecordOverdueRank(a) || compareOptionalDates(getRecordDate(a), getRecordDate(b));
  }
  if (sort === "upcoming") {
    return compareOptionalDates(getRecordDate(a), getRecordDate(b));
  }
  if (sort === "oldest") {
    return compareOptionalDates(getRecordDate(a), getRecordDate(b));
  }
  return compareOptionalDates(getRecordDate(b), getRecordDate(a));
}

function getRecordDate(record) {
  if (record.type === "appointment") {
    return record.item.appointmentDate || record.item.nextVisitDate || record.item.lastVisitDate || "";
  }
  return record.item.date || "";
}

function getRecordOverdueRank(record) {
  if (record.type === "appointment") {
    return record.item.reminderStatus === "overdue" ? 2 : record.item.reminderStatus === "soon" ? 1 : 0;
  }
  return getFollowUpState(record.item.followUpDueDate) === "overdue" ? 2 : hasFollowUpAlert(record.item) ? 1 : 0;
}

function renderAppointmentRecordCard(item) {
  const dateLabel = item.appointmentDate
    ? formatAppointmentDateTime(item.appointmentDate, item.appointmentTime)
    : formatDate(item.nextVisitDate);
  return `
    <article class="visit-record-card">
      ${
        visitHistorySelectMode
          ? `<label class="select-check">
              <input type="checkbox" data-select-record="${item.id}" ${selectedRecordIds.has(item.id) ? "checked" : ""} />
              Select
            </label>`
          : ""
      }
      <div class="visit-card-head">
        <span class="pill scheduled">Appointment</span>
        ${statusPill(item)}
      </div>
      <div class="visit-card-body">
        <strong class="visit-card-provider">${escapeHtml(item.doctor || "Unknown provider")}</strong>
        <span class="visit-card-specialty">${escapeHtml(item.specialty || "No specialty saved")}</span>
        <div class="visit-card-grid">
          <span><strong>Date</strong>${escapeHtml(dateLabel || "Not set")}</span>
          <span><strong>Status</strong>${escapeHtml(item.appointmentStatus || "Planned")}</span>
          <span class="full-span"><strong>Reason</strong>${escapeHtml(item.reasonForVisit || "Not saved")}</span>
        </div>
      </div>
      <div class="visit-card-actions">
        <button class="button-secondary" type="button" data-edit-appointment="${item.id}">Edit</button>
        <button class="button-delete" type="button" data-delete-appointment="${item.id}">Delete</button>
      </div>
    </article>
  `;
}

function renderVisitLogRecordCard(entry) {
  return `
    <article class="visit-record-card" data-appointment-log-id="${entry.appointmentId}" data-visit-log-card="${entry.id}">
      ${
        visitHistorySelectMode
          ? `<label class="select-check">
              <input type="checkbox" data-select-record="${entry.id}" ${selectedRecordIds.has(entry.id) ? "checked" : ""} />
              Select
            </label>`
          : ""
      }
      <div class="visit-card-head">
        <span class="pill ok">Visit Log</span>
        <span class="pill ${visitLogStatusClass(entry.status)}">${escapeHtml(entry.status || "Completed")}</span>
      </div>
      <div class="visit-card-body">
        <strong class="visit-card-provider">${escapeHtml(entry.provider || "Unknown provider")}</strong>
        <span class="visit-card-specialty">${escapeHtml(entry.specialty || "No specialty saved")}</span>
        <div class="visit-card-grid">
          <span><strong>Date</strong>${formatDate(entry.date)}</span>
          <span><strong>Status</strong>${escapeHtml(entry.status || "Completed")}</span>
          <span class="full-span"><strong>Reason</strong>${escapeHtml(entry.reason || "Not saved")}</span>
          ${
            isValidIsoDate(entry.followUpDueDate)
              ? `<span class="full-span meta-line"><strong>Follow-up due:</strong> ${formatFollowUpCardDate(entry.followUpDueDate)}</span>`
              : ""
          }
        </div>
      </div>
      <div class="visit-card-actions">
        <button class="button-secondary" type="button" data-edit-visit-log="${entry.id}" data-appointment-id="${entry.appointmentId}">Edit</button>
        <button class="button-delete" type="button" data-delete-visit-log="${entry.id}">Delete</button>
      </div>
    </article>
  `;
}

function renderInsuranceSummary() {
  if (!insuranceSummary) return;
  const insurance = state.insurance;
  const hasInsurance = Object.values(insurance).some((value) => cleanText(value));

  insuranceSummary.innerHTML = hasInsurance
    ? `
        <article class="summary-card">
          <div class="summary-row"><strong>Provider</strong><span>${escapeHtml(insurance.provider || "Not saved")}</span></div>
          <div class="summary-row"><strong>Plan</strong><span>${escapeHtml(insurance.planName || "Not saved")}</span></div>
          <div class="summary-row"><strong>Member ID</strong><span>${escapeHtml(insurance.memberId || "Not saved")}</span></div>
          <div class="summary-row"><strong>Group number</strong><span>${escapeHtml(insurance.groupNumber || "Not saved")}</span></div>
          <div class="summary-row"><strong>Copay</strong><span>${escapeHtml(insurance.copay || "Not saved")}</span></div>
          <div class="summary-row"><strong>Phone</strong><span>${escapeHtml(insurance.phone || "Not saved")}</span></div>
          <div class="summary-row"><strong>Notes</strong><span>${escapeHtml(insurance.notes || "No notes saved")}</span></div>
        </article>
      `
    : `<p class="muted">No insurance information saved yet.</p>`;
}

function renderCareTeam() {
  if (!careTeamList) return;
  const providers = getAllProviders();
  careTeamList.innerHTML = providers.length
    ? providers.map((provider) => renderCareTeamProviderCard(provider)).join("")
    : `<p class="muted">No care team entries yet. Add a provider using the form above.</p>`;
}

function renderCareTeamProviderCard(provider) {
  const notes = provider.notes || provider.address || provider.insuranceAccepted || "No notes saved";
  return `
    <article class="visit-record-card care-team-provider-card" data-provider-card="${escapeHtml(provider.id)}">
      <div class="visit-card-body">
        <strong class="visit-card-provider">${escapeHtml(getProviderRecordName(provider))}</strong>
        <span class="visit-card-specialty">${escapeHtml(provider.specialty || "General")}</span>
        <div class="visit-card-grid">
          <span><strong>Clinic</strong>${escapeHtml(provider.clinic || "Not saved")}</span>
          <span><strong>Phone</strong>${escapeHtml(provider.phone || "Not saved")}</span>
          <span class="full-span"><strong>Notes</strong>${escapeHtml(notes)}</span>
        </div>
      </div>
      <div class="visit-card-actions">
        <button class="button-secondary" type="button" data-edit-provider="${escapeHtml(provider.id)}">Edit</button>
        <button class="button-delete" type="button" data-delete-provider="${escapeHtml(provider.id)}">Delete</button>
        <button class="button-secondary" type="button" data-delete-provider-logs="${escapeHtml(provider.id)}">Delete Provider Logs</button>
      </div>
    </article>
  `;
}

function renderRecommendations(recommendations) {
  if (!recommendationList) return;
  const age = getProfileAge();
  recommendationList.innerHTML = recommendations.length
    ? recommendations
        .map(
          (item) => `
            <article class="recommendation-card">
              <div class="card-head">
                <div>
                  <strong>${escapeHtml(item.title)}</strong>
                  <span class="meta">${escapeHtml(item.specialty)}</span>
                </div>
                <span class="pill ok">Suggested</span>
              </div>
              <span class="meta">${escapeHtml(item.reason)}</span>
              <div class="detail-grid">
                <span><strong>Profile age</strong>${age !== null ? age : "Add date of birth"}</span>
                <span><strong>Suggested repeat rule</strong>Every ${item.intervalMonths} month${item.intervalMonths === 1 ? "" : "s"}</span>
              </div>
              <div class="inline-row">
                <button class="button-secondary" type="button" data-use-recommendation="${item.key}">Use as template</button>
                ${
                  item.sourceUrl
                    ? `<a class="source-link" href="${item.sourceUrl}" target="_blank" rel="noreferrer">View source</a>`
                    : `<span class="meta">Baseline template</span>`
                }
              </div>
              <span class="meta">${escapeHtml(item.sourceLabel)}</span>
            </article>
          `
        )
        .join("")
    : `<p class="muted">Save your profile to see age- and risk-based suggestions. The app only shows a limited set of guideline-informed examples, not a full care plan.</p>`;
}

function renderVisitHistoryGlobalList() {
  if (!visitHistoryGlobalList) return;
  const allEntries = getAllVisitHistoryEntries();
  const entries = filterVisitHistoryEntries(allEntries);
  selectedRecordIds = new Set([...selectedRecordIds].filter((id) => entries.some((entry) => entry.id === id)));
  renderVisitHistoryControls();

  visitHistoryGlobalList.innerHTML = entries.length
    ? entries
        .map(
          (entry) => `
            <article class="summary-card" data-appointment-log-id="${entry.appointmentId}" data-visit-log-card="${entry.id}">
              <div class="card-head">
                ${
                  visitHistorySelectMode
                    ? `<label class="select-check">
                        <input type="checkbox" data-select-record="${entry.id}" ${selectedRecordIds.has(entry.id) ? "checked" : ""} />
                        Select
                      </label>`
                    : ""
                }
                <div>
                  <strong>${escapeHtml(getRecordTitle(entry))}</strong>
                  <span class="meta">${escapeHtml(entry.reason || "No reason saved")}</span>
                  <span class="meta">${formatDate(entry.date)} • ${escapeHtml(entry.clinic || "No clinic saved")}</span>
                </div>
                <div class="inline-row">
                  <span class="pill ${visitLogStatusClass(entry.status)}">${escapeHtml(entry.status || "Completed")}</span>
                  <button class="button-secondary" type="button" data-edit-visit-log="${entry.id}" data-appointment-id="${entry.appointmentId}">Edit</button>
                  <button class="button-danger" type="button" data-delete-visit-log="${entry.id}">Delete</button>
                  <button class="button-danger" type="button" data-delete-provider-visit-logs="${entry.id}">Delete Provider Logs</button>
                </div>
              </div>
              <div class="detail-grid">
                <span><strong>Summary</strong>${escapeHtml(entry.summary || "Not saved")}</span>
                <span><strong>Results</strong>${escapeHtml(entry.results || "Not saved")}</span>
                <span><strong>Follow-up needed</strong>${escapeHtml(entry.followUpNeeded || "Not saved")}</span>
                <span><strong>Follow-up due</strong>${formatFollowUpDueLabel(entry.followUpDueDate)}</span>
                <span><strong>Cost / copay</strong>${escapeHtml(entry.costCopay || "Not saved")}</span>
              </div>
              ${inlineEditingVisitLogId === entry.id ? renderInlineVisitLogEditor(entry) : ""}
            </article>
          `
        )
        .join("")
    : `<p class="muted">${
        allEntries.length
          ? "No visit logs match the current filter."
          : state.appointments.length
            ? "No visit logs added yet."
            : "Choose or create an appointment first."
      }</p>`;
}

function renderVisitHistoryControls() {
  const selectedCount = selectedRecordIds.size;
  visitHistoryFilterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.visitHistoryFilter === activeVisitHistoryFilter);
  });
  visitHistorySelectButton.classList.toggle("is-hidden", visitHistorySelectMode);
  visitHistoryDeleteSelectedButton.classList.toggle("is-hidden", !visitHistorySelectMode);
  visitHistoryCancelSelectButton.classList.toggle("is-hidden", !visitHistorySelectMode);
  visitHistoryDeleteSelectedButton.textContent = selectedCount
    ? `Delete Selected (${selectedCount})`
    : "Delete Selected";
}

function renderInlineVisitLogEditor(entry) {
  const specialtyOptions = mergeTextLists(
    DEFAULT_SPECIALTY_OPTIONS,
    state.appointments.map((item) => item.specialty).concat(entry.specialty)
  );
  const specialtyMarkup = [`<option value="">Select specialty</option>`]
    .concat(
      specialtyOptions.map(
        (option) =>
          `<option value="${escapeHtml(option)}"${option === entry.specialty ? " selected" : ""}>${escapeHtml(option)}</option>`
      )
    )
    .join("");

  return `
    <form class="inline-visit-log-editor" data-inline-visit-log-form="${entry.id}">
      <div class="form-grid">
        <label>
          Provider
          <input type="text" value="${escapeHtml(entry.provider || "Unknown provider")}" disabled />
        </label>
        <label>
          Clinic
          <input type="text" name="clinic" value="${escapeHtml(entry.clinic || "")}" placeholder="Clinic name or address" />
        </label>
        <label>
          Specialty
          <select name="specialty">${specialtyMarkup}</select>
        </label>
        <label>
          Visit date
          <input type="date" name="date" value="${escapeHtml(entry.date || "")}" />
        </label>
        <label>
          Status
          <select name="status">
            ${["Completed", "Waiting on results", "Follow-up needed", "Resolved"]
              .map(
                (status) =>
                  `<option${(entry.status || "Completed") === status ? " selected" : ""}>${escapeHtml(status)}</option>`
              )
              .join("")}
          </select>
        </label>
        <label class="full-span">
          Reason
          <input type="text" name="reason" value="${escapeHtml(entry.reason || "")}" placeholder="Annual checkup, follow-up, screening" />
        </label>
        <label class="full-span">
          Summary
          <textarea name="summary" rows="2" placeholder="What happened at the visit?">${escapeHtml(entry.summary || "")}</textarea>
        </label>
        <label class="full-span">
          Results
          <textarea name="results" rows="2" placeholder="Labs, imaging, diagnosis, or takeaways">${escapeHtml(entry.results || "")}</textarea>
        </label>
        <label>
          Follow-up needed
          <input type="text" name="followUpNeeded" value="${escapeHtml(entry.followUpNeeded || "")}" placeholder="Return in 6 months, book test, monitor symptoms" />
        </label>
        <label>
          Follow-up due date
          <input type="date" name="followUpDueDate" value="${escapeHtml(entry.followUpDueDate || "")}" />
        </label>
        <label>
          Cost / copay
          <input type="text" name="costCopay" value="${escapeHtml(entry.costCopay || "")}" placeholder="$35 copay" />
        </label>
      </div>
      <div class="inline-row">
        <button class="button-primary" type="submit">Save Changes</button>
        <button class="button-secondary" type="button" data-cancel-inline-visit-log="${entry.id}">Cancel</button>
        <button class="button-danger" type="button" data-delete-inline-visit-log="${entry.id}">Delete Log</button>
      </div>
    </form>
  `;
}

function filterVisitHistoryEntries(entries) {
  const context = getVisitLogProviderContext(cleanText(visitLogProviderSelect.value));
  const selectedAppointment = context?.linkedAppointmentId
    ? state.appointments.find((item) => item.id === context.linkedAppointmentId)
    : null;
  const selectedProviderKey = selectedAppointment ? normalizeLookupKey(selectedAppointment.doctor) : "";

  return entries.filter((entry) => {
    if (activeVisitHistoryFilter === "provider") {
      return selectedProviderKey && getVisitLogProviderKey(entry) === selectedProviderKey;
    }
    if (activeVisitHistoryFilter === "follow-up") {
      return hasFollowUpAlert(entry);
    }
    if (activeVisitHistoryFilter === "waiting") {
      return entry.status === "Waiting on results";
    }
    if (activeVisitHistoryFilter === "overdue") {
      return getFollowUpState(entry.followUpDueDate) === "overdue";
    }
    return true;
  });
}

function enableVisitHistorySelectMode() {
  visitHistorySelectMode = true;
  selectedRecordIds.clear();
  renderVisitHistoryGlobalList();
}

function cancelVisitHistorySelectMode() {
  visitHistorySelectMode = false;
  selectedRecordIds.clear();
  renderVisitHistoryGlobalList();
}

function deleteSelectedRecords() {
  const idsToDelete = [...selectedRecordIds];
  if (!idsToDelete.length) {
    return;
  }

  const confirmed = window.confirm(
    `Delete ${idsToDelete.length} selected record${idsToDelete.length === 1 ? "" : "s"}? This cannot be undone.`
  );
  if (!confirmed) {
    return;
  }
  deleteRecordsByIds(idsToDelete);
}

function deleteAllVisitLogs() {
  const entries = getAllVisitHistoryEntries();
  if (!entries.length) {
    return;
  }

  const typedConfirmation = window.prompt(
    "Type DELETE to delete all visit logs. Appointments, providers, reminders, insurance, and portal links will stay."
  );
  if (typedConfirmation !== "DELETE") {
    return;
  }
  deleteRecordsByIds(entries.map((entry) => entry.id));
}

function deleteRecordsByIds(idsToDelete) {
  const deleteIds = new Set(idsToDelete);
  if (!deleteIds.size) {
    return;
  }

  state.visitLogs = state.visitLogs.filter((log) => !deleteIds.has(log.id));

  state.appointments.forEach((appointment) => {
    appointment.visitHistory = normalizeVisitHistory(appointment.visitHistory || []).filter(
      (log) => !deleteIds.has(log.id)
    );
  });

  const deletedAppointments = state.appointments.filter((appointment) => deleteIds.has(appointment.id));
  deletedAppointments.forEach((appointment) => addDeletedSeedKey(appointment));
  state.appointments = state.appointments.filter((appointment) => !deleteIds.has(appointment.id));

  if (deleteIds.has(editingAppointmentId)) {
    resetAppointmentForm();
  }
  if (deleteIds.has(editingVisitLogId)) {
    resetVisitLogForm();
  }
  if (deleteIds.has(inlineEditingVisitLogId)) {
    inlineEditingVisitLogId = "";
  }
  selectedRecordIds = new Set([...selectedRecordIds].filter((id) => !deleteIds.has(id)));
  visitHistorySelectMode = false;
  persist();
  render();
}

function openProviderVisitLogsInRecords(appointmentId) {
  const appointment = state.appointments.find((item) => item.id === appointmentId);
  if (!appointment) {
    return;
  }

  showVisitsList();
  recordTypeFilter.value = "visit-logs";
  appointmentSearchInput.value = appointment.doctor || appointment.specialty || "";
  render();
}

function getVisitLogProviderKey(entry) {
  return normalizeLookupKey(entry.provider);
}

function scrollVisitLogIntoView(visitLogId) {
  requestAnimationFrame(() => {
    [...document.querySelectorAll("[data-visit-log-card]")]
      .find((card) => card.dataset.visitLogCard === visitLogId)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function getAllVisitHistoryEntries() {
  return normalizeVisitLogs(state.visitLogs)
    .map((log) => {
      const linkedAppointment = log.linkedAppointmentId
        ? state.appointments.find((appointment) => appointment.id === log.linkedAppointmentId)
        : null;
      return {
        ...log,
        appointmentId: log.linkedAppointmentId || "",
        appointmentTitle: linkedAppointment?.title || "",
        provider: cleanText(log.provider) || linkedAppointment?.doctor || "",
        specialty: cleanText(log.specialty) || linkedAppointment?.specialty || "",
        clinic: cleanText(log.clinic) || linkedAppointment?.clinic || extractClinicName(linkedAppointment?.place) || "",
        phone: cleanText(log.phone) || linkedAppointment?.contactPhone || "",
        portalLink: cleanText(log.portalLink) || linkedAppointment?.portalLink || "",
        insuranceAccepted: cleanText(log.insuranceAccepted) || linkedAppointment?.insuranceAccepted || "",
      };
    })
    .sort((a, b) => compareOptionalDates(b.date, a.date));
}

function prefillVisitLogForm(appointmentId) {
  const appointment = state.appointments.find((item) => item.id === appointmentId);
  if (!appointment) {
    resetVisitLogForm();
    return;
  }

  resetVisitLogForm();
  visitLogForm.elements.visitLogAppointmentId.value = appointment.id;
  visitLogProviderSelect.value = getVisitLogSelectValueForAppointment(appointment.id);
  visitLogForm.elements.clinic.value = appointment.clinic || "";
  setSelectWithCustomValue(
    visitLogSpecialtySelect,
    visitLogForm.elements.customSpecialty,
    appointment.specialty || ""
  );
  visitLogForm.elements.reason.value = appointment.reasonForVisit || "";
  syncVisitLogCustomSpecialtyVisibility();
}

function loadVisitLogIntoEditor(visitLogId) {
  const storedLog = state.visitLogs.find((item) => item.id === visitLogId);
  const entry = storedLog ? getAllVisitHistoryEntries().find((item) => item.id === visitLogId) : null;
  const log = entry || storedLog || null;
  if (!log) {
    return;
  }

  editingVisitLogId = log.id;
  visitLogForm.elements.visitLogAppointmentId.value = log.linkedAppointmentId || log.appointmentId || "";
  if (log.providerId) {
    visitLogProviderSelect.value = `${PROVIDER_OPTION_PREFIX}${log.providerId}`;
  } else if (log.linkedAppointmentId || log.appointmentId) {
    visitLogProviderSelect.value = getVisitLogSelectValueForAppointment(log.linkedAppointmentId || log.appointmentId);
  } else {
    visitLogProviderSelect.value = "";
  }
  visitLogForm.elements.visitLogId.value = log.id || "";
  visitLogForm.elements.clinic.value = log.clinic || "";
  setSelectWithCustomValue(visitLogSpecialtySelect, visitLogForm.elements.customSpecialty, log.specialty || "");
  visitLogForm.elements.date.value = log.date || "";
  visitLogForm.elements.reason.value = log.reason || "";
  visitLogForm.elements.status.value = log.status || "Completed";
  visitLogForm.elements.summary.value = log.summary || "";
  visitLogForm.elements.results.value = log.results || "";
  visitLogForm.elements.followUpNeeded.value = log.followUpNeeded || "";
  visitLogForm.elements.followUpDueDate.value = log.followUpDueDate || "";
  visitLogForm.elements.costCopay.value = log.costCopay || "";
  visitLogFormTitle.textContent = "Edit visit log";
  syncVisitLogCustomSpecialtyVisibility();
  syncFollowUpShortcutButtons(visitLogForm, "follow-up");
  syncVisitLogFormMode();
}

function syncVisitLogFormMode() {
  const isEditing = Boolean(editingVisitLogId);
  if (visitLogSubmitButton) {
    visitLogSubmitButton.textContent = isEditing ? "Update Visit Log" : "Save Visit Log";
  }
  if (visitLogCancelButton) {
    visitLogCancelButton.classList.toggle("is-hidden", !isEditing);
  }
  document.querySelectorAll(".visit-log-add-only").forEach((button) => {
    button.classList.toggle("is-hidden", isEditing);
  });
}

function resetVisitLogForm() {
  editingVisitLogId = "";
  visitLogForm.reset();
  visitLogForm.elements.visitLogAppointmentId.value = "";
  visitLogForm.elements.visitLogId.value = "";
  visitLogProviderSelect.value = "";
  visitLogFormTitle.textContent = "Add visit log";
  syncVisitLogCustomSpecialtyVisibility();
  if (visitLogFollowUpHint) {
    visitLogFollowUpHint.textContent = "";
    visitLogFollowUpHint.classList.add("is-hidden");
  }
  syncFollowUpShortcutButtons(visitLogForm, "follow-up");
  syncVisitLogFormMode();
}

function syncVisitLogProviderSelection() {
  const selection = cleanText(visitLogProviderSelect.value);
  if (selection === NEW_PROVIDER_OPTION) {
    visitLogProviderSelect.value = "";
    openCareTeamForNewProvider("visitLog");
    return;
  }

  const context = getVisitLogProviderContext(selection);
  if (!context) {
    visitLogForm.elements.visitLogAppointmentId.value = "";
    return;
  }

  visitLogForm.elements.visitLogAppointmentId.value = context.linkedAppointmentId || "";

  if (!editingVisitLogId) {
    visitLogForm.elements.clinic.value = context.clinic || "";
    setSelectWithCustomValue(
      visitLogSpecialtySelect,
      visitLogForm.elements.customSpecialty,
      context.specialty || ""
    );
    visitLogForm.elements.reason.value = visitLogForm.elements.reason.value || "";
  }
  renderVisitHistoryGlobalList();
  renderVisitLogProviderInfo(context);
  syncVisitLogCustomSpecialtyVisibility();
}

function renderVisitLogProviderInfo(context) {
  const providerName = context.provider || "this provider";
  const lastLog = state.visitLogs
    .filter((log) => normalizeLookupKey(log.provider) === normalizeLookupKey(providerName))
    .sort((a, b) => compareOptionalDates(b.date, a.date))
    .find((log) => isValidIsoDate(log.date));
  if (lastLog?.date) {
    visitLogLastAppointmentInfo.textContent = `Last tracked visit with ${providerName} was ${formatDate(lastLog.date)}${lastLog.reason ? ` (${lastLog.reason})` : ""}.`;
    return;
  }
  visitLogLastAppointmentInfo.textContent = `Auto-fill clinic, specialty, and reason from ${providerName}.`;
}

function handleVisitLogTemplateChange() {
  applyVisitLogTemplate(visitLogQuickTemplate.value);
}

function applyVisitLogTemplate(templateKey) {
  const template = QUICK_VISIT_LOG_TEMPLATES[templateKey];
  if (!template) {
    visitLogForm.elements.summary.placeholder = "What happened at the visit?";
    return;
  }

  if (template.reason && !cleanText(visitLogForm.elements.reason.value)) {
    visitLogForm.elements.reason.value = template.reason;
  }
  if (template.summaryPlaceholder) {
    visitLogForm.elements.summary.placeholder = template.summaryPlaceholder;
  }
  if (template.followUpNeeded && !cleanText(visitLogForm.elements.followUpNeeded.value)) {
    visitLogForm.elements.followUpNeeded.value = template.followUpNeeded;
  }
  if (template.status) {
    visitLogForm.elements.status.value = template.status;
  }

  const dateValue = cleanText(visitLogForm.elements.date.value);
  if (dateValue && template.followUpDueMonths && !cleanText(visitLogForm.elements.followUpDueDate.value)) {
    visitLogForm.elements.followUpDueDate.value = addMonths(dateValue, template.followUpDueMonths);
    syncFollowUpShortcutButtons(visitLogForm, "follow-up");
  }
}

function handleVisitLogFormClick(event) {
  const presetKey = event.target.closest("[data-visit-log-preset]")?.dataset.visitLogPreset;
  if (presetKey) {
    event.preventDefault();
    applyVisitLogPreset(presetKey);
  }
}

function applyVisitLogPreset(presetKey) {
  const preset = VISIT_LOG_NOTE_PRESETS[presetKey];
  if (!preset) {
    return;
  }

  const summaryField = visitLogForm.elements.summary;
  const followUpField = visitLogForm.elements.followUpNeeded;
  const resultsField = visitLogForm.elements.results;

  if (preset.status) {
    visitLogForm.elements.status.value = preset.status;
  }
  if (preset.summary) {
    const current = cleanText(summaryField.value);
    summaryField.value = current ? `${current} ${preset.summary}` : preset.summary;
  }
  if (preset.followUpNeeded) {
    const current = cleanText(followUpField.value);
    followUpField.value = current ? `${current} ${preset.followUpNeeded}` : preset.followUpNeeded;
  }
  if (preset.results) {
    const current = cleanText(resultsField.value);
    resultsField.value = current ? `${current} ${preset.results}` : preset.results;
  }
}

function resetVisitLogFormExceptProvider() {
  const providerValue = visitLogProviderSelect.value;
  const context = getVisitLogProviderContext(providerValue);
  editingVisitLogId = "";
  visitLogForm.reset();
  visitLogForm.elements.visitLogAppointmentId.value = context?.linkedAppointmentId || "";
  visitLogProviderSelect.value = providerValue;
  visitLogForm.elements.visitLogId.value = "";
  visitLogForm.elements.date.value = "";
  visitLogForm.elements.reason.value = "";
  visitLogForm.elements.summary.value = "";
  visitLogForm.elements.results.value = "";
  visitLogForm.elements.followUpNeeded.value = "";
  visitLogForm.elements.followUpDueDate.value = "";
  visitLogForm.elements.costCopay.value = "";
  visitLogForm.elements.status.value = "Completed";
  visitLogQuickTemplate.value = "";
  visitLogFormTitle.textContent = "Add visit log";
  if (visitLogFollowUpHint) {
    visitLogFollowUpHint.textContent = "";
    visitLogFollowUpHint.classList.add("is-hidden");
  }
  syncFollowUpShortcutButtons(visitLogForm, "follow-up");
  syncVisitLogProviderSelection();
  syncVisitLogFormMode();
}

function saveVisitLog({ addAnother = false, scheduleFollowUp = false } = {}) {
  if (visitLogSaveInProgress) {
    return false;
  }
  visitLogSaveInProgress = true;

  const formData = new FormData(visitLogForm);
  const selection = cleanText(visitLogProviderSelect.value) || cleanText(formData.get("visitLogAppointmentId"));
  const context = getVisitLogProviderContext(selection);
  if (!context?.provider) {
    visitLogSaveInProgress = false;
    visitHistoryGlobalList.innerHTML = `<p class="muted">Choose a provider to log this visit.</p>`;
    return false;
  }

  const specialtyValue =
    cleanText(formData.get("specialty")) === "__custom__"
      ? cleanText(formData.get("customSpecialty"))
      : cleanText(formData.get("specialty")) || context.specialty;
  const logId = cleanText(formData.get("visitLogId")) || editingVisitLogId || crypto.randomUUID();
  const nextLog = normalizeVisitLog({
    id: logId,
    providerId: context.providerId,
    linkedAppointmentId: context.linkedAppointmentId,
    date: cleanText(formData.get("date")),
    provider: context.provider,
    clinic: cleanText(formData.get("clinic")) || context.clinic,
    phone: context.phone,
    portalLink: context.portalLink,
    insuranceAccepted: context.insuranceAccepted,
    specialty: specialtyValue || context.specialty,
    reason: cleanText(formData.get("reason")),
    status: cleanText(formData.get("status")) || "Completed",
    summary: cleanText(formData.get("summary")),
    results: cleanText(formData.get("results")),
    followUpNeeded: cleanText(formData.get("followUpNeeded")),
    followUpDueDate: cleanText(formData.get("followUpDueDate")),
    costCopay: cleanText(formData.get("costCopay")),
  });

  if (scheduleFollowUp && !isValidIsoDate(nextLog.followUpDueDate)) {
    visitLogForm.elements.followUpDueDate.setCustomValidity("Add a follow-up due date before scheduling.");
    visitLogForm.elements.followUpDueDate.reportValidity();
    visitLogForm.elements.followUpDueDate.setCustomValidity("");
    visitLogSaveInProgress = false;
    return false;
  }

  const existingIndex = state.visitLogs.findIndex((log) => log.id === logId);
  const isNewVisitLog = existingIndex < 0;
  if (existingIndex >= 0) {
    state.visitLogs[existingIndex] = {
      ...state.visitLogs[existingIndex],
      ...nextLog,
      id: logId,
      updatedAt: new Date().toISOString(),
    };
  } else {
    state.visitLogs.unshift({
      ...nextLog,
      id: logId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  const carePlanItemId = pendingCarePlanItemId;
  if (carePlanItemId && isNewVisitLog) {
    applyCarePlanVisitLogCompletion(carePlanItemId, nextLog.date);
  }

  persist();
  if (addAnother) {
    resetVisitLogFormExceptProvider();
  } else {
    pendingCarePlanItemId = "";
    resetVisitLogForm();
    showVisitsList();
  }
  render();
  visitLogSaveInProgress = false;
  return true;
}

function syncVisitLogCustomSpecialtyVisibility() {
  visitLogCustomSpecialtyLabel.classList.toggle("is-hidden", visitLogSpecialtySelect.value !== "__custom__");
}

function visitLogStatusClass(status) {
  if (status === "Waiting on results") {
    return "soon";
  }
  if (status === "Follow-up needed") {
    return "overdue";
  }
  return "ok";
}

function getFollowUpState(dateValue) {
  if (!isValidIsoDate(dateValue)) {
    return "none";
  }

  const today = todayString();
  if (dateValue < today) {
    return "overdue";
  }
  if (dateValue <= addDays(today, 14)) {
    return "soon";
  }
  return "ok";
}

function hasFollowUpAlert(log) {
  return (
    cleanText(log.status) === "Follow-up needed" ||
    Boolean(cleanText(log.followUpNeeded)) ||
    getFollowUpState(log.followUpDueDate) !== "none"
  );
}

function formatFollowUpCardDate(dateValue) {
  if (!isValidIsoDate(dateValue)) {
    return "";
  }
  const date = new Date(`${dateValue}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

function getFollowUpAnchorDate(visitDateInput, { requireVisitDate = false } = {}) {
  const visitDate = cleanText(visitDateInput?.value);
  if (isValidIsoDate(visitDate)) {
    return { date: visitDate, missingVisitDate: false };
  }
  if (requireVisitDate) {
    return { date: "", missingVisitDate: true };
  }
  return { date: todayString(), missingVisitDate: true };
}

function syncFollowUpShortcutButtons(form, mode = "follow-up") {
  if (!form) {
    return;
  }
  const attr = mode === "next-visit" ? "data-next-visit-preset" : "data-follow-up-preset";
  const dueDateInput = mode === "next-visit" ? form.elements.nextRecommendedVisit : form.elements.followUpDueDate;
  if (!dueDateInput) {
    return;
  }

  const dueDate = cleanText(dueDateInput.value);
  const buttons = [...form.querySelectorAll(`[${attr}]`)];
  buttons.forEach((button) => button.classList.remove("is-active"));

  if (!isValidIsoDate(dueDate)) {
    const noneButton = buttons.find((button) => button.getAttribute(attr) === "none");
    if (noneButton) {
      noneButton.classList.add("is-active");
    }
    return;
  }

  const visitDateInput = mode === "next-visit" ? form.elements.appointmentDate : form.elements.date;
  const anchor = getFollowUpAnchorDate(visitDateInput);
  const sixMonthDate = anchor.date ? addMonths(anchor.date, 6) : "";
  const oneYearDate = anchor.date ? addMonths(anchor.date, 12) : "";

  if (dueDate === sixMonthDate) {
    buttons.find((button) => button.getAttribute(attr) === "6months")?.classList.add("is-active");
  } else if (dueDate === oneYearDate) {
    buttons.find((button) => button.getAttribute(attr) === "1year")?.classList.add("is-active");
  } else {
    buttons.find((button) => button.getAttribute(attr) === "custom")?.classList.add("is-active");
  }
}

function applyFollowUpPreset({
  form,
  preset,
  mode = "follow-up",
  hintElement = null,
  requireVisitDate = false,
}) {
  if (!form) {
    return;
  }

  const attr = mode === "next-visit" ? "data-next-visit-preset" : "data-follow-up-preset";
  const dueDateInput = mode === "next-visit" ? form.elements.nextRecommendedVisit : form.elements.followUpDueDate;
  const visitDateInput = mode === "next-visit" ? form.elements.appointmentDate : form.elements.date;
  const buttons = [...form.querySelectorAll(`[${attr}]`)];

  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.getAttribute(attr) === preset);
  });

  if (preset === "none") {
    if (dueDateInput) {
      dueDateInput.value = "";
    }
    if (hintElement) {
      hintElement.textContent = "";
      hintElement.classList.add("is-hidden");
    }
    return;
  }

  const anchor = getFollowUpAnchorDate(visitDateInput, { requireVisitDate });
  if (!anchor.date) {
    if (hintElement) {
      hintElement.textContent = "Add visit date first.";
      hintElement.classList.remove("is-hidden");
    }
    return;
  }

  if (hintElement) {
    if (anchor.missingVisitDate) {
      hintElement.textContent = "No visit date entered — using today as the start date.";
      hintElement.classList.remove("is-hidden");
    } else {
      hintElement.textContent = "";
      hintElement.classList.add("is-hidden");
    }
  }

  if (preset === "6months" && dueDateInput) {
    dueDateInput.value = addMonths(anchor.date, 6);
  } else if (preset === "1year" && dueDateInput) {
    dueDateInput.value = addMonths(anchor.date, 12);
  } else if (preset === "custom" && dueDateInput) {
    dueDateInput.focus();
  }
}

function handleVisitLogFollowUpShortcutClick(event) {
  const button = event.target.closest("[data-follow-up-preset]");
  if (!button || !visitLogForm) {
    return;
  }
  event.preventDefault();
  applyFollowUpPreset({
    form: visitLogForm,
    preset: button.dataset.followUpPreset,
    mode: "follow-up",
    hintElement: visitLogFollowUpHint,
    requireVisitDate: false,
  });
}

function handleAppointmentFollowUpShortcutClick(event) {
  const button = event.target.closest("[data-next-visit-preset]");
  if (!button || !appointmentForm) {
    return;
  }
  event.preventDefault();
  applyFollowUpPreset({
    form: appointmentForm,
    preset: button.dataset.nextVisitPreset,
    mode: "next-visit",
    hintElement: appointmentFollowUpHint,
    requireVisitDate: false,
  });
  syncAppointmentPreview();
}

function formatFollowUpDueLabel(dateValue) {
  const followUpState = getFollowUpState(dateValue);
  if (!isValidIsoDate(dateValue)) {
    return "Not set";
  }
  if (followUpState === "overdue") {
    return `${formatDate(dateValue)} (Follow-up overdue)`;
  }
  if (followUpState === "soon") {
    return `${formatDate(dateValue)} (Follow-up soon)`;
  }
  return formatDate(dateValue);
}

function getAppointmentSummaries() {
  return getDisplayableAppointments()
    .map((appointment) => buildAppointmentSummary(appointment))
    .filter(Boolean)
    .sort((a, b) => compareOptionalDates(a.nextVisitDate, b.nextVisitDate));
}

function getProfileRecommendations() {
  const profileContext = {
    age: getProfileAge(),
    sexAtBirth: state.profile?.sexAtBirth || "",
    hasCervix: state.profile?.hasCervix || "",
    postmenopausal: state.profile?.postmenopausal || "",
    smokingStatus: state.profile?.smokingStatus || "",
    packYears: Number(state.profile?.packYears) || 0,
    yearsSinceQuit: Number(state.profile?.yearsSinceQuit) || 0,
    hasOverweightOrObesity: state.profile?.hasOverweightOrObesity || "",
  };

  if (profileContext.age === null) {
    return [];
  }

  const loggedKeys = new Set(
    state.appointments.flatMap((appointment) => {
      const titleKey = normalizeLookupKey(appointment.title);
      const specialtyKey = normalizeLookupKey(appointment.specialty);
      return [titleKey, specialtyKey].filter(Boolean);
    })
  );

  return RECOMMENDATION_LIBRARY.filter((item) => {
    if (!item.matches(profileContext)) {
      return false;
    }

    const recommendationKeys = [normalizeLookupKey(item.title), normalizeLookupKey(item.specialty)].filter(Boolean);
    return !recommendationKeys.some((key) => loggedKeys.has(key));
  });
}

function buildAppointmentSummary(appointment) {
  const normalizedHistory = getVisitLogsForAppointment(appointment).map((log) => ({
    ...log,
    provider: log.provider || appointment.doctor,
    specialty: log.specialty || appointment.specialty,
    clinic: log.clinic || appointment.clinic || extractClinicName(appointment.place),
    phone: log.phone || appointment.contactPhone,
    portalLink: log.portalLink || appointment.portalLink,
    insuranceAccepted: log.insuranceAccepted || appointment.insuranceAccepted,
  }));
  const lastVisitDate = getLatestVisitDate(normalizedHistory);
  const overrideDate = cleanText(appointment.nextRecommendedVisit);
  const anchorDate = cleanText(lastVisitDate) || cleanText(appointment.appointmentDate);
  const nextVisitDate = overrideDate || (anchorDate && appointment.intervalMonths ? addMonths(anchorDate, appointment.intervalMonths) : "");

  if (!nextVisitDate || !isValidIsoDate(nextVisitDate)) {
    return {
      ...appointment,
      visitHistory: normalizedHistory,
      lastVisitDate: lastVisitDate || "",
      nextVisitDate: "",
      nextVisitLabel: overrideDate ? "Manual override" : "Auto next visit",
      reminderStartDate: "",
      reminderStatus: "ok",
    };
  }

  const reminderStartDate = subtractDays(nextVisitDate, appointment.reminderDaysBefore);
  const today = todayString();

  let reminderStatus = "ok";
  if (appointment.reminderEnabled === false) {
    reminderStatus = "ok";
  } else if (nextVisitDate < today) {
    reminderStatus = "overdue";
  } else if (reminderStartDate <= today) {
    reminderStatus = "soon";
  }

  return {
    ...appointment,
    title: getRecordTitle(appointment),
    visitHistory: normalizedHistory,
    lastVisitDate: lastVisitDate || "",
    nextVisitDate,
    nextVisitLabel: overrideDate ? "Manual override" : "Auto next visit",
    reminderStartDate,
    reminderStatus,
  };
}

function syncAppointmentPreview() {
  if (!appointmentForm || !suggestionPreview || !reminderPreview) return;
  const latestVisitDate = getLatestVisitDate(editingVisitHistory);
  const appointmentDate = cleanText(appointmentForm.elements.appointmentDate.value);
  const nextRecommendedVisit = cleanText(appointmentForm.elements.nextRecommendedVisit.value);
  const repeatEnabled = appointmentForm.elements.repeatVisit?.checked;
  const intervalMonths = repeatEnabled ? numberOrFallback(appointmentForm.elements.intervalMonths.value, 0) : 0;
  const reminderDaysBefore = numberOrFallback(appointmentForm.elements.reminderDaysBefore.value, 0);
  const anchorDate = latestVisitDate || appointmentDate;

  if ((!anchorDate || !intervalMonths) && !nextRecommendedVisit) {
    suggestionPreview.textContent = "Next visit suggestion will appear here.";
    reminderPreview.textContent = "Reminder timing will appear here.";
    return;
  }

  const nextVisitDate = nextRecommendedVisit || addMonths(anchorDate, intervalMonths);
  const reminderStartDate = subtractDays(nextVisitDate, reminderDaysBefore);
  suggestionPreview.textContent = nextRecommendedVisit
    ? `Manual override: ${formatDate(nextVisitDate)}`
    : `Auto next visit: ${formatDate(nextVisitDate)}`;
  reminderPreview.textContent = `Reminder window starts ${formatDate(reminderStartDate)} (${reminderDaysBefore} day${reminderDaysBefore === 1 ? "" : "s"} before).`;
}

function requestNotificationPermission() {
  if (!("Notification" in window)) {
    notificationButton.textContent = "Notifications Not Supported";
    notificationButton.disabled = true;
    return;
  }

  Notification.requestPermission().then(() => {
    updateNotificationButton();
    maybeSendBrowserNotifications();
  });
}

function maybeSendBrowserNotifications() {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  const today = todayString();
  const sentOn = state.lastNotificationDate || "";
  if (sentOn === today) {
    return;
  }

  const reminderItems = getActiveReminderItems(getAppointmentSummaries());
  if (!reminderItems.length) {
    return;
  }

  const topItem = reminderItems[0];
  new Notification("Appointment reminder", {
    body: `${getRecordTitle(topItem)} is ${topItem.reminderStatus === "overdue" ? "overdue" : "coming up soon"}.`,
  });
  state.lastNotificationDate = today;
  persist();
}

function updateNotificationButton() {
  if (!notificationButton) return;
  if (!("Notification" in window)) {
    notificationButton.textContent = "Notifications Not Supported";
    notificationButton.disabled = true;
    return;
  }

  if (Notification.permission === "granted") {
    notificationButton.textContent = "Browser Notifications Enabled";
    return;
  }

  if (Notification.permission === "denied") {
    notificationButton.textContent = "Notifications Blocked";
    return;
  }

  notificationButton.textContent = "Enable Browser Notifications";
}

function switchScreen(target) {
  const previousScreen = screens.find((screen) => screen.classList.contains("is-active"))?.dataset.screen;
  screens.forEach((screen) => screen.classList.toggle("is-active", screen.dataset.screen === target));
  screenButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.screenTarget === target));
  if (target === "appointments" && previousScreen !== "appointments") {
    showVisitsList();
  }
  if (target === "care-plan" && previousScreen !== "care-plan") {
    showCarePlanList();
  }
}

function metricCard(label, value) {
  return `
    <article class="stat-card">
      <span>${escapeHtml(String(label))}</span>
      <strong>${escapeHtml(String(value))}</strong>
    </article>
  `;
}

function statusPill(source) {
  let label = "On track";
  let className = "on-track";
  let appointmentStatus = "";
  let reminderStatus = "";

  if (source && typeof source === "object") {
    appointmentStatus = source.appointmentStatus || source.status || "";
    reminderStatus = source.reminderStatus || "";
  } else if (typeof source === "string") {
    reminderStatus = source;
  }

  if (appointmentStatus === "Completed") {
    label = "Completed";
    className = "completed";
  } else if (appointmentStatus === "Scheduled") {
    label = "Scheduled";
    className = "scheduled";
  } else if (reminderStatus === "overdue") {
    label = "Overdue";
    className = "overdue";
  } else if (reminderStatus === "soon") {
    label = "Due soon";
    className = "soon";
  }

  return `<span class="pill ${className}">${label}</span>`;
}

function loadState() {
  const emptyState = getEmptyState();

  try {
    const rawSavedState = localStorage.getItem(STORAGE_KEY);
    if (!rawSavedState) {
      return emptyState;
    }

    const saved = JSON.parse(rawSavedState);
    const savedData = saved?.version && saved?.data ? saved.data : saved;
    return normalizeState(savedData);
  } catch (error) {
    console.warn("Could not load saved tracker data. Trying backup.", error);
  }

  try {
    const rawBackupState = localStorage.getItem(STORAGE_BACKUP_KEY);
    if (!rawBackupState) {
      return emptyState;
    }
    const backup = JSON.parse(rawBackupState);
    const backupData = backup?.version && backup?.data ? backup.data : backup;
    return normalizeState(backupData);
  } catch (error) {
    console.warn("Could not load backup tracker data.", error);
    return emptyState;
  }
}

function getEmptyState() {
  return {
    appointments: [],
    visitLogs: [],
    carePlan: [],
    providers: [],
    insurance: {},
    profile: {},
    deletedSeedKeys: [],
    deletedCarePlanSeedKeys: [],
    lastNotificationDate: "",
  };
}

function normalizeState(saved) {
  const emptyState = getEmptyState();
  const normalizedAppointments = normalizeAppointments(Array.isArray(saved?.appointments) ? saved.appointments : []);
  const normalizedVisitLogs = normalizeVisitLogs(Array.isArray(saved?.visitLogs) ? saved.visitLogs : []);
  const migrated = migrateVisitLogsAndCleanupAppointments(normalizedAppointments, normalizedVisitLogs);

  return {
    ...emptyState,
    appointments: migrated.appointments,
    visitLogs: migrated.visitLogs,
    providers: Array.isArray(saved?.providers)
      ? saved.providers.map(normalizeProvider).filter(Boolean)
      : [],
    insurance: saved?.insurance && typeof saved.insurance === "object" ? saved.insurance : {},
    profile: saved?.profile && typeof saved.profile === "object" ? saved.profile : {},
    deletedSeedKeys: Array.isArray(saved?.deletedSeedKeys)
      ? saved.deletedSeedKeys.map((item) => cleanText(item)).filter(Boolean)
      : [],
    carePlan: Array.isArray(saved?.carePlan)
      ? saved.carePlan
          .map((item) =>
            normalizeCarePlanItem(
              item,
              Array.isArray(saved?.providers) ? saved.providers.map(normalizeProvider).filter(Boolean) : []
            )
          )
          .filter(Boolean)
      : [],
    deletedCarePlanSeedKeys: Array.isArray(saved?.deletedCarePlanSeedKeys)
      ? saved.deletedCarePlanSeedKeys.map((item) => cleanText(item)).filter(Boolean)
      : [],
    lastNotificationDate: cleanText(saved?.lastNotificationDate),
  };
}

function normalizeProvider(provider) {
  const name = getProviderRecordName(provider);
  const specialty = cleanText(provider?.specialty);
  const clinic = cleanText(provider?.clinic) || cleanText(provider?.place);
  if (!name) {
    return null;
  }

  const specialtyKey = specialty || "General";

  return {
    id: cleanText(provider.id) || crypto.randomUUID(),
    key: cleanText(provider.key) || normalizeLookupKey(`${name}|${specialtyKey}|${clinic || "unspecified"}`),
    name,
    doctor: name,
    specialty,
    clinic,
    address: cleanText(provider.address) || cleanText(provider.place),
    phone: cleanText(provider.phone) || cleanText(provider.contactPhone),
    insuranceAccepted: cleanText(provider.insuranceAccepted),
    portalLink: cleanText(provider.portalLink),
    notes: cleanText(provider.notes),
    createdAt: cleanText(provider.createdAt) || new Date().toISOString(),
    updatedAt: cleanText(provider.updatedAt) || "",
  };
}

function persist() {
  try {
    const existingState = localStorage.getItem(STORAGE_KEY);
    if (existingState) {
      localStorage.setItem(STORAGE_BACKUP_KEY, existingState);
    }
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: STORAGE_VERSION,
        savedAt: new Date().toISOString(),
        data: normalizeState(state),
      })
    );
  } catch (error) {
    console.warn("Could not save tracker data to localStorage.", error);
  }
}

function exportBackup() {
  try {
    const payload = JSON.stringify({ version: STORAGE_VERSION, savedAt: new Date().toISOString(), data: normalizeState(state) }, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "medical-appointment-tracker-backup.json";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.warn("Could not export backup.", error);
    alert("Unable to export backup. Please try again.");
  }
}

function handleImportBackupFile(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      const importedData = imported?.version && imported?.data ? imported.data : imported;
      const normalized = normalizeState(importedData);
      Object.assign(state, normalized);
      persist();
      render();
      alert("Backup imported successfully.");
    } catch (error) {
      console.warn("Could not import backup.", error);
      alert("Unable to import backup. Please select a valid JSON file.");
    } finally {
      if (importBackupInput) {
        importBackupInput.value = "";
      }
    }
  };
  reader.readAsText(file);
}

function normalizeCarePlanItem(item, providers = state.providers || []) {
  const name = cleanText(item?.name);
  if (!name) {
    return null;
  }

  const rawFrequencyMonths = item?.frequencyMonths;
  const frequencyMonths =
    rawFrequencyMonths === null || rawFrequencyMonths === undefined || rawFrequencyMonths === ""
      ? null
      : numberOrFallback(rawFrequencyMonths, null);

  let providerId = cleanText(item?.providerId);
  let providerName = cleanText(item?.providerName) || cleanText(item?.provider);

  if (providerId) {
    const linkedProvider = providers.find((provider) => provider.id === providerId);
    if (linkedProvider) {
      if (!providerName) {
        providerName = linkedProvider.doctor;
      }
    } else {
      providerId = "";
    }
  }

  return {
    id: cleanText(item.id) || crypto.randomUUID(),
    key: cleanText(item.key) || normalizeLookupKey(name),
    category: cleanText(item.category) || "General",
    name,
    summary: cleanText(item.summary),
    frequency: cleanText(item.frequency),
    frequencyMonths,
    lastCompletedDate: cleanText(item.lastCompletedDate),
    nextDueDate: cleanText(item.nextDueDate),
    nextDueLabel: cleanText(item.nextDueLabel),
    scheduledDate: cleanText(item.scheduledDate),
    scheduledTime: cleanText(item.scheduledTime),
    providerId,
    providerName,
    provider: providerName,
    place: cleanText(item.place),
    notes: cleanText(item.notes),
    isOptional: Boolean(item.isOptional),
    createdAt: cleanText(item.createdAt) || new Date().toISOString(),
    updatedAt: cleanText(item.updatedAt) || "",
  };
}

function providerNamesMatch(leftValue, rightValue) {
  const left = cleanText(leftValue).toLowerCase();
  const right = cleanText(rightValue).toLowerCase();
  if (!left || !right) {
    return false;
  }
  const leftPrimary = left.split(/[;,]/)[0].trim();
  const rightPrimary = right.split(/[;,]/)[0].trim();
  return left === right || leftPrimary === rightPrimary || left.includes(rightPrimary) || right.includes(leftPrimary);
}

function findCareTeamProviderByCarePlanText(providerText, providers = getAllProviders()) {
  const providerName = cleanText(providerText);
  if (!providerName) {
    return null;
  }

  return (
    providers.find((provider) => providerNamesMatch(providerName, getProviderRecordName(provider))) ||
    providers.find((provider) => {
      const doctor = getProviderRecordName(provider).toLowerCase();
      const needle = providerName.toLowerCase();
      return needle.includes(doctor) || doctor.includes(needle.split(/[;,]/)[0].trim());
    }) ||
    null
  );
}

function getCarePlanProviderDisplayName(item) {
  if (!item) {
    return "Not saved";
  }

  if (item.providerId) {
    const provider = getAllProviders().find((entry) => entry.id === item.providerId);
    if (provider) {
      return formatProviderDropdownLabel(getProviderRecordName(provider), provider.specialty);
    }
  }

  return cleanText(item.providerName) || cleanText(item.provider) || "Not saved";
}

function getCarePlanLegacyProviderValue(providerText) {
  return `${CARE_PLAN_LEGACY_PROVIDER_PREFIX}${encodeURIComponent(providerText)}`;
}

function decodeCarePlanLegacyProviderValue(value) {
  if (!value.startsWith(CARE_PLAN_LEGACY_PROVIDER_PREFIX)) {
    return "";
  }
  try {
    return decodeURIComponent(value.slice(CARE_PLAN_LEGACY_PROVIDER_PREFIX.length));
  } catch (error) {
    return value.slice(CARE_PLAN_LEGACY_PROVIDER_PREFIX.length);
  }
}

function shouldShowCarePlanLegacyOption(savedProviderName, savedProviderId, providers = getAllProviders()) {
  const providerName = cleanText(savedProviderName);
  if (!providerName) {
    return false;
  }

  if (savedProviderId) {
    const linkedProvider = providers.find((provider) => provider.id === savedProviderId);
    if (linkedProvider && providerNamesMatch(providerName, linkedProvider.doctor)) {
      return false;
    }
    return true;
  }

  return !findCareTeamProviderByCarePlanText(providerName, providers);
}

function buildCarePlanProviderSelectOptions({ savedProviderName = "", savedProviderId = "" } = {}) {
  const lines = [`<option value="">No provider selected</option>`];

  getAllProviders().forEach((provider) => {
    lines.push(
      `<option value="${PROVIDER_OPTION_PREFIX}${escapeHtml(provider.id)}">${escapeHtml(
        formatProviderDropdownLabel(getProviderRecordName(provider), provider.specialty)
      )}</option>`
    );
  });

  if (shouldShowCarePlanLegacyOption(savedProviderName, savedProviderId)) {
    const legacyValue = getCarePlanLegacyProviderValue(savedProviderName);
    lines.push(
      `<option value="${escapeHtml(legacyValue)}">${escapeHtml(savedProviderName)} (saved text)</option>`
    );
  }

  lines.push(`<option value="${NEW_PROVIDER_OPTION}">+ Add new provider</option>`);
  return lines.join("");
}

function getCarePlanProviderSelectValue(item) {
  if (!item) {
    return "";
  }

  if (item.providerId && getAllProviders().some((provider) => provider.id === item.providerId)) {
    return `${PROVIDER_OPTION_PREFIX}${item.providerId}`;
  }

  const providerName = cleanText(item.providerName) || cleanText(item.provider);
  if (!providerName) {
    return "";
  }

  const matchedProvider = findCareTeamProviderByCarePlanText(providerName);
  if (matchedProvider) {
    return `${PROVIDER_OPTION_PREFIX}${matchedProvider.id}`;
  }

  return getCarePlanLegacyProviderValue(providerName);
}

function resolveCarePlanProviderFromForm(selectionValue) {
  const selection = cleanText(selectionValue);
  if (!selection) {
    return { providerId: "", providerName: "" };
  }

  if (selection.startsWith(CARE_PLAN_LEGACY_PROVIDER_PREFIX)) {
    return {
      providerId: "",
      providerName: decodeCarePlanLegacyProviderValue(selection),
    };
  }

  if (selection.startsWith(PROVIDER_OPTION_PREFIX)) {
    const provider = getProviderFromSelectValue(selection);
    return {
      providerId: provider?.id || "",
      providerName: provider?.doctor || "",
    };
  }

  return { providerId: "", providerName: "" };
}

function renderCarePlanProviderSelect(item = null) {
  if (!carePlanProviderSelect) {
    return;
  }

  const savedProviderName = cleanText(item?.providerName) || cleanText(item?.provider);
  const savedProviderId = cleanText(item?.providerId);
  const selectedValue = getCarePlanProviderSelectValue(item);
  carePlanProviderSelect.innerHTML = buildCarePlanProviderSelectOptions({
    savedProviderName,
    savedProviderId,
  });

  if (selectedValue && [...carePlanProviderSelect.options].some((option) => option.value === selectedValue)) {
    carePlanProviderSelect.value = selectedValue;
  } else {
    carePlanProviderSelect.value = "";
  }
  carePlanProviderSelect.dataset.lastValue = carePlanProviderSelect.value;
}

function handleCarePlanProviderSelectChange() {
  if (!carePlanProviderSelect) {
    return;
  }

  if (carePlanProviderSelect.value === NEW_PROVIDER_OPTION) {
    carePlanProviderSelect.value = carePlanProviderSelect.dataset.lastValue || "";
    pendingProviderSelection = { target: "carePlan", carePlanId: editingCarePlanId };
    openCareTeamForNewProvider("carePlan");
    return;
  }

  carePlanProviderSelect.dataset.lastValue = carePlanProviderSelect.value;
}

function addDeletedCarePlanSeedKey(seedKey) {
  const key = cleanText(seedKey);
  if (!key) {
    return;
  }
  state.deletedCarePlanSeedKeys = Array.isArray(state.deletedCarePlanSeedKeys)
    ? state.deletedCarePlanSeedKeys
    : [];
  if (!state.deletedCarePlanSeedKeys.includes(key)) {
    state.deletedCarePlanSeedKeys.push(key);
  }
}

function deleteCarePlanItem(itemId) {
  const item = state.carePlan.find((entry) => entry.id === itemId);
  if (!item) {
    return;
  }

  if (!window.confirm(CARE_PLAN_DELETE_CONFIRM)) {
    return;
  }

  if (item.key) {
    addDeletedCarePlanSeedKey(item.key);
  }

  state.carePlan = state.carePlan.filter((entry) => entry.id !== itemId);
  if (editingCarePlanId === itemId) {
    editingCarePlanId = "";
  }
  persist();
  showCarePlanList();
  render();
}

function mergeInitialCarePlan() {
  state.carePlan = Array.isArray(state.carePlan)
    ? state.carePlan.map(normalizeCarePlanItem).filter(Boolean)
    : [];
  state.deletedCarePlanSeedKeys = Array.isArray(state.deletedCarePlanSeedKeys)
    ? state.deletedCarePlanSeedKeys.map((item) => cleanText(item)).filter(Boolean)
    : [];

  const existingKeys = new Set(state.carePlan.map((item) => item.key));
  const deletedSeedKeys = new Set(state.deletedCarePlanSeedKeys);
  let changed = false;

  INITIAL_CARE_PLAN.forEach((seed) => {
    const lookupKey = cleanText(seed.key);
    if (!lookupKey || deletedSeedKeys.has(lookupKey) || existingKeys.has(lookupKey)) {
      return;
    }

    state.carePlan.push(
      normalizeCarePlanItem({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: "",
        ...seed,
      })
    );
    existingKeys.add(lookupKey);
    changed = true;
  });

  if (changed) {
    state.carePlan = state.carePlan.map(normalizeCarePlanItem).filter(Boolean);
    persist();
  }
}

function getCarePlanStatus(item) {
  const today = todayString();
  const scheduledDate = cleanText(item.scheduledDate);
  if (isValidIsoDate(scheduledDate) && scheduledDate >= today) {
    return "scheduled";
  }

  const nextDueDate = cleanText(item.nextDueDate);
  if (isValidIsoDate(nextDueDate)) {
    if (nextDueDate < today) {
      return "overdue";
    }
    if (nextDueDate <= addDays(today, 14)) {
      return "due-soon";
    }
  }

  const lastCompletedDate = cleanText(item.lastCompletedDate);
  if (isValidIsoDate(lastCompletedDate) && lastCompletedDate >= subtractDays(today, 45)) {
    if (!isValidIsoDate(nextDueDate) || nextDueDate > today) {
      return "completed";
    }
  }

  if (item.isOptional) {
    return "optional";
  }

  return "on-track";
}

function carePlanStatusPill(status) {
  const labels = {
    overdue: { label: "Overdue", className: "overdue" },
    "due-soon": { label: "Due soon", className: "soon" },
    scheduled: { label: "Scheduled", className: "scheduled" },
    completed: { label: "Completed", className: "completed" },
    optional: { label: "Optional", className: "on-track" },
    "on-track": { label: "On track", className: "on-track" },
  };
  const entry = labels[status] || labels["on-track"];
  return `<span class="pill ${entry.className}">${entry.label}</span>`;
}

function formatCarePlanNextDue(item) {
  const nextDueDate = cleanText(item.nextDueDate);
  if (isValidIsoDate(nextDueDate)) {
    const status = getCarePlanStatus(item);
    if (status === "overdue") {
      return `${formatDate(nextDueDate)} (Overdue)`;
    }
    if (status === "due-soon") {
      return `${formatDate(nextDueDate)} (Due soon)`;
    }
    return formatDate(nextDueDate);
  }
  return cleanText(item.nextDueLabel) || "Not set";
}

function getCarePlanSearchHaystack(item) {
  return [
    item.category,
    item.name,
    item.summary,
    item.frequency,
    item.providerName,
    item.provider,
    getCarePlanProviderDisplayName(item),
    item.place,
    item.notes,
    item.nextDueLabel,
  ]
    .map((value) => cleanText(value).toLowerCase())
    .filter(Boolean)
    .join(" ");
}

function getFilteredCarePlanItems() {
  const query = cleanText(carePlanSearchInput?.value).toLowerCase();
  return (state.carePlan || [])
    .map((item) => ({ ...item, computedStatus: getCarePlanStatus(item) }))
    .filter((item) => {
      if (query && !getCarePlanSearchHaystack(item).includes(query)) {
        return false;
      }
      if (activeCarePlanFilter === "all") {
        return true;
      }
      if (activeCarePlanFilter === "due-soon") {
        return item.computedStatus === "due-soon";
      }
      if (activeCarePlanFilter === "overdue") {
        return item.computedStatus === "overdue";
      }
      if (activeCarePlanFilter === "scheduled") {
        return item.computedStatus === "scheduled";
      }
      if (activeCarePlanFilter === "completed") {
        return item.computedStatus === "completed";
      }
      if (activeCarePlanFilter === "optional") {
        return item.isOptional || item.computedStatus === "optional";
      }
      return true;
    })
    .sort((a, b) => {
      const categoryCompare = a.category.localeCompare(b.category);
      if (categoryCompare !== 0) {
        return categoryCompare;
      }
      return compareOptionalDates(a.nextDueDate, b.nextDueDate) || a.name.localeCompare(b.name);
    });
}

function groupCarePlanByCategory(items) {
  const groups = new Map();
  items.forEach((item) => {
    const category = item.category || "General";
    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category).push(item);
  });
  return [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

function renderCarePlan() {
  if (!carePlanList) {
    return;
  }

  carePlanFilterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.carePlanFilter === activeCarePlanFilter);
  });

  const items = getFilteredCarePlanItems();
  if (!items.length) {
    carePlanList.classList.add("empty-state");
    carePlanList.innerHTML = `<p class="muted">No care plan items match this view.</p>`;
    return;
  }

  carePlanList.classList.remove("empty-state");
  const groups = groupCarePlanByCategory(items);
  carePlanList.innerHTML = groups
    .map(
      ([category, categoryItems]) => `
        <section class="care-plan-category">
          <h3>${escapeHtml(category)}</h3>
          ${categoryItems.map((item) => renderCarePlanCard(item)).join("")}
        </section>
      `
    )
    .join("");
}

function renderCarePlanCard(item) {
  const status = item.computedStatus || getCarePlanStatus(item);
  const scheduledLine = isValidIsoDate(item.scheduledDate)
    ? formatAppointmentDateTime(item.scheduledDate, item.scheduledTime)
    : "Not scheduled";

  return `
    <article class="summary-card care-plan-card status-${escapeHtml(status)}">
      <div class="card-head">
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <span class="meta">${escapeHtml(item.summary || "No summary saved")}</span>
          <span class="meta">Frequency: ${escapeHtml(item.frequency || "Not set")}</span>
        </div>
        ${carePlanStatusPill(status)}
      </div>
      <div class="detail-grid">
        <span><strong>Next due</strong>${escapeHtml(formatCarePlanNextDue(item))}</span>
        <span><strong>Last completed</strong>${formatDate(item.lastCompletedDate)}</span>
        <span><strong>Scheduled</strong>${escapeHtml(scheduledLine)}</span>
        <span><strong>Provider</strong>${escapeHtml(getCarePlanProviderDisplayName(item))}</span>
        <span><strong>Place</strong>${escapeHtml(item.place || "Not saved")}</span>
        <span><strong>Notes</strong>${escapeHtml(item.notes || "Not saved")}</span>
      </div>
      <div class="care-plan-card-actions">
        <button class="button-secondary" type="button" data-care-plan-action="edit" data-care-plan-id="${escapeHtml(item.id)}">Edit</button>
        <button class="button-danger-outline" type="button" data-care-plan-action="delete" data-care-plan-id="${escapeHtml(item.id)}">Delete</button>
        <button class="button-primary" type="button" data-care-plan-action="log-visit" data-care-plan-id="${escapeHtml(item.id)}">Log Visit</button>
        <button class="button-secondary" type="button" data-care-plan-action="schedule" data-care-plan-id="${escapeHtml(item.id)}">Schedule Appointment</button>
        <button class="button-secondary" type="button" data-care-plan-action="complete" data-care-plan-id="${escapeHtml(item.id)}">Mark Complete</button>
      </div>
      <div class="follow-up-section">
        <p class="eyebrow">Set next due</p>
        <div class="follow-up-shortcut-row">
          <button type="button" class="button-secondary follow-up-shortcut" data-care-plan-action="due-3" data-care-plan-id="${escapeHtml(item.id)}">3 months</button>
          <button type="button" class="button-secondary follow-up-shortcut" data-care-plan-action="due-6" data-care-plan-id="${escapeHtml(item.id)}">6 months</button>
          <button type="button" class="button-secondary follow-up-shortcut" data-care-plan-action="due-12" data-care-plan-id="${escapeHtml(item.id)}">1 year</button>
          <button type="button" class="button-secondary follow-up-shortcut" data-care-plan-action="due-custom" data-care-plan-id="${escapeHtml(item.id)}">Custom date</button>
        </div>
      </div>
    </article>
  `;
}

function showCarePlanView(view) {
  carePlanPanels.forEach((panel) => {
    panel.classList.toggle("is-hidden", panel.dataset.carePlanView !== view);
    panel.classList.toggle("is-active", panel.dataset.carePlanView === view);
  });
}

function showCarePlanList() {
  editingCarePlanId = "";
  showCarePlanView("list");
  renderCarePlan();
}

function openCarePlanForm(itemId = "") {
  switchScreen("care-plan");
  showCarePlanView("form");
  renderAllProviderDropdowns();
  const item = state.carePlan.find((entry) => entry.id === itemId);
  if (item) {
    fillCarePlanForm(item);
  } else {
    resetCarePlanForm();
  }
}

function resetCarePlanForm() {
  editingCarePlanId = "";
  if (!carePlanForm) {
    return;
  }
  carePlanForm.reset();
  carePlanForm.elements.carePlanId.value = "";
  if (carePlanForm.elements.isOptional) {
    carePlanForm.elements.isOptional.checked = false;
  }
  carePlanFormTitle.textContent = "Add care plan item";
  carePlanSubmitButton.textContent = "Save Care Plan Item";
  carePlanCancelButton.classList.add("is-hidden");
  if (carePlanDeleteButton) {
    carePlanDeleteButton.classList.add("is-hidden");
  }
  renderCarePlanProviderSelect(null);
  if (carePlanNextDueHint) {
    carePlanNextDueHint.textContent = "";
    carePlanNextDueHint.classList.add("is-hidden");
  }
  syncCarePlanDueShortcutButtons();
}

function fillCarePlanForm(item) {
  editingCarePlanId = item.id;
  carePlanForm.elements.carePlanId.value = item.id;
  carePlanForm.elements.category.value = item.category || "";
  carePlanForm.elements.name.value = item.name || "";
  carePlanForm.elements.summary.value = item.summary || "";
  carePlanForm.elements.frequency.value = item.frequency || "";
  carePlanForm.elements.frequencyMonths.value =
    item.frequencyMonths === null || item.frequencyMonths === undefined ? "" : String(item.frequencyMonths);
  carePlanForm.elements.lastCompletedDate.value = item.lastCompletedDate || "";
  carePlanForm.elements.nextDueDate.value = item.nextDueDate || "";
  carePlanForm.elements.nextDueLabel.value = item.nextDueLabel || "";
  carePlanForm.elements.scheduledDate.value = item.scheduledDate || "";
  carePlanForm.elements.scheduledTime.value = item.scheduledTime || "";
  carePlanForm.elements.place.value = item.place || "";
  carePlanForm.elements.notes.value = item.notes || "";
  if (carePlanForm.elements.isOptional) {
    carePlanForm.elements.isOptional.checked = Boolean(item.isOptional);
  }
  carePlanFormTitle.textContent = "Edit care plan item";
  carePlanSubmitButton.textContent = "Update Care Plan Item";
  carePlanCancelButton.classList.remove("is-hidden");
  if (carePlanDeleteButton) {
    carePlanDeleteButton.classList.remove("is-hidden");
  }
  renderCarePlanProviderSelect(item);
  syncCarePlanDueShortcutButtons();
}

function handleCarePlanSubmit(event) {
  event.preventDefault();
  const formData = new FormData(carePlanForm);
  const name = cleanText(formData.get("name"));
  if (!name) {
    return;
  }

  const rawFrequencyMonths = cleanText(formData.get("frequencyMonths"));
  const frequencyMonths = rawFrequencyMonths ? numberOrFallback(rawFrequencyMonths, null) : null;
  const itemId = cleanText(formData.get("carePlanId")) || crypto.randomUUID();
  const existing = state.carePlan.find((entry) => entry.id === itemId);
  const providerFields = resolveCarePlanProviderFromForm(cleanText(formData.get("carePlanProvider")));
  const nextItem = normalizeCarePlanItem({
    id: itemId,
    key: existing?.key || normalizeLookupKey(name),
    category: cleanText(formData.get("category")),
    name,
    summary: cleanText(formData.get("summary")),
    frequency: cleanText(formData.get("frequency")),
    frequencyMonths,
    lastCompletedDate: cleanText(formData.get("lastCompletedDate")),
    nextDueDate: cleanText(formData.get("nextDueDate")),
    nextDueLabel: cleanText(formData.get("nextDueLabel")),
    scheduledDate: cleanText(formData.get("scheduledDate")),
    scheduledTime: cleanText(formData.get("scheduledTime")),
    providerId: providerFields.providerId,
    providerName: providerFields.providerName,
    place: cleanText(formData.get("place")),
    notes: cleanText(formData.get("notes")),
    isOptional: formData.get("isOptional") === "on",
    createdAt: existing?.createdAt,
    updatedAt: new Date().toISOString(),
  });

  if (!nextItem) {
    return;
  }

  const existingIndex = state.carePlan.findIndex((entry) => entry.id === itemId);
  if (existingIndex >= 0) {
    state.carePlan[existingIndex] = nextItem;
  } else {
    state.carePlan.unshift(nextItem);
  }

  persist();
  showCarePlanList();
}

function handleCarePlanListClick(event) {
  const button = event.target.closest("[data-care-plan-action]");
  if (!button) {
    return;
  }

  const action = button.dataset.carePlanAction;
  const itemId = button.dataset.carePlanId;
  const item = state.carePlan.find((entry) => entry.id === itemId);
  if (!item) {
    return;
  }

  event.preventDefault();

  if (action === "log-visit") {
    openVisitLogFromCarePlan(item);
    return;
  }
  if (action === "schedule") {
    openAppointmentFromCarePlan(item);
    return;
  }
  if (action === "edit") {
    openCarePlanForm(item.id);
    return;
  }
  if (action === "delete") {
    deleteCarePlanItem(item.id);
    return;
  }
  if (action === "complete") {
    markCarePlanComplete(item.id);
    return;
  }
  if (action === "due-3") {
    setCarePlanNextDueFromMonths(item.id, 3);
    return;
  }
  if (action === "due-6") {
    setCarePlanNextDueFromMonths(item.id, 6);
    return;
  }
  if (action === "due-12") {
    setCarePlanNextDueFromMonths(item.id, 12);
    return;
  }
  if (action === "due-custom") {
    setCarePlanNextDueCustom(item.id);
  }
}

function markCarePlanComplete(itemId) {
  const item = state.carePlan.find((entry) => entry.id === itemId);
  if (!item) {
    return;
  }

  const today = todayString();
  item.lastCompletedDate = today;
  if (item.frequencyMonths) {
    item.nextDueDate = addMonths(today, item.frequencyMonths);
    item.nextDueLabel = "";
  }
  item.updatedAt = new Date().toISOString();
  persist();
  render();
}

function setCarePlanNextDueFromMonths(itemId, months) {
  const item = state.carePlan.find((entry) => entry.id === itemId);
  if (!item) {
    return;
  }

  const anchor =
    (isValidIsoDate(item.lastCompletedDate) && item.lastCompletedDate) ||
    (isValidIsoDate(item.nextDueDate) && item.nextDueDate) ||
    todayString();
  item.nextDueDate = addMonths(anchor, months);
  item.nextDueLabel = "";
  item.updatedAt = new Date().toISOString();
  persist();
  render();
}

function setCarePlanNextDueCustom(itemId) {
  const item = state.carePlan.find((entry) => entry.id === itemId);
  if (!item) {
    return;
  }

  const current = item.nextDueDate || todayString();
  const entered = window.prompt("Enter next due date (YYYY-MM-DD):", current);
  if (!entered) {
    return;
  }

  const normalized = cleanText(entered);
  if (!isValidIsoDate(normalized)) {
    alert("Please enter a valid date in YYYY-MM-DD format.");
    return;
  }

  item.nextDueDate = normalized;
  item.nextDueLabel = "";
  item.updatedAt = new Date().toISOString();
  persist();
  render();
}

function getCarePlanDueAnchorDate() {
  const lastCompleted = cleanText(carePlanForm?.elements.lastCompletedDate?.value);
  if (isValidIsoDate(lastCompleted)) {
    return { date: lastCompleted, missingAnchor: false };
  }
  return { date: todayString(), missingAnchor: true };
}

function syncCarePlanDueShortcutButtons() {
  if (!carePlanForm) {
    return;
  }

  const dueDate = cleanText(carePlanForm.elements.nextDueDate?.value);
  const buttons = [...carePlanForm.querySelectorAll("[data-care-plan-due-preset]")];
  buttons.forEach((button) => button.classList.remove("is-active"));

  if (!isValidIsoDate(dueDate)) {
    buttons.find((button) => button.dataset.carePlanDuePreset === "none")?.classList.add("is-active");
    return;
  }

  const anchor = getCarePlanDueAnchorDate();
  const threeMonthDate = addMonths(anchor.date, 3);
  const sixMonthDate = addMonths(anchor.date, 6);
  const oneYearDate = addMonths(anchor.date, 12);

  if (dueDate === threeMonthDate) {
    buttons.find((button) => button.dataset.carePlanDuePreset === "3months")?.classList.add("is-active");
  } else if (dueDate === sixMonthDate) {
    buttons.find((button) => button.dataset.carePlanDuePreset === "6months")?.classList.add("is-active");
  } else if (dueDate === oneYearDate) {
    buttons.find((button) => button.dataset.carePlanDuePreset === "1year")?.classList.add("is-active");
  } else {
    buttons.find((button) => button.dataset.carePlanDuePreset === "custom")?.classList.add("is-active");
  }
}

function applyCarePlanDuePreset(preset) {
  if (!carePlanForm) {
    return;
  }

  const buttons = [...carePlanForm.querySelectorAll("[data-care-plan-due-preset]")];
  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.carePlanDuePreset === preset);
  });

  if (preset === "none") {
    carePlanForm.elements.nextDueDate.value = "";
    if (carePlanNextDueHint) {
      carePlanNextDueHint.textContent = "";
      carePlanNextDueHint.classList.add("is-hidden");
    }
    return;
  }

  const anchor = getCarePlanDueAnchorDate();
  if (carePlanNextDueHint) {
    if (anchor.missingAnchor) {
      carePlanNextDueHint.textContent = "No last completed date — using today as the start date.";
      carePlanNextDueHint.classList.remove("is-hidden");
    } else {
      carePlanNextDueHint.textContent = "";
      carePlanNextDueHint.classList.add("is-hidden");
    }
  }

  if (preset === "3months") {
    carePlanForm.elements.nextDueDate.value = addMonths(anchor.date, 3);
  } else if (preset === "6months") {
    carePlanForm.elements.nextDueDate.value = addMonths(anchor.date, 6);
  } else if (preset === "1year") {
    carePlanForm.elements.nextDueDate.value = addMonths(anchor.date, 12);
  } else if (preset === "custom") {
    carePlanForm.elements.nextDueDate.focus();
  }
}

function handleCarePlanDueShortcutClick(event) {
  const button = event.target.closest("[data-care-plan-due-preset]");
  if (!button || !carePlanForm) {
    return;
  }
  event.preventDefault();
  applyCarePlanDuePreset(button.dataset.carePlanDuePreset);
}

function applyCarePlanVisitLogCompletion(carePlanItemId, visitDate) {
  const item = state.carePlan.find((entry) => entry.id === carePlanItemId);
  if (!item) {
    return;
  }

  const completedDate = isValidIsoDate(visitDate) ? visitDate : todayString();
  item.lastCompletedDate = completedDate;
  if (item.frequencyMonths) {
    item.nextDueDate = addMonths(completedDate, item.frequencyMonths);
    item.nextDueLabel = "";
  }
  item.updatedAt = new Date().toISOString();
}

function applyCarePlanAppointmentScheduled(carePlanItemId, appointment) {
  const item = state.carePlan.find((entry) => entry.id === carePlanItemId);
  if (!item) {
    return;
  }

  const appointmentDate = cleanText(appointment.appointmentDate);
  const appointmentTime = cleanText(appointment.appointmentTime);
  if (appointmentDate) {
    item.scheduledDate = appointmentDate;
  }
  if (appointmentTime) {
    item.scheduledTime = appointmentTime;
  }
  if (isValidIsoDate(appointmentDate)) {
    item.nextDueDate = appointmentDate;
    item.nextDueLabel = "";
  }
  item.updatedAt = new Date().toISOString();
}

function openVisitLogFromCarePlan(item) {
  pendingCarePlanItemId = item.id;
  switchScreen("appointments");
  showVisitsView("visit-log-form");
  setAddEditMode("visit-log");
  resetVisitLogForm();
  renderAllProviderDropdowns();
  visitLogForm.elements.date.value = todayString();
  visitLogForm.elements.reason.value = item.name || "";
  visitLogForm.elements.summary.value = [item.summary, item.notes].filter(Boolean).join("\n\n");
  setVisitLogProviderFromCarePlan(item);
  const clinicFromPlan = extractClinicName(item.place) || cleanText(item.place);
  if (clinicFromPlan && !cleanText(visitLogForm.elements.clinic.value)) {
    visitLogForm.elements.clinic.value = clinicFromPlan;
  }
  const linkedProvider = item.providerId
    ? getAllProviders().find((provider) => provider.id === item.providerId)
    : findCareTeamProviderByCarePlanText(item.providerName || item.provider);
  const specialtyValue = linkedProvider?.specialty || item.category || "";
  setSelectWithCustomValue(visitLogSpecialtySelect, visitLogForm.elements.customSpecialty, specialtyValue);
  syncVisitLogCustomSpecialtyVisibility();
}

function openAppointmentFromCarePlan(item) {
  pendingCarePlanItemId = item.id;
  switchScreen("appointments");
  showVisitsView("appointment-form");
  setAddEditMode("appointment");
  resetAppointmentForm();
  renderAllProviderDropdowns();
  setAppointmentDoctorFromCarePlan(item);
  const linkedProvider = item.providerId
    ? getAllProviders().find((provider) => provider.id === item.providerId)
    : findCareTeamProviderByCarePlanText(item.providerName || item.provider);
  const specialtyValue = linkedProvider?.specialty || item.category || "";
  setSelectWithCustomValue(specialtySelect, appointmentForm.elements.customSpecialty, specialtyValue);
  setSelectWithCustomValue(reasonSelect, appointmentForm.elements.customReasonForVisit, item.name || "");
  appointmentForm.elements.place.value = item.place || linkedProvider?.address || "";
  appointmentForm.elements.clinic.value =
    extractClinicName(item.place) || linkedProvider?.clinic || extractClinicName(linkedProvider?.address) || "";
  appointmentForm.elements.appointmentDate.value = item.scheduledDate || item.nextDueDate || "";
  appointmentForm.elements.appointmentTime.value = item.scheduledTime || "";
  appointmentForm.elements.appointmentStatus.value =
    item.scheduledDate || item.nextDueDate ? "Scheduled" : "Planned";
  appointmentForm.elements.notes.value = [item.summary, item.notes].filter(Boolean).join("\n\n");
  if (isValidIsoDate(item.nextDueDate)) {
    appointmentForm.elements.nextRecommendedVisit.value = item.nextDueDate;
  }
  syncCustomFieldVisibility();
  syncAppointmentPreview();
  syncFollowUpShortcutButtons(appointmentForm, "next-visit");
}

function setVisitLogProviderFromCarePlan(item) {
  if (item.providerId && getAllProviders().some((provider) => provider.id === item.providerId)) {
    visitLogProviderSelect.value = `${PROVIDER_OPTION_PREFIX}${item.providerId}`;
    syncVisitLogProviderSelection();
    return;
  }
  setVisitLogProviderFromText(item.providerName || item.provider);
}

function setAppointmentDoctorFromCarePlan(item) {
  if (item.providerId && getAllProviders().some((provider) => provider.id === item.providerId)) {
    providerSelect.value = `${PROVIDER_OPTION_PREFIX}${item.providerId}`;
    handleAppointmentProviderSelectChange();
    return;
  }
  setAppointmentDoctorFromText(item.providerName || item.provider);
}

function setVisitLogProviderFromText(providerText) {
  const providerName = cleanText(providerText);
  if (!providerName) {
    return;
  }

  const matchedProvider = findCareTeamProviderByCarePlanText(providerName);

  if (matchedProvider) {
    visitLogProviderSelect.value = `${PROVIDER_OPTION_PREFIX}${matchedProvider.id}`;
    syncVisitLogProviderSelection();
    return;
  }

  visitLogProviderSelect.value = "";
}

function setAppointmentDoctorFromText(providerText) {
  const providerName = cleanText(providerText);
  if (!providerName) {
    return;
  }

  const matchedProvider = findCareTeamProviderByCarePlanText(providerName);

  if (matchedProvider) {
    providerSelect.value = `${PROVIDER_OPTION_PREFIX}${matchedProvider.id}`;
    handleAppointmentProviderSelectChange();
    return;
  }

  providerSelect.value = "__custom__";
  appointmentForm.elements.customDoctor.value = providerName;
  syncCustomFieldVisibility();
}

function mergeInitialAppointmentLogs() {
  const existingKeys = new Set(state.appointments.map((appointment) => getSeedAppointmentKey(appointment)));
  const deletedSeedKeys = new Set(state.deletedSeedKeys || []);

  let changed = false;
  INITIAL_APPOINTMENT_LOGS.forEach((item) => {
    const lookupKey = getSeedAppointmentKey(item);
    if (deletedSeedKeys.has(lookupKey) || existingKeys.has(lookupKey)) {
      return;
    }

    state.appointments.push({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...item,
    });
    existingKeys.add(lookupKey);
    changed = true;
  });

  if (changed) {
    state.appointments = normalizeAppointments(state.appointments);
    persist();
  }
}

function getSeedAppointmentKey(appointment) {
  const clinic = cleanText(appointment.clinic) || extractClinicName(appointment.place);
  return normalizeLookupKey(`${appointment.title}|${appointment.doctor}|${clinic}`);
}

function addDeletedSeedKey(appointment) {
  const seedKey = getSeedAppointmentKey(appointment);
  if (!seedKey) {
    return;
  }
  state.deletedSeedKeys = Array.isArray(state.deletedSeedKeys) ? state.deletedSeedKeys : [];
  if (!state.deletedSeedKeys.includes(seedKey)) {
    state.deletedSeedKeys.push(seedKey);
  }
}

function restoreProviderSelectValue(select, previousValue) {
  if (!select || !previousValue) {
    return;
  }

  if ([...select.options].some((option) => option.value === previousValue)) {
    select.value = previousValue;
    return;
  }

  if (previousValue.startsWith(PROVIDER_OPTION_PREFIX)) {
    const providerId = previousValue.slice(PROVIDER_OPTION_PREFIX.length);
    if (getAllProviders().some((provider) => provider.id === providerId)) {
      select.value = previousValue;
    }
  }
}

function renderAllProviderDropdowns() {
  const appointmentProviderValue = providerSelect?.value || "";
  const visitLogProviderValue = visitLogProviderSelect?.value || "";

  if (providerSelect) {
    providerSelect.innerHTML = buildAppointmentProviderOptions();
    restoreProviderSelectValue(providerSelect, appointmentProviderValue);
  }

  if (visitLogProviderSelect) {
    visitLogProviderSelect.innerHTML = buildVisitLogProviderOptions();
    restoreProviderSelectValue(visitLogProviderSelect, visitLogProviderValue);
  }

  if (carePlanProviderSelect) {
    const carePlanItem = editingCarePlanId
      ? state.carePlan.find((entry) => entry.id === editingCarePlanId)
      : null;
    const currentValue = carePlanProviderSelect.value;
    renderCarePlanProviderSelect(carePlanItem);
    restoreProviderSelectValue(carePlanProviderSelect, currentValue);
    if (carePlanProviderSelect.value) {
      carePlanProviderSelect.dataset.lastValue = carePlanProviderSelect.value;
    }
  }
}

function renderSelectOptions(resetSelections = false) {
  const specialtyOptions = mergeTextLists(
    DEFAULT_SPECIALTY_OPTIONS,
    state.appointments.map((item) => item.specialty).concat(getAllProviders().map((item) => item.specialty))
  );
  const reasonOptions = mergeTextLists(DEFAULT_REASON_OPTIONS, state.appointments.map((item) => item.reasonForVisit));
  const visitLogSpecialtyValue = visitLogSpecialtySelect?.value || "";
  const providerSpecialtyValue = providerSpecialtySelect?.value;

  renderAllProviderDropdowns();

  if (providerSelect && (resetSelections || !providerSelect.innerHTML)) {
    specialtySelect.innerHTML = buildSelectOptions(specialtyOptions, "Select specialty");
    providerSpecialtySelect.innerHTML = buildSelectOptions(specialtyOptions, "Select specialty");
    reasonSelect.innerHTML = buildSelectOptions(reasonOptions, "Select reason");
  } else if (providerSelect) {
    const specialtyValue = specialtySelect.value;
    const reasonValue = reasonSelect.value;
    specialtySelect.innerHTML = buildSelectOptions(specialtyOptions, "Select specialty");
    providerSpecialtySelect.innerHTML = buildSelectOptions(specialtyOptions, "Select specialty");
    reasonSelect.innerHTML = buildSelectOptions(reasonOptions, "Select reason");
    if ([...specialtySelect.options].some((option) => option.value === specialtyValue)) specialtySelect.value = specialtyValue;
    if ([...reasonSelect.options].some((option) => option.value === reasonValue)) reasonSelect.value = reasonValue;
    if (providerSpecialtySelect && [...providerSpecialtySelect.options].some((option) => option.value === providerSpecialtyValue)) {
      providerSpecialtySelect.value = providerSpecialtyValue;
    }
  }

  if (visitLogSpecialtySelect) {
    visitLogSpecialtySelect.innerHTML = buildSelectOptions(specialtyOptions, "Select specialty");
    if ([...visitLogSpecialtySelect.options].some((option) => option.value === visitLogSpecialtyValue)) {
      visitLogSpecialtySelect.value = visitLogSpecialtyValue;
    }
  }
}

function buildAppointmentProviderOptions() {
  return buildCareTeamProviderSelectOptions({
    placeholder: "Select provider",
    includeCustom: true,
  });
}

function buildVisitLogProviderOptions() {
  return buildCareTeamProviderSelectOptions({
    placeholder: "Select provider",
    includeCustom: false,
  });
}

function buildSelectOptions(options, placeholder) {
  return [`<option value="">${placeholder}</option>`]
    .concat(options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`))
    .concat(`<option value="__custom__">Custom</option>`)
    .join("");
}

function syncCustomFieldVisibility() {
  customProviderLabel.classList.toggle("is-hidden", providerSelect.value !== "__custom__");
  customSpecialtyLabel.classList.toggle("is-hidden", specialtySelect.value !== "__custom__");
  customReasonLabel.classList.toggle("is-hidden", reasonSelect.value !== "__custom__");
}

function syncRepeatRuleVisibility() {
  const repeatEnabled = repeatVisitToggle?.checked;
  repeatRuleGroup?.classList.toggle("is-hidden", !repeatEnabled);
  if (appointmentForm?.elements.intervalMonths) {
    appointmentForm.elements.intervalMonths.required = Boolean(repeatEnabled);
    if (!repeatEnabled) {
      appointmentForm.elements.intervalMonths.setCustomValidity("");
    }
  }
}

function setSelectWithCustomValue(select, customInput, value) {
  const normalized = cleanText(value);
  if (!normalized) {
    select.value = "";
    customInput.value = "";
    return;
  }

  if ([...select.options].some((option) => option.value === normalized)) {
    select.value = normalized;
    customInput.value = "";
    return;
  }

  select.value = "__custom__";
  customInput.value = normalized;
}

function mergeTextLists(baseItems, incomingItems) {
  const merged = new Map();
  [...baseItems, ...incomingItems].forEach((value) => {
    const normalized = cleanText(value);
    if (!normalized) {
      return;
    }
    const key = normalized.toLowerCase();
    if (!merged.has(key)) {
      merged.set(key, normalized);
    }
  });
  return Array.from(merged.values());
}

function normalizeLookupKey(value) {
  return cleanText(value).toLowerCase();
}

function normalizeAppointments(appointments) {
  return (appointments || []).map((appointment) => {
    const rawClinic = cleanText(appointment.clinic);
    const rawPlace = cleanText(appointment.place);
    const clinic = rawClinic || extractClinicName(rawPlace);
    const place = rawClinic ? rawPlace : extractAddress(rawPlace);

    return {
      ...appointment,
      clinic,
      place,
      appointmentStatus: cleanText(appointment.appointmentStatus) || "Planned",
      insuranceAccepted: cleanText(appointment.insuranceAccepted),
      portalLink: cleanText(appointment.portalLink),
      appointmentDate: cleanText(appointment.appointmentDate),
      appointmentTime: cleanText(appointment.appointmentTime),
      nextRecommendedVisit: cleanText(appointment.nextRecommendedVisit),
      contactPhone: cleanText(appointment.contactPhone),
      reasonForVisit: cleanText(appointment.reasonForVisit),
      questionsToAsk: cleanText(appointment.questionsToAsk),
      medications: cleanText(appointment.medications),
      testResults: cleanText(appointment.testResults),
      resultFiles: Array.isArray(appointment.resultFiles) ? appointment.resultFiles.map((item) => cleanText(item)).filter(Boolean) : [],
      visitHistory: normalizeVisitHistory(
        Array.isArray(appointment.visitHistory)
          ? appointment.visitHistory
          : appointment.lastVisitDate || appointment.reasonForVisit || appointment.testResults
            ? [
                {
                  id: crypto.randomUUID(),
                  date: cleanText(appointment.lastVisitDate),
                  provider: cleanText(appointment.doctor),
                  specialty: cleanText(appointment.specialty),
                  reason: cleanText(appointment.reasonForVisit),
                  status: "Completed",
                  summary: cleanText(appointment.notes),
                  results: cleanText(appointment.testResults),
                  followUpNeeded: "",
                  followUpDueDate: "",
                  costCopay: "",
                  clinic,
                  phone: cleanText(appointment.contactPhone),
                  portalLink: cleanText(appointment.portalLink),
                  insuranceAccepted: cleanText(appointment.insuranceAccepted),
                },
              ]
            : []
      ),
      reminderEnabled: appointment.reminderEnabled !== false,
    };
  });
}

function normalizeVisitHistory(visitHistory) {
  return normalizeVisitLogs(visitHistory);
}

function normalizeVisitLog(log) {
  return {
    id: cleanText(log.id) || crypto.randomUUID(),
    providerId: cleanText(log.providerId),
    linkedAppointmentId: cleanText(log.linkedAppointmentId),
    date: cleanText(log.date),
    provider: cleanText(log.provider),
    specialty: cleanText(log.specialty),
    reason: cleanText(log.reason),
    status: cleanText(log.status) || "Completed",
    summary: cleanText(log.summary),
    results: cleanText(log.results),
    followUpNeeded: cleanText(log.followUpNeeded),
    followUpDueDate: cleanText(log.followUpDueDate),
    costCopay: cleanText(log.costCopay),
    clinic: cleanText(log.clinic),
    phone: cleanText(log.phone),
    portalLink: cleanText(log.portalLink),
    insuranceAccepted: cleanText(log.insuranceAccepted),
    createdAt: cleanText(log.createdAt) || new Date().toISOString(),
    updatedAt: cleanText(log.updatedAt) || "",
  };
}

function normalizeVisitLogs(visitLogs) {
  return (visitLogs || [])
    .map((log) => normalizeVisitLog(log))
    .filter(
      (log) =>
        log.date ||
        log.provider ||
        log.specialty ||
        log.reason ||
        log.summary ||
        log.results ||
        log.followUpNeeded ||
        log.followUpDueDate ||
        log.costCopay
    )
    .sort((a, b) => compareOptionalDates(b.date, a.date));
}

function migrateVisitLogsAndCleanupAppointments(appointments, visitLogs) {
  const mergedLogs = normalizeVisitLogs(visitLogs);
  const seenLogIds = new Set(mergedLogs.map((log) => log.id));

  appointments.forEach((appointment) => {
    normalizeVisitHistory(appointment.visitHistory).forEach((log) => {
      if (seenLogIds.has(log.id)) {
        return;
      }
      mergedLogs.push(
        normalizeVisitLog({
          ...log,
          linkedAppointmentId: appointment.id,
          provider: log.provider || appointment.doctor,
          specialty: log.specialty || appointment.specialty,
          clinic: log.clinic || appointment.clinic || extractClinicName(appointment.place),
          phone: log.phone || appointment.contactPhone,
          portalLink: log.portalLink || appointment.portalLink,
          insuranceAccepted: log.insuranceAccepted || appointment.insuranceAccepted,
        })
      );
      seenLogIds.add(log.id);
    });
    appointment.visitHistory = [];
  });

  const cleanedAppointments = appointments
    .filter((appointment) => !shouldHideAutoGeneratedAppointment(appointment, mergedLogs))
    .map((appointment) => ({
      ...appointment,
      visitHistory: [],
      autoGeneratedFromVisitLog: false,
    }));

  return {
    appointments: cleanedAppointments,
    visitLogs: mergedLogs.sort((a, b) => compareOptionalDates(b.date, a.date)),
  };
}

function shouldHideAutoGeneratedAppointment(appointment, visitLogs = state.visitLogs) {
  if (appointment.userCreated === true) {
    return false;
  }
  if (appointment.autoGeneratedFromVisitLog === true) {
    return true;
  }

  const hasScheduledVisit =
    isValidIsoDate(appointment.appointmentDate) ||
    cleanText(appointment.appointmentTime) ||
    cleanText(appointment.reasonForVisit) ||
    cleanText(appointment.questionsToAsk) ||
    cleanText(appointment.title) ||
    cleanText(appointment.notes) ||
    appointment.intervalMonths;

  if (hasScheduledVisit) {
    return false;
  }

  const linkedLogs = visitLogs.filter((log) => log.linkedAppointmentId === appointment.id);
  const nestedLogs = normalizeVisitHistory(appointment.visitHistory);

  if (linkedLogs.length > 0 && !hasScheduledVisit && nestedLogs.length === 0) {
    return true;
  }

  if (
    !hasScheduledVisit &&
    nestedLogs.length === 0 &&
    visitLogs.some((log) => normalizeLookupKey(log.provider) === normalizeLookupKey(appointment.doctor))
  ) {
    return true;
  }

  return false;
}

function getVisitLogsForAppointment(appointment) {
  return normalizeVisitLogs(state.visitLogs).filter(
    (log) =>
      log.linkedAppointmentId === appointment.id ||
      (!log.linkedAppointmentId &&
        normalizeLookupKey(log.provider) === normalizeLookupKey(appointment.doctor))
  );
}

function getLatestVisitDate(visitHistory) {
  const latest = normalizeVisitHistory(visitHistory).find((log) => isValidIsoDate(log.date));
  return latest?.date || "";
}

function extractClinicName(place) {
  const normalized = cleanText(place);
  if (!normalized) {
    return "";
  }
  return normalized.split(" - ")[0].split(";")[0].trim();
}

function extractAddress(place) {
  const normalized = cleanText(place);
  if (!normalized) {
    return "";
  }

  if (normalized.includes(" - ")) {
    return normalized.split(" - ").slice(1).join(" - ").trim();
  }

  if (normalized.includes(";")) {
    return normalized.split(";").slice(1).join(";").trim();
  }

  return normalized;
}

function cleanText(value) {
  return String(value ?? "").trim();
}

function numberOrFallback(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function getProfileAge() {
  const birthDate = cleanText(state.profile?.birthDate);
  if (!birthDate) {
    return null;
  }

  const today = new Date(`${todayString()}T12:00:00`);
  const birth = new Date(`${birthDate}T12:00:00`);
  if (Number.isNaN(birth.getTime())) {
    return null;
  }

  let age = today.getFullYear() - birth.getFullYear();
  const hasHadBirthday =
    today.getMonth() > birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  if (!hasHadBirthday) {
    age -= 1;
  }
  return age >= 0 ? age : null;
}

function formatAppointmentDateTime(dateValue, timeValue) {
  if (!dateValue && !timeValue) {
    return "Not scheduled";
  }
  if (!dateValue) {
    return timeValue || "Not scheduled";
  }
  return `${formatDate(dateValue)}${timeValue ? ` at ${formatTime(timeValue)}` : ""}`;
}

function formatDate(value) {
  if (!value) {
    return "Not set";
  }

  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function isValidIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) {
    return false;
  }
  const date = new Date(`${value}T12:00:00`);
  return !Number.isNaN(date.getTime());
}

function compareOptionalDates(a, b) {
  const aValid = isValidIsoDate(a);
  const bValid = isValidIsoDate(b);

  if (aValid && bValid) {
    return new Date(`${a}T12:00:00`) - new Date(`${b}T12:00:00`);
  }
  if (aValid) {
    return -1;
  }
  if (bValid) {
    return 1;
  }
  return 0;
}

function formatTime(value) {
  if (!value) {
    return "";
  }

  const [hours, minutes] = value.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function addMonths(dateString, months) {
  const date = new Date(`${dateString}T12:00:00`);
  const originalDate = date.getDate();
  date.setMonth(date.getMonth() + Number(months));
  if (date.getDate() < originalDate) {
    date.setDate(0);
  }
  return date.toISOString().slice(0, 10);
}

function subtractDays(dateString, days) {
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() - Number(days));
  return date.toISOString().slice(0, 10);
}

function addDays(dateString, days) {
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + Number(days));
  return date.toISOString().slice(0, 10);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
