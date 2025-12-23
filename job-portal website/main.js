// Global functions to avoid scope issues
window.toggleSave = function(jobId) {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const index = savedJobs.indexOf(jobId);
    
    if (index > -1) {
        savedJobs.splice(index, 1);
        document.querySelector(`[data-job-id="${jobId}"] .save-btn`)?.classList.remove('saved');
    } else {
        savedJobs.push(jobId);
        document.querySelector(`[data-job-id="${jobId}"] .save-btn`)?.classList.add('saved');
    }
    
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    updateStats();
};

window.toggleApply = function(jobId) {
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    
    if (appliedJobs.includes(jobId)) return;
    
    appliedJobs.push(jobId);
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    
    const applyBtn = document.querySelector(`[data-job-id="${jobId}"] .apply-btn`);
    if (applyBtn) {
        applyBtn.textContent = 'Applied!';
        applyBtn.classList.add('applied');
        applyBtn.disabled = true;
    }
    
    updateStats();
};

function initStorage() {
    if (!localStorage.getItem('savedJobs')) localStorage.setItem('savedJobs', '[]');
    if (!localStorage.getItem('appliedJobs')) localStorage.setItem('appliedJobs', '[]');
}

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
    const locations = [...new Set(window.jobs.map(job => job.location))];
    const roles = [...new Set(window.jobs.map(job => job.role))];

    const locationFilter = document.getElementById('locationFilter');
    const roleFilter = document.getElementById('roleFilter');

    if (locationFilter && window.jobs) {
        locationFilter.innerHTML = '<option value="">All Locations</option>' + 
            locations.map(loc => `<option value="${loc}">${loc}</option>`).join('');
    }

    if (roleFilter && window.jobs) {
        roleFilter.innerHTML = '<option value="">All Roles</option>' + 
            roles.map(role => `<option value="${role}">${role}</option>`).join('');
    }
}

function getSavedJobs() { return JSON.parse(localStorage.getItem('savedJobs') || '[]'); }
function getAppliedJobs() { return JSON.parse(localStorage.getItem('appliedJobs') || '[]'); }

function updateStats() {
    const totalJobsEl = document.getElementById('totalJobs');
    const applicationCountEl = document.getElementById('applicationCount');
    const savedCountEl = document.getElementById('savedCount');
    
    if (totalJobsEl) totalJobsEl.textContent = document.querySelectorAll('.job-card').length;
    if (applicationCountEl) applicationCountEl.textContent = getAppliedJobs().length;
    if (savedCountEl) savedCountEl.textContent = getSavedJobs().length;
}

function createJobCard(job, isSavedPage = false) {
    const savedJobs = getSavedJobs();
    const appliedJobs = getAppliedJobs();
    const isSaved = savedJobs.includes(job.id);
    const isApplied = appliedJobs.includes(job.id);
    
    return `
        <article class="job-card" data-job-id="${job.id}">
            <h3 class="job-title">${job.title}</h3>
            <div class="job-company">${job.company}</div>
            <div class="job-location">📍 ${job.location}</div>
            <div class="job-role">💼 ${job.role}</div>
            <div class="job-skills">
                ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <div style="margin: 1rem 0; font-size: 0.9rem; color: #666;">
                Applications: ${job.applications} | Posted: ${job.posted}
            </div>
            <div class="job-actions">
                <button class="btn btn-primary apply-btn ${isApplied ? 'applied' : ''}" 
                        ${isApplied ? 'disabled' : ''} 
                        onclick="toggleApply(${job.id})">
                    ${isApplied ? 'Applied!' : 'Apply Now'}
                </button>
                <button class="btn btn-secondary save-btn ${isSaved ? 'saved' : ''}" 
                        onclick="toggleSave(${job.id})">
                    ${isSaved ? 'Saved' : 'Save'}
                </button>
            </div>
        </article>
    `;
}

function renderJobs() {
    if (!window.jobs) return;
    
    const filters = getFilters();
    const filteredJobs = filterJobs(window.jobs, filters);
    
    const jobListings = document.getElementById('jobListings');
    if (jobListings) {
        jobListings.innerHTML = filteredJobs.map(job => createJobCard(job)).join('');
    }
    
    updateStats();
}

function renderSavedJobs() {
    if (!window.jobs) return;
    
    const savedJobIds = getSavedJobs();
    const savedJobs = window.jobs.filter(job => savedJobIds.includes(job.id));
    
    const savedListings = document.getElementById('savedJobListings');
    const savedCountEl = document.getElementById('savedCount');
    const clearSavedBtn = document.getElementById('clearSaved');
    
    if (savedListings) savedListings.innerHTML = savedJobs.map(job => createJobCard(job, true)).join('');
    if (savedCountEl) savedCountEl.textContent = savedJobs.length;
    if (clearSavedBtn) clearSavedBtn.style.display = savedJobs.length ? 'block' : 'none';
}

// MAIN INITIALIZATION
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    initStorage();
    
    // Wait for all scripts to load
    let attempts = 0;
    function initApp() {
        attempts++;
        if (window.jobs && document.getElementById('jobListings')) {
            console.log('Initializing app with', window.jobs.length, 'jobs');
            if (window.location.pathname.includes('saved.html')) {
                renderSavedJobs();
            } else {
                populateFilters();
                renderJobs();
            }
            setupEventListeners();
        } else if (attempts < 20) {
            setTimeout(initApp, 100);
        } else {
            console.error('Jobs data not loaded');
        }
    }
    
    initApp();
});

function setupEventListeners() {
    const locationFilter = document.getElementById('locationFilter');
    const roleFilter = document.getElementById('roleFilter');
    const searchInput = document.getElementById('searchInput');
    const clearFilters = document.getElementById('clearFilters');
    const clearSaved = document.getElementById('clearSaved');

    if (locationFilter) locationFilter.addEventListener('change', renderJobs);
    if (roleFilter) roleFilter.addEventListener('change', renderJobs);
    if (searchInput) searchInput.addEventListener('input', renderJobs);
    if (clearFilters) {
        clearFilters.addEventListener('click', function() {
            if (locationFilter) locationFilter.value = '';
            if (roleFilter) roleFilter.value = '';
            if (searchInput) searchInput.value = '';
            renderJobs();
        });
    }
    if (clearSaved) {
        clearSaved.addEventListener('click', function() {
            localStorage.removeItem('savedJobs');
            renderSavedJobs();
        });
    }
}
