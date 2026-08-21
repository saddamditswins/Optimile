# How to Access the Escalation Request Screen

## Navigation Path

The **Escalation Request** screen is accessible from the **Impact & Feasibility Review** screen when policy thresholds are breached.

### Complete Flow:

1. **Start**: From Dashboard → Navigate to Alerts
2. **Alerts Queue** → Select an alert requiring recovery
3. **Alert Detail** → Click "Initiate Recovery"
4. **Recovery Entry Context** → Click "Draft Recovery Plan"
5. **Recovery Option Builder** → Configure recovery actions → Click "Review Impact"
6. **Impact & Feasibility Review** → **Click "Request Escalation"** button (amber button in footer)
7. **Escalation Request** screen opens

### When the Escalation Button Appears:

The **"Request Escalation"** button appears in the Impact Review footer when:
- Policy evaluation detects threshold breaches
- Management approval is required before execution
- Example: VIP customer impact with penalty exposure > $2,000

### Visual Indicator:

In the Impact Review screen, you'll see:
- **Policy Evaluation section** shows "ESCALATION REQUIRED" badge
- **Management Escalation Required** panel (amber) with Lock icon
- **Footer button**: "Request Escalation" (amber button next to "Proceed to Commit Review")

### Alternative Navigation (for testing):

Since the button only appears when escalation is needed, you can also directly access it via the sidebar navigation (when logged in as Dispatch Manager).

## Complete Recovery & Escalation Workflow:

```
Dashboard
  ↓
Alerts → Alert Detail
  ↓
Recovery Entry Context
  ↓
Recovery Option Builder
  ↓
Impact & Feasibility Review
  ↓
┌─────────────────────────┐
│ If Policy OK:           │  If Escalation Required:
│   → Commit Review       │    → Escalation Request
│   → Post-Commit         │      ↓
└─────────────────────────┘    Escalation Status
                                  ↓
                                ┌────────────────────┐
                                │ If Approved:       │  If Rejected:
                                │   → Commit Review  │    → Revise Plan
                                │   → Post-Commit    │
                                └────────────────────┘
```

## Testing the Escalation Flow:

1. **Follow the main recovery path** to reach Impact Review
2. **Look for the amber "Request Escalation" button** in the footer (right side)
3. Click it to open the **Escalation Request** screen
4. Fill in the justification (minimum 30 characters required)
5. Click **"Submit Escalation Request"**
6. You'll be taken to the **Escalation Status** screen
7. **Toggle the status** in EscalationStatus.tsx (line 20) to test different states:
   - `'pending'` - Awaiting review
   - `'approved'` - Can proceed to Commit Review
   - `'rejected'` - Must revise recovery plan
