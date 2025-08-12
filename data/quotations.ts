import type { QuotationData } from "@/components/quotation-template"

// Sample quotation data
const quotations: QuotationData[] = [
  {
    id: "sample-tn-001",
    quotationNumber: "QT-202501-001",
    quoteDate: "2025-01-28",
    validUntil: "2025-02-12",

    // Client information - Tamil Nadu customer
    clientName: "Chennai Power Solutions Pvt Ltd",
    clientContact: "Mr. Rajesh Kumar",
    clientAddress: "No. 45, Anna Salai,\nTeynampet,\nChennai - 600018,\nTamil Nadu",
    clientPhone: "+91 44 2434 5678",
    clientEmail: "rajesh.kumar@chennaipowersolutions.com",
    clientGstin: "33ABCDE1234F1Z5",
    clientState: "Tamil Nadu",

    // Company information
    companyName: "DIAC Engineering",
    companyAddress: "C-124, MMDA Colony, Arumbakkam, Chennai - 600 106",
    companyGstin: "33AAWFD9550G1Z1",
    companyEmail: "diacengineering@gmail.com",
    companyPhone: "+9144 46902054 / +91 9741811177",

    // Sample items
    items: [
      {
        id: "item-001",
        itemCode: "ELEC-TERM-001",
        description: "Aluminum Terminal Lugs 240mm² - Heavy Duty",
        hsnSac: "85369090",
        quantity: 50,
        unit: "nos",
        unitPrice: 125.0,
        amount: 6250.0,
        notes: "High conductivity aluminum terminals",
      },
      {
        id: "item-002",
        itemCode: "CONN-MECH-002",
        description: "Mechanical T-Connector for Overhead Lines",
        hsnSac: "85369090",
        quantity: 25,
        unit: "nos",
        unitPrice: 450.0,
        amount: 11250.0,
        notes: "Weather resistant coating",
      },
      {
        id: "item-003",
        itemCode: "TOOL-CRIMP-003",
        description: "Hydraulic Crimping Tool with Dies Set",
        hsnSac: "82041200",
        quantity: 2,
        unit: "nos",
        unitPrice: 15750.0,
        amount: 31500.0,
        notes: "Complete tool kit with carrying case",
      },
    ],

    // Calculated totals for Tamil Nadu (CGST + SGST for intra-state)
    subtotal: 49000.0,
    cgst: 4410.0, // 9% CGST on subtotal
    sgstOrUtgst: 4410.0, // 9% SGST on subtotal
    igst: 0, // Not applicable for intra-state
    deliveryCharges: 1500.0,
    grandTotal: 59320.0,

    // Amount in words
    amountInWords: "Fifty Nine Thousand Three Hundred Twenty Rupees Only",

    // Terms and conditions
    termsAndConditions: [
      "Our offer is valid for 15 days from the date of proposal and thereafter subject to change without notice. Scope of Supply as well as the Price Schedule may change subject to change in drawing.",
      "Our scope covers design, supply, erection & commissioning of the System.",
      "Provisioning of 415 V 3 PHZ Power Supply at the Terrace Level will be at your scope.",
      "Provisioning of access system - scaffolding/Power Crane Cradle for fixing of Monorail & Lifting of BMU at your scope.",
      "GST/Taxes as applicable will be charged extra.",
      "Payment Terms: (a) 30% advance with your acceptance of the Offer/issue of L.O.I. (b) 60% against delivery of material on PRO-RATA basis. (c) 10% on Installation & Handing Over",
      "Warranty: Warranty of the material is 12 months from the date of supply.",
      "Delivery Period: 12-14 weeks from the date of acceptance of the Shop drawings & receipt of advance.",
      "In case of cancellation of a confirmed order for any reason what so ever 10% of the order value shall have to be paid by you to us, as damages. In case any order is cancelled after dispatch of goods, packaging & forwarding, damages and to and fro freight shall be charged to your account in addition to the above.",
      "All terms are subject to Chennai Jurisdiction.",
    ],

    notes: "Sample quotation demonstrating CGST + SGST calculation for Tamil Nadu customer (intra-state)",
  },
  {
    id: "sample-ka-002",
    quotationNumber: "QT-202501-002",
    quoteDate: "2025-01-28",
    validUntil: "2025-02-12",

    // Client information - Karnataka customer (Interstate)
    clientName: "Bangalore Tech Industries",
    clientContact: "Ms. Priya Sharma",
    clientAddress: "Plot No. 123, Electronic City,\nPhase 1, Hosur Road,\nBangalore - 560100,\nKarnataka",
    clientPhone: "+91 80 2852 3456",
    clientEmail: "priya.sharma@bangaloretech.com",
    clientGstin: "29ABCDE1234F1Z5",
    clientState: "Karnataka",

    // Company information
    companyName: "DIAC Engineering",
    companyAddress: "C-124, MMDA Colony, Arumbakkam, Chennai - 600 106",
    companyGstin: "33AAWFD9550G1Z1",
    companyEmail: "diacengineering@gmail.com",
    companyPhone: "+9144 46902054 / +91 9741811177",

    // Sample items
    items: [
      {
        id: "item-001",
        itemCode: "ELEC-TERM-001",
        description: "Aluminum Terminal Lugs 240mm² - Heavy Duty",
        hsnSac: "85369090",
        quantity: 50,
        unit: "nos",
        unitPrice: 125.0,
        amount: 6250.0,
        notes: "High conductivity aluminum terminals",
      },
      {
        id: "item-002",
        itemCode: "CONN-MECH-002",
        description: "Mechanical T-Connector for Overhead Lines",
        hsnSac: "85369090",
        quantity: 25,
        unit: "nos",
        unitPrice: 450.0,
        amount: 11250.0,
        notes: "Weather resistant coating",
      },
      {
        id: "item-003",
        itemCode: "TOOL-CRIMP-003",
        description: "Hydraulic Crimping Tool with Dies Set",
        hsnSac: "82041200",
        quantity: 2,
        unit: "nos",
        unitPrice: 15750.0,
        amount: 31500.0,
        notes: "Complete tool kit with carrying case",
      },
    ],

    // Calculated totals for Karnataka (IGST for inter-state)
    subtotal: 49000.0,
    cgst: 0, // Not applicable for inter-state
    sgstOrUtgst: 0, // Not applicable for inter-state
    igst: 8820.0, // 18% IGST on subtotal
    deliveryCharges: 1500.0,
    grandTotal: 59320.0,

    // Amount in words
    amountInWords: "Fifty Nine Thousand Three Hundred Twenty Rupees Only",

    // Terms and conditions
    termsAndConditions: [
      "Our offer is valid for 15 days from the date of proposal and thereafter subject to change without notice. Scope of Supply as well as the Price Schedule may change subject to change in drawing.",
      "Our scope covers design, supply, erection & commissioning of the System.",
      "Provisioning of 415 V 3 PHZ Power Supply at the Terrace Level will be at your scope.",
      "Provisioning of access system - scaffolding/Power Crane Cradle for fixing of Monorail & Lifting of BMU at your scope.",
      "GST/Taxes as applicable will be charged extra.",
      "Payment Terms: (a) 30% advance with your acceptance of the Offer/issue of L.O.I. (b) 60% against delivery of material on PRO-RATA basis. (c) 10% on Installation & Handing Over",
      "Warranty: Warranty of the material is 12 months from the date of supply.",
      "Delivery Period: 12-14 weeks from the date of acceptance of the Shop drawings & receipt of advance.",
      "In case of cancellation of a confirmed order for any reason what so ever 10% of the order value shall have to be paid by you to us, as damages. In case any order is cancelled after dispatch of goods, packaging & forwarding, damages and to and fro freight shall be charged to your account in addition to the above.",
      "All terms are subject to Bangalore Jurisdiction.",
    ],

    notes: "Sample quotation demonstrating IGST calculation for interstate customer",
  },
]

// Function to get all quotations
export async function getQuotations(): Promise<QuotationData[]> {
  // In a real app, you would fetch this from an API or database
  return quotations
}

// Function to get a quotation by ID
export async function getQuotationById(id: string): Promise<QuotationData | undefined> {
  // In a real app, you would fetch this from an API or database
  return quotations.find((quotation) => quotation.id === id)
}

// Export the quotations array as well for direct access
export { quotations }
