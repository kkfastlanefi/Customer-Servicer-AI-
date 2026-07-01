import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  CircleDot,
  ClipboardList,
  FileText,
  Globe,
  Inbox,
  Mail,
  MessageSquare,
  Phone,
  RotateCw,
  Send,
  Shield,
  SlidersHorizontal,
  Sparkles,
  UploadCloud,
} from "lucide-react";

const sampleInquiries = [
  {
    id: "INQ-1001",
    date: "2026-06-22",
    channel: "Email",
    borrower: "Robert H──",
    message:
      "Hi, I want to pay off my loan completely. Can you send me the exact payoff amount and where to wire it? I'm closing on a refinance next Friday so I need this quickly.",
    primary: "Payoff / Refinance",
    secondary: "",
    recommended_owning_queue: "Payoff Desk",
    supporting: "",
    sla: "Within 2 business days",
    urgency: "High",
    compliance: false,
    complaint: false,
    idVerify: false,
    repNote: false,
    routingConf: "High",
    urgencyConf: "High",
    recommendedDraftType: "Research Acknowledgment",
    responseSafetyLevel: "High Risk",
    ack:
      "Hi Robert, thanks for reaching out about paying off your loan. Because payoff figures are exact and change daily, they must be generated through our approved payoff process rather than estimated. I’ve routed your request to our Payoff Desk so they can prepare the official payoff information and next steps. Since your refinance closes next Friday, I’ve noted the timing on your request. You can expect follow-up within 2 business days.\n\nThis message is for servicing purposes and does not change the terms of your loan or replace any required notices. Please use our approved servicing channels for account-specific requests.\n\n— Loan Servicing",
    research:
      "Order the system-generated payoff amount and good-through date. Confirm approved secure payoff instructions. Verify the Friday closing date to prioritize.",
    guardrails: ["G1 — never estimate a payoff amount", "G8 — disclaimer + next step"],
  },
  {
    id: "INQ-1002",
    date: "2026-06-22",
    channel: "Portal",
    borrower: "Maria G──",
    message:
      "My escrow payment went up $180 this month and nobody told me why. This is ridiculous. I want an explanation or I'm filing a complaint with the CFPB.",
    primary: "Escrow inquiry",
    secondary: "Legal / SCRA / Assumption / Release of liability",
    recommended_owning_queue: "Escrow Team",
    supporting: "Legal & Compliance",
    sla: "Same day compliance awareness; escrow response within 3 business days",
    urgency: "High",
    compliance: true,
    complaint: true,
    idVerify: false,
    repNote: false,
    routingConf: "High",
    urgencyConf: "High",
    recommendedDraftType: "Escalation Acknowledgment",
    responseSafetyLevel: "High Risk",
    ack:
      "Hi Maria, thank you for reaching out. I understand your concern about the escrow payment increase and the need for a clear explanation. I’ve flagged your message for compliance awareness because you mentioned a CFPB complaint, and I’ve routed the escrow issue to our Escrow Team for review. The team will review the escrow change and follow up with an account-specific explanation.\n\nThis message is for servicing purposes and does not change the terms of your loan or replace any required notices. Please use our approved servicing channels for account-specific requests.\n\n— Loan Servicing",
    research:
      "Pull the latest annual escrow analysis and identify what drove the $180 increase, such as tax change, insurance change, or shortage spread. Compliance awareness: log the CFPB mention and confirm whether any complaint-handling process applies.",
    guardrails: [
      "G4 — flag complaint / CFPB for compliance awareness",
      "G7 — calm, empathetic tone",
      "G8 — disclaimer + next step",
    ],
  },
  {
    id: "INQ-1003",
    date: "2026-06-23",
    channel: "Email",
    borrower: "James P──",
    message:
      "I lost my job in May and can't make this month's payment. What options do I have? I don't want to lose my house. Please help.",
    primary: "Loss mitigation / Hardship",
    secondary: "",
    recommended_owning_queue: "Loss Mitigation",
    supporting: "",
    sla: "Same day acknowledgment, 24h follow-up",
    urgency: "High",
    compliance: false,
    complaint: false,
    idVerify: false,
    repNote: false,
    routingConf: "High",
    urgencyConf: "High",
    recommendedDraftType: "Escalation Acknowledgment",
    responseSafetyLevel: "High Risk",
    ack:
      "Hi James, thank you for letting us know what’s going on. Losing a job is stressful, and wanting to protect your home is completely understandable. I’ve routed your message to our Loss Mitigation team so they can help you understand available hardship options and next steps. You’ll receive an acknowledgment today, with follow-up within 24 hours.\n\nThis message is for servicing purposes and does not change the terms of your loan or replace any required notices. Please use our approved servicing channels for account-specific requests.\n\n— Loan Servicing",
    research:
      "Identify applicable hardship or loss-mitigation options and documentation requirements. Facilitate the application process and do not gatekeep or discourage applying.",
    guardrails: [
      "G3 — never discourage applying for hardship help",
      "G7 — calm, empathetic tone",
      "G8 — disclaimer + next step",
    ],
  },
  {
    id: "INQ-1004",
    date: "2026-06-23",
    channel: "Phone note",
    borrower: "L. Chen",
    message:
      "Caller says autopay drafted twice on 6/20 and wants the duplicate $2,140 refunded. Verified last 4 of SSN. Frustrated but polite.",
    primary: "Payment processing / Refund",
    secondary: "",
    recommended_owning_queue: "Cash Operations",
    supporting: "",
    sla: "Within 2 business days",
    urgency: "High",
    compliance: false,
    complaint: false,
    idVerify: false,
    repNote: true,
    idPartial: true,
    routingConf: "High",
    urgencyConf: "High",
    recommendedDraftType: "Research Acknowledgment",
    responseSafetyLevel: "High Risk",
    ack:
      "Callback to L. Chen. Identity was partially verified using last 4 of SSN. Acknowledge the reported duplicate autopay draft on 6/20 and the request for a refund. Confirm that Cash Operations will research the payment activity before any refund decision is made. Do not promise a refund amount or timing on the call. Set expectation: follow-up within 2 business days.",
    research:
      "Verify whether autopay drafted twice on 6/20. Confirm the duplicate amount. Determine whether refund or reversal is approved and what timing can be shared.",
    guardrails: [
      "G5 — no refund commitment on first touch",
      "G7 — calm tone",
      "G8 — next step",
    ],
  },
  {
    id: "INQ-1005",
    date: "2026-06-23",
    channel: "Email",
    borrower: "Anonymous",
    message: "Is the office open on July 4th? Just wondering when I can call in.",
    primary: "General / Other",
    secondary: "",
    recommended_owning_queue: "Servicing General",
    supporting: "",
    sla: "Within 3 business days",
    urgency: "Low",
    compliance: false,
    complaint: false,
    idVerify: false,
    repNote: false,
    routingConf: "High",
    urgencyConf: "High",
    recommendedDraftType: "Informational Response",
    responseSafetyLevel: "Low Risk",
    ack:
      "Hi, thanks for asking. Please check our borrower portal or contact us at [SERVICING_CONTACT_INFO] for the most current holiday hours before calling.\n\nThis message is for servicing purposes and does not change the terms of your loan or replace any required notices. Please use our approved servicing channels for account-specific requests.\n\n— Loan Servicing",
    research: "Confirm standard office hours and July 4 holiday closure before providing a specific answer.",
    guardrails: ["G7 — plain-language tone", "G8 — next step"],
  },
  {
    id: "INQ-1006",
    date: "2026-06-24",
    channel: "Portal",
    borrower: "Devon W──",
    message:
      "I think someone else's payment got applied to my account — my balance dropped by $5,000 overnight and I didn't pay that. Please look into this, it may be fraud.",
    primary: "Suspected fraud / Misapplied funds",
    secondary: "",
    recommended_owning_queue: "Fraud & Security",
    supporting: "Cash Operations",
    sla: "Same day escalation; supporting team SLA applies",
    urgency: "High",
    compliance: false,
    complaint: false,
    idVerify: false,
    repNote: false,
    routingConf: "High",
    urgencyConf: "High",
    recommendedDraftType: "Escalation Acknowledgment",
    responseSafetyLevel: "High Risk",
    ack:
      "Hi Devon, thank you for flagging this. An unexpected change to your balance is understandably concerning. I’ve escalated this to our Fraud & Security team for review. To help protect your account, we can’t confirm or discuss specific transaction details in this message, but the appropriate team will review and follow up through the approved servicing process.\n\nThis message is for servicing purposes and does not change the terms of your loan or replace any required notices. Please use our approved servicing channels for account-specific requests.\n\n— Loan Servicing",
    research:
      "Escalate to Fraud & Security immediately. Investigate the $5,000 overnight balance change and possible misapplied payment. Cash Operations may support payment application research. Do not confirm or deny fraud to the borrower.",
    guardrails: [
      "G2 — never confirm/deny/speculate on fraud",
      "G7 — calm tone",
      "G8 — next step",
    ],
  },
  {
    id: "INQ-1007",
    date: "2026-06-24",
    channel: "Email",
    borrower: "Sandra K──",
    message:
      "Can you mail me a copy of my 1098 mortgage interest statement for last year? I need it for my taxes.",
    primary: "Document request (1098, statements)",
    secondary: "",
    recommended_owning_queue: "Document Services",
    supporting: "",
    sla: "Within 5 business days",
    urgency: "Medium",
    compliance: false,
    complaint: false,
    idVerify: true,
    repNote: false,
    routingConf: "High",
    urgencyConf: "Medium",
    recommendedDraftType: "Research Acknowledgment",
    responseSafetyLevel: "Medium Risk",
    ack:
      "Hi Sandra, we can help with your 1098 request. Before mailing tax documents, a representative will need to verify your identity and confirm the appropriate mailing information to protect your account. I’ve routed your request to Document Services for fulfillment after verification.\n\nThis message is for servicing purposes and does not change the terms of your loan or replace any required notices. Please use our approved servicing channels for account-specific requests.\n\n— Loan Servicing",
    research:
      "Confirm borrower identity and mailing address per verification policy. Locate the prior-year 1098 and arrange mailing.",
    guardrails: ["G6 — verify identity before mailing", "G8 — next step"],
  },
  {
    id: "INQ-1008",
    date: "2026-06-24",
    channel: "Phone note",
    borrower: "R. Diaz",
    message:
      "Borrower disputes a late fee from May; says payment was mailed on time. Wants fee reversed. Has done this twice before per notes.",
    primary: "Fee dispute",
    secondary: "",
    recommended_owning_queue: "Servicing Resolution",
    supporting: "",
    sla: "Within 3 business days",
    urgency: "Medium",
    compliance: false,
    complaint: false,
    idVerify: false,
    repNote: true,
    routingConf: "High",
    urgencyConf: "High",
    recommendedDraftType: "Research Acknowledgment",
    responseSafetyLevel: "High Risk",
    ack:
      "Callback to R. Diaz. Acknowledge the disputed May late fee and the request to reverse it. Note that the borrower states the payment was mailed on time. Do not commit to a reversal on this call. Servicing Resolution will research the payment timing and fee assessment. Because this is a repeat dispute, flag for supervisor review. Set expectation: research within 3 business days.",
    research:
      "Review the May payment postmark or receipt against the due date. Check prior disputes for pattern. Determine whether fee reversal is approved or denied. Supervisor review required because this is a repeat dispute.",
    guardrails: [
      "G5 — no fee-reversal commitment on first touch",
      "G7 — calm tone",
      "G8 — next step",
    ],
  },
  {
    id: "INQ-1009",
    date: "2026-06-25",
    channel: "Email",
    borrower: "Thomas L──",
    message:
      "What's my current interest rate and how many payments do I have left? Also can I set up biweekly payments?",
    primary: "Account info (rate, term, payment setup)",
    secondary: "",
    recommended_owning_queue: "Servicing General",
    supporting: "",
    sla: "Within 2 business days",
    urgency: "Medium",
    compliance: false,
    complaint: false,
    idVerify: true,
    repNote: false,
    routingConf: "High",
    urgencyConf: "High",
    recommendedDraftType: "Research Acknowledgment",
    responseSafetyLevel: "Medium Risk",
    ack:
      "Hi Thomas, thank you for reaching out. We can help with your current interest rate, remaining payments, and biweekly payment setup options. Because these are account-specific details, a representative will need to verify your identity before discussing them. I’ve routed this to Servicing General for review and follow-up within 2 business days.\n\nThis message is for servicing purposes and does not change the terms of your loan or replace any required notices. Please use our approved servicing channels for account-specific requests.\n\n— Loan Servicing",
    research:
      "After identity verification, provide current interest rate and remaining payment count. Confirm biweekly payment setup options and enrollment steps.",
    guardrails: ["G6 — verify identity for account info", "G8 — next step"],
  },
  {
    id: "INQ-1010",
    date: "2026-06-25",
    channel: "Portal",
    borrower: "Olivia R──",
    message:
      "I'm an active-duty servicemember being deployed. I believe I qualify for SCRA benefits and a reduced interest rate. How do I apply?",
    primary: "Legal / SCRA / Assumption / Release of liability",
    secondary: "",
    recommended_owning_queue: "Legal & Compliance",
    supporting: "",
    sla: "Same day acknowledgment",
    urgency: "High",
    compliance: true,
    complaint: false,
    idVerify: false,
    repNote: false,
    routingConf: "High",
    urgencyConf: "High",
    recommendedDraftType: "Escalation Acknowledgment",
    responseSafetyLevel: "High Risk",
    ack:
      "Hi Olivia, thank you for your service, and thank you for reaching out ahead of your deployment. I’ve routed your message to our Legal & Compliance team, which handles SCRA requests and can provide the approved application steps. We will acknowledge your request today. We are not confirming eligibility or a rate change in this message; the team will review the request through the approved process.\n\nThis message is for servicing purposes and does not change the terms of your loan or replace any required notices. Please use our approved servicing channels for account-specific requests.\n\n— Loan Servicing",
    research:
      "Provide approved SCRA application requirements, such as required documentation. Route eligibility determination to Legal & Compliance. Do not confirm eligibility or rate change before review.",
    guardrails: [
      "G5 — do not commit to a rate change on first touch",
      "G7 — calm, respectful tone",
      "G8 — next step",
    ],
  },
  {
    id: "INQ-1011",
    date: "2026-06-25",
    channel: "Email",
    borrower: "Frustrated",
    message:
      "This is the THIRD time I've emailed. NOBODY responds. I demand a callback from a manager TODAY or I'm getting a lawyer involved.",
    primary: "Legal / SCRA / Assumption / Release of liability",
    secondary: "General / Other",
    recommended_owning_queue: "Legal & Compliance",
    supporting: "Servicing General",
    sla: "Same day acknowledgment",
    urgency: "High",
    compliance: true,
    complaint: true,
    idVerify: false,
    repNote: false,
    breached: true,
    routingConf: "Medium",
    urgencyConf: "High",
    recommendedDraftType: "Escalation Acknowledgment",
    responseSafetyLevel: "High Risk",
    ack:
      "Hi, thank you for reaching out. I understand that you’ve contacted us multiple times and that this needs attention. I’ve flagged your message for review because it includes a legal escalation concern, and we will review prior correspondence to identify the underlying issue. A representative will follow up through the appropriate servicing channel.\n\nThis message is for servicing purposes and does not change the terms of your loan or replace any required notices. Please use our approved servicing channels for account-specific requests.\n\n— Loan Servicing",
    research:
      "Review the two prior contacts and identify the original underlying issue. Determine whether a manager callback is approved and who should make it. Compliance awareness: log the legal threat and confirm applicable handling process.",
    guardrails: [
      "G4 — flag legal threat for compliance awareness",
      "G7 — calm, empathetic tone",
      "G8 — disclaimer + next step",
    ],
  },
  {
    id: "INQ-1012",
    date: "2026-06-25",
    channel: "Email",
    borrower: "Henry M──",
    message:
      "I'd like to remove my ex-spouse from the loan after our divorce. The decree is final. What's the process for a release of liability or assumption?",
    primary: "Legal / SCRA / Assumption / Release of liability",
    secondary: "",
    recommended_owning_queue: "Legal & Compliance",
    supporting: "",
    sla: "Same day acknowledgment",
    urgency: "High",
    compliance: true,
    complaint: false,
    idVerify: false,
    repNote: false,
    routingConf: "High",
    urgencyConf: "High",
    recommendedDraftType: "Escalation Acknowledgment",
    responseSafetyLevel: "High Risk",
    ack:
      "Hi Henry, thank you for reaching out. Requests related to divorce, assumption, or release of liability require review through the approved process. I’ve routed your message to Legal & Compliance so they can provide the next steps and any documentation requirements. We will acknowledge your request today.\n\nThis message is for servicing purposes and does not change the terms of your loan or replace any required notices. Please use our approved servicing channels for account-specific requests.\n\n— Loan Servicing",
    research:
      "Determine approved process for assumption or release of liability. Identify required documents, such as divorce decree, application, or financial documents. Do not promise that the ex-spouse can be removed.",
    guardrails: ["G7 — calm, plain-language tone", "G8 — next step"],
  },
  {
    id: "INQ-1013",
    date: "2026-06-26",
    channel: "Portal",
    borrower: "Grace T──",
    message:
      "Quick question — does my monthly statement get mailed or is it only online? I'm not getting paper copies anymore.",
    primary: "Account info (rate, term, payment setup)",
    secondary: "Document request (1098, statements)",
    recommended_owning_queue: "Servicing General",
    supporting: "Document Services",
    sla: "Within 2 business days",
    urgency: "Low",
    compliance: false,
    complaint: false,
    idVerify: true,
    repNote: false,
    routingConf: "Medium",
    urgencyConf: "High",
    recommendedDraftType: "Research Acknowledgment",
    responseSafetyLevel: "Medium Risk",
    ack:
      "Hi Grace, thank you for reaching out. We can help review your statement delivery preference. Because statement delivery is account-specific, a representative may need to verify your identity before confirming or updating how your monthly statements are delivered. I’ve routed this to Servicing General for review.\n\nThis message is for servicing purposes and does not change the terms of your loan or replace any required notices. Please use our approved servicing channels for account-specific requests.\n\n— Loan Servicing",
    research:
      "Verify identity. Confirm current statement delivery setting and whether the borrower is enrolled in paperless statements. Update delivery preference if requested and allowed.",
    guardrails: [
      "G6 — verify identity for account-specific statement preference",
      "G7 — plain-language tone",
      "G8 — next step",
    ],
  },
  {
    id: "INQ-1014",
    date: "2026-06-26",
    channel: "Email",
    borrower: "Nathan B──",
    message:
      "I want to make an extra $500 principal-only payment this month. How do I make sure it goes to principal and not next month's payment?",
    primary: "Account info (rate, term, payment setup)",
    secondary: "",
    recommended_owning_queue: "Servicing General",
    supporting: "",
    sla: "Within 2 business days",
    urgency: "Medium",
    compliance: false,
    complaint: false,
    idVerify: true,
    repNote: false,
    routingConf: "Medium",
    urgencyConf: "High",
    recommendedDraftType: "Research Acknowledgment",
    responseSafetyLevel: "Medium Risk",
    ack:
      "Hi Nathan, thank you for reaching out. We can help with instructions for making an extra principal-only payment. Because payment application can depend on the approved payment method and account setup, a representative may need to verify your identity before providing account-specific instructions. I’ve routed this to Servicing General for follow-up within 2 business days.\n\nThis message is for servicing purposes and does not change the terms of your loan or replace any required notices. Please use our approved servicing channels for account-specific requests.\n\n— Loan Servicing",
    research:
      "Confirm approved method for designating a principal-only payment, including portal option, memo line, or required form. Clarify any timing requirements so the payment is not applied as next month’s payment.",
    guardrails: [
      "G6 — verify identity for account-specific payment instructions",
      "G7 — plain-language tone",
      "G8 — next step",
    ],
  },
  {
    id: "INQ-1015",
    date: "2026-06-26",
    channel: "Phone note",
    borrower: "A. Park",
    message:
      "Caller asking whether selling the home triggers any prepayment penalty, and what the payoff process looks like for a sale. Calm, information-gathering.",
    primary: "Payoff / Refinance",
    secondary: "Account info (rate, term, payment setup)",
    recommended_owning_queue: "Payoff Desk",
    supporting: "Servicing General",
    sla: "Within 2 business days",
    urgency: "Medium",
    compliance: false,
    complaint: false,
    idVerify: true,
    repNote: true,
    routingConf: "High",
    urgencyConf: "High",
    recommendedDraftType: "Research Acknowledgment",
    responseSafetyLevel: "High Risk",
    ack:
      "Callback to A. Park. Acknowledge the questions about selling the home, prepayment penalty, and payoff process. Do not quote a payoff figure. Explain that payoff information must come through the approved payoff process. Verify identity before discussing account-specific prepayment penalty terms. Route payoff process questions to the Payoff Desk; Servicing General may support review of account terms. Set expectation: follow-up within 2 business days.",
    research:
      "Check whether the loan has any prepayment-penalty terms. Outline the approved payoff process for a home sale. Order system-generated payoff quote only when borrower is ready and through approved process.",
    guardrails: [
      "G1 — never quote a payoff amount",
      "G6 — verify identity for account-specific terms",
      "G8 — next step",
    ],
  },
];

