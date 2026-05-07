const STORAGE_KEY = "medical-appointment-tracker-v1";
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
const quickAddButton = document.querySelector("#quickAddButton");
const dashboardAddAppointmentButton = document.querySelector("#dashboardAddAppointmentButton");
const dashboardAddVisitLogButton = document.querySelector("#dashboardAddVisitLogButton");
const dashboardViewCareTeamButton = document.querySelector("#dashboardViewCareTeamButton");
const dashboardInsuranceButton = document.querySelector("#dashboardInsuranceButton");
const stickyAddAppointmentButton = document.querySelector("#stickyAddAppointmentButton");
const stickyAddVisitLogButton = document.querySelector("#stickyAddVisitLogButton");
const stickySearchButton = document.querySelector("#stickySearchButton");
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
const showAddAppointmentFlow = document.querySelector("#showAddAppointmentFlow");
const showLogPastVisitFlow = document.querySelector("#showLogPastVisitFlow");
const appointmentModeButton = showAddAppointmentFlow;
const visitLogModeButton = showLogPastVisitFlow;
const visitLogFormMount = document.querySelector("#visitLogFormMount");
const providerForm = document.querySelector("#providerForm");
const providerSpecialtySelect = document.querySelector("#providerSpecialtySelect");
const providerCustomSpecialtyLabel = document.querySelector("#providerCustomSpecialtyLabel");
const careTeamList = document.querySelector("#careTeamList");
const careTeamActivityList = document.querySelector("#careTeamActivityList");
const customProviderLabel = document.querySelector("#customProviderLabel");
const customSpecialtyLabel = document.querySelector("#customSpecialtyLabel");
const customReasonLabel = document.querySelector("#customReasonLabel");
const visitLogForm = document.querySelector("#visitLogForm");
const visitLogFormTitle = document.querySelector("#visitLogFormTitle");
const visitLogProviderSelect = document.querySelector("#visitLogProviderSelect");
const visitLogQuickTemplate = document.querySelector("#visitLogQuickTemplate");
const visitLogSpecialtySelect = document.querySelector("#visitLogSpecialtySelect");
const visitLogCustomSpecialtyLabel = document.querySelector("#visitLogCustomSpecialtyLabel");
const visitLogQuickSaveButton = document.querySelector("#visitLogQuickSaveButton");
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
const homeAddProviderAction = document.querySelector("#homeAddProviderAction");
const homeTodayList = document.querySelector("#homeTodayList");
const homeUpcomingList = document.querySelector("#homeUpcomingList");
const homeOverdueList = document.querySelector("#homeOverdueList");
const homeRecentLogsList = document.querySelector("#homeRecentLogsList");
const homeOverdueCount = document.querySelector("#homeOverdueCount");
const homeScheduledCount = document.querySelector("#homeScheduledCount");
const recordViewButtons = [...document.querySelectorAll("[data-record-view]")];
const visitTimelineContainer = document.querySelector("#visitTimelineContainer");
const visitTimelineList = document.querySelector("#visitTimelineList");

let editingAppointmentId = "";
let activeRecordView = "list";
let editingVisitLogId = "";
let editingVisitHistory = [];
let inlineEditingVisitLogId = "";
let activeAddEditMode = "appointment";
let visitHistorySelectMode = false;
let selectedRecordIds = new Set();
let activeVisitHistoryFilter = "all";
let activeSubtabs = {
  dashboard: "overview",
  appointments: "form",
  "care-team": "providers",
};

bindEvents();
mergeInitialAppointmentLogs();
syncForms();
mountVisitLogForm();
setAddEditMode("none");
render();
renderVisitHistoryGlobalList();
maybeSendBrowserNotifications();

