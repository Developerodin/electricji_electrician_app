import type {
  CompletedJob,
  CourseItem,
  InspectionItem,
  JobLead,
  NotificationItem,
  PayoutItem,
  ProductItem,
  ReferralItem,
  ReviewItem,
  TicketItem,
  WholesaleOrder,
} from './types';

/** Spec: 3 dummy job leads */
export const MOCK_LEADS: JobLead[] = [
  {
    id: 'L1',
    serviceType: 'Fan repair',
    area: 'Andheri West, ~2.3 km',
    payout: '₹450',
    surge: '+₹100 surge',
    durationMin: 45,
    customerRating: 4.6,
    status: 'active',
    timeLabel: '2 min ago',
  },
  {
    id: 'L2',
    serviceType: 'Geyser install',
    area: 'Bandra East, ~4.1 km',
    payout: '₹1,200',
    durationMin: 90,
    customerRating: 4.2,
    status: 'missed',
    timeLabel: 'Yesterday',
  },
  {
    id: 'L3',
    serviceType: 'Switchboard repair',
    area: 'Malad, ~6 km',
    payout: '₹380',
    durationMin: 30,
    customerRating: 4.8,
    status: 'rejected',
    timeLabel: 'Mon',
  },
];

/** Spec: 5 completed jobs in earnings */
export const MOCK_COMPLETED_JOBS: CompletedJob[] = [
  {
    id: 'J1',
    customerName: 'Ravi Sharma',
    serviceType: 'Fan repair',
    date: 'Today',
    gross: '₹672.6',
    net: '₹570',
    status: 'Pending payout',
  },
  {
    id: 'J2',
    customerName: 'Neha K.',
    serviceType: 'MCB change',
    date: 'Yesterday',
    gross: '₹540',
    net: '₹480',
    status: 'Paid',
  },
  {
    id: 'J3',
    customerName: 'A. Patil',
    serviceType: 'Tubelight',
    date: '2 days ago',
    gross: '₹320',
    net: '₹280',
    status: 'Paid',
  },
  {
    id: 'J4',
    customerName: 'S. Dsouza',
    serviceType: 'Inverter check',
    date: '3 days ago',
    gross: '₹890',
    net: '₹750',
    status: 'Paid',
  },
  {
    id: 'J5',
    customerName: 'K. Menon',
    serviceType: 'Wiring',
    date: '5 days ago',
    gross: '₹1,100',
    net: '₹950',
    status: 'Paid',
  },
];

/** Spec: 2 pending payouts with gap credit */
export const MOCK_PAYOUTS: PayoutItem[] = [
  {
    id: 'P1',
    amount: '₹2,400',
    earnedDate: '28 Apr 2026',
    payoutDate: '2 May 2026',
    gapHold: '10% gap credit held: ₹120',
    state: 'Pending',
  },
  {
    id: 'P2',
    amount: '₹1,150',
    earnedDate: '27 Apr 2026',
    payoutDate: '1 May 2026',
    gapHold: '10% gap credit held: ₹85',
    state: 'Pending',
  },
  {
    id: 'P3',
    amount: '₹4,200',
    earnedDate: '20 Apr 2026',
    payoutDate: '22 Apr 2026',
    state: 'Completed',
    utr: 'UTR9023412341',
  },
];

/** Spec: 8 notifications */
export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'N1',
    category: 'Jobs',
    title: 'New job lead in Andheri West',
    snippet: 'Fan repair — ₹450',
    time: '2m ago',
    unread: true,
  },
  {
    id: 'N2',
    category: 'Payouts',
    title: '₹2,400 credited',
    snippet: 'Bank transfer completed',
    time: '1h ago',
    unread: true,
  },
  {
    id: 'N3',
    category: 'Training',
    title: 'New course: Smart switch installation',
    snippet: 'Earn a badge on completion',
    time: '3h ago',
    unread: false,
  },
  {
    id: 'N4',
    category: 'Admin',
    title: 'Document expiring in 15 days',
    snippet: 'Police verification renewal',
    time: 'Yesterday',
    unread: true,
  },
  {
    id: 'N5',
    category: 'Admin',
    title: 'Surge active tonight',
    snippet: '9 PM – 11 AM — earn up to 1.5x',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 'N6',
    category: 'Jobs',
    title: 'Lead missed',
    snippet: 'Switchboard repair — Malad',
    time: 'Mon',
    unread: false,
  },
  {
    id: 'N7',
    category: 'Payouts',
    title: 'Payout delayed',
    snippet: 'Bank holiday — rescheduled',
    time: 'Sun',
    unread: false,
  },
  {
    id: 'N8',
    category: 'Training',
    title: 'Quiz passed',
    snippet: 'You earned the Safety basics badge',
    time: 'Sat',
    unread: true,
  },
];

