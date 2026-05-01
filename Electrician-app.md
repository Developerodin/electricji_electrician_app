# Electrician/Technician App — Frontend Prototype Spec

**Purpose:** Page-by-page breakdown for clickable frontend prototype. Every screen, fields on it, what happens when buttons are tapped. Dummy data wherever input/output is needed. No backend logic, no APIs, no tech stack — just flow.

---

## NAVIGATION MAP (high level)

```
Splash → Language → Welcome → Phone → OTP → Permissions → Onboarding Intro
   → KYC Flow (10 steps) → KYC Status → Home Dashboard

Home Dashboard ⇄ Bottom Tab Nav:
   [Home] [Jobs] [Wholesale] [Learn] [Profile]

Side menu / extra entry points from Home:
   Earnings, Wallet, Notifications, Performance, Safety Tool, Referral, Support, Settings, SOS
```

---

# SECTION A — AUTH & ONBOARDING

### 1. Splash Screen
**Shows:** Logo, tagline, loader (2 sec).
**Auto-action:** After 2 sec → if first-time user goes to Language Selection, else goes to Home Dashboard.

---

### 2. Language Selection
**Elements:**
- Heading: "Choose your language"
- Radio list: English, हिंदी, मराठी, ગુજરાતી, தமிழ், తెలుగు
- Continue button (disabled until selected)

**Actions:**
- Continue → Welcome Carousel

---

### 3. Welcome Carousel (3 slides)
**Slide 1:** "Get jobs near you" + illustration
**Slide 2:** "Earn daily, withdraw fast" + illustration
**Slide 3:** "Buy tools at wholesale prices" + illustration

**Elements per slide:** Image, title, subtitle, dot indicator, Skip (top right), Next button.

**Actions:**
- Skip / Next on slide 3 → Phone Number Entry

---

### 4. Phone Number Entry
**Elements:**
- Logo (small)
- Heading: "Enter your mobile number"
- Country code prefilled +91 (locked)
- 10-digit number input
- T&C checkbox: "I agree to Terms & Privacy Policy"
- Send OTP button (disabled until valid number + checkbox)

**Actions:**
- Send OTP → OTP Verification (pass dummy number)
- Tap T&C link → opens dummy T&C page (static text)

---

### 5. OTP Verification
**Elements:**
- "OTP sent to +91 98XXXXXX21" (last 2 digits of entered number visible)
- 6 OTP boxes (auto-focus next)
- Resend OTP timer (30 sec countdown)
- Resend OTP link (active after timer ends)
- Verify button

**Dummy logic for prototype:** Any 6-digit input = success.

**Actions:**
- Verify → Permissions Screen
- Resend OTP → reset timer, show toast "OTP sent again"

---

### 6. Permissions Screen
**Elements:**
- "We need a few permissions" heading
- List with icon + text + toggle / Allow button each:
  - Location (Always) — "To match you with nearby jobs"
  - Notifications — "To alert you about new leads"
  - Camera — "For photos and selfie verification"
  - Storage — "To save your documents"
- Continue button

**Actions:**
- Tapping Allow on each → shows green tick (dummy)
- Continue → Onboarding Intro

---

### 7. Onboarding Intro
**Elements:**
- Illustration
- "Let's set up your profile"
- Subtitle: "Takes about 10 minutes. You'll need Aadhaar, PAN, and qualification certificates ready."
- Progress bar (0% / 10 steps)
- Start Profile Setup button

**Actions:**
- Start → KYC Step 1 (Personal Details)

---

# SECTION B — KYC & PROFILE SETUP (10 linear steps)

> All KYC screens have: progress bar at top (Step X of 10), Back arrow, Skip for now (only on optional steps).

### 8. KYC 1 — Personal Details
**Fields:**
- Full Name (text)
- Date of Birth (date picker)
- Gender (radio: Male / Female / Other)
- Languages Spoken (multi-select chips: Hindi, English, Marathi, etc.)

**Actions:**
- Next → KYC 2

---

### 9. KYC 2 — Profile Photo (Selfie)
**Elements:**
- Camera frame (oval guide)
- "Take a clear selfie" instruction
- Capture button
- Retake / Use Photo buttons (after capture)

