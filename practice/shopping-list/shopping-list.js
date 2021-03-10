//Select DOM elements
const shoppingForm = document.querySelector('.shopping');
const shoppingList = document.querySelector('.list');

// we need an array to hold our state
let items = [];

function handleSubmit(e) {
    e.preventDefault();
    /**
     *  Here the Current Target is pointing to the form and
     * since the input has a name attributte I can pull
     * the value by accessing it through the form
     * */
    const name = e.currentTarget.item.value;

    if (!name) return;

    // Save items is a structure
    const item = {
        name: name,
        id: Date.now(), //random number just for an example
        complete: false, // task is not complete by default
    };

    // Push the items to our state
    items.push(item);

    // clear the form
    /**
     * Using target and not currentTarget here
     * because forms does not do bubble
     */
    e.target.reset();
    // fire off a custom event that will tell anyone else who cares that the items have been updated

    // Dispatch the event= this function lives on all the DOM elements
    shoppingList.dispatchEvent(new CustomEvent('itemsUpdated'));

}

// Display Items
function displayItems() {
    const html = items.map(item => `<li class="shopping-item">
    <input 
    type="checkbox" 
    value="${item.id}"
    ${item.complete && 'checked'}
    >
    <span class="itemName">${item.name}</span>
    <button 
    aria-label="Remove ${item.name}"
    value="${item.id}"
    >&times;</button>
    </li>`).join('');
    //console.log(html);
    shoppingList.innerHTML = html;
}

// Save to LocalStorage
function mirrorToLocalStorage() {
    localStorage.setItem("items", JSON.stringify(items));
}

// Restore from localStorage
function restoreFromLocal() {
    console.log("Restoring from Local");
    const lsItems = JSON.parse(localStorage.getItem('items'));

    if (lsItems.length) {
        items.push(...lsItems);
        shoppingList.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
}

// Delete Item
function deleteItem(id) {
    console.log("DELETING ITEM", id);
    items = items.filter(item => item.id !== id);
    shoppingList.dispatchEvent(new CustomEvent('itemsUpdated'));

}

// Mark As completed
function markAsComplete(id) {
    console.log("Marking as complete", id);
    // itemRef will modify the items
    const itemRef = items.find(item => item.id === id);
    // BANG the opposite
    itemRef.complete = !itemRef.complete;
    shoppingList.dispatchEvent(new CustomEvent('itemsUpdated'));

}

shoppingForm.addEventListener('submit', handleSubmit);
shoppingList.addEventListener('itemsUpdated', displayItems);
shoppingList.addEventListener('itemsUpdated', mirrorToLocalStorage);
shoppingList.addEventListener('click', e => {
    const id = parseInt(e.target.value);
    if (e.target.matches('button')) {
        deleteItem(id);
    }
    if (e.target.matches('input[type="checkbox"]')) {
        markAsComplete(id);
    }
});

restoreFromLocal();