function bindEvents() {
  appointmentForm.addEventListener("submit", handleAppointmentSubmit);
  insuranceForm.addEventListener("submit", handleInsuranceSubmit);
  profileForm.addEventListener("submit", handleProfileSubmit);
  providerForm.addEventListener("submit", handleProviderSubmit);
  visitLogForm.addEventListener("submit", handleVisitLogSubmit);
  visitLogForm.addEventListener("click", handleVisitLogFormClick);
  visitLogQuickTemplate.addEventListener("change", handleVisitLogTemplateChange);
  visitLogQuickSaveButton.addEventListener("click", () => saveVisitLog({ addAnother: false }));
  visitLogSaveAddAnotherButton.addEventListener("click", () => saveVisitLog({ addAnother: true }));
  if (visitLogSaveFollowUpButton) {
    visitLogSaveFollowUpButton.addEventListener("click", () => saveVisitLog({ addAnother: false, scheduleFollowUp: true }));
  }
  appointmentCancelButton.addEventListener("click", resetAppointmentForm);
  visitLogCancelButton.addEventListener("click", resetVisitLogForm);
  appointmentList.addEventListener("click", handleAppointmentListClick);
  appointmentList.addEventListener("submit", handleInlineVisitLogSubmit);
  dashboardAppointmentList.addEventListener("click", handleAppointmentListClick);
  careTeamList.addEventListener("click", handleCareTeamClick);
  recommendationList.addEventListener("click", handleRecommendationListClick);
  visitHistoryGlobalList.addEventListener("click", handleVisitHistoryEditorClick);
  visitHistoryGlobalList.addEventListener("submit", handleInlineVisitLogSubmit);
  visitHistorySelectButton.addEventListener("click", enableVisitHistorySelectMode);
  visitHistoryDeleteSelectedButton.addEventListener("click", deleteSelectedRecords);
  visitHistoryCancelSelectButton.addEventListener("click", cancelVisitHistorySelectMode);
  visitHistoryDeleteAllButton.addEventListener("click", deleteAllVisitLogs);
  visitHistoryFilterButtons.forEach((button) =>
    button.addEventListener("click", () => {
      activeVisitHistoryFilter = button.dataset.visitHistoryFilter;
      selectedRecordIds.clear();
      render();
    })
  );
  appointmentSearchInput.addEventListener("input", render);
  appointmentStatusFilter.addEventListener("change", render);
  appointmentSpecialtyFilter.addEventListener("change", render);
  appointmentProviderFilter.addEventListener("change", render);
  recordTypeFilter.addEventListener("change", render);
  recordSortSelect.addEventListener("change", render);
  if (showAddAppointmentFlow) {
    showAddAppointmentFlow.addEventListener("click", () => openEntryFlow("appointment"));
  }
  if (showLogPastVisitFlow) {
    showLogPastVisitFlow.addEventListener("click", () => openEntryFlow("visit-log"));
  }
  if (exportBackupButton) {
    exportBackupButton.addEventListener("click", exportBackup);
  }
  if (importBackupButton) {
    importBackupButton.addEventListener("click", () => importBackupInput?.click());
  }
  if (importBackupInput) {
    importBackupInput.addEventListener("change", handleImportBackupFile);
  }
  if (homeAddAppointmentAction) {
    homeAddAppointmentAction.addEventListener("click", openAppointmentForm);
  }
  if (homeLogVisitAction) {
    homeLogVisitAction.addEventListener("click", () => openVisitLogTab("", true));
  }
  if (homeAddProviderAction) {
    homeAddProviderAction.addEventListener("click", () => {
      switchScreen("care-team");
      setSubtab("care-team", "providers");
    });
  }
  recordViewButtons.forEach((button) => button.addEventListener("click", () => setRecordView(button.dataset.recordView)));
  quickAddButton.addEventListener("click", () => {
    openAppointmentForm();
  });
  dashboardAddAppointmentButton.addEventListener("click", openAppointmentForm);
  stickyAddAppointmentButton.addEventListener("click", openAppointmentForm);
  dashboardAddVisitLogButton.addEventListener("click", () => openVisitLogTab(editingAppointmentId || ""));
  stickyAddVisitLogButton.addEventListener("click", () => openVisitLogTab(editingAppointmentId || ""));
  dashboardViewCareTeamButton.addEventListener("click", () => {
    switchScreen("care-team");
    setSubtab("care-team", "providers");
  });
  dashboardInsuranceButton.addEventListener("click", () => switchScreen("insurance"));
  stickySearchButton.addEventListener("click", () => {
    switchScreen("appointments");
    setSubtab("appointments", "records");
    appointmentSearchInput.focus();
  });
  notificationButton.addEventListener("click", requestNotificationPermission);
  screenButtons.forEach((button) =>
    button.addEventListener("click", () => switchScreen(button.dataset.screenTarget))
  );
  actionButtons.forEach((button) => {
    if (button.dataset.action === "add") {
      button.addEventListener("click", openAppointmentForm);
    }
  });
  subtabButtons.forEach((button) =>
    button.addEventListener("click", () => setSubtab(button.dataset.subtabGroup, button.dataset.subtabTarget))
  );
  providerSelect.addEventListener("change", syncCustomFieldVisibility);
  specialtySelect.addEventListener("change", syncCustomFieldVisibility);
  reasonSelect.addEventListener("change", syncCustomFieldVisibility);
  providerSpecialtySelect.addEventListener("change", syncProviderCustomSpecialtyVisibility);
  visitLogProviderSelect.addEventListener("change", syncVisitLogProviderSelection);
  visitLogSpecialtySelect.addEventListener("change", syncVisitLogCustomSpecialtyVisibility);
  if (repeatVisitToggle) {
    repeatVisitToggle.addEventListener("change", () => {
      syncRepeatRuleVisibility();
      syncAppointmentPreview();
    });
  }
  ["appointmentDate", "nextRecommendedVisit", "intervalMonths", "reminderDaysBefore"].forEach((fieldName) => {
    appointmentForm.elements[fieldName].addEventListener("input", syncAppointmentPreview);
  });
}

function openAppointmentForm() {
  switchScreen("appointments");
  setSubtab("appointments", "form");
  setAddEditMode("appointment");
  resetAppointmentForm();
}

function openVisitLogTab(appointmentId = "", setToday = false) {
  switchScreen("appointments");
  setSubtab("appointments", "form");
  setAddEditMode("visit-log");
  if (appointmentId) {
    prefillVisitLogForm(appointmentId);
    if (setToday && !visitLogForm.elements.date.value) {
      visitLogForm.elements.date.value = todayString();
    }
  } else {
    resetVisitLogForm();
  }
}

function openEntryFlow(mode) {
  if (mode === "appointment") {
    setAddEditMode("appointment");
    resetAppointmentForm();
  } else if (mode === "visit-log") {
    setAddEditMode("visit-log");
    resetVisitLogForm();
  }
}

function mountVisitLogForm() {
  if (visitLogFormMount && visitLogForm.parentElement !== visitLogFormMount) {
    visitLogFormMount.appendChild(visitLogForm);
  }
}

