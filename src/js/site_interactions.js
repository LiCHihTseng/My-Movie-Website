// start

let discount_code = 5000; 
const discount_button = document.getElementById('discount-code'); 
const showDiscountCode = () => {  
    discount_code = discount_code + 1;  alert("Your discount code is " + discount_code); 
}
  
discount_button.addEventListener("click", showDiscountCode); 