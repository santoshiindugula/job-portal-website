// Expose jobs globally
window.jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "TechCorp",
        location: "Bangalore",
        role: "Developer",
        skills: ["React", "JavaScript", "CSS", "HTML"],
        applications: 23,
        posted: "2 days ago"
    },
    {
        id: 2,
        title: "Backend Engineer",
        company: "DataSync", 
        location: "Delhi",
        role: "Developer",
        skills: ["Node.js", "Python", "MongoDB", "AWS"],
        applications: 15,
        posted: "1 week ago"
    },
    {
        id: 3,
        title: "Product Manager",
        company: "InnovateX",
        location: "Mumbai",
        role: "Manager",
        skills: ["Agile", "Product Roadmaps", "Analytics"],
        applications: 8,
        posted: "3 days ago"
    },
    {
        id: 4,
        title: "DevOps Engineer",
        company: "CloudPeak",
        location: "Hyderabad",
        role: "DevOps",
        skills: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
        applications: 12,
        posted: "5 days ago"
    },
    {
        id: 5,
        title: "UI/UX Designer",
        company: "DesignHub",
        location: "Bangalore",
        role: "Designer",
        skills: ["Figma", "Adobe XD", "User Research"],
        applications: 19,
        posted: "1 day ago"
    },
    {
        id: 6,
        title: "Data Scientist",
        company: "AnalyticsPro",
        location: "Chennai",
        role: "Data",
        skills: ["Python", "Machine Learning", "SQL", "Tableau"],
        applications: 7,
        posted: "4 days ago"
    }
];
console.log('Jobs data loaded:', window.jobs.length);
