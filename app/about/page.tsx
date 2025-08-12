import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#8B0000]">About Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              DIAC Engineering is a Product Solution provider for Electrical, Electronics, Mechanical and Network
              Management System (Networking & Unified Communications) domain having over 15+ years of technical
              competence and experiences in the field.
            </p>
          </div>
        </section>

        {/* Our Objective */}
        <section className="w-full py-12 md:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-[#8B0000]">Our Objective</h2>
            <p className="text-lg text-gray-600 mb-6">
              Our Objective is to provide innovative and latest technology with high quality products to our valuable
              customers which allows us to offer integrated and diverse solutions adding a lot of values and customer
              satisfaction.
            </p>
            <p className="text-lg text-gray-600">
              Our core strength is our commitment to find the right Engineering Products across various applications in
              different sectors - Industrials, Utility, OEM's, Renewables, Infrastructure, Transportation, Oil and Gas,
              Telecom, Data Centers and Aerospace.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="w-full py-12 md:py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-[#8B0000]">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              We at DIAC are committed to value our customer needs with high quality, innovation and reliable
              engineering products by meeting the requirements of our customers and delivering error-free products and
              services on time.
            </p>
            <p className="text-lg text-gray-600">
              DIAC provides wide-range of products to help connect the power around the world with complete reliability
              which allows the customer to accomplish more than ever before.
            </p>
          </div>
        </section>

        {/* Hexagonal Images Section */}
        <section className="w-full py-12 md:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* Placeholder Images - Replace with actual images */}
              <Image
                src="/interconnected-electrical-grid.png"
                alt="Electrical Solutions"
                width={200}
                height={200}
                className="rounded-xl"
              />
              <Image
                src="/circuit-cityscape.png"
                alt="Electronics Engineering"
                width={200}
                height={200}
                className="rounded-xl"
              />
              <Image
                src="/gears-and-blueprint.png"
                alt="Mechanical Engineering"
                width={200}
                height={200}
                className="rounded-xl"
              />
              <Image
                src="/interconnected-network.png"
                alt="Network Management"
                width={200}
                height={200}
                className="rounded-xl"
              />
              <Image
                src="/sustainable-future-landscape.png"
                alt="Renewable Energy"
                width={200}
                height={200}
                className="rounded-xl"
              />
              <Image
                src="/interconnected-data-globe.png"
                alt="Data Centers"
                width={200}
                height={200}
                className="rounded-xl"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