**Dummy:** Show placeholder selfie after capture.

**Actions:**
- Use Photo → KYC 3

---

### 10. KYC 3 — Aadhaar Upload
**Fields:**
- Aadhaar number (12-digit input with auto-spaces)
- Upload Aadhaar Front (button → opens dummy file picker → shows uploaded thumbnail)
- Upload Aadhaar Back (same)
- Auto-filled fields after "OCR" (dummy): Name, DOB, Address (editable)

**Actions:**
- Next → KYC 4

---

### 11. KYC 4 — PAN Upload
**Fields:**
- PAN number (10-char input, auto-uppercase)
- Upload PAN image (button → thumbnail after upload)

**Actions:**
- Next → KYC 5

---

### 12. KYC 5 — Address Proof
**Fields:**
- Address proof type (dropdown: Utility Bill, Rent Agreement, Voter ID, Driving License)
- Upload document (button)
- Current address (textarea, auto-filled from Aadhaar, editable)
- Pincode (input)
- City, State (auto-fill from pincode — use dummy mapping)

**Actions:**
- Next → KYC 6

---

### 13. KYC 6 — Liveness / Face Match
**Elements:**
- Camera frame
- Instruction: "Blink twice slowly"
- Progress dots (Step 1: Look straight, Step 2: Blink, Step 3: Smile)
- Auto-capture (dummy: tap a button to simulate)
- Success animation: "Face matched ✓"

**Actions:**
- Continue → KYC 7

---

### 14. KYC 7 — Qualification Certificates
**Fields:**
- "Add a certificate" button (opens modal):
  - Certificate type (dropdown: ITI, Diploma, Degree, Vendor Certification, Other)
  - Issuing institute (text)
  - Year of completion (year picker)
  - Upload certificate (file picker)
  - Save button → adds to list
- List of added certificates (with delete icon per item)

**Actions:**
- Skip for now → KYC 8 (with warning toast)
- Next → KYC 8

---

### 15. KYC 8 — Specialization
**Fields:**
- Primary specialization (radio): Electrician, Plumber, AC Technician, Appliance Repair, Carpenter
- Sub-skills (multi-select chips, varies by primary): e.g. for Electrician — Wiring, Switchboard repair, Inverter installation, Fan repair, Geyser, Chandelier
- Years of experience (slider 0–25)

**Actions:**
- Next → KYC 9

---

### 16. KYC 9 — Service Area
**Elements:**
- Map preview (centered on user location)
- "Set as base location" button → drops pin
- Service radius (slider: 5 / 10 / 15 / 25 km) — radius circle visible on map
- Add additional pincodes (input, comma separated, max 5)
- List of saved pincodes (chips with × to remove)

**Actions:**
- Next → KYC 10

---

### 17. KYC 10 — Bank / UPI for Payouts
**Tab toggle:** Bank Account | UPI

**If Bank tab:**
- Account holder name
- Account number
- Confirm account number
- IFSC code (auto-fetch bank name from dummy mapping)
- Bank name (auto-filled, read-only)

**If UPI tab:**
- UPI ID input (e.g. name@paytm)
- Verify button → dummy check, shows "Verified ✓ Account holder: [Name from KYC]"

**Actions:**
- Submit for Verification → KYC Status Screen

---

### 18. KYC Status Screen
**Elements:**
- Big illustration
- Status badge (changes based on dummy state):
  - **Under Review** (default after submit) — yellow, "We're verifying your details. Usually takes 24–48 hours."
  - **Approved** — green, "Welcome aboard! You're ready to take jobs."
  - **Rejected** — red, with reason (dummy: "Aadhaar image unclear"), Re-upload button
- Submitted documents list (each with status icon)
- Continue to Home button (active only when Approved)

**Dummy toggle for prototype:** Add a small "Demo: change status" link to switch between states for client demo.

**Actions:**
- Continue → Home Dashboard
- Re-upload → goes back to relevant KYC step

---

# SECTION C — HOME & MAIN NAVIGATION

### 19. Home Dashboard
**Top bar:**
- Profile avatar (left) → opens Profile menu
- App logo (center)
- Notifications bell (right) with red dot if unread → Notifications Center

