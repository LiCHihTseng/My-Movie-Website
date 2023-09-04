// start

let discount_code = 5000; 
const discount_button = document.getElementById('discount-code'); 

function showDiscountCode(){
    discount_code = discount_code + 1;
    alert("You discount code is" + discount_code);
}
  
discount_button.addEventListener("click", showDiscountCode); 