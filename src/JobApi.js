// src/JobApi.js

const SKILLS_LIST = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "Go",
    "AWS",
    "React",
    "TypeScript",
    "Ruby",
  ];
  
  export async function fetchTopSkills(numPages = 1) {
    try {
      const rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY;
      const rapidApiHost = import.meta.env.VITE_RAPIDAPI_HOST;
  
      // We'll accumulate job listings from multiple pages
      let allJobs = [];
  
      // Loop over the desired number of pages
      for (let page = 1; page <= numPages; page++) {
        const url = `https://jsearch.p.rapidapi.com/search?query=software%20engineer&page=${page}`;
  
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
  
      // Initialize counts for each skill in SKILLS_LIST
      const skillCounts = {};
      SKILLS_LIST.forEach((skill) => {
        skillCounts[skill] = 0;
      });
  
      // For each job, increment counts for relevant skills
      allJobs.forEach((job) => {
        const description = job.job_description?.toLowerCase() || "";
        SKILLS_LIST.forEach((skill) => {
          if (description.includes(skill.toLowerCase())) {
            skillCounts[skill]++;
          }
        });
      });
  
      // Sort and return top 5
      const sortedSkills = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]);
      return sortedSkills.slice(0, 5);
  
    } catch (error) {
      console.error("Error fetching skills data:", error);
      return [];
    }
  }
  