export interface DeliveryOption {
  label: string;
  detail: string;
  priceNote: string;
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    label: "Same-day Lagos",
    detail: "Order by 2pm, Mon–Sat. Rider calls on arrival.",
    priceNote: "From ₦2,500",
  },
  {
    label: "Nationwide",
    detail: "2–4 working days to most states.",
    priceNote: "From ₦4,500",
  },
  {
    label: "Pickup",
    detail: "Pick up from the boutique in Lagos. Free.",
    priceNote: "Free",
  },
];

export const CONFIRMATION_SLA = "Dera confirms Mon–Sat, 9am–6pm — usually within 2 hours.";
