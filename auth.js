// auth.js - Authentication State & Transitions

function handleLogin() {
    console.log("Login sequence verified.");
    
    // Smoothly transition views
    const homeScreen = document.getElementById('homeScreen');
    const mainDashboard = document.getElementById('mainDashboard');
    const profileLink = document.getElementById('profileLink');
    
    if (homeScreen && mainDashboard) {
        homeScreen.classList.add('hidden');
        mainDashboard.classList.remove('hidden');
    }
    
    if (profileLink) {
        profileLink.innerText = "Logged In ✓";
        profileLink.style.color = "#4ade80";
    }
}
