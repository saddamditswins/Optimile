# OptiMile - Complete Screen Specifications

**Last Updated:** January 2026  
**Application:** OptiMile - Enterprise Last-Mile Execution Control Platform  
**Total Screens:** 100+

---

## TABLE OF CONTENTS

1. [Common Screens (All Roles)](#common-screens-all-roles)
2. [Dispatch Manager Screens](#dispatch-manager-screens)
3. [Operations Manager Screens](#operations-manager-screens)
4. [Tenant Admin Screens](#tenant-admin-screens)

---

## COMMON SCREENS (ALL ROLES)

### SCREEN 0.1 - Role Selection
**Route:** `/`  
**Access:** Public (entry point)  
**Purpose:** Allow user to explicitly choose operational role before authentication

**Layout:**
- Centered on white background
- OptiMile logo and tagline
- 3 role cards in horizontal layout

**Role Cards:**
1. **Dispatch Manager**
   - Icon: Command center icon
   - Title: "Dispatch Manager"
   - Description: "Live delivery execution and in-day recovery decisions"
   - Primary action button

2. **Operations Manager**
   - Icon: Governance icon
   - Title: "Operations Manager"
   - Description: "Escalation approval, oversight, and outcome review"
   - Primary action button

3. **Tenant Admin**
   - Icon: Settings/admin icon
   - Title: "Tenant Admin"
   - Description: "Enterprise configuration, user management, and governance"
   - Primary action button

**Interactions:**
- Click role card → Navigate to Login Screen with selected role context

**Design Notes:**
- Clean, enterprise SaaS aesthetic
- Clear visual separation between cards
- Consistent blue accent color

---

### SCREEN 0.2 - Login Screen
**Route:** `/login`  
**Access:** Public (after role selection)  
**Purpose:** Authenticate user for selected role

**Layout:**
- Split screen: Left = branding, Right = login form
- Role context displayed at top of form
- Back button to return to role selection

**Form Fields:**
- Email address (text input)
- Password (password input)
- "Remember me" checkbox
- "Forgot password?" link

**Actions:**
- **Sign In** button → Validate credentials → Navigate to role-specific dashboard
- **Back** button → Return to Role Selection

**Mock Credentials:**
- Email: `demo@optimile.com`
- Password: `demo123`

**Post-Login Routing:**
- Dispatch Manager → Operations Dashboard
- Operations Manager → Operations Manager Dashboard
- Tenant Admin → First Login Landing (if setup incomplete) OR Tenant Dashboard (if setup complete)

---

## DISPATCH MANAGER SCREENS

### SCREEN 1.1 - Operations Dashboard
**Route:** `/dashboard`  
**Access:** Dispatch Manager only  
**Purpose:** Live operational control center with real-time delivery execution overview

**Header:**
- Page title: "Operations Dashboard"
- Date/time
- User profile menu
- Logout button

**Executive Summary Cards (Top Row):**
1. **SLA Health**
   - Today's SLA: 94.7%
   - Trend indicator (up/down)
   - At-risk count

2. **Active Routes**
   - Total: 28
   - On-time: 24
   - At-risk: 4

3. **Active Drivers**
   - Total: 32
   - Available: 6
   - On-break: 4

4. **Active Alerts**
   - Total: 12
   - Critical: 3
   - High: 5
   - Medium: 4

**Live Operations Grid:**
- Tabs: Routes (default), Drivers, Deliveries
- Filterable, sortable grid
- Status indicators (color-coded)
- Quick actions per row

**Risk Focus Panel:**
- "View Risk Focus" button
- Opens Risk Focus View overlay

**Interactions:**
- Click summary card → Navigate to respective module (Routes/Drivers/Deliveries/Alerts)
- Click "View Risk Focus" → Open Risk Focus View modal
- Click grid row → Navigate to detail screen

---

### SCREEN 1.2 - Risk Focus View
**Route:** `/risk-focus` (overlay/modal)  
**Access:** Dispatch Manager only  
**Purpose:** Filtered view of high-risk items requiring immediate attention

**Layout:**
- Modal overlay over dashboard
- Close/back button

**Filter Panels:**
- **Severity:** Critical, High, Medium
- **Category:** SLA Risk, Driver Delay, Route Deviation, VIP At-Risk

**Risk Items List:**
- Risk severity badge
- Item type (Route/Driver/Delivery)
- Item ID and name
- Risk description
- Time remaining to breach
- Quick action buttons

**Quick Actions:**
- View Detail
- Start Recovery
- Acknowledge

**Interactions:**
- Click risk item → Navigate to detail screen
- Click "Start Recovery" → Navigate to Recovery Entry Context
- Click close → Return to dashboard

---

### SCREEN 2.1 - Routes List
**Route:** `/routes`  
**Access:** Dispatch Manager only  
**Purpose:** View and manage all active routes

**Header:**
- Page title: "Routes"
- Search bar
- Filter panel toggle

**Filters:**
- Status: All, Active, At-Risk, Delayed, Completed
- Region: Northeast, Central, West
- Risk Level: Critical, High, Medium, Low

**Routes Grid:**
Columns:
- Route ID
- Driver Name
- Status (badge)
- Stops (completed / total)
- ETA
- SLA Status
- Risk Level
- Actions (dropdown)

**Grid Actions:**
- View Details
- View on Map
- Reassign Driver

**Pagination:**
- 20 routes per page
- Page navigation controls

**Interactions:**
- Click route row → Navigate to Route Detail
- Click "View on Map" → Navigate to Route Map View
- Use filters to refine list

---

### SCREEN 2.2 - Route Detail
**Route:** `/routes/:routeId`  
**Access:** Dispatch Manager only  
**Purpose:** Detailed view of single route with stop sequence and timeline

**Header:**
- Back button → Routes List
- Route ID and name
- "View on Map" button

**Route Metrics Cards:**
- ETA: 3:45 PM
- SLA Status: On-Time (badge)
- Completion: 8/12 stops (66%)
- Risk Level: Medium (badge)

**Driver Assignment Panel:**
- Driver photo and name
- Current location
- Contact info
- "Reassign Driver" button

**Stop Sequence List:**
Table with columns:
- Stop #
- Address
- Status (badge: Completed, En Route, Pending)
- Planned Time
- Actual/ETA Time
- Delivery ID
- Actions (View Delivery)

**Route Timeline:**
- Visual timeline showing:
  - Depot departure
  - Completed stops (green)
  - Current location (blue)
  - Pending stops (gray)
  - Depot return

**Active Alerts Panel:**
- List of alerts affecting this route
- Click alert → Navigate to Alert Detail

**Interactions:**
- Click "View on Map" → Navigate to Route Map View
- Click "Reassign Driver" → Open driver selection modal
- Click stop row → Navigate to Delivery Detail
- Drag-drop stops to resequence (if enabled)

---

### SCREEN 2.3 - Route Map View
**Route:** `/routes/:routeId/map`  
**Access:** Dispatch Manager only  
**Purpose:** Interactive map visualization of route with planned vs actual path

**Header:**
- Back button → Route Detail
- Route ID
- Driver info summary

**Map Panel (Main):**
- Interactive map (e.g., Google Maps/Mapbox)
- Planned route (blue line)
- Actual path (green line)
- Stop markers (numbered)
  - Green = completed
  - Blue = current/en route
  - Gray = pending
- Driver location (live marker)

**Stop Details Sidebar:**
- Appears when clicking stop marker
- Stop address
- Status
- Planned time
- Actual time
- Delivery info
- "View Delivery" button

**Map Controls:**
- Zoom in/out
- Recenter on driver
- Toggle layers (planned route, actual path, traffic)

**Interactions:**
- Click stop marker → Show stop details sidebar
- Click "View Delivery" → Navigate to Delivery Detail
- Click back → Return to Route Detail

---

### SCREEN 3.1 - Drivers Overview
**Route:** `/drivers`  
**Access:** Dispatch Manager only  
**Purpose:** View and manage all drivers and their availability

**Header:**
- Page title: "Drivers"
- Search bar
- Filter panel

**Filters:**
- Status: All, Available, On-Shift, On-Break, Off-Duty
- Shift: Morning, Afternoon, Evening, Night
- Region: Northeast, Central, West

**Drivers Grid:**
Columns:
- Driver Name (with photo)
- Status (badge)
- Current Location
- Current Route (if assigned)
- Shift Window
- Availability %
- Performance Score
- Actions (dropdown)

**Grid Actions:**
- View Details
- View Timeline
- Reassign

**Summary Cards (Top):**
- Total Drivers: 32
- Available: 6
- On-Break: 4
- Off-Duty: 5

**Interactions:**
- Click driver row → Navigate to Driver Detail
- Click "View Timeline" → Navigate to Driver Availability Timeline
- Use filters to find available drivers

---

### SCREEN 3.2 - Driver Detail
**Route:** `/drivers/:driverId`  
**Access:** Dispatch Manager only  
**Purpose:** Detailed view of single driver with current assignment and performance

**Header:**
- Back button → Drivers Overview
- Driver name and photo
- "View Timeline" button
- "Reassign Route" button

**Driver Status Panel:**
- Current status (badge)
- Current location (map thumbnail)
- Contact info (phone, vehicle)
- Shift window: 8:00 AM - 5:00 PM

**Current Assignment:**
- Route ID and name (if assigned)
- Stops remaining: 4 / 12
- ETA to completion
- "View Route" link

**Performance Metrics:**
- Today's Performance: 96%
- On-Time Delivery Rate: 94%
- Average Stop Time: 4.2 min
- Miles Driven Today: 87 mi

**Availability Windows:**
- Table showing available time slots
- Committed time slots (green)
- Break time slots (yellow)
- Free time slots (gray)

**Active Alerts:**
- List of alerts affecting this driver
- Click alert → Navigate to Alert Detail

**Recent Activity Log:**
- Timeline of recent actions
- Stop completions
- Break start/end
- Route assignments

**Interactions:**
- Click "View Timeline" → Navigate to Driver Availability Timeline
- Click "Reassign Route" → Open route selection modal
- Click "View Route" → Navigate to Route Detail

---

### SCREEN 3.3 - Driver Availability Timeline
**Route:** `/drivers/:driverId/timeline`  
**Access:** Dispatch Manager only  
**Purpose:** Hourly view of driver commitments, breaks, and availability

**Header:**
- Back button → Driver Detail
- Driver name
- Shift window: 8:00 AM - 5:00 PM

**Timeline View:**
- Horizontal hourly timeline (8 AM - 5 PM)
- Color-coded blocks:
  - **Green blocks:** Committed stops (with stop ID)
  - **Yellow blocks:** Break windows
  - **Gray blocks:** Free/available time
  - **Red blocks:** SLA-critical stops

**Timeline Legend:**
- Committed (green)
- Break (yellow)
- Available (gray)
- Critical (red)

**Committed Stops List (Below Timeline):**
Table showing:
- Stop ID
- Address
- Time Window
- Route ID
- Status

**What-If Scenario Panel:**
- "Preview Impact of Reassignment" button
- Opens Driver Impact Preview

**Interactions:**
- Hover over timeline block → Show tooltip with details
- Click block → Highlight associated stop in list
- Click "Preview Impact" → Navigate to Driver Impact Preview

---

### SCREEN 3.4 - Driver Impact Preview
**Route:** `/drivers/:driverId/impact-preview`  
**Access:** Dispatch Manager only  
**Purpose:** What-if analysis of reassigning driver to different route or adding stops

**Header:**
- Back button → Driver Availability Timeline
- Driver name
- Scenario: "Reassign to Route R-2849"

**Scenario Builder:**
- Current assignment summary
- Proposed new assignment
- "Simulate Impact" button

**Impact Metrics:**
- **Time Impact:**
  - Shift end time: 5:00 PM → 5:45 PM (45 min over)
- **SLA Impact:**
  - At-risk deliveries: 2
  - SLA breach risk: High
- **Cost Impact:**
  - Overtime cost: $52
  - Total recovery cost: $178

**Affected Routes Table:**
- Original route impact
- New route impact
- Stops affected

**Affected Deliveries Table:**
- Delivery ID
- Customer
- Original ETA
- New ETA
- SLA status change

**Actions:**
- Cancel (back to timeline)
- Proceed to Recovery Builder (to formalize the change)

**Interactions:**
- Adjust scenario parameters
- Click "Simulate Impact" → Refresh metrics
- Click "Proceed" → Navigate to Recovery Builder with scenario pre-loaded

---

### SCREEN 4.1 - Deliveries List
**Route:** `/deliveries`  
**Access:** Dispatch Manager only  
**Purpose:** View and manage all deliveries

**Header:**
- Page title: "Deliveries"
- Search bar
- Filter panel
- "VIP Deliveries" button

**Filters:**
- Status: All, Pending, En Route, Delivered, Failed
- Priority: All, VIP, High, Standard
- Region: Northeast, Central, West
- SLA Status: On-Time, At-Risk, Breached

**Deliveries Grid:**
Columns:
- Delivery ID
- Customer Name
- Address
- Priority (badge)
- Status (badge)
- Route ID
- Driver Name
- ETA
- SLA Status (badge)
- Actions (dropdown)

**Summary Cards (Top):**
- Total Deliveries: 342
- Delivered: 198
- En Route: 112
- At-Risk: 24

**Grid Actions:**
- View Details
- Change Priority
- Reassign Route

**Interactions:**
- Click delivery row → Navigate to Delivery Detail
- Click "VIP Deliveries" → Navigate to VIP Deliveries View
- Use filters to find specific deliveries

---

### SCREEN 4.2 - Delivery Detail
**Route:** `/deliveries/:deliveryId`  
**Access:** Dispatch Manager only  
**Purpose:** Detailed view of single delivery with timeline and status

**Header:**
- Back button → Deliveries List
- Delivery ID
- Priority badge

**Delivery Info Panel:**
- Customer name
- Delivery address
- Phone number
- Special instructions
- Package details (weight, dimensions)

**Delivery Timeline:**
- Order placed: 8:45 AM
- Dispatched: 10:12 AM
- Out for delivery: 1:34 PM
- ETA: 3:45 PM
- SLA deadline: 5:00 PM

**Route & Driver Assignment:**
- Route ID: R-2847
- Driver: David Park
- Stop #: 8 / 12
- "View Route" link
- "View Driver" link

**Stop Details:**
- Time window: 3:00 PM - 5:00 PM
- Planned arrival: 3:45 PM
- Current ETA: 3:52 PM (within window)
- Stop status: En Route (badge)

**SLA Status:**
- SLA Type: Premium Delivery
- SLA Target: 5:00 PM
- Current Status: On-Time (green badge)
- Buffer: 1h 8min

**Related Alerts:**
- List of alerts affecting this delivery
- Click alert → Navigate to Alert Detail

**Actions:**
- Change Priority
- Request Time Window Change
- Escalate to VIP

**Interactions:**
- Click "View Route" → Navigate to Route Detail
- Click "View Driver" → Navigate to Driver Detail
- Click action buttons → Open respective modals/forms

---

### SCREEN 4.3 - VIP Deliveries View
**Route:** `/deliveries/vip`  
**Access:** Dispatch Manager only  
**Purpose:** Dedicated view for high-priority and VIP customer deliveries

**Header:**
- Back button → Deliveries List
- Page title: "VIP Deliveries"
- "VIP" badge

**VIP Summary Cards:**
- Total VIP Deliveries: 18
- On-Time: 15
- At-Risk: 3
- Average SLA Buffer: 22 min

**VIP Deliveries Grid:**
Columns:
- Delivery ID
- Customer Name (with VIP badge)
- Address
- Route ID
- Driver Name
- ETA
- SLA Deadline
- Buffer Time (color-coded)
- Status (badge)
- Actions

**At-Risk VIP Panel:**
- Highlighted section for at-risk VIP deliveries
- Priority action buttons (Escalate, Start Recovery)

**Filters:**
- VIP Tier: Platinum, Gold, Silver
- Status: All, On-Time, At-Risk, Breached

**Interactions:**
- Click delivery row → Navigate to Delivery Detail
- Click "Start Recovery" → Navigate to Recovery Entry Context
- High visibility for at-risk VIP deliveries

---

### SCREEN 5.1 - Alerts Queue
**Route:** `/alerts`  
**Access:** Dispatch Manager only  
**Purpose:** Prioritized queue of active alerts requiring action

**Header:**
- Page title: "Alerts Queue"
- "View History" button
- Filter panel

**Filters:**
- Severity: All, Critical, High, Medium, Low
- Type: All, Driver Delay, Route Deviation, SLA Breach, Vehicle Issue
- Status: All, New, Acknowledged, In Progress, Resolved

**Alert Queue:**
Prioritized list (sorted by severity + time):

**Each Alert Card Shows:**
- Severity badge (color-coded)
- Alert type
- Alert ID
- Time created
- Affected entity (Route/Driver/Delivery)
- Brief description
- AI recommendation (if available)
- Quick actions:
  - View Details
  - Acknowledge
  - Start Recovery
  - Dismiss

**Summary Panel (Top):**
- Total Active Alerts: 12
- Critical: 3
- High: 5
- Medium: 4
- Acknowledged: 7

**Auto-refresh:**
- Live updates every 30 seconds
- New alerts highlighted

**Interactions:**
- Click alert card → Navigate to Alert Detail
- Click "Start Recovery" → Navigate to Recovery Entry Context
- Click "View History" → Navigate to Alert History
- Acknowledge alert → Update status, move to acknowledged section

---

### SCREEN 5.2 - Alert Detail
**Route:** `/alerts/:alertId`  
**Access:** Dispatch Manager only  
**Purpose:** Detailed view of single alert with context and recovery options

**Header:**
- Back button → Alerts Queue
- Alert ID
- Severity badge

**Alert Summary:**
- Alert type: Driver Delay - High Risk
- Created: 2:34 PM (12 minutes ago)
- Status: New (badge)
- Priority: High (badge)

**Context Information:**
- **Trigger:** Driver DRV-1847 is 15 minutes behind schedule
- **Root Cause:** Traffic congestion on I-95
- **Current Impact:**
  - 4 deliveries at risk
  - SLA breach in 22 minutes
  - 2 VIP customers affected

**Affected Entities:**

1. **Route:**
   - Route ID: R-2847
   - Status: At-Risk
   - "View Route" link

2. **Driver:**
   - Driver: David Park (DRV-1847)
   - Current location: I-95 Northbound
   - "View Driver" link

3. **Deliveries:**
   - List of 4 affected deliveries
   - SLA status for each
   - "View Delivery" links

**AI Recommendation:**
- Panel with AI-suggested recovery actions:
  - "Reassign stops 9-12 to available driver DRV-1853"
  - Estimated impact: SLA saved for 3/4 deliveries
  - Confidence: 87%
- "Use AI Suggestion" button

**Recovery Actions Panel:**
- "Start Manual Recovery" button → Recovery Entry Context
- "Use AI Suggestion" button → Recovery Builder with AI plan pre-loaded
- "Acknowledge & Monitor" button
- "Dismiss Alert" button

**Related Alerts:**
- List of related/dependent alerts

**Interactions:**
- Click "View Route/Driver/Delivery" → Navigate to respective detail screens
- Click "Start Manual Recovery" → Navigate to Recovery Entry Context
- Click "Use AI Suggestion" → Navigate to Recovery Builder with AI plan
- Acknowledge/Dismiss → Update alert status

---

### SCREEN 5.3 - Alert History
**Route:** `/alerts/history`  
**Access:** Dispatch Manager only  
**Purpose:** Historical view of resolved alerts with decision audit trail

**Header:**
- Back button → Alerts Queue
- Page title: "Alert History"
- Date range selector

**Filters:**
- Date Range: Today, Last 7 Days, Last 30 Days, Custom
- Severity: All, Critical, High, Medium, Low
- Resolution: Recovered, Dismissed, Auto-Resolved
- Alert Type: All, Driver Delay, Route Deviation, SLA Breach, etc.

**History Grid:**
Columns:
- Alert ID
- Severity (badge)
- Type
- Created
- Resolved
- Duration
- Resolution (badge)
- Recovery ID (if applicable)
- Actions (View Details)

**Summary Metrics:**
- Total Alerts (period): 147
- Avg Resolution Time: 18 min
- Recovery Success Rate: 92%
- Auto-Resolved: 34

**Interactions:**
- Click alert row → View alert detail archive
- Click Recovery ID → Navigate to Execution Outcome
- Filter by date/severity/resolution
- Export history report

---

### SCREEN 6.1 - Recovery Entry Context
**Route:** `/recovery/entry/:recoveryId`  
**Access:** Dispatch Manager only  
**Purpose:** Define recovery scope and goal before building recovery plan

**Header:**
- Back button → Alert Detail (if from alert) or Dashboard
- Recovery ID (new): REC-2847-001
- Timestamp

**Trigger Source:**
- Alert ID: ALT-2847-004 (if from alert)
- OR "Proactive Recovery" (if initiated manually)

**Alert Context Summary (if applicable):**
- Alert description
- Affected entities
- Time remaining to SLA breach

**Scope Definition:**
- **Affected Routes:**
  - Checkboxes to select routes
  - Route R-2847 (pre-selected if from alert)
  - "Add Route" button

- **Affected Drivers:**
  - Checkboxes to select drivers
  - Driver DRV-1847 (pre-selected if from alert)
  - "Add Driver" button

- **Affected Deliveries:**
  - Checkboxes to select deliveries
  - 4 deliveries (pre-selected if from alert)
  - "Add Delivery" button

**Recovery Goal:**
- Radio buttons:
  - Minimize SLA impact (default)
  - Minimize cost
  - Minimize route disruption
  - Custom (balanced)

**Next Steps:**
- "Draft Recovery Plan" button → Navigate to Recovery Option Builder
- "Cancel" button → Return to previous screen

**Interactions:**
- Select/deselect entities to define recovery scope
- Choose recovery goal
- Click "Draft Recovery Plan" → Navigate to Recovery Option Builder

---

### SCREEN 6.2 - Recovery Option Builder
**Route:** `/recovery/builder/:recoveryId`  
**Access:** Dispatch Manager only  
**Purpose:** Build recovery plan using manual actions or AI suggestions

**Header:**
- Back button → Recovery Entry Context
- Recovery ID: REC-2847-001
- Recovery Goal: Minimize SLA Impact

**Left Panel - Recovery Actions:**

**AI Suggestions Tab:**
- AI-recommended recovery plan:
  - Action 1: Reassign Stops 9-12 to Driver DRV-1853
  - Action 2: Extend time window for Delivery DLV-8834 by 15 min
  - Estimated SLA Impact: -3% → +1% (improvement)
  - Confidence: 87%
- "Use AI Plan" button (loads actions into builder)

**Manual Actions Tab:**
- Action palette:
  - Reassign Driver
  - Reassign Stop
  - Modify Route Sequence
  - Extend Time Window
  - Add Break
  - Remove Break
  - Change Delivery Priority

**Recovery Plan Builder (Center):**
- List of actions added to plan:
  - Action 1: Reassign Stops 9-12 from DRV-1847 to DRV-1853
    - Edit button
    - Remove button
  - Action 2: Extend time window for DLV-8834 (+15 min)
    - Edit button
    - Remove button
- "Add Action" button
- Drag-drop to reorder actions

**Right Panel - Live Preview:**
- **Current State:**
  - SLA at Risk: 4 deliveries
  - SLA Status: 94.7%
  - Cost: $0

- **After Recovery:**
  - SLA at Risk: 1 delivery (improvement)
  - SLA Status: 97.2% (improvement)
  - Recovery Cost: $145
  - Overtime: $52

- **Impact Summary:**
  - Routes affected: 2
  - Drivers affected: 2
  - Deliveries affected: 4

**Bottom Actions:**
- "Save Draft" button (save for later)
- "Proceed to Impact Review" button → Navigate to Impact Review
- "Cancel" button

**Interactions:**
- Add/remove/edit actions in recovery plan
- Use AI suggestions or build manually
- Preview live impact as actions are added
- Click "Proceed to Impact Review" → Navigate to Impact Review

---

### SCREEN 6.3 - Impact Review
**Route:** `/recovery/impact-review/:recoveryId`  
**Access:** Dispatch Manager only  
**Purpose:** Review full impact of recovery plan before committing or escalating

**Header:**
- Back button → Recovery Option Builder
- Recovery ID: REC-2847-001
- Page title: "Impact Review"

**Impact Summary Cards:**
1. **SLA Impact**
   - Before: 94.7%
   - After: 97.2%
   - Change: +2.5% (green, improvement)

2. **Cost Impact**
   - Recovery Cost: $145
   - Overtime: $52
   - Total: $197

3. **Affected Entities**
   - Routes: 2
   - Drivers: 2
   - Deliveries: 4

4. **Risk Assessment**
   - Overall Risk: Medium
   - Authority Check: ✅ Within Authority (green)

**Affected Entities Tables:**

**Routes Table:**
- Route ID
- Driver
- Stops Affected
- SLA Change
- Status

**Drivers Table:**
- Driver Name
- Action
- Shift Impact
- Overtime (min)
- Status

**Deliveries Table:**
- Delivery ID
- Customer
- Original ETA
- New ETA
- SLA Status Change

**SLA Impact Breakdown:**
- Deliveries improved: 3
- Deliveries unchanged: 1
- Deliveries worsened: 0

**Authority Check:**
- ✅ SLA Impact: 2.5% (within 5% limit)
- ✅ Cost Impact: $197 (within $500 limit)
- ✅ Deliveries Affected: 4 (within 10 limit)
- **Status: Within Authority** → Can commit directly

**Decision Options:**

1. **If WITHIN Authority:**
   - "Proceed to Commit" button → Navigate to Commit Review
   - "Revise Plan" button → Back to Recovery Builder
   - "Cancel Recovery" button

2. **If EXCEEDS Authority:**
   - "Request Escalation" button → Navigate to Escalation Request
   - "Revise Plan" button → Back to Recovery Builder
   - "Cancel Recovery" button

**Interactions:**
- Review all impact metrics and affected entities
- If within authority → Click "Proceed to Commit"
- If exceeds authority → Click "Request Escalation"
- Click "Revise Plan" → Back to builder

---

### SCREEN 6.4 - Commit Review
**Route:** `/recovery/commit-review/:recoveryId`  
**Access:** Dispatch Manager only (only if within authority)  
**Purpose:** Final confirmation before committing recovery plan to execution

**Header:**
- Back button → Impact Review
- Recovery ID: REC-2847-001
- Page title: "Commit Review"

**Final Impact Summary:**
- SLA Impact: +2.5%
- Cost Impact: $197
- Affected Entities: 2 routes, 2 drivers, 4 deliveries
- Risk Level: Medium

**Recovery Plan Summary:**
- Action 1: Reassign Stops 9-12 from DRV-1847 to DRV-1853
- Action 2: Extend time window for DLV-8834 (+15 min)

**Authority Confirmation:**
- ✅ You have authority to commit this recovery plan
- Your authority limits:
  - Max SLA Impact: 5% (current: 2.5%)
  - Max Cost Impact: $500 (current: $197)
  - Max Deliveries: 10 (current: 4)

**Justification:**
- Text area: "Explain your decision (required)"
- Placeholder: "Provide business justification for this recovery decision..."
- Character count: 0 / 500

**Commit Actions:**
- "Commit Recovery Plan" button (primary, blue)
  - Requires justification text
  - Confirmation modal: "Are you sure you want to commit this recovery plan?"
- "Back to Impact Review" button
- "Cancel" button

**Audit Notice:**
- "This decision will be logged and auditable by Operations Managers."

**Interactions:**
- Enter justification text (required)
- Click "Commit Recovery Plan" → Confirmation modal → Navigate to Post-Commit Confirmation
- Click back → Return to Impact Review

---

### SCREEN 6.5 - Post-Commit Confirmation
**Route:** `/recovery/post-commit/:recoveryId`  
**Access:** Dispatch Manager only  
**Purpose:** Confirm recovery plan was committed successfully

**Header:**
- Success icon (green checkmark)
- Page title: "Recovery Plan Committed"

**Confirmation Message:**
- "Your recovery plan has been successfully committed and is now in execution."

**Recovery Details:**
- Recovery ID: REC-2847-001
- Commit ID: CMT-2847-001
- Committed At: 3:12 PM
- Committed By: David Park (you)

**What Happens Next:**
- "System is executing your recovery plan"
- "Affected drivers will receive updated route assignments"
- "Execution progress can be monitored in Execution Monitor"

**Summary:**
- Actions in Plan: 2
- Affected Routes: 2
- Affected Drivers: 2
- Affected Deliveries: 4

**Navigation Options:**
- "View Execution Monitor" button → Navigate to Execution Monitor
- "View Decision History" button → Navigate to Alert History
- "Return to Dashboard" button → Navigate to Dashboard

**Interactions:**
- Click navigation buttons to proceed to next screen
- Auto-redirect to dashboard after 10 seconds (optional)

---

### SCREEN 6.6 - Escalation Request
**Route:** `/recovery/escalation-request/:recoveryId`  
**Access:** Dispatch Manager only (when authority exceeded)  
**Purpose:** Submit escalation request to Operations Manager with justification

**Header:**
- Back button → Impact Review
- Recovery ID: REC-2847-001
- Page title: "Escalation Request"

**Authority Exceeded Notice:**
- ⚠️ Warning icon
- "This recovery plan exceeds your decision authority and requires Operations Manager approval."

**Authority Breach Explanation:**
- Your Limits vs. Current Plan:
  - ❌ SLA Impact: 5% limit (current: 7.5%)
  - ✅ Cost Impact: $500 limit (current: $197)
  - ✅ Deliveries: 10 limit (current: 4)

**Escalation Reason:**
- Dropdown menu:
  - Exceeds SLA impact authority
  - Exceeds cost impact authority
  - VIP customer at risk
  - Cross-region impact
  - Other (specify)

**Business Justification:**
- Text area (required)
- Placeholder: "Explain why this recovery plan is necessary and the business impact of not proceeding..."
- Character count: 0 / 1000

**Recovery Plan Summary:**
- Action 1: Reassign Stops 9-12 from DRV-1847 to DRV-1853
- Action 2: Extend time window for DLV-8834 (+15 min)
- Action 3: Add overtime for Driver DRV-1853 (+45 min)

**Impact Summary:**
- SLA Impact: +7.5%
- Cost Impact: $197
- Risk Level: High

**Operations Manager Selection:**
- Auto-assigned to: Sarah Johnson (Regional Operations Manager)
- Region: Northeast

**Urgency Level:**
- Radio buttons:
  - Critical (requires immediate response)
  - High (response within 15 min)
  - Medium (response within 30 min)

**Actions:**
- "Submit Escalation Request" button (primary)
  - Requires justification text
- "Revise Plan" button → Back to Recovery Builder
- "Cancel" button

**Interactions:**
- Select escalation reason
- Enter business justification (required)
- Select urgency level
- Click "Submit Escalation Request" → Navigate to Escalation Status

---

### SCREEN 6.7 - Escalation Status
**Route:** `/recovery/escalation-status/:escalationId`  
**Access:** Dispatch Manager only  
**Purpose:** Monitor escalation approval status and Operations Manager feedback

**Header:**
- Back button → Impact Review
- Escalation ID: ESC-2847-001
- Page title: "Escalation Status"

**Status Banner:**
- **If Pending:**
  - 🕐 "Awaiting Operations Manager Review"
  - Submitted: 3:15 PM (5 minutes ago)
  - Urgency: High
  - Assigned to: Sarah Johnson

- **If Approved:**
  - ✅ "Escalation Approved"
  - Approved: 3:28 PM
  - Approved by: Sarah Johnson

- **If Rejected:**
  - ❌ "Escalation Rejected"
  - Rejected: 3:28 PM
  - Rejected by: Sarah Johnson

**Escalation Timeline:**
- Vertical timeline showing:
  - Escalation submitted (timestamp, your name)
  - Operations Manager notified (timestamp)
  - Operations Manager viewed (timestamp, if viewed)
  - Decision made (timestamp, if decided)

**Your Request Summary:**
- Recovery ID: REC-2847-001
- Reason: Exceeds SLA impact authority
- Urgency: High
- Your Justification: (displayed)

**Operations Manager Feedback (if decided):**

**If Approved:**
- Decision: Approved ✅
- Approval Constraints:
  - Max SLA Impact: 10% (increased from 5%)
  - Must complete by: 4:00 PM
- Operations Manager Notes: "Approved due to VIP customer impact. Monitor execution closely."

**If Rejected:**
- Decision: Rejected ❌
- Rejection Reason: "SLA impact too high. Please revise plan to focus on VIP deliveries only."
- Suggested Alternative: "Prioritize stops 9-10 for VIP customers, defer stops 11-12 to next route."

**Action Options:**

**If Pending:**
- "Cancel Escalation" button
- "View Decision History" button
- Auto-refresh every 30 seconds

**If Approved:**
- "Proceed to Commit Review" button → Navigate to Commit Review (with approved constraints)
- "View Decision History" button

**If Rejected:**
- "Revise Recovery Plan" button → Back to Recovery Builder
- "View Decision History" button

**Interactions:**
- Monitor escalation status in real-time
- If approved → Proceed to commit
- If rejected → Revise plan per feedback

---

### SCREEN 7.1 - Execution Monitor
**Route:** `/execution-monitor`  
**Access:** Dispatch Manager only  
**Purpose:** Monitor all active recovery commitments and execution progress

**Header:**
- Page title: "Execution Monitor"
- Refresh button
- Filter panel

**Filters:**
- Status: All, Executing, Completed, Partial, Failed
- Date: Today, Last 7 Days, Last 30 Days
- Recovery Type: All, Alert-Triggered, Proactive

**Active Commits Summary Cards:**
- Total Active: 5
- Executing: 3
- Completed Today: 12
- Avg Completion Time: 34 min

**Active Commits List:**

**Each Commit Card Shows:**
- Commit ID: CMT-2847-001
- Recovery ID: REC-2847-001
- Status: Executing (badge with progress %)
- Started: 3:12 PM (18 minutes ago)
- Progress: 50% (1/2 actions completed)
- Affected Entities: 2 routes, 2 drivers, 4 deliveries
- Actions:
  - View Details
  - Monitor Execution

**Execution Progress Indicators:**
- Action 1: ✅ Reassigned stops (completed)
- Action 2: 🔄 Extending time window (in progress)

**Completed Commits (Collapsed Section):**
- List of today's completed commits
- Expandable to view details

**Interactions:**
- Click commit card → Navigate to Execution Detail
- Click "Monitor Execution" → Navigate to Execution Detail
- Auto-refresh every 30 seconds
- Filter by status/date

---

### SCREEN 7.2 - Execution Detail
**Route:** `/execution/:commitId`  
**Access:** Dispatch Manager only  
**Purpose:** Detailed view of single recovery execution with live progress tracking

**Header:**
- Back button → Execution Monitor
- Commit ID: CMT-2847-001
- Recovery ID: REC-2847-001
- Status: Executing (badge)

**Execution Timeline:**
- Horizontal timeline showing:
  - Committed: 3:12 PM
  - Action 1 Started: 3:12 PM → Completed: 3:14 PM ✅
  - Action 2 Started: 3:15 PM → In Progress: 3:30 PM (expected) 🔄
  - Expected Completion: 3:30 PM

**Original Recovery Plan Summary:**
- Goal: Minimize SLA Impact
- Actions: 2
- Expected SLA Impact: +2.5%
- Expected Cost: $197

**Live Execution Progress:**

**Action Status Breakdown:**
1. **Action 1: Reassign Stops 9-12 to DRV-1853**
   - Status: ✅ Completed (3:14 PM)
   - Result: Success
   - Driver DRV-1853 acknowledged new route
   - 4 stops reassigned

2. **Action 2: Extend Time Window for DLV-8834**
   - Status: 🔄 In Progress
   - Started: 3:15 PM
   - Expected Completion: 3:30 PM
   - Customer notified: Pending

**Affected Entities Tracking:**

**Routes:**
- Route R-2847: Modified ✅
- Route R-2849: Modified ✅

**Drivers:**
- Driver DRV-1847: Route updated ✅
- Driver DRV-1853: New stops assigned ✅

**Deliveries:**
- DLV-8831: Reassigned ✅
- DLV-8832: Reassigned ✅
- DLV-8833: Reassigned ✅
- DLV-8834: Time window extending 🔄

**Exception Handling Panel:**
- "No exceptions reported"
- OR if exceptions:
  - Exception: Driver DRV-1853 delayed by 5 minutes
  - Action: Monitor
  - OR "Create Exception Alert" button

**Quick Links:**
- View Route R-2847 → Navigate to Route Detail
- View Driver DRV-1847 → Navigate to Driver Detail
- View Delivery DLV-8834 → Navigate to Delivery Detail

**Actions:**
- "View Outcome Summary" button (if completed) → Navigate to Execution Outcome
- "Create Exception" button (if issue arises)
- "Cancel Execution" button (if critical issue)

**Interactions:**
- Monitor live execution progress
- Click entity links to view details
- Handle exceptions as they arise
- Click "View Outcome" when execution completes

---

### SCREEN 7.3 - Execution Outcome
**Route:** `/execution/:commitId/outcome`  
**Access:** Dispatch Manager only  
**Purpose:** Review final outcome of recovery execution and close recovery

**Header:**
- Back button → Execution Detail
- Commit ID: CMT-2847-001
- Recovery ID: REC-2847-001
- Page title: "Execution Outcome"

**Outcome Summary:**
- Status: ✅ Success (or ⚠️ Partial Success, ❌ Failed)
- Completed At: 3:32 PM
- Duration: 20 minutes
- Actions Executed: 2 / 2 (100%)

**Final Impact vs. Projected Impact:**

**SLA Impact:**
- Projected: +2.5%
- Actual: +2.8% (close to target)
- Variance: +0.3%

**Cost Impact:**
- Projected: $197
- Actual: $205 (close to target)
- Variance: +$8

**SLA Achievement:**
- Before Recovery: 94.7% (4 at-risk)
- After Recovery: 97.5% (1 at-risk)
- Target: 97.2%
- Status: ✅ Target Exceeded

**Recovery Metrics Dashboard:**
- Deliveries Saved: 3 / 4 (75%)
- Routes Modified: 2
- Drivers Affected: 2
- Exceptions Handled: 0
- Customer Complaints: 0

**Affected Deliveries Outcome:**
- DLV-8831: ✅ Delivered on time (3:18 PM)
- DLV-8832: ✅ Delivered on time (3:24 PM)
- DLV-8833: ✅ Delivered on time (3:38 PM)
- DLV-8834: ⚠️ Delivered with delay (4:05 PM, 5 min late)

**Closure Actions:**

**Close Recovery Form:**
- Closure Reason (dropdown):
  - Recovery Successful
  - Partial Success
  - Recovery Failed
  - Cancelled
- Closure Notes (text area):
  - "Recovery executed successfully. 3 out of 4 deliveries saved. Minor delay on DLV-8834 due to customer unavailability."
- "Close Recovery" button (finalizes and archives)

**Audit & Evidence:**
- "View Decision History" button → Navigate to Alert History
- "View Evidence Snapshot" button → PDF export of full recovery record
- "View Escalation Record" button (if escalated) → Navigate to Escalation Status

**Lessons Learned (Optional):**
- Text area: "Document any lessons learned or improvement suggestions..."

**Interactions:**
- Review all outcome metrics
- Enter closure notes
- Click "Close Recovery" → Recovery archived, return to Dashboard
- Export evidence for audit purposes

---

## OPERATIONS MANAGER SCREENS

### SCREEN 8.1 - Operations Manager Dashboard
**Route:** `/ops-dashboard`  
**Access:** Operations Manager only  
**Purpose:** Governance and oversight dashboard with escalations and outcomes

**Header:**
- Page title: "Operations Dashboard"
- User profile menu
- Logout button

**Governance Summary Cards:**
1. **Pending Escalations**
   - Count: 3
   - Urgent: 1
   - "View Queue" link

2. **Today's Execution Oversight**
   - Active Commits: 5
   - Completed: 12
   - "View Monitor" link

3. **Recent Outcomes**
   - Success Rate: 94%
   - Avg SLA Impact: +1.8%
   - "View Outcomes" link

4. **Audit Events**
   - Today's Changes: 24
   - Critical Events: 2
   - "View Audit" link

**Quick Access Panels:**

**Escalation Queue (Preview):**
- List of pending escalations (top 3)
- Escalation ID, Dispatcher, Urgency, Time Waiting
- "View All Escalations" button

**Live Execution Monitor (Preview):**
- List of active commits (top 5)
- Commit ID, Status, Progress, Dispatcher
- "View Execution Monitor" button

**Recent Outcomes (Preview):**
- List of recent outcomes (top 5)
- Commit ID, Outcome, SLA Impact, Dispatcher
- "View All Outcomes" button

**Trends & Analytics:**
- SLA Achievement Trend (7-day chart)
- Escalation Approval Rate (pie chart)
- Dispatcher Performance Comparison (bar chart)

**Interactions:**
- Click summary cards → Navigate to respective modules
- Click quick access panels → Navigate to full views
- No execution actions (read-only governance)

---

### SCREEN 8.2 - Escalation Queue
**Route:** `/ops-escalations`  
**Access:** Operations Manager only  
**Purpose:** View and prioritize pending escalation requests from Dispatch Managers

**Header:**
- Page title: "Escalation Queue"
- Filter panel
- Refresh button

**Filters:**
- Urgency: All, Critical, High, Medium
- Status: All, Pending, Approved, Rejected
- Dispatcher: All, [List of dispatchers]
- Region: All, Northeast, Central, West

**Queue Summary Cards:**
- Total Pending: 3
- Critical Urgency: 1
- Avg Wait Time: 8 min
- Approval Rate (today): 78%

**Escalation Queue List:**

**Each Escalation Card Shows:**
- Escalation ID: ESC-2847-001
- Urgency: High (badge, color-coded)
- Dispatcher: David Park
- Region: Northeast
- Submitted: 3:15 PM (15 minutes ago)
- Recovery ID: REC-2847-001
- Reason: Exceeds SLA impact authority
- Brief Summary: "Recovery plan affects 7.5% SLA (exceeds 5% limit)"
- Actions:
  - Review & Decide
  - View Details

**Urgency Color-Coding:**
- Critical: Red background
- High: Orange background
- Medium: Yellow background

**Auto-Prioritization:**
- List sorted by urgency (Critical → High → Medium)
- Then by wait time (oldest first)

**Interactions:**
- Click "Review & Decide" → Navigate to Escalation Review
- Filter by urgency/status/dispatcher
- Auto-refresh every 30 seconds

---

### SCREEN 8.3 - Escalation Review
**Route:** `/ops-escalations/:escalationId/review`  
**Access:** Operations Manager only  
**Purpose:** Review escalation request and make approval/rejection decision

**Header:**
- Back button → Escalation Queue
- Escalation ID: ESC-2847-001
- Urgency: High (badge)

**Escalation Summary:**
- Submitted: 3:15 PM (18 minutes ago)
- Dispatcher: David Park (Northeast Region)
- Recovery ID: REC-2847-001
- Reason: Exceeds SLA impact authority

**Recovery Plan Summary:**
- Goal: Minimize SLA Impact
- Actions: 3
  1. Reassign Stops 9-12 to DRV-1853
  2. Extend time window for DLV-8834 (+15 min)
  3. Add overtime for DRV-1853 (+45 min)

**Impact Analysis Review:**
- **SLA Impact:** +7.5% (exceeds 5% limit by 2.5%)
- **Cost Impact:** $345 (within $500 limit)
- **Affected Entities:**
  - Routes: 2
  - Drivers: 2
  - Deliveries: 4 (including 2 VIP)

**Authority Breach Explanation:**
- ❌ SLA Impact: 7.5% exceeds Dispatcher's 5% limit
- ✅ Cost Impact: $345 within $500 limit
- ⚠️ VIP Customers: 2 at risk (high visibility)

**Dispatcher's Justification:**
- "This recovery is necessary to save 2 VIP deliveries (Platinum customers). The SLA impact is higher than normal due to cross-route reassignment, but the VIP customer retention value justifies the risk. Without this recovery, we will breach SLA for both VIP customers, resulting in potential contract penalties and reputation damage."

**Risk Assessment:**
- Overall Risk: High
- VIP Impact: High (2 Platinum customers)
- SLA Risk: Medium (7.5% impact)
- Cost Risk: Low ($345 within budget)

**Affected Entities Details:**

**Routes:**
- Route R-2847: 4 stops reassigned, driver changed
- Route R-2849: 4 stops added, overtime required

**Drivers:**
- DRV-1847: Workload reduced (within shift)
- DRV-1853: Workload increased (+45 min overtime)

**Deliveries:**
- DLV-8831: VIP (Platinum) → Reassigned to earlier slot ✅
- DLV-8832: VIP (Platinum) → Reassigned to earlier slot ✅
- DLV-8833: Standard → Time window extended
- DLV-8834: Standard → Time window extended

**Operations Manager Decision Panel:**

**Option 1: Approve with Constraints**
- "Approve Escalation" button
- Approval Constraints (checkboxes):
  - ☑ Set max SLA impact to 10%
  - ☑ Set budget cap to $400
  - ☑ Require completion by 4:00 PM
  - ☐ Require status updates every 15 min
- Approval Notes (text area):
  - "Approved due to VIP customer impact. Monitor execution closely and provide updates every 15 min."

**Option 2: Reject with Feedback**
- "Reject Escalation" button
- Rejection Reason (dropdown):
  - SLA impact too high
  - Cost impact too high
  - Insufficient justification
  - Alternative approach available
  - Other (specify)
- Rejection Feedback (text area):
  - "SLA impact is too high. Please revise plan to focus only on VIP deliveries and defer standard deliveries to next route."
- Suggested Alternative (text area):
  - "Prioritize stops 9-10 for VIP customers only. Reassign stops 11-12 to next available route instead of using overtime."

**Decision Justification:**
- Text area (required for both approve and reject)
- Placeholder: "Explain your decision and any constraints or guidance..."

**Audit Notice:**
- "Your decision will be logged and auditable. Dispatcher will be notified immediately."

**Actions:**
- "Approve Escalation" button (requires justification)
- "Reject Escalation" button (requires justification + feedback)
- "Request More Information" button (sends message to dispatcher)
- "Back to Queue" button

**Interactions:**
- Review all impact details and justification
- Make approve/reject decision with justification
- Set constraints if approving
- Provide feedback if rejecting
- Submit decision → Dispatcher notified → Return to Queue

---

### SCREEN 8.4 - Execution Oversight (Read-Only)
**Route:** `/ops-execution`  
**Access:** Operations Manager only  
**Purpose:** Monitor all active commits across all dispatchers (read-only)

**Header:**
- Page title: "Execution Oversight"
- Filter panel
- Refresh button

**Filters:**
- Region: All, Northeast, Central, West
- Dispatcher: All, [List of dispatchers]
- Status: All, Executing, Completed, Partial, Failed

**Oversight Summary Cards:**
- Total Active Commits: 5
- Dispatchers Active: 3
- High-Risk Executions: 1
- Avg Progress: 65%

**Active Commits Overview:**

**Each Commit Card Shows:**
- Commit ID: CMT-2847-001
- Recovery ID: REC-2847-001
- Dispatcher: David Park
- Region: Northeast
- Status: Executing (badge)
- Progress: 50% (1/2 actions completed)
- Started: 3:12 PM
- Affected: 2 routes, 2 drivers, 4 deliveries
- Risk Level: Medium (badge)
- Actions: View Details (read-only)

**High-Risk Executions Panel:**
- Highlighted section for executions with high risk
- Commit ID, Dispatcher, Risk Reason
- "Monitor Closely" tag

**Execution Anomalies:**
- List of flagged execution issues:
  - Commit CMT-2849-003: Behind schedule by 10 min
  - Commit CMT-2848-001: Exception reported (driver delay)

**Interactions:**
- Click commit card → Navigate to Execution Detail (read-only view)
- Cannot intervene or modify execution
- Filter by region/dispatcher/status
- Auto-refresh every 30 seconds

---

### SCREEN 8.5 - Operations Outcomes
**Route:** `/ops-outcomes`  
**Access:** Operations Manager only  
**Purpose:** Review outcomes, trends, and performance metrics

**Header:**
- Page title: "Operations Outcomes"
- Date range selector
- Export button

**Date Range Selector:**
- Today, Last 7 Days, Last 30 Days, Custom Range

**Outcome Metrics Dashboard:**

**Summary Cards:**
1. **Total Recoveries**
   - Count: 147 (last 30 days)
   - Avg per day: 5

2. **Success Rate**
   - Overall: 94%
   - Trend: +2% vs last period

3. **Avg SLA Impact**
   - +1.8%
   - Trend: -0.3% vs last period

4. **Avg Cost**
   - $178
   - Trend: -$12 vs last period

**SLA Achievement Trends:**
- Line chart showing SLA % over time
- Target line at 95%
- Color-coded: Green = above target, Red = below target

**Recovery Success Rates:**
- Pie chart:
  - Success: 94%
  - Partial Success: 4%
  - Failed: 2%

**Dispatcher Performance Comparison:**
- Bar chart comparing dispatchers:
  - David Park: 96% success
  - Lisa Wang: 93% success
  - Robert Kim: 95% success
- Metrics: Success rate, avg SLA impact, avg decision time

**Escalation Approval/Rejection Trends:**
- Stacked bar chart over time:
  - Approved: Green
  - Rejected: Red
- Approval rate: 78%

**Outcome Deep Dive Table:**
Columns:
- Commit ID
- Recovery ID
- Dispatcher
- Outcome (badge)
- SLA Impact
- Cost
- Duration
- Actions (View Details)

**Filters:**
- Region: All, Northeast, Central, West
- Dispatcher: All, [List of dispatchers]
- Outcome: All, Success, Partial, Failed

**Interactions:**
- Select date range to view trends
- Click outcome row → View detailed outcome analysis
- Filter by region/dispatcher/outcome
- Export report (PDF/CSV)

---

### SCREEN 8.6 - Operations Audit
**Route:** `/ops-audit`  
**Access:** Operations Manager only  
**Purpose:** Audit trail of all decisions and actions

**Header:**
- Page title: "Operations Audit"
- Date range selector
- Export button

**Audit Summary Cards:**
- Total Audit Events: 347 (last 7 days)
- Dispatcher Actions: 289
- Operations Manager Decisions: 58
- Authority Breaches: 23

**Filter Panel:**
- Date Range: Today, Last 7 Days, Last 30 Days, Custom
- Action Type: All, Recovery Commit, Escalation Request, Escalation Decision, Route Modification, Driver Reassignment
- User: All, [List of users]
- Severity: All, Critical, High, Medium, Low

**Decision Audit Trail Table:**
Columns:
- Timestamp
- User (name + role)
- Action Type
- Object (Route/Driver/Delivery/Recovery/Escalation)
- Details
- Outcome
- Actions (View Details)

**Sample Rows:**
- 3:32 PM | David Park (Dispatcher) | Commit Recovery | REC-2847-001 | Committed recovery plan with SLA impact +2.5% | Success | View
- 3:28 PM | Sarah Johnson (Ops Mgr) | Approve Escalation | ESC-2847-001 | Approved escalation with max SLA 10% constraint | Approved | View
- 2:15 PM | David Park (Dispatcher) | Route Modification | R-2847 | Reassigned 4 stops to DRV-1853 | Success | View

**SLA Compliance History:**
- Line chart showing SLA % over time
- Target line
- Breach incidents marked

**Authority Breach Incidents:**
- List of incidents where dispatchers exceeded authority
- Escalation outcome (approved/rejected)
- Impact analysis

**Compliance Reports:**
- "Generate Compliance Report" button
- Exports:
  - All decisions in date range
  - Authority breach summary
  - SLA compliance summary
  - Escalation approval rates

**Interactions:**
- Filter by date/user/action type
- Click audit row → View full audit detail
- Export audit report for compliance/legal

---

## TENANT ADMIN SCREENS

### MODULE 1 - FIRST LOGIN & SETUP GATE

### SCREEN 9.1 - First Login Landing
**Route:** `/tenant/first-login`  
**Access:** Tenant Admin only (first login)  
**Purpose:** Welcome screen explaining setup requirements

**Layout:**
- Centered content on white background
- OptiMile logo
- Welcome message

**Welcome Message:**
- "Welcome to OptiMile!"
- "Before you can start managing your enterprise last-mile operations, we need to complete a few setup steps."

**Setup Checklist Preview:**
1. ✅ Configure Regions & Depots
2. ✅ Define Organizational Structure
3. ✅ Set Up Operational Roles
4. ✅ Define SLA Templates
5. ✅ Create Initial Users
6. ✅ Configure Branding
7. ✅ Review & Complete Setup

**Estimated Time:**
- "Setup typically takes 15-20 minutes"

**Actions:**
- "Start Setup" button (primary, blue) → Navigate to Setup Progress Tracker
- "Setup Later" button (secondary) → Navigate to Blocked Dashboard

**Interactions:**
- Click "Start Setup" → Begin setup wizard
- Click "Setup Later" → Dashboard blocked until setup complete

---

### SCREEN 9.2 - Setup Progress Tracker
**Route:** `/tenant/setup-tracker`  
**Access:** Tenant Admin only (during setup)  
**Purpose:** Wizard-style setup flow with progress tracking

**Header:**
- OptiMile logo
- Setup progress bar (0-100%)
- "Save & Exit" button

**Progress Bar:**
- Visual indicator showing completion: 3/7 steps (43%)

**Setup Steps (Vertical List):**

1. **Configure Regions** ✅
   - Status: Complete (green checkmark)
   - Summary: 3 regions configured
   - "Edit" button

2. **Define Structure** ✅
   - Status: Complete (green checkmark)
   - Summary: 8 depots configured
   - "Edit" button

3. **Set Up Roles** 🔄
   - Status: In Progress (blue indicator)
   - Summary: 2/4 roles configured
   - "Continue" button

4. **Define SLAs** ⏳
   - Status: Not Started (gray)
   - Summary: Pending
   - "Start" button (disabled)

5. **Create Users** ⏳
   - Status: Not Started (gray)
   - Summary: Pending
   - "Start" button (disabled)

6. **Configure Branding** ⏳
   - Status: Not Started (gray)
   - Summary: Pending
   - "Start" button (disabled)

7. **Review & Complete** ⏳
   - Status: Not Started (gray)
   - Summary: Pending
   - "Start" button (disabled)

**Current Step Detail Panel:**
- Shows expanded view of current step (e.g., "Set Up Roles")
- Form or configuration interface
- "Save & Continue" button
- "Back" button

**Navigation:**
- Can only proceed to next step after completing current step
- Can go back to edit previous steps
- Cannot skip ahead

**Actions:**
- "Save & Continue" → Complete current step, proceed to next
- "Back" → Return to previous step
- "Save & Exit" → Save progress, return to Blocked Dashboard

**Interactions:**
- Complete each step in sequence
- Edit previous steps as needed
- Save and exit at any time (progress preserved)
- When all 7 steps complete → Navigate to Tenant Dashboard (setup complete)

---

### SCREEN 9.3 - Blocked Dashboard
**Route:** `/tenant/blocked-dashboard`  
**Access:** Tenant Admin only (if setup incomplete)  
**Purpose:** Block access to modules until setup complete

**Layout:**
- Centered message panel
- Setup progress summary

**Message:**
- 🔒 Icon
- "Setup Required"
- "You must complete the tenant setup before accessing the dashboard and other modules."

**Setup Progress:**
- Progress bar: 43% complete
- Steps completed: 3 / 7
- Last saved: 2 hours ago

**Actions:**
- "Resume Setup" button (primary) → Navigate to Setup Progress Tracker
- "Logout" button

**Sidebar (Visible but Disabled):**
- All navigation items grayed out and non-clickable
- Tooltip: "Complete setup to access this module"

**Interactions:**
- Click "Resume Setup" → Return to Setup Tracker at last completed step
- Cannot access any modules until setup complete
- Logout returns to role selection

---

### MODULE 2 - TENANT DASHBOARD (Post-Setup)

### SCREEN 10.1 - Tenant Dashboard
**Route:** `/tenant/dashboard`  
**Access:** Tenant Admin only (post-setup)  
**Purpose:** Tenant health overview and quick access to modules

**Header:**
- Page title: "Tenant Dashboard"
- Company name: "ACME Logistics"
- User profile menu

**Tenant Health Summary Cards:**
1. **Active Users**
   - Count: 32
   - Dispatchers: 24
   - Ops Managers: 8
   - "View Users" link

2. **Integration Status**
   - Connected: 4
   - Degraded: 1
   - Failed: 0
   - "View Integrations" link

3. **Regions & Depots**
   - Regions: 3
   - Depots: 8
   - "View Settings" link

4. **SLA Templates**
   - Total: 6
   - Active: 6
   - "View Settings" link

**Recent Governance Events:**
- List of recent admin actions:
  - User added: john.doe@acme.com (2 hours ago)
  - Integration status changed: TransportHub TMS → Degraded (5 hours ago)
  - SLA template modified: Premium Delivery (1 day ago)
- "View All Audit Logs" link

**Quick Access Tiles:**
- Large clickable tiles for common actions:
  1. **Settings**
     - Icon: Gear
     - "Manage company settings, regions, SLAs"
  
  2. **Users & Roles**
     - Icon: Users
     - "Manage users and role assignments"
  
  3. **Operations Visibility**
     - Icon: Chart
     - "View operational health and governance"
  
  4. **Integrations**
     - Icon: Plug
     - "Manage external system connections"

**Tenant Health Indicators:**
- Setup Status: ✅ Complete
- Compliance Status: ✅ Compliant
- Integration Health: ⚠️ 1 Degraded

**Interactions:**
- Click summary cards → Navigate to respective modules
- Click quick access tiles → Navigate to modules
- Click recent events → Navigate to Audit Super-View

---

### MODULE 3 - SETTINGS

### SCREEN 11.1 - Settings Module (8 Tabs)
**Route:** `/tenant/settings`  
**Access:** Tenant Admin only  
**Purpose:** Comprehensive tenant configuration across 8 tabs

**Header:**
- Page title: "Settings"
- Save indicator (auto-save enabled)

**Tab Navigation (Horizontal):**
1. Company Information (default)
2. Subscription & Plan
3. Regions
4. Structure
5. Roles
6. SLAs
7. Branding
8. Review

---

### TAB 1 - Company Information
**Purpose:** Edit tenant company metadata

**Editable Fields:**
- **Company Name:** ACME Logistics (text input)
- **Address:** 123 Main St, Boston, MA 02101 (text area)
- **Phone:** +1 (555) 123-4567 (text input)
- **Support Email:** support@acmelogistics.com (text input)
- **Industry:** Retail & E-Commerce (dropdown)
- **Company Size:** 500-1000 employees (dropdown)

**Read-Only Fields:**
- **Tenant ID:** TN-847392 (gray text)
- **Created Date:** December 1, 2025 (gray text)
- **Subscription Tier:** Enterprise (link to Subscription tab)

**Actions:**
- "Save Changes" button
- Auto-save indicator

---

### TAB 2 - Subscription & Plan (Read-Only)
**Purpose:** View subscription and plan details

**Plan Information (Read-Only):**
- **Plan Name:** Enterprise
- **Plan Tier:** Tier 3
- **Billing Cycle:** Annual
- **Renewal Date:** December 1, 2026
- **Status:** Active (green badge)

**Feature Access Matrix:**
Table showing:
- Feature, Included (Yes/No), Limit
- Unlimited Users: ✅ Yes
- Unlimited Routes: ✅ Yes
- Advanced Analytics: ✅ Yes
- API Access: ✅ Yes
- White-Label Branding: ✅ Yes
- Max Regions: 10
- Max Integrations: 20

**Usage Limits:**
- Current Users: 32 / Unlimited
- Current Regions: 3 / 10
- Current Integrations: 5 / 20

**Billing Contact:**
- "Contact sales to upgrade or modify plan"
- Email: sales@optimile.com

---

### TAB 3 - Regions Configuration
**Purpose:** Manage regions and region-depot hierarchy

**Regions List Table:**
Columns:
- Region Name
- Depots Count
- Active Dispatchers
- Status (Active/Archived)
- Actions (Edit, Archive)

**Sample Rows:**
- Northeast | 3 depots | 10 dispatchers | Active | Edit / Archive
- Central | 2 depots | 8 dispatchers | Active | Edit / Archive
- West | 3 depots | 6 dispatchers | Active | Edit / Archive

**Actions:**
- "Add Region" button → Opens region creation form

**Region Creation/Edit Form (Modal):**
- Region Name (text input)
- Region Code (text input, auto-generated)
- Description (text area)
- Assigned Depots (multi-select from depot list)
- Status (Active/Archived radio buttons)
- Save/Cancel buttons

**Region-Depot Hierarchy Visualization:**
- Tree view showing:
  - Northeast Region
    - Boston Hub (Depot)
    - Hartford Depot
    - Providence Depot
  - Central Region
    - Chicago Depot
    - Detroit Depot

---

### TAB 4 - Organizational Structure
**Purpose:** Define depot hierarchy and manager assignments

**Depot Configuration Table:**
Columns:
- Depot Name
- Region
- Address
- Operations Manager
- Dispatch Managers Count
- Status
- Actions (Edit, Deactivate)

**Sample Rows:**
- Boston Hub | Northeast | Boston, MA | Sarah Johnson | 4 | Active | Edit
- Chicago Depot | Central | Chicago, IL | Michael Chen | 3 | Active | Edit

**Actions:**
- "Add Depot" button → Depot creation form

**Depot Form (Modal):**
- Depot Name (text input)
- Region (dropdown)
- Address (text area)
- Assign Operations Manager (dropdown, users with Ops Manager role)
- Assign Dispatch Managers (multi-select, users with Dispatcher role)
- Operating Hours (time range picker)
- Status (Active/Inactive)
- Save/Cancel

**Hierarchy Visualization:**
- Org chart showing region → depot → managers structure

---

### TAB 5 - Operational Roles
**Purpose:** View and configure predefined operational roles

**Predefined Roles List:**

1. **Dispatch Manager**
   - Description: Live delivery execution and in-day recovery decisions
   - Authority Limits:
     - Max SLA Impact: 5%
     - Max Cost Impact: $500
     - Max Deliveries Affected: 10
   - Assigned Users: 24
   - "Edit Authority Limits" button

2. **Operations Manager**
   - Description: Escalation approval, oversight, and outcome review
   - Authority: Approve/reject escalations within assigned regions
   - Assigned Users: 8
   - "Edit Settings" button

3. **Fleet Supervisor** (not implemented yet)
   - Description: Limited driver/vehicle management
   - Status: Coming Soon (gray badge)

**Role Configuration Panel (Expandable):**
- Click "Edit Authority Limits" → Expand configuration panel
- Adjust limits:
  - Max SLA Impact: Slider (0-10%)
  - Max Cost Impact: Slider ($0-$1000)
  - Max Deliveries: Slider (0-20)
  - Cross-Shift Reassignment: Toggle (Yes/No)
  - VIP Delivery Authority: Toggle (Yes/No)
- Save Changes button

**Role-to-User Assignments:**
- Summary: "24 users assigned to Dispatch Manager role"
- "View Users" link → Navigate to Users & Roles module

---

### TAB 6 - SLA Definitions
**Purpose:** Define SLA templates and thresholds

**SLA Templates Table:**
Columns:
- SLA Name
- Type (Delivery Window, Time-Bound, etc.)
- Threshold (e.g., 5:00 PM, 2 hours)
- Penalty
- Status
- Actions (Edit, Deactivate)

**Sample Rows:**
- Premium Delivery | Time-Bound | Same-day by 5 PM | $50 | Active | Edit
- Standard Delivery | Time-Bound | Next-day by 6 PM | $25 | Active | Edit
- VIP Express | Time-Bound | 2-hour window | $100 | Active | Edit

**Actions:**
- "Add SLA Template" button → SLA creation form

**SLA Template Form (Modal):**
- SLA Name (text input)
- SLA Type (dropdown: Time-Bound, Delivery Window, Next-Day, etc.)
- Threshold Definition:
  - For Time-Bound: Time picker (e.g., 5:00 PM)
  - For Delivery Window: Window duration (e.g., 2 hours)
- Penalty Amount (currency input)
- Grace Period (minutes input)
- Escalation Trigger (% before breach to trigger alert)
- Status (Active/Inactive)
- Save/Cancel

**SLA Escalation Rules:**
- Table showing when alerts escalate:
  - SLA Template, Alert Trigger (% before breach), Escalation Level
  - Premium Delivery | 20% buffer remaining | High
  - Standard Delivery | 10% buffer remaining | Medium

---

### TAB 7 - Branding & Theming
**Purpose:** Configure white-label branding

**Logo Configuration:**
- Current Logo: [Image preview]
- "Upload New Logo" button
- Supported formats: PNG, SVG, JPG
- Recommended size: 200x50px

**Color Scheme:**
- **Primary Color:** #2563EB (blue) [Color picker]
- **Secondary Color:** #10B981 (green) [Color picker]
- **Accent Color:** #F59E0B (amber) [Color picker]
- Preview panel showing colors in use

**Theme Preview:**
- Live preview of branded interface
- Shows dashboard with selected colors and logo

**White-Label Configuration:**
- Application Title: OptiMile (text input, default)
- Application Tagline: Enterprise Last-Mile Execution Control (text input)
- Footer Text: © 2026 ACME Logistics (text input)

**Actions:**
- "Save Branding" button
- "Reset to Default" button

---

### TAB 8 - Readiness Review
**Purpose:** Validate configuration completeness before go-live

**Configuration Completeness Checklist:**

1. **Company Information** ✅
   - Status: Complete
   - Company name, address, contact configured

2. **Regions & Structure** ✅
   - Status: Complete
   - 3 regions, 8 depots configured
   - All depots have assigned managers

3. **Operational Roles** ✅
   - Status: Complete
   - Authority limits configured
   - 32 users assigned to roles

4. **SLA Templates** ✅
   - Status: Complete
   - 6 SLA templates defined
   - Escalation rules configured

5. **Users** ✅
   - Status: Complete
   - 32 users created
   - All users have assigned roles and regions

6. **Integrations** ⚠️
   - Status: Incomplete
   - 1 integration degraded (TransportHub TMS)
   - Action Required: Test integration connection

7. **Branding** ✅
   - Status: Complete
   - Logo and colors configured

**Validation Errors/Warnings:**
- ⚠️ Warning: Integration "TransportHub TMS" is degraded. Please resolve before go-live.
- ℹ️ Info: 3 users have not logged in yet. Consider sending welcome emails.

**Go-Live Approval:**
- Status: Not Ready (red badge)
- Reason: 1 warning must be resolved
- OR
- Status: Ready for Go-Live (green badge)
- "Approve Go-Live" button (disabled if warnings exist)

**Actions:**
- "Resolve Warnings" button → Navigate to Integrations module
- "Approve Go-Live" button (enabled when ready)

---

### MODULE 4 - USERS & ROLES

### SCREEN 12.1 - Users & Roles Module
**Route:** `/tenant/users`  
**Access:** Tenant Admin only  
**Purpose:** Manage users, roles, and access

**Header:**
- Page title: "Users & Roles"
- "Add User" button
- Search bar

**Summary Cards:**
- Total Users: 32
- Dispatch Managers: 24
- Operations Managers: 8
- Active: 30
- Suspended: 2

**Filters:**
- Role: All, Dispatch Manager, Operations Manager, Fleet Supervisor
- Status: All, Active, Suspended, Pending Invite
- Region: All, Northeast, Central, West

**Users Table:**
Columns:
- Name (with avatar)
- Email
- Role (badge)
- Assigned Regions/Depots
- Status (badge: Active, Suspended, Pending)
- Last Login
- Actions (dropdown: Edit, Suspend, Delete)

**Sample Rows:**
- David Park | david.park@acme.com | Dispatch Manager | Northeast / Boston Hub | Active | 2 hours ago | Edit
- Sarah Johnson | sarah.j@acme.com | Operations Manager | Northeast, West | Active | 1 day ago | Edit
- John Smith | john.smith@acme.com | Dispatch Manager | Central | Suspended | 3 days ago | Edit

**Bulk Operations:**
- Select multiple users (checkboxes)
- "Suspend Selected" button
- "Delete Selected" button
- "Export List" button

**Interactions:**
- Click "Add User" → User creation form
- Click "Edit" → User edit form
- Click "Suspend" → Confirmation modal → Suspend user
- Click "Delete" → Confirmation modal → Delete user
- Search users by name/email
- Filter by role/status/region

---

### SCREEN 12.2 - User Creation/Edit Form
**Route:** `/tenant/users/new` or `/tenant/users/:userId/edit`  
**Access:** Tenant Admin only  
**Purpose:** Create new user or edit existing user

**Form Layout (Modal or Side Panel):**

**Basic Information:**
- First Name (text input)
- Last Name (text input)
- Email Address (text input, unique)
- Phone (optional, text input)

**Role Assignment:**
- Role (dropdown):
  - Dispatch Manager
  - Operations Manager
  - Fleet Supervisor (disabled, coming soon)
  - Tenant Admin

**Scope Assignment:**
- If Dispatch Manager or Operations Manager:
  - **Assigned Regions** (multi-select):
    - ☑ Northeast
    - ☐ Central
    - ☐ West
  - **Assigned Depots** (multi-select, filtered by selected regions):
    - ☑ Boston Hub
    - ☑ Hartford Depot
    - ☐ Providence Depot

- If Tenant Admin:
  - Scope: Tenant-wide (cannot be scoped)

**User Status:**
- Radio buttons:
  - ⚪ Active (default)
  - ⚪ Suspended
  - ⚪ Pending Invite (if new user)

**Invitation Options (for new users):**
- ☑ Send welcome email with login instructions
- Email Template Preview: [Expandable]

**Actions:**
- "Save User" button (create or update)
- "Cancel" button

**Validation:**
- Email must be unique
- At least one region/depot must be selected for Dispatch Manager/Ops Manager
- Role must be selected

**Interactions:**
- Fill form and save → User created/updated → Return to Users List
- Send invite email → User receives email with login link

---

### MODULE 5 - OPERATIONS VISIBILITY

### SCREEN 13.1 - Operations Visibility Module
**Route:** `/tenant/operations`  
**Access:** Tenant Admin only  
**Purpose:** Tenant-level operational health and governance oversight (read-only, no execution)

**Header:**
- Page title: "Operations Visibility"
- Subtitle: "Tenant-level operational health and governance oversight"
- Date/Region filters

**Summary Cards (Top Row):**
1. **Total Regions:** 3
2. **Active Operations Managers:** 8
3. **Active Dispatch Managers:** 24
4. **SLA Compliance (30d):** 97.8%
5. **Escalations This Period:** 47

**Filters:**
- Date Range: Last 30 Days, Last 7 Days, Today, Custom
- Region Filter: All Regions, Northeast, Central, West

**SLA Performance Summary:**
- Line chart showing SLA trend over time (30 days)
- Target line at 95%
- Region breakdown (color-coded lines)

**Escalation Overview:**
- **Summary Panel:**
  - Total Escalations (30d): 47
  - Approved: 34 (72.3%)
  - Rejected: 13 (27.7%)
  - Average Response Time: 18 minutes

- **Breakdown Cards:**
  - Approved: 34 (green)
  - Rejected: 13 (red)
  - Avg Response Time: 18 min (blue)

**Risk & Exception Trends (Aggregated):**
- Stacked bar chart or list:
  - High-Risk Alerts: 23
  - Driver Delays: 156
  - Route Deviations: 89
  - Capacity Warnings: 12

**Operations Managers Overview Table:**
Columns:
- Name
- Assigned Regions
- Dispatchers Covered
- Escalations Reviewed (30d)
- Approval Rate
- Avg Response Time
- Actions (View Details)

**Sample Rows:**
- Sarah Johnson | Northeast, Central | 8 | 24 | 75.0% | 15 min | View Details
- Michael Chen | West | 6 | 18 | 72.2% | 22 min | View Details

**Dispatch Managers Overview Table:**
Columns:
- Name
- Region / Depot
- Interventions (30d)
- AI Accept Rate
- SLA Save Rate
- Avg Decision Time
- Actions (View Details)

**Sample Rows:**
- David Park | Northeast / Boston Hub | 127 | 84% | 92% | 3.2 min | View Details
- Lisa Wang | Central / Chicago Depot | 143 | 78% | 88% | 4.1 min | View Details

**Note:**
- **NO live execution access** - This is governance-only view
- **NO intervention capability** - Cannot modify routes, drivers, or recoveries
- Pure oversight and analytics dashboard

**Interactions:**
- Filter by date range and region
- View manager/dispatcher details (performance deep dive)
- Export operational health report

---

### MODULE 6 - INTEGRATIONS

### SCREEN 14.1 - Integrations Module
**Route:** `/tenant/integrations`  
**Access:** Tenant Admin only  
**Purpose:** Manage external system connections and data feeds

**Header:**
- Page title: "Integrations"
- Subtitle: "Manage external system connections and data feeds"
- "Add Integration" button

**Summary Cards:**
- Total Integrations: 5
- Connected & Healthy: 2
- Degraded Performance: 1
- Failed Connection: 1

**Integration Categories:**

### Order Management Systems
**Integration Cards:**
- **OrderMS Connector**
  - Category: Order Management System
  - Status: Connected (green badge)
  - Last Sync: 2 minutes ago
  - Trust Level: Trusted
  - Uptime (30d): 99.8%
  - Actions: View Details, Configure, Test

- **CustomerPortal Sync**
  - Category: Order Management System
  - Status: Not Connected (gray badge)
  - Last Sync: Never
  - Trust Level: Not Configured
  - Actions: Configure

### Transportation Management Systems
- **TransportHub TMS**
  - Status: Degraded (amber badge)
  - Last Sync: 45 minutes ago
  - Trust Level: Limited
  - Uptime: 94.2%

### Telematics / Driver Apps
- **FleetTrack GPS**
  - Status: Connected (green badge)
  - Last Sync: 1 minute ago
  - Trust Level: Trusted
  - Uptime: 99.9%

### Other Data Feeds
- **RouteOptimizer API**
  - Status: Failed (red badge)
  - Last Sync: 3 hours ago
  - Trust Level: Suspended
  - Uptime: 78.5%

**Integration Health Monitoring Table:**
Columns:
- Integration Name
- Status (badge: Connected, Degraded, Failed, Not Connected)
- Uptime (30d)
- Last Sync
- Trust Level (badge: Trusted, Limited, Suspended, Not Configured)
- Actions (View Details, Test Connection)

**Interactions:**
- Click "Add Integration" → Integration setup wizard
- Click "View Details" → Integration detail view
- Click "Test Connection" → Run connection test
- Filter by category/status

---

### SCREEN 14.2 - Integration Detail View
**Route:** `/tenant/integrations/:integrationId`  
**Access:** Tenant Admin only  
**Purpose:** Configure and monitor single integration

**Header:**
- Back button → Integrations Module
- Integration Name: OrderMS Connector
- Status: Connected (badge)

**Connection Settings:**
- API Endpoint: https://api.orderms.com/v2
- Authentication Type: OAuth 2.0
- Client ID: ******** (masked)
- Client Secret: ******** (masked)
- "Edit Connection" button
- "Test Connection" button

**Data Mapping Configuration:**
- Table showing field mappings:
  - OptiMile Field → External System Field → Status
  - order_id → OrderNumber → Mapped ✅
  - customer_name → CustomerFullName → Mapped ✅
  - delivery_address → ShippingAddress → Mapped ✅

**Sync Schedule:**
- Sync Frequency: Every 5 minutes (dropdown)
- Last Sync: 2 minutes ago (3:28 PM)
- Next Sync: 3:33 PM (3 minutes)
- Auto-retry on failure: ☑ Enabled
- Max retry attempts: 3

**Sync History:**
- Table showing recent sync events:
  - Timestamp, Status, Records Synced, Errors, Actions
  - 3:28 PM | Success | 47 orders | 0 errors | View Logs
  - 3:23 PM | Success | 52 orders | 0 errors | View Logs
  - 3:18 PM | Partial | 38 orders | 2 errors | View Logs

**Error Logs:**
- Expandable section showing recent errors
- Error timestamp, message, resolution

**Trust Level:**
- Current Trust Level: Trusted (green badge)
- Criteria:
  - ✅ Uptime > 99% (last 30 days)
  - ✅ < 1% error rate
  - ✅ Consistent sync performance

**Monitoring & Alerts:**
- ☑ Send alert if uptime < 95%
- ☑ Send alert if sync fails 3 consecutive times
- ☑ Send alert if error rate > 5%

**Actions:**
- "Pause Sync" button
- "Run Manual Sync" button
- "Delete Integration" button (with confirmation)

---

### MODULE 7 - NOTIFICATIONS & ESCALATION

### SCREEN 15.1 - Notifications & Escalation Module
**Route:** `/tenant/notifications`  
**Access:** Tenant Admin only  
**Purpose:** Configure alert routing and escalation policies

**Header:**
- Page title: "Notifications & Escalation"
- Subtitle: "Configure alert routing and escalation policies"
- "Configure Policies" button

**Summary Cards:**
- Total Alert Types: 24
- Alerts with Escalation: 18
- Unassigned Alert Types: 3
- Avg Escalation Time: 12 min

**Alert Categories Overview:**
- **Execution Risk Alerts:** 12 alert types, Complete (green badge)
- **SLA Breach Alerts:** 6 alert types, Complete (green badge)
- **Integration Health:** 4 alert types, Incomplete (amber badge)
- **System & Platform:** 2 alert types, Complete (green badge)

**Alert Types Configuration Table:**
Columns:
- Alert Name
- Category
- Severity (badge: Critical, High, Medium, Low)
- Routing Configured (Yes ✅ / No ❌)
- Escalation Enabled (Yes ✅ / No ❌)
- Status (Active/Disabled badge)
- Actions (Configure)

**Sample Rows:**
- Driver Delay Alert | Execution Risk | High | ✅ Yes | ✅ Yes | Active | Configure
- SLA Breach Warning | SLA Breach | Critical | ✅ Yes | ✅ Yes | Active | Configure
- Route Deviation Alert | Execution Risk | Medium | ✅ Yes | ❌ No | Active | Configure
- Integration Health Degraded | Integration Health | High | ✅ Yes | ✅ Yes | Active | Configure
- Capacity Warning | Execution Risk | Medium | ❌ No | ❌ No | Disabled | Configure

**Escalation Policy Configuration:**
- Panel showing configured escalation policies:

1. **Critical SLA Breach** (3 Levels)
   - Level 1: Dispatch Manager → Wait 5 min
   - Level 2: Operations Manager → Wait 10 min
   - Level 3: Regional Director → Final
   - "Edit Policy" button

2. **Driver Delay High Risk** (2 Levels)
   - Level 1: Dispatch Manager → Wait 8 min
   - Level 2: Operations Manager → Final
   - "Edit Policy" button

**Quiet Hours & Throttling:**
- **Quiet Hours Configuration:**
  - Enabled: ✅ (toggle)
  - Time Range (Northeast): 22:00 - 06:00
  - Exceptions: Critical alerts bypass quiet hours

- **Throttling Rules:**
  - Max Alerts Per Hour: 50
  - Group Similar Alerts: Enabled (5 min window)
  - Cool-down Period: 3 minutes between similar alerts

**Interactions:**
- Click "Configure" on alert type → Alert configuration form
- Click "Edit Policy" on escalation policy → Policy editor
- Toggle quiet hours on/off
- Adjust throttling rules

---

### SCREEN 15.2 - Alert Configuration Form
**Route:** `/tenant/notifications/alerts/:alertId/configure`  
**Access:** Tenant Admin only  
**Purpose:** Configure routing and escalation for specific alert type

**Header:**
- Back button → Notifications Module
- Alert Name: Driver Delay Alert
- Severity: High (badge)

**Alert Metadata:**
- Alert Type: Driver Delay - High Risk
- Category: Execution Risk
- Severity: High (dropdown: Critical, High, Medium, Low)
- Description: "Triggered when driver is 15+ minutes behind schedule"

**Routing Rules:**
- **Primary Recipients:**
  - ☑ Assigned Dispatch Manager
  - ☑ Regional Operations Manager
  - ☐ Tenant Admin

- **Notification Channels:**
  - ☑ In-App Alert (always enabled)
  - ☑ Email
  - ☑ SMS (for Critical severity only)
  - ☐ Webhook

**Escalation Policy Assignment:**
- Escalation Enabled: ✅ Yes (toggle)
- Assigned Policy: "Driver Delay High Risk" (dropdown)
  - Level 1: Dispatch Manager → 8 min
  - Level 2: Operations Manager → Final
- "Edit Policy" link → Navigate to escalation policy editor

**Trigger Conditions (Advanced):**
- Threshold: Driver delay > 15 minutes
- Frequency: Real-time
- De-duplication: 10 minutes
- Auto-resolve: When driver back on schedule

**Actions:**
- "Save Configuration" button
- "Test Alert" button (sends test alert)
- "Cancel" button

---

### MODULE 8 - DATA & PRIVACY

### SCREEN 16.1 - Data & Privacy Module
**Route:** `/tenant/privacy`  
**Access:** Tenant Admin only  
**Purpose:** Manage data governance, retention, and privacy controls

**Header:**
- Page title: "Data & Privacy"
- Subtitle: "Manage data governance, retention, and privacy controls"
- "Generate Compliance Report" button

**Summary Cards:**
- Retention Policies: 6
- Anonymization Rules: 4
- Data Categories: 6
- Compliance Status: Compliant (green badge)

**Data Categories & Classification Table:**
Columns:
- Data Category
- Data Sensitivity (badge: High, Medium, Low)
- Contains PII (Yes/No badge)
- Regulatory Tag (GDPR, Local Law, Internal)
- Retention Period
- Actions (View Details)

**Sample Rows:**
- Orders | Medium | Yes | GDPR | 7 years | View
- Routes | Low | No | Internal | 3 years | View
- Stops | High | Yes | GDPR | 7 years | View
- Driver Data | High | Yes | GDPR, Local Law | 10 years | View
- User Activity | Medium | Yes | GDPR | 2 years | View
- Audit Logs | Medium | No | Internal | 5 years | View

**Retention Policy Configuration:**
- List of retention policies:

1. **Orders** (Active, Cold storage)
   - Duration: 7 years
   - Trigger: Delivery Completed
   - Storage: Cold
   - "Edit Policy" button

2. **Driver Data** (Active, Archived)
   - Duration: 10 years
   - Trigger: Account Deactivated
   - Storage: Archived
   - "Edit Policy" button

**Anonymization & De-identification Rules:**
- List of anonymization rules:

1. **Driver Data - Name** (Pseudonymization)
   - Field: Name
   - Method: Pseudonymization
   - Trigger: After 90 days
   - Reversible: No
   - "Edit Rule" button

2. **Stops - Address** (Masking)
   - Field: Address
   - Method: Masking
   - Trigger: After 180 days
   - Reversible: No
   - "Edit Rule" button

**Data Deletion & Lifecycle Jobs Table:**
Columns:
- Job Type (Retention, Anonymization, Deletion)
- Data Category
- Schedule (Daily, Weekly, Monthly)
- Last Run
- Records Affected
- Status (Success, Partial, Failed)
- Actions (View Logs)

**Sample Rows:**
- Retention | Orders | Daily | 2 hours ago | 1,247 | Success | View Logs
- Anonymization | Driver Data | Weekly | 3 days ago | 89 | Success | View Logs
- Deletion | User Activity | Monthly | 12 days ago | 5,632 | Success | View Logs

**Compliance & Regulatory Mapping:**

1. **GDPR Compliance** (Compliant, green)
   - ✅ Retention Policies
   - ✅ Data Anonymization
   - ✅ Export Controls
   - ✅ Audit Logging

2. **Internal Data Policy** (Compliant, green)
   - ✅ Access Controls
   - ✅ Encryption at Rest
   - ✅ Regular Backups
   - ⚠️ Incident Response (warning)

**Interactions:**
- Click "Edit Policy" → Retention policy editor
- Click "Edit Rule" → Anonymization rule editor
- Click "View Logs" → Lifecycle job logs
- Click "Generate Compliance Report" → PDF export

---

### MODULE 9 - AUDIT SUPER-VIEW

### SCREEN 17.1 - Audit Super-View Module
**Route:** `/tenant/audit`  
**Access:** Tenant Admin only  
**Purpose:** Track all governance events and configuration changes

**Header:**
- Page title: "Audit Super-View"
- Subtitle: "Track all governance events and configuration changes"
- "Export Audit Log" button

**Summary Cards (Top Row):**
- Changes (7d): 147
- Policy Changes: 23
- User Access Changes: 12
- Integration Changes: 8
- Alert Config Changes: 6

**Audit Coverage by Module:**
- Grid showing audit status for each module:
  - Settings: Complete ✅
  - Users: Complete ✅
  - Integrations: Complete ✅
  - Notifications: Complete ✅
  - Privacy: Complete ✅
  - Operations: Partial ⚠️
  - Dashboard: Complete ✅
  - Audit: Complete ✅

**Search & Filter Panel:**
- **Search:** Text input for searching audit entries
- **Filters:**
  - Module: All, Settings, Users, Integrations, etc.
  - Date Range: Last 7 Days, Last 30 Days, Custom
  - User/Actor: All, [List of users]

**Recent Critical Changes Panel:**
- Highlighted section showing high-severity changes:

1. **SLA Modified** (High severity)
   - Module: Settings (badge)
   - Object: Premium Delivery SLA
   - Changed By: Michael Chen
   - Timestamp: 1 day ago
   - "View Details" button

2. **Integration Status Change** (High severity)
   - Module: Integrations (badge)
   - Object: TransportHub TMS
   - Changed By: System
   - Timestamp: 5 hours ago
   - "View Details" button

**Unified Audit Timeline Table:**
Columns:
- Timestamp
- Module (badge)
- Change Type
- Object Affected
- Severity (badge: High, Medium, Low)
- Changed By
- Actions (View Details)

**Sample Rows:**
- 2 hours ago | Users | User Added | john.doe@acme.com | Medium | Sarah Johnson | View Details
- 5 hours ago | Integrations | Status Change | TransportHub TMS | High | System | View Details
- 1 day ago | Settings | SLA Modified | Premium Delivery SLA | High | Michael Chen | View Details
- 1 day ago | Notifications | Routing Updated | Driver Delay Alert | Medium | Sarah Johnson | View Details

**Access & Authority Change Audit:**
- **Summary Cards:**
  - Role Changes (30d): 7
  - Scope Expansions (30d): 3
  - Suspensions (30d): 2

- **Access Change Log Table:**
  - User, Change Type, Before, After, Changed By, Timestamp
  - david.park@acme.com | Role | Fleet Supervisor | Dispatch Manager | Sarah Johnson | 3 days ago
  - lisa.wang@acme.com | Scope | Central Region | Central, West Regions | Michael Chen | 5 days ago

**Compliance Snapshot & Evidence Pack:**
- **Compliance Checklist:**
  - ✅ Retention Policies Active
  - ✅ Anonymization Rules Active
  - ✅ Export Controls Enforced
  - ✅ Audit Logging Enabled

- **Evidence Summary:**
  - Linked Audit Logs: 1,247
  - Policy Summaries: 18
  - Last Generated: Dec 15, 2025

- "Generate Evidence Pack" button → PDF export with:
  - Full audit log
  - Policy summaries
  - Compliance checklist
  - Regulatory mapping

**Interactions:**
- Search audit entries by keyword
- Filter by module/date/user
- Click "View Details" → Audit detail modal
- Export audit log (PDF/CSV)
- Generate compliance evidence pack

---

### SCREEN 17.2 - Audit Detail Modal
**Route:** Modal overlay on `/tenant/audit`  
**Access:** Tenant Admin only  
**Purpose:** View full details of single audit event

**Modal Header:**
- Close button (X)
- Audit Event ID: AUD-2847-1523

**Event Details:**
- **Timestamp:** Jan 1, 2026, 2:15 PM
- **Module:** Settings (badge)
- **Change Type:** SLA Modified
- **Object:** Premium Delivery SLA
- **Severity:** High (badge)
- **Actor:** Michael Chen (Tenant Admin)

**Before/After Values:**
- **Before:**
  - SLA Threshold: Same-day by 5:00 PM
  - Penalty: $50
  - Grace Period: 15 minutes

- **After:**
  - SLA Threshold: Same-day by 6:00 PM (changed)
  - Penalty: $75 (changed)
  - Grace Period: 15 minutes (unchanged)

**Justification/Notes:**
- "Updated SLA threshold to align with new customer agreements. Penalty increased to reflect higher service tier."

**Related Changes:**
- List of related audit events (if any)

**Actions:**
- "Export Event Details" button (PDF)
- "Close" button

---

## DOCUMENTATION END

**Total Screens Documented:** 100+  
**Total Modules:** 9  
**Total Workflows:** 3 (Dispatch Manager, Operations Manager, Tenant Admin)

This comprehensive specification covers every screen, interaction, and data element in the OptiMile application across all three roles.
