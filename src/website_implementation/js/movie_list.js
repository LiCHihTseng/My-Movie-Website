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

            // 為卡片設定一個唯一的識別符號（例如，電影標題）
            const cardIdentifier = movie.title;

            // 新增一個點擊事件監聽器到卡片上
            movieDetailsDiv.addEventListener("click", () => {
                // 根據識別符號構建新頁面的 URL，包含 `movie_description.html` 和識別符號
                const newPageURL = `movie_description.html?movie=${cardIdentifier}`;

                // 程式方式導向到新頁面
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

// Call the function to fetch and display movie details
fetchMovieDetails();