// src/JobApi.js

const SKILLS_LIST = [
  // (list remains unchanged)
  "JavaScript", "Python", "Java", "C++", "C#", "Go", "Swift", "Rust", "Kotlin",
  "TypeScript", "Ruby", "PHP", "Scala", "Perl", "Haskell", "Lua", "Dart",
  "Objective-C", "MATLAB", "R", "Shell", "PowerShell",
  "React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt.js", "jQuery", "Bootstrap",
  "Node.js", "Express.js", "Django", "Flask", "Spring Boot", "ASP.NET", "Laravel",
  "Ruby on Rails", "FastAPI", "GraphQL", "REST API",
  "React Native", "Flutter", "SwiftUI", "Android SDK", "Ionic",
  "PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "Oracle Database",
  "Microsoft SQL Server", "Firebase", "Elasticsearch", "Cassandra", "DynamoDB",
  "AWS", "Azure", "Google Cloud Platform", "Docker", "Kubernetes", "Terraform",
  "Ansible", "Jenkins", "GitLab CI/CD", "CircleCI", "Travis CI", "OpenShift",
  "Wireshark", "Nmap", "Metasploit", "Snort", "Burp Suite", "Nessus", "pfSense",
  "Git", "Webpack", "Babel", "ESLint", "Prettier", "npm", "Yarn", "Gulp", "Grunt",
  "Vite", "Figma", "Adobe XD", "JIRA", "Confluence", "Slack", "Trello", "Asana",
  "Machine Learning", "Deep Learning", "Artificial Intelligence", "Data Science",
  "Big Data", "Quantum Computing", "Blockchain", "Internet of Things (IoT)",
  "Augmented Reality (AR)", "Virtual Reality (VR)", "Edge Computing", "5G",
  "Vibe Coding"
];

const EDUCATION_LEVELS = {
  "Bachelor's": 0,
  "Master's": 0,
  "PhD": 0
};

// Define initial region counts for the four UK regions.
const REGION_COUNTS = {
  ENG: 0, // England
  SCT: 0, // Scotland
  WLS: 0, // Wales
  NIR: 0  // Northern Ireland
};

const JOB_FIELDS = [
  "software engineering",
  "software developer",
  "frontend developer",
  "full stack developer",
  "dev ops engineer"
];

const BLACKLIST_KEYWORDS = [
  "marketing",
  "sales",
  "recruiter",
  "accountant",
  "human resources"
];

export async function fetchTopSkills(numPages = 1) {
  try {
    console.warn("Using hardcoded data because API call is commented out.");

    // Return hardcoded data for testing
    return {
      topSkills: [
        ["JavaScript", 50],
        ["Python", 40],
        ["Java", 30],
        ["C++", 25],
        ["React", 20]
      ],
      jobCount: 500,
      educationCounts: {
        "Bachelor's": 200,
        "Master's": 150,
        "PhD": 50
      },
      regionPercentages: {
        ENG: "60.0",
        SCT: "20.0",
        WLS: "10.0",
        NIR: "10.0"
      }
    };

    /*
    // Original API call code (currently commented out)

    const rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    const rapidApiHost = import.meta.env.VITE_RAPIDAPI_HOST;

    let allJobs = [];

    for (const jobField of JOB_FIELDS) {
      for (let page = 1; page <= numPages; page++) {
        const query = encodeURIComponent(jobField);
        const url = `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": rapidApiKey,
            "X-RapidAPI-Host": rapidApiHost,
          },
        });

        const data = await response.json();
        const jobs = data.data || [];
        allJobs = allJobs.concat(jobs);
      }
    }

    console.log("Total jobs fetched:", allJobs.length);

    // Filter out jobs with blacklisted keywords
    const filteredJobs = allJobs.filter(job => {
      const description = (job.job_description || job.description || "").toLowerCase();
      const title = (job.job_title || job.title || "").toLowerCase();
      return !BLACKLIST_KEYWORDS.some(keyword =>
        description.includes(keyword.toLowerCase()) || title.includes(keyword.toLowerCase())
      );
    });

    console.log("Jobs after filtering:", filteredJobs.length);

    // Initialize counts for skills, education, and region
    const skillCounts = {};
    SKILLS_LIST.forEach(skill => {
      skillCounts[skill] = 0;
    });
    let educationCounts = { ...EDUCATION_LEVELS };
    let regionCounts = { ...REGION_COUNTS };

    // Count occurrences for each job
    filteredJobs.forEach(job => {
      const description = (job.job_description || job.description || "").toLowerCase();

      // Count skills
      SKILLS_LIST.forEach(skill => {
        if (description.includes(skill.toLowerCase())) {
          skillCounts[skill]++;
        }
      });

      // Count education levels
      if (description.includes("bachelor")) educationCounts["Bachelor's"]++;
      if (description.includes("master")) educationCounts["Master's"]++;
      if (description.includes("phd") || description.includes("doctorate")) educationCounts["PhD"]++;

      // Count region based on location field (adjust property names as needed)
      const location = (
        job.job_location ||
        job.job_city ||
        job.job_state ||
        job.job_country ||
        ""
      ).toLowerCase();

      if (location.includes("england")) {
        regionCounts.ENG++;
      } else if (location.includes("scotland")) {
        regionCounts.SCT++;
      } else if (location.includes("wales")) {
        regionCounts.WLS++;
      } else if (
        location.includes("northern ireland") ||
        location.includes("n. ireland") ||
        location.includes("ni ")
      ) {
        regionCounts.NIR++;
      }
    });

    // Sort and get top skills (top 10)
    const sortedSkills = Object.entries(skillCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    // Calculate region percentages based on total filtered jobs
    const totalJobs = filteredJobs.length || 1;
    const regionPercentages = {
      ENG: ((regionCounts.ENG / totalJobs) * 100).toFixed(2),
      SCT: ((regionCounts.SCT / totalJobs) * 100).toFixed(2),
      WLS: ((regionCounts.WLS / totalJobs) * 100).toFixed(2),
      NIR: ((regionCounts.NIR / totalJobs) * 100).toFixed(2)
    };

    return {
      topSkills: sortedSkills,
      jobCount: filteredJobs.length,
      educationCounts,
      regionPercentages // New region data
    };
    */
    
  } catch (error) {
    console.error("Error fetching skills data:", error);
    return {
      topSkills: [],
      jobCount: 0,
      educationCounts: { ...EDUCATION_LEVELS },
      regionPercentages: { ...REGION_COUNTS }
    };
  }
}
