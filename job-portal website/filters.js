function getFilters() {
    return {
        location: document.getElementById('locationFilter')?.value || '',
        role: document.getElementById('roleFilter')?.value || '',
        search: document.getElementById('searchInput')?.value.toLowerCase() || ''
    };
}

function filterJobs(jobs, filters) {
    return jobs.filter(job => {
        const matchesLocation = !filters.location || job.location === filters.location;
        const matchesRole = !filters.role || job.role === filters.role;
        const matchesSearch = !filters.search || 
            job.title.toLowerCase().includes(filters.search) ||
            job.company.toLowerCase().includes(filters.search) ||
            job.skills.some(skill => skill.toLowerCase().includes(filters.search));
        
        return matchesLocation && matchesRole && matchesSearch;
    });
}

function populateFilters() {
    const locations = [...new Set(jobs.map(job => job.location))];
    const roles = [...new Set(jobs.map(job => job.role))];

    const locationFilter = document.getElementById('locationFilter');
    const roleFilter = document.getElementById('roleFilter');

    if (locationFilter) {
        locationFilter.innerHTML = '<option value="">All Locations</option>' + 
            locations.map(loc => `<option value="${loc}">${loc}</option>`).join('');
    }

    if (roleFilter) {
        roleFilter.innerHTML = '<option value="">All Roles</option>' + 
            roles.map(role => `<option value="${role}">${role}</option>`).join('');
    }
}
