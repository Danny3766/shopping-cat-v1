import "bootstrap/dist/css/bootstrap.css"
import "@fortawesome/fontawesome-free/css/all.css"

const tbody = document.querySelector("tbody")
const cardbody = document.querySelectorAll(".card-body")
const cat = ['老大', '貝貝', '老虎', '胖胖', '小花', '黑臉']
const price = [20, 15, 10, 8.5, 9.99, 12.5]
const sum = [20, 15, 10, 8.5, 9.99, 12.5]
const cleancartbtn = document.querySelector(".empty-cart") //清空購物車按鈕
const totalPriceSpan = document.querySelector('.total-price')


/* 購物車增加按鈕 */
for(let i = 0;i < cardbody.length;i++){
    cardbody[i].addEventListener("click",(e)=>{
        const catItem =
            `<tr class="item">
                <td>${cat[i]}</td>
                <td><input type="number" class="quantity" value="1" min="1"/></td>
                <td class='p'>$${price[i]}</td>
                <td class="sum">$${sum[i]}</td>
                <td>
                    <button class="remove-item-btn btn btn-danger btn-sm">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>`
    tbody.insertAdjacentHTML('afterbegin',catItem);
    updatePrice();
    })
};


/* 購物車刪除按鈕 */
tbody.addEventListener("click",(e)=>{
    if (e.target.nodeName === "BUTTON") {
        e.target.parentElement.parentElement.remove();
    }
    if(e.target.nodeName === "I") {
        e.target.parentElement.parentElement.parentElement.remove();
    }
});


/* 清空購物車按鈕 */
cleancartbtn.addEventListener("click",(e)=>{
    tbody.textContent = "";
    totalPriceSpan.textContent = "$0";  // 按下清空購物車按鈕時，總價欄位也歸零
    if (e.target.nodeName === "I") {
        tbody.textContent = "";
        totalPriceSpan.textContent = "$0"; // 按下清空購物車按鈕時，總價欄位也
    }
});


/* 修改input數量，小計金額變動 */
function updatePrice() {
    const quantityInputs = document.querySelectorAll(".quantity");
    let singlePrice = document.querySelectorAll(".p"); // 單價
    const subtotalPrice = document.querySelectorAll(".sum"); // 小計
    let totalPrice = 0;
    for (let i = 0; i < quantityInputs.length; i++) {
        const quantity = Number(quantityInputs[i].value);
        const price = Number((singlePrice[i].textContent).slice(1));
        let sum = quantity * price;  // update the sum td with the new calculated sum
 
        quantityInputs[i].addEventListener("input", (e)=>{
            subtotalPrice[i].textContent = "$" + Number(e.target.value) * sum;
            totalPrice += sum;  // add the new sum to the total price
            totalPriceSpan.textContent = "$" + totalPrice.toFixed(2); // update the total price span with the new calculated total price
        })
        totalPrice += sum; // 每個貓咪的小計加總
    }
    totalPriceSpan.textContent = "$" + totalPrice.toFixed(2);
};