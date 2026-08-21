# OptiMile Application - Complete Tree Node Structure

## Application Entry Point
```
ROOT
└── Role Selection Screen
    ├── Dispatch Manager Role Card → Login Screen → Dispatch Manager Workflow
    ├── Operations Manager Role Card → Login Screen → Operations Manager Workflow
    └── Tenant Admin Role Card → Login Screen → Tenant Admin Workflow
```

---

## DISPATCH MANAGER WORKFLOW TREE

```
DISPATCH MANAGER (Full Execution Control)
│
├── 📊 DASHBOARD (Home)
│   ├── Executive Summary Cards (SLA, Routes, Drivers, Alerts)
│   ├── Live Operations Grid (Routes, Drivers, Deliveries)
│   ├── Risk Focus Panel (Clickable)
│   └── → Risk Focus View (Modal/Overlay)
│       ├── Risk Severity Filters
│       ├── Risk Category Filters
│       └── Risk Item List (with Quick Actions)
│
├── 🚚 ROUTES
│   ├── Routes List Screen
│   │   ├── Filters (Status, Region, Risk Level)
│   │   ├── Search
│   │   └── Routes Grid
│   │       └── → Route Detail Screen
│   │           ├── Route Header (Status, Progress, Driver Info)
│   │           ├── Route Metrics (ETA, SLA, Completion %)
│   │           ├── Stop Sequence List
│   │           ├── Route Timeline
│   │           ├── Active Alerts
│   │           └── → Route Map View
│   │               ├── Interactive Map with Stops
│   │               ├── Planned vs Actual Path
│   │               ├── Stop Details Panel
│   │               └── Click Stop → Stop Details Sidebar
│
├── 👷 DRIVERS
│   ├── Drivers Overview Screen
│   │   ├── Filters (Status, Shift, Region)
│   │   ├── Search
│   │   └── Drivers Grid
│   │       └── → Driver Detail Screen
│   │           ├── Driver Header (Status, Location, Shift)
│   │           ├── Current Assignment
│   │           ├── Performance Metrics
│   │           ├── Availability Windows
│   │           ├── Active Alerts
│   │           ├── → Driver Availability Timeline
│   │           │   ├── Hourly Timeline View
│   │           │   ├── Committed Stops
│   │           │   ├── Break Windows
│   │           │   └── → Driver Impact Preview
│   │           │       ├── What-If Scenario Builder
│   │           │       ├── Affected Routes
│   │           │       ├── Affected Deliveries
│   │           │       └── Impact Metrics
│   │           └── Recent Activity Log
│
├── 📦 DELIVERIES
│   ├── Deliveries List Screen
│   │   ├── Filters (Status, Priority, Region)
│   │   ├── Search
│   │   └── Deliveries Grid
│   │       └── → Delivery Detail Screen
│   │           ├── Delivery Header (Status, Priority, Customer)
│   │           ├── Delivery Timeline
│   │           ├── Route & Driver Assignment
│   │           ├── Stop Details
│   │           ├── SLA Status
│   │           └── Related Alerts
│   │
│   └── VIP Deliveries View
│       ├── Premium Delivery List
│       ├── VIP Customer Filters
│       └── Priority Actions Panel
│
├── 🚨 ALERTS & RECOVERY
│   ├── Alerts Queue Screen
│   │   ├── Alert Filters (Severity, Type, Status)
│   │   ├── Alert List (Prioritized)
│   │   └── → Alert Detail Screen
│   │       ├── Alert Header (Severity, Type, Time)
│   │       ├── Context Information
│   │       ├── Affected Entities (Routes/Drivers/Deliveries)
│   │       ├── AI Recommendation
│   │       ├── Recovery Actions Panel
│   │       └── → Recovery Entry Context
│   │           ├── Alert Context Summary
│   │           ├── Scope Definition (Routes/Drivers/Deliveries)
│   │           ├── Recovery Goal Selection
│   │           └── → Recovery Option Builder
│   │               ├── Manual Recovery Actions
│   │               ├── AI Suggested Options
│   │               ├── Multi-Action Composer
│   │               ├── Live Preview Panel
│   │               └── → Impact Review
│   │                   ├── Impact Summary Cards
│   │                   ├── Affected Entities Tables
│   │                   ├── SLA Impact Analysis
│   │                   ├── Risk Assessment
│   │                   ├── Decision Options:
│   │                   │   ├── → Commit Review (if within authority)
│   │                   │   └── → Escalation Request (if exceeds authority)
│   │                   │
│   │                   ├── → Commit Review
│   │                   │   ├── Final Impact Summary
│   │                   │   ├── Authority Confirmation
│   │                   │   ├── Justification Field
│   │                   │   └── → Post-Commit Confirmation
│   │                   │       ├── Commit Success Message
│   │                   │       ├── Recovery ID & Timestamp
│   │                   │       └── Navigation Options
│   │                   │
│   │                   └── → Escalation Request
│   │                       ├── Escalation Reason Selection
│   │                       ├── Business Justification
│   │                       ├── Operations Manager Selection
│   │                       ├── Urgency Level
│   │                       └── → Escalation Status
│   │                           ├── Escalation Timeline
│   │                           ├── Status Updates (Pending/Approved/Rejected)
│   │                           ├── Operations Manager Feedback
│   │                           └── Action Options (Proceed/Revise/Cancel)
│   │
│   └── Alert History Screen
│       ├── Historical Alert List
│       ├── Date Range Filters
│       ├── Resolution Status
│       └── Decision Audit Trail
│
├── ⚙️ EXECUTION MONITOR
│   ├── Execution Monitor Dashboard
│   │   ├── Active Commits List
│   │   ├── Execution Status Filters
│   │   ├── Real-Time Progress Tracking
│   │   └── → Execution Detail Screen
│   │       ├── Commit Header (ID, Status, Timeline)
│   │       ├── Original Recovery Plan Summary
│   │       ├── Live Execution Progress
│   │       ├── Action Status Breakdown
│   │       ├── Affected Entities Tracking
│   │       ├── Exception Handling Panel
│   │       ├── Driver/Route/Delivery Quick Links
│   │       └── → Execution Outcome Screen
│   │           ├── Outcome Summary (Success/Partial/Failed)
│   │           ├── Final Impact vs Projected Impact
│   │           ├── SLA Achievement vs Target
│   │           ├── Recovery Metrics Dashboard
│   │           ├── Closure Actions:
│   │           │   ├── Close Recovery (with reason & notes)
│   │           │   ├── View Decision History
│   │           │   ├── View Evidence Snapshot
│   │           │   └── View Escalation Record (if applicable)
│   │           └── Lessons Learned Notes
│   │
│   └── Execution History
│       └── Historical Execution Records
│
└── 🔓 USER MENU
    ├── Profile
    ├── Settings
    └── Logout → Role Selection Screen
```