/** Spec: 4 wholesale orders */
export const MOCK_ORDERS: WholesaleOrder[] = [
  {
    id: 'ORD-1042',
    date: 'Today',
    total: '₹1,240',
    status: 'Active',
  },
  {
    id: 'ORD-1031',
    date: '12 Apr 2026',
    total: '₹3,400',
    status: 'Delivered',
  },
  {
    id: 'ORD-1018',
    date: '2 Apr 2026',
    total: '₹890',
    status: 'Delivered',
  },
  {
    id: 'ORD-1004',
    date: '28 Mar 2026',
    total: '₹450',
    status: 'Cancelled',
  },
];

/** Spec: 3 enrolled courses */
export const MOCK_COURSES: CourseItem[] = [
  {
    id: 'C1',
    title: 'Smart switch installation',
    duration: '2h',
    level: 'Intermediate',
    progress: 45,
    enrolled: true,
  },
  {
    id: 'C2',
    title: 'Earthing & MCB basics',
    duration: '1.5h',
    level: 'Beginner',
    badge: 'Safety basics',
    enrolled: true,
  },
  {
    id: 'C3',
    title: 'Inverter servicing',
    duration: '3h',
    level: 'Advanced',
    badge: 'Power pro',
    enrolled: true,
  },
];

/** Spec: 2 past inspections */
export const MOCK_INSPECTIONS: InspectionItem[] = [
  {
    id: 'IN1',
    date: '18 Apr 2026',
    customer: 'Ravi Sharma',
    score: 78,
  },
  {
    id: 'IN2',
    date: '5 Apr 2026',
    customer: 'Neha K.',
    score: 91,
  },
];

/** Spec: 6 customer reviews */
export const MOCK_REVIEWS: ReviewItem[] = [
  {
    id: 'R1',
    customer: 'Ravi S.',
    rating: 5,
    comment: 'On time, neat work.',
    date: 'Today',
  },
  {
    id: 'R2',
    customer: 'Neha K.',
    rating: 4,
    comment: 'Good explanation of issue.',
    date: 'Yesterday',
  },
  {
    id: 'R3',
    customer: 'A. Patil',
    rating: 5,
    comment: '',
    date: '2d ago',
  },
  {
    id: 'R4',
    customer: 'S. Dsouza',
    rating: 4,
    comment: 'Fair pricing.',
    date: '3d ago',
  },
  {
    id: 'R5',
    customer: 'K. Menon',
    rating: 5,
    comment: 'Will book again.',
    date: '5d ago',
  },
  {
    id: 'R6',
    customer: 'V. Shah',
    rating: 3,
    comment: 'Minor delay.',
    date: '1w ago',
  },
];

/** Spec: 5 referrals */
export const MOCK_REFERRALS: ReferralItem[] = [
  {
    id: 'RF1',
    name: 'Amit',
    status: 'Paid',
    date: '10 Apr',
    reward: '₹500',
  },
  {
    id: 'RF2',
    name: 'Priya',
    status: 'Active',
    date: '12 Apr',
    reward: '—',
  },
  {
    id: 'RF3',
    name: 'Rohit',
    status: 'Joined',
    date: '15 Apr',
    reward: '—',
  },
  {
    id: 'RF4',
    name: 'Sana',
    status: 'Invited',
    date: '18 Apr',
    reward: '—',
  },
  {
    id: 'RF5',
    name: 'Vikram',
    status: 'Invited',
    date: '20 Apr',
    reward: '—',
  },
];

/** Spec: 2 open support tickets */
export const MOCK_TICKETS: TicketItem[] = [
  {
    id: 'TK-8821',
    subject: 'Payout not received',
    status: 'Open',
    updated: '2h ago',
  },
  {
    id: 'TK-8804',
    subject: 'KYC document rejected',
    status: 'Open',
    updated: 'Yesterday',
  },
];

export const MOCK_PRODUCTS: ProductItem[] = [
  {
    id: 'PR1',
    name: '2.5 sq mm copper wire (90m)',
    brand: 'Polycab',
    b2b: '₹2,200',
    mrp: '₹2,899',
    savePct: 24,
    rating: 4.6,
    category: 'Wires',
  },
  {
    id: 'PR2',
    name: '6A one-way switch (10 pc)',
    brand: 'Anchor',
    b2b: '₹220',
    mrp: '₹350',
    savePct: 37,
    rating: 4.4,
    category: 'Switches',
  },
];

export const TECHNICIAN_PROFILE = {
  name: 'Arjun Mehta',
  id: 'EJ-10492',
  rating: 4.7,
  perfScore: 87,
  grade: 'A',
};
