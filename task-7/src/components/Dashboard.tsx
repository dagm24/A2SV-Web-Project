
import * as React from "react";
const { useState, useEffect } = React;
import { fetchOpportunities } from "../api";
import JobCard from "./JobCard";
import JobDetails from "./JobDetails";
import type { OpportunityType } from "../types";

const Dashboard: React.FC = () => {
  const [opportunities, setOpportunities] = useState<OpportunityType[]>([]);
  const [selectedJob, setSelectedJob] = useState<OpportunityType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOpportunities()
      .then((data) => {
        setOpportunities(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load opportunities.");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg text-[#25324b]">Loading opportunities...</div>
    </div>
  );
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg text-red-500">{error}</div>
    </div>
  );

  if (selectedJob) {
    return <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-bold text-[#25324b] mb-3">Opportunities</h1>
            <p className="text-[#7c8493] text-lg">Showing {opportunities.length} results</p>
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
          {opportunities.length === 0 ? (
            <div className="text-center text-[#7c8493]">No opportunities found.</div>
          ) : (
            opportunities.map((job: OpportunityType) => (
              <div key={job.id} onClick={() => setSelectedJob(job)} style={{ cursor: "pointer" }}>
                <JobCard job={job} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
