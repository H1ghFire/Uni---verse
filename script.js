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

function navigateToProfile() {
    if(!activeUser) {
        alert("Please Sign up / Login first to access your profile dashboard!");
    } else {
        document.getElementById('homeScreen').classList.add('hidden');
        document.getElementById('mainDashboard').classList.remove('hidden');
    }
}

// Triggers when our local auth script verifies a login profile
function onAccountStateChanged(user) {
    activeUser = user;
    const profileLink = document.getElementById('profileLink');
    const mainLoginBtn = document.getElementById('mainLoginBtn');
    const authNavContainer = document.getElementById('authNavContainer');

    if (user) {
        mainLoginBtn.innerText = "Enter Dashboard";
        mainLoginBtn.onclick = () => {
            document.getElementById('homeScreen').classList.add('hidden');
            document.getElementById('mainDashboard').classList.remove('hidden');
        };
        
        authNavContainer.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 1.2rem;">${user.avatar}</span>
                <a href="#" id="profileLink" style="color: var(--success); text-decoration: none;" onclick="navigateToProfile()">${user.name}</a>
                <button onclick="handleLogout()" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.8rem; margin-left: 0.5rem; text-decoration: underline;">Logout</button>
            </div>
        `;
    } else {
        mainLoginBtn.innerText = "Sign up / Login";
        mainLoginBtn.onclick = () => openLoginModal();
        authNavContainer.innerHTML = `<a href="#" id="profileLink" onclick="navigateToProfile()">Profile</a>`;
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
        resultsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No matches found. Try boosting individual scores or changing destinations!</p>`;
        return;
    }

    filtered.forEach(uni => {
        const card = document.createElement('div');
        card.className = 'uni-card';
        const satDisplay = uni.minMath === 0 ? 'Not Required' : `EBRW: ${uni.minEbrw} | Math: ${uni.minMath}`;
        
        card.innerHTML = `
            <div class="uni-name">${uni.name}</div>
            <div class="uni-country">${uni.country}</div>
            <div class="req-tag"><span>Min SAT Sections:</span> <span class="req-val">${satDisplay}</span></div>
            <div class="req-tag"><span>Min IELTS:</span> <span class="req-val">${uni.minIelts}</span></div>
            <div class="req-tag"><span>Est. Tuition:</span> <span class="req-val" style="color: #4ade80;">${uni.fee}</span></div>
        `;
        resultsContainer.appendChild(card);
    });
}

function createCosmicVortex() {
    const container = document.getElementById('vortexContainer');
    if (!container) return;

    const items = ['📚', '📘', '📙', '✨', '🪐', '📖'];
    const totalElements = 35; 

    for (let i = 0; i < totalElements; i++) {
        const element = document.createElement('div');
        element.className = 'vortex-item';
        element.innerText = items[Math.floor(Math.random() * items.length)];

        const duration = 14 + Math.random() * 16; 
        const delay = Math.random() * -30; 
        const radius = 200 + Math.random() * 450; 

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
