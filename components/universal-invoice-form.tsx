// components/universal-invoice-form.tsx

import React from "react"

interface CompanyInfo {
  name: string
  logo: string
  address: string
  phone: string
  email: string
  gstin: string
}

const UniversalInvoiceForm: React.FC = () => {
  const defaultCompany: CompanyInfo = {
    name: "DIAC ENGINEERING",
    logo: "/diac-logo.jpg",
    address: "C-124, MMDA Colony\nArumbakkam, Chennai - 600 106",
    phone: "+9144 46902054 / +91 9741811177",
    email: "diacengineering@gmail.com",
    gstin: "33AAWFD9550G1Z1",
  }

  return (
    <div>
      <h1>Universal Invoice Form</h1>
      <h2>Company Information</h2>
      <p>
        <strong>Name:</strong> {defaultCompany.name}
      </p>
      <p>
        <strong>Address:</strong>{" "}
        {defaultCompany.address.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
      <p>
        <strong>Phone:</strong> {defaultCompany.phone}
      </p>
      <p>
        <strong>Email:</strong> {defaultCompany.email}
      </p>
      <p>
        <strong>GSTIN:</strong> {defaultCompany.gstin}
      </p>
      {/* Add more form elements here */}
    </div>
  )
}

export { UniversalInvoiceForm }
export default UniversalInvoiceForm