function setAddEditMode(mode) {
  activeAddEditMode = mode;
  const showingAppointment = mode === "appointment";
  const showingVisitLog = mode === "visit-log";
  appointmentForm.classList.toggle("is-hidden", !showingAppointment);
  visitLogForm.classList.toggle("is-hidden", !showingVisitLog);
  if (appointmentModeButton) {
    appointmentModeButton.classList.toggle("is-active", showingAppointment);
    appointmentModeButton.classList.toggle("button-primary", showingAppointment);
    appointmentModeButton.classList.toggle("button-secondary", !showingAppointment);
  }
  if (visitLogModeButton) {
    visitLogModeButton.classList.toggle("is-active", showingVisitLog);
    visitLogModeButton.classList.toggle("button-primary", showingVisitLog);
    visitLogModeButton.classList.toggle("button-secondary", !showingVisitLog);
  }
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

  if (group === "appointments" && target === "records") {
    renderVisitHistoryGlobalList();
  }
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
    doctor:
      cleanText(formData.get("doctor")) === "__custom__"
        ? cleanText(formData.get("customDoctor"))
        : cleanText(formData.get("doctor")),
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
    visitHistory: normalizeVisitHistory(existingAppointment?.visitHistory || []),
    notes: cleanText(formData.get("notes")),
    updatedAt: new Date().toISOString(),
  };

  if (!appointment.doctor) {
    return;
  }

  const existingIndex = state.appointments.findIndex((item) => item.id === appointment.id);
  if (existingIndex >= 0) {
    state.appointments[existingIndex] = { ...state.appointments[existingIndex], ...appointment };
  } else {
    state.appointments.unshift({ ...appointment, createdAt: new Date().toISOString() });
  }

  persist();
  resetAppointmentForm();
  render();
  switchScreen("appointments");
  setSubtab("appointments", "records");
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

  if (!doctor || !clinic) {
    return;
  }

  const providerKey = normalizeLookupKey(`${doctor}|${specialty}|${clinic}`);
  const existingIndex = state.appointments.findIndex((appointment) => {
    const appointmentClinic = cleanText(appointment.clinic) || extractClinicName(appointment.place);
    return normalizeLookupKey(`${appointment.doctor}|${appointment.specialty}|${appointmentClinic}`) === providerKey;
  });
  const providerDetails = {
    id: existingIndex >= 0 ? state.appointments[existingIndex].id : crypto.randomUUID(),
    title: getRecordTitle({ specialty, provider: doctor }),
    doctor,
    specialty,
    clinic,
    place: cleanText(formData.get("place")),
    contactPhone: cleanText(formData.get("contactPhone")),
    insuranceAccepted: cleanText(formData.get("insuranceAccepted")),
    portalLink: cleanText(formData.get("portalLink")),
    updatedAt: new Date().toISOString(),
  };
  const providerRecord = {
    ...providerDetails,
    appointmentDate: "",
    appointmentTime: "",
    appointmentStatus: "Planned",
    nextRecommendedVisit: "",
    intervalMonths: 12,
    reminderDaysBefore: 14,
    reminderEnabled: false,
    reasonForVisit: "Provider profile",
    questionsToAsk: "",
    medications: "",
    testResults: "",
    resultFiles: [],
    visitHistory: existingIndex >= 0 ? normalizeVisitHistory(state.appointments[existingIndex].visitHistory || []) : [],
    notes: "Care team provider profile.",
    createdAt: existingIndex >= 0 ? state.appointments[existingIndex].createdAt || new Date().toISOString() : new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    state.appointments[existingIndex] = {
      ...state.appointments[existingIndex],
      ...providerDetails,
      visitHistory: normalizeVisitHistory(state.appointments[existingIndex].visitHistory || []),
    };
  } else {
    state.appointments.unshift(providerRecord);
  }

  providerForm.reset();
  syncProviderCustomSpecialtyVisibility();
  persist();
  render();
}

