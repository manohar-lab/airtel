export const supportOptions = [
  {
    id: "sim-new",
    title: "Order New SIM",
    description: "Get a new prepaid or postpaid connection delivered home.",
    icon: "CreditCard"
  },
  {
    id: "sim-replace",
    title: "Replace Lost/Damaged SIM",
    description: "Block your old SIM and request a replacement.",
    icon: "Smartphone"
  },
  {
    id: "sim-reactivate",
    title: "Reactivate Existing Number",
    description: "Restore services on a deactivated number.",
    icon: "RefreshCw"
  },
  {
    id: "port-upgrade",
    title: "Upgrade/Port Request",
    description: "Switch to postpaid or port to Airtel from another network.",
    icon: "ArrowRightLeft"
  },
  {
    id: "other",
    title: "Other Query / Raise Ticket",
    description: "Facing network or billing issues? Raise a support ticket.",
    icon: "LifeBuoy"
  }
];

export const mockPlans = {
  prepaid: [
    { id: 1, price: "299", data: "1.5 GB/day", validity: "28 Days", calls: "Unlimited" },
    { id: 2, price: "499", data: "3 GB/day", validity: "28 Days", calls: "Unlimited", benefits: ["Disney+ Hotstar"] },
    { id: 3, price: "999", data: "2.5 GB/day", validity: "84 Days", calls: "Unlimited", benefits: ["Amazon Prime"] }
  ],
  postpaid: [
    { id: 4, price: "399", data: "40 GB/month", calls: "Unlimited", benefits: ["Data Rollover"] },
    { id: 5, price: "499", data: "75 GB/month", calls: "Unlimited", benefits: ["Amazon Prime", "Disney+ Hotstar"] }
  ]
};

export const mockRequests = [
  { id: "SR-8823910", type: "Network Issue", date: "2023-10-25", status: "Resolved" },
  { id: "SR-8845021", type: "SIM Replacement", date: "2023-11-02", status: "In Progress" },
  { id: "SR-8859932", type: "Billing Query", date: "2023-11-05", status: "Pending" }
];

export const faqs = [
  {
    question: "How do I track my new SIM delivery?",
    answer: "You can track your new SIM delivery by navigating to the 'Track Requests' page and entering your reference number."
  },
  {
    question: "What is Airtel Black?",
    answer: "Airtel Black allows you to combine your Postpaid, DTH, and Fiber connections into a single bill with priority customer support."
  },
  {
    question: "How can I upgrade my prepaid to postpaid?",
    answer: "Use the 'Upgrade/Port Request' option in the Help Desk or visit the Plans page to select a Postpaid plan directly."
  }
];