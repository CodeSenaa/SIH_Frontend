# Implementation Specification: AI-Powered Criminal Network & Intelligence Analysis Platform (NATINT)

> **Document Type:** System Architecture & Frontend Build Specification  
> **Standard:** UX4G-Inspired Design System (Internal Law Enforcement Adaptation)  
> **Theme:** Light Theme (High Contrast, Evidentiary Control Room Grade)  
> **Accessibility Target:** WCAG 2.1 AA Compliant (4.5:1 Min Contrast, Keyboard Operable, Dual Visual/Tabular Views)

---

## 1. Executive Summary & Design Rationale

The platform is an **internal government investigator-assistance system** engineered to convert fragmented multi-source crime and intelligence records (Call Detail Records [CDR], IPDR logs, Hawala banking transactions, surveillance intercepts, vehicle tracking, informant reports) into a unified, traversable **Entity Graph**, **Temporal Timeline**, and automated **Risk Signals**.

Unlike citizen-facing public portals, this platform adopts an **official, authoritative evidentiary aesthetic**:
- **Light-Theme First:** Clean, low-fatigue, high-readability daylight and office environment palette.
- **Deep Navy/Indigo Primary (`#1B2A4A`–`#2B3A67`):** Signals authority, control-room discipline, and trust.
- **Tabular Numerals (`font-variant-numeric: tabular-nums`):** Ensures precise alignment for timestamps, case identifiers, Aadhaar/PAN hashes, phone numbers, and coordinate data.
- **Non-Visual Alternatives:** Mandates synchronized, filterable data tables alongside all interactive graph/canvas visualizations to fulfill WCAG 2.1 AA requirements.

---

## 2. Design Tokens (`src/styles/tokens.css`)

All components trace back to the following CSS custom properties based on a base-4 grid:

### 2.1 Color Palette (Light Theme Focus)

| Token Group | CSS Variable | Value | Description & Purpose |
|---|---|---|---|
| **Primary Navy** | `--color-primary-900` | `#0E1726` | Deepest navy for text headings and masthead text |
| | `--color-primary-800` | `#1B2A4A` | Base primary (Top bar, active states, key CTAs) |
| | `--color-primary-700` | `#2B3A67` | Hover states, secondary action buttons |
| | `--color-primary-100` | `#EEF2F9` | Subtly tinted badges, selected row highlights |
| **Accent Gold/Amber** | `--color-accent-600` | `#B45309` | Warning / Attention icon & active indicator |
| | `--color-accent-500` | `#D97706` | Pending verification, needs supervisor review |
| | `--color-accent-100` | `#FEF3C7` | Accent pill backgrounds |
| **Risk Semantics (4-Tier)** | `--risk-low` / `--risk-low-bg` | `#15803D` / `#DCFCE7` | Low probability / Routine entity or lead |
| | `--risk-med` / `--risk-med-bg` | `#B45309` / `#FEF3C7` | Suspicious pattern / Elevated attention |
| | `--risk-high` / `--risk-high-bg` | `#C2410C` / `#FFEDD5` | Direct link to known criminal syndicate |
| | `--risk-crit` / `--risk-crit-bg` | `#B91C1C` / `#FEE2E2` | Active flight risk, imminent violence, terror lead |
| **Neutrals & Surfaces** | `--surface-canvas` | `#F8FAFC` | Main application background (Slate-50) |
| | `--surface-card` | `#FFFFFF` | Card & panel background (Pure white) |
| | `--surface-subtle` | `#F1F5F9` | Table striping, inactive tabs, sidebars |
| | `--border-subtle` | `#E2E8F0` | Card borders, dividers, gridlines |
| | `--border-strong` | `#CBD5E1` | Input outlines, active table headers |
| | `--text-primary` | `#0F172A` | Body & primary copy (14.2:1 contrast against white) |
| | `--text-secondary` | `#475569` | Labels, meta descriptions (7.0:1 contrast) |
| | `--text-tertiary` | `#64748B` | Timestamps, deactivated hints, captions |

### 2.2 Typography & Tabular Layout
- **Font Family:** Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif.
- **Tabular Figures:** `font-variant-numeric: tabular-nums;` applied across all identifiers, timestamps, metrics, and data tables.
- **Type Scale:**
  - Display: `1.75rem` (28px) / Line height: 1.25 / Bold 700
  - H1 / Page Header: `1.5rem` (24px) / Semi-bold 600
  - H2 / Section Header: `1.25rem` (20px) / Semi-bold 600
  - H3 / Card Title: `1.0rem` (16px) / Medium 500
  - Body: `0.875rem` (14px) / Regular 400
  - Caption / Badge: `0.75rem` (12px) / Medium 500 / Letter spacing: +0.02em

