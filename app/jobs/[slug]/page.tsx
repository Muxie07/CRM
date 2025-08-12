import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft, ArrowUpRight, Clock, MapPin, FileText, Share2, Building, Calendar, Briefcase } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// This would typically come from a database
const getJobDetails = (slug: string) => {
  // Mock data for demonstration
  return {
    id: "1",
    company: "Caribou",
    logo: "/stylized-caribou-emblem.png",
    title: "Senior Product Designer Engineer",
    salary: "7LPA + Stock Options",
    location: "Koramangala, Bangalore",
    workType: "Full-time",
    workMode: "Remote",
    benefits: "Relocation Allowance",
    postedDays: 2,
    description: `
  <h2 class="text-2xl font-bold mb-4">About Caribou</h2>
  <p class="mb-6">Caribou is a fast-growing startup that is revolutionizing the way people interact with financial services. We're building a platform that makes it easy for people to manage their finances and make better financial decisions.</p>
  
  <h2 class="text-2xl font-bold mb-4">Job Description</h2>
  <p class="mb-6">We are looking for a Senior Product Designer Engineer to join our team. You will be responsible for designing and implementing user interfaces for our web and mobile applications. You will work closely with our product and engineering teams to create intuitive and engaging user experiences.</p>
  
  <h2 class="text-2xl font-bold mb-4">Responsibilities</h2>
  <ul class="list-disc pl-6 mb-6 space-y-2">
    <li>Design and implement user interfaces for web and mobile applications</li>
    <li>Work closely with product managers and engineers to define and implement new features</li>
    <li>Create wireframes, prototypes, and high-fidelity designs</li>
    <li>Conduct user research and usability testing</li>
    <li>Contribute to our design system and component library</li>
  </ul>
  
  <h2 class="text-2xl font-bold mb-4">Requirements</h2>
  <ul class="list-disc pl-6 mb-6 space-y-2">
    <li>5+ years of experience in product design</li>
    <li>Strong portfolio demonstrating your design process and outcomes</li>
    <li>Experience with design tools such as Figma, Sketch, or Adobe XD</li>
    <li>Experience with frontend development (HTML, CSS, JavaScript)</li>
    <li>Experience with React or similar frontend frameworks</li>
    <li>Strong communication and collaboration skills</li>
  </ul>
  
  <h2 class="text-2xl font-bold mb-4">Benefits</h2>
  <ul class="list-disc pl-6 mb-6 space-y-2">
    <li>Competitive salary and equity</li>
    <li>Health, dental, and vision insurance</li>
    <li>Flexible work hours and location</li>
    <li>Professional development budget</li>
    <li>Relocation assistance</li>
  </ul>
`,
    contactPerson: {
      name: "Hiring Manager",
      email: "hr.caribou@gmail.com",
      phone: "+91 9876543210",
      linkedin: "www.linkedin.com/hr",
    },
  }
}

export default function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = getJobDetails(params.slug)
  const { slug, id } = job

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-grow px-4 py-8 sm:py-12 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <Link href="/jobs" className="inline-flex items-center text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-[#f5efe6] w-16 h-16 flex items-center justify-center rounded-md">
                    {job.logo ? (
                      <Image
                        src={job.logo || "/placeholder.svg"}
                        alt={job.company}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    ) : (
                      <svg
                        width="30"
                        height="18"
                        viewBox="0 0 70 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="scale-125"
                      >
                        <path
                          d="M10 20C10 13.5 15 8 20 8C25 8 30 13.5 30 20C30 26.5 25 32 20 32C15 32 10 26.5 10 20Z"
                          fill="black"
                        />
                        <path
                          d="M25 15C25 11.5 28 8 32 8C36 8 39 11.5 39 15C39 18.5 36 22 32 22C28 22 25 18.5 25 15Z"
                          fill="black"
                        />
                        <path
                          d="M35 25C35 22.5 37 20 40 20C43 20 45 22.5 45 25C45 27.5 43 30 40 30C37 30 35 27.5 35 25Z"
                          fill="black"
                        />
                        <path
                          d="M42 15C42 13.5 43 12 45 12C47 12 48 13.5 48 15C48 16.5 47 18 45 18C43 18 42 16.5 42 15Z"
                          fill="black"
                        />
                        <path
                          d="M50 20C50 18.5 51 17 53 17C55 17 56 18.5 56 20C56 21.5 55 23 53 23C51 23 50 21.5 50 20Z"
                          fill="black"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-gray-700 text-base font-normal">{job.company}</h3>
                    <h1 className="text-2xl font-bold">{job.title}</h1>
                  </div>
                </div>
                <button className="p-2 rounded-full border border-gray-200">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{job.workType}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-full">
                  <span className="text-sm font-medium">{job.workMode}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-full">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{job.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 bg-gray-50 p-4 rounded-xl">
                <div className="flex flex-col gap-1 p-2">
                  <div className="text-gray-500 text-sm font-medium">Salary</div>
                  <div className="font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    {job.salary}
                  </div>
                </div>
                <div className="flex flex-col gap-1 p-2">
                  <div className="text-gray-500 text-sm font-medium">Job Type</div>
                  <div className="font-medium flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    {job.workType}
                  </div>
                </div>
                <div className="flex flex-col gap-1 p-2">
                  <div className="text-gray-500 text-sm font-medium">Company</div>
                  <div className="font-medium flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    {job.company}
                  </div>
                </div>
                <div className="flex flex-col gap-1 p-2">
                  <div className="text-gray-500 text-sm font-medium">Posted</div>
                  <div className="font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    {job.postedDays} days ago
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6" dangerouslySetInnerHTML={{ __html: job.description }}></div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={`mailto:${job.contactPerson.email}`}
                  className="py-2 px-6 border border-gray-300 rounded-full text-center font-medium flex-1 hover:bg-gray-50 transition-colors btn-hover-effect relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1200 ease-in-out pointer-events-none"></div>
                  Reach HR
                </a>
                <a
                  href={`https://apply.axtionable.in/jobs/${slug || id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-6 bg-black text-white rounded-full text-center font-medium flex items-center justify-center gap-2 flex-1 hover:bg-gray-800 transition-colors btn-hover-effect relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1200 ease-in-out pointer-events-none"></div>
                  Apply Now
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 sticky top-4">
              <h3 className="text-xl font-bold mb-6 border-b pb-3">Contact Information</h3>

              <div className="space-y-5">
                <div className="flex flex-col gap-1">
                  <div className="text-gray-500 text-sm font-medium">Contact Person</div>
                  <div className="font-medium">{job.contactPerson.name}</div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="text-gray-500 text-sm font-medium">Email</div>
                  <a
                    href={`mailto:${job.contactPerson.email}`}
                    className="font-medium text-blue-600 hover:underline flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    {job.contactPerson.email}
                  </a>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="text-gray-500 text-sm font-medium">Phone</div>
                  <a href={`tel:${job.contactPerson.phone}`} className="font-medium flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    {job.contactPerson.phone}
                  </a>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="text-gray-500 text-sm font-medium">LinkedIn</div>
                  <a
                    href={`https://${job.contactPerson.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    {job.contactPerson.linkedin}
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-bold mb-4">Company Location</h4>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src="/bangalore-city-map.png"
                    alt="Company Location Map"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">{job.location}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
