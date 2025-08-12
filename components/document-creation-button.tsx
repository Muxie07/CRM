import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface DocumentCreationButtonProps {
  documentType: "Purchase Order" | "Proforma Invoice" | "Invoice" | "Quotation" | "Receipt"
  href: string
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
}

export function DocumentCreationButton({ documentType, href, variant = "default" }: DocumentCreationButtonProps) {
  return (
    <Link href={href}>
      <Button className={variant === "default" ? "bg-blue-600 hover:bg-blue-700" : ""} variant={variant}>
        <Plus className="h-4 w-4 mr-2" />
        New {documentType}
      </Button>
    </Link>
  )
}
