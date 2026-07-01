# Agent Testing Summary

## Overview

Agent 1 and Agent 2 were tested directly in ChatGPT using sample customer inquiry records.

The purpose of testing was to confirm that the agents can support the intended dashboard workflow before building the UI.

## Agents Tested

### Agent 1: Service Triage Router Penny

Agent 1 was tested to confirm that it can:

- Classify customer inquiries
- Identify sub-classification
- Recommend assigned team or queue
- Determine priority
- Determine SLA category and due date
- Identify customer sentiment
- Flag compliance risk
- Determine whether research is needed
- Identify missing information
- Recommend the next action
- Flag whether human review is needed

### Agent 2: Customer Response Drafter

Agent 2 was tested in two modes:

1. `PRE_RESEARCH`
2. `POST_RESEARCH`

Agent 2 was tested to confirm that it can:

- Draft an initial pre-research customer response
- Avoid unsupported promises before research is completed
- Use a professional and empathetic tone
- Draft a post-research response using representative-provided research notes
- Avoid inventing facts not included in the inquiry or research notes
- Recommend whether the response is ready, needs review, or needs more research

## Test Input

Testing used sample inquiry records from:

`sample_data/sample_inquiries.csv`

## Test Result

The outputs from Agent 1 and Agent 2 were reviewed manually.

Overall result: `PASS`

The agent outputs were directionally correct and aligned with the intended workflow.

## Notes

The agents produced usable outputs for the MVP workflow.

The next step is to design the dashboard experience so customer service representatives can:

- Upload the CSV
- View Agent 1 classification output
- Generate and review Agent 2 pre-research drafts
- Add research notes
- Generate and review Agent 2 post-research drafts
- Track inquiry status through closure

## Remaining Considerations

Before production use, the agents should be tested with a larger set of inquiries and reviewed for:

- Classification accuracy
- SLA accuracy
- Compliance sensitivity
- Consistency of response drafts
- Edge cases
- Human review requirements
