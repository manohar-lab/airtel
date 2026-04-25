// ==========================================
// MOCK DATA — Airtel Neuromorphic Portal
// ==========================================

// ---- Support Option Cards ----
export const supportOptions = [
  {
    id: "sim-new",
    title: "Order New SIM",
    description: "Get a new prepaid or postpaid connection delivered to your doorstep.",
    icon: "CreditCard",
    issueType: "New Connection",
  },
  {
    id: "sim-replace",
    title: "Replace Lost/Damaged SIM",
    description: "Block your old SIM instantly and request a replacement.",
    icon: "Smartphone",
    issueType: "SIM Replacement",
  },
  {
    id: "sim-reactivate",
    title: "Reactivate Existing Number",
    description: "Restore services on a deactivated or suspended number.",
    icon: "RefreshCw",
    issueType: "Reactivation",
  },
  {
    id: "port-upgrade",
    title: "Upgrade/Port Request",
    description: "Switch to postpaid or port your number to Airtel from another network.",
    icon: "ArrowRightLeft",
    issueType: "Port/Upgrade",
  },
  {
    id: "other",
    title: "Other Query / Raise Ticket",
    description: "Facing network, billing, or other issues? Raise a support ticket.",
    icon: "LifeBuoy",
    issueType: "General Query",
  },
];

// ---- Issue Types for Dropdown ----
export const issueTypes = [
  "Network Issue",
  "Billing Query",
  "New Connection",
  "SIM Replacement",
  "Reactivation",
  "Port/Upgrade",
  "Data Speed Issue",
  "Roaming",
  "Value Added Services",
  "General Query",
];

// ---- Plans ----
export const mockPlans = {
  prepaid: [
    {
      id: 1,
      price: "299",
      data: "1.5 GB/day",
      validity: "28 Days",
      calls: "Unlimited",
      sms: "100 SMS/day",
      tag: null,
    },
    {
      id: 2,
      price: "499",
      data: "3 GB/day",
      validity: "28 Days",
      calls: "Unlimited",
      sms: "100 SMS/day",
      benefits: ["Disney+ Hotstar Mobile"],
      tag: "Popular",
    },
    {
      id: 3,
      price: "999",
      data: "2.5 GB/day",
      validity: "84 Days",
      calls: "Unlimited",
      sms: "100 SMS/day",
      benefits: ["Amazon Prime Lite"],
      tag: "Best Value",
    },
    {
      id: 10,
      price: "179",
      data: "1 GB/day",
      validity: "28 Days",
      calls: "Unlimited",
      sms: "100 SMS/day",
      tag: "Budget",
    },
  ],
  postpaid: [
    {
      id: 4,
      price: "399",
      data: "40 GB/month",
      calls: "Unlimited",
      sms: "100 SMS/day",
      benefits: ["Data Rollover up to 200 GB"],
      tag: null,
    },
    {
      id: 5,
      price: "499",
      data: "75 GB/month",
      calls: "Unlimited",
      sms: "100 SMS/day",
      benefits: ["Amazon Prime", "Disney+ Hotstar"],
      tag: "Best Seller",
    },
    {
      id: 6,
      price: "999",
      data: "150 GB/month",
      calls: "Unlimited",
      sms: "Unlimited",
      benefits: ["Netflix Basic", "Amazon Prime", "Disney+ Hotstar"],
      tag: "Premium",
    },
  ],
  broadband: [
    {
      id: 7,
      price: "799",
      data: "Unlimited (3.3 TB FUP)",
      speed: "100 Mbps",
      calls: "Unlimited Local + STD",
      benefits: ["Airtel Xstream App"],
      tag: null,
    },
    {
      id: 8,
      price: "1099",
      data: "Unlimited (3.3 TB FUP)",
      speed: "200 Mbps",
      calls: "Unlimited Local + STD",
      benefits: ["Amazon Prime", "Disney+ Hotstar", "Airtel Xstream"],
      tag: "Popular",
    },
    {
      id: 9,
      price: "1599",
      data: "Unlimited (3.3 TB FUP)",
      speed: "300 Mbps",
      calls: "Unlimited Local + STD",
      benefits: ["Netflix", "Amazon Prime", "Disney+ Hotstar", "Airtel Xstream"],
      tag: "Entertainment",
    },
  ],
  dth: [
    {
      id: 11,
      price: "325",
      data: null,
      channels: "200+ Channels",
      validity: "28 Days",
      calls: null,
      benefits: ["HD Channels Included"],
      tag: null,
    },
    {
      id: 12,
      price: "475",
      data: null,
      channels: "300+ Channels",
      validity: "28 Days",
      calls: null,
      benefits: ["All HD Channels", "Recording 100 Hours"],
      tag: "Family",
    },
    {
      id: 13,
      price: "675",
      data: null,
      channels: "350+ Channels",
      validity: "28 Days",
      calls: null,
      benefits: ["4K Channels", "All HD", "Xstream Box Included"],
      tag: "Premium",
    },
  ],
};

