

const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button
            .closest("[data-carousel]")
            .querySelector("[data-slides]")

        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset

        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
})


// API base URL
const baseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/movies/";

// Fetch all movies
fetch(baseURL)
    .then(response => response.json())
    .then(data => {
        // Get the container to display movie details
        const container = document.getElementById("card-container");

        // Loop through the movie data and create HTML elements
        data.forEach((movie, index) => {
            // Create a movie details div
            const movieDetailsDiv = document.createElement("div");
            movieDetailsDiv.classList.add("card");

            // Set tabindex dynamically based on the index
            movieDetailsDiv.tabIndex = index + 1;

            // Give the card a identifier (e.g. movie title)
            const cardIdentifier = movie.title;

            // add click event on card view
            movieDetailsDiv.addEventListener("click", () => {
                // Construct the URL of the new page based on the identifier, including `movie_description.html` and the identifier
                const newPageURL = `movie_description.html?movie=${cardIdentifier}`;

                // navigate to a new page
                window.location.href = newPageURL;
            });
            // Create and set the movie title
            const title = document.createElement("h2");
            title.setAttribute('id', 'card-title')
            title.textContent = movie.title;

            // Create and set the movie release date
            const releaseDate = document.createElement("p");
            releaseDate.setAttribute('id','release-date');
            releaseDate.textContent = `2023`;

            // Create and set the movie category
            const category = document.createElement("p");
            category.setAttribute('id', 'category')
            category.textContent = `Category: ${movie.category}`;

            // Create an image element for the movie poster
            const posterImage = document.createElement("img");
            posterImage.src = movie.image_url; // Set the image source

            // Create a cinema details div
            const cinemaDetailsDiv = document.createElement("div");
            cinemaDetailsDiv.classList.add("cinema-details");

            // Loop through cinema details
            movie.cinema_details.forEach(cinema => {
                const cinemaDetail = document.createElement("p");
                // cinemaDetail.textContent = `Cinema: ${cinema.cinema_name}, Session Time: ${cinema.session_time}, Ticket Price: $${cinema.ticket_price}`;
                cinemaDetail.textContent = `${cinema.cinema_name}: $${cinema.ticket_price}`;
                cinemaDetailsDiv.appendChild(cinemaDetail);
            });

            // Append all elements to the movie details div

            movieDetailsDiv.appendChild(posterImage); // Append the image
            movieDetailsDiv.appendChild(releaseDate);
            movieDetailsDiv.appendChild(title);

            movieDetailsDiv.appendChild(category);
            movieDetailsDiv.appendChild(cinemaDetailsDiv);

            // Append the movie details div to the container
            container.appendChild(movieDetailsDiv);
        });
    })
    .catch(error => {
        console.error("Error fetching movie data:", error);
    });

// Select the button element by its id
const searchButton = document.getElementById("searchButton");

// Add a click event listener to the button
searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    // Use JavaScript to navigate to the "movie_list.html" page
    window.location.href = "movie_list.html";
    console.log(123)
});