**Sticky online toggle (below top bar):**
- Toggle: Offline ⇄ Online (color: grey ⇄ green)
- Status text: "You're offline — turn on to get jobs" / "You're online — searching for jobs"

**Body (scrollable):**

**Card 1 — Today's snapshot:**
- Earnings today: ₹1,240
- Jobs done: 3
- Active job: 1 (if any)
- "View Earnings" link → Earnings Overview

**Card 2 — Performance score:**
- Score: 87 / 100
- Grade badge: A
- Trend arrow ↑
- Tap → Performance Overview

**Card 3 — Active job (only if job in progress):**
- Customer name, service type, address
- "Resume Job" CTA → Active Job Flow (current step)

**Card 4 — Incoming leads count:**
- "2 new leads waiting" → Job Lead Inbox

**Card 5 — Quick actions (horizontal scroll):**
- Wholesale, Learn, Safety Tool, Refer & Earn, Support

**Card 6 — Document expiry warning (only if applicable):**
- "Your Police Verification expires in 12 days" — Renew button → Profile > Documents

**Card 7 — Promo banner:**
- Dummy: "🔥 Surge active 9 PM – 11 AM tonight — earn up to 1.5x"

**Bottom Tab Bar (sticky):**
- Home (current) | Jobs | Wholesale | Learn | Profile

**Floating SOS button** (red, bottom right, only visible during active job).

---

### 20. Online/Offline Toggle Behavior
- Tap when offline → confirmation modal: "Go online and start receiving jobs?" → Yes / Cancel
- When online: enable a dummy timer that triggers Job Lead Modal after ~10 sec for prototype demo

---

# SECTION D — JOB LEAD FLOW

### 21. Incoming Job Lead Modal (popup over Home)
**Elements:**
- Header: "New job lead!" + countdown timer (30 sec circular)
- Service type icon + text: "Fan repair"
- Approx area: "Andheri West, ~2.3 km away"
- Estimated payout: ₹450 (Surge tag if applicable: "+₹100 surge")
- Estimated duration: 45 min
- Customer rating: ★ 4.6
- Reject button | Accept button

**Actions:**
- Accept → Lead Accepted Screen (full address now visible)
- Reject → opens Reject Reason modal (radio: Too far, Already busy, Skill mismatch, Other) → returns to Home, lead disappears
- Timer ends → lead auto-rejected, toast "Lead expired"

---

### 22. Lead Accepted Screen
**Elements:**
- "Job accepted ✓" success animation
- Customer name: Ravi Sharma
- Full address: Flat 502, Sunshine Apartments, Andheri West, Mumbai 400053
- Map preview with route from current location
- ETA: 12 min
- Customer phone (masked button: "Call customer")
- Chat button
- Start Navigation button

**Actions:**
- Start Navigation → En Route Screen
- Call → dummy call screen
- Chat → dummy chat screen

---

### 23. Job Lead Inbox
**Tabs:** Active / Missed / Rejected

**Each item card:**
- Service type, area, payout, time of lead
- Status tag

**Actions:**
- Tap active lead → Lead Accepted Screen
- Tap missed/rejected → read-only detail view

---

# SECTION E — ACTIVE JOB FLOW (8 steps)

> Floating SOS button visible on every screen in this flow.

### 24. En Route Screen
**Elements:**
- Full-screen map with route
- Top card: Customer name, ETA, distance
- Bottom action bar:
  - Call (masked) | Chat | I Have Arrived button (disabled until within ~100m — for prototype, always enabled but show a fake geo-check loader for 2 sec on tap)

**Actions:**
- I Have Arrived → Arrival Confirmation Screen

---

### 25. Arrival Confirmation Screen
**Elements:**
- "You've arrived at [Address]" 
- "Ask the customer for the Start OTP shown on their app"
- Continue button

**Actions:**
- Continue → Start OTP Screen

---

### 26. Start OTP Screen
**Elements:**
- 4-digit OTP boxes
- "Customer OTP shown in their app"
- Verify button (dummy: any 4 digits work)

**Actions:**
- Verify → Job In Progress Screen (timer starts)

---

