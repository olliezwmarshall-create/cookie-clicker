const cookie = document.getElementById('cookie-container');
const number = document.getElementById('Number');
const upgrade = document.getElementById('upgrade');
const cost = document.getElementById('cost');
const auto = document.getElementById('auto');
const auto_max = document.getElementById('auto-max');
const auto_cost_element = document.getElementById('auto_cost');
const upgrade_max_element = document.getElementById(`upgrade_max`);
const auto_cps_element = document.getElementById('auto_cps');
const click_power_element = document.getElementById('click_power');

let count = Number(localStorage.getItem("count")) || 0;
let clickPower = Number(localStorage.getItem("clickPower")) || 1;
let level = Number(localStorage.getItem("level")) || 0;
let auto_cps = Number(localStorage.getItem("auto_cps")) || 0;
let auto_level = Number(localStorage.getItem("auto_level")) || 0;

function saveGame() {
    localStorage.setItem("count", count);
    localStorage.setItem("clickPower", clickPower);
    localStorage.setItem("level", level);
    localStorage.setItem("auto_cps", auto_cps);
    localStorage.setItem("auto_level", auto_level); 
}


cost.textContent = `Upgrade cost: ${getPrice()}`;
auto_cost_element.textContent = `Auto price: ${getAutoPrice()}`;
auto_cps_element.textContent = `Auto cps: ${auto_cps}`;
click_power_element.textContent = `Click power: ${clickPower}`;
number.textContent = count;

cookie.onclick = function() {
    count += clickPower;
    number.textContent = count;
    saveGame();
}

upgrade.onclick = function() {
    if (count >= getPrice()) {
        count -= getPrice();
        level++;
        clickPower++;
        cost.textContent = `Upgrade cost: ${getPrice()}`;
        click_power_element.textContent = `Click power: ${clickPower}`;
        number.textContent = count;
        saveGame();
    }
}

upgrade_max_element.onclick = function() {
    while (count >= getPrice()){
        count -= getPrice();
        level++;
        clickPower++;
    }

    number.textContent = count;
    cost.textContent = `Upgrade cost: ${getPrice()}`;
    click_power_element.textContent = `Click power: ${clickPower}`;
    saveGame();
}
auto.onclick = function(){
    let current_price = getAutoPrice(); 
    
    if (count >= current_price){
        count -= current_price; 
        auto_cps++;
        auto_level++;
        number.textContent = count; 
        auto_cost_element.textContent = `Auto price: ${getAutoPrice()}`;
        auto_cps_element.textContent = `Auto cps: ${auto_cps}`;
        saveGame(); 
    }
}

auto_max.onclick = function(){
    while(count >= getAutoPrice()){
        count -= getAutoPrice(); 
        auto_cps++;
        auto_level++; 
    }
    
    number.textContent = count; 
    auto_cost_element.textContent = `Auto price: ${getAutoPrice()}`;
    auto_cps_element.textContent = `Auto cps: ${auto_cps}`;
    saveGame(); 
}

setInterval(() => {
    count += auto_cps;
    number.textContent = count;
    saveGame();
}, 1000);

function getAutoPrice() {
    return Math.floor(100 * Math.pow(1.141234, auto_level));
}
function getPrice(){
    return Math.floor(10 * Math.pow(1.75385, level));
}