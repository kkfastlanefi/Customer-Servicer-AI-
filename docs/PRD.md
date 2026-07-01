
# PRD: Customer Inquiry Agent Dashboard

## 1. Overview

The Customer Inquiry Agent Dashboard is an MVP tool that helps customer service representatives manage customer inquiries uploaded through a CSV file.

The dashboard uses two agents:

- **Agent 1: Service Triage Router Penny** — classifies and routes inquiries.
- **Agent 2: Customer Response Drafter** — drafts pre-research and post-research customer responses.

The dashboard gives representatives one place to see each inquiry’s status, required next action, draft progress, and research state.

## 2. Problem

Customer service representatives need a clear way to track inquiries as they move through triage, drafting, research, and final response.

Without a dashboard, reps may lose visibility into:

- Which inquiries have been classified
- Which inquiries need a pre-research response
- Which inquiries are waiting for research
- Which inquiries have research completed
- Which post-research drafts are ready
- Which inquiries are closed or still need action

## 3. Goals

The MVP should allow representatives to:

- Upload a CSV of customer inquiries
- Run Agent 1 classification
- View classification, routing, priority, SLA, sentiment, risk, and research need
- Generate a pre-research draft using Agent 2
- Review and edit the pre-research draft
- Add research notes
- Generate a post-research draft using Agent 2
- Review and edit the post-research draft
- Track inquiry status from upload to closure
- Filter inquiries by key work queue fields

## 4. MVP Scope

### In Scope

- CSV upload
- Agent 1 inquiry classification
- Agent 2 pre-research response drafting
- Research note entry
- Agent 2 post-research response drafting
- Status tracking
- Dashboard filtering
- Human review before any response is sent

### Out of Scope

- Direct customer email sending
- Real customer PII
- Loan ID or account number
- Authentication
- Role-based access
- Manager approval workflow
- Audit logging
- Servicing system integration
- Production database design

## 5. Input CSV

The uploaded CSV contains:

| Field | Description |
|---|---|
| INQUIRY_ID | Unique inquiry ID |
| RECEIVED_DATE | Date inquiry was received |
| CHANNEL | Email, Portal, Phone Note, etc. |
| BORROWER_MASKED | Masked borrower display |
| RAW_MESSAGE | Original customer message |
| CURRENT_STATUS | Current workflow status |

The default status at upload is: `UPLOADED`.

## 6. Agent Responsibilities

### Agent 1: Service Triage Router Penny

Agent 1 classifies and triages each inquiry.

Agent 1 is responsible for:

- Classification
- Sub-classification
- Assigned team or queue
- Priority
- SLA category and due date
- Customer sentiment
- Compliance risk
- Research need
- Missing information
- Recommended next action
- Human review flag

Agent 1 does **not** draft customer-facing responses.

### Agent 2: Customer Response Drafter

Agent 2 drafts customer-facing responses in two stages:

1. **PRE_RESEARCH** — drafts the initial customer response after Agent 1 classification.
2. **POST_RESEARCH** — drafts the follow-up or final response after the representative adds research notes.

Agent 2 does **not** send responses automatically. The representative must review and approve drafts.

## 7. Dashboard Requirements

The dashboard should provide:

- A main table with one row per inquiry
- Status tracking across the inquiry lifecycle
- Filters for common work queues
- An inquiry detail page
- Editable pre-research and post-research drafts
- A research notes section
- Clear actions for review, send, research, and closure

Detailed workflow requirements are documented in `docs/workflow.md`.

Detailed UI notes are documented in `ui/dashboard_wireframe_notes.md`.

## 8. Success Criteria

The MVP is successful if:

- Representatives can upload a CSV and view all inquiries in one dashboard
- Agent 1 outputs are visible and useful for triage
- Agent 2 can generate both pre-research and post-research drafts
- Representatives can clearly see what action is needed next
- Representatives can avoid working on already-completed inquiries
- The workflow is clear enough for future technical implementation

## 9. Open Questions

- What classification categories should Agent 1 use?
- What teams or queues should Agent 1 route to?
- What SLA rules should apply?
- Which inquiry types require human or compliance review?
- What research fields are required before post-research drafting?
- Should pre-research drafts be optional for simple informational inquiries?
