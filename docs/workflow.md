# Customer Inquiry Workflow

## Overview

This workflow supports customer service representatives in managing customer inquiries from CSV upload through customer response drafting and resolution.

For the scope of this assignment, the representative uploads a CSV file containing customer inquiry records. The system uses Agent 1 to classify each inquiry and determine routing, urgency, SLA, sentiment, compliance risk, and research needs.

Agent 2 is then used in two stages:

1. Pre-research drafting: Agent 2 drafts the first customer-facing response before research is completed.
2. Post-research drafting: Agent 2 drafts the follow-up or final customer-facing response after the representative adds research notes.

The goal of the dashboard is to help representatives understand:

- What each inquiry is about
- Which team or queue should handle it
- What the SLA or urgency level is
- Whether a pre-research draft is ready
- Whether the inquiry is waiting for research
- Whether research has been added
- Whether a post-research draft is ready
- Which inquiries need review
- Which inquiries are already completed

## MVP Scope Note

For this assignment, the uploaded file will only contain a CSV or Excel-exported CSV of customer inquiries.

The MVP does not include loan ID, account number, property address, email address, phone number, or other direct customer identifiers.

The borrower field is masked and should only be used to help the representative distinguish rows during review. It should not be treated as a full customer identity field.

Future versions may include additional customer, loan, and account context if approved.

## Required CSV Input Fields

The customer service representative uploads a CSV file with the following columns:

- INQUIRY_ID
- RECEIVED_DATE
- CHANNEL
- BORROWER_MASKED
- RAW_MESSAGE
- CURRENT_STATUS

Field definitions:

| Field | Description |
|---|---|
| INQUIRY_ID | Unique identifier for the inquiry row |
| RECEIVED_DATE | Date the inquiry was received |
| CHANNEL | Source channel, such as Email, Portal, or Phone Note |
| BORROWER_MASKED | Masked borrower display name or label |
| RAW_MESSAGE | Original inquiry or complaint text |
| CURRENT_STATUS | Current workflow status of the inquiry |

Default status at upload:

