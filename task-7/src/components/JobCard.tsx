import * as React from "react";
import type { OpportunityType } from "../types";

interface JobCardProps {
  job: OpportunityType;
}

const JobCard: React.FC<JobCardProps> = ({ job }: JobCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#d6ddeb] hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-6">
        {/* Logo/Avatar */}
        <div className="flex-shrink-0">
          {job.logoUrl ? (
            <img
              src={job.logoUrl}
              alt={job.orgName ? job.orgName + " logo" : "logo"}
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
              {job.orgName || job.company} • {Array.isArray(job.location) ? job.location.join(", ") : job.location}
            </p>
          </div>

          <p className="text-[#25324b] text-base leading-relaxed mb-8 max-w-4xl">
            {job.description && job.description.length > 200 ? job.description.slice(0, 200) + "..." : job.description}
          </p>

          {/* Tags */}
          <div className="flex gap-3 flex-wrap">
            {job.categories && job.categories.map((cat: string, idx: number) => (
              <span
                key={cat + idx}
                className="px-3 py-1 bg-[#4640de] text-white text-sm rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
