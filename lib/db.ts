import { neon } from "@neondatabase/serverless"

// Create a SQL client with the connection string
const sql = neon(process.env.DATABASE_URL!)

// Helper function for executing queries using the tagged template syntax
export async function executeQuery<T>(query: string, ...values: any[]): Promise<T[]> {
  try {
    // Use the tagged template literal syntax
    return await sql`${query}`
  } catch (error) {
    console.error("Database query error:", error)
    // Return empty array instead of throwing to prevent page crashes
    return [] as T[]
  }
}

// Function for parameterized queries using tagged template literals
export async function executeParameterizedQuery<T>(strings: TemplateStringsArray, ...values: any[]): Promise<T[]> {
  try {
    // Use the tagged template literal syntax directly
    return await sql(strings, ...values)
  } catch (error) {
    console.error("Database query error:", error)
    // Return empty array instead of throwing to prevent page crashes
    return [] as T[]
  }
}

// Export the sql client for direct use with tagged templates
export { sql }
