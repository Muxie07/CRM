// Format currency to Indian Rupees format
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format date to local date format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Get due status based on due date
export const getDueStatus = (dueDate: string): string => {
  const today = new Date()
  const due = new Date(dueDate)

  // Clear time part for accurate date comparison
  today.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)

  const diffTime = due.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return `Overdue by ${Math.abs(diffDays)} days`
  } else if (diffDays === 0) {
    return "Due today"
  } else if (diffDays === 1) {
    return "Due tomorrow"
  } else {
    return `Due in ${diffDays} days`
  }
}
