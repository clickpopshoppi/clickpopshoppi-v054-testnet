// ==========================================================
// === JAVASCRIPT ARCHITECTURE: MASTER LOGIC (V26) ===
// === Optimized for Speed and Stability ===
// ==========================================================

const MAIN_CHATBOT_URL = "https://clickpopshoppi2104.pinet.com"; // Target for Full Redirect
const MANDATORY_READ_DELAY_MS = 2000; 

// UI Elements
const acceptBtn = document.getElementById('accept_button');
const modal = document.getElementById('policy_modal');
const connectWalletBtn = document.getElementById('connect_wallet_btn');
const chatbotNavItem = document.getElementById('chatbot_nav_item');
const declineBtn = document.getElementById('decline_button');


// --- 1. Pi SDK Initialization ---
let piSdkReady = false;
let readingTimerDone = false;

Pi.init({
    version: "2.0",
    sandbox: true,
    onReady: function () {
        piSdkReady = true;
        console.log("Pi SDK Ready.");
        checkIfReadyToProceed();
    },
    onError: function(error) {
        console.error("Pi SDK Initialization Failed:", error.message);
        acceptBtn.innerText = '❌ ระบบ Pi ล้มเหลว';
        acceptBtn.disabled = true;
    }
});


// --- 2. Initialize App and Handlers ---
document.addEventListener('DOMContentLoaded', () => {
    // Start Legal Reading Timer
    setTimeout(() => {
        readingTimerDone = true;
        console.log("Mandatory Reading Delay Complete.");
        checkIfReadyToProceed();
    }, MANDATORY_READ_DELAY_MS);

    // Attach Event Listeners
    acceptBtn.addEventListener('click', handleAccept);
    declineBtn.addEventListener('click', handleDecline);
    connectWalletBtn.addEventListener('click', handleConnectWallet);
    chatbotNavItem.addEventListener('click', handleChatbotRedirect); // CRITICAL FIX: Full Redirect

    // Add handlers for Menu Cards (Assume these navigate to their respective pages)
    document.getElementById('pop_social_card').addEventListener('click', () => navigateTo('PopSocial'));
    document.getElementById('modern_trade_card').addEventListener('click', () => navigateTo('ModernTrade'));
    document.getElementById('logistics_card').addEventListener('click', () => navigateTo('PiLogis'));
    document.getElementById('asset_services_card').addEventListener('click', () => navigateTo('AssetServices'));
});


// --- 3. Core Logic: Policy Gateway ---
function checkIfReadyToProceed() {
    if (piSdkReady && readingTimerDone) {
        acceptBtn.disabled = false;
        acceptBtn.innerText = '✅ ยอมรับและดำเนินการต่อ';
        acceptBtn.style.background = 'linear-gradient(90deg, #66BB6A, #A5D6A7)'; 
        console.log("Policy Gateway Unlocked. Logic Fix: STOP LOOPING.");
    }
}


// --- 4. Navigation Handlers (STOP LOOPING FIX) ---

// Logic Fix: Policy Modal -> Home Screen
function handleAccept() {
    if (acceptBtn.disabled) return; 
    
    acceptBtn.innerText = 'กำลังยืนยันตัวตน...';
    acceptBtn.disabled = true;

    // Pi.authenticate handles the transition to the Home screen on success (CRITICAL FIX: Stops Looping)
    Pi.authenticate(['username', 'payments'], 
        function(user) {
            console.log('Authentication Successful! User:', user.username);
            // Hide Modal and show main content
            modal.style.display = 'none';
        }, 
        function(error) {
            // Re-lock button and provide clear error message 
            acceptBtn.innerText = '⚠️ การยืนยันล้มเหลว ลองใหม่อีกครั้ง';
            acceptBtn.disabled = false;
            console.error('Authentication Failed:', error.message);
        }
    );
}

function handleDecline() {
    alert('Policy Declined. Exiting Application. (ETHICS ENFORCED)');
    try {
        Pi.closeApp(); 
    } catch (e) {
        window.close();
    }
}

// CRITICAL FIX: Pi Wallet Connection Logic (Enables Coin Testing)
function handleConnectWallet() {
    Pi.authenticate(['username', 'payments'], 
        function(user) {
            alert('Pi Wallet Connected Successfully! Ready for Transactions.');
            connectWalletBtn.innerText = 'Wallet Connected';
            connectWalletBtn.style.backgroundColor = '#66BB6A';
        }, 
        function(error) {
            alert('Wallet Connection Failed: ' + error.message);
        }
    );
}

// CRITICAL FIX: Chatbot Full Redirect (Solves Authentication Conflict)
function handleChatbotRedirect() {
    // This immediately navigates the main browser window to the Chatbot URL (Fixes Crashing/Stall)
    console.log('Redirecting to Chatbot URL...');
    window.location.href = MAIN_CHATBOT_URL; 
}

// Placeholder Navigation Function (for the Menu Cards)
function navigateTo(pageId) {
    alert('Navigating to ' + pageId + ' Hub. (Future development page)');
    // In future development, this will replace the Home content dynamically
}