### 27. Job In Progress Screen
**Elements:**
- Top: Running timer (00:14:32 ticking)
- Customer name + address (collapsible)
- Tabs / sections:
  - **Before Photos** — "Add photos" button, min 2 required (show dummy thumbnails after upload)
  - **Parts/Materials Used** — "Add item" button → modal (Item name, quantity, unit price), list of added items below
  - **Notes** — textarea
- Pause Job button | Mark Complete button (disabled until 2 before-photos added)
- SOS sticky

**Actions:**
- Pause → modal "Pause reason" → returns to a paused state with "Resume" button
- Mark Complete → Mark Complete Screen

---

### 28. Mark Complete Screen
**Elements:**
- "Add after photos" — min 2 required
- Final notes textarea (optional)
- Total parts cost (auto-summed from earlier list)
- Continue button

**Actions:**
- Continue → Final Invoice Screen

---

### 29. Final Invoice Screen
**Elements (auto-generated, editable amounts):**
- Service charge: ₹350
- Parts cost: ₹120
- Surge bonus: ₹100 (if applicable, highlighted)
- Subtotal: ₹570
- GST 18%: ₹102.6
- **Total: ₹672.6**
- "Send to customer for approval" button

**Actions:**
- Send → Customer Approval Waiting Screen (small loader, 3 sec dummy) → End OTP Screen

---

### 30. End OTP Screen
**Elements:**
- "Customer approved ✓"
- 4-digit OTP boxes
- "Ask customer for End OTP from their app"
- Verify button

**Actions:**
- Verify → Upload Proof Screen

---

### 31. Upload Proof Screen
**Elements:**
- Show summary photos (before + after thumbnails)
- Customer signature box (drawable area)
- "Job locked" indicator
- Submit button

**Actions:**
- Submit → Job Summary Screen

---

### 32. Job Summary Screen
**Elements:**
- Big checkmark ✓
- "Job completed!"
- Earnings earned: ₹570 (your share after platform cut)
- Payout date: "Tomorrow by 6 PM"
- "Rate this customer" (5 stars + optional note)
- Back to Home button

**Actions:**
- Back to Home → Home Dashboard (active job card disappears)

---

# SECTION F — EARNINGS

### 33. Earnings Overview
**Top tabs:** Today | Week | Month | Custom

**Elements:**
- Big number: Total earned ₹4,820 (selected period)
- Line chart (dummy data)
- Stats row: Jobs done, Avg per job, Tips, Surge earnings
- "View payouts" link → Payouts Screen
- Job list (recent jobs in period, tap → Job Earning Detail)

---

### 34. Job Earning Detail
**Elements:**
- Job ID, date, customer name
- Service type
- Breakdown table:
  - Base service charge
  - Parts revenue
  - Surge bonus
  - Tip
  - Platform fee (-)
  - GST (-)
  - **Net earnings**
- Status: Paid / Pending payout
- Download invoice button

---

### 35. Payouts Screen
**Tabs:** Pending | Completed

**Pending list item:**
- Date earned, amount, payout date, "10% gap credit held: ₹120" tag

**Completed list item:**
- Date paid, amount, UTR number, bank/UPI used

**Actions:**
- Tap any → detail modal

---

### 36. Tax Documents
**Elements:**
- GST invoices (monthly list, download icon each)
- TDS statements (monthly)
- Form 16A (yearly)

**Actions:**
- Download → dummy PDF preview / share sheet

---

# SECTION G — WALLET & PAYOUT SETUP

### 37. Wallet Home
**Elements:**
- Available balance: ₹3,200
- Held (gap credit): ₹450
- Total earned this month: ₹12,400
- Withdraw button
- Manage bank/UPI link
- Recent transactions list

**Actions:**
- Withdraw → Withdrawal modal (amount input + confirmation)
- Manage → Bank/UPI Manager

---

### 38. Bank/UPI Manager
**Elements:**
- List of saved methods (bank, UPI), with "Primary" tag on default
- Each item: edit, set as primary, delete
- Add new button

**Actions:**
- Add → Add Bank/UPI Screen (same as KYC step 10)

---

### 39. Withdrawal History
**Elements:**
- List with: amount, date initiated, status (Initiated / Processed / Failed), UTR

