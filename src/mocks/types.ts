/** Shared dummy-data shapes for the electrician prototype. */

export type JobLead = {
  id: string;
  serviceType: string;
  area: string;
  payout: string;
  surge?: string;
  durationMin: number;
  customerRating: number;
  status: 'active' | 'missed' | 'rejected';
  timeLabel: string;
};

export type CompletedJob = {
  id: string;
  customerName: string;
  serviceType: string;
  date: string;
  gross: string;
  net: string;
  status: 'Paid' | 'Pending payout';
};

export type NotificationItem = {
  id: string;
  category: 'Jobs' | 'Payouts' | 'Training' | 'Admin';
  title: string;
  snippet: string;
  time: string;
  unread: boolean;
};

export type WholesaleOrder = {
  id: string;
  date: string;
  total: string;
  status: 'Active' | 'Delivered' | 'Cancelled';
};

export type CourseItem = {
  id: string;
  title: string;
  duration: string;
  level: string;
  progress?: number;
  badge?: string;
  enrolled: boolean;
};

export type InspectionItem = {
  id: string;
  date: string;
  customer: string;
  score: number;
};

export type ReviewItem = {
  id: string;
  customer: string;
  rating: number;
  comment: string;
  date: string;
};

export type ReferralItem = {
  id: string;
  name: string;
  status: 'Invited' | 'Joined' | 'Active' | 'Paid';
  date: string;
  reward: string;
};

export type TicketItem = {
  id: string;
  subject: string;
  status: 'Open' | 'Resolved';
  updated: string;
};

export type PayoutItem = {
  id: string;
  amount: string;
  earnedDate: string;
  payoutDate: string;
  gapHold?: string;
  state: 'Pending' | 'Completed';
  utr?: string;
};

export type ProductItem = {
  id: string;
  name: string;
  brand: string;
  b2b: string;
  mrp: string;
  savePct: number;
  rating: number;
  category: string;
};
