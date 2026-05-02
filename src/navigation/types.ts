import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Root stack: splash, full auth+KYC chain, then main app tabs.
 */
export type RootStackParamList = {
  Splash: undefined;
  LanguageSelection: undefined;
  PhoneEntry: undefined;
  EnterOtp: { phoneLast2?: string } | undefined;
  Permissions: undefined;
  OnboardingIntro: undefined;
  KycPersonal: undefined;
  KycSelfie: undefined;
  KycAadhaar: undefined;
  KycPan: undefined;
  KycAddressProof: undefined;
  KycLiveness: undefined;
  KycCertificates: undefined;
  KycSpecialization: undefined;
  KycServiceArea: undefined;
  KycBankUpi: undefined;
  KycStatus: undefined;
  MainTabs: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  EarningsOverview: undefined;
  JobEarningDetail: { jobId: string };
  Payouts: undefined;
  TaxDocuments: undefined;
  WalletHome: undefined;
  BankUpiManager: undefined;
  WithdrawalHistory: undefined;
  PerformanceOverview: undefined;
  NotificationsCenter: undefined;
  SafetyToolHome: undefined;
  InspectionChecklist: { inspectionId?: string } | undefined;
  ScoreRecommendations: undefined;
  ReportPreviewSend: undefined;
  InspectionHistory: undefined;
};

export type JobsStackParamList = {
  JobLeadInbox: undefined;
  LeadAccepted: { leadId?: string } | undefined;
  EnRoute: undefined;
  ArrivalConfirmation: undefined;
  StartOtp: undefined;
  JobInProgress: undefined;
  MarkComplete: undefined;
  FinalInvoice: undefined;
  EndOtp: undefined;
  UploadProof: undefined;
  JobSummary: undefined;
  SosModal: undefined;
};

export type WholesaleStackParamList = {
  MarketplaceHome: undefined;
  CategoryListing: { category: string };
  SearchFilter: undefined;
  ProductDetail: { productId: string };
  Cart: undefined;
  Checkout: undefined;
  OrderConfirmation: { orderId: string };
  OrderTracking: { orderId: string };
  OrderHistory: undefined;
  ReturnsRefund: { orderId?: string } | undefined;
};

export type LearnStackParamList = {
  CourseCatalog: undefined;
  CourseDetail: { courseId: string };
  LessonPlayer: { courseId: string; lessonIndex: number };
  Quiz: { courseId: string };
  MyBadges: undefined;
};

export type ProfileStackParamList = {
  ProfileMenu: undefined;
  PersonalInformation: undefined;
  Documents: undefined;
  ServiceAreaEdit: undefined;
  SpecializationsEdit: undefined;
  AvailabilitySchedule: undefined;
  Languages: undefined;
  BioAbout: undefined;
  PublicProfilePreview: undefined;
  ReferEarn: undefined;
  SupportHome: undefined;
  FaqList: undefined;
  RaiseTicket: undefined;
  MyTickets: undefined;
  TicketChat: { ticketId: string };
  Settings: undefined;
  DeleteAccount: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  JobsTab: undefined;
  WholesaleTab: undefined;
  LearnTab: undefined;
  ProfileTab: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