---

## OPERATIONS MANAGER WORKFLOW TREE

```
OPERATIONS MANAGER (Governance & Oversight Only - NO Execution)
│
├── 📊 DASHBOARD
│   ├── Governance Summary Cards
│   ├── Pending Escalations Count
│   ├── Today's Execution Oversight
│   ├── Recent Outcomes Summary
│   └── Quick Access Panels
│
├── 📋 ESCALATION QUEUE
│   ├── Escalation Queue Screen
│   │   ├── Escalation Filters (Urgency, Status, Dispatcher)
│   │   ├── Escalation List (Prioritized by Urgency)
│   │   └── → Escalation Review Screen
│   │       ├── Escalation Header (ID, Urgency, Dispatcher)
│   │       ├── Recovery Plan Summary
│   │       ├── Impact Analysis Review
│   │       ├── Dispatcher Justification
│   │       ├── Authority Breach Explanation
│   │       ├── Operations Manager Decision Panel:
│   │       │   ├── Approve (with constraints)
│   │       │   └── Reject (with feedback)
│   │       ├── Decision Justification Field
│   │       ├── Approval Constraints Configuration
│   │       └── Submit Decision → Queue Screen
│   │
│   └── Escalation History
│       └── Historical Escalation Records
│
├── 👁️ EXECUTION OVERSIGHT
│   ├── Live Execution Monitor (Read-Only)
│   │   ├── All Active Commits Across Dispatchers
│   │   ├── Execution Status Overview
│   │   ├── High-Risk Execution Alerts
│   │   └── → Execution Detail (Read-Only View)
│   │       ├── Commit Details
│   │       ├── Live Progress Tracking
│   │       └── Exception Monitoring
│   │
│   └── Execution Anomalies
│       └── Flagged Execution Issues
│
├── 📈 OUTCOMES REVIEW
│   ├── Operations Outcomes Screen
│   │   ├── Date Range Selector
│   │   ├── Outcome Metrics Dashboard
│   │   ├── SLA Achievement Trends
│   │   ├── Recovery Success Rates
│   │   ├── Dispatcher Performance Comparison
│   │   ├── Escalation Approval/Rejection Trends
│   │   └── Filter by Region/Dispatcher/Outcome
│   │
│   └── Outcome Deep Dive
│       └── Individual Outcome Analysis
│
├── 🔍 AUDIT & GOVERNANCE
│   ├── Operations Audit Screen
│   │   ├── Decision Audit Trail
│   │   ├── Dispatcher Actions Log
│   │   ├── Operations Manager Decisions Log
│   │   ├── SLA Compliance History
│   │   ├── Authority Breach Incidents
│   │   ├── Filter by Date/User/Action Type
│   │   └── Export Audit Report
│   │
│   └── Compliance Reports
│       └── Regulatory Compliance Evidence
│
└── 🔓 USER MENU
    ├── Profile
    ├── Settings
    └── Logout → Role Selection Screen
```

