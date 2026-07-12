let activeUser = null;

const universities = [
    { name: "Stanford University", country: "USA", minEbrw: 720, minMath: 750, minIelts: 7.0, fee: "$62,000" },
    { name: "Penn State University", country: "USA", minEbrw: 580, minMath: 620, minIelts: 6.5, fee: "$39,000" },
    { name: "University of Amsterdam", country: "Netherlands", minEbrw: 0, minMath: 0, minIelts: 6.5, fee: "€15,000" },
    { name: "Eindhoven Tech", country: "Netherlands", minEbrw: 0, minMath: 0, minIelts: 6.0, fee: "€12,500" },
    { name: "Technical University of Munich", country: "Germany", minEbrw: 0, minMath: 0, minIelts: 6.5, fee: "€0 (Free)" },
    { name: "Arizona State University", country: "USA", minEbrw: 540, minMath: 560, minIelts: 6.0, fee: "$31,000" }
];

function showAboutUs() {
    alert("Welcome to the Uni-verse! A global platform to explore universities, track detailed SAT/IELTS score milestones, and join an international student community.");
}

function showHomeScreen() {
    document.getElementById('homeScreen').classList.remove('hidden');
    document.getElementById('mainDashboard').classList.add('hidden');
}

function navigateToDashboard() {
    if (!activeUser) {
        alert("Please Sign up / Login first to access your custom score dashboard!");
        return;
    }
    document.getElementById('homeScreen').classList.add('hidden');
    document.getElementById('mainDashboard').classList.remove('hidden');
}

// Global UI Account Synchronization Engine
function onAccountStateChanged(user) {
    activeUser = user;
    const mainLoginBtn = document.getElementById('mainLoginBtn');
    const authNavContainer = document.getElementById('authNavContainer');

    if (user) {
        if (mainLoginBtn) {
            mainLoginBtn.innerText = "Enter Dashboard";
            mainLoginBtn.onclick = () => navigateToDashboard();
        }
        
        if (authNavContainer) {
            authNavContainer.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.2rem;">${user.avatar}</span>
                    <span class="nav-profile-name">${user.name}</span>
                    <button onclick="handleLogout()" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.85rem; margin-left: 0.5rem; text-decoration: underline;">Logout</button>
                </div>
            `;
        }
    } else {
        if (mainLoginBtn) {
            mainLoginBtn.innerText = "Sign up / Login";
            mainLoginBtn.onclick = () => {
                if (typeof window.openLoginModal === "function") {
                    window.openLoginModal();
                }
            };
        }
        if (authNavContainer) {
            authNavContainer.innerHTML = `<span style="color: var(--text-muted); font-size: 0.9rem;">Not Logged In</span>`;
        }
    }
}

function updateValues() {
    const ebrwInput = document.getElementById('satEbrwFilter');
    const mathInput = document.getElementById('satMathFilter');
    let ebrw = parseInt(ebrwInput.value) || 0;
    let math = parseInt(mathInput.value) || 0;
    document.getElementById('satTotalVal').innerText = ebrw + math;
}

function filterUniversities() {
    const selectedCountry = document.getElementById('countryFilter').value;
    const userEbrw = parseInt(document.getElementById('satEbrwFilter').value) || 0;
    const userMath = parseInt(document.getElementById('satMathFilter').value) || 0;
    const userIelts = parseFloat(document.getElementById('ieltsFilter').value) || 0;
    
    const resultsContainer = document.getElementById('results');
    if (!resultsContainer) return;
    resultsContainer.innerHTML = ''; 

    const filtered = universities.filter(uni => {
        if (selectedCountry !== 'all' && uni.country !== selectedCountry) return false;
        if (uni.minEbrw > 0 && userEbrw < uni.minEbrw) return false;
        if (uni.minMath > 0 && userMath < uni.minMath) return false;
        if (uni.minIelts > 0 && userIelts < uni.minIelts) return false;
        return true;
    });

    if (filtered.length === 0) {
        resultsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No matches found. Try modifying your input scores!</p>`;
        return;
    }

    filtered.forEach(uni => {
        const card = document.createElement('div');
        card.className = 'uni-card';
        const satDisplay = uni.minMath === 0 ? 'Not Required' : `EBRW: ${uni.minEbrw} | Math: ${uni.minMath}`;
        
        card.innerHTML = `
            <div class="uni-name">${uni.name}</div>
            <div class="uni-country">${uni.country}</div>
            <div class="req-tag"><span>Min SAT:</span> <span class="req-val">${satDisplay}</span></div>
            <div class="req-tag"><span>Min IELTS:</span> <span class="req-val">${uni.minIelts}</span></div>
            <div class="req-tag"><span>Est. Tuition:</span> <span class="req-val" style="color: #4ade80;">${uni.fee}</span></div>
        `;
        resultsContainer.appendChild(card);
    });
}

// Generates the floating environment background assets
function createCosmicVortex() {
    const container = document.getElementById('vortexContainer');
    if (!container) return;

    const items = ['📚', '📘', '📙', '✨', '🪐', '📖'];
    const totalElements = 25; // Slightly reduced element volume to clear visual layout clutter

    for (let i = 0; i < totalElements; i++) {
        const element = document.createElement('div');
        element.className = 'vortex-item';
        element.innerText = items[Math.floor(Math.random() * items.length)];

        // Drastically increased execution timing variables (35s-65s) to cause slow drift speeds
        const duration = 35 + Math.random() * 30; 
        const delay = Math.random() * -60; 
        const radius = 150 + Math.random() * 400; 

        element.style.setProperty('--orbit-radius', `${radius}px`);
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;

        container.appendChild(element);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    createCosmicVortex();
    updateValues();
    filterUniversities();
});
