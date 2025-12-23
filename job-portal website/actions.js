const SAVED_JOBS = 'savedJobs';
const APPLIED_JOBS = 'appliedJobs';

function initStorage() {
    if (!localStorage.getItem(SAVED_JOBS)) {
        localStorage.setItem(SAVED_JOBS, JSON.stringify([]));
    }
    if (!localStorage.getItem(APPLIED_JOBS)) {
        localStorage.setItem(APPLIED_JOBS, JSON.stringify([]));
    }
}

function toggleSave(jobId) {
    const savedJobs = JSON.parse(localStorage.getItem(SAVED_JOBS) || '[]');
    const index = savedJobs.indexOf(jobId);
    
    if (index > -1) {
        savedJobs.splice(index, 1);
        document.querySelector(`[data-job-id="${jobId}"] .save-btn`).classList.remove('saved');
    } else {
        savedJobs.push(jobId);
        document.querySelector(`[data-job-id="${jobId}"] .save-btn`).classList.add('saved');
    }
    
    localStorage.setItem(SAVED_JOBS, JSON.stringify(savedJobs));
    updateStats();
}

function toggleApply(jobId) {
    const appliedJobs = JSON.parse(localStorage.getItem(APPLIED_JOBS) || '[]');
    
    if (appliedJobs.includes(jobId)) {
        return; // Already applied
    }
    
    appliedJobs.push(jobId);
    localStorage.setItem(APPLIED_JOBS, JSON.stringify(appliedJobs));
    
    document.querySelector(`[data-job-id="${jobId}"] .apply-btn`).textContent = 'Applied!';
    document.querySelector(`[data-job-id="${jobId}"] .apply-btn`).classList.add('applied');
    
    updateStats();
}

function getSavedJobs() {
    return JSON.parse(localStorage.getItem(SAVED_JOBS) || '[]');
}

function getAppliedJobs() {
    return JSON.parse(localStorage.getItem(APPLIED_JOBS) || '[]');
}

function clearAllSaved() {
    localStorage.removeItem(SAVED_JOBS);
    document.getElementById('savedJobListings').innerHTML = '';
    document.getElementById('savedCount').textContent = '0';
    document.getElementById('clearSaved').style.display = 'none';
}