### 2.3 Spacing Scale (Base-4 Grid)
- `--space-1`: 4px
- `--space-2`: 8px
- `--space-3`: 12px
- `--space-4`: 16px
- `--space-6`: 24px
- `--space-8`: 32px
- `--space-12`: 48px
- `--space-16`: 64px

### 2.4 Elevation & Radii
- `--radius-sm`: 4px (inputs, badges, chips)
- `--radius-md`: 6px (cards, dropdowns, buttons)
- `--radius-lg`: 8px (modals, slide-over panels)
- `--elevation-card`: `0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)`
- `--elevation-overlay`: `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)`
- `--focus-ring`: `2px solid #2563EB` with `outline-offset: 2px`

---

## 3. Global Layout Architecture

```
+-----------------------------------------------------------------------------------------+
| [RESTRICTED // FOR AUTHORIZED LAW ENFORCEMENT & INTELLIGENCE PERSONNEL ONLY (FOUO)]      |
+-----------------------------------------------------------------------------------------+
| [Emblem] NATINT Platform | [Case Switcher: Op Phantom] | [Search Ctrl+K] | A-/A/A+ | Profile |
+---------+-------------------------------------------------------------------------------+
| Sidebar | Breadcrumb: Home > Operations > Operation Phantom Ledger > Entity Graph       |
| (Icons  +-------------------------------------------------------------------------------+
|  +      |                                                                               |
| Labels) |                               Main Viewport                                   |
|         |                                                                               |
|         |  (Dashboard / Graph Explorer / Timeline / Case Workspace / Ingest / Admin)    |
|         |                                                                               |
+---------+-------------------------------------------------------------------------------+
```

1. **Persistent Classification Banner:** Non-dismissible top bar styled in high-visibility warning navy/gold or subdued security charcoal declaring document sensitivity and legal jurisdiction.
2. **Masthead & Top Bar (< 56px height):**
   - **Left:** National intelligence emblem + system title ("NATINT Intelligence Studio").
   - **Center-Left:** Case/Workspace Switcher dropdown allowing instant switching between active operations (e.g., *Operation Phantom Ledger*, *Operation Falcon Horizon*).
   - **Center:** Global Search-Everything input with visible keyboard shortcut badge (`Ctrl+K`).
   - **Right:** 
     - UX4G Accessibility font scaler widget (`A-`, `A`, `A+`).
     - Real-time Session Countdown with live timer (`09:42 remaining`) and extend session trigger.
     - Officer Profile badge (Badge ID, Clearance Level e.g., `Level-4 Secret`).
     - Quick Lock / Logout button.
3. **Collapsible Left Sidebar:**
   - 9 module entries with accessible SVG iconography, active state highlighting, and keyboard navigation.
4. **Context Breadcrumb Row:**
   - Persistent path orientation displaying active hierarchy and parent case reference.
5. **Accessible Skip Link:**
   - Hidden `#skip-to-content` link that becomes visible on initial Tab press, jumping focus directly to the main workspace.

---

## 4. Officer Identity & Access Management Flow

Adapted from UX4G's `/patterns/identity-access` for high-security investigative operations:

```
[ Step 1: Officer Authentication ]
       |-- Officer Badge / Service ID
       |-- Classified Passcode
       V
[ Step 2: Mandatory 2FA OTP ]
       |-- 6-digit individual inputs with auto-advance & paste support
       |-- aria-live 60-second resend countdown
       |-- Silent failure logging to Audit Ledger (anti-enumeration)
       V
[ Step 3: Shift Clearance & Session Active ]
       |-- 15-minute inactivity warning
       |-- Modal countdown alert with "Extend Shift" option
       |-- Immediate session wipe upon timeout
```

- **No Self-Service Registration:** Accounts are strictly provisioned by Department Administrators.
- **Silent Failure Logging:** Auth failures never reveal if an Officer ID exists; all failures are recorded silently in the immutable audit log.
- **Supervisor Escalation:** Exceeding 3 failed OTP attempts locks the terminal and alerts the Duty Supervisor.

---

## 5. Core Screens & Functional Breakdown

### Screen 1: Executive Dashboard
- **KPI Metrics:** 
  - Active Case Operations (e.g., `14 Ongoing`)
  - Critical-Risk Suspects Flagged (e.g., `8 High Priority`)
  - Signal Intercepts Ingested Today (e.g., `1,429 Leads`)
  - Pending Evidence Reviews (e.g., `6 Unassigned`)
- **Live Risk Signal Feed:** Continuous stream of real-time intelligence hits with risk badges, source confidence percentages, and 1-click triage actions.
- **Syndicate Overview:** Summary cards showing key criminal networks, active nodes, and geographical dispersion.
- **Recent POI Activity:** Fast access list showing recently intercepted calls, geo-fencing breaches, and suspicious Hawala transactions.

