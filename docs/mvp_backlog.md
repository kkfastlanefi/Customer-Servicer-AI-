# MVP Backlog: Customer Inquiry Agent Dashboard

## Overview

This backlog lists the work needed to turn the documented workflow into an MVP dashboard.

The MVP should support CSV upload, Agent 1 classification, Agent 2 pre-research drafting, research notes, Agent 2 post-research drafting, status tracking, and dashboard filtering.

## Epic 1: CSV Upload and Intake

### 1. Build CSV Upload Flow

**Description:**  
Allow the representative to upload a CSV file of customer inquiries.

**Acceptance Criteria:**

- User can upload a CSV file.
- System accepts the required columns.
- Uploaded rows appear in the dashboard.
- Each row starts with `CURRENT_STATUS = UPLOADED`.

### 2. Validate CSV Format

**Description:**  
Check that the uploaded CSV contains the required fields.

**Required Fields:**

- INQUIRY_ID
- RECEIVED_DATE
- CHANNEL
- BORROWER_MASKED
- RAW_MESSAGE
- CURRENT_STATUS

**Acceptance Criteria:**

- Missing required fields trigger an error message.
- Invalid files are not processed.
- Valid files are accepted.

## Epic 2: Agent 1 Classification

### 3. Run Agent 1 Classification

**Description:**  
Send each uploaded inquiry to Agent 1 for triage and classification.

**Acceptance Criteria:**

- Agent 1 receives inquiry details from the CSV.
- Agent 1 returns structured output.
- Output follows `schemas/agent_1_output_schema.json`.

### 4. Display Agent 1 Output

**Description:**  
Show Agent 1 results in the dashboard and inquiry detail page.

**Acceptance Criteria:**

- Dashboard displays classification, assigned team, priority, SLA, sentiment, compliance risk, research need, and human review flag.
- Inquiry detail page displays full Agent 1 output.
- Status updates to `CLASSIFIED_BY_AGENT_1`.

## Epic 3: Agent 2 Pre-Research Draft

### 5. Generate Pre-Research Draft

**Description:**  
Use Agent 2 to create the initial customer-facing response after Agent 1 classification.

**Acceptance Criteria:**

- Agent 2 runs in `PRE_RESEARCH` mode.
- Agent 2 uses original inquiry and Agent 1 output.
- Output follows `schemas/agent_2_output_schema.json`.
- Status updates to `PRE_RESEARCH_DRAFT_READY`.

### 6. Review and Edit Pre-Research Draft

**Description:**  
Allow the representative to review and edit the pre-research draft.

**Acceptance Criteria:**

- Representative can view the draft.
- Representative can edit the draft.
- Representative can mark draft as reviewed.
- Representative can mark draft as sent.
- Status updates to `PRE_RESEARCH_DRAFT_REVIEWED` or `PRE_RESEARCH_DRAFT_SENT`.

## Epic 4: Research Notes

### 7. Add Research Notes Section

**Description:**  
Allow the representative to enter research findings after the pre-research draft is sent.

**Research Fields:**

- RESEARCH_SUMMARY
- INTERNAL_FINDINGS
- RESOLUTION_DECISION
- APPROVED_ACTION
- REMAINING_QUESTIONS
- REPRESENTATIVE_NOTES

**Acceptance Criteria:**

- Representative can enter and save research notes.
- Status updates to `RESEARCH_ADDED`.
- Representative can mark inquiry as `NEEDS_MORE_RESEARCH`.

## Epic 5: Agent 2 Post-Research Draft

### 8. Generate Post-Research Draft

**Description:**  
Use Agent 2 to create the post-research customer-facing response.

**Acceptance Criteria:**

- Agent 2 runs in `POST_RESEARCH` mode.
- Agent 2 uses original inquiry, Agent 1 output, pre-research draft, and research notes.
- Agent 2 does not invent facts beyond the research notes.
- Status updates to `POST_RESEARCH_DRAFT_READY`.

### 9. Review and Edit Post-Research Draft

**Description:**  
Allow the representative to review and edit the post-research draft.

**Acceptance Criteria:**

- Representative can view the post-research draft.
- Representative can edit the draft.
- Representative can mark draft as reviewed.
- Representative can mark draft as sent.
- Representative can mark inquiry as closed.
- Status updates to `POST_RESEARCH_DRAFT_REVIEWED`, `POST_RESEARCH_DRAFT_SENT`, or `CLOSED`.

