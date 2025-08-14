export interface Job {
  id?: string
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
  image: string
}

export interface JobsResponse {
  job_postings: Job[]
}

// API Response types
export interface ApiJob {
  id: string
  title: string
  description: string
  responsibilities?: string[]
  idealCandidate?: {
    age: string
    gender: string
    traits: string[]
  }
  whenAndWhere?: string
  datePosted?: string
  deadline?: string
  location?: string[] | string
  startDate?: string
  endDate?: string
  categories?: string[]
  requiredSkills?: string[]
  orgName?: string
  company?: string
  logoUrl?: string
}