function syncProviderCustomSpecialtyVisibility() {
  providerCustomSpecialtyLabel.classList.toggle("is-hidden", providerSpecialtySelect.value !== "__custom__");
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
    loadAppointmentIntoForm(editId);
    switchScreen("appointments");
    setSubtab("appointments", "form");
    setAddEditMode("appointment");
    return;
  }

  if (editVisitLogId && editVisitLogAppointmentId) {
    inlineEditingVisitLogId = editVisitLogId;
    editingVisitLogId = "";
    resetVisitLogForm();
    switchScreen("appointments");
    setSubtab("appointments", "records");
    renderVisitHistoryGlobalList();
    scrollVisitLogIntoView(editVisitLogId);
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
  const appointmentId = event.target.closest("[data-add-provider-visit-log]")?.dataset.addProviderVisitLog;
  const providerActivityId = event.target.closest("[data-open-provider-activity]")?.dataset.openProviderActivity;
  const providerEditKey = event.target.closest("[data-edit-provider]")?.dataset.editProvider;
  const providerDeleteKey = event.target.closest("[data-delete-provider]")?.dataset.deleteProvider;

  if (appointmentId) {
    openVisitLogTab(appointmentId);
    return;
  }

  if (providerActivityId) {
    switchScreen("care-team");
    setSubtab("care-team", "activity");
    return;
  }

  if (providerEditKey) {
    const provider = buildCareTeamProviders().find((item) => item.key === providerEditKey);
    if (!provider) {
      return;
    }
    loadAppointmentIntoForm(provider.primaryAppointmentId);
    switchScreen("appointments");
    setSubtab("appointments", "form");
    setAddEditMode("appointment");
    return;
  }

  if (providerDeleteKey) {
    const provider = buildCareTeamProviders().find((item) => item.key === providerDeleteKey);
    if (!provider) {
      return;
    }
    const confirmed = window.confirm(
      `Delete ${provider.doctor} from your care team? This will remove ${provider.appointments.length} tracked appointment${provider.appointments.length === 1 ? "" : "s"} and their visit logs.`
    );
    if (!confirmed) {
      return;
    }
    const appointmentIds = new Set(provider.appointments.map((item) => item.id));
    provider.appointments.forEach((appointment) => addDeletedSeedKey(appointment));
    state.appointments = state.appointments.filter((item) => !appointmentIds.has(item.id));
    if (appointmentIds.has(editingAppointmentId)) {
      resetAppointmentForm();
    }
    const editingLogBelongsToProvider = provider.appointments.some((appointment) =>
      normalizeVisitHistory(appointment.visitHistory || []).some((log) => log.id === editingVisitLogId)
    );
    if (editingLogBelongsToProvider) {
      resetVisitLogForm();
    }
    persist();
    render();
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
  setSubtab("appointments", "form");
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
    inlineEditingVisitLogId = editId;
    editingVisitLogId = "";
    visitLogForm.elements.visitLogId.value = "";
    visitLogSubmitButton.textContent = "Save Visit Log";
    visitLogCancelButton.classList.add("is-hidden");
    visitLogFormTitle.textContent = "Add visit log";
    renderVisitHistoryGlobalList();
    scrollVisitLogIntoView(editId);
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
  const owningAppointment = state.appointments.find((appointment) =>
    normalizeVisitHistory(appointment.visitHistory || []).some((log) => log.id === visitLogId)
  );
  if (!owningAppointment) {
    return false;
  }

  const existingLog = normalizeVisitHistory(owningAppointment.visitHistory || []).find((log) => log.id === visitLogId);
  if (!existingLog) {
    return false;
  }

  const formData = new FormData(form);
  const nextLog = {
    ...existingLog,
    id: visitLogId,
    date: cleanText(formData.get("date")),
    provider: owningAppointment.doctor,
    clinic: cleanText(formData.get("clinic")) || owningAppointment.clinic || extractClinicName(owningAppointment.place),
    phone: owningAppointment.contactPhone,
    portalLink: owningAppointment.portalLink,
    insuranceAccepted: owningAppointment.insuranceAccepted,
    specialty: cleanText(formData.get("specialty")) || owningAppointment.specialty,
    reason: cleanText(formData.get("reason")),
    status: cleanText(formData.get("status")) || "Completed",
    summary: cleanText(formData.get("summary")),
    results: cleanText(formData.get("results")),
    followUpNeeded: cleanText(formData.get("followUpNeeded")),
    followUpDueDate: cleanText(formData.get("followUpDueDate")),
    costCopay: cleanText(formData.get("costCopay")),
  };

  owningAppointment.visitHistory = normalizeVisitHistory(owningAppointment.visitHistory || []).map((log) =>
    log.id === visitLogId ? nextLog : log
  );
  return true;
}

function loadAppointmentIntoForm(appointmentId) {
  const appointment = state.appointments.find((item) => item.id === appointmentId);
  if (!appointment) {
    return;
  }

  editingAppointmentId = appointment.id;
  appointmentForm.elements.appointmentId.value = appointment.id;
  setSelectWithCustomValue(providerSelect, appointmentForm.elements.customDoctor, appointment.doctor || "");
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
  editingVisitHistory = normalizeVisitHistory(appointment.visitHistory || []);
  syncCustomFieldVisibility();
  syncAppointmentPreview();
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
}

function syncForms() {
  renderSelectOptions();
  resetAppointmentForm();
  resetVisitLogForm();
  profileForm.elements.birthDate.value = state.profile?.birthDate || "";
  profileForm.elements.sexAtBirth.value = state.profile?.sexAtBirth || "";
  profileForm.elements.hasCervix.value = state.profile?.hasCervix || "";
  profileForm.elements.postmenopausal.value = state.profile?.postmenopausal || "";
  profileForm.elements.smokingStatus.value = state.profile?.smokingStatus || "";
  profileForm.elements.packYears.value = state.profile?.packYears ?? "";
  profileForm.elements.yearsSinceQuit.value = state.profile?.yearsSinceQuit ?? "";
  profileForm.elements.hasOverweightOrObesity.value = state.profile?.hasOverweightOrObesity || "";
  insuranceForm.elements.provider.value = state.insurance.provider || "";
  insuranceForm.elements.planName.value = state.insurance.planName || "";
  insuranceForm.elements.memberId.value = state.insurance.memberId || "";
  insuranceForm.elements.groupNumber.value = state.insurance.groupNumber || "";
  insuranceForm.elements.copay.value = state.insurance.copay || "";
  insuranceForm.elements.phone.value = state.insurance.phone || "";
  insuranceForm.elements.notes.value = state.insurance.notes || "";
}

function render() {
  const summaries = getAppointmentSummaries();
  const reminderItems = summaries.filter((item) => item.reminderEnabled !== false && item.reminderStatus !== "ok");
  const recommendations = getProfileRecommendations();

  heroReminderCount.textContent = String(reminderItems.length);
  heroProviderCount.textContent = String(new Set(state.appointments.map((item) => item.doctor)).size);

  renderDashboardStats(summaries, reminderItems);
  renderHomeSections(summaries);
  renderReminderList(reminderItems);
  renderAppointmentLists(summaries);
  renderVisitHistoryGlobalList();
  renderRecommendations(recommendations);
  renderInsuranceSummary();
  renderCareTeam();
  renderCareTeamActivity();
  renderAppointmentFilters();
  renderSelectOptions(false);
  renderVisitTimelineList(summaries);
  renderRecordView();
  updateNotificationButton();
}

function renderDashboardStats(summaries, reminderItems) {
  const overdueCount = reminderItems.filter((item) => item.reminderStatus === "overdue").length;
  const dueSoonCount = reminderItems.filter((item) => item.reminderStatus === "soon").length;
  const nextItem = summaries[0];

  dashboardStats.innerHTML = [
    metricCard("Tracked appointments", state.appointments.length),
    metricCard("Reminder alerts", reminderItems.length),
    metricCard("Overdue", overdueCount),
    metricCard("Due soon", dueSoonCount),
    metricCard("Next visit", nextItem ? formatDate(nextItem.nextVisitDate) : "None"),
  ].join("");
}

function renderReminderList(reminderItems) {
  reminderList.innerHTML = reminderItems.length
    ? reminderItems
        .map(
          (item) => `
            <article class="reminder-card">
              <div class="card-head">
                <div>
                  <strong>${escapeHtml(getRecordTitle(item))}</strong>
                  <span class="meta">${escapeHtml(item.reasonForVisit || item.doctor || "No provider saved")}</span>
                </div>
                ${statusPill(item.reminderStatus)}
              </div>
              <div class="detail-grid">
                <span><strong>Last visit</strong>${formatDate(item.lastVisitDate)}</span>
                <span><strong>${escapeHtml(item.nextVisitLabel || "Auto next visit")}</strong>${formatDate(item.nextVisitDate)}</span>
                <span><strong>Reminder starts</strong>${formatDate(item.reminderStartDate)}</span>
                <span><strong>Appointment</strong>${formatAppointmentDateTime(item.appointmentDate, item.appointmentTime)}</span>
              </div>
            </article>
          `
        )
        .join("")
    : `<p class="muted">No reminders are active right now.</p>`;
}

function renderAppointmentLists(summaries) {
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
  const todayItems = summaries.filter(
    (item) =>
      item.appointmentDate === today || item.reminderStartDate === today || item.nextVisitDate === today
  );
  const overdueItems = summaries.filter((item) => item.reminderStatus === "overdue");
  const upcomingItems = summaries.filter(
    (item) => item.reminderStatus === "soon" && !todayItems.includes(item)
  );
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
  return `
    <article class="summary-card">
      <div class="card-head">
        <div>
          <strong>${escapeHtml(getRecordTitle(item))}</strong>
          <span class="meta">${escapeHtml(item.reasonForVisit || item.appointmentStatus || "No reason saved")}</span>
          <span class="meta">${formatDate(item.nextVisitDate)} • ${formatAppointmentDateTime(item.appointmentDate, item.appointmentTime)}</span>
        </div>
        ${statusPill(item)}
      </div>
    </article>
  `;
}

function renderHomeVisitLogCard(entry) {
  return `
    <article class="summary-card">
      <div class="card-head">
        <div>
          <strong>${escapeHtml(getRecordTitle(entry))}</strong>
          <span class="meta">${escapeHtml(entry.reason || "No reason saved")}</span>
          <span class="meta">${formatDate(entry.date)} • ${escapeHtml(entry.clinic || "No clinic saved")}</span>
        </div>
        ${statusPill(entry)}
      </div>
      <div class="summary-row"><strong>Summary</strong><span>${escapeHtml(entry.summary || "Not saved")}</span></div>
    </article>
  `;
}

function renderVisitTimelineList(summaries) {
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
  return `
    <details class="appointment-card appointment-dropdown">
      <summary class="appointment-summary">
        ${
          visitHistorySelectMode
            ? `<label class="select-check">
                <input type="checkbox" data-select-record="${item.id}" ${selectedRecordIds.has(item.id) ? "checked" : ""} />
                Select
              </label>`
            : ""
        }
        <div>
          <span class="pill ok">Appointment</span>
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
          <span><strong>${escapeHtml(item.nextVisitLabel || "Auto next visit")}</strong>${formatDate(item.nextVisitDate)}</span>
          <span><strong>Reason</strong>${escapeHtml(item.reasonForVisit || "Not saved")}</span>
          <span><strong>Notifications</strong>${item.reminderEnabled === false ? "Disabled" : "Enabled"}</span>
        </div>
        <div class="inline-row">
          <button class="button-secondary" type="button" data-edit-appointment="${item.id}">Edit Appointment</button>
          <button class="button-danger" type="button" data-delete-appointment="${item.id}">Delete</button>
        </div>
      </div>
    </details>
  `;
}

function renderVisitLogRecordCard(entry) {
  return `
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
          <span class="pill ok">Visit Log</span>
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
  `;
}

function buildCareTeamProviders() {
  const providerMap = new Map();

  getAppointmentSummaries().forEach((appointment) => {
    const clinic = appointment.clinic || extractClinicName(appointment.place);
    const key = normalizeLookupKey(`${appointment.doctor}|${appointment.specialty}|${clinic}`);
    if (!key) {
      return;
    }

    const existing = providerMap.get(key) || {
      key,
      doctor: appointment.doctor,
      specialty: appointment.specialty,
      clinic,
      address: appointment.clinic ? appointment.place : extractAddress(appointment.place),
      phone: appointment.contactPhone,
      portalLink: appointment.portalLink,
      insuranceAccepted: appointment.insuranceAccepted,
      lastVisitDate: appointment.lastVisitDate,
      visitCount: 0,
      appointments: [],
      primaryAppointmentId: appointment.id,
    };

    existing.phone = existing.phone || appointment.contactPhone;
    existing.portalLink = existing.portalLink || appointment.portalLink;
    existing.insuranceAccepted = existing.insuranceAccepted || appointment.insuranceAccepted;
    existing.lastVisitDate = compareOptionalDates(appointment.lastVisitDate, existing.lastVisitDate) < 0 ? existing.lastVisitDate : appointment.lastVisitDate || existing.lastVisitDate;
    existing.visitCount += 1;
    existing.appointments.push(appointment);
    providerMap.set(key, existing);
  });

  return Array.from(providerMap.values()).sort((a, b) => a.doctor.localeCompare(b.doctor));
}

function renderInsuranceSummary() {
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
  const providers = buildCareTeamProviders();
  careTeamList.innerHTML = providers.length
    ? providers
        .map(
          (provider) => `
            <details class="appointment-card appointment-dropdown">
              <summary class="appointment-summary">
                <div>
                  <strong>${escapeHtml(provider.doctor)}</strong>
                  <span class="meta">${escapeHtml(provider.specialty || "General")}</span>
                  <span class="meta">${escapeHtml(provider.clinic || provider.address || "No clinic details saved")}</span>
                </div>
                <span class="pill ok">${provider.visitCount} visit${provider.visitCount === 1 ? "" : "s"}</span>
              </summary>
              <div class="appointment-dropdown-body">
                <div class="detail-grid">
                  <span><strong>Clinic</strong>${escapeHtml(provider.clinic || "Not saved")}</span>
                  <span><strong>Phone</strong>${escapeHtml(provider.phone || "Not saved")}</span>
                  <span><strong>Address</strong>${escapeHtml(provider.address || "Not saved")}</span>
                  <span><strong>Insurance accepted</strong>${escapeHtml(provider.insuranceAccepted || "Not saved")}</span>
                  <span><strong>Portal link</strong>${provider.portalLink ? `<a class="source-link" href="${escapeHtml(provider.portalLink)}" target="_blank" rel="noreferrer">Open portal</a>` : "Not saved"}</span>
                  <span><strong>Last tracked visit</strong>${formatDate(provider.lastVisitDate)}</span>
                </div>
                <div class="inline-row">
                  <button class="button-secondary" type="button" data-add-provider-visit-log="${provider.primaryAppointmentId}">Add Visit Log</button>
                  <button class="button-secondary" type="button" data-open-provider-activity="${provider.primaryAppointmentId}">View activity</button>
                  <button class="button-secondary" type="button" data-edit-provider="${escapeHtml(provider.key)}">Edit Provider</button>
                  <button class="button-danger" type="button" data-delete-provider="${escapeHtml(provider.key)}">Delete Provider</button>
                </div>
                <div class="visit-history-list">
                  <strong>Tracked appointments</strong>
                  ${
                    provider.appointments
                      .map(
                        (item) => `
                          <article class="summary-card">
                            <div class="summary-row"><strong>${escapeHtml(getRecordTitle(item))}</strong><span>${escapeHtml(item.appointmentStatus || "Planned")}</span></div>
                            <div class="summary-row"><strong>Next visit</strong><span>${formatDate(item.nextVisitDate)}</span></div>
                            <div class="summary-row"><strong>Reason</strong><span>${escapeHtml(item.reasonForVisit || "Not saved")}</span></div>
                          </article>
                        `
                      )
                      .join("")
                  }
                </div>
              </div>
            </details>
          `
        )
        .join("")
    : `<p class="muted">No care team entries yet. Add appointments with provider details to build your care team.</p>`;
}

function renderCareTeamActivity() {
  const entries = getAllVisitHistoryEntries();
  careTeamActivityList.innerHTML = entries.length
    ? entries
        .map(
          (entry) => `
            <article class="summary-card">
              <div class="card-head">
                <div>
                  <strong>${escapeHtml(getRecordTitle(entry))}</strong>
                  <span class="meta">${escapeHtml(entry.reason || "No reason saved")}</span>
                  <span class="meta">${formatDate(entry.date)} • ${escapeHtml(entry.specialty || entry.provider || "Visit")}</span>
                </div>
                <span class="pill ${visitLogStatusClass(entry.status)}">${escapeHtml(entry.status || "Completed")}</span>
              </div>
              <div class="detail-grid">
                <span><strong>Summary</strong>${escapeHtml(entry.summary || "Not saved")}</span>
                <span><strong>Results</strong>${escapeHtml(entry.results || "Not saved")}</span>
                <span><strong>Follow-up due</strong>${formatFollowUpDueLabel(entry.followUpDueDate)}</span>
                <span><strong>Cost / copay</strong>${escapeHtml(entry.costCopay || "Not saved")}</span>
              </div>
            </article>
          `
        )
        .join("")
    : `<p class="muted">No provider activity yet. Add a visit log to start building history.</p>`;
}

function renderRecommendations(recommendations) {
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
  const selectedAppointment = state.appointments.find((item) => item.id === cleanText(visitLogProviderSelect.value));
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

  switchScreen("appointments");
  setSubtab("appointments", "records");
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
  return state.appointments
    .flatMap((appointment) =>
      normalizeVisitHistory(appointment.visitHistory || []).map((log) => ({
        ...log,
        appointmentId: appointment.id,
        appointmentTitle: appointment.title,
        provider: cleanText(log.provider) || appointment.doctor,
        specialty: cleanText(log.specialty) || appointment.specialty,
        clinic: cleanText(log.clinic) || appointment.clinic || extractClinicName(appointment.place),
        phone: cleanText(log.phone) || appointment.contactPhone,
        portalLink: cleanText(log.portalLink) || appointment.portalLink,
        insuranceAccepted: cleanText(log.insuranceAccepted) || appointment.insuranceAccepted,
      }))
    )
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
  visitLogProviderSelect.value = appointment.id;
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
  const entry = getAllVisitHistoryEntries().find((item) => item.id === visitLogId);
  const log = entry || null;
  if (!log) {
    return;
  }

  editingVisitLogId = log.id;
  visitLogForm.elements.visitLogAppointmentId.value = log.appointmentId || "";
  visitLogProviderSelect.value = log.appointmentId || "";
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
  visitLogSubmitButton.textContent = "Update Visit Log";
  visitLogCancelButton.classList.remove("is-hidden");
  visitLogFormTitle.textContent = "Edit visit log";
  syncVisitLogCustomSpecialtyVisibility();
}

function resetVisitLogForm() {
  editingVisitLogId = "";
  visitLogForm.reset();
  visitLogForm.elements.visitLogAppointmentId.value = "";
  visitLogForm.elements.visitLogId.value = "";
  visitLogProviderSelect.value = "";
  visitLogSubmitButton.textContent = "Save Visit Log";
  visitLogCancelButton.classList.add("is-hidden");
  visitLogFormTitle.textContent = "Add visit log";
  syncVisitLogCustomSpecialtyVisibility();
}

function syncVisitLogProviderSelection() {
  const appointmentId = cleanText(visitLogProviderSelect.value);
  visitLogForm.elements.visitLogAppointmentId.value = appointmentId;
  const appointment = state.appointments.find((item) => item.id === appointmentId);
  if (!appointment) {
    return;
  }

  if (!editingVisitLogId) {
    visitLogForm.elements.clinic.value = appointment.clinic || "";
    setSelectWithCustomValue(
      visitLogSpecialtySelect,
      visitLogForm.elements.customSpecialty,
      appointment.specialty || ""
    );
    visitLogForm.elements.reason.value = visitLogForm.elements.reason.value || appointment.reasonForVisit || "";
  }
  renderVisitHistoryGlobalList();
  renderVisitLogProviderInfo(appointment);
  syncVisitLogCustomSpecialtyVisibility();
}

function renderVisitLogProviderInfo(appointment) {
  const lastLog = normalizeVisitHistory(appointment.visitHistory || []).find((log) => isValidIsoDate(log.date));
  if (lastLog?.date) {
    visitLogLastAppointmentInfo.textContent = `Last tracked visit with ${appointment.doctor} was ${formatDate(lastLog.date)}${lastLog.reason ? ` (${lastLog.reason})` : ""}.`;
    return;
  }
  visitLogLastAppointmentInfo.textContent = `Auto-fill clinic, specialty, and reason from ${appointment.doctor}.`;
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
  const appointmentId = cleanText(visitLogProviderSelect.value) || cleanText(visitLogForm.elements.visitLogAppointmentId.value);
  const providerValue = visitLogProviderSelect.value;
  visitLogForm.reset();
  visitLogForm.elements.visitLogAppointmentId.value = appointmentId;
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
  visitLogCancelButton.classList.add("is-hidden");
  visitLogForm.elements.summary.placeholder = "What happened at the visit?";
  syncVisitLogProviderSelection();
}

function saveVisitLog({ addAnother = false, scheduleFollowUp = false } = {}) {
  const formData = new FormData(visitLogForm);
  const appointmentId = cleanText(formData.get("visitLogAppointmentId"));
  if (!appointmentId) {
    visitHistoryGlobalList.innerHTML = `<p class="muted">Choose or create an appointment first.</p>`;
    return false;
  }

  const appointment = state.appointments.find((item) => item.id === appointmentId);
  if (!appointment) {
    visitHistoryGlobalList.innerHTML = `<p class="muted">Choose or create an appointment first.</p>`;
    return false;
  }

  const specialtyValue =
    cleanText(formData.get("specialty")) === "__custom__"
      ? cleanText(formData.get("customSpecialty"))
      : cleanText(formData.get("specialty")) || appointment.specialty;
  const nextLog = {
    id: cleanText(formData.get("visitLogId")) || crypto.randomUUID(),
    date: cleanText(formData.get("date")),
    provider: appointment.doctor,
    clinic: cleanText(formData.get("clinic")) || appointment.clinic || extractClinicName(appointment.place),
    phone: appointment.contactPhone,
    portalLink: appointment.portalLink,
    insuranceAccepted: appointment.insuranceAccepted,
    specialty: specialtyValue || appointment.specialty,
    reason: cleanText(formData.get("reason")),
    status: cleanText(formData.get("status")) || "Completed",
    summary: cleanText(formData.get("summary")),
    results: cleanText(formData.get("results")),
    followUpNeeded: cleanText(formData.get("followUpNeeded")),
    followUpDueDate: cleanText(formData.get("followUpDueDate")),
    costCopay: cleanText(formData.get("costCopay")),
  };

  if (scheduleFollowUp && !isValidIsoDate(nextLog.followUpDueDate)) {
    visitLogForm.elements.followUpDueDate.setCustomValidity("Add a follow-up due date before scheduling.");
    visitLogForm.elements.followUpDueDate.reportValidity();
    visitLogForm.elements.followUpDueDate.setCustomValidity("");
    return false;
  }

  const currentHistory = normalizeVisitHistory(appointment.visitHistory || []);
  appointment.visitHistory = normalizeVisitHistory(
    cleanText(formData.get("visitLogId"))
      ? currentHistory.map((item) => (item.id === cleanText(formData.get("visitLogId")) ? nextLog : item))
      : [nextLog, ...currentHistory]
  );

  if (appointment.appointmentStatus !== "Cancelled" && ["Planned", "Scheduled"].includes(appointment.appointmentStatus)) {
    appointment.appointmentStatus = "Completed";
  }

  if (scheduleFollowUp) {
    appointment.nextRecommendedVisit = nextLog.followUpDueDate;
    appointment.reminderEnabled = appointment.reminderEnabled !== false;
    appointment.updatedAt = new Date().toISOString();
  }

  persist();
  if (addAnother) {
    resetVisitLogFormExceptProvider();
  } else {
    resetVisitLogForm();
    switchScreen("appointments");
    setSubtab("appointments", "records");
  }
  render();
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
  return state.appointments
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
  const normalizedHistory = normalizeVisitHistory(appointment.visitHistory || []).map((log) => ({
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

  const reminderItems = getAppointmentSummaries().filter((item) => item.reminderEnabled !== false && item.reminderStatus !== "ok");
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
  screens.forEach((screen) => screen.classList.toggle("is-active", screen.dataset.screen === target));
  screenButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.screenTarget === target));
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
    insurance: {},
    profile: {},
    deletedSeedKeys: [],
    lastNotificationDate: "",
  };
}

function normalizeState(saved) {
  const emptyState = getEmptyState();
  return {
    ...emptyState,
    appointments: normalizeAppointments(Array.isArray(saved?.appointments) ? saved.appointments : []),
    insurance: saved?.insurance && typeof saved.insurance === "object" ? saved.insurance : {},
    profile: saved?.profile && typeof saved.profile === "object" ? saved.profile : {},
    deletedSeedKeys: Array.isArray(saved?.deletedSeedKeys)
      ? saved.deletedSeedKeys.map((item) => cleanText(item)).filter(Boolean)
      : [],
    lastNotificationDate: cleanText(saved?.lastNotificationDate),
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

function renderSelectOptions(resetSelections = false) {
  const providerOptions = mergeTextLists(DEFAULT_PROVIDER_OPTIONS, state.appointments.map((item) => item.doctor));
  const specialtyOptions = mergeTextLists(DEFAULT_SPECIALTY_OPTIONS, state.appointments.map((item) => item.specialty));
  const reasonOptions = mergeTextLists(DEFAULT_REASON_OPTIONS, state.appointments.map((item) => item.reasonForVisit));
  const visitLogProviderValue = visitLogProviderSelect.value;
  const visitLogSpecialtyValue = visitLogSpecialtySelect.value;
  const providerSpecialtyValue = providerSpecialtySelect?.value;

  if (resetSelections || !providerSelect.innerHTML) {
    providerSelect.innerHTML = buildSelectOptions(providerOptions, "Select provider");
    specialtySelect.innerHTML = buildSelectOptions(specialtyOptions, "Select specialty");
    providerSpecialtySelect.innerHTML = buildSelectOptions(specialtyOptions, "Select specialty");
    reasonSelect.innerHTML = buildSelectOptions(reasonOptions, "Select reason");
  } else {
    const providerValue = providerSelect.value;
    const specialtyValue = specialtySelect.value;
    const reasonValue = reasonSelect.value;
    providerSelect.innerHTML = buildSelectOptions(providerOptions, "Select provider");
    specialtySelect.innerHTML = buildSelectOptions(specialtyOptions, "Select specialty");
    providerSpecialtySelect.innerHTML = buildSelectOptions(specialtyOptions, "Select specialty");
    reasonSelect.innerHTML = buildSelectOptions(reasonOptions, "Select reason");
    if ([...providerSelect.options].some((option) => option.value === providerValue)) providerSelect.value = providerValue;
    if ([...specialtySelect.options].some((option) => option.value === specialtyValue)) specialtySelect.value = specialtyValue;
    if ([...reasonSelect.options].some((option) => option.value === reasonValue)) reasonSelect.value = reasonValue;
    if (providerSpecialtySelect && [...providerSpecialtySelect.options].some((option) => option.value === providerSpecialtyValue)) {
      providerSpecialtySelect.value = providerSpecialtyValue;
    }
  }

  visitLogProviderSelect.innerHTML = buildVisitLogProviderOptions();
  visitLogSpecialtySelect.innerHTML = buildSelectOptions(specialtyOptions, "Select specialty");
  if ([...visitLogProviderSelect.options].some((option) => option.value === visitLogProviderValue)) {
    visitLogProviderSelect.value = visitLogProviderValue;
  }
  if ([...visitLogSpecialtySelect.options].some((option) => option.value === visitLogSpecialtyValue)) {
    visitLogSpecialtySelect.value = visitLogSpecialtyValue;
  }
}

function buildVisitLogProviderOptions() {
  return [`<option value="">Choose appointment / provider</option>`]
    .concat(
      state.appointments.map(
        (appointment) =>
          `<option value="${escapeHtml(appointment.id)}">${escapeHtml(
            `${appointment.doctor || "Unknown provider"} • ${appointment.title || "Untitled appointment"}`
          )}</option>`
      )
    )
    .join("");
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
  return (visitHistory || [])
    .map((log) => ({
      id: cleanText(log.id) || crypto.randomUUID(),
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
    }))
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
