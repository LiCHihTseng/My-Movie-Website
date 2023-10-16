// translate.selectLanguageTag.show = true; //不出现的select的选择语言
// translate.execute();


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
                // 处理电影不存在的情况
                document.getElementById("movie-title").textContent = "Movie Not Found";
            }
        })
        .catch(error => {
            console.error("Error fetching movie details:", error);
        });
} else {
    // 如果没有电影标识符，可能显示错误消息或默认内容
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

var formDiv = document.getElementById('form-comment');
var display = 0;

function hideShow(){
    if(display == 1){
        formDiv.style.display = 'block';
        display = 0;

    }
    else{
        formDiv.style.display = 'none';
        display = 1;
    }
}