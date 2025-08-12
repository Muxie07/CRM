import { sql } from "./db"

export async function initializeDatabase() {
  try {
    // Check if users table exists
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'users'
      );
    `

    // If the table doesn't exist, create it
    if (!tableExists[0]?.exists) {
      console.log("Creating users table...")
      await sql`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
      console.log("Users table created successfully")
    }

    // Add more table initialization as needed

    return { success: true, message: "Database initialized successfully" }
  } catch (error) {
    console.error("Error initializing database:", error)
    return { success: false, message: "Failed to initialize database" }
  }
}
