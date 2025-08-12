import { sql } from "@/lib/db"

// Example function to get users with the correct tagged template syntax
export async function getUsers() {
  try {
    // Using tagged template literals
    const users = await sql`SELECT * FROM users ORDER BY created_at DESC`
    return users
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

// Example function with parameters using tagged template literals
export async function getUserById(id: string) {
  try {
    // Using tagged template literals with parameters
    const user = await sql`SELECT * FROM users WHERE id = ${id}`
    return user[0] || null
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error)
    return null
  }
}

// Example function to create a user with the correct syntax
export async function createUser(name: string, email: string) {
  try {
    // Using tagged template literals for INSERT
    const result = await sql`
      INSERT INTO users (name, email) 
      VALUES (${name}, ${email}) 
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

// Example function to update a user with the correct syntax
export async function updateUser(id: string, name: string, email: string) {
  try {
    // Using tagged template literals for UPDATE
    const result = await sql`
      UPDATE users 
      SET name = ${name}, email = ${email} 
      WHERE id = ${id} 
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error)
    throw error
  }
}

// Example function to delete a user with the correct syntax
export async function deleteUser(id: string) {
  try {
    // Using tagged template literals for DELETE
    await sql`DELETE FROM users WHERE id = ${id}`
    return true
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error)
    return false
  }
}
