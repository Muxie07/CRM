"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Save } from "lucide-react"

export default function AdminSettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    dealershipName: "DIAC ENGINEERING",
    address: "123 Main Street, Villivakkam, Chennai, Tamil Nadu 600049",
    phone: "+91 9876543210",
    email: "info@diacengineering.com",
    website: "www.diacengineering.com",
    gstNumber: "33AABCT1234Z1Z5",
    dealerCode: "DIAC00123",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    serviceReminders: true,
    birthdayWishes: true,
    promotionalOffers: false,
    lowInventoryAlerts: true,
  })

  const [invoiceSettings, setInvoiceSettings] = useState({
    invoicePrefix: "DIAC",
    termsAndConditions:
      "1. All sales are final.\n2. Warranty as per manufacturer terms.\n3. Service must be done at authorized service centers.",
    bankDetails: "Bank: HDFC Bank\nAccount Number: 12345678901\nIFSC: HDFC0001234",
    showLogo: true,
    showGST: true,
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setInvoiceSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1000)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">System Settings</h1>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">Settings have been saved successfully!</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* General Settings */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-bold">General Settings</h2>
                <p className="text-sm text-gray-500">Basic information about your dealership</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dealershipName" className="block text-sm font-medium text-gray-700 mb-1">
                      Dealership Name
                    </label>
                    <input
                      type="text"
                      id="dealershipName"
                      name="dealershipName"
                      value={generalSettings.dealershipName}
                      onChange={handleGeneralChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      value={generalSettings.address}
                      onChange={handleGeneralChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={generalSettings.phone}
                      onChange={handleGeneralChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={generalSettings.email}
                      onChange={handleGeneralChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={generalSettings.website}
                      onChange={handleGeneralChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      GST Number
                    </label>
                    <input
                      type="text"
                      id="gstNumber"
                      name="gstNumber"
                      value={generalSettings.gstNumber}
                      onChange={handleGeneralChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="dealerCode" className="block text-sm font-medium text-gray-700 mb-1">
                      TVS Dealer Code
                    </label>
                    <input
                      type="text"
                      id="dealerCode"
                      name="dealerCode"
                      value={generalSettings.dealerCode}
                      onChange={handleGeneralChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-bold">Notification Settings</h2>
                <p className="text-sm text-gray-500">Configure how and when notifications are sent</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      name="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                      Email Notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="smsNotifications"
                      name="smsNotifications"
                      checked={notificationSettings.smsNotifications}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="smsNotifications" className="ml-2 block text-sm text-gray-900">
                      SMS Notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="serviceReminders"
                      name="serviceReminders"
                      checked={notificationSettings.serviceReminders}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="serviceReminders" className="ml-2 block text-sm text-gray-900">
                      Service Reminders
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="birthdayWishes"
                      name="birthdayWishes"
                      checked={notificationSettings.birthdayWishes}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="birthdayWishes" className="ml-2 block text-sm text-gray-900">
                      Birthday Wishes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="promotionalOffers"
                      name="promotionalOffers"
                      checked={notificationSettings.promotionalOffers}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="promotionalOffers" className="ml-2 block text-sm text-gray-900">
                      Promotional Offers
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="lowInventoryAlerts"
                      name="lowInventoryAlerts"
                      checked={notificationSettings.lowInventoryAlerts}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="lowInventoryAlerts" className="ml-2 block text-sm text-gray-900">
                      Low Inventory Alerts
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Settings */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-bold">Invoice Settings</h2>
                <p className="text-sm text-gray-500">Configure how invoices are generated and displayed</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="invoicePrefix" className="block text-sm font-medium text-gray-700 mb-1">
                      Invoice Prefix
                    </label>
                    <input
                      type="text"
                      id="invoicePrefix"
                      name="invoicePrefix"
                      value={invoiceSettings.invoicePrefix}
                      onChange={handleInvoiceChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="termsAndConditions" className="block text-sm font-medium text-gray-700 mb-1">
                      Terms and Conditions
                    </label>
                    <textarea
                      id="termsAndConditions"
                      name="termsAndConditions"
                      rows={4}
                      value={invoiceSettings.termsAndConditions}
                      onChange={handleInvoiceChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="bankDetails" className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Details
                    </label>
                    <textarea
                      id="bankDetails"
                      name="bankDetails"
                      rows={3}
                      value={invoiceSettings.bankDetails}
                      onChange={handleInvoiceChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showLogo"
                      name="showLogo"
                      checked={invoiceSettings.showLogo}
                      onChange={handleInvoiceChange}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="showLogo" className="ml-2 block text-sm text-gray-900">
                      Show Logo on Invoice
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showGST"
                      name="showGST"
                      checked={invoiceSettings.showGST}
                      onChange={handleInvoiceChange}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="showGST" className="ml-2 block text-sm text-gray-900">
                      Show GST Details
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
