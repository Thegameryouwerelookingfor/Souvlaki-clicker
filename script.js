let souvlakiCount = 0;
let souvlakiPerClick = 1;
let autoClickerRate = 0;
let prestigeMultiplier = 1;
let doubleSouvlakiActive = false;

// DOM Elements
const souvlakiCountElement = document.getElementById('souvlakiCount');
const clickSound = document.getElementById('clickSound');
const upgradeSound = document.getElementById('upgradeSound');

// Update the souvlaki count on the screen
function updateSouvlakiCount() {
    souvlakiCountElement.textContent = souvlakiCount;
}

// Handle clicking the souvlaki image
function souvlakiClick() {
    souvlakiCount += souvlakiPerClick * prestigeMultiplier;
    updateSouvlakiCount();
    clickSound.play();
}

// Upgrades for click power
const upgrades = [
    { cost: 50, multiplier: 2, elementId: 'buyUpgrade1' },
    { cost: 100, multiplier: 3, elementId: 'buyUpgrade2' },
    { cost: 200, multiplier: 4, elementId: 'buyUpgrade3' },
    { cost: 400, multiplier: 5, elementId: 'buyUpgrade4' },
    { cost: 800, multiplier: 6, elementId: 'buyUpgrade5' },
    { cost: 1600, multiplier: 7, elementId: 'buyUpgrade6' },
    { cost: 3200, multiplier: 8, elementId: 'buyUpgrade7' },
    { cost: 6400, multiplier: 9, elementId: 'buyUpgrade8' },
    { cost: 12800, multiplier: 10, elementId: 'buyUpgrade9' },
    { cost: 25600, multiplier: 20, elementId: 'buyUpgrade10' },
];

upgrades.forEach(upgrade => {
    document.getElementById(upgrade.elementId).addEventListener('click', () => {
        if (souvlakiCount >= upgrade.cost) {
            souvlakiCount -= upgrade.cost;
            souvlakiPerClick *= upgrade.multiplier;
            updateSouvlakiCount();
            document.getElementById(upgrade.elementId).disabled = true;
            document.getElementById(upgrade.elementId).classList.add('purchased');
            upgradeSound.play();
        }
    });
});

// Auto-clicker functionality
function autoClicker() {
    souvlakiCount += autoClickerRate * prestigeMultiplier;
    if (doubleSouvlakiActive) {
        souvlakiCount += autoClickerRate * prestigeMultiplier; // Double during active time
    }
    updateSouvlakiCount();
}
setInterval(autoClicker, 1000); // Run every second

// Auto-clicker purchase
document.getElementById('buyTomato').addEventListener('click', () => {
    if (souvlakiCount >= 100) {
        souvlakiCount -= 100;
        autoClickerRate += 1;
        updateSouvlakiCount();
    }
});

// More auto-clicker purchases can be added similarly...

// Watch Ad for Double Souvlakis
document.getElementById('watchAdButton').addEventListener('click', () => {
    if (!doubleSouvlakiActive) {
        doubleSouvlakiActive = true;
        setTimeout(() => {
            doubleSouvlakiActive = false;
        }, 60000); // Active for 1 minute
        alert("You will receive double souvlakis for 1 minute!");
    }
});
