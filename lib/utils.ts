import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount)
}

// Convert number to words for Indian currency
export function numberToWords(num: number): string {
  const single = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ]

  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]

  const formatTens = (num: number): string => {
    if (num < 20) {
      return single[num]
    }
    return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + single[num % 10] : "")
  }

  const formatHundreds = (num: number): string => {
    if (num > 99) {
      return single[Math.floor(num / 100)] + " Hundred" + (num % 100 !== 0 ? " " + formatTens(num % 100) : "")
    }
    return formatTens(num)
  }

  const formatThousands = (num: number): string => {
    if (num >= 1000) {
      return (
        formatHundreds(Math.floor(num / 1000)) +
        " Thousand" +
        (num % 1000 !== 0 ? " " + formatHundreds(num % 1000) : "")
      )
    }
    return formatHundreds(num)
  }

  const formatLakhs = (num: number): string => {
    if (num >= 100000) {
      return (
        formatHundreds(Math.floor(num / 100000)) +
        " Lakh" +
        (num % 100000 !== 0 ? " " + formatThousands(num % 100000) : "")
      )
    }
    return formatThousands(num)
  }

  const formatCrores = (num: number): string => {
    if (num >= 10000000) {
      return (
        formatHundreds(Math.floor(num / 10000000)) +
        " Crore" +
        (num % 10000000 !== 0 ? " " + formatLakhs(num % 10000000) : "")
      )
    }
    return formatLakhs(num)
  }

  // Handle zero
  if (num === 0) {
    return "Zero"
  }

  // Split number into rupees and paise
  const rupees = Math.floor(num)
  const paise = Math.round((num - rupees) * 100)

  let result = formatCrores(rupees)

  if (paise > 0) {
    result += " and " + formatTens(paise) + " Paise"
  }

  return result
}
