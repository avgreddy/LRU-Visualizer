let cache = [];
let hashMap = {};
const capacity = 3;

function updateCacheDisplay() {
    const cacheDisplay = document.getElementById("cacheDisplay");
    cacheDisplay.innerHTML = cache.map(node => 
        `<div class="cache-item">Key: ${node.key} | Value: ${node.value}</div>`
    ).join('');

    const hashMapDisplay = document.getElementById("hashMapDisplay");
    hashMapDisplay.innerHTML = Object.keys(hashMap).map(key => 
        `<div class="hashmap-item">Key: ${key} | Value: ${hashMap[key].value}</div>`
    ).join('');
}

function put() {
    const key = parseInt(document.getElementById("keyInput").value);
    const value = parseInt(document.getElementById("valueInput").value);

    if (!key || !value) return;

    if (hashMap[key]) {
        cache = cache.filter(item => item.key !== key);
    } else if (cache.length >= capacity) {
        const removed = cache.pop();
        delete hashMap[removed.key];
    }

    const newNode = { key, value };
    cache.unshift(newNode);
    hashMap[key] = newNode;

    updateCacheDisplay();
}

function get() {
    const key = parseInt(document.getElementById("keyInput").value);
    if (!hashMap[key]) return;

    cache = cache.filter(item => item.key !== key);
    cache.unshift(hashMap[key]);

    updateCacheDisplay();
}