```text
Inquiry Lifecycle Statuses

Each inquiry should move through one of the following statuses:

UPLOADED
CLASSIFIED_BY_AGENT_1
PRE_RESEARCH_DRAFT_READY
PRE_RESEARCH_DRAFT_REVIEWED
PRE_RESEARCH_DRAFT_SENT
WAITING_FOR_RESEARCH
RESEARCH_ADDED
POST_RESEARCH_DRAFT_READY
POST_RESEARCH_DRAFT_REVIEWED
POST_RESEARCH_DRAFT_SENT
CLOSED
NEEDS_REVIEW
NEEDS_MORE_RESEARCH
Step 1: CSV Upload

The representative uploads a CSV file containing customer inquiry records.

The system should read each row as a separate inquiry.

Each uploaded row should begin with the status:

UPLOADED

The dashboard should show the uploaded inquiries in a table so the representative can review all cases in one place.

Step 2: Agent 1 Classification

Agent 1, Service Triage Router Penny, reviews each inquiry using the following input fields:

INQUIRY_ID
RECEIVED_DATE
CHANNEL
BORROWER_MASKED
RAW_MESSAGE
CURRENT_STATUS

Agent 1 classifies the inquiry and returns structured outputs that can be used by the dashboard for filtering, routing, prioritization, and review.

Agent 1 should return:

INQUIRY_ID
CLASSIFICATION
SUB_CLASSIFICATION
ASSIGNED_TEAM
PRIORITY
SLA_CATEGORY
SLA_DUE_DATE
CUSTOMER_SENTIMENT
COMPLIANCE_RISK
RESEARCH_NEEDED
MISSING_INFORMATION
RECOMMENDED_NEXT_ACTION
CONFIDENCE_SCORE
NEEDS_HUMAN_REVIEW

Agent 1 should not draft the customer-facing response. Agent 1 is responsible for triage, classification, routing, SLA, research needs, and next-action guidance.

After Agent 1 completes, the inquiry status becomes:

CLASSIFIED_BY_AGENT_1

If Agent 1 is unsure or flags risk, the inquiry status may become:

NEEDS_REVIEW
Step 3: Agent 2 Pre-Research Draft

After Agent 1 classifies the inquiry, Agent 2 creates the pre-research customer-facing draft.

Agent 2 receives:

INQUIRY_ID
RECEIVED_DATE
CHANNEL
BORROWER_MASKED
RAW_MESSAGE
Agent 1 classification output
CURRENT_STATUS

For the pre-research stage, Agent 2 should draft a response that:

Acknowledges the customer’s inquiry
Uses an empathetic and professional tone
Does not make unsupported promises
Does not provide account-specific decisions without research
Explains that the inquiry will be reviewed or routed, if applicable
Requests missing information only when appropriate and within MVP scope
Avoids exposing internal routing, SLA calculations, or agent reasoning

Agent 2 should return:

INQUIRY_ID
RESPONSE_STAGE
CUSTOMER_RESPONSE_DRAFT
SUMMARY_OF_RESPONSE
INFORMATION_USED
REMAINING_OPEN_QUESTIONS
COMPLIANCE_RISK
RECOMMENDED_STATUS
REVIEW_NOTES

For this step, RESPONSE_STAGE should be:

PRE_RESEARCH

If the pre-research draft is ready for representative review, the status becomes:

PRE_RESEARCH_DRAFT_READY

If the draft requires human review, the status becomes:

NEEDS_REVIEW
Step 4: Representative Reviews Pre-Research Draft

The representative reviews the pre-research draft generated by Agent 2.

The representative should be able to:

View the original raw message
View Agent 1 classification details
View assigned team or queue
View SLA and priority
View compliance risk
View missing information
Review the pre-research draft
Edit the pre-research draft
Mark the draft as reviewed
Mark the draft as sent
Mark the inquiry as needing review

Once the representative reviews the pre-research draft, the status becomes:

PRE_RESEARCH_DRAFT_REVIEWED

Once the pre-research draft is sent, the status becomes:

PRE_RESEARCH_DRAFT_SENT

After the pre-research draft is sent, the inquiry should move to:

WAITING_FOR_RESEARCH
Step 5: Research Notes Added

After the representative or internal team completes research, the representative adds research notes to the inquiry.

Research notes may include:

Research summary
Internal findings
Resolution decision
Approved action
Remaining questions
Documentation reviewed
Whether additional review is needed

Once research notes are added, the status becomes:

RESEARCH_ADDED

If the notes are incomplete, the status may remain:

WAITING_FOR_RESEARCH

or become:

NEEDS_MORE_RESEARCH
Step 6: Agent 2 Post-Research Draft

After research notes are added, Agent 2 drafts the post-research customer-facing response.

Agent 2 receives:

INQUIRY_ID
RECEIVED_DATE
CHANNEL
BORROWER_MASKED
RAW_MESSAGE
Agent 1 classification output
Pre-research draft
Research notes
Resolution decision, if available
Representative notes, if available

For the post-research stage, Agent 2 should draft a response that:

Directly addresses the customer’s inquiry
Reflects the research findings provided by the representative
Explains the resolution or next step clearly
Avoids internal jargon
Does not invent facts
Does not promise fee waivers, refunds, payment changes, payoff amounts, or account corrections unless explicitly supported by the research notes
Does not expose internal systems, queues, SLA calculations, or agent reasoning

Agent 2 should return:

INQUIRY_ID
RESPONSE_STAGE
CUSTOMER_RESPONSE_DRAFT
SUMMARY_OF_RESPONSE
INFORMATION_USED
REMAINING_OPEN_QUESTIONS
COMPLIANCE_RISK
RECOMMENDED_STATUS
REVIEW_NOTES

For this step, RESPONSE_STAGE should be:

POST_RESEARCH

If the post-research draft is ready for representative review, the status becomes:

POST_RESEARCH_DRAFT_READY

If more information is needed, the status becomes:

NEEDS_MORE_RESEARCH

If human or compliance review is needed, the status becomes:

NEEDS_REVIEW
Step 7: Representative Reviews Post-Research Draft

The representative reviews the post-research draft generated by Agent 2.

The representative should be able to:

View the original inquiry
View Agent 1 output
View the pre-research draft
View research notes
View Agent 2 post-research draft
Edit the post-research draft
Mark the draft as reviewed
Mark the draft as sent
Mark the inquiry as needing review
Mark the inquiry as needing more research

Once the post-research draft is reviewed, the status becomes:

POST_RESEARCH_DRAFT_REVIEWED

Once the post-research draft is sent, the status becomes:

POST_RESEARCH_DRAFT_SENT

After the inquiry is fully resolved, the representative can mark it as:

CLOSED
Dashboard Table Requirements

The main dashboard table should help representatives quickly understand the state of each inquiry.

Recommended dashboard columns:

INQUIRY_ID
RECEIVED_DATE
CHANNEL
BORROWER_MASKED
CLASSIFICATION
SUB_CLASSIFICATION
ASSIGNED_TEAM
PRIORITY
SLA_DUE_DATE
CUSTOMER_SENTIMENT
COMPLIANCE_RISK
RESEARCH_NEEDED
CURRENT_STATUS
RECOMMENDED_NEXT_ACTION
NEEDS_HUMAN_REVIEW
Dashboard Filters

Representatives should be able to filter inquiries by:

ASSIGNED_TEAM
CLASSIFICATION
SUB_CLASSIFICATION
PRIORITY
SLA_DUE_DATE
CUSTOMER_SENTIMENT
COMPLIANCE_RISK
RESEARCH_NEEDED
CURRENT_STATUS
NEEDS_HUMAN_REVIEW
CHANNEL

Important dashboard views:

All uploaded inquiries
Classified by Agent 1
Pre-research draft ready
Waiting for research
Research added
Post-research draft ready
Needs review
Needs more research
Closed inquiries
SLA due soon
Inquiry Detail Page Requirements

When the representative opens an individual inquiry, the detail page should show the full workflow for that inquiry.

Original Inquiry
INQUIRY_ID
RECEIVED_DATE
CHANNEL
BORROWER_MASKED
RAW_MESSAGE
Agent 1 Output
CLASSIFICATION
SUB_CLASSIFICATION
ASSIGNED_TEAM
PRIORITY
SLA_CATEGORY
SLA_DUE_DATE
CUSTOMER_SENTIMENT
COMPLIANCE_RISK
RESEARCH_NEEDED
MISSING_INFORMATION
RECOMMENDED_NEXT_ACTION
CONFIDENCE_SCORE
NEEDS_HUMAN_REVIEW
Agent 2 Pre-Research Draft
RESPONSE_STAGE
CUSTOMER_RESPONSE_DRAFT
SUMMARY_OF_RESPONSE
INFORMATION_USED
REMAINING_OPEN_QUESTIONS
COMPLIANCE_RISK
RECOMMENDED_STATUS
REVIEW_NOTES
Representative Pre-Research Review
Editable pre-research draft field
Mark as reviewed action
Mark as sent action
Mark as needs review action
Research Section
Research summary
Internal findings
Resolution decision
Remaining questions
Representative notes
Submit research notes action
Agent 2 Post-Research Draft
RESPONSE_STAGE
CUSTOMER_RESPONSE_DRAFT
SUMMARY_OF_RESPONSE
INFORMATION_USED
REMAINING_OPEN_QUESTIONS
COMPLIANCE_RISK
RECOMMENDED_STATUS
REVIEW_NOTES
Representative Post-Research Review
Editable post-research draft field
Mark as reviewed action
Mark as sent action
Mark as closed action
Mark as needs more research action
Mark as needs review action
Status Transition Summary

Standard path:

UPLOADED
→ CLASSIFIED_BY_AGENT_1
→ PRE_RESEARCH_DRAFT_READY
→ PRE_RESEARCH_DRAFT_REVIEWED
→ PRE_RESEARCH_DRAFT_SENT
→ WAITING_FOR_RESEARCH
→ RESEARCH_ADDED
→ POST_RESEARCH_DRAFT_READY
→ POST_RESEARCH_DRAFT_REVIEWED
→ POST_RESEARCH_DRAFT_SENT
→ CLOSED

Alternative paths:

Any stage → NEEDS_REVIEW
WAITING_FOR_RESEARCH → NEEDS_MORE_RESEARCH
NEEDS_MORE_RESEARCH → RESEARCH_ADDED
NEEDS_REVIEW → PRE_RESEARCH_DRAFT_READY or POST_RESEARCH_DRAFT_READY
Out of Scope for MVP

The following items are out of scope for this assignment:

Real customer PII
Loan ID
Account number
Property address
Email address
Phone number
Direct integration with servicing systems
Direct email sending to customers
Automated customer communication without representative review
Authentication and role-based access control
Audit logging
Manager approval workflows
SLA business day/holiday logic beyond basic categorization
Full production database design
Future Considerations

Future versions may include:

Secure customer and loan context
Role-based access
Manager approval queue
Audit history
Direct CRM or servicing platform integration
Email/letter generation
Attachment handling
Advanced SLA calculation
Reporting and analytics
Team workload management
Compliance review workflow
Primary Goal

The primary goal of this workflow is to help representatives avoid duplicate work and clearly understand what action is needed next for each inquiry.

The dashboard should make it easy to see:

What has been uploaded
What Agent 1 has classified
What pre-research drafts are ready
What is waiting for research
What research has been added
What post-research drafts are ready
What needs review
What needs more research
What is already closed

After you paste this into `docs/workflow.md`, click **Commit changes**.
