let cache = [];
let hashMap = {};
let capacity = 0;

function renderCache() {
    const cacheDisplay = document.getElementById("cacheDisplay");
    cacheDisplay.innerHTML = cache.map(item => 
        `<div class="cache-item">Key: ${item.key}, Value: ${item.value}</div>`
    ).join('');
}

function renderHashMap() {
    const hashMapDisplay = document.getElementById("hashMapDisplay");
    hashMapDisplay.innerHTML = Object.keys(hashMap).map(key => 
        `<div class="hashmap-item">Key: ${key}, Value: ${hashMap[key].value}</div>`
    ).join('');
}

function setCapacity() {
    const newCapacity = parseInt(document.getElementById("capacityInput").value);
    if (newCapacity > 0) {
        capacity = newCapacity;
        while (cache.length > capacity) {
            const removed = cache.pop();
            delete hashMap[removed.key];
        }
        renderCache();
        renderHashMap();
    } else {
        alert("⚠️ Capacity must be greater than zero!");
    }
}

function put() {
    const key = parseInt(document.getElementById("keyInput").value);
    const value = parseInt(document.getElementById("valueInput").value);

    if (isNaN(key) || isNaN(value)) {
        alert("⚠️ Please enter a valid key and value!");
        return;
    }
    
    if (capacity <= 0) {
        alert("⚠️ Please set a valid cache capacity first!");
        return;
    }

    if (hashMap[key]) {
        cache = cache.filter(item => item.key !== key);
    } else if (cache.length >= capacity) {
        const removed = cache.pop();
        delete hashMap[removed.key];
    }

    const newNode = { key, value };
    cache.unshift(newNode);
    hashMap[key] = newNode;

    renderCache();
    renderHashMap();
}

function get() {
    const key = parseInt(document.getElementById("keyInput").value);
    const expectedValue = parseInt(document.getElementById("valueInput").value); // Optional expected value

    if (isNaN(key)) {
        alert("⚠️ Please enter a valid key!");
        return;
    }

    if (!hashMap.hasOwnProperty(key)) {
        alert(`⚠️ Key ${key} does not exist!`);
        return;
    }

    const storedValue = hashMap[key].value;
    
    if (storedValue === undefined || storedValue === null || storedValue === '') {
        alert(`⚠️ Key ${key} exists but has no value!`);
        return;
    }

    if (!isNaN(expectedValue) && storedValue !== expectedValue) {
        alert(`⚠️ Key ${key} exists, but the stored value is ${storedValue}, not the expected value!`);
        return;
    }

    cache = cache.filter(item => item.key !== key);
    cache.unshift(hashMap[key]);

    renderCache();
}
