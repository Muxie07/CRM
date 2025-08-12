"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createPurchaseOrder(formData: FormData) {
  // Extract data from form
  const poNumber = formData.get("poNumber") as string
  const date = new Date(formData.get("date") as string)
  const referenceNumber = formData.get("referenceNumber") as string
  const paymentTerms = formData.get("paymentTerms") as string
  const orderReferences = formData.get("orderReferences") as string

  // Company info
  const companyName = formData.get("companyName") as string
  const companyAddress = formData.get("companyAddress") as string
  const companyGstin = formData.get("companyGstin") as string
  const companyEmail = formData.get("companyEmail") as string
  const companyPhone = formData.get("companyPhone") as string
  const companyPan = formData.get("companyPan") as string

  // Consignee info
  const consigneeName = formData.get("consigneeName") as string
  const consigneeAddress = formData.get("consigneeAddress") as string
  const consigneeContact = formData.get("consigneeContact") as string
  const consigneeState = formData.get("consigneeState") as string
  const consigneeStateCode = formData.get("consigneeStateCode") as string

  // Supplier info
  const supplierName = formData.get("supplierName") as string
  const supplierAddress = formData.get("supplierAddress") as string
  const supplierEmail = formData.get("supplierEmail") as string
  const supplierGstin = formData.get("supplierGstin") as string
  const supplierState = formData.get("supplierState") as string

  // Delivery info
  const dispatchDocNo = formData.get("dispatchDocNo") as string
  const deliveryNoteDate = formData.get("deliveryNoteDate") as string
  const deliveryTerms = formData.get("deliveryTerms") as string
  const warrantyPeriod = formData.get("warrantyPeriod") as string
  const warrantyTerms = formData.get("warrantyTerms") as string

  // Items
  const itemCount = Number.parseInt(formData.get("itemCount") as string)
  const items = []

  for (let i = 0; i < itemCount; i++) {
    const hsnSac = formData.get(`items[${i}].hsnSac`) as string
    const description = formData.get(`items[${i}].description`) as string
    const quantity = Number.parseInt(formData.get(`items[${i}].quantity`) as string)
    const unit = formData.get(`items[${i}].unit`) as string
    const rate = Number.parseFloat(formData.get(`items[${i}].rate`) as string)
    const amount = Number.parseFloat(formData.get(`items[${i}].amount`) as string)

    items.push({
      hsnSac,
      description,
      quantity,
      unit,
      rate,
      amount,
    })
  }

  // Totals
  const subTotal = Number.parseFloat(formData.get("subTotal") as string)
  const cgst = Number.parseFloat(formData.get("cgst") as string)
  const sgst = Number.parseFloat(formData.get("sgst") as string)
  const roundingOff = Number.parseFloat(formData.get("roundingOff") as string)
  const grandTotal = Number.parseFloat(formData.get("grandTotal") as string)
  const amountInWords = formData.get("amountInWords") as string
  const remarks = formData.get("remarks") as string

  try {
    // In a real application, you would save this to your database
    // For now, we'll just log it and redirect
    console.log("Creating purchase order:", {
      poNumber,
      date,
      referenceNumber,
      paymentTerms,
      orderReferences,
      company: {
        name: companyName,
        address: companyAddress,
        gstin: companyGstin,
        email: companyEmail,
        phone: companyPhone,
        pan: companyPan,
      },
      consignee: {
        name: consigneeName,
        address: consigneeAddress,
        contact: consigneeContact,
        state: consigneeState,
        stateCode: consigneeStateCode,
      },
      supplier: {
        name: supplierName,
        address: supplierAddress,
        email: supplierEmail,
        gstin: supplierGstin,
        state: supplierState,
      },
      dispatchDocNo,
      deliveryNoteDate,
      deliveryTerms,
      warrantyPeriod,
      warrantyTerms,
      items,
      subTotal,
      cgst,
      sgst,
      roundingOff,
      grandTotal,
      amountInWords,
      remarks,
    })

    // Revalidate the purchase orders page
    revalidatePath("/admin/purchase-orders")

    // Redirect to the purchase orders page
    redirect("/admin/purchase-orders")
  } catch (error) {
    console.error("Error creating purchase order:", error)
    throw new Error("Failed to create purchase order")
  }
}

export async function updatePurchaseOrder(id: string, formData: FormData) {
  // Extract data from form (same as createPurchaseOrder)
  // ...

  try {
    // In a real application, you would update this in your database
    // For now, we'll just log it and redirect
    console.log("Updating purchase order:", id)

    // Revalidate the purchase orders page
    revalidatePath("/admin/purchase-orders")
    revalidatePath(`/admin/purchase-orders/${id}`)

    // Redirect to the purchase order detail page
    redirect(`/admin/purchase-orders/${id}`)
  } catch (error) {
    console.error("Error updating purchase order:", error)
    throw new Error("Failed to update purchase order")
  }
}

export async function deletePurchaseOrder(id: string) {
  try {
    // In a real application, you would delete this from your database
    // For now, we'll just log it and redirect
    console.log("Deleting purchase order:", id)

    // Revalidate the purchase orders page
    revalidatePath("/admin/purchase-orders")

    // Redirect to the purchase orders page
    redirect("/admin/purchase-orders")
  } catch (error) {
    console.error("Error deleting purchase order:", error)
    throw new Error("Failed to delete purchase order")
  }
}