---

# SECTION H — WHOLESALE MARKETPLACE

### 40. Marketplace Home
**Elements:**
- Search bar
- Category grid (icons): Wires, Switches, MCBs, Tools, Plumbing, AC Parts, Lighting, Safety Gear
- "Today's deals" horizontal carousel (3–5 dummy products)
- "Reorder your usuals" section (recently bought)

**Bottom Tab:** Wholesale (active)

**Actions:**
- Tap category → Category Listing
- Tap search → Search/Filter Screen
- Tap product card → Product Detail

---

### 41. Category Listing
**Elements:**
- Category title + filter icon
- Sort dropdown (Price low-high, high-low, Rating, Bestseller)
- Product grid (2 cols):
  - Image, name, brand, B2B price (big), MRP (strikethrough), savings %, ★ rating, "Add" button

---

### 42. Search & Filter
**Elements:**
- Search input (with recent searches)
- Filter sidebar/modal: Brand (checkboxes), Price range slider, Rating, In stock toggle
- Apply / Clear All buttons

---

### 43. Product Detail
**Elements:**
- Image carousel
- Product name, brand
- B2B price ₹220 | MRP ₹350 | You save ₹130 (37%)
- Rating + reviews count (tap → reviews list)
- Specs table (collapsible)
- Stock indicator
- Quantity selector
- Add to Cart button (sticky bottom)
- Buy Now button

**Actions:**
- Add to Cart → toast "Added", cart icon updates
- Buy Now → Cart screen with this item

---

### 44. Cart
**Elements:**
- Item list (image, name, qty editor, price, remove ×)
- Subtotal, Delivery fee, GST, **Total**
- Delivery address card (default — change link)
- Proceed to Checkout button

---

### 45. Checkout
**Elements:**
- Order summary (collapsible)
- Delivery address (editable)
- Payment method radio:
  - Pay from earnings wallet (₹3,200 available)
  - UPI / Card
  - Pay later (BNPL — tag: "Phase 4 feature, hidden in prototype" — or include greyed out)
- Place Order button

**Actions:**
- Place Order → Order Confirmation Screen → Order Tracking

---

### 46. Order Confirmation
**Elements:** Big ✓, Order ID, "Estimated delivery: in 3 days", View Order button.

**Actions:**
- View Order → Order Tracking

---

### 47. Order Tracking
**Elements:**
- Order ID, items summary
- Status timeline (vertical):
  - Placed ✓ (date)
  - Packed ✓ (date)
  - Shipped (active)
  - Out for delivery
  - Delivered
- Courier name + tracking number (dummy)
- Cancel order button (only if status = Placed)
- Raise return button (only if status = Delivered)

---

### 48. Order History
**Elements:**
- Tabs: Active | Delivered | Cancelled | Returns
- List of past orders (Order ID, date, total, status)

**Actions:**
- Tap → Order Tracking (read-only for completed)

---

### 49. Returns / Refund
**Elements:**
- Item picker (which item to return)
- Reason dropdown
- Photos upload
- Refund mode (back to wallet / original payment)
- Submit button

---

# SECTION I — LEARN & CERTIFY

### 50. Course Catalog
**Elements:**
- Filter chips: All, Beginner, Intermediate, Advanced, By specialization
- Course cards: thumbnail, title, duration, level, language, badge preview
- "In progress" section at top

**Bottom Tab:** Learn (active)

---

### 51. Course Detail
**Elements:**
- Hero image
- Title, instructor, duration, level
- Description
- "What you'll learn" bullet list
- Modules list (chapter-wise, each with lock icon if locked behind previous)
- Badge preview ("Earn this badge on completion")
- Enroll / Continue button

**Actions:**
- Enroll → Lesson Player (Lesson 1)

---

### 52. Lesson Player
**Elements:**
- Video player (dummy)
- Lesson title, duration
- Tabs: Notes (PDF download), Transcript, Discussion
- Mark as Complete button
- Next Lesson button

**Actions:**
- Mark Complete → unlocks next lesson, progress updates
- After last lesson → Quiz

---

### 53. Quiz Screen
**Elements:**
- Question counter (Q 3 / 10)
- Question text
- 4 MCQ options
- Next button (after select)
- Submit on last question

