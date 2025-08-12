"use server"

import { sql } from "@/lib/db"

// Get all clients
export async function getClients() {
  try {
    const clients = await sql`
      SELECT id, company_name, contact_person, contact_number, contact_email, gst_number
      FROM clients
      ORDER BY company_name ASC
    `
    return clients
  } catch (error) {
    console.error("Error fetching clients:", error)
    return []
  }
}

// Get a client by ID
export async function getClientById(id: string) {
  try {
    const client = await sql`
      SELECT * FROM clients WHERE id = ${id}
    `
    return client.length > 0 ? client[0] : null
  } catch (error) {
    console.error(`Error fetching client with ID ${id}:`, error)
    return null
  }
}
