let buttons = document.querySelector('.buttons');
let btn = buttons.querySelectorAll('.font-size-btn');
for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function () {
        let current = document.getElementsByClassName('active');
        current[0].className = current[0].className.replace("active", "");
        this.className += " active";
    })
}
// Select the button element by its id
const searchButton = document.getElementById("searchButton");

// Add a click event listener to the button
searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    // Use JavaScript to navigate to the "movie_list.html" page
    window.location.href = "movie_list.html";

});