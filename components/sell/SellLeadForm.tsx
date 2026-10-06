"use client";

import { useSearchParams } from "next/navigation";
import { LeadForm } from "@/components/LeadForm";
import { REGIONS } from "@/lib/site";

const INTENT = ["Sell my property", "Rent out my property", "Both / not sure yet"] as const;
const TYPES = ["House", "Apartment / townhouse", "Commercial building", "Residential land", "Commercial land"] as const;
const TIMING = ["As soon as possible", "Within 3 months", "3–12 months", "Just exploring"] as const;

export function SellLeadForm() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") ?? undefined;
  const intentParam = searchParams.get("intent");
  const intent = intentParam === "rent" ? INTENT[1] : INTENT[0];

  return (
    <LeadForm
      source="sell-consultation"
      title="Free property consultation"
      text={{ name: "location", label: "Property location", placeholder: "e.g. Diamond, East Bank Demerara", value: location }}
      selects={[
        { name: "intent", label: "I want to", options: INTENT, value: intent },
        { name: "propertyType", label: "Property type", options: TYPES },
        { name: "area", label: "Area", options: ["Select area", ...REGIONS] },
        { name: "timing", label: "Timing", options: TIMING },
      ]}
      messageLabel="About the property"
      messagePlaceholder="Bedrooms, size, condition, anything else useful"
      submitLabel="Request my consultation"
      sentMessage="Thanks. We will contact you to arrange a property review."
      note="No obligation. We will call or email to arrange a convenient time."
    />
  );
}
