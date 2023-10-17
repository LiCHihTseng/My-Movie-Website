// import * as translate from "./translate.js";
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
            const movieRate = document.createElement("p");
            movieRate.setAttribute('id', 'movie-rate');
            movieRate.textContent = `8.0`;

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
            movieDetailsDiv.appendChild(movieRate);
            movieDetailsDiv.appendChild(title);

            movieDetailsDiv.appendChild(category);
            movieDetailsDiv.appendChild(cinemaDetailsDiv);

            // Append the movie details div to the container
            container.appendChild(movieDetailsDiv);
        });
        const filterButtons = document.querySelectorAll(".button-value");
        const filterableCards = document.querySelectorAll("#card-container .card");

        const filterCards = (e) => {
            document.querySelector(".active").classList.remove("active");
            e.target.classList.add("active");
            const selectedCategory = e.target.dataset.name.toLowerCase();

            // Iterate over the cards and apply or remove the hide class
            filterableCards.forEach(card => {
                const cardCategory = card.querySelector("#category").textContent.toLowerCase();
                
                if (selectedCategory === "all" || cardCategory.includes(selectedCategory)) {
                    card.classList.remove("hide"); // Show the card
                } else {
                    card.classList.add("hide"); // Hide the card
                }
            });
        };

        // Add click event listener to each filter button
        filterButtons.forEach(button => button.addEventListener("click", filterCards));

        translate.selectLanguageTag.show = true;
        translate.ignore.class.push('brand');
        translate.execute();
    })
    .catch(error => {
        console.error("Error fetching movie data:", error);
    });