export async function getPurchaseOrders() {
  try {
    // In a real application, you would fetch this from your database
    // For now, we'll return sample data
    return [
      {
        id: "1",
        poNumber: "PO-DIAC-2025-18",
        date: new Date("2025-03-29"),
        referenceNumber: "DIAC_PO_2024-25/40",
        paymentTerms: "NEFT",
        orderReferences: "By Mail",
        company: {
          name: "DIAC Engineering",
          address: "#124, MMDA Colony, Arumbakkam, Chennai - 600 106, Tamil Nadu, India",
          gstin: "33AAWFD9550G1Z1",
          email: "diacengineering@gmail.com",
          phone: "+9144 46902054 /+91 9741811177",
          pan: "AAWFD9550G",
        },
        consignee: {
          name: "Mr. Karthik GR",
          address: "#775/A, 9th A Main, Indiranagar 1st Stage, Bengaluru - 560038",
          contact: "9741811177",
          state: "Karnataka",
          stateCode: "29",
        },
        supplier: {
          name: "Cloud Infotech Pvt Ltd.",
          address: "#D-92, Sector-63, Noida, Gautam Buddha Nagar, Uttar Pradesh -201301",
          email: "info@cloudinfotech.co.in / j.venkateshwaran@cloudinfotech.co.in",
          gstin: "09AAHCC3784F1ZG",
          state: "Uttar Pradesh",
        },
        dispatchDocNo: "Nil",
        deliveryNoteDate: "Nil",
        dispatchedThrough: "Nil",
        deliveryTerms: "nil",
        warrantyPeriod: "1",
        warrantyTerms: "year standard warranty",
        items: [
          {
            hsnSac: "85176990",
            description: "Grandstream GWN7803P, Enterprise Layer 2+ Managed PoE Network Switch, 24 x GigE, 4 x SFP",
            quantity: 10,
            unit: "nos",
            rate: 17200,
            amount: 172000,
          },
        ],
        subTotal: 172000,
        cgst: 15480,
        sgst: 15480,
        roundingOff: 0,
        grandTotal: 202960,
        amountInWords: "Two Lakhs Two thousand nine hundred Sixty only",
        remarks: "Company's PAN - AAWFD9550G",
      },
      {
        id: "2",
        poNumber: "PO-DIAC-2025-19",
        date: new Date("2025-04-05"),
        referenceNumber: "DIAC_PO_2024-25/41",
        paymentTerms: "Bank Transfer",
        orderReferences: "Telephonic",
        company: {
          name: "DIAC Engineering",
          address: "#124, MMDA Colony, Arumbakkam, Chennai - 600 106, Tamil Nadu, India",
          gstin: "33AAWFD9550G1Z1",
          email: "diacengineering@gmail.com",
          phone: "+9144 46902054 /+91 9741811177",
          pan: "AAWFD9550G",
        },
        consignee: {
          name: "Mr. Rajesh Kumar",
          address: "#42, Industrial Area, Phase 1, Peenya, Bengaluru - 560058",
          contact: "9845012345",
          state: "Karnataka",
          stateCode: "29",
        },
        supplier: {
          name: "Electro Systems Ltd.",
          address: "#15, SIDCO Industrial Estate, Ambattur, Chennai - 600098",
          email: "orders@electrosystems.in",
          gstin: "33AABCE4567F1ZX",
          state: "Tamil Nadu",
        },
        dispatchDocNo: "ES/DO/2025/042",
        deliveryNoteDate: "10-Apr-2025",
        dispatchedThrough: "BlueDart",
        deliveryTerms: "Door Delivery",
        warrantyPeriod: "2",
        warrantyTerms: "years comprehensive warranty",
        items: [
          {
            hsnSac: "85371000",
            description: "Programmable Logic Controller - Siemens S7-1200",
            quantity: 2,
            unit: "nos",
            rate: 45000,
            amount: 90000,
          },
          {
            hsnSac: "85371000",
            description: "HMI Panel - Siemens KTP700 Basic",
            quantity: 1,
            unit: "nos",
            rate: 35000,
            amount: 35000,
          },
        ],
        subTotal: 125000,
        cgst: 11250,
        sgst: 11250,
        roundingOff: 0,
        grandTotal: 147500,
        amountInWords: "One Lakh Forty Seven Thousand Five Hundred only",
        remarks: "Delivery within 2 weeks",
      },
    ]
  } catch (error) {
    console.error("Error fetching purchase orders:", error)
    throw new Error("Failed to fetch purchase orders")
  }
}

export async function getPurchaseOrderById(id: string) {
  try {
    // In a real application, you would fetch this from your database
    // For now, we'll return sample data
    const purchaseOrders = await getPurchaseOrders()
    const purchaseOrder = purchaseOrders.find((po) => po.id === id)

    if (!purchaseOrder) {
      throw new Error("Purchase order not found")
    }

    return purchaseOrder
  } catch (error) {
    console.error("Error fetching purchase order:", error)
    throw new Error("Failed to fetch purchase order")
  }
}