const sampleRows = ["id\tdate\tchannel\tborrower\tmessage"]
  .concat(sampleInquiries.map((item) => `${item.id}\t${item.date}\t${item.channel}\t${item.borrower}\t${item.message}`))
  .join("\n");

const statusMeta = {
  pre: { label: "Pre-research", tone: "sky", chip: "bg-sky-50 text-sky-700 ring-sky-200" },
  ack: { label: "Acknowledged", tone: "teal", chip: "bg-teal-50 text-teal-700 ring-teal-200" },
  post: { label: "Researched", tone: "indigo", chip: "bg-indigo-50 text-indigo-700 ring-indigo-200" },
  sent: { label: "Sent", tone: "emerald", chip: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
};

function loadRuntimeFields(item) {
  return {
    ...item,
    status: "pre",
    findings: "",
    finalDraft: "",
    routingFeedback: "",
    urgencyFeedback: "",
    draftRating: "",
    sendabilityFeedback: "",
    repComments: "",
  };
}

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function initials(name) {
  return name
    .replace("──", "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function firstName(name) {
  const clean = name.replace("──", "").trim();
  const first = clean.split(" ")[0];
  return first && first !== "Anonymous" && first !== "Frustrated" ? first : "there";
}

function ChannelIcon({ channel, className = "h-4 w-4" }) {
  if (channel === "Portal") return <Globe className={className} />;
  if (channel === "Phone note") return <Phone className={className} />;
  return <Mail className={className} />;
}

function Badge({ children, tone = "slate", icon: Icon }) {
  const tones = {
    slate: "bg-slate-50 text-slate-700 ring-slate-200",
    rose: "bg-rose-50 text-rose-700 ring-rose-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    indigo: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    violet: "bg-violet-50 text-violet-700 ring-violet-200",
    sky: "bg-sky-50 text-sky-700 ring-sky-200",
    teal: "bg-teal-50 text-teal-700 ring-teal-200",
  };
  return (
    <span className={cx("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1", tones[tone])}>
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
      {children}
    </span>
  );
}

function urgencyTone(urgency) {
  if (urgency === "High") return "rose";
  if (urgency === "Medium") return "amber";
  return "slate";
}

function stepTone(status, step) {
  if (step === 1) return status === "pre" ? "active" : "done";
  if (step === 2) return status === "ack" ? "active" : status === "post" || status === "sent" ? "done" : "idle";
  if (step === 3) return status === "post" ? "active" : status === "sent" ? "done" : "idle";
  return "idle";
}

function stepBorder(tone) {
  if (tone === "active") return "border-l-indigo-600";
  if (tone === "done") return "border-l-emerald-500";
  return "border-l-slate-200";
}

function buildFinalDraft(inq, findings) {
  const cleanFindings = findings.trim();
  const has = (term) => inq.guardrails.join(" ").toLowerCase().includes(term.toLowerCase());
  const disclaimer =
    "This message is for servicing purposes and does not change the terms of your loan or replace any required notices. Please use our approved servicing channels for account-specific requests.";

  if (!cleanFindings) {
    return "[Add research findings before generating the post-research response.]";
  }

  const safetyLines = [];
  if (has("payoff")) {
    safetyLines.push(
      "Please note that this message is not an official payoff quote. Official payoff figures must be requested and generated through the approved payoff process."
    );
  }
  if (has("fraud")) {
    safetyLines.push(
      "For account security, we cannot confirm, deny, or speculate about fraud in this message. The matter is being handled through the appropriate servicing process."
    );
  }
  if (has("refund") || has("fee")) {
    const approved = cleanFindings.toLowerCase().includes("approved");
    if (!approved) {
      safetyLines.push(
        "This response does not confirm that a refund, reversal, or fee adjustment has been approved unless that approval is specifically documented in the findings."
      );
    }
  }
  if (inq.idVerify || has("verify identity")) {
    safetyLines.push(
      "Before account-specific details can be discussed or changed, identity verification may be required through the approved servicing channel."
    );
  }

  if (inq.channel === "Phone note") {
    return [
      `Callback / close-out notes for ${inq.borrower}:`,
      "",
      cleanFindings,
      "",
      safetyLines.length ? `Guardrails observed: ${safetyLines.join(" ")}` : "Guardrails observed: Standard servicing next-step guidance provided.",
      "",
      "Close-out note: Rep should confirm that any account-specific action is completed only through the approved servicing workflow.",
    ].join("\n");
  }

  return [
    `Hi ${firstName(inq.borrower)},`,
    "",
    "Thank you for your patience while we reviewed your inquiry.",
    "",
    cleanFindings,
    "",
    safetyLines.length ? safetyLines.join(" ") : "Based on the review, please continue to use the approved servicing channel for any account-specific next steps.",
    "",
    disclaimer,
    "",
    "— Loan Servicing",
  ].join("\n");
}

function UploadScreen({ draftText, setDraftText, onRun }) {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Servicing Triage Console</h1>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Review AI triage recommendations, draft borrower responses, and capture servicing feedback.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-6 flex items-start justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold">Add inquiries</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                This prototype is preloaded with a 15-inquiry sample pack. In production, this would accept a CSV or XLSX
                export from the servicing inbox or case system.
              </p>
            </div>
            <Badge tone="indigo" icon={Inbox}>15 sample inquiries</Badge>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center lg:col-span-1">
              <UploadCloud className="mb-4 h-10 w-10 text-slate-400" />
              <p className="font-medium text-slate-700">Upload .csv / .xlsx export</p>
              <p className="mt-2 text-sm text-slate-500">Non-functional placeholder for the prototype.</p>
            </div>
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Sample inquiry rows</label>
              <textarea
                className="h-64 w-full rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs leading-5 text-slate-700 shadow-sm outline-none ring-indigo-600 focus:ring-2"
                value={draftText}
                onChange={(event) => setDraftText(event.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onRun}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              <Sparkles className="h-4 w-4" />
              Run triage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SegmentButton({ label, count, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ring-1 transition",
        active ? "bg-slate-900 text-white ring-slate-900" : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-50"
      )}
    >
      {label}
      <span className={cx("rounded-full px-2 py-0.5 text-xs", active ? "bg-white text-slate-900" : "bg-slate-100 text-slate-500")}>{count}</span>
    </button>
  );
}

function QueueBoard({ inquiries, filters, setFilters, onOpen, onReset }) {
  const queues = useMemo(() => {
    return ["All", ...Array.from(new Set(inquiries.map((item) => item.recommended_owning_queue))).sort()];
  }, [inquiries]);

  const counts = useMemo(() => {
    return {
      all: inquiries.length,
      pre: inquiries.filter((item) => item.status === "pre").length,
      ack: inquiries.filter((item) => item.status === "ack").length,
      post: inquiries.filter((item) => item.status === "post").length,
      sent: inquiries.filter((item) => item.status === "sent").length,
    };
  }, [inquiries]);

  const filtered = useMemo(() => {
    return inquiries.filter((item) => {
      const statusMatch = filters.status === "all" || item.status === filters.status;
      const queueMatch = filters.queue === "All" || item.recommended_owning_queue === filters.queue;
      const urgencyMatch = filters.urgency === "All" || item.urgency === filters.urgency;
      const complianceMatch = !filters.complianceOnly || item.compliance;
      return statusMatch && queueMatch && urgencyMatch && complianceMatch;
    });
  }, [inquiries, filters]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <ClipboardList className="h-4 w-4" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Servicing Triage Console</h1>
                <p className="text-sm text-slate-500">Queue board for first-pass servicing review.</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
          >
            Add new export
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <SegmentButton label="All" count={counts.all} active={filters.status === "all"} onClick={() => setFilters({ ...filters, status: "all" })} />
          <SegmentButton label="Pre-research" count={counts.pre} active={filters.status === "pre"} onClick={() => setFilters({ ...filters, status: "pre" })} />
          <SegmentButton label="Acknowledged" count={counts.ack} active={filters.status === "ack"} onClick={() => setFilters({ ...filters, status: "ack" })} />
          <SegmentButton label="Researched" count={counts.post} active={filters.status === "post"} onClick={() => setFilters({ ...filters, status: "post" })} />
          <SegmentButton label="Sent" count={counts.sent} active={filters.status === "sent"} onClick={() => setFilters({ ...filters, status: "sent" })} />
        </div>

        <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            Filters
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">Queue</span>
              <select
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-600 focus:ring-2"
                value={filters.queue}
                onChange={(event) => setFilters({ ...filters, queue: event.target.value })}
              >
                {queues.map((queue) => (
                  <option key={queue}>{queue}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">Urgency</span>
              <select
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-600 focus:ring-2"
                value={filters.urgency}
                onChange={(event) => setFilters({ ...filters, urgency: event.target.value })}
              >
                <option>All</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => setFilters({ ...filters, complianceOnly: !filters.complianceOnly })}
                className={cx(
                  "inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium ring-1",
                  filters.complianceOnly
                    ? "bg-violet-50 text-violet-700 ring-violet-200"
                    : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
                )}
              >
                <Shield className="h-4 w-4" />
                Compliance flag only
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <div className="col-span-4">Inquiry</div>
            <div className="col-span-3">Category → Recommended Queue</div>
            <div className="col-span-1">SLA</div>
            <div className="col-span-1">Urgency</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2">Draft Mode</div>
          </div>

          {filtered.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500">No inquiries match the selected filters.</div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpen(item.id)}
                className="grid w-full grid-cols-12 items-center gap-4 border-b border-slate-100 px-4 py-4 text-left transition hover:bg-slate-50 last:border-b-0"
              >
                <div className="col-span-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                    {initials(item.borrower)}
                  </div>
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-900">{item.id}</span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                        <ChannelIcon channel={item.channel} /> {item.channel}
                      </span>
                      {item.compliance ? <Shield className="h-4 w-4 text-violet-500" /> : null}
                    </div>
                    <div className="font-medium text-slate-700">{item.borrower}</div>
                    <p className="mt-1 truncate text-sm text-slate-500">{item.message}</p>
                  </div>
                </div>
                <div className="col-span-3 min-w-0">
                  <div className="truncate font-medium text-slate-800">{item.primary}</div>
                  <div className="mt-1 flex items-center gap-1 truncate text-sm text-slate-500">
                    <ArrowRight className="h-3.5 w-3.5" />
                    {item.recommended_owning_queue}
                  </div>
                </div>
                <div className="col-span-1 text-sm text-slate-600">{item.sla}</div>
                <div className="col-span-1">
                  <Badge tone={urgencyTone(item.urgency)}>{item.urgency}</Badge>
                </div>
                <div className="col-span-1">
                  <span className={cx("inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ring-1", statusMeta[item.status].chip)}>
                    <CircleDot className="h-3 w-3" />
                    {statusMeta[item.status].label}
                  </span>
                </div>
                <div className="col-span-2 text-sm text-slate-600">{item.recommendedDraftType}</div>
              </button>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

function SectionCard({ title, subtitle, children, className = "" }) {
  return (
    <section className={cx("rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200", className)}>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function StepCard({ step, icon: Icon, title, helper, children, status }) {
  return (
    <section className={cx("rounded-2xl border-l-4 bg-white p-5 shadow-sm ring-1 ring-slate-200", stepBorder(stepTone(status, step)))}>
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
          {step}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-indigo-600" />
            <h2 className="font-semibold text-slate-900">{title}</h2>
          </div>
          <p className="mt-1 text-sm leading-6 text-slate-500">{helper}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function AgentRecommendation({ inquiry }) {
  return (
    <SectionCard
      title="Agent 1 recommendation"
      subtitle="Triage, routing, SLA, urgency, and guardrail recommendation for rep review."
    >
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Routing confidence</div>
          <div className="mt-1 text-lg font-semibold text-slate-900">{inquiry.routingConf}</div>
        </div>
        {inquiry.urgencyConf ? (
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Urgency confidence</div>
            <div className="mt-1 text-lg font-semibold text-slate-900">{inquiry.urgencyConf}</div>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="slate">Primary: {inquiry.primary}</Badge>
        {inquiry.secondary ? <Badge tone="slate">Secondary: {inquiry.secondary}</Badge> : null}
        <Badge tone="indigo">Recommended owning queue: {inquiry.recommended_owning_queue}</Badge>
        {inquiry.supporting ? <Badge tone="slate">Supporting queue: {inquiry.supporting}</Badge> : null}
        <Badge tone={urgencyTone(inquiry.urgency)}>Urgency: {inquiry.urgency}</Badge>
        <Badge tone="sky">SLA: {inquiry.sla}</Badge>
        {inquiry.compliance ? <Badge tone="violet" icon={Shield}>Compliance flag</Badge> : null}
        {inquiry.complaint ? <Badge tone="violet" icon={AlertTriangle}>Complaint</Badge> : null}
        {inquiry.idVerify ? <Badge tone="amber">Identity verification</Badge> : null}
        {inquiry.breached ? <Badge tone="rose">Breached / repeated contact</Badge> : null}
      </div>
    </SectionCard>
  );
}

function AgentModeCard({ inquiry }) {
  const postMode = inquiry.status === "post" || inquiry.status === "sent";
  return (
    <SectionCard title="Agent 2 mode">
      <div className="flex flex-wrap gap-2">
        <Badge tone="indigo">{postMode ? "Post-research" : "Pre-research / First-touch"}</Badge>
        <Badge tone="slate">Draft type: {inquiry.recommendedDraftType}</Badge>
        {inquiry.responseSafetyLevel ? <Badge tone="amber">Safety: {inquiry.responseSafetyLevel}</Badge> : null}
        {inquiry.compliance ? <Badge tone="violet" icon={Shield}>Compliance flag</Badge> : null}
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-500">
        {inquiry.findings.trim()
          ? "Agent 2 can now draft a post-research response using the rep-entered findings."
          : "Agent 2 will draft a first-touch acknowledgment until research findings are entered."}
      </p>
    </SectionCard>
  );
}

function DetailView({ inquiry, onBack, onUpdate }) {
  const isPhone = inquiry.channel === "Phone note";
  const statusOptions = [
    { value: "pre", label: "Pre-research" },
    { value: "ack", label: "Acknowledged" },
    { value: "post", label: "Researched" },
    { value: "sent", label: "Sent" },
  ];

  const update = (changes) => onUpdate(inquiry.id, changes);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5">
          <div>
            <button type="button" onClick={onBack} className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900">
              <ChevronLeft className="h-4 w-4" />
              Back to Queue
            </button>
            <h1 className="text-2xl font-semibold tracking-tight">{inquiry.id}</h1>
          </div>
          <label className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
            <span className={cx("h-2.5 w-2.5 rounded-full", inquiry.status === "pre" ? "bg-sky-500" : inquiry.status === "ack" ? "bg-teal-500" : inquiry.status === "post" ? "bg-indigo-500" : "bg-emerald-500")} />
            <select
              className="bg-transparent text-sm font-medium text-slate-700 outline-none"
              value={inquiry.status}
              onChange={(event) => update({ status: event.target.value })}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <main className="mx-auto grid max-w-6xl gap-5 px-6 py-6">
        <SectionCard title={isPhone ? "Phone note" : "Borrower message"}>
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
              {initials(inquiry.borrower)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold text-slate-900">{inquiry.borrower}</h2>
                <Badge tone="slate" icon={isPhone ? Phone : inquiry.channel === "Portal" ? Globe : Mail}>{inquiry.channel}</Badge>
                <span className="text-sm text-slate-500">Received {inquiry.date}</span>
              </div>
              <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{inquiry.message}</p>
            </div>
          </div>
        </SectionCard>

        <AgentRecommendation inquiry={inquiry} />
        <AgentModeCard inquiry={inquiry} />

        <StepCard
          step={1}
          icon={MessageSquare}
          title={isPhone ? "Step 1 — Callback / acknowledgment notes" : "Step 1 — First-touch acknowledgment"}
          helper="Agent 2 pre-research draft — edit before sending or logging."
          status={inquiry.status}
        >
          <textarea
            className="min-h-48 w-full rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 outline-none ring-indigo-600 focus:ring-2"
            value={inquiry.ack}
            onChange={(event) => update({ ack: event.target.value })}
          />
          <div className="mt-4 flex items-center justify-between gap-3">
            {inquiry.status === "pre" ? (
              <button
                type="button"
                onClick={() => update({ status: "ack" })}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                <Send className="h-4 w-4" />
                {isPhone ? "Mark callback/logged" : "Mark acknowledgment sent"}
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
                <CheckCircle2 className="h-4 w-4" />
                {isPhone ? "Callback/logged" : "Acknowledgment sent"}
              </div>
            )}
          </div>
        </StepCard>

        <StepCard
          step={2}
          icon={ClipboardList}
          title="Step 2 — Research"
          helper="Enter what the servicing team found. Agent 2 will use this to draft the post-research response."
          status={inquiry.status}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">Next Action / Research Needed</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{inquiry.research}</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-100">
              <h3 className="text-sm font-semibold text-amber-900">Guardrails to Respect</h3>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-amber-800">
                {inquiry.guardrails.map((guardrail) => (
                  <li key={guardrail}>• {guardrail}</li>
                ))}
              </ul>
            </div>
          </div>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Your findings</span>
            <textarea
              className="min-h-40 w-full rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 outline-none ring-indigo-600 focus:ring-2"
              value={inquiry.findings}
              onChange={(event) => update({ findings: event.target.value })}
              placeholder={"Research summary — what you found\nResolution — the outcome for the borrower\nNotes for draft — what the reply should or shouldn't say"}
            />
          </label>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={!inquiry.findings.trim()}
              onClick={() => update({ finalDraft: buildFinalDraft(inquiry, inquiry.findings), status: "post" })}
              className={cx(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold",
                inquiry.findings.trim()
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "cursor-not-allowed bg-slate-100 text-slate-400"
              )}
            >
              <FileText className="h-4 w-4" />
              Generate post-research draft
            </button>
            {!inquiry.findings.trim() ? (
              <span className="text-sm text-slate-500">Enter findings before generating a post-research response.</span>
            ) : null}
          </div>
        </StepCard>

        {(inquiry.status === "post" || inquiry.status === "sent") ? (
          <StepCard
            step={3}
            icon={FileText}
            title="Step 3 — Post-research response"
            helper="Agent 2 post-research draft — generated from rep-entered findings and original guardrails."
            status={inquiry.status}
          >
            <textarea
              className="min-h-56 w-full rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 outline-none ring-indigo-600 focus:ring-2"
              value={inquiry.finalDraft}
              onChange={(event) => update({ finalDraft: event.target.value })}
            />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {inquiry.status === "post" ? (
                <>
                  <button
                    type="button"
                    onClick={() => update({ finalDraft: buildFinalDraft(inquiry, inquiry.findings) })}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                  >
                    <RotateCw className="h-4 w-4" />
                    Regenerate
                  </button>
                  <button
                    type="button"
                    onClick={() => update({ status: "sent" })}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Mark final response sent
                  </button>
                </>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
                  <CheckCircle2 className="h-4 w-4" />
                  Sent and closed.
                </div>
              )}
            </div>
          </StepCard>
        ) : null}

        <StepCard
          step={4}
          icon={CheckCircle2}
          title="Step 4 — Rep feedback"
          helper="Capture review feedback so the triage and drafting workflow can improve."
          status="idle"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Routing recommendation</span>
              <select
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-600 focus:ring-2"
                value={inquiry.routingFeedback}
                onChange={(event) => update({ routingFeedback: event.target.value })}
              >
                <option value=""></option>
                <option>Correct</option>
                <option>Incorrect</option>
                <option>Incomplete</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Urgency recommendation</span>
              <select
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-600 focus:ring-2"
                value={inquiry.urgencyFeedback}
                onChange={(event) => update({ urgencyFeedback: event.target.value })}
              >
                <option value=""></option>
                <option>Correct</option>
                <option>Incorrect</option>
                <option>Unsure</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Draft rating</span>
              <select
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-600 focus:ring-2"
                value={inquiry.draftRating}
                onChange={(event) => update({ draftRating: event.target.value })}
              >
                <option value=""></option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                  <option key={rating}>{rating}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Would send with edits?</span>
              <select
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-600 focus:ring-2"
                value={inquiry.sendabilityFeedback}
                onChange={(event) => update({ sendabilityFeedback: event.target.value })}
              >
                <option value=""></option>
                <option>Send as-is</option>
                <option>Minor edits</option>
                <option>Major edits</option>
                <option>Not usable</option>
              </select>
            </label>
          </div>
          <label className="mt-4 block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Rep comments</span>
            <textarea
              className="min-h-28 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700 outline-none ring-indigo-600 focus:ring-2"
              value={inquiry.repComments}
              onChange={(event) => update({ repComments: event.target.value })}
            />
          </label>
        </StepCard>
      </main>
    </div>
  );
}

export default function App() {
  const [uploadText, setUploadText] = useState(sampleRows);
  const [inquiries, setInquiries] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [filters, setFilters] = useState({ status: "all", queue: "All", urgency: "All", complianceOnly: false });

  const selectedInquiry = useMemo(() => inquiries.find((item) => item.id === selectedId) || null, [inquiries, selectedId]);

  const runTriage = () => {
    setInquiries(sampleInquiries.map(loadRuntimeFields));
    setSelectedId(null);
    setFilters({ status: "all", queue: "All", urgency: "All", complianceOnly: false });
  };

  const updateInquiry = (id, changes) => {
    setInquiries((current) => current.map((item) => (item.id === id ? { ...item, ...changes } : item)));
  };

  if (inquiries.length === 0) {
    return <UploadScreen draftText={uploadText} setDraftText={setUploadText} onRun={runTriage} />;
  }

  if (selectedInquiry) {
    return <DetailView inquiry={selectedInquiry} onBack={() => setSelectedId(null)} onUpdate={updateInquiry} />;
  }

  return (
    <QueueBoard
      inquiries={inquiries}
      filters={filters}
      setFilters={setFilters}
      onOpen={setSelectedId}
      onReset={() => {
        setInquiries([]);
        setSelectedId(null);
      }}
    />
  );
}
