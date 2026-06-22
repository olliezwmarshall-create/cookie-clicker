const cookie = document.getElementById('cookie');
const number = document.getElementById('Number');
const upgrade = document.getElementById('upgrade');
const cost = document.getElementById('cost');
let count = Number(localStorage.getItem("count")) || 0;
let clickPower = Number(localStorage.getItem("clickPower")) || 1;
let level = Number(localStorage.getItem("level")) || 0;
let upgradeCost = Number(localStorage.getItem("upgradeCost")) || 10;
function saveGame() {
    localStorage.setItem("count", count);
    localStorage.setItem("clickPower", clickPower);
    localStorage.setItem("level", level);
    localStorage.setItem("upgradeCost", upgradeCost);
}
cost.textContent = `Upgrade cost: ${upgradeCost}`;
number.textContent = count;
cookie.onclick = function() {
    count += clickPower;
    number.textContent = count;
    saveGame();
}
upgrade.onclick = function() {
    if (count >= upgradeCost) {
        count -= upgradeCost;
        level++;
        clickPower++;
        upgradeCost = Math.floor(10 * Math.pow(2.1, level));
        cost.textContent = `Upgrade cost: ${upgradeCost}`;
        number.textContent = count;
        saveGame();
    }
}