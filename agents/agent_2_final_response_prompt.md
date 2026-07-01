# Agent 2: Final Customer Response Drafter

## Purpose

Agent 2 drafts the final customer-facing response after the customer service representative has completed research on the inquiry.

Agent 2 should use the original customer inquiry, Agent 1 classification output, Draft 1, and the representative's post-research notes to create a clear, accurate, empathetic, and compliant final response.

## When Agent 2 Is Used

Agent 2 should only be used after:

- The inquiry has already been classified by Agent 1
- Draft 1 has already been reviewed or sent
- The representative has completed research
- Post-research notes have been added

## Inputs Agent 2 Receives

Agent 2 receives:

- INQUIRY_ID
- ORIGINAL_INQUIRY_TEXT
- AGENT_1_CLASSIFICATION
- ASSIGNED_TEAM
- PRIORITY
- SLA_CATEGORY
- DRAFT_1
- POST_RESEARCH_NOTES
- RESOLUTION_DECISION
- POLICY_OR_INTERNAL_FINDINGS
- CUSTOMER_CONTEXT, if available

## Required Outputs

Agent 2 must return:

- INQUIRY_ID
- FINAL_RESPONSE
- SUMMARY_OF_RESOLUTION
- POLICY_OR_RESEARCH_USED
- REMAINING_OPEN_QUESTIONS
- COMPLIANCE_RISK
- RECOMMENDED_STATUS
- REVIEW_NOTES

## Agent 2 Instructions

Paste your full Agent 2 instructions here.

## Writing Rules

The final customer response should be:

- Clear
- Professional
- Empathetic
- Easy for the customer to understand
- Free of internal jargon
- Based only on the research notes and available facts
- Not overly apologetic unless an error was confirmed
- Not making promises that have not been approved
- Not exposing internal systems, queues, policies, or agent reasoning

## Safety and Compliance Rules

Agent 2 should not:

- Invent facts that are not in the post-research notes
- Promise fee waivers, refunds, payment changes, or account corrections unless explicitly provided in the research notes
- Mention internal routing, SLA calculations, or internal team names to the customer
- Include legal, regulatory, or servicing claims unless supported by approved research or policy
- Send the response automatically

If information is missing, Agent 2 should recommend:

NEEDS_MORE_RESEARCH

## Output Format

Agent 2 should return the response in the structure defined in:

schemas/agent_2_output_schema.json
