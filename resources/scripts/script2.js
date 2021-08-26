const searchForm = document.getElementById('form');
const search = document.getElementById('search');
const newsList = document.querySelector('.news-list');
const main = document.getElementById("main");

const bypass_cors_url = 'https://cors-anywhere.herokuapp.com/'
const APIURL = `${bypass_cors_url}https://newsapi.org/v2/top-headlines?country=us&apiKey=452678616dde4b8b84d89424f422b04e&pagesize=16`;
var apikey = '452678616dde4b8b84d89424f422b04e';


const headers_options = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
}


async function getNews(url) {
    let resp = await fetch(url, headers_options);
    let respData = await resp.json();
    console.log(respData)

    showNews(respData.articles);
}

getNews(APIURL);
//main function
function showNews(news){
    main.innerHTML = "";

    news.forEach((article) => {

    let dateNews = article.publishedAt;

    let newsApiDate = "2020-08-08T04:09:41Z" //API time Format

    let timestamp = new Date(dateNews).getTime();
    let Day = new Date(timestamp).getDate();
    let Month = new Date(timestamp).getMonth() + 1;
    let Year = new Date(timestamp).getFullYear();
    let OurNewDateFormat = `${Month}/${Day}/${Year}` ;

    if(article.urlToImage === null) {
        article.urlToImage = "./img/noimg.jpg"
    } else {
        article.urlToImage
    }


        const newsEl = document.createElement("div");
        newsEl.classList.add("article");
        newsEl.innerHTML = `
        <div class="news-info">
        <a href="${article.url}"><h3>${article.title}</h3></a>
        <span>Published: ${OurNewDateFormat}</span>
        </div>
        <img 
        src="${article.urlToImage}"
        alt = "${article.title}"
        >
        <div class="descrition">
        ${article.description}
        </div>
        <div class="summary">
        <h3>Summary:</h3>
        ${article.content}
        </div>
        <a href="${article.url}" target="_blank"><p>Read More</p></a>
        `;

        main.appendChild(newsEl) 

});

}


//Form/ get input and fetch it
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    const url = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apikey}`;

    if(searchTerm) {
        getNews(url)

        search.value = "";
    }
    
})

const toggleBtn = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');
//Toggle hamburger menu
toggleBtn.addEventListener('click', function() {
    navbarLinks.classList.toggle('active')
});

//Enable Nav to fetch API by clicking
document.querySelectorAll('.find').forEach(item => {
    item.addEventListener('click', e => {
        console.log(e.target.textContent)

        const searchTerm = e.target.textContent;
        const url = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apikey}`;

        if(searchTerm) {
            getNews(url)
        }
    })
})

//Make header fixed
window.onscroll = function() {myFunction()};

var header = document.getElementById('test');
var stick = header.offsetTop;

function myFunction() {
    if(window.pageYOffset > stick) {
        header.classList.add('stick'); 
    } else {
        header.classList.remove('stick')
    }
}
