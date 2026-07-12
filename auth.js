// auth.js - Pure Local Storage Client-Side Simulation Engine

let selectedAvatarEmoji = "🚀";

// Open/Close modal popup controllers
window.openLoginModal = function() {
    document.getElementById('loginModal').classList.remove('hidden');
};

window.closeLoginModal = function() {
    document.getElementById('loginModal').classList.add('hidden');
};

// Avatar picking toggle engine
window.selectAvatar = function(element) {
    const options = document.querySelectorAll('.avatar-option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    element.classList.add('selected');
    selectedAvatarEmoji = element.innerText;
};

// Form verification system
window.submitMockLogin = function() {
    const nameInput = document.getElementById('usernameInput').value.trim();
    
    if (!nameInput) {
        alert("Please enter a display name to customize your account profile!");
        return;
    }

    const localUser = {
        name: nameInput,
        avatar: selectedAvatarEmoji
    };

    // Save profile to browser memory cache configuration
    localStorage.setItem('universe_user', JSON.stringify(localUser));
    
    closeLoginModal();
    checkAuthSession();

    // Instantly transition into dashboard view on confirmation
    document.getElementById('homeScreen').classList.add('hidden');
    document.getElementById('mainDashboard').classList.remove('hidden');
};

window.handleLogout = function() {
    localStorage.removeItem('universe_user');
    checkAuthSession();
    window.showHomeScreen();
};

function checkAuthSession() {
    const savedSession = localStorage.getItem('universe_user');
    const userObject = savedSession ? JSON.parse(savedSession) : null;
    
    if (typeof window.onAccountStateChanged === "function") {
        window.onAccountStateChanged(userObject);
    }
}

// Auto check for active profile sessions on initialization boot
window.addEventListener('DOMContentLoaded', checkAuthSession);
