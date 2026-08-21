# OptiMile Design System - Global Standardization

## Overview

OptiMile is a unified product experience across all operational roles. Users switching roles should feel "same system, different responsibility" - not like they're entering a separate application.

---

## Core Principle

**"Same system, different responsibility"**

Roles differ by **PERMISSIONS and DATA**, not by **DESIGN**.

---

## 1. Typography (LOCKED)

### Font Family
- **Single font**: System UI stack (system-ui, -apple-system, Segoe UI, Roboto)
- NO role-specific fonts
- NO module-specific fonts

### Type Scale
```
Page Title:       text-2xl (24px) • font-medium
Section Header:   text-xl (20px)  • font-medium
Card Title:       text-lg (18px)  • font-medium
Subheader:        text-base (16px) • font-medium
Body Text:        text-base (16px) • font-normal
Label:            text-sm (14px)  • font-medium
Metadata:         text-xs (12px)  • text-muted-foreground
```

### Usage
```tsx
<h1 className="text-2xl font-medium">Page Title</h1>
<h2 className="text-xl font-medium">Section Header</h2>
<h3 className="text-lg font-medium">Card Title</h3>
<p className="text-base">Body text</p>
<label className="text-sm font-medium">Label</label>
<span className="text-xs text-muted-foreground">Metadata</span>
```

---

## 2. Semantic Color System (LOCKED)

Colors have **consistent meaning** across ALL roles and modules.

### Color Meanings

| Color | Meaning | Use Cases |
|-------|---------|-----------|
| **Green** | Success / Completed / Protected / On Track | Completed deliveries, protected SLAs, ready vehicles |
| **Amber** | Risk / Warning / Attention Needed | At-risk routes, pending approvals, capacity warnings |
| **Red** | Critical / Breach / Blocking | SLA breaches, failed deliveries, critical exceptions |
| **Blue** | Primary Actions / Neutral Info | Buttons, in-progress items, system information |
| **Gray** | Read-only / Disabled / Metadata | Inactive controls, timestamps, helper text |

### Implementation
```tsx
// Status badges
<StatusBadge variant="success">Completed</StatusBadge>
<StatusBadge variant="warning">At Risk</StatusBadge>
<StatusBadge variant="critical">Blocked</StatusBadge>
<StatusBadge variant="info">In Progress</StatusBadge>
<StatusBadge variant="neutral">Read Only</StatusBadge>

// Alerts
<Alert variant="success">Operation successful</Alert>
<Alert variant="warning">Attention needed</Alert>
<Alert variant="critical">Immediate action required</Alert>
<Alert variant="info">New information available</Alert>
```

### ❌ Never
- Don't use green for "risk" in one role and "success" in another
- Don't change color meanings between modules
- Don't create role-specific color palettes for UI controls

---

## 3. Layout System (STANDARDIZED)

### Desktop Layout
```
┌─────────────────────────────────────────┐
│ Sidebar (256px) │ Main Content Area      │
│                 │                        │
│ • Logo          │ • Context Bar (top)   │
│ • Role Badge    │ • Page Content        │
│ • Navigation    │ • Card Grid           │
│ • Settings      │                        │
│ • Logout        │                        │
└─────────────────────────────────────────┘
```

### Rules
- Left sidebar: Always 256px (w-64)
- Sidebar position: Never changes
- Navigation items: Show/hide based on permissions
- Context bar: Consistent placement and structure
- Card layouts: Same grid system (gap-6)
- Spacing: 8px grid system

---

## 4. Component Library

### Buttons
```tsx
import { Button } from './ui/Button';

// Primary action (blue)
<Button variant="primary">Save Changes</Button>

// Secondary action (outlined)
<Button variant="secondary">Cancel</Button>

// Destructive action (red)
<Button variant="destructive">Delete</Button>

// Ghost action (transparent)
<Button variant="ghost">View Details</Button>
```

### Cards
```tsx
import { Card, CardHeader, CardContent } from './ui/Card';

<Card variant="standard">
  <CardHeader 
    title="Fleet Status" 
    subtitle="Real-time availability"
  />
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Inputs
```tsx
import { Input, Textarea } from './ui/Input';

<Input 
  label="Email Address"
  type="email"
  error="Invalid email"
  helperText="Enter your work email"
/>

<Textarea 
  label="Notes"
  rows={4}
  helperText="Maximum 500 characters"
/>
```

### Status Badges
```tsx
import { StatusBadge } from './ui/StatusBadge';

<StatusBadge variant="success">Completed</StatusBadge>
<StatusBadge variant="warning">At Risk</StatusBadge>
<StatusBadge variant="critical">Blocked</StatusBadge>
```

### Alerts
```tsx
import { Alert } from './ui/Alert';

<Alert variant="success" title="Success">
  Operation completed successfully
</Alert>

<Alert variant="warning" title="Warning">
  Review required before proceeding
</Alert>

<Alert variant="critical" title="Critical">
  SLA breach detected
