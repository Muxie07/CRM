import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default async function Home() {
  // No database queries on the homepage to avoid errors

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="w-full py-8 md:py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-full space-y-4 text-center mb-8">
              <div className="inline-flex items-center bg-[#8B0000] text-white px-3 py-1 rounded-full text-xs">
                <span>15+ Years of Experience</span>
              </div>
              <p className="text-gray-600 max-w-md mx-auto">
                Streamlined customer management, inventory tracking, and service scheduling for DIAC ENGINEERING.
              </p>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-black">DIAC</span> <span className="text-[#8B0000]">ENGINEERING</span>
              </h1>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/login"
                  className="bg-[#8B0000] text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 whitespace-nowrap hover:bg-[#6B0000] transition-colors"
                >
                  Login to CRM
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="w-full max-w-3xl">
              <Image
                src="/factory-floor-activity.png"
                alt="Engineering Operations"
                width={800}
                height={500}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-4 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#8B0000]/10 text-[#8B0000] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>Our Features</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#8B0000] to-[#C00000]">
              Powerful CRM Features
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Everything you need to manage your engineering operations in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 bg-[#8B0000]/10 w-16 h-16 flex items-center justify-center rounded-xl">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                    stroke="#8B0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21"
                    stroke="#8B0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 7C20 8.10457 19.1046 9 18 9C16.8954 9 16 8.10457 16 7C16 5.89543 16.8954 5 18 5C19.1046 5 20 5.89543 20 7Z"
                    stroke="#8B0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 15H22C22 13.9391 21.5786 12.9217 20.8284 12.1716C20.0783 11.4214 19.0609 11 18 11C17.47 11 16.96 11.11 16.5 11.29"
                    stroke="#8B0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 7C4 8.10457 4.89543 9 6 9C7.10457 9 8 8.10457 8 7C8 5.89543 7.10457 5 6 5C4.89543 5 4 5.89543 4 7Z"
                    stroke="#8B0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 15H2C2 13.9391 2.42143 12.9217 3.17157 12.1716C3.92172 11.4214 4.93913 11 6 11C6.53 11 7.04 11.11 7.5 11.29"
                    stroke="#8B0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Customer Management</h3>
              <p className="text-gray-600">
                Track customer information, purchase history, and service records in one centralized database.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 bg-[#8B0000]/10 w-16 h-16 flex items-center justify-center rounded-xl">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 3H4C2.89543 3 2 3.89543 2 5V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V5C22 3.89543 21.1046 3 20 3Z"
                    stroke="#8B0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M12 8V16" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 12H16" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 9H22" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Inventory Management</h3>
              <p className="text-gray-600">
                Keep track of equipment inventory, parts, and accessories with real-time stock updates.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 bg-[#8B0000]/10 w-16 h-16 flex items-center justify-center rounded-xl">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2V6" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 2V6" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 10H21" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                    stroke="#8B0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 16L10 14H14L12 16Z"
                    stroke="#8B0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M9 14V12" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 14V12" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Service Scheduling</h3>
              <p className="text-gray-600">
                Efficiently schedule and manage service appointments, track service history, and send reminders.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 bg-[#8B0000]/10 w-16 h-16 flex items-center justify-center rounded-xl">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="#8B0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="#8B0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="#8B0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Project Management</h3>
              <p className="text-gray-600">
                Track project performance, manage tasks, and monitor the entire project pipeline from planning to
                completion.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 bg-[#8B0000]/10 w-16 h-16 flex items-center justify-center rounded-xl">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 20V10" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 20V4" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 20V14" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="2"
                    stroke="#8B0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Analytics & Reporting</h3>
              <p className="text-gray-600">
                Generate comprehensive reports on projects, service, inventory, and customer data for informed
                decision-making.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 bg-[#8B0000]/10 w-16 h-16 flex items-center justify-center rounded-xl">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                    stroke="#8B0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                    stroke="#8B0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Reminders & Notifications</h3>
              <p className="text-gray-600">
                Automated service reminders, follow-ups, and notifications to improve customer engagement and retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to streamline your engineering operations?</h2>
          <p className="text-xl mb-8">
            Get started with DIAC ENGINEERING CRM today and take your business to the next level.
          </p>
          <Link
            href="/login"
            className="bg-[#8B0000] text-white px-8 py-3 rounded-full inline-flex items-center justify-center gap-2 text-lg font-medium hover:bg-[#6B0000] transition-colors"
          >
            Login to CRM
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
