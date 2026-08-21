# OptiMile - Role-Based Access Control (RBAC) Specification

## Role Philosophy & Separation of Concerns

OptiMile implements strict role-based separation to ensure operational accountability, governance oversight, and enterprise-grade configuration management remain cleanly separated.

### Core Principles
1. **No Role Overlap** - Each role has distinct, non-overlapping responsibilities
2. **Authority Boundaries** - Clear authority limits with escalation mechanisms
3. **Audit Trail** - All actions logged per role for compliance
4. **Read-Only Enforcement** - Oversight roles cannot interfere with execution
5. **Setup Gates** - Tenant Admin must complete setup before tenant goes live

---

## ROLE 1: DISPATCH MANAGER

### Role Definition
**Primary Purpose:** Live delivery execution control and in-day recovery decisions  
**Authority Level:** Operational execution within defined limits  
**Execution Capability:** FULL (with escalation for out-of-bounds decisions)  
**Oversight Capability:** NONE (no governance or approval functions)

### Access Matrix

| Module / Feature | Access Level | Notes |
|-----------------|--------------|-------|
| **Dashboard** | Full Read/Write | Live operational dashboard with risk focus |
| **Routes Management** | Full Read/Write | View, modify, reassign routes |
| **Route Detail** | Full Read/Write | Stop management, timeline adjustments |
| **Route Map View** | Full Read | Interactive map with planned vs actual path |
| **Drivers Management** | Full Read/Write | View, reassign, manage availability |
| **Driver Detail** | Full Read/Write | Performance, availability, impact preview |
| **Driver Timeline** | Full Read/Write | Availability windows, commitment tracking |
| **Driver Impact Preview** | Full Read | What-if scenario analysis |
| **Deliveries Management** | Full Read/Write | View, prioritize, reassign deliveries |
| **Delivery Detail** | Full Read/Write | Status updates, timeline modifications |
| **VIP Deliveries** | Full Read/Write | Premium delivery prioritization |
| **Alerts Queue** | Full Read/Write | Alert triage, acknowledgment, dismissal |
| **Alert Detail** | Full Read/Write | Alert investigation and action triggers |
| **Alert History** | Full Read | Historical alert review and audit |
| **Recovery Entry** | Full Read/Write | Initiate recovery from alerts or proactive |
| **Recovery Builder** | Full Read/Write | Build manual or AI-assisted recovery plans |
| **Impact Review** | Full Read/Write | Review SLA/cost/risk impact before commit |
| **Commit Review** | Conditional Write | **IF within authority** → Commit recovery plan |
| **Escalation Request** | Full Write | **IF exceeds authority** → Request escalation |
| **Escalation Status** | Full Read | Monitor escalation approval status |
| **Post-Commit Confirmation** | Full Read | View commit success and recovery ID |
| **Execution Monitor** | Full Read/Write | Monitor active commits, handle exceptions |
| **Execution Detail** | Full Read/Write | Track live execution progress |
| **Execution Outcome** | Full Read/Write | Review outcomes, close recovery |
| **Settings** | None | No access to tenant/enterprise configuration |
| **User Management** | None | No access to user/role management |
| **Integrations** | None | No access to integration configuration |
| **Notifications Config** | None | No access to alert routing configuration |
| **Data & Privacy** | None | No access to data governance settings |
| **Audit** | None | No access to audit logs |
| **Operations Visibility** | None | No access to governance dashboards |

### Authority Boundaries

#### Within Authority (Auto-Approve)
- Route reassignments affecting ≤ 5 deliveries
- Driver reassignments within same shift
- Delivery time window adjustments ≤ 30 minutes
- Stop sequence changes within same route
- Recovery plans with SLA impact ≤ 2%

#### Requires Escalation (Operations Manager Approval)
- Route reassignments affecting > 5 deliveries
- Cross-shift driver reassignments
- Delivery time window adjustments > 30 minutes
- Inter-route stop reassignments
- Recovery plans with SLA impact > 2%
- VIP delivery at-risk scenarios
- Cost impact > $500

### Actions & Permissions

| Action | Permission | Audit Logged |
|--------|------------|--------------|
| View routes | ✅ Allow | ✅ Yes |
| Modify route sequence | ✅ Allow | ✅ Yes |
| Reassign driver to route | ✅ Allow (within authority) | ✅ Yes |
| Acknowledge alert | ✅ Allow | ✅ Yes |
| Build recovery plan | ✅ Allow | ✅ Yes |
| Commit recovery (within authority) | ✅ Allow | ✅ Yes |
| Request escalation | ✅ Allow | ✅ Yes |
| Approve escalation | ❌ Deny | N/A |
| Reject escalation | ❌ Deny | N/A |
| Monitor execution | ✅ Allow | ✅ Yes |
| Close recovery | ✅ Allow | ✅ Yes |
| Create/modify users | ❌ Deny | N/A |
| Configure integrations | ❌ Deny | N/A |
| Configure alert routing | ❌ Deny | N/A |
| Access audit logs | ❌ Deny | N/A |
| Modify SLA templates | ❌ Deny | N/A |

