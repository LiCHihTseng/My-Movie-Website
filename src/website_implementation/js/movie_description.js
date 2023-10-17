// Get form-comment element 
var formDiv = document.getElementById('form-comment');
var display = 0;

// Get references to form elements and the comment container
const commentForm = document.getElementById('comment-form');
const commentTitleInput = document.getElementById('comment-title');
const commentTextInput = document.getElementById('comment-text');
const commentContainer = document.getElementById('comment-container');
const errorTitle = document.getElementById('error-title');
const errorComment = document.getElementById('error-comment');
const errorStar = document.getElementById('error-star');
//get star icon elements
const stars = document.querySelectorAll(".stars i");

// Declare selectedRating
let selectedRating = null;

const baseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/movies/";

// 从URL参数中获取电影标识符
const urlParams = new URLSearchParams(window.location.search);
const movieIdentifier = urlParams.get("movie");

// 如果有电影标识符，则调用API以获取该电影的详细信息
if (movieIdentifier) {
    // 构建电影详细信息的URL，例如：
    const movieDetailURL = `${baseURL}?title=${movieIdentifier}`;

    // 发起API请求以获取电影详细信息
    fetch(movieDetailURL)
        .then(response => response.json())
        .then(data => {
            const moviebutton = document.getElementById("buy-ticket");


            // add click event on card view
            moviebutton.addEventListener("click", () => {
                // Construct the URL of the new page based on the identifier, including `movie_description.html` and the identifier
                const newPageURL = `booking_ticket.html?movie=${movieIdentifier}`;

                // navigate to a new page
                window.location.href = newPageURL;
            });
            // 在此处使用API响应中的数据来填充页面元素，显示电影详细信息
            const movieDetails = data[0];
            if (movieDetails) {
                document.getElementById("movie-title").textContent = movieDetails.title;
                // document.getElementById("release-date").textContent = `Release Date: ${movieDetails.release_date}`;
                document.getElementById("category").textContent = `Category: ${movieDetails.category}`;
                document.getElementById("movie-img").style.backgroundImage = `url(${movieDetails.image_url})`;
                document.getElementById("small-movie-img").src = movieDetails.image_url;



                // Create an empty array to store cinema details
                const cinemaDetails = [];

                movieDetails.cinema_details.forEach(cinema => {
                    const cinemaDetail = `${cinema.cinema_name}: $${cinema.ticket_price}`;
                    cinemaDetails.push(cinemaDetail);
                });

                // Set the text content of the element with id "ticket_price" to the cinema details
                document.getElementById("ticket-price").innerHTML = cinemaDetails.join("<br>");

            } else {

                document.getElementById("movie-title").textContent = "Movie Not Found";
            }
        })
        .catch(error => {
            console.error("Error fetching movie details:", error);
        });
} else {

    document.getElementById("movie-title").textContent = "Movie Not Specified";
}

let buttons = document.querySelector('.buttons');
let btn = buttons.querySelectorAll('.font-size-btn');
for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function () {
        let current = document.getElementsByClassName('active');
        current[0].className = current[0].className.replace("active", "");
        this.className += " active";
    })
}
// Select all elements with the "card-cast" class
const cardCastElements = document.querySelectorAll('.card-cast');

// Add a click event listener to each card-cast element
cardCastElements.forEach((card) => {
    card.addEventListener('click', () => {
        // Extract the target page URL associated with the clicked card
        const targetPage = card.getAttribute('data-cast-link');

        // Navigate to the target page
        window.location.href = targetPage;

    });
});


//if click the +comment element show the form
function hideShow() {
    if (display == 1) {
        formDiv.style.display = 'flex';
        display = 0;

    }
    else {
        formDiv.style.display = 'none';
        display = 1;
    }
}

stars.forEach((star, index1) => {

    star.addEventListener("click", () => {
        selectedRating = index1 + 1;

        stars.forEach((star, index2) => {
            index1 >= index2 ? star.classList.add("active") :
                star.classList.remove("active");
        })
    })
})
// Handle form submission
//I using chatGPT to understand how to  prevent appending a comment card when there are validation errors
//comes from chatGPT https://chat.openai.com/share/4d242577-1f10-4ec3-b9b3-07599ebb60eb
commentForm.addEventListener('submit', function (event) {

    event.preventDefault(); // Prevent the default form submission behavior
    let titleMessage = []
    let starMessage = []
    let message = []
    if (commentTitleInput.value === '' || commentTitleInput.value == null) {
        titleMessage.push('Title is required')
    }
    if (selectedRating === null) {
        starMessage.push('Rate is required')
    }
    if (commentTextInput.value === '' || commentTextInput.value == null) {
        message.push('Content is required')
    }


    if (titleMessage.length > 0) {
        errorTitle.innerText = titleMessage.join(', ');
        commentTitleInput.style.border='2px solid #FF0000';
    } else {
        errorTitle.innerText = '';
        commentTitleInput.style.border = ''; //reset the border
        
    }
    if (starMessage.length > 0) {
        errorStar.innerText = starMessage.join(', ');

    } else {
        errorStar.innerText = '';
        
    }
    if (message.length > 0) {
        errorComment.innerText = message.join(', ')
        commentTextInput.style.border = '2px solid #FF0000';

    } else {
        errorComment.innerText = '';
        commentTextInput.style.border = '';
        
    }
    // Get the input values
    const title = commentTitleInput.value;
    const text = commentTextInput.value;

    // Create a new comment card
    const commentCard = document.createElement('div');
    commentCard.classList.add('card-comment');

    const commentContent = document.createElement('div');
    commentContent.classList.add('card-content')



    // Create the title and text elements for the new comment
    const commentTitle = document.createElement('h2');
    commentTitle.textContent = title;
    const commentText = document.createElement('p');
    commentText.textContent = text;

    // Create a new div for the rating
    const commentRating = document.createElement('div');
    commentRating.classList.add('card-rate');

    const starIcon = document.createElement('i');
    starIcon.classList.add('fa-solid', 'fa-star');

    const cardRateNum = document.createElement('h1')
    cardRateNum.textContent = selectedRating
    commentRating.appendChild(starIcon);
    commentRating.appendChild(cardRateNum);

    // Append the title, text, and rating elements to the comment card
    commentContent.appendChild(commentTitle);
    commentContent.appendChild(commentText);




    commentCard.appendChild(commentContent);
    commentCard.appendChild(commentRating);

    // Append the new comment card to the comment container
    commentContainer.appendChild(commentCard);

    // Clear the input fields and reset the selected rating
    commentTitleInput.value = '';
    commentTextInput.value = '';
    selectedRating = null;
});



