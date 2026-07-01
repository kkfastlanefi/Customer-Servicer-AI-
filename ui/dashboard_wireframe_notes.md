
# Dashboard Wireframe Notes

## Dashboard Purpose

The dashboard helps customer service representatives manage uploaded customer inquiries from classification through pre-research response, research, post-research response, and closure.

The dashboard should help representatives quickly answer:

- What inquiries were uploaded?
- What did Agent 1 classify?
- Which inquiries need review?
- Which pre-research drafts are ready?
- Which inquiries are waiting for research?
- Which post-research drafts are ready?
- Which inquiries are closed?

## Main Dashboard Table

The main dashboard should show one row per inquiry.

Recommended columns:

- INQUIRY_ID
- RECEIVED_DATE
- CHANNEL
- BORROWER_MASKED
- CLASSIFICATION
- SUB_CLASSIFICATION
- ASSIGNED_TEAM
- PRIORITY
- SLA_DUE_DATE
- CUSTOMER_SENTIMENT
- COMPLIANCE_RISK
- RESEARCH_NEEDED
- CURRENT_STATUS
- RECOMMENDED_NEXT_ACTION
- NEEDS_HUMAN_REVIEW

## Dashboard Filters

Representatives should be able to filter by:

- CURRENT_STATUS
- ASSIGNED_TEAM
- CLASSIFICATION
- SUB_CLASSIFICATION
- PRIORITY
- SLA_DUE_DATE
- CUSTOMER_SENTIMENT
- COMPLIANCE_RISK
- RESEARCH_NEEDED
- NEEDS_HUMAN_REVIEW
- CHANNEL

## Recommended Saved Views

The dashboard should include saved views for common work queues:

### All Uploaded Inquiries

Shows every inquiry uploaded from the CSV.

### Classified by Agent 1

Shows inquiries that have been classified and routed by Agent 1.

### Pre-Research Draft Ready

Shows inquiries where Agent 2 has drafted the first customer-facing response.

### Waiting for Research

Shows inquiries where the pre-research draft has been sent and the representative or internal team still needs to complete research.

### Research Added

Shows inquiries where research notes have been added and Agent 2 can now draft the post-research response.

### Post-Research Draft Ready

Shows inquiries where Agent 2 has drafted the post-research response and the representative needs to review it.

### Needs Review

Shows inquiries flagged for human, manager, or compliance review.

### Needs More Research

Shows inquiries where the available research is not enough to draft a final response.

### Closed

Shows inquiries that have completed the workflow.

## Inquiry Detail Page

When a representative clicks an inquiry row, the detail page should show the full case workflow.

## Section 1: Original Inquiry

Display the uploaded inquiry information:

- INQUIRY_ID
- RECEIVED_DATE
- CHANNEL
- BORROWER_MASKED
- RAW_MESSAGE
- CURRENT_STATUS

## Section 2: Agent 1 Classification Output

Display Agent 1 / Penny output:

- CLASSIFICATION
- SUB_CLASSIFICATION
- ASSIGNED_TEAM
- PRIORITY
- SLA_CATEGORY
- SLA_DUE_DATE
- CUSTOMER_SENTIMENT
- COMPLIANCE_RISK
- RESEARCH_NEEDED
- MISSING_INFORMATION
- RECOMMENDED_NEXT_ACTION
- CONFIDENCE_SCORE
- NEEDS_HUMAN_REVIEW

Recommended actions in this section:

- Mark as needs review
- Accept classification
- Continue to pre-research draft

## Section 3: Agent 2 Pre-Research Draft

Display Agent 2 output when RESPONSE_STAGE is PRE_RESEARCH:

- CUSTOMER_RESPONSE_DRAFT
- SUMMARY_OF_RESPONSE
- INFORMATION_USED
- REMAINING_OPEN_QUESTIONS
- COMPLIANCE_RISK
- RECOMMENDED_STATUS
- REVIEW_NOTES

Representative actions:

- Edit pre-research draft
- Mark pre-research draft as reviewed
- Mark pre-research draft as sent
- Mark as needs review

After the pre-research draft is sent, the status should become:

PRE_RESEARCH_DRAFT_SENT

Then the inquiry should move to:

WAITING_FOR_RESEARCH

## Section 4: Research Notes

This section allows the representative to enter research findings after reviewing the inquiry.

Recommended fields:

- RESEARCH_SUMMARY
- INTERNAL_FINDINGS
- RESOLUTION_DECISION
- APPROVED_ACTION
- REMAINING_QUESTIONS
- REPRESENTATIVE_NOTES

Representative actions:

- Save research notes
- Mark research as added
- Mark as needs more research
- Continue to post-research draft

After research notes are saved, the status should become:

RESEARCH_ADDED

## Section 5: Agent 2 Post-Research Draft

Display Agent 2 output when RESPONSE_STAGE is POST_RESEARCH:

- CUSTOMER_RESPONSE_DRAFT
- SUMMARY_OF_RESPONSE
- INFORMATION_USED
- REMAINING_OPEN_QUESTIONS
- COMPLIANCE_RISK
- RECOMMENDED_STATUS
- REVIEW_NOTES

Representative actions:

- Edit post-research draft
- Mark post-research draft as reviewed
- Mark post-research draft as sent
- Mark as needs review
- Mark as needs more research
- Mark as closed

After the post-research draft is sent, the status should become:

POST_RESEARCH_DRAFT_SENT

After the inquiry is complete, the status should become:

CLOSED

## Status Labels

Use the following statuses:

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

## Key Buttons / Actions

Recommended buttons for the MVP:

- Upload CSV
- Run Agent 1 Classification
- Generate Pre-Research Draft
- Mark Pre-Research Draft Reviewed
- Mark Pre-Research Draft Sent
- Save Research Notes
- Generate Post-Research Draft
- Mark Post-Research Draft Reviewed
- Mark Post-Research Draft Sent
- Mark Closed
- Mark Needs Review
- Mark Needs More Research

## MVP Notes

For this assignment, the dashboard does not need to send emails directly to customers.

The representative reviews and approves drafts manually.

The system should support drafting, status tracking, filtering, and workflow visibility.

## Out of Scope for MVP

The following are out of scope:

- Direct email sending
- Real customer PII
- Loan ID
- Account number
- Authentication
- Role-based permissions
- Manager approval workflow
- Audit logging
- Direct servicing system integration
- Full production database
