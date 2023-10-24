/*
    I acknowledge the use of ChatGPT (https:chat.openai.com/) to [prevent appending a comment form when there are validation errors].
    The prompts used and the response from ChatGPT are included in Appendix https://chat.openai.com/share/a080edcf-b227-428f-b5c9-f23a14b643ea.
    The output from these prompts was to prevent appending a comment form when there are validation errors
    This was used [if (titleMessage.length === 0 && starMessage.length === 0 && message.length === 0);], 
    to check if there are no validation errors it will it will continue to add comments in class element "card-comment"
*/



// Get form-comment element 
var formDiv = document.getElementById('form-comment');
var display = 0;

// Get references to form elements and the comment container
const commentForm = document.getElementById('comment-form');
const commentTitleInput = document.getElementById('comment-title');
const commentTextInput = document.getElementById('comment-text');
const commentContainer = document.getElementById('comment-content-container');
const errorTitle = document.getElementById('error-title');
const errorComment = document.getElementById('error-comment');
const errorStar = document.getElementById('error-star');
//get star icon elements
const stars = document.querySelectorAll(".stars i");

// Declare selectedRating
let selectedRating = null;

const baseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/movies/";

// Get url movie information
const urlParams = new URLSearchParams(window.location.search);
const movieIdentifier = urlParams.get("movie");

// Fetch all movies
if (movieIdentifier) {
    // Build a URL with movie details, for example:
    const movieDetailURL = `${baseURL}?title=${movieIdentifier}`;

    // Get an API request to get movie details
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
            // Use the data from the API response here to populate the page element displaying the movie details
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

//Click Button to Change Font-size reference from https://www.youtube.com/watch?v=xOy0kVlbhlc&pp=ygUZaW5jcmVhc2UgZm9udCBzaXplIGJ1dHRvbg%3D%3D
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

// Select the button element by its id
const searchButton = document.getElementById("searchButton");

// Add a click event listener to the button
searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    //Navigate to the "movie_list.html" page
    window.location.href = "movie_list.html";

});


//click the +Add Comment element show the form
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

//click rate animation reference from Youtube https://www.youtube.com/watch?v=q1xhbc-oKnc&pp=ygUJcmF0ZSBodG1s
stars.forEach((star, index1) => {

    star.addEventListener("click", () => {
        selectedRating = index1 + 1;

        stars.forEach((star, index2) => {
            index1 >= index2 ? star.classList.add("active") :
                star.classList.remove("active");
        })
    })
})

//Set up a font size button to allow keyboard input to work.
function setFontSize(fontSize) {
    document.getElementById('text').style.fontSize = fontSize;
}

function FontSizeKeyPress(event, fontSize) {
    if (event.key === 'Enter') {
        setFontSize(fontSize);
    }
}

//Set up a card design to allow keyboard input to work.
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const focusedElement = document.activeElement;

        if (focusedElement.classList.contains('card-cast')) {

            const castLink = focusedElement.getAttribute('data-cast-link');
            window.location.href = castLink;
        }
    }
});



// Function to handle form submission and send a GET request
function fetchAndDisplayComments(websiteCode) {
    const apiEndpoint = `https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/comments/?website_code=${websiteCode}`;

    // Make a GET request to the API
    fetch(apiEndpoint, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                // Clear the existing comment placeholders
                const commentPlaceholder = document.getElementById("api-comment-container");
                commentPlaceholder.innerHTML = '';

                // Loop through the comments and create HTML elements for each
                data.forEach(comment => {
                    // Create elements to display username, comment, and rating
                    const commentCard = document.createElement('div');
                    commentCard.classList.add('card-comment');

                    const commentContent = document.createElement('div');
                    commentContent.classList.add('card-content');

                    const commentTitle = document.createElement('h2');
                    commentTitle.textContent = comment.username;

                    const commentText = document.createElement('p');
                    commentText.textContent = comment.comment;

                    const commentRating = document.createElement('div');
                    commentRating.classList.add('card-rate');

                    // Display the star rating
                    const starIcon = document.createElement('i');
                    starIcon.classList.add('fa-solid', 'fa-star');

                    const cardRateNum = document.createElement('h1');
                    cardRateNum.textContent = comment.rating;
                    commentRating.appendChild(starIcon);
                    commentRating.appendChild(cardRateNum);

                    commentContent.appendChild(commentTitle);
                    commentContent.appendChild(commentText);

                    commentCard.appendChild(commentContent);
                    commentCard.appendChild(commentRating);

                    // Append the comment to the page
                    commentPlaceholder.appendChild(commentCard);
                });
            } else {
                console.error("No comment data found for the specified website code.");
            }
        })
        .catch(error => {
            console.error("Error fetching comments:", error);
        });
}
// Call the function to fetch and display comments for a specific website_code (e.g., "example123")
fetchAndDisplayComments("Li-Chih_Tseng");