</Alert>
```

---

## 5. Interaction Patterns (STANDARDIZED)

### Button States
- **Default**: Clear visual style
- **Hover**: Subtle color shift + shadow increase
- **Active**: Pressed state with reduced shadow
- **Disabled**: 50% opacity + not-allowed cursor
- **Focus**: Blue ring (ring-blue-500)

### Form Validation
- **Valid**: Green border + checkmark icon
- **Invalid**: Red border + error message
- **Disabled**: Gray background + reduced opacity

### Loading States
- **Button**: Spinner + "Loading..." text
- **Page**: Skeleton screens or spinner
- **Card**: Pulsing placeholder

---

## 6. Role Differentiation Rules

### ✅ Roles MAY Differ By:

1. **Visible Modules** (Permissions)
   - Super Admin sees all modules
   - Fleet Supervisor sees only fleet modules
   - Driver sees only delivery execution

2. **Enabled Actions** (Authorization)
   - Operations Manager can approve escalations
   - Dispatch Manager can only request escalations
   - Read-only users see disabled buttons

3. **Data Scope** (Access Control)
   - Tenant Admin sees only their organization
   - Super Admin sees all organizations
   - Driver sees only their assigned routes

4. **Read-only vs Editable**
   - Forms may be view-only for some roles
   - Clearly labeled with "Read Only" badge

### ❌ Roles MUST NOT Differ By:

1. **Typography**
   - Same fonts everywhere
   - Same type scale
   - Same font weights for same purposes

2. **Color Meanings**
   - Green always means success
   - Red always means critical
   - Colors don't change between roles

3. **Layout Structure**
   - Sidebar always on left
   - Same card grid system
   - Same spacing system

4. **Navigation Placement**
   - Logo always top-left
   - Navigation always in sidebar
   - Settings and logout always at bottom

5. **Interaction Behavior**
   - Buttons behave the same
   - Forms validate the same way
   - Modals work the same

---

## 7. Mobile (Driver App)

### Alignment with Desktop
- **Same semantic colors**: Green = success, Red = critical
- **Same typography family**: System UI stack
- **Same interaction patterns**: Button states, validation
- **Adapted layout**: Bottom navigation instead of sidebar
- **Same components**: Reuse Button, StatusBadge, Alert, etc.

### Mobile-Specific
- Bottom tab navigation (not sidebar)
- Touch-optimized targets (44px minimum)
- Swipe gestures for actions
- Mobile-first card layouts

---

## 8. Design Tokens Reference

### Import
```tsx
import { DesignTokens } from './DesignSystemTokens';
```

### Usage
```tsx
// Typography
className={DesignTokens.typography.pageTitle}
className={DesignTokens.typography.cardTitle}

// Buttons
className={DesignTokens.buttons.primary}
className={DesignTokens.buttons.secondary}

// Status badges
className={DesignTokens.badges.success}
className={DesignTokens.badges.warning}

// Cards
className={DesignTokens.cards.standard}
```

---

## 9. Implementation Checklist

When creating or updating a component:

- [ ] Uses system font family
- [ ] Uses standardized type scale
- [ ] Uses semantic colors correctly
- [ ] Follows 8px spacing grid
- [ ] Uses standard button variants
- [ ] Status colors are semantic (not decorative)
- [ ] Works consistently across all roles
- [ ] Disabled states are clearly visible
- [ ] Focus states have blue ring
- [ ] Loading states are indicated
- [ ] Error states use red + validation
- [ ] Read-only states are labeled

---

## 10. File Structure

```
/styles/
  globals.css              # Global design tokens and base styles

/components/
  DesignSystemTokens.tsx   # Token reference and type definitions
  DesignSystemShowcase.tsx # Visual showcase of all components
  
  /ui/
    Button.tsx             # Standard button component
    StatusBadge.tsx        # Semantic status badges
    Card.tsx               # Card layouts
    Input.tsx              # Form inputs
    Alert.tsx              # Alert messages

  OptiMileLogo.tsx         # Global logo component
  
  /role-specific/
    NavigationSidebar.tsx          # Dispatch Manager
    OperationsManagerSidebar.tsx   # Operations Manager
    FleetSupervisorSidebar.tsx     # Fleet Supervisor
    TenantAdminSidebar.tsx         # Tenant Admin
    SuperAdminSidebar.tsx          # Super Admin
```

---

## Final Check

After implementing this system:

✅ A user switching from Dispatch Manager to Operations Manager should feel like they're in the same product with different responsibilities

✅ No screen should visually imply a separate application

✅ Colors have the same meaning everywhere

✅ Typography is identical across all roles

✅ Layout structure is predictable and consistent

✅ Interaction patterns work the same way

---

## Support

For questions about the design system:
1. Review `/components/DesignSystemShowcase.tsx` for visual examples
2. Check `/components/DesignSystemTokens.tsx` for token reference
3. Refer to this documentation for standards

**Remember**: Same system, different responsibility. 🎯