---

## ROLE 2: OPERATIONS MANAGER

### Role Definition
**Primary Purpose:** Governance, escalation approval, oversight, outcome review, and audit  
**Authority Level:** Approval authority for escalations  
**Execution Capability:** NONE (read-only on execution)  
**Oversight Capability:** FULL (governance and audit)

### Access Matrix

| Module / Feature | Access Level | Notes |
|-----------------|--------------|-------|
| **Dashboard** | Full Read | Governance dashboard with escalation/outcome summary |
| **Escalation Queue** | Full Read/Write | Review and approve/reject escalations |
| **Escalation Review** | Full Read/Write | Detailed escalation analysis and decision |
| **Escalation History** | Full Read | Historical escalation records |
| **Execution Oversight** | Read-Only | Monitor all active commits across dispatchers |
| **Execution Detail** | Read-Only | View execution progress (no intervention) |
| **Outcomes Review** | Full Read | SLA achievement, recovery success rates, trends |
| **Audit & Governance** | Full Read | Decision audit trail, compliance reports |
| **Routes** | Read-Only | View routes but cannot modify |
| **Drivers** | Read-Only | View drivers but cannot reassign |
| **Deliveries** | Read-Only | View deliveries but cannot modify |
| **Alerts** | Read-Only | View alerts but cannot action |
| **Recovery** | Read-Only | View recovery plans but cannot build/commit |
| **Settings** | None | No access to tenant configuration |
| **User Management** | None | No access to user/role management |
| **Integrations** | None | No access to integration configuration |
| **Notifications Config** | None | No access to alert routing configuration |
| **Data & Privacy** | None | No access to data governance settings |
| **Tenant Audit** | None | No access to tenant-level audit logs |

### Escalation Approval Authority

#### Can Approve
- Any escalation request from Dispatch Managers within their region
- Cross-region escalations (if regional authority)
- High-impact recovery plans (SLA impact > 2%)
- VIP delivery at-risk scenarios
- Cost impact decisions > $500

#### Cannot Approve
- Escalations outside their regional scope (if regionally scoped)
- Escalations requiring C-level approval (configured in tenant settings)

#### Approval Options
1. **Approve with Constraints**
   - Set maximum SLA impact tolerance
   - Set budget cap
   - Set time window restrictions
   - Provide approval notes

2. **Reject with Feedback**
   - Provide rejection reason
   - Suggest alternative approach
   - Request plan revision

### Actions & Permissions

| Action | Permission | Audit Logged |
|--------|------------|--------------|
| View escalation queue | ✅ Allow | ✅ Yes |
| Approve escalation | ✅ Allow | ✅ Yes |
| Reject escalation | ✅ Allow | ✅ Yes |
| View execution monitor | ✅ Allow (read-only) | ✅ Yes |
| Intervene in execution | ❌ Deny | N/A |
| Commit recovery plan | ❌ Deny | N/A |
| Modify routes/drivers/deliveries | ❌ Deny | N/A |
| View outcomes dashboard | ✅ Allow | ✅ Yes |
| View audit trail | ✅ Allow | ✅ Yes |
| Export audit reports | ✅ Allow | ✅ Yes |
| Create/modify users | ❌ Deny | N/A |
| Configure integrations | ❌ Deny | N/A |
| Configure alert routing | ❌ Deny | N/A |
| Modify SLA templates | ❌ Deny | N/A |
| Access tenant admin modules | ❌ Deny | N/A |

---

## ROLE 3: TENANT ADMIN

### Role Definition
**Primary Purpose:** Enterprise configuration, user management, integrations, and governance oversight  
**Authority Level:** Full tenant configuration authority  
**Execution Capability:** NONE (no access to live operations)  
**Oversight Capability:** Tenant-level governance only (no execution oversight)

### Access Matrix