// ---- Airtel Black Bundle Plans ----
export const bundlePlans = [
  {
    id: "black-1",
    price: "998",
    name: "Airtel Black Basic",
    services: ["Fiber 40 Mbps", "Postpaid ₹399"],
    tag: null,
  },
  {
    id: "black-2",
    price: "1099",
    name: "Airtel Black Value",
    services: ["Fiber 100 Mbps", "Unlimited Landline", "Postpaid ₹399"],
    tag: null,
  },
  {
    id: "black-3",
    price: "1598",
    name: "Airtel Black Premium",
    services: ["Fiber 200 Mbps", "DTH 300+ Ch", "2 Postpaid Lines"],
    tag: "Bestseller",
  },
  {
    id: "black-4",
    price: "2099",
    name: "Airtel Black Ultra",
    services: ["Fiber 300 Mbps", "DTH 4K Box", "2 Postpaid Lines", "Netflix Basic"],
    tag: "Premium",
  },
];

// ---- Mock Service Requests ----
export const mockRequests = [
  {
    id: "SR-8823910",
    type: "Network Issue",
    description: "Frequent call drops in sector 45, Gurgaon",
    date: "2026-04-20",
    status: "Resolved",
    lastUpdate: "2026-04-22",
  },
  {
    id: "SR-8845021",
    type: "SIM Replacement",
    description: "Lost SIM card — replacement requested for 98XXXX5432",
    date: "2026-04-22",
    status: "In Progress",
    lastUpdate: "2026-04-24",
  },
  {
    id: "SR-8859932",
    type: "Billing Query",
    description: "Extra charges on April 2026 postpaid bill",
    date: "2026-04-23",
    status: "Pending",
    lastUpdate: "2026-04-23",
  },
  {
    id: "SR-8867201",
    type: "Port/Upgrade",
    description: "Port number from Jio to Airtel postpaid ₹499 plan",
    date: "2026-04-24",
    status: "In Progress",
    lastUpdate: "2026-04-25",
  },
  {
    id: "SR-8870344",
    type: "Reactivation",
    description: "Reactivate prepaid number 70XXXX1234 — suspended 3 months ago",
    date: "2026-04-25",
    status: "Pending",
    lastUpdate: "2026-04-25",
  },
];

// ---- FAQs ----
export const faqs = [
  {
    question: "How do I track my new SIM delivery?",
    answer:
      "Navigate to the 'Track Requests' page from the top navigation and enter your service request number (e.g., SR-XXXXXXX) to see real-time delivery status.",
  },
  {
    question: "What is Airtel Black?",
    answer:
      "Airtel Black is a premium bundle that combines your Postpaid mobile, DTH, and Fiber broadband connections into a single bill. You also get priority customer support and exclusive benefits.",
  },
  {
    question: "How can I upgrade my prepaid to postpaid?",
    answer:
      "Use the 'Upgrade/Port Request' option on the Help Desk page, or visit the Plans page to directly select a Postpaid plan. An Airtel representative will contact you to complete the process.",
  },
  {
    question: "How do I port my number to Airtel?",
    answer:
      "Send an SMS 'PORT <your 10-digit number>' to 1900 to get a UPC (Unique Porting Code). Then visit our Help Desk and select 'Upgrade/Port Request', or visit the nearest Airtel store with your UPC and ID proof.",
  },
  {
    question: "What should I do if my SIM is lost or stolen?",
    answer:
      "Immediately call Airtel customer care at 121 or use the Help Desk to raise a 'Replace Lost/Damaged SIM' request. We'll block your old SIM to prevent misuse and dispatch a replacement.",
  },
  {
    question: "How can I check my data balance?",
    answer:
      "Dial *121# from your Airtel number, or open the Airtel Thanks app to view your current data balance, validity, and usage history.",
  },
  {
    question: "Are there any charges for number porting?",
    answer:
      "Porting your number to Airtel is completely free. You only pay for the plan you select at the time of porting.",
  },
];

// ---- Hero Carousel Slides ----
export const heroSlides = [
  {
    id: 1,
    title: "Experience 5G",
    subtitle: "Lightning-fast connectivity for the future.",
    highlight: "Unlimited 5G Data",
    cta: "Explore Plans",
    ctaLink: "/plans",
  },
  {
    id: 2,
    title: "Airtel Black",
    subtitle: "One family. One plan. One bill.",
    highlight: "Save up to ₹1200/month",
    cta: "View Bundles",
    ctaLink: "/bundles",
  },
  {
    id: 3,
    title: "Need Help?",
    subtitle: "24/7 support at your fingertips.",
    highlight: "Instant ticket resolution",
    cta: "Visit Help Desk",
    ctaLink: "/helpdesk",
  },
];

// ---- Promotional Banners ----
export const promoBanners = [
  {
    id: 1,
    title: "₹100 Cashback",
    description: "On recharges of ₹499 & above via Airtel Thanks App",
    tag: "Limited Offer",
  },
  {
    id: 2,
    title: "Free Disney+ Hotstar",
    description: "With select prepaid plans starting ₹499",
    tag: "Entertainment",
  },
  {
    id: 3,
    title: "Fiber at ₹799/mo",
    description: "100 Mbps unlimited broadband for your home",
    tag: "Broadband",
  },
];
