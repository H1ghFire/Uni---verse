// 1. Mock Database Layout Engine
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

function navigateToProfile() {
    alert("Please Sign up / Login first to access your profile dashboard!");
}

// 2. Sync UI labels and calculate total SAT dynamically
function updateValues() {
    const ebrw = parseInt(document.getElementById('satEbrwFilter').value);
    const math = parseInt(document.getElementById('satMathFilter').value);
    
    document.getElementById('satEbrwVal').innerText = ebrw;
    document.getElementById('satMathVal').innerText = math;
    document.getElementById('satTotalVal').innerText = ebrw + math;
    document.getElementById('ieltsVal').innerText = document.getElementById('ieltsFilter').value;
}

// 3. Main Filtering Engine
function filterUniversities() {
    const selectedCountry = document.getElementById('countryFilter').value;
    const userEbrw = parseInt(document.getElementById('satEbrwFilter').value);
    const userMath = parseInt(document.getElementById('satMathFilter').value);
    const userIelts = parseFloat(document.getElementById('ieltsFilter').value);
    
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
        resultsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No matches found. Try boosting individual scores or changing destination filters!</p>`;
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

// 🌀 Cosmic Tornado Engine Execution
function createCosmicVortex() {
    const container = document.getElementById('vortexContainer');
    if (!container) return;

    const items = ['📚', '📘', '📙', '✨', '🪐', '📖'];
    const totalElements = 45; 

    for (let i = 0; i < totalElements; i++) {
        const element = document.createElement('div');
        element.className = 'vortex-item';
        element.innerText = items[Math.floor(Math.random() * items.length)];

        const duration = 6 + Math.random() * 8; 
        const delay = Math.random() * -15; 
        const radius = 220 + Math.random() * 450; 

        element.style.setProperty('--orbit-radius', `${radius}px`);
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;

        container.appendChild(element);
    }
}

// Run on application initialization
window.addEventListener('DOMContentLoaded', () => {
    createCosmicVortex();
    updateValues();
    filterUniversities();
});
