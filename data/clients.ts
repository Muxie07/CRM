import type { Client } from "@/types/client"

export const clients: Client[] = [
  {
    id: "client-001",
    companyName: "Chennai Power Systems",
    address: "123 Anna Salai, Teynampet",
    city: "Chennai",
    state: "Tamil Nadu",
    stateCode: "33", // Updated to numeric GST code for Tamil Nadu
    pincode: "600018",
    gstNumber: "33AABCT1234A1Z5", // GST Number
    contactNumber: "044-28123456",
    contactPerson: "Rajesh Kumar",
    contactEmail: "rajesh@chennaipowersystems.com",
    category: "Tamil Nadu",
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z",
  },
  {
    id: "client-002",
    companyName: "Madurai Electrical Works",
    address: "45 North Veli Street",
    city: "Madurai",
    state: "Tamil Nadu",
    stateCode: "33", // Updated to numeric GST code for Tamil Nadu
    pincode: "625001",
    gstNumber: "33AADCM5678B1Z2", // GST Number
    contactNumber: "0452-2345678",
    contactPerson: "Sundar Raman",
    contactEmail: "sundar@maduraielectrical.com",
    category: "Tamil Nadu",
    createdAt: "2023-01-20T14:15:00Z",
    updatedAt: "2023-01-20T14:15:00Z",
  },
  {
    id: "client-003",
    companyName: "Bangalore Tech Solutions",
    address: "78 Electronics City Phase 1",
    city: "Bangalore",
    state: "Karnataka",
    stateCode: "29", // Updated to numeric GST code for Karnataka
    pincode: "560100",
    gstNumber: "29AAECB9012C1Z3", // GST Number
    contactNumber: "080-41234567",
    contactPerson: "Priya Sharma",
    contactEmail: "priya@bangaloretech.com",
    category: "Other States",
    createdAt: "2023-02-05T09:45:00Z",
    updatedAt: "2023-02-05T09:45:00Z",
  },
  {
    id: "client-004",
    companyName: "Hyderabad Power Controls",
    address: "56 Hitech City, Madhapur",
    city: "Hyderabad",
    state: "Telangana",
    stateCode: "36", // Updated to numeric GST code for Telangana
    pincode: "500081",
    gstNumber: "36AADCH3456D1Z7", // GST Number
    contactNumber: "040-67890123",
    contactPerson: "Venkat Reddy",
    contactEmail: "venkat@hyderabadpower.com",
    category: "Other States",
    createdAt: "2023-02-12T11:20:00Z",
    updatedAt: "2023-02-12T11:20:00Z",
  },
  {
    id: "client-005",
    companyName: "Coimbatore Industrial Supplies",
    address: "34 Avinashi Road",
    city: "Coimbatore",
    state: "Tamil Nadu",
    stateCode: "33", // Updated to numeric GST code for Tamil Nadu
    pincode: "641018",
    gstNumber: "33AAECC7890E1Z4", // GST Number
    contactNumber: "0422-2567890",
    contactPerson: "Anand Krishnan",
    contactEmail: "anand@coimbatoreindustrial.com",
    category: "Tamil Nadu",
    createdAt: "2023-02-18T16:30:00Z",
    updatedAt: "2023-02-18T16:30:00Z",
  },
]

export async function getClients(): Promise<Client[]> {
  return clients
}
