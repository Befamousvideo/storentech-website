export const HOME_NVIDIA_SPARK_HREF = "https://build.nvidia.com/spark";

export const homeCopy = {
  headline: "Keep the cost down. Keep security high. Keep your data yours.",
  subhead:
    "StorenTech AI is a full service AI consultancy. We design, build, and run private AI agents and the harnesses around them, for teams with more complicated setups who need costs kept in check, security kept high, and their data kept in-house.",
  proof:
    "StorenTech runs a local AI data center with AI agents, built on NVIDIA DGX Spark (GB10 Grace Blackwell) hardware we own and operate.",
  proofLinkLabel: "Start Building AI Agents on DGX Spark",
  costTitle: "Costs stay down",
  costBody:
    "Cloud AI bills grow with every use. We run agents on owned hardware wherever it makes sense, so per-use fees drop and the cost stays predictable. You see the expected savings in an AI Opportunity Map (Automation ROI Analysis) before you commit to a build.",
  securityTitle: "Security stays high",
  securityBody:
    "Agents work inside clear limits, with a harness that checks their work as the setup gets more complicated. Important decisions pass through a person. Nothing important happens on its own.",
  dataTitle: "Your data stays yours",
  dataBody:
    "Your client and business data does not have to be sent to an outside AI service to get the work done. We run a local AI data center with agents, so the work stays in-house and you keep ownership and control of the data.",
  productivityTitle: "Productivity",
  productivityBody:
    "On the work agents take over, employees can see 8x or more productivity gains, while keeping security tight; important decisions still pass through a person.*",
  productivityFootnote:
    "*Not every case reaches 10x, and every case is different. The 8–10x figures come from specific automated workflows and from teams that rebuilt how work is checked, not from everyday use of a chat tool.",
  cta: "Get your AI Opportunity Map",
} as const;

export const HOME_META_TITLE = `StorenTech AI — ${homeCopy.headline}`;
export const HOME_META_DESCRIPTION = homeCopy.subhead;