| Module / Feature | Access Level | Notes |
|-----------------|--------------|-------|
| **First Login & Setup Gate** | Full Read/Write | Required on first login |
| **Setup Progress Tracker** | Full Read/Write | 7-step tenant setup wizard |
| **Blocked Dashboard** | Full Read | Displayed if setup incomplete |
| **Tenant Dashboard** | Full Read | Post-setup health dashboard |
| **Settings Module** | Full Read/Write | 8 configuration tabs |
| - Company Information | Full Read/Write | Editable tenant metadata |
| - Subscription & Plan | Read-Only | Billing/plan info (managed externally) |
| - Regions Configuration | Full Read/Write | Region/depot hierarchy |
| - Organizational Structure | Full Read/Write | Depot and hierarchy setup |
| - Operational Roles | Full Read/Write | Role definitions and assignments |
| - SLA Definitions | Full Read/Write | SLA templates and thresholds |
| - Branding & Theming | Full Read/Write | Logo, colors, white-label config |
| - Readiness Review | Full Read | Setup completeness validation |
| **Users & Roles Module** | Full Read/Write | User creation, role assignment, suspension |
| **Operations Visibility** | Full Read | Tenant-level operational health (no execution) |
| **Integrations Module** | Full Read/Write | Integration setup, health monitoring, trust levels |
| **Notifications & Escalation** | Full Read/Write | Alert routing, escalation policies, quiet hours |
| **Data & Privacy Module** | Full Read/Write | Retention, anonymization, compliance |
| **Audit Super-View** | Full Read | Unified audit across all modules |
| **Live Routes** | None | No access to live route execution |
| **Live Drivers** | None | No access to live driver management |
| **Live Deliveries** | None | No access to live delivery tracking |
| **Live Alerts** | None | No access to live alert queue |
| **Recovery Tools** | None | No access to recovery builder |
| **Execution Monitor** | None | No access to live execution tracking |
| **Escalation Queue** | None | No access to escalation approval |

### Setup Gate Enforcement

#### Setup Incomplete (`setupComplete = false`)
- **Accessible Screens:**
  - First Login Landing
  - Setup Progress Tracker
  - Settings Module (for setup completion)
  - Blocked Dashboard

- **Blocked Screens (sidebar disabled):**
  - Tenant Dashboard
  - Users & Roles
  - Operations Visibility
  - Integrations
  - Notifications & Escalation
  - Data & Privacy
  - Audit Super-View

#### Setup Complete (`setupComplete = true`)
- **All 8 modules enabled**
- Setup can be revisited via Settings module

### Actions & Permissions

| Action | Permission | Audit Logged |
|--------|------------|--------------|
| View tenant dashboard | ✅ Allow (post-setup) | ✅ Yes |
| Modify company settings | ✅ Allow | ✅ Yes |
| Create users | ✅ Allow | ✅ Yes |
| Assign roles | ✅ Allow | ✅ Yes |
| Suspend users | ✅ Allow | ✅ Yes |
| Configure regions | ✅ Allow | ✅ Yes |
| Define SLA templates | ✅ Allow | ✅ Yes |
| Configure integrations | ✅ Allow | ✅ Yes |
| Set up alert routing | ✅ Allow | ✅ Yes |
| Configure escalation policies | ✅ Allow | ✅ Yes |
| Define retention policies | ✅ Allow | ✅ Yes |
| Configure anonymization rules | ✅ Allow | ✅ Yes |
| View tenant-level audit logs | ✅ Allow | ✅ Yes |
| Export compliance reports | ✅ Allow | ✅ Yes |
| View operations visibility | ✅ Allow (read-only) | ✅ Yes |
| Access live execution | ❌ Deny | N/A |
| Modify routes/drivers/deliveries | ❌ Deny | N/A |
| Build recovery plans | ❌ Deny | N/A |
| Approve escalations | ❌ Deny | N/A |
| Intervene in execution | ❌ Deny | N/A |
| View live alert queue | ❌ Deny | N/A |

---

## ROLE COMPARISON MATRIX

| Capability | Dispatch Manager | Operations Manager | Tenant Admin |
|-----------|-----------------|-------------------|--------------|
| **Live Execution Control** | ✅ Full | ❌ None | ❌ None |
| **Route Modification** | ✅ Yes | ❌ Read-Only | ❌ No Access |
| **Driver Reassignment** | ✅ Yes | ❌ Read-Only | ❌ No Access |
| **Delivery Management** | ✅ Yes | ❌ Read-Only | ❌ No Access |
| **Alert Triage & Action** | ✅ Yes | ❌ Read-Only | ❌ No Access |
| **Recovery Plan Building** | ✅ Yes | ❌ Read-Only | ❌ No Access |
| **Recovery Commit (within authority)** | ✅ Yes | ❌ No | ❌ No |
| **Escalation Request** | ✅ Yes | ❌ No | ❌ No |
| **Escalation Approval** | ❌ No | ✅ Yes | ❌ No |
| **Execution Monitoring** | ✅ Full | ✅ Read-Only | ❌ No Access |
| **Outcomes Review** | ❌ No | ✅ Yes | ❌ No Access |
| **Audit Trail Access** | ❌ No | ✅ Yes (ops audit) | ✅ Yes (tenant audit) |
| **User Management** | ❌ No | ❌ No | ✅ Yes |
| **SLA Configuration** | ❌ No | ❌ No | ✅ Yes |
| **Integration Setup** | ❌ No | ❌ No | ✅ Yes |
| **Alert Routing Config** | ❌ No | ❌ No | ✅ Yes |
| **Data Governance** | ❌ No | ❌ No | ✅ Yes |
| **Tenant Setup** | ❌ No | ❌ No | ✅ Yes |
| **Operations Visibility** | ❌ No | ❌ No | ✅ Yes (read-only) |

