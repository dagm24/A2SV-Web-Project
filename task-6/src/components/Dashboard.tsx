import React, { useState } from "react"
import { jobs } from "../data/jobs"
import JobCard from "./JobCard"
import JobDetails from "./JobDetails"

const Dashboard: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<null | typeof jobs[0]>(null)

  if (selectedJob) {
    return <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-bold text-[#25324b] mb-3">Opportunities</h1>
            <p className="text-[#7c8493] text-lg">Showing {jobs.length} results</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#7c8493] text-sm font-medium">Sort by:</span>
            <select
              defaultValue="most-relevant"
              className="px-4 py-2 border border-[#d6ddeb] rounded-lg bg-white text-[#25324b] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="most-relevant">Most relevant</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-8">
          {jobs.map((job, idx) => (
            <div key={idx} onClick={() => idx === 0 && setSelectedJob(job)} style={{ cursor: idx === 0 ? "pointer" : "default" }}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
