const cookie = document.getElementById('cookie');
const number = document.getElementById('Number');
const upgrade = document.getElementById('upgrade');
const cost = document.getElementById('cost');
const auto = document.getElementById('auto');
const auto_max = document.getElementById('auto-max')
let count = Number(localStorage.getItem("count")) || 0;
let clickPower = Number(localStorage.getItem("clickPower")) || 1;
let level = Number(localStorage.getItem("level")) || 0;
let upgradeCost = Number(localStorage.getItem("upgradeCost")) || 10;
let auto_price = Number(localStorage.getItem("auto_price")) || 10;
let auto_cps = Number(localStorage.getItem("auto_cps")) || 0;
function saveGame() {
    localStorage.setItem("count", count);
    localStorage.setItem("clickPower", clickPower);
    localStorage.setItem("level", level);
    localStorage.setItem("upgradeCost", upgradeCost);
    localStorage.setItem("auto_price", auto_price)
    localStorage.setItem("auto_cps", auto_cps)
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
        upgradeCost = Math.floor(10 * Math.pow(2, level));
        cost.textContent = `Upgrade cost: ${upgradeCost}`;
        number.textContent = count;
        saveGame();
    }
}
auto.onclick = function(){
    if (count >= auto_price){
        count -= auto_price
        auto_cps++
    }
}
setInterval(() => {
    count += auto_cps;
    number.textContent = count;
    saveGame();
}, 1000);