//validation errors reference from Youtube https://www.youtube.com/watch?v=In0nB0ABaUk&pp=ygUQdmFsaWRhdGlvbiBlcnJvcg%3D%3D
//I using chatGPT to understand how to  
//prevent appending a comment form when there are validation errors
//comes from chatGPT https://chat.openai.com/share/a080edcf-b227-428f-b5c9-f23a14b643ea
// Add a submit event listener to the form
commentForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    let titleMessage = [];
    let starMessage = [];
    let message = [];

    if (commentTitleInput.value === '' || commentTitleInput.value == null) {
        titleMessage.push('Title is required');
    }
    if (selectedRating === null) {
        starMessage.push('Rate is required');
    }
    if (commentTextInput.value === '' || commentTextInput.value == null) {
        message.push('Content is required');
    }

    // Display validation error messages
    errorTitle.innerText = titleMessage.join(', ');
    errorStar.innerText = starMessage.join(', ');
    errorComment.innerText = message.join(', ');

    if (titleMessage.length === 0 && starMessage.length === 0 && message.length === 0) {
        // Extract input values
        const title = commentTitleInput.value;
        const text = commentTextInput.value;

        // Create an object with the comment data
        const commentData = {
            username: title, // You can replace this with the actual username
            comment: text,
            website_code: "Li-Chih_Tseng", // Replace with your website code
            rating: selectedRating
        };

        // Convert commentData to JSON
        const commentDataJSON = JSON.stringify(commentData);

        // Send a POST request to the API
        fetch(`https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/comments/?website_code=${"Li-Chih"}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: commentDataJSON
        })
            .then(response => response.json())
            .then(data => {
                console.log("Comment submitted successfully:", data);

                // Clear the input fields and reset the selected rating
                commentTitleInput.value = '';
                commentTextInput.value = '';
                selectedRating = null;

                updateUIWithNewComment(data);
            })
            .catch(error => {
                console.error("Error submitting comment:", error);
            });
    }
});

//add the function so it can auto insert below instead of refresh the page
function updateUIWithNewComment(newCommentData) {
    const commentPlaceholder = document.getElementById("api-comment-container");
    // Create a new comment card
    const commentCard = document.createElement('div');
    commentCard.classList.add('card-comment');

    const commentContent = document.createElement('div');
    commentContent.classList.add('card-content');

    // Create the title and text elements for the new comment
    const commentTitle = document.createElement('h2');
    commentTitle.textContent = newCommentData.username;

    const commentText = document.createElement('p');
    commentText.textContent = newCommentData.comment;

    const commentRating = document.createElement('div');
    commentRating.classList.add('card-rate');

    // Display the star rating
    const starIcon = document.createElement('i');
    starIcon.classList.add('fa-solid', 'fa-star');

    const cardRateNum = document.createElement('h1');
    cardRateNum.textContent = newCommentData.rating;
    commentRating.appendChild(starIcon);
    commentRating.appendChild(cardRateNum);

    commentContent.appendChild(commentTitle);
    commentContent.appendChild(commentText);

    commentCard.appendChild(commentContent);
    commentCard.appendChild(commentRating);

    // Append the new comment card to the comment container

    commentPlaceholder.appendChild(commentCard);
}


