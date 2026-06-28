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
const reset = document.getElementById('reset');
const net_cookies_element = document.getElementById('Net_cookies');

let count = Number(localStorage.getItem("count")) || 0;
let clickPower = Number(localStorage.getItem("clickPower")) || 1;
let level = Number(localStorage.getItem("level")) || 0;
let auto_cps = Number(localStorage.getItem("auto_cps")) || 0;
let auto_level = Number(localStorage.getItem("auto_level")) || 0;
let net_cookies = Number(localStorage.getItem("net_cookies")) || 0;


function formatNumbers(num) {
    const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi"];
    let tier = 0;

    while (num >= 1000 && tier < suffixes.length - 1) {
        num /= 1000;
        tier++;
    }

    let formattedNumber;
    if (num % 1 === 0) {
        formattedNumber = num; 
    } else {
        formattedNumber = num.toFixed(2); 
    }

    return formattedNumber + suffixes[tier];
}

function saveGame() {
    localStorage.setItem("count", count);
    localStorage.setItem("clickPower", clickPower);
    localStorage.setItem("level", level);
    localStorage.setItem("auto_cps", auto_cps);
    localStorage.setItem("auto_level", auto_level); 
    localStorage.setItem("net_cookies", net_cookies);
}

cost.textContent = `Upgrade cost: ${formatNumbers(getPrice())}`;
auto_cost_element.textContent = `Auto price: ${formatNumbers(getAutoPrice())}`;
auto_cps_element.textContent = `Auto cps: ${formatNumbers(auto_cps)}`;
click_power_element.textContent = `Click power: ${formatNumbers(clickPower)}`;
number.textContent = formatNumbers(count);
net_cookies_element.textContent = `Alltime cookies: ${formatNumbers(net_cookies)}`;

cookie.onclick = function() {
    count += clickPower;
    number.textContent = formatNumbers(count);
    net_cookies += clickPower;
    net_cookies_element.textContent = `Alltime cookies: ${formatNumbers(net_cookies)}`;
    updateTabTitle();
    saveGame();
}

upgrade.onclick = function() {
    if (count >= getPrice()) {
        count -= getPrice();
        level++;
        clickPower++;
        cost.textContent = `Upgrade cost: ${formatNumbers(getPrice())}`;
        click_power_element.textContent = `Click power: ${formatNumbers(clickPower)}`;
        number.textContent = formatNumbers(count);
        saveGame();
    }
}

upgrade_max_element.onclick = function() {
    while (count >= getPrice()){
        count -= getPrice();
        level++;
        clickPower++;
    }

    number.textContent = formatNumbers(count);
    cost.textContent = `Upgrade cost: ${formatNumbers(getPrice())}`;
    click_power_element.textContent = `Click power: ${formatNumbers(clickPower)}`;
    saveGame();
}

auto.onclick = function(){
    let current_price = getAutoPrice(); 
    
    if (count >= current_price){
        count -= current_price; 
        auto_cps++;
        auto_level++;
        number.textContent = formatNumbers(count); 
        auto_cost_element.textContent = `Auto price: ${formatNumbers(getAutoPrice())}`;
        auto_cps_element.textContent = `Auto cps: ${formatNumbers(auto_cps)}`;
        saveGame(); 
    }
}

auto_max.onclick = function(){
    while(count >= getAutoPrice()){
        count -= getAutoPrice(); 
        auto_cps++;
        auto_level++; 
    }
    
    number.textContent = formatNumbers(count); 
    auto_cost_element.textContent = `Auto price: ${formatNumbers(getAutoPrice())}`;
    auto_cps_element.textContent = `Auto cps: ${formatNumbers(auto_cps)}`;
    saveGame(); 
}

reset.onclick = function(){
    if(confirm("Are you sure you want to reset game data? This is irreversable!")){
        count = 0;
        clickPower = 1;
        level = 0;
        auto_cps = 0;
        auto_level = 0;
        net_cookies = 0;

        number.textContent = formatNumbers(count);
        cost.textContent = `Upgrade cost: ${formatNumbers(getPrice())}`;
        auto_cost_element.textContent = `Auto price: ${formatNumbers(getAutoPrice())}`;
        auto_cps_element.textContent = `Auto cps: ${formatNumbers(auto_cps)}`;
        click_power_element.textContent = `Click power: ${formatNumbers(clickPower)}`;
        updateTabTitle();
        saveGame();
    }
}

setInterval(() => {
    count += auto_cps;
    number.textContent = formatNumbers(count);
    net_cookies += auto_cps;
    net_cookies_element.textContent = `Alltime cookies: ${formatNumbers(net_cookies)}`;
    updateTabTitle();
    saveGame();
}, 1000);

function getAutoPrice() {
    return Math.floor(100 * Math.pow(1.0673421, auto_level));
}
function getPrice(){
    return Math.floor(10 * Math.pow(1.5321412, level));
}
function updateTabTitle() {
    document.title = `(${formatNumbers(count)})-Cookie Clicker`;
}