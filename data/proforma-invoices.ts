export interface ProformaInvoice {
  id: string
  number: string
  clientId: string
  clientName: string
  clientEmail: string
  clientAddress: string
  date: string
  dueDate: string
  items: {
    id: string
    description: string
    quantity: number
    unitPrice: number
  }[]
  notes: string
  terms: string
  status: "draft" | "sent" | "accepted" | "rejected" | "converted"
  totalAmount: number
  tax: number
  discount: number
  createdAt: string
  updatedAt: string
}

export const proformaInvoices: ProformaInvoice[] = [
  {
    id: "pi-001",
    number: "PI-2023-001",
    clientId: "client-001",
    clientName: "Reliance Power Grid Solutions",
    clientEmail: "procurement@reliancepowergrid.com",
    clientAddress: "12 Industrial Area, Phase 2, New Delhi, 110001",
    date: "2023-04-15",
    dueDate: "2023-05-15",
    items: [
      {
        id: "item-001",
        description: "Aluminum Terminal 240mm - Heavy Duty",
        quantity: 500,
        unitPrice: 120,
      },
      {
        id: "item-002",
        description: "Copper Terminal 95mm - Industrial Grade",
        quantity: 300,
        unitPrice: 180,
      },
      {
        id: "item-003",
        description: "Mechanical T-Connector - Weatherproof",
        quantity: 150,
        unitPrice: 250,
      },
    ],
    notes: "Proforma valid for 30 days. Delivery within 3 weeks of acceptance.",
    terms: "50% advance payment, balance before dispatch.",
    status: "sent",
    totalAmount: 154500,
    tax: 27810,
    discount: 7725,
    createdAt: "2023-04-10T10:30:00Z",
    updatedAt: "2023-04-10T10:30:00Z",
  },
  {
    id: "pi-002",
    number: "PI-2023-002",
    clientId: "client-002",
    clientName: "Tata Power Distribution",
    clientEmail: "orders@tatapowerdist.com",
    clientAddress: "45 Energy Park, Mumbai, 400001",
    date: "2023-04-20",
    dueDate: "2023-05-20",
    items: [
      {
        id: "item-004",
        description: "Insulation Piercing Connector - 10kV Rating",
        quantity: 200,
        unitPrice: 350,
      },
      {
        id: "item-005",
        description: "Ground Rod Clamp - Copper Alloy",
        quantity: 100,
        unitPrice: 180,
      },
    ],
    notes: "Prices include standard packaging. Special packaging available at additional cost.",
    terms: "Payment via bank transfer within 30 days of acceptance.",
    status: "accepted",
    totalAmount: 88000,
    tax: 15840,
    discount: 4400,
    createdAt: "2023-04-18T14:15:00Z",
    updatedAt: "2023-04-22T09:45:00Z",
  },
  {
    id: "pi-003",
    number: "PI-2023-003",
    clientId: "client-003",
    clientName: "Bharti Infratel",
    clientEmail: "procurement@bhartiinfra.com",
    clientAddress: "78 Telecom Hub, Gurgaon, 122001",
    date: "2023-05-05",
    dueDate: "2023-06-05",
    items: [
      {
        id: "item-006",
        description: "Fiber Splice Closure - 48 Core",
        quantity: 50,
        unitPrice: 1200,
      },
      {
        id: "item-007",
        description: "Cat6 Connector - Premium",
        quantity: 1000,
        unitPrice: 25,
      },
      {
        id: "item-008",
        description: "Network Patch Panel - 24 Port",
        quantity: 20,
        unitPrice: 3500,
      },
    ],
    notes: "Technical specifications attached separately.",
    terms: "Warranty: 2 years from date of installation.",
    status: "converted",
    totalAmount: 145000,
    tax: 26100,
    discount: 7250,
    createdAt: "2023-05-01T11:20:00Z",
    updatedAt: "2023-05-10T16:30:00Z",
  },
  {
    id: "pi-004",
    number: "PI-2023-004",
    clientId: "client-004",
    clientName: "NTPC Limited",
    clientEmail: "supplies@ntpc.co.in",
    clientAddress: "56 Power Plaza, Noida, 201301",
    date: "2023-05-12",
    dueDate: "2023-06-12",
    items: [
      {
        id: "item-009",
        description: "Hydraulic Crimping Tool - Industrial",
        quantity: 10,
        unitPrice: 12500,
      },
      {
        id: "item-010",
        description: "Cable Cutter Tool - Heavy Duty",
        quantity: 15,
        unitPrice: 8000,
      },
    ],
    notes: "Training on tool usage included in price.",
    terms: "Delivery: Ex-works. Transportation to be arranged by buyer.",
    status: "draft",
    totalAmount: 245000,
    tax: 44100,
    discount: 12250,
    createdAt: "2023-05-10T09:15:00Z",
    updatedAt: "2023-05-10T09:15:00Z",
  },
  {
    id: "pi-005",
    number: "PI-2023-005",
    clientId: "client-005",
    clientName: "L&T Construction",
    clientEmail: "materials@lntconstruction.com",
    clientAddress: "34 Engineering Complex, Chennai, 600001",
    date: "2023-05-18",
    dueDate: "2023-06-18",
    items: [
      {
        id: "item-011",
        description: "Exothermic Welding Mold - Standard",
        quantity: 25,
        unitPrice: 4500,
      },
      {
        id: "item-012",
        description: "Grounding Lug - Heavy Duty",
        quantity: 200,
        unitPrice: 350,
      },
      {
        id: "item-013",
        description: "Hot Line Clamp - 33kV Rating",
        quantity: 100,
        unitPrice: 750,
      },
    ],
    notes: "Prices valid for bulk order only.",
    terms: "Cancellation charges apply after acceptance.",
    status: "rejected",
    totalAmount: 202500,
    tax: 36450,
    discount: 10125,
    createdAt: "2023-05-15T13:40:00Z",
    updatedAt: "2023-05-20T10:25:00Z",
  },
]
