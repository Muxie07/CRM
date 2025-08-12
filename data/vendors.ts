import type { Vendor } from "@/types/vendor"

export const vendors: Vendor[] = [
  {
    id: "vendor-001",
    companyName: "Mumbai Electrical Suppliers",
    address: "101 Industrial Estate, Andheri",
    city: "Mumbai",
    state: "Maharashtra",
    stateCode: "27", // Numeric GST code for Maharashtra
    pincode: "400093",
    gstNumber: "27ABCDE1234F1Z6", // GST Number
    contactNumber: "022-26876543",
    contactPerson: "Amit Shah",
    contactEmail: "amit@mumbaielectrical.com",
    category: "Interstate",
    createdAt: "2023-01-25T09:00:00Z",
    updatedAt: "2023-01-25T09:00:00Z",
  },
  {
    id: "vendor-002",
    companyName: "Delhi Components Pvt Ltd",
    address: "25 Lajpat Nagar, Phase II",
    city: "New Delhi",
    state: "Delhi",
    stateCode: "07", // Numeric GST code for Delhi
    pincode: "110024",
    gstNumber: "07FGHIJ5678G1Z1", // GST Number
    contactNumber: "011-45678901",
    contactPerson: "Sonia Kapoor",
    contactEmail: "sonia@delhicomponents.com",
    category: "Interstate",
    createdAt: "2023-02-01T11:30:00Z",
    updatedAt: "2023-02-01T11:30:00Z",
  },
  {
    id: "vendor-003",
    companyName: "Kolkata Wires & Cables",
    address: "5 Park Street",
    city: "Kolkata",
    state: "West Bengal",
    stateCode: "19", // Numeric GST code for West Bengal
    pincode: "700016",
    gstNumber: "19KLMNO9012H1Z8", // GST Number
    contactNumber: "033-22345678",
    contactPerson: "Rohan Das",
    contactEmail: "rohan@kolkatawires.com",
    category: "Interstate",
    createdAt: "2023-02-10T14:00:00Z",
    updatedAt: "2023-02-10T14:00:00Z",
  },
  {
    id: "vendor-004",
    companyName: "Ahmedabad Industrial Goods",
    address: "30 SG Highway",
    city: "Ahmedabad",
    state: "Gujarat",
    stateCode: "24", // Numeric GST code for Gujarat
    pincode: "380054",
    gstNumber: "24PQRST3456I1Z9", // GST Number
    contactNumber: "079-27890123",
    contactPerson: "Meena Patel",
    contactEmail: "meena@ahmedabadindustrial.com",
    category: "Interstate",
    createdAt: "2023-02-15T10:45:00Z",
    updatedAt: "2023-02-15T10:45:00Z",
  },
  {
    id: "vendor-005",
    companyName: "Pune Fasteners & Fittings",
    address: "45 Hinjewadi Phase 1",
    city: "Pune",
    state: "Maharashtra",
    stateCode: "27", // Numeric GST code for Maharashtra
    pincode: "411057",
    gstNumber: "27UVWXY7890J1Z0", // GST Number
    contactNumber: "020-27278899",
    contactPerson: "Sanjay Kulkarni",
    contactEmail: "sanjay@punefasteners.com",
    category: "Interstate",
    createdAt: "2023-02-20T16:10:00Z",
    updatedAt: "2023-02-20T16:10:00Z",
  },
]

export async function getVendors(): Promise<Vendor[]> {
  return vendors
}
