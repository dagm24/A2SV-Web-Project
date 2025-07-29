import { Calendar } from "lucide-react"
import { Droplets } from "lucide-react"
import { MapPin } from "lucide-react"
import { CheckCircle } from "lucide-react"

export type JobType = {
  title: string
  description: string
  responsibilities: string[]
  ideal_candidate: {
    age: string
    gender: string
    traits: string[]
  }
  when_where: string
  about: {
    posted_on: string
    deadline: string
    location: string
    start_date: string
    end_date: string
    categories: string[]
    required_skills: string[]
  }
  company: string
  image?: string
}

interface JobDetailsProps {
  job: JobType
  onBack?: () => void
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onBack }) => {
  if (!job) return null
  return (
    <div className="min-h-screen bg-[#ffffff] p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Back Button */}
          {onBack && (
            <button onClick={onBack} className="mb-4 px-4 py-2 bg-[#25324b] text-white rounded-lg">Back</button>
          )}
          {/* Description Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#25324b] mb-4">Role Overview</h2>
            <p className="text-[#515b6f] leading-relaxed">
              As a <span className="font-semibold text-[#25324b]">{job.title}</span>, you will collaborate closely with our marketing team to execute creative social media strategies and campaigns. Your mission is to boost brand visibility, foster positive relationships with our audience, and drive engagement and conversions through compelling content and community interaction.
            </p>
          </div>

          {/* Responsibilities Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#25324b] mb-6">Key Responsibilities</h2>
            <div className="space-y-4">
              {job.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#56cdad] mt-0.5 flex-shrink-0" />
                  <p className="text-[#515b6f]">{resp}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ideal Candidate Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#25324b] mb-6">Who We're Looking For</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#25324b] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-[#25324b]">
                    {job.ideal_candidate.age} year old {job.ideal_candidate.gender} with a passion for social media and community engagement
                  </span>
                </div>
              </div>
              {job.ideal_candidate.traits.map((trait, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#25324b] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-[#515b6f]">{trait}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* When & Where Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#25324b] mb-6">Onboarding Event</h2>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#26a4ff] mt-0.5 flex-shrink-0" />
              <p className="text-[#515b6f]">{job.when_where}</p>
            </div>
          </div>
        </div>

        {/* Right Column - About Section */}
        <div className="lg:col-span-1">
          <div className="bg-[#f8f8fd] rounded-lg p-6 space-y-6">
            <h3 className="text-2xl font-bold text-[#25324b]">About This Opportunity</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d6ddeb] rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#26a4ff]" />
                </div>
                <div>
                  <p className="text-sm text-[#515b6f]">Posted On</p>
                  <p className="font-semibold text-[#25324b]">{job.about.posted_on}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d6ddeb] rounded-full flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-[#26a4ff]" />
                </div>
                <div>
                  <p className="text-sm text-[#515b6f]">Deadline</p>
                  <p className="font-semibold text-[#25324b]">{job.about.deadline}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d6ddeb] rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#26a4ff]" />
                </div>
                <div>
                  <p className="text-sm text-[#515b6f]">Location</p>
                  <p className="font-semibold text-[#25324b]">{job.about.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d6ddeb] rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#26a4ff]" />
                </div>
                <div>
                  <p className="text-sm text-[#515b6f]">Start Date</p>
                  <p className="font-semibold text-[#25324b]">{job.about.start_date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d6ddeb] rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#26a4ff]" />
                </div>
                <div>
                  <p className="text-sm text-[#515b6f]">End Date</p>
                  <p className="font-semibold text-[#25324b]">{job.about.end_date}</p>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xl font-bold text-[#25324b] mb-3">Categories</h4>
              <div className="flex gap-2">
                {job.about.categories.map((cat, idx) => (
                  <span key={cat + idx} className={
                    idx === 0
                      ? "px-3 py-1 bg-[#ffb836] text-white text-sm rounded-full"
                      : idx === 1
                        ? "px-3 py-1 bg-[#56cdad] text-white text-sm rounded-full"
                        : "px-3 py-1 bg-[#4640de] text-white text-sm rounded-full"
                  }>{cat}</span>
                ))}
              </div>
            </div>

            {/* Required Skills */}
            <div>
              <h4 className="text-xl font-bold text-[#25324b] mb-3">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job.about.required_skills.map((skill, idx) => (
                  <span key={skill + idx} className="px-3 py-1 bg-[#4640de] text-white text-sm rounded-full">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetails
