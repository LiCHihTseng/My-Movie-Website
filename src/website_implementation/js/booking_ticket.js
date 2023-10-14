let seats = document.querySelector(".all-seats");
let count = 0
let selectedCinema; // Store the selected cinema name
let selectedPrice;  // Store the selected ticket price

for (var i = 0; i < 59; i++) {
    let randint = Math.floor(Math.random() * 2);

    // Create the checkbox and label
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "tickets";
    checkbox.id = "s" + (i + 2);

    // Disable the checkbox for booked seats
    checkbox.disabled = randint === 1;

    let label = document.createElement("label");
    label.htmlFor = "s" + (i + 2);
    label.className = "seat " + (randint === 1 ? "booked" : "");

    seats.appendChild(checkbox);
    seats.appendChild(label);
}

let tickets = seats.querySelectorAll("input")
tickets.forEach((ticket) => {
    ticket.addEventListener("change", () => {


        count = Number(count);

        if (ticket.checked) {
            count += 1;

        } else {
            count -= 1;

        }

        document.querySelector(".count").innerHTML = count;
        // Calculate the total price based on the count of tickets
        console.log(selectedPrice)
        console.log(count)
        const totalPrice = selectedPrice * count;

        // Update the price element with the selected cinema's price
        document.getElementById("choose-price").textContent = `$${totalPrice.toFixed(2)}`;
    })
})
const baseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/movies/";

// Get movie identifier from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const movieIdentifier = urlParams.get("movie");

// If there is a movie identifier, call the API to get the details of that movie
if (movieIdentifier) {
    // Build a URL with movie details
    const movieDetailURL = `${baseURL}?title=${movieIdentifier}`;

    // Request API data
    fetch(movieDetailURL)
        .then(response => response.json())
        .then(data => {
            // Process API data
            const movieDetails = data[0];
            if (movieDetails) {
                document.getElementById("movie-title").textContent = movieDetails.title;
                document.getElementById("category").textContent = `Category: ${movieDetails.category}`;
                document.getElementById("movie-img").style.backgroundImage = `url(${movieDetails.image_url})`;

                // Create an array to store cinema details
                const cinemaDetails = [];
                movieDetails.cinema_details.forEach(cinema => {
                    const cinemaDetail = `${cinema.cinema_name}: $${cinema.ticket_price}`;
                    cinemaDetails.push(cinemaDetail);

                    selectedPrice = movieDetails.cinema_details[0].ticket_price;
                    
                    // Create a new div for each cinema name
                    const cinemaNameDiv = document.createElement("div");
                    cinemaNameDiv.classList.add("cinema-name");
                    cinemaNameDiv.textContent = `${cinema.cinema_name}`;

                    // Create a new div for each cinema session time
                    const cinemaTimeDiv = document.createElement("div");
                    cinemaTimeDiv.classList.add("cinema-time");

                    // Add a click event listener to the cinema name
                    cinemaNameDiv.addEventListener("click", () => {
                        // Get the index of the clicked cinema
                        const index = cinemaDetails.findIndex(detail => detail.startsWith(cinema.cinema_name));
                        if (index !== -1) {
                            // Access the session time directly from the cinema object
                            const selectedCinemaObject = movieDetails.cinema_details[index];
                            const selectedPrice = selectedCinemaObject.ticket_price;

                            const sessionTime = selectedCinemaObject.session_time || "Not available"; // Use "Not available" if session_time is not defined
                            const countElement = document.querySelector('.count'); // Select the element with the class '.count'
                            const count = countElement.innerHTML; // Get the content of the element
                            
                        
                            // Calculate the total price based on the count of tickets
                            const totalPrice = selectedPrice * count;


                            // Update the price element with the selected cinema's price
                            document.getElementById("choose-cinema").textContent = `${cinema.cinema_name}`;
                            document.getElementById("choose-price").textContent = `$${totalPrice.toFixed(2)}`;
                            // Update the session time element with the selected cinema's session time
                            document.querySelector(".cinema-time").textContent = sessionTime;

                        }

                        // Remove the "selected-cinema" class from all "cinema-name" elements
                        document.querySelectorAll(".cinema-name").forEach(div => {
                            div.classList.remove("selected-cinema");
                        });

                        // Add the "selected-cinema" class to the clicked "cinema-name" element
                        cinemaNameDiv.classList.add("selected-cinema");
                    });
                    // Add a click event listener to the cinema-time element
                    cinemaTimeDiv.addEventListener("click", () => {


                        // Remove the "selected-time" class from all "cinema-time" elements
                        document.querySelectorAll(".cinema-time").forEach(div => {
                            div.classList.remove("selected-time");
                        });

                        // Add the "selected-time" class to the clicked "cinema-time" element
                        cinemaTimeDiv.classList.add("selected-time");
                    });



                    // Append the newly created div to the parent element with class "head"
                    document.querySelector(".head").appendChild(cinemaNameDiv);
                    document.querySelector(".times").appendChild(cinemaTimeDiv);
                });

                // Set the text content of the element with id "ticket-price" to the cinema details
                document.getElementById("ticket-price").innerHTML = cinemaDetails.join("<br>");
            } else {
                // Show "Movie Not Found" if the movie title is not found in the data
                document.getElementById("movie-title").textContent = "Movie Not Found";
            }
        })
        .catch(error => {
            console.error("Error fetching movie details:", error);
        });
} else {
    // Show "Movie Not Specified" if there is no movie identifier
    document.getElementById("movie-title").textContent = "Movie Not Specified";
}