import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 sm:py-12">
      <div className="px-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center">
              <img src="/diac-logo.jpg" alt="DIAC ENGINEERING Logo" className="h-10 mr-2 bg-white p-1 rounded" />
            </div>
            <p className="text-gray-300 text-sm sm:text-base">DIAC ENGINEERING SERVICES ARUMBAKKAM CHENNAI</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:col-span-1 lg:col-span-2">
            <div>
              <h4 className="font-bold mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="text-gray-300 hover:text-white text-sm sm:text-base">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/customers" className="text-gray-300 hover:text-white text-sm sm:text-base">
                    Customers
                  </Link>
                </li>
                <li>
                  <Link href="/inventory" className="text-gray-300 hover:text-white text-sm sm:text-base">
                    Inventory
                  </Link>
                </li>
                <li>
                  <Link href="/service" className="text-gray-300 hover:text-white text-sm sm:text-base">
                    Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-300 text-sm sm:text-base">
                  Call:
                  <br />
                  <a href="tel:+914446902054" className="hover:text-white">
                    +91 44 4690 2054
                  </a>
                  <br />
                  <a href="tel:+919741811177" className="hover:text-white">
                    +91 97418 11177
                  </a>
                </li>
                <li>
                  Mail:
                  <br />
                  <a
                    href="mailto:SALES@DIACENGINEERING.COM"
                    className="text-gray-300 hover:text-white text-sm sm:text-base"
                  >
                    SALES@DIACENGINEERING.COM
                  </a>
                  <br />
                  <a
                    href="mailto:DIACENGINEERING@GMAIL.COM"
                    className="text-gray-300 hover:text-white text-sm sm:text-base"
                  >
                    DIACENGINEERING@GMAIL.COM
                  </a>
                </li>
                <li className="text-gray-300 text-sm sm:text-base">
                  Registered Office:
                  <br />
                  C-124, MMDA Colony, Arumbakkam, Chennai - 600 106, Tamil Nadu, India
                </li>
                <li>
                  Web Address:
                  <br />
                  <a
                    href="https://WWW.DIACENGINEERING.COM"
                    className="text-gray-300 hover:text-white text-sm sm:text-base"
                  >
                    WWW.DIACENGINEERING.COM
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 sm:mt-12 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
          © All Rights Reserved. {new Date().getFullYear()}. DIAC ENGINEERING
        </div>
      </div>
    </footer>
  )
}