---

## AUTHORITY ESCALATION FLOW

### Scenario: Dispatch Manager Exceeds Authority

```
1. Dispatch Manager builds recovery plan
2. Impact Review shows: SLA impact 5% (exceeds 2% limit)
3. System enforces escalation:
   - "Commit" button DISABLED
   - "Request Escalation" button ENABLED
4. Dispatch Manager submits escalation with justification
5. Escalation routed to Operations Manager
6. Operations Manager reviews and decides:
   - APPROVE → Dispatch Manager notified → Can proceed to Commit
   - REJECT → Dispatch Manager notified → Must revise plan
```

### Authority Limits Configuration (Tenant Admin)

Tenant Admin configures authority limits in **Settings > Operational Roles**:

| Limit Type | Dispatch Manager Default | Configurable |
|-----------|-------------------------|--------------|
| Max Deliveries Affected | 5 | ✅ Yes |
| Max SLA Impact % | 2% | ✅ Yes |
| Max Cost Impact | $500 | ✅ Yes |
| Cross-Shift Reassignment | No | ✅ Yes |
| VIP Delivery at Risk | No (requires escalation) | ✅ Yes |

---

## AUDIT & COMPLIANCE

### Audit Logging by Role

| Role | Actions Logged | Log Visibility |
|------|---------------|----------------|
| **Dispatch Manager** | All execution actions, commits, escalation requests | Operations Manager, Tenant Admin (audit module) |
| **Operations Manager** | Escalation approvals/rejections, audit access | Tenant Admin (audit module) |
| **Tenant Admin** | User changes, config changes, integration changes | Tenant Admin (audit module) |

### Compliance Requirements

#### Dispatch Manager Audit Trail
- Every route modification
- Every driver reassignment
- Every recovery commit
- Every escalation request
- Every execution intervention

#### Operations Manager Audit Trail
- Every escalation decision (approve/reject)
- Every escalation view
- Every outcome review access
- Every audit report export

#### Tenant Admin Audit Trail
- Every user created/modified/suspended
- Every role assignment change
- Every SLA template change
- Every integration configuration change
- Every alert routing change
- Every retention policy change
- Every anonymization rule change

---

## ROLE ASSIGNMENT RULES

### User Can Have Only ONE Primary Role
- A user account is assigned **exactly one role** per tenant
- No role stacking or multi-role assignment
- Users requiring multiple capabilities need separate accounts

### Regional Scoping (Optional)
Tenant Admin can scope users to specific regions:
- **Dispatch Manager** → Assigned to 1 or more regions/depots
- **Operations Manager** → Assigned to 1 or more regions (can approve escalations for those regions only)
- **Tenant Admin** → Tenant-wide (cannot be region-scoped)

### Example User Assignments

| User | Role | Region Scope | Authority |
|------|------|--------------|-----------|
| john.dispatcher@acme.com | Dispatch Manager | Northeast Region | Execute recovery in Northeast |
| sarah.ops@acme.com | Operations Manager | Northeast, West Regions | Approve escalations for Northeast & West |
| admin@acme.com | Tenant Admin | Tenant-wide | Configure entire tenant |

---

## PERMISSION ENFORCEMENT

### Frontend Enforcement
- UI elements hidden/disabled based on role
- Navigation sidebar shows only permitted screens
- Action buttons disabled for unauthorized actions

### Backend Enforcement (Assumed)
- API endpoints validate user role and authority
- Operations validated against authority limits
- Audit logs created server-side

### Setup Gate Enforcement (Tenant Admin)
- If `setupComplete = false`:
  - Sidebar navigation DISABLED (except Setup Tracker)
  - All module routes redirect to Blocked Dashboard
  - Only Setup Tracker and Settings accessible

---

## SECURITY NOTES

1. **No Role Elevation** - Users cannot escalate their own role
2. **Session Isolation** - Logging out returns to role selection (no session persistence)
3. **Audit Immutability** - Audit logs cannot be modified by any role
4. **Read-Only Enforcement** - Operations Manager cannot modify execution state
5. **Setup Gate** - Tenant must complete setup before users can access operational modules

---

## FUTURE ROLE EXTENSIONS (Not Implemented)

- **Fleet Supervisor** - Limited driver/vehicle management (no recovery authority)
- **Regional Director** - Multi-region oversight (extends Operations Manager)
- **Customer Service Rep** - Delivery status inquiries (read-only on deliveries)
- **BI Analyst** - Read-only analytics and reporting
