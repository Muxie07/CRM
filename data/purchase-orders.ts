export const purchaseOrders = [
  {
    id: "po-001",
    poNumber: "PO-DIAC-2025-18",
    date: "2025-03-29",
    referenceNumber: "DIAC_PO_2024-25/40",
    modeOfPayment: "NEFT",
    orderReferences: "By Mail",

    dispatchDocNo: "Nil",
    dispatchedThrough: "Nil",
    deliveryNoteDate: "",

    consigneeName: "Mr. Karthik GR",
    consigneeAddress: "#775/A, 9th A Main, Indiranagar 1st Stage, Bengaluru - 560038",
    consigneeContact: "9741811177",
    consigneeState: "Karnataka",
    consigneeCode: "29",

    supplierName: "Cloud Infotech Pvt Ltd.",
    supplierAddress: "#D-92, Sector-63, Noida, Gautam Buddha Nagar, Uttar Pradesh -201301",
    supplierEmail: "info@cloudinfotech.co.in / j.venkateshwaran@cloudinfotech.co.in",
    supplierGstin: "09AAHCC3784F1ZG",
    supplierState: "Uttar Pradesh",

    termsOfDelivery: "nil",
    warranty: "1 year standard warranty",

    items: [
      {
        id: "item-001",
        hsnSac: "85176990",
        description: "Grandstream GWN7803P, Enterprise Layer 2+ Managed PoE Network Switch, 24 x GigE, 4 x SFP",
        quantity: 10,
        unit: "nos",
        unitPrice: 17200,
        amount: 172000,
      },
    ],

    subtotal: 172000,
    cgst: 15480,
    sgst: 15480,
    igst: 0,
    roundingOff: 0,
    totalAmount: 202960,

    amountInWords: "Two Lakhs Two thousand nine hundred Sixty only",
    remarks: "",
    status: "Pending",
  },
  {
    id: "po-002",
    poNumber: "PO-DIAC-2025-19",
    date: "2025-04-05",
    referenceNumber: "DIAC_PO_2024-25/41",
    modeOfPayment: "NEFT",
    orderReferences: "By Email",

    dispatchDocNo: "Nil",
    dispatchedThrough: "Nil",
    deliveryNoteDate: "",

    consigneeName: "DIAC Engineering",
    consigneeAddress: "C-124, MMDA Colony, Arumbakkam, Chennai - 600 106, Tamil Nadu, India",
    consigneeContact: "+9144 46902054",
    consigneeState: "Tamil Nadu",
    consigneeCode: "33",

    supplierName: "Netcom Solutions",
    supplierAddress: "Plot No. 45, Phase II, IDA, Cherlapally, Hyderabad - 500051, Telangana",
    supplierEmail: "orders@netcomsolutions.in",
    supplierGstin: "36AADCN4578P1ZX",
    supplierState: "Telangana",

    termsOfDelivery: "Door Delivery",
    warranty: "2 years comprehensive warranty",

    items: [
      {
        id: "item-001",
        hsnSac: "85176930",
        description: "Cisco Catalyst 9200L 24-port PoE+ Switch, 4 x 10G SFP+, Network Advantage",
        quantity: 2,
        unit: "nos",
        unitPrice: 185000,
        amount: 370000,
      },
      {
        id: "item-002",
        hsnSac: "85176290",
        description: "Cisco SFP-10G-SR Transceiver Module",
        quantity: 8,
        unit: "nos",
        unitPrice: 32500,
        amount: 260000,
      },
    ],

    subtotal: 630000,
    cgst: 56700,
    sgst: 56700,
    igst: 0,
    roundingOff: 0,
    totalAmount: 743400,

    amountInWords: "Seven Lakhs Forty Three Thousand Four Hundred only",
    remarks: "Delivery expected within 3 weeks",
    status: "Approved",
  },
]
