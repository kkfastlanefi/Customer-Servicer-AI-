

# Customer Inquiry Agent Dashboard

## Project Overview

This project defines an MVP dashboard workflow for helping customer service representatives manage uploaded customer inquiries from intake through classification, response drafting, research, and closure.

For the scope of this assignment, the representative uploads a CSV file containing customer inquiry records. The workflow uses two agents:

- Agent 1: Service Triage Router Penny
- Agent 2: Customer Response Drafter

## Agent Responsibilities

### Agent 1: Service Triage Router Penny

Agent 1 classifies each inquiry and determines:

- Classification
- Sub-classification
- Assigned team or queue
- Priority
- SLA category
- SLA due date
- Customer sentiment
- Compliance risk
- Whether research is needed
- Missing information
- Recommended next action
- Whether human review is needed

Agent 1 does not draft customer-facing responses.

### Agent 2: Customer Response Drafter

Agent 2 drafts customer-facing responses in two stages:

1. PRE_RESEARCH: Drafts the first customer-facing response after Agent 1 classification.
2. POST_RESEARCH: Drafts the follow-up or final customer-facing response after the representative adds research notes.

Agent 2 does not send responses automatically. A customer service representative must review and approve drafts.

## MVP Input File

The uploaded CSV contains the following columns:

- INQUIRY_ID
- RECEIVED_DATE
- CHANNEL
- BORROWER_MASKED
- RAW_MESSAGE
- CURRENT_STATUS

The MVP does not include loan ID, account number, property address, email address, phone number, or other direct customer identifiers.

## Workflow Summary

Standard workflow:

```text
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

Alternative statuses:

NEEDS_REVIEW
NEEDS_MORE_RESEARCH
Repository Structure
agents/
  agent_1_classification_prompt.md
  agent_2_final_response_prompt.md

docs/
  PRD.md
  workflow.md

sample_data/
  sample_inquiries.csv

schemas/
  agent_1_output_schema.json
  agent_2_output_schema.json

ui/
  dashboard_wireframe_notes.md

README.md
Key Dashboard Capabilities

The dashboard should allow representatives to:

Upload a CSV of inquiries
Run Agent 1 classification
Review classification, routing, priority, SLA, and risk
Generate a pre-research draft using Agent 2
Review and edit the pre-research draft
Mark the inquiry as waiting for research
Add research notes
Generate a post-research draft using Agent 2
Review and edit the post-research draft
Mark the inquiry as closed
Filter inquiries by status, team, priority, SLA, sentiment, compliance risk, and research status
MVP Scope

In scope:

CSV upload
Inquiry classification
Team/routing recommendation
Priority/SLA recommendation
Pre-research response drafting
Research note entry
Post-research response drafting
Status tracking
Dashboard filtering
Human review before sending

Out of scope:

Direct customer email sending
Real customer PII
Loan ID
Account number
Authentication
Role-based access
Manager approval workflow
Audit logging
Direct servicing system integration
Full production database
Primary Goal

The primary goal is to help customer service representatives avoid duplicate work and clearly understand the next action needed for each inquiry.

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
