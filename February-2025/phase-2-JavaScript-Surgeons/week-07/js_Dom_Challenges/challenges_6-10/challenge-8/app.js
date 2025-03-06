/**
 * Write your challenge solution here
 */
const cartItems = document.getElementById('cart-items');
const emptyTag = document.querySelector(".empty-cart");
const cartTotal = document.getElementById('cart-total');

let cartItemsArray = [];
let total = 0;
function addToCart(product, price) {
    emptyTag.style.display = "none";

    let existingItem = cartItemsArray.find(item => item.name === product);

    if (existingItem) {
        existingItem.qty++
    }
    else {
        let Item = {
            name: product,
            price,
            qty: 1
        }
        cartItemsArray.push(Item);

        const itemWrapper = document.createElement('div')
        itemWrapper.classList.add('cart-item');
        const productName = product;
        productName.textContent = product;
        const qtyandButtons = document.createElement('span')
        const incrementButton = document.createElement('button');
        const decrementButton = document.createElement('button');
        const showQty = document.createElement('span')
        const yetProductCost = document.createElement('span')
        yetProductCost.innerHTML = "$" + (price * Item.qty).toFixed(2)
        showQty.innerHTML = Item.qty

        incrementButton.textContent = `+`;
        decrementButton.textContent = `-`;
        qtyandButtons.appendChild(decrementButton)
        qtyandButtons.appendChild(showQty)
        qtyandButtons.appendChild(incrementButton)

        itemWrapper.append(productName)
        itemWrapper.appendChild(qtyandButtons)
        itemWrapper.appendChild(yetProductCost)
        cartItems.appendChild(itemWrapper);

        // handle Increment and decrement 
        incrementButton.addEventListener("click", () => {
            Item.qty++
            showQty.innerHTML = Item.qty
            yetProductCost.innerHTML = "$" + (price * Item.qty).toFixed(2)
            updateTotal()
        })
        decrementButton.addEventListener("click", () => {
            if (Item.qty > 1) {
                Item.qty--
                showQty.innerHTML = Item.qty
                yetProductCost.innerHTML = "$" + (price * Item.qty).toFixed(2)
                updateTotal()
            }
            else {
                cartItemsArray = cartItemsArray.filter(item => item.name !== product);
                cartItems.removeChild(itemWrapper);
                showQty.innerHTML = Item.qty
            }
            if (cartItemsArray.length === 0) {
                emptyTag.style.display = "block";
            }
        })
    }

    function updateTotal() {
        total = cartItemsArray.reduce((sum, item) => sum + item.price * item.qty, 0);
        cartTotal.innerHTML = "Total: $" + total.toFixed(2);
    }
    
    // Call this function after any update in quantity or cart items
    updateTotal();
    
    
     
} 
