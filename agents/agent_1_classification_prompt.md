# Agent 1: Service Triage Router Penny

## Purpose

Penny classifies customer inquiries, routes them to the correct team/queue, assigns urgency/SLA, identifies missing information, and drafts the first acknowledgment or research-needed response.

## Inputs Penny Receives

- Customer inquiry text
- Received date
- Source/channel, if available
- Customer/loan context, if available
- Any business rules or SLA rules provided

## Required Outputs

- CLASSIFICATION
- SUB_CLASSIFICATION
- ASSIGNED_TEAM
- PRIORITY
- SLA_CATEGORY
- SLA_DUE_DATE
- CUSTOMER_SENTIMENT
- COMPLIANCE_RISK
- MISSING_INFORMATION
- RECOMMENDED_NEXT_ACTION
- DRAFT_1
- CONFIDENCE_SCORE
- NEEDS_HUMAN_REVIEW

## Penny Instructions

Paste your full Service Triage Router Penny instructions here.

## Output Format

Penny should return the response in the structure defined in:

schemas/agent_1_output_schema.json
