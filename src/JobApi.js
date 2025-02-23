// src/JobApi.js

const SKILLS_LIST = [
  // Programming Languages
  "JavaScript", "Python", "Java", "C++", "C#", "Go", "Swift", "Rust", "Kotlin",
  "TypeScript", "Ruby", "PHP", "Scala", "Perl", "Haskell", "Lua", "Dart",
  "Objective-C", "MATLAB", "R", "Shell", "PowerShell",

  // Frontend Frameworks and Libraries
  "React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt.js", "jQuery", "Bootstrap",

  // Backend Frameworks and Technologies
  "Node.js", "Express.js", "Django", "Flask", "Spring Boot", "ASP.NET", "Laravel",
  "Ruby on Rails", "FastAPI", "GraphQL", "REST API",

  // Mobile Development
  "React Native", "Flutter", "SwiftUI", "Android SDK", "Ionic",

  // Databases and Data Management
  "PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "Oracle Database",
  "Microsoft SQL Server", "Firebase", "Elasticsearch", "Cassandra", "DynamoDB",

  // DevOps and Cloud Technologies
  "AWS", "Azure", "Google Cloud Platform", "Docker", "Kubernetes", "Terraform",
  "Ansible", "Jenkins", "GitLab CI/CD", "CircleCI", "Travis CI", "OpenShift",

  // Cybersecurity and Networking
  "Wireshark", "Nmap", "Metasploit", "Snort", "Burp Suite", "Nessus", "pfSense",

  // Other Tools and Technologies
  "Git", "Webpack", "Babel", "ESLint", "Prettier", "npm", "Yarn", "Gulp", "Grunt",
  "Vite", "Figma", "Adobe XD", "JIRA", "Confluence", "Slack", "Trello", "Asana",

  // Emerging Technologies
  "Machine Learning", "Deep Learning", "Artificial Intelligence", "Data Science",
  "Big Data", "Quantum Computing", "Blockchain", "Internet of Things (IoT)",
  "Augmented Reality (AR)", "Virtual Reality (VR)", "Edge Computing", "5G",
  "Vibe Coding"
];

// Define the job fields you want to search
const JOB_FIELDS = [
  "software engineering",
  "software developer",
  "frontend developer",
  "full stack developer",
  "dev ops engineer"
];

// Define keywords that should be blacklisted
const BLACKLIST_KEYWORDS = [
  "marketing",
  "sales",
  "recruiter",
  "accountant",
  "human resources",
  // Add more keywords as needed
];

export async function fetchTopSkills(numPages = 1) {
  try {
    const rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    const rapidApiHost = import.meta.env.VITE_RAPIDAPI_HOST;
  
    // Accumulate job listings from multiple pages and job fields
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
  
    // Filter out jobs that include any blacklisted keywords in the title or description
    const filteredJobs = allJobs.filter(job => {
      const description = job.job_description?.toLowerCase() || "";
      const title = job.job_title?.toLowerCase() || "";
      return !BLACKLIST_KEYWORDS.some(keyword =>
        description.includes(keyword.toLowerCase()) || title.includes(keyword.toLowerCase())
      );
    });
  
    // Initialize counts for each skill in SKILLS_LIST
    const skillCounts = {};
    SKILLS_LIST.forEach(skill => {
      skillCounts[skill] = 0;
    });
  
    // Count occurrences of each skill in the filtered job descriptions
    filteredJobs.forEach(job => {
      const description = job.job_description?.toLowerCase() || "";
      SKILLS_LIST.forEach(skill => {
        if (description.includes(skill.toLowerCase())) {
          skillCounts[skill]++;
        }
      });
    });
  
    // Sort and return top 5 skills
    const sortedSkills = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]);
    return sortedSkills.slice(0, 5);
  
  } catch (error) {
    console.error("Error fetching skills data:", error);
    return [];
  }
}