import type React from "react"

type Job = {
  title: string
  description: string
  company: string
  about: {
    location: string
    categories: string[]
  }
  image?: string
}

interface JobCardProps {
  job: Job
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#d6ddeb] hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-6">
        {/* Logo/Avatar */}
        <div className="flex-shrink-0">
          {job.image && job.image !== "." ? (
            <img
              src={job.image || "/placeholder.svg"}
              alt={job.company + " logo"}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#f1f3f7] bg-white"
            />
          ) : (
            <div className="w-20 h-20 bg-gradient-to-br from-[#ffb836] to-[#ff9500] rounded-2xl flex items-center justify-center shadow-sm">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 8C16 8 12 12 12 16V20C12 24 16 28 20 28C24 28 28 24 28 20V16C28 12 24 8 20 8Z"
                  fill="white"
                />
                <path d="M20 32C24 32 28 28 28 24H12C12 28 16 32 20 32Z" fill="white" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#25324b] mb-3 leading-tight">{job.title}</h2>
            <p className="text-[#7c8493] text-lg font-medium">
              {job.company} • {job.about.location}
            </p>
          </div>

          <p className="text-[#25324b] text-base leading-relaxed mb-8 max-w-4xl">
            {job.description.length > 200 ? job.description.slice(0, 200) + "..." : job.description}
          </p>

          {/* Tags */}
          <div className="flex gap-3 flex-wrap">
            {job.about.categories.map((cat, idx) => (
              <span
                key={cat + idx}
                className={
                  idx === 0
                    ? "px-5 py-2.5 bg-[#56cdad] bg-opacity-15 text-[#56cdad] rounded-full text-sm font-semibold border border-[#56cdad] border-opacity-20"
                    : idx === 1
                      ? "px-5 py-2.5 bg-[#ffb836] bg-opacity-15 text-[#ffb836] rounded-full text-sm font-semibold border border-[#ffb836] border-opacity-20"
                      : "px-5 py-2.5 bg-[#4640de] bg-opacity-15 text-[#4640de] rounded-full text-sm font-semibold border border-[#4640de] border-opacity-20"
                }
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobCard
