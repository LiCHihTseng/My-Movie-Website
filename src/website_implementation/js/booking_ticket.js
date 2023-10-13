let seats = document.querySelector(".all-seats");

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
        let amount = document.querySelector(".amount").innerHTML;
        let count = document.querySelector(".count").innerHTML;
        amount = Number(amount);
        count = Number(count);

        if (ticket.checked) {
            count += 1;
            amount += 200;
        } else {
            count -= 1;
            amount -= 200;
        }
        document.querySelector(".amount").innerHTML = amount;
        document.querySelector(".count").innerHTML = count;
    })
})

const baseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/movies/";

// Get movie identifier from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const movieIdentifier = urlParams.get("movie");

// If there is a movie identifier, call the API to get the details of that movie
if (movieIdentifier) {
    // Build a URL with movie details
    const movieDetailURL = `${baseURL}?title=${movieIdentifier}`;

    // request API data
    fetch(movieDetailURL)
        .then(response => response.json())
        .then(data => {


            // 在此处使用API响应中的数据来填充页面元素，显示电影详细信息
            const movieDetails = data[0];
            if (movieDetails) {
                document.getElementById("movie-title").textContent = movieDetails.title;
                // document.getElementById("release-date").textContent = `Release Date: ${movieDetails.release_date}`;
                document.getElementById("category").textContent = `Category: ${movieDetails.category}`;
                document.getElementById("movie-img").style.backgroundImage = `url(${movieDetails.image_url})`;




                // Create an array to store cinema details
                const cinemaDetails = [];
                movieDetails.cinema_details.forEach(cinema => {
                    const cinemaDetail = `${cinema.cinema_name}: $${cinema.ticket_price}`;
                    cinemaDetails.push(cinemaDetail);

                    // Create a new div for each cinema name
                    const cinemaNameDiv = document.createElement("div");
                    cinemaNameDiv.classList.add("cinema-name");
                    cinemaNameDiv.textContent = `${cinema.cinema_name}`;

                    // Create a new div for each cinema session time
                    const cinemaTimeDiv = document.createElement("label");
                    cinemaTimeDiv.classList.add("cinema-time");
                    cinemaTimeDiv.textContent = `${cinema.session_time}`;

                    // Append the newly created div to the parent element with class "head"
                    document.querySelector(".head").appendChild(cinemaNameDiv);
                    document.querySelector(".times").appendChild(cinemaTimeDiv);

                    // Add a click event listener to the cinema name
                    cinemaNameDiv.addEventListener("click", () => {
                        // Get the index of the clicked cinema
                        const index = cinemaDetails.findIndex(detail => detail.startsWith(cinema.cinema_name));
                        if (index !== -1) {
                            // Extract the price from the cinema details
                            const price = cinemaDetails[index].split(": ")[1];

                            // Update the price element with the selected cinema's price
                            document.getElementById("choose-price").textContent = `${cinema.cinema_name}: ${price}`;
                        }

                        // Remove the "selected-cinema" class from all "cinema-name" elements
                        document.querySelectorAll(".cinema-name").forEach(div => {
                            div.classList.remove("selected-cinema");
                        });

                        // Add the "selected-cinema" class to the clicked "cinema-name" element
                        cinemaNameDiv.classList.add("selected-cinema");
                    });
                });

                // Set the text content of the element with id "ticket-price" to the cinema details
                document.getElementById("ticket-price").innerHTML = cinemaDetails.join("<br>");


            } else {
                //show movie not found if movie-title can not found the data
                document.getElementById("movie-title").textContent = "Movie Not Found";
            }

        })
        .catch(error => {
            console.error("Error fetching movie details:", error);
        });
} else {
    // show movie not found if movie-title can not found the data
    document.getElementById("movie-title").textContent = "Movie Not Specified";
}

