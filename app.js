// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js');
    });
}

// Hospital Capacity Setup
const MAX_DOCTORS = 10;
const MAX_PATIENTS_PER_DOCTOR = 30;
const MAX_DAILY_CAPACITY = MAX_DOCTORS * MAX_PATIENTS_PER_DOCTOR; // 300 patients

const form = document.getElementById('registrationForm');
const resultCard = document.getElementById('resultCard');
const displayToken = document.getElementById('displayToken');
const displayDoctor = document.getElementById('displayDoctor');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get current token count from local storage (default is 0 if empty)
    let currentQueue = parseInt(localStorage.getItem('hospitalQueueCount')) || 0;

    // Check if the hospital has reached its 300 patient limit
    if (currentQueue >= MAX_DAILY_CAPACITY) {
        alert("Registration Closed: The hospital has reached its maximum daily capacity of 300 patients.");
        return;
    }

    // Generate new token
    currentQueue++;
    
    // Smart Round-Robin Doctor Allocation (1 to 10)
    let assignedDoctorNumber = currentQueue % MAX_DOCTORS;
    if (assignedDoctorNumber === 0) {
        assignedDoctorNumber = MAX_DOCTORS; // If remainder is 0, it's doctor 10
    }

    // Save the new queue count
    localStorage.setItem('hospitalQueueCount', currentQueue);

    // Update the UI
    displayToken.innerText = currentQueue;
    displayDoctor.innerText = `Doctor ${assignedDoctorNumber}`;
    
    // Hide form, show result
    form.style.display = 'none';
    resultCard.style.display = 'block';
});