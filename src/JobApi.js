const SKILLS_LIST = [
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
  "Machine Learning", "Deep Learning", "Artificial Intelligence", "Data Science",
  "Big Data", "Quantum Computing", "Blockchain", "Internet of Things (IoT)",
  "Augmented Reality (AR)", "Virtual Reality (VR)", "Edge Computing", "5G"
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

// UK Cities Mapped to Regions (all lowercase)
const CITIES_TO_REGION = {
  ENG: [
    "london", "manchester", "birmingham", "leeds", "liverpool",
    "newcastle", "sheffield", "bristol", "nottingham", "leicester",
    "southampton", "portsmouth", "oxford", "cambridge", "norwich",
    "coventry", "derby", "exeter", "plymouth", "york", "reading",
    "milton keynes", "stoke-on-trent", "wolverhampton"
  ],
  SCT: [
    "edinburgh", "glasgow", "aberdeen", "dundee", "stirling",
    "inverness", "perth", "falkirk", "paisley", "ayr"
  ],
  WLS: [
    "cardiff", "swansea", "newport", "wrexham", "bangor",
    "aberystwyth", "llandudno", "caerphilly"
  ],
  NIR: [
    "belfast", "derry", "lisburn", "newry", "bangor",
    "armagh", "craigavon", "coleraine"
  ]
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

export async function fetchTopSkills(numPages = 1, selectedRole = "all", selectedRegion = "all") {
  try {
    const rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    const rapidApiHost = import.meta.env.VITE_RAPIDAPI_HOST;

    let allJobs = [];

    // Determine which roles to fetch based on the selectedRole
    const rolesToFetch = selectedRole === "all" ? JOB_FIELDS : [selectedRole];

    // Fetch jobs for each role and page
    for (const jobField of rolesToFetch) {
      for (let page = 1; page <= numPages; page++) {
        // Use the selectedRegion if not "all"; otherwise default to "united kingdom"
        const regionQuery = selectedRegion === "all" ? "united kingdom" : selectedRegion;
        const query = encodeURIComponent(`${jobField} in ${regionQuery}`);
        const url = `https://jsearch.p.rapidapi.com/search?query=${query}&country=uk&page=${page}`;

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

    // Filter out jobs with irrelevant keywords
    const filteredJobs = allJobs.filter(job => {
      const description = (job.job_description || job.description || "").toLowerCase();
      const title = (job.job_title || job.title || "").toLowerCase();
      return !BLACKLIST_KEYWORDS.some(keyword =>
        description.includes(keyword) || title.includes(keyword)
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

    // Process each job
    filteredJobs.forEach(job => {
      const description = (job.job_description || job.description || "").toLowerCase();
      // Use any available location field
      const location = (job.job_location || job.job_city || job.job_state || job.job_country || "").toLowerCase();

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

      // Try to match against our city lists first
      let foundRegion = null;
      for (const [region, cities] of Object.entries(CITIES_TO_REGION)) {
        if (cities.some(city => location.includes(city))) {
          regionCounts[region]++;
          foundRegion = region;
          break;
        }
      }

      // If no city match, use broader matching
      if (!foundRegion) {
        if (
          location.includes("england") ||
          location.includes("united kingdom") ||
          location.includes("uk") ||
          location.includes("london") ||
          location.includes("manchester") ||
          location.includes("birmingham") ||
          location.includes("leeds") ||
          location.includes("liverpool")
        ) {
          regionCounts.ENG++;
        } else if (
          location.includes("scotland") ||
          location.includes("edinburgh") ||
          location.includes("glasgow") ||
          location.includes("dundee")
        ) {
          regionCounts.SCT++;
        } else if (
          location.includes("wales") ||
          location.includes("cardiff") ||
          location.includes("swansea")
        ) {
          regionCounts.WLS++;
        } else if (
          location.includes("northern ireland") ||
          location.includes("n. ireland") ||
          location.includes("belfast") ||
          location.includes("derry")
        ) {
          regionCounts.NIR++;
        } else {
          // If nothing matches, assign to England as default
          regionCounts.ENG++;
        }
      }
    });

    // Sort and get top 5 skills
    const sortedSkills = Object.entries(skillCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

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
      regionPercentages
    };

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