**Result screen:** Score, pass/fail, badge earned (if pass), Retry / Go to badges.

---

### 54. My Badges
**Elements:**
- Grid of earned badges (with date earned)
- Tap → badge detail modal with share to WhatsApp option
- "Locked" badges section (greyed out)

---

# SECTION J — SAFETY INSPECTION TOOL

### 55. Safety Tool Home / Start Inspection
**Elements:**
- Two big cards:
  - "Inspect after a job" (linked to current/recent job)
  - "Start standalone inspection" (separate paid service)
- Past inspections list below

**Actions:**
- Tap card → Inspection Checklist

---

### 56. Inspection Checklist
**Elements:**
- Customer info card
- Category accordions: Wiring, Earthing, MCB/RCB, Sockets, Geyser, AC, Gas (only if applicable)
- Each checkpoint:
  - Question (e.g. "Earthing properly connected?")
  - Status: Pass / Fail / Needs Attention (radio)
  - Photo upload (optional)
  - Notes (optional)
- Progress: 12 / 30 checkpoints done
- Generate Report button (active when all done)

---

### 57. Score & Recommendations
**Elements:**
- Big score: 78 / 100, grade: B
- Status breakdown: Pass 22, Fail 3, Needs Attention 5
- Recommendations list (auto-generated based on fails)
- Continue button

---

### 58. Report Preview & Send
**Elements:**
- PDF preview
- Send via: WhatsApp / Email / SMS
- Save copy toggle
- Send button

**Actions:**
- Send → toast "Report sent", back to Safety Tool Home

---

### 59. Inspection History
**Elements:** List of past inspections (date, customer, score), tap → report preview (read-only).

---

# SECTION K — PERFORMANCE

### 60. Performance Overview
**Elements:**
- Big score circle: 87 / 100, Grade A
- Trend chart (last 30 days)
- Sub-scores (4 cards):
  - Average rating: 4.7 ★
  - Acceptance rate: 92%
  - Completion rate: 98%
  - On-time arrival: 89%
- Recent reviews list (rating, customer name, comment, date)
- Improvement tips card
- Warnings/strikes log (collapsible)

---

# SECTION L — PROFILE

### 61. Profile Menu (also accessible via bottom tab)
**Elements:**
- Top: Avatar, Name, ID, ★ rating, Performance score
- "View public profile" button
- List of menu items (each → its own page):
  - Personal Information
  - Documents
  - Service Area
  - Specializations
  - Availability
  - Languages
  - Bio / About
  - Bank & UPI
  - Refer & Earn
  - Help & Support
  - Settings
  - Logout

---

### 62. Personal Information
**Elements:** Read-only fields from KYC (name, DOB, gender, phone, email), Edit button → makes editable, Save.

---

### 63. Documents
**Elements:**
- List of all uploaded docs (Aadhaar, PAN, address proof, certs)
- Each with: name, status (Verified / Expiring / Expired), upload date, expiry date (if any), Re-upload button

---

### 64. Service Area Edit
Same as KYC 9 — map + radius + pincodes, Save button.

---

### 65. Specializations Edit
Same as KYC 8 — primary, sub-skills, experience, Save button.

---

### 66. Availability Schedule
**Elements:**
- Weekly view: Mon–Sun rows, each with Available toggle + working hours (start/end time)
- Calendar to mark leave dates (red highlight)
- Save button

---

### 67. Languages
Multi-select chips, Save.

---

### 68. Bio / About
Textarea (200 char limit), Save.

---

### 69. Public Profile Preview
Read-only view of what the customer sees: avatar, name, rating, badges earned, specializations, years exp, total jobs done, sample reviews.

---

# SECTION M — NOTIFICATIONS

### 70. Notifications Center
**Elements:**
- Tabs: All | Jobs | Payouts | Training | Admin
- List of notifications (icon, title, snippet, time):
  - Dummy data examples:
    - "New job lead in Andheri West — ₹450" (Jobs)
    - "₹2,400 credited to your account" (Payouts)
    - "New course available: Smart switch installation" (Training)
    - "Document expiring in 15 days" (Admin)
    - "Surge active tonight 9 PM – 11 AM" (Admin)