---

### Screen 2: Entity Graph Explorer (Flagship Centerpiece)
- **Interactive Force-Directed / Hierarchical Canvas:**
  - **Node Types:** 
    - 👤 Persons of Interest (Kingpin, Hawala Broker, Mule, Enforcer)
    - 🏢 Front Companies & Shell Corporations
    - 📱 Mobile Burner Phones & IMEI Intercepts
    - 🚗 Suspect Vehicles (License Plate / VIN)
    - 📍 Safehouses & Geolocations
    - 💳 Cryptocurrency Wallets & Bank Accounts
  - **Edge Semantics:**
    - Labeled relationships (e.g., `Hawala Transfer ₹1.8Cr`, `Frequent Calls (48x)`, `Registered Owner`, `Co-Conspirator`).
    - Visual indicators for edge confidence (60% to 99%) and financial flow direction.
- **Graph Controls:**
  - Zoom in / Zoom out / Fit to screen.
  - Entity type filters (toggle POIs, phones, companies, vehicles).
  - Risk threshold slider (filter out low-risk peripheral nodes).
  - Node search and highlight.
- **Link Analysis / Shortest Path Tool:**
  - Select any two suspects (e.g., *R. K. Singhania* and *Vikramaditya Rao*) to immediately calculate and highlight the shortest intermediary chain of shell accounts and burner phones.
- **Node Dossier Side Panel:**
  - Full suspect profile, mugshot/avatar, aliases, known warrants, linked phone numbers, biometric verification status, and attached case evidence.
- **WCAG-Mandated Non-Visual Alternative (`AccessibleGraphTable.jsx`):**
  - Instant toggle between Canvas View and a **fully sortable, filterable Data Table**.
  - Lists all nodes, roles, risk levels, and connected edges with full keyboard navigation and screen-reader announcements.

---

### Screen 3: Temporal Timeline View
- **Chronological Event Stream:** Visual horizontal timeline detailing critical case milestones (wiretap recordings, border crossings, cash deposits, encrypted chat logs, raids).
- **Filtering & Zoom:** Filter events by suspect entity, event type, date range, and intelligence confidence score.
- **Accessible List Fallback:** Structured vertical list view with semantic headings and tabular timestamps for keyboard and screen-reader users.

---

### Screen 4: Case Workspace Dossier
- **Header:** Case Code (`#CR-2026-0882: Operation Phantom Ledger`), Status badge, Classification level, Lead Investigator.
- **Tabbed Workspace:**
  - **Overview & Intelligence Summary:** Case background, criminal conspiracy hypotheses, operational objectives.
  - **Evidence Locker:** Catalog of attached files (audio intercepts, CDR spreadsheets, bank statements, surveillance stills) with checksum verification.
  - **Chain of Custody:** Time-stamped custody log showing officer handover, storage location, and evidentiary seal numbers.
  - **Investigator Notes & Hypotheses:** Collaborative notes editor with timestamped officer signatures.

---

### Screen 5: Search & Data Ingestion Engine
- **Faceted Multi-Vector Search:**
  - Search by Name, Alias, Phone Number / IMEI, Aadhaar Hash, Vehicle Plate, Bank IFSC/Account, or Crypto Address.
  - Real-time search suggestions and matching entity previews.
- **Data Ingestion & Extraction Tool:**
  - Drag-and-drop file upload zone for incoming raw feeds (Telecom CDR CSV, Bank Transaction Excel, IPDR logs).
  - Visual parsing progress bar with schema validation checks.
  - "Ingest to Knowledge Graph" trigger that automatically extracts entities and establishes graph edges.

---

### Screen 6: Alerts & Risk Signals Queue
- **Prioritized Queue:** Grouped by severity (Critical, High, Medium, Low).
- **Signal Metadata:** Trigger rule (e.g., `Simultaneous SIM activation in border zone`, `Unusual transaction > ₹50L to shell account`), timestamp, entity involved, confidence score.
- **Interactive Triage Workflow:** Action buttons to *Acknowledge*, *Assign to Investigator*, *Attach to Case*, or *Dismiss with Justification*.

---

### Screen 7: Evidentiary Case Reports
- **Official Report Generator:** Compiles case summaries, entity dossiers, and timeline exhibits into an export-ready dossier.
- **Redaction Controls:**
  - Toggle: *Mask Confidential Informant Identities*
  - Toggle: *Redact National ID / Aadhaar Numbers*
  - Toggle: *Suppress Raw Surveillance Intercept Transcripts*
- **Official Print / PDF Preview:** Includes official Government emblem, document barcode, cryptographic digital seal, and non-disclosure warning.

---