---

## TENANT ADMIN WORKFLOW TREE

```
TENANT ADMIN (Enterprise Configuration & Governance)
│
├── 🔐 FIRST LOGIN FLOW (Setup Gate)
│   │
│   ├── SCREEN 1.1 - First Login Landing
│   │   ├── Welcome Message
│   │   ├── Setup Checklist Preview
│   │   └── Start Setup Button → Setup Tracker
│   │
│   ├── SCREEN 1.2 - Setup Progress Tracker
│   │   ├── Setup Wizard Navigation
│   │   ├── Progress Bar (7 Steps)
│   │   ├── Step Cards (Regions, Structure, Roles, SLAs, Users, Branding, Review)
│   │   ├── Continue Setup → Settings Module
│   │   └── Save & Exit → Blocked Dashboard
│   │
│   └── SCREEN 1.3 - Blocked Dashboard (if setup incomplete)
│       ├── Access Blocked Message
│       ├── Setup Progress Display
│       ├── Resume Setup Button → Setup Tracker
│       └── (All sidebar navigation DISABLED until setup complete)
│
├── 📊 DASHBOARD (Post-Setup)
│   ├── Tenant Health Summary Cards
│   ├── Active Users Count
│   ├── Integration Status Overview
│   ├── Recent Governance Events
│   └── Quick Access Tiles (Settings, Users, Operations, Integrations)
│
├── ⚙️ MODULE 2 - SETTINGS (8 Tabs)
│   │
│   ├── TAB 1 - Company Information
│   │   ├── Editable Fields (Name, Address, Support Contact)
│   │   └── Read-Only Fields (Tenant ID, Created Date)
│   │
│   ├── TAB 2 - Subscription & Plan (Read-Only)
│   │   ├── Plan Name & Tier
│   │   ├── Billing Cycle
│   │   ├── Feature Access Matrix
│   │   └── Usage Limits
│   │
│   ├── TAB 3 - Regions Configuration
│   │   ├── Regions List Table
│   │   ├── Add/Edit/Archive Region
│   │   └── Region-Depot Hierarchy
│   │
│   ├── TAB 4 - Organizational Structure
│   │   ├── Depot Configuration
│   │   ├── Hierarchy Visualization
│   │   └── Manager Assignments
│   │
│   ├── TAB 5 - Operational Roles
│   │   ├── Predefined Roles List (Dispatch Manager, Operations Manager, etc.)
│   │   ├── Role Descriptions
│   │   └── Role-to-User Assignments
│   │
│   ├── TAB 6 - SLA Definitions
│   │   ├── SLA Templates Table
│   │   ├── Add/Edit SLA Template
│   │   ├── SLA Threshold Configuration
│   │   └── SLA Escalation Rules
│   │
│   ├── TAB 7 - Branding & Theming
│   │   ├── Logo Upload
│   │   ├── Color Scheme Selector
│   │   └── White-Label Configuration
│   │
│   └── TAB 8 - Readiness Review
│       ├── Configuration Completeness Checklist
│       ├── Validation Errors/Warnings
│       └── Go-Live Approval Status
│
├── 👥 MODULE 3 - USERS & ROLES
│   ├── Users List Screen
│   │   ├── Users Table (Name, Email, Role, Status, Regions)
│   │   ├── Search & Filters (Role, Status, Region)
│   │   ├── Add User Button → User Creation Form
│   │   ├── User Actions (Edit, Suspend, Delete)
│   │   └── Bulk Operations
│   │
│   ├── User Creation/Edit Form
│   │   ├── Basic Info (Name, Email)
│   │   ├── Role Assignment (Dispatch Manager, Operations Manager, Fleet Supervisor)
│   │   ├── Scope Assignment (Regions/Depots)
│   │   ├── Status (Active, Suspended)
│   │   └── Save/Cancel
│   │
│   └── Role Permissions Matrix (View-Only)
│       └── Role-to-Feature Access Map
│
├── 🔍 MODULE 4 - OPERATIONS VISIBILITY (Governance Only)
│   ├── Operations Visibility Screen
│   │   ├── Summary Cards (Regions, Ops Managers, Dispatchers, SLA %, Escalations)
│   │   ├── Date/Region Filters
│   │   ├── SLA Performance Summary Chart
│   │   ├── Escalation Overview (Total, Approved, Rejected, Avg Response Time)
│   │   ├── Risk & Exception Trends (Aggregated)
│   │   ├── Operations Managers Overview Table
│   │   │   ├── Name, Assigned Regions, Dispatchers Covered
│   │   │   ├── Escalations Reviewed, Approval Rate, Avg Response Time
│   │   │   └── View Details → Manager Performance Deep Dive
│   │   └── Dispatch Managers Overview Table
│   │       ├── Name, Region/Depot, Interventions
│   │       ├── AI Accept Rate, SLA Save Rate, Avg Decision Time
│   │       └── View Details → Dispatcher Performance Deep Dive
│   │
│   └── NOTE: NO live execution access, NO intervention capability
│       └── Pure governance & oversight dashboard
│
├── 🔗 MODULE 5 - INTEGRATIONS
│   ├── Integrations Screen
│   │   ├── Summary Cards (Total, Connected, Degraded, Failed)
│   │   ├── Integration Categories:
│   │   │   ├── Order Management Systems (OMS)
│   │   │   ├── Transportation Management Systems (TMS)
│   │   │   ├── Telematics / Driver Apps
│   │   │   └── Other Data Feeds
│   │   ├── Integration Cards (per integration):
│   │   │   ├── Integration Name & Category
│   │   │   ├── Status Badge (Connected/Degraded/Failed/Not Connected)
│   │   │   ├── Last Sync Time
│   │   │   ├── Trust Level (Trusted/Limited/Suspended)
│   │   │   └── Actions (Configure, View Details, Test)
│   │   ├── Integration Health Monitoring Table
│   │   │   ├── Integration, Status, Uptime (30d), Last Sync, Trust Level
│   │   │   └── Actions (View Details)
│   │   └── Add Integration Button → Integration Setup Wizard
│   │
│   └── Integration Detail View
│       ├── Connection Settings
│       ├── Data Mapping Configuration
│       ├── Sync Schedule
│       ├── Error Logs
│       └── Test Connection
│
├── 🔔 MODULE 6 - NOTIFICATIONS & ESCALATION
│   ├── Notifications Configuration Screen
│   │   ├── Summary Cards (Alert Types, Escalation Enabled, Unassigned, Avg Escalation Time)
│   │   ├── Alert Categories Overview:
│   │   │   ├── Execution Risk Alerts (count, status)
│   │   │   ├── SLA Breach Alerts (count, status)
│   │   │   ├── Integration Health Alerts (count, status)
│   │   │   └── System & Platform Alerts (count, status)
│   │   ├── Alert Types Configuration Table
│   │   │   ├── Alert Name, Category, Severity
│   │   │   ├── Routing Configured (Yes/No)
│   │   │   ├── Escalation Enabled (Yes/No)
│   │   │   ├── Status (Active/Disabled)
│   │   │   └── Configure Button → Alert Configuration Form
│   │   ├── Escalation Policy Configuration
│   │   │   ├── Policy Name (e.g., "Critical SLA Breach")
│   │   │   ├── Escalation Levels (Level 1, 2, 3...)
│   │   │   ├── Wait Times per Level
│   │   │   ├── Role Assignment per Level
│   │   │   └── Edit Policy Button
│   │   └── Quiet Hours & Throttling
│   │       ├── Quiet Hours Toggle & Time Range
│   │       ├── Exceptions Configuration
│   │       ├── Max Alerts Per Hour
│   │       ├── Group Similar Alerts
│   │       └── Cool-down Period
│   │
│   └── Alert Configuration Form
│       ├── Alert Metadata
│       ├── Routing Rules
│       ├── Escalation Policy Assignment
│       └── Notification Channels
│
├── 🔒 MODULE 7 - DATA & PRIVACY
│   ├── Data & Privacy Screen
│   │   ├── Summary Cards (Retention Policies, Anonymization Rules, Data Categories, Compliance Status)
│   │   ├── Data Categories & Classification Table
│   │   │   ├── Category, Sensitivity Level, Contains PII, Regulatory Tag, Retention Period
│   │   │   └── Edit Button → Classification Editor
│   │   ├── Retention Policy Configuration
│   │   │   ├── Policy List (Category, Duration, Trigger, Storage Tier, Status)
│   │   │   ├── Add Policy Button
│   │   │   └── Edit Policy → Retention Policy Form
│   │   ├── Anonymization & De-identification Rules
│   │   │   ├── Rules List (Category, Field, Method, Trigger, Reversible)
│   │   │   ├── Add Rule Button
│   │   │   └── Edit Rule → Anonymization Rule Form
│   │   ├── Data Deletion & Lifecycle Jobs Table
│   │   │   ├── Job Type, Data Category, Schedule, Last Run, Records Affected, Status
│   │   │   └── View Logs Button
│   │   └── Compliance & Regulatory Mapping
│   │       ├── GDPR Compliance Checklist
│   │       ├── Internal Data Policy Checklist
│   │       └── Generate Compliance Report Button
│   │
│   └── Compliance Evidence Export
│       └── PDF/CSV Export of Privacy Compliance
│
├── 📋 MODULE 8 - AUDIT SUPER-VIEW
│   ├── Audit Screen
│   │   ├── Summary Cards (Changes 7d, Policy Changes, User Access Changes, Integration Changes, Alert Config Changes)
│   │   ├── Audit Coverage by Module (Settings, Users, Integrations, Notifications, Privacy, Operations, Dashboard, Audit)
│   │   ├── Search & Filter Panel
│   │   │   ├── Search Audit Entries
│   │   │   ├── Filter by Module
│   │   │   ├── Filter by Date Range
│   │   │   └── Filter by User/Actor
│   │   ├── Recent Critical Changes Panel
│   │   │   ├── High-severity changes highlighted
│   │   │   ├── Change Type, Object Affected, Timestamp, Changed By
│   │   │   └── View Details Button
│   │   ├── Unified Audit Timeline Table
│   │   │   ├── Timestamp, Module, Change Type, Object, Severity, Changed By
│   │   │   └── View Details → Change Detail Modal
│   │   ├── Access & Authority Change Audit
│   │   │   ├── Role Changes, Scope Expansions, Suspensions (counts)
│   │   │   └── User Access Change Log Table
│   │   └── Compliance Snapshot & Evidence Pack
│   │       ├── Compliance Checklist (Retention, Anonymization, Export Controls, Audit Logging)
│   │       ├── Evidence Summary (Linked Logs, Policy Summaries, Last Generated)
│   │       └── Generate Evidence Pack Button → PDF Export
│   │
│   └── Audit Detail Modal
│       ├── Full Change Details
│       ├── Before/After Values
│       ├── Actor Information
│       └── Related Changes
│
└── 🔓 USER MENU
    ├── Profile
    ├── Settings
    └── Logout → Role Selection Screen
```

---

## CROSS-ROLE NAVIGATION NOTES

### Common Patterns
- **All roles** start at Role Selection → Login → Role-specific workflow
- **Logout** from any role returns to Role Selection
- **Nested navigation** uses breadcrumbs for deep drill-downs
- **Modal overlays** for quick actions (e.g., Risk Focus View, Impact Preview)
- **Back navigation** always returns to parent screen in hierarchy

### Role Separation Enforcement
- **Dispatch Manager** = Execution screens ONLY
- **Operations Manager** = Governance & oversight ONLY (read-only on execution)
- **Tenant Admin** = Configuration & audit ONLY (no live operations access)

### Setup Gate Logic (Tenant Admin)
- If `setupComplete = false` → Block all modules except Setup Tracker
- If `setupComplete = true` → Enable all 8 modules
- Setup can be resumed at any time from Blocked Dashboard

---

## FILE COUNT SUMMARY

**Total Screens Implemented:** 100+

**Dispatch Manager:** 35 screens  
**Operations Manager:** 12 screens  
**Tenant Admin:** 53 screens (including setup flow and 8 modules)

**Navigation Components:** 3 sidebars (Dispatch, Ops Manager, Tenant Admin)

**Total React Components:** 108 files