- Unread = bold + dot
- Mark all as read button (top right)

**Actions:**
- Tap → relevant deep link (e.g. Jobs notif → Job Lead Inbox)

---

# SECTION N — HELP & SUPPORT

### 71. Support Home
**Elements:**
- Search bar ("How can we help?")
- Popular topics (chips): Payout issue, KYC rejected, Job problem, App crash
- "Raise a ticket" button
- "My tickets" link
- Call support button (dummy phone number)

---

### 72. FAQ List
Categorized list, each item collapsible to show answer.

---

### 73. Raise Ticket
**Fields:**
- Category (dropdown)
- Subject
- Description (textarea)
- Attach photos (optional)
- Submit button

**Actions:**
- Submit → success screen with ticket ID → My Tickets

---

### 74. My Tickets
**Tabs:** Open | Resolved
**List:** Ticket ID, subject, last updated, status badge.

**Actions:**
- Tap → Ticket Chat

---

### 75. Ticket Chat
**Elements:**
- Chat thread (you ⇄ support)
- Input field + send + attach
- "Close ticket" button (top right, only if open)

---

### 76. SOS Modal/Screen (triggered by floating SOS button during active job)
**Elements:**
- Big red header: "Emergency"
- "Calling support and sharing your live location..."
- 3 quick action buttons:
  - Call Support (dummy 1800 number)
  - Call Police (100)
  - Cancel
- Map showing your location (dummy)

**Actions:**
- Cancel → back to active job
- After 5 sec auto → "Help is on the way" confirmation screen

---

# SECTION O — REFERRAL

### 77. Refer & Earn
**Elements:**
- "Earn ₹500 per friend" headline
- Your referral code (big, copyable) + Share button (WhatsApp, SMS, more)
- Stats row: Invited 12 | Joined 4 | Active 2 | Earned ₹1,000
- How it works (3 steps illustration)
- Referral list:
  - Each: name, status (Invited / Joined / Active / Paid), date, reward earned

---

# SECTION P — SETTINGS

### 78. Settings
**Elements (each tappable):**
- Language → opens Language Selection
- Notifications preferences (toggle list per category: Jobs, Payouts, Training, Promo)
- Privacy Policy (static page)
- Terms & Conditions (static page)
- About (app version, build number)
- Check for updates
- Logout
- Delete Account (red text)

---

### 79. Delete Account Confirmation
**Elements:**
- Warning text
- Reason dropdown (optional)
- "Type DELETE to confirm" input
- Confirm Delete button (only enabled when typed correctly)
- Cancel button

**Actions:**
- Confirm → success screen → back to Splash / Phone Entry

---

# DUMMY DATA YOU'LL NEED LOADED FOR THE PROTOTYPE

For client demo, pre-load these so screens look real:

1. **3 dummy job leads** (different services, areas, payouts)
2. **5 completed jobs** in earnings history
3. **2 pending payouts** with gap credit hold
4. **8 notifications** spread across categories
5. **4 wholesale orders** (1 active, 2 delivered, 1 cancelled)
6. **3 enrolled courses** (1 in progress, 2 completed with badges)
7. **2 past safety inspections**
8. **6 customer reviews** for performance screen
9. **5 referrals** in different statuses
10. **2 open support tickets**

---

# FLOWS WORTH DEMOING TO THE CLIENT (live click-throughs)

When showing the client, walk them through these end-to-end:

1. **Onboarding flow** — Splash → KYC complete → Home
2. **Take a job flow** — Online toggle → Lead modal → Accept → En route → Start OTP → Complete → End OTP → Job Summary
3. **Earnings → Withdraw flow** — Home → Earnings → Wallet → Withdraw
4. **Wholesale purchase flow** — Marketplace → Product → Cart → Checkout → Order Tracking
5. **Safety inspection flow** — Safety Tool → Checklist → Score → Send report
6. **Course completion flow** — Catalog → Course → Lesson → Quiz → Badge earned
7. **SOS flow** — Active job → SOS button → emergency screen
8. **Refer & earn flow** — Profile → Refer → Share

---

**Total screens: ~79**
**End of frontend prototype spec.**