### Screen 8: Immutable Audit Log
- **Compliance & Chain of Custody Ledger:** Read-only, tamper-evident log capturing all system interactions.
- **Fields:** Tabular Timestamp (UTC+05:30), Officer Badge ID, Action Category (`VIEW_DOSSIER`, `EXPORT_REPORT`, `GRAPH_QUERY`, `FAILED_MFA`), Target Entity/Case, Terminal IP, and SHA-256 integrity hash.
- **Faceted Audit Filtering:** Search by officer, date range, or action type.

---

### Screen 9: Administration & Role Provisioning
- **Role-Based Access Control (RBAC):**
  - Investigator (Read/Write assigned cases)
  - Lead Analyst (Create cases, link intelligence, run link analysis)
  - Supervisor (Approve reports, view audit logs, assign alerts)
  - System Administrator (Account provisioning, policy configuration)
- **Account Provisioning Form:** Provision new officer accounts with Badge ID, designated clearance level, and department.
- **Data Retention & Security Policies:** Configuration of classified data archival and audit log preservation intervals.

---

## 6. UX4G Component Inventory (5 Standard Buckets)

| UX4G Category | Components Implemented |
|---|---|
| **Form** | Faceted Search Bar, Entity Multi-Select Filter, Date Range Picker, Confidence Slider, Redaction Switch Toggles, Ingestion File Upload Dropzone with validation states. |
| **Feedback** | Toast Notifications, Destructive Action Confirmation Modals, Progress Bar for Ingestion Parsing, Session Timeout Warning Alert, Empty States with action triggers. |
| **Data Display** | 4-Tier Risk Score Badges (Color + Text + Icon), Entity Type Chips, Stat Metric Cards with sparklines, Tabular Data Tables (sortable, paginated), Event Timeline Cards, Relationship Badges. |
| **Navigation** | Top Bar, Collapsible Module Sidebar, Case/Workspace Switcher, Breadcrumb Row, Sub-View Tabs (Graph vs Table, Overview vs Evidence), Pagination Controls. |
| **Utility** | `A- / A / A+` Font Size Scaler Widget, Tab ⇥ Keyboard Focus Indicator Ring, Real-time Session Countdown Clock, Cryptographic Hash Validator. |

---

## 7. Operational & Accessibility Checklist (WCAG 2.1 AA)

- [x] **4.5:1 Minimum Contrast:** Primary text (`#0F172A`) against canvas (`#FFFFFF` / `#F8FAFC`) exceeds 14:1. Secondary text (`#475569`) exceeds 7:1.
- [x] **Never Color Alone:** Every risk badge is composed of a distinctive text label (`CRITICAL`, `HIGH`, `MED`, `LOW`) and a distinct SVG icon (Alert Octagon, Alert Triangle, Info Circle, Shield Check).
- [x] **Keyboard Path & Focus Indicator:** Every button, input, tab, and card has an explicit `:focus-visible` ring (`2px solid #2563EB`, `outline-offset: 2px`).
- [x] **Tabular Numerals:** All IDs, dates, timestamps, coordinates, and monetary amounts enforce `font-variant-numeric: tabular-nums`.
- [x] **Accessible Non-Visual Alternative:** The Entity Graph Explorer and Timeline modules provide synchronized data table fallbacks.
- [x] **Screen-Reader Announcements:** OTP countdowns, search result counts, and ingestion status alerts utilize `aria-live="polite"` regions.

---

## 8. Build & Execution Order

1. **Step 1: Tokens & Styling System** — Define `src/styles/tokens.css` and configure global resets in `src/styles/index.css`.
2. **Step 2: Mock Intelligence Dataset** — Create `src/data/mockData.js` with interconnected entities, cases, timeline events, alerts, and audit records.
3. **Step 3: Common UI Foundations** — Build `RiskBadge`, `EntityBadge`, `DataTable`, `Modal`, `Toast`, and `TextResizeWidget`.
4. **Step 4: Layout Shell** — Build `ClassificationBanner`, `TopBar`, `Sidebar`, `Breadcrumb`, and `SkipToContent`.
5. **Step 5: Identity & Access Flow** — Implement `OfficerAuthModal` with 2FA OTP and `SessionTimeoutModal`.
6. **Step 6: Flagship Graph Explorer** — Construct `NetworkCanvas`, `EntityDossierPanel`, `ShortestPathModal`, and `AccessibleGraphTable`.
7. **Step 7: Temporal Timeline** — Construct visual timeline and list fallback.
8. **Step 8: Remaining Views** — Assemble Dashboard, Case Workspace, Search & Ingestion, Alerts, Reports, Audit Log, and Admin Console.
9. **Step 9: App Integration & Verification** — Wire all views in `App.jsx`, execute `npm run build` and `npm run lint`, and verify all accessibility requirements.
