import { Bell, CreditCard, PieChart, Receipt, Users } from "lucide-react";

export const FEATURES = [
  {
    title: "Broke Squads",
    Icon: Users,
    bg: "bg-green-100",
    color: "text-green-600",
    description:
      "Group your roommates, freeloading friends, or chaotic trips so you can track every single cent they owe you.",
  },
  {
    title: "No-BS Settlements",
    Icon: CreditCard,
    bg: "bg-teal-100",
    color: "text-teal-600",
    description:
      "Our algorithm cuts the crap and minimizes the number of transactions needed to get your money back.",
  },
  {
    title: "Shame Analytics",
    Icon: PieChart,
    bg: "bg-green-100",
    color: "text-green-600",
    description:
      "Visually confront your terrible spending habits and see exactly which friend is draining your empty wallet.",
  },
  {
    title: "Aggressive Reminders",
    Icon: Bell,
    bg: "bg-amber-100",
    color: "text-amber-600",
    description:
      "Automated, direct alerts that constantly remind your forgetful friends that they are technically living on your charity.",
  },
  {
    title: "Ruthless Splitting",
    Icon: Receipt,
    bg: "bg-green-100",
    color: "text-green-600",
    description:
      "Split equally, by percentage, or down to the exact penny. Because being polite won't pay your rent.",
  },
  {
    title: "Real‑time Audits",
    Icon: () => (
      /* custom inline icon (no Lucide equivalent) */
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 14v8M15 14v8M9 2v6M15 2v6" />
      </svg>
    ),
    bg: "bg-teal-100",
    color: "text-teal-600",
    description:
      "Watch expenses pop up the exact second your friends try to sneak a shared charge onto your tab.",
  },
];

export const STEPS = [
  {
    label: "1",
    title: "Expose the Group",
    description:
      "Create a group for your broke squad, invite them, and drag their financial accountability into the light.",
  },
  {
    label: "2",
    title: "Drop the Damage",
    description:
      "Log who actually had the cash to pay and exactly how the bill is being brutally split among the culprits.",
  },
  {
    label: "3",
    title: "Pay Up or Else",
    description: "Look them in the digital eye, see who owes what, and log payments the moment they stop dodging you.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Ye babu rao ka style hai! With Brutsplit, these freeloaders can't look at me with innocent eyes anymore when the rent is due!",
    name: "Babu Rao",
    image: "/testimonials/babubhaiya.png",
    role: "Stressed Property Owner",
  },
  {
    quote:
      "Brutsplit handles debts so brutally fast, it exposed my 25-day double money scheme within the first 5 seconds. Highly recommended.",
    name: "Raju",
    image: "/testimonials/raju.jpg",
    role: "Recovering Hustler",
  },
  {
    quote:
      "Finally! Raju can't secretly sell my shoes to clear his debts anymore. I just log it directly into Brutsplit and lock him in debt jail.",
    name: "Shyam",
    image: "/testimonials/shyam.png",
    role: "Aggressive Debt Collector",
  },
];