## Epic 6: Dashboard and Filtering

### 10. Build Main Dashboard Table

**Description:**  
Create a dashboard table with one row per inquiry.

**Recommended Columns:**

- INQUIRY_ID
- RECEIVED_DATE
- CHANNEL
- BORROWER_MASKED
- CLASSIFICATION
- ASSIGNED_TEAM
- PRIORITY
- SLA_DUE_DATE
- CUSTOMER_SENTIMENT
- COMPLIANCE_RISK
- RESEARCH_NEEDED
- CURRENT_STATUS
- NEEDS_HUMAN_REVIEW

**Acceptance Criteria:**

- Each inquiry appears as one row.
- Status is visible.
- Key Agent 1 outputs are visible.
- Reps can identify what needs action.

### 11. Add Dashboard Filters

**Description:**  
Allow reps to filter inquiries by key fields.

**Filters:**

- CURRENT_STATUS
- ASSIGNED_TEAM
- CLASSIFICATION
- PRIORITY
- SLA_DUE_DATE
- CUSTOMER_SENTIMENT
- COMPLIANCE_RISK
- RESEARCH_NEEDED
- CHANNEL

**Acceptance Criteria:**

- Filters work on the main dashboard.
- Reps can quickly find active, pending, review-needed, and closed inquiries.

### 12. Create Saved Views

**Description:**  
Add common work queue views.

**Saved Views:**

- All Uploaded Inquiries
- Classified by Agent 1
- Pre-Research Draft Ready
- Waiting for Research
- Research Added
- Post-Research Draft Ready
- Needs Review
- Needs More Research
- Closed

**Acceptance Criteria:**

- Reps can switch between common views.
- Views help reps avoid duplicate work.

## Epic 7: Inquiry Detail Page

### 13. Build Inquiry Detail Page

**Description:**  
Create a detail page for each inquiry.

**Sections:**

- Original Inquiry
- Agent 1 Output
- Agent 2 Pre-Research Draft
- Research Notes
- Agent 2 Post-Research Draft
- Status Actions

**Acceptance Criteria:**

- Reps can view the full inquiry workflow in one place.
- Reps can review drafts and research notes.
- Reps can update inquiry status.

## Epic 8: Status Management

### 14. Add Status Transition Logic

**Description:**  
Support the inquiry lifecycle statuses defined in `docs/workflow.md`.

**Statuses:**

- UPLOADED
- CLASSIFIED_BY_AGENT_1
- PRE_RESEARCH_DRAFT_READY
- PRE_RESEARCH_DRAFT_REVIEWED
- PRE_RESEARCH_DRAFT_SENT
- WAITING_FOR_RESEARCH
- RESEARCH_ADDED
- POST_RESEARCH_DRAFT_READY
- POST_RESEARCH_DRAFT_REVIEWED
- POST_RESEARCH_DRAFT_SENT
- CLOSED
- NEEDS_REVIEW
- NEEDS_MORE_RESEARCH

**Acceptance Criteria:**

- Each inquiry has one current status.
- Status changes reflect the workflow.
- Closed inquiries are separated from active work.

## Epic 9: Demo Readiness

### 15. Create Demo Flow Using Sample Data

**Description:**  
Prepare a simple demo using `sample_data/sample_inquiries.csv`.

**Acceptance Criteria:**

- Demo shows CSV upload.
- Demo shows Agent 1 classification.
- Demo shows Agent 2 pre-research draft.
- Demo shows research note entry.
- Demo shows Agent 2 post-research draft.
- Demo shows inquiry closure.

## Priority Recommendation

### Must Have

- CSV upload
- Agent 1 classification
- Agent 2 pre-research draft
- Research notes
- Agent 2 post-research draft
- Status tracking
- Main dashboard table
- Inquiry detail page

### Should Have

- Filters
- Saved views
- Needs review status
- Needs more research status

### Could Have

- SLA due soon view
- Summary cards
- Export results
- Basic analytics

### Out of Scope for MVP

- Direct email sending
- Real customer PII
- Loan ID
- Account number
- Authentication
- Role-based permissions
- Audit logging
- Servicing system integration
