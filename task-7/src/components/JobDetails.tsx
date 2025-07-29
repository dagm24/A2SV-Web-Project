
import { Calendar } from "lucide-react";
import { Droplets } from "lucide-react";
import { MapPin } from "lucide-react";
import { CheckCircle } from "lucide-react";
import type { OpportunityType } from "../types";

interface JobDetailsProps {
  job: OpportunityType;
  onBack?: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onBack }) => {
  if (!job) return null;
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
              <span className="font-semibold text-[#25324b]">{job.title}</span>
            </p>
            <p className="text-[#515b6f] mt-2">{job.description}</p>
          </div>

          {/* Responsibilities Section */}
          {job.responsibilities && (
            <div>
              <h2 className="text-2xl font-bold text-[#25324b] mb-6">Key Responsibilities</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#56cdad] mt-0.5 flex-shrink-0" />
                  <p className="text-[#515b6f]">{job.responsibilities}</p>
                </div>
              </div>
            </div>
          )}

          {/* Requirements Section */}
          {job.requirements && (
            <div>
              <h2 className="text-2xl font-bold text-[#25324b] mb-6">Requirements</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#56cdad] mt-0.5 flex-shrink-0" />
                  <p className="text-[#515b6f]">{job.requirements}</p>
                </div>
              </div>
            </div>
          )}

          {/* Ideal Candidate Section */}
          {job.idealCandidate && (
            <div>
              <h2 className="text-2xl font-bold text-[#25324b] mb-6">Who We're Looking For</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#25324b] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-[#25324b]">{job.idealCandidate}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* When & Where Section */}
          {job.whenAndWhere && (
            <div>
              <h2 className="text-2xl font-bold text-[#25324b] mb-6">Event Details</h2>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#26a4ff] mt-0.5 flex-shrink-0" />
                <p className="text-[#515b6f]">{job.whenAndWhere}</p>
              </div>
            </div>
          )}
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
                  <p className="font-semibold text-[#25324b]">{job.datePosted || job.postedOn}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d6ddeb] rounded-full flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-[#26a4ff]" />
                </div>
                <div>
                  <p className="text-sm text-[#515b6f]">Deadline</p>
                  <p className="font-semibold text-[#25324b]">{job.deadline}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d6ddeb] rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#26a4ff]" />
                </div>
                <div>
                  <p className="text-sm text-[#515b6f]">Location</p>
                  <p className="font-semibold text-[#25324b]">{Array.isArray(job.location) ? job.location.join(", ") : job.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d6ddeb] rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#26a4ff]" />
                </div>
                <div>
                  <p className="text-sm text-[#515b6f]">Start Date</p>
                  <p className="font-semibold text-[#25324b]">{job.startDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d6ddeb] rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#26a4ff]" />
                </div>
                <div>
                  <p className="text-sm text-[#515b6f]">End Date</p>
                  <p className="font-semibold text-[#25324b]">{job.endDate}</p>
                </div>
              </div>
            </div>

            {/* Categories */}
            {job.categories && (
              <div>
                <h4 className="text-xl font-bold text-[#25324b] mb-3">Categories</h4>
                <div className="flex gap-2 flex-wrap">
                  {job.categories.map((cat, idx) => (
                    <span key={cat + idx} className="px-3 py-1 bg-[#4640de] text-white text-sm rounded-full">{cat}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Required Skills */}
            {job.requiredSkills && (
              <div>
                <h4 className="text-xl font-bold text-[#25324b] mb-3">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill, idx) => (
                    <span key={skill + idx} className="px-3 py-1 bg-[#56cdad] text-white text-sm rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
