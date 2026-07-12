// auth.js - Pure Local Storage Client-Side Simulation Engine

let selectedAvatarEmoji = "🚀";

window.openLoginModal = function() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.remove('hidden');
};

window.closeLoginModal = function() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.add('hidden');
};

window.selectAvatar = function(element) {
    const options = document.querySelectorAll('.avatar-option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    element.classList.add('selected');
    selectedAvatarEmoji = element.innerText;
};

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

    localStorage.setItem('universe_user', JSON.stringify(localUser));
    
    window.closeLoginModal();
    checkAuthSession();

    document.getElementById('homeScreen').classList.add('hidden');
    document.getElementById('mainDashboard').classList.remove('hidden');
};

window.handleLogout = function() {
    localStorage.removeItem('universe_user');
    checkAuthSession();
    if (typeof window.showHomeScreen === "function") {
        window.showHomeScreen();
    }
};

function checkAuthSession() {
    const savedSession = localStorage.getItem('universe_user');
    const userObject = savedSession ? JSON.parse(savedSession) : null;
    
    if (typeof window.onAccountStateChanged === "function") {
        window.onAccountStateChanged(userObject);
    }
}

// Run checks immediately upon DOM tree assembly
window.addEventListener('DOMContentLoaded', checkAuthSession);
