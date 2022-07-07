const toggleBtn = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');
const nycEl = document.getElementById('nyc');
const mostEl = document.getElementById('most');
const artEL = document.getElementById('art');
const fashionEL = document.getElementById('fashion');
const main = document.getElementById('main')
const listEl = document.querySelector('li')[1]
const btnContainer = document.getElementById('button-container')
const btns = btnContainer.getElementsByClassName('page-btn');
const search = document.getElementById('search');
const searchForm = document.getElementById('form');

const bypass_cors_urls = 'https://cors-anywhere.herokuapp.com/';
const headers_option = {
    method: 'GET',
    headers: {
        "Accept": "application/json"
    }
}

let apiCall = "https://api.nytimes.com/services/xml/rss/nyt/Economy.xml";
let apiCallHomePage = "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";
let apiArt = "https://api.nytimes.com/services/xml/rss/nyt/Arts.xml";
let apiMostViewed = "https://rss.nytimes.com/services/xml/rss/nyt/MostViewed.xml";
let apiFashion = "https://rss.nytimes.com/services/xml/rss/nyt/FashionandStyle.xml";
let apiNYC = "https://rss.nytimes.com/services/xml/rss/nyt/NYRegion.xml";
let keyAPI = "Wo0A0SDeIqsDBxWYtkbrnWrwmABjlGFZ";
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

function getTime(input) {
    let timestamp = new Date(input).getTime();
    let day = new Date(timestamp).getDate();
    let month = monthNames[new Date(timestamp).getMonth() + 1];
    let year = new Date(timestamp).getFullYear();
    let time = `${month} ${day}, ${year}`;
    return time;
}

async function worldXml(url, item) {
    // let url = "https://rss.nytimes.com/services/xml/rss/nyt/NYRegion.xml";
    // let mostURL = "https://rss.nytimes.com/services/xml/rss/nyt/MostViewed.xml";
    let resp = await fetch(url, headers_option);
    let respData = await resp.text();

    console.log(new window.DOMParser().parseFromString(respData, "text/html"));
    showWorldXml(new window.DOMParser().parseFromString(respData, "text/html"), item);
}

//function for all news for the Home Page
async function getHomeNews(url, initialI, maxI) {
    let resp = await fetch(url, headers_option);
    let respData = await resp.text();
    console.log("Main results: ")
    console.log(new window.DOMParser().parseFromString(respData, "text/html"))
    getFrontPageNews(new window.DOMParser().parseFromString(respData, "text/html"), initialI, maxI);
}

//CALLING FUNCTIONS TO FETCH OUTPUT
worldXml(apiArt, artEL);
worldXml(apiFashion, fashionEL);
worldXml(apiMostViewed, mostEl);
worldXml(apiNYC, nycEl);
getHomeNews(apiCallHomePage, 2, 8);
//END OF CALLS

const getFrontPageNews = (xml, initialI, maxI) => {
    main.innerHTML = '';
    

    for (let i = initialI; i < maxI; i++) {
        //get all images
        let images = xml.getElementsByTagName('media:content')[i].getAttribute("url");
        let imgE = document.createElement('img');
        imgE.src = `${images}`;

        //get titles
        const titles = xml.getElementsByTagName('title')[i+2];
        //get tittle Link
        const titleLink = xml.getElementsByTagName('link')[i];
        //get description
        const description = xml.getElementsByTagName('description')[i+1];
        //get published date
        const publishedDate = xml.getElementsByTagName('pubDate')[i].textContent;
        //get Media description1
        let shortSummary = xml.getElementsByTagName('media:description')[i].textContent;
        let isNotEmptySummary = shortSummary.textContent ? shortSummary.textContent : shortSummary.textContent = "";
        //get article url
        const articleURL = xml.getElementsByTagName('atom:link')[i+1].getAttribute("href");
        //get article creatr
        const articleCreator = xml.getElementsByTagName('dc:creator')[i -2].textContent;


        

        const mainNewsEl = document.createElement("div");
        mainNewsEl.classList.add("article");
        if(shortSummary.textContent === null) {
            shortSummary.textContent= '';
        } else {
            shortSummary.textContent = shortSummary.textContent
        }
        mainNewsEl.innerHTML = `
        <section class="news-info">
        <div class="border-top"></div>
            <div class="news-title">
                <a href="${articleURL}" target="blank">
                    <h3>${titles.textContent}</h3>
                </a>
                <ul>
                <li>${description.textContent}</li>
                <li class="on">${isNotEmptySummary}</li>
            </ul>
            <span>Published: ${getTime(publishedDate)}</span>
            <a href="${articleURL}" target="_blank">
                <p>Read More</p>
            </a>
            </div>
            <div class="mainNewsIMG">
             <a href="${articleURL}" target="blank">
                <figure class="mainNews">
                    <img src="${images}"  alt="">
                    <figcaption>Created by: ${articleCreator}</figcaption>
                </figure>
             </a>
            </div>
            <div class="border-bottom"></div>
        </section>
         `
         main.appendChild(mainNewsEl);
    }
}

const showWorldXml = (xml, itemSpecified) => {

    for (let i = 2; i < 7; i++) {
        //get all images
        let images = xml.getElementsByTagName('media:content')[i].getAttribute("url");
        let imgE = document.createElement('img');
        imgE.src = `${images}`;

        //get titles
        const titles = xml.getElementsByTagName('title')[i+2];
        //get tittle Link
        const titleLink = xml.getElementsByTagName('link')[i];
        //get description
        const description = xml.getElementsByTagName('description')[i];
        //get published date
        const publishedDate = xml.getElementsByTagName('pubDate')[i].textContent;
        //get Media description1
        const shortSummary = xml.getElementsByTagName('media:description')[i];
        //get article url
        const articleURL = xml.getElementsByTagName('atom:link')[i+1].getAttribute("href");
        //get the creator of the article for figcaption
        const articleCreator = xml.getElementsByTagName('dc:creator')[i].textContent;

        const newsEl = document.createElement("div");
        const lowerNewsEl = document.createElement("div");
        newsEl.classList.add("data");
        lowerNewsEl.classList.add("lowerData");
        //do if statement to dediced wether its the header or the extras
        if(i === 2) {

        newsEl.innerHTML = `
            <div class="side-news-info">
            <figure class="side-news-img">
                <img src="${images}"/>
                <figcaption>Created by: ${articleCreator}</figcaption> 
            </figure>
                <a href="${articleURL}" target="_blank">
                    <h3>${titles.textContent}</h3>
                </a>
                <p>${shortSummary.textContent}</p>
            </div>
            <div class="side-up-border"></div>
            <div class="border-background-side"></div>
            <div class="side-up-border"></div>
        `
        itemSpecified.appendChild(newsEl);
        } else {
            lowerNewsEl.innerHTML = `
            <div class="news-info-group">
            <figure class="side-news-img-group">
                <img src="${images}"/>
                <figcaption></figcaption> 
                <a href="${articleURL}" target="_blank">
                    <h3>${titles.textContent}</h3>
                </a>
            </figure>
                
            </div>
        `
        itemSpecified.appendChild(lowerNewsEl);
        } //End of if-statement
    }
}

async function getSearch (url) {
    let resp = await fetch(url, headers_option);
    let respData = await resp.json();

    console.log("Search Results: ")
    console.log(respData);
    showSearch(respData);
}

const showSearch = (xml) => {
    var data = xml.response.docs;
    main.innerHTML = "";
  for (let i = 0; i < 12; i++) {

    //getAll images
    var images = data[i].multimedia[i].url;
    var images2;
    //title's
    const titles = data[i].headline.main;
    //
    //title's link
    const titleLink = data[i].multimedia.caption;
    //
    //descriptions
    const descriptions = data[i].snippet;
    //
    //publishedDate
    const pubDate = data[i].pub_date;
    //
    //Media-descriptions
    const shortSummary = data[i].lead_paragraph;
    //
    //article-url
    const articleURL = data[i].web_url;
    //
    //creator
    const articleCreator = data[i].byline.original;


    if (images === undefined) {
      images = "./resources/img/noimg.jpg"
    } else {
      images = "http://www.nytimes.com/" + images;
    }

    const mainNewsEl = document.createElement("div");
        mainNewsEl.classList.add("article");
        if(shortSummary.textContent === null) {
            shortSummary.textContent= '';
        } else {
            shortSummary.textContent = shortSummary.textContent
        }
        mainNewsEl.innerHTML = `
        <section class="news-info">
        <div class="border-top"></div>
            <div class="news-title">
                <a href="${articleURL}" target="blank">
                    <h3>${titles}</h3>
                </a>
                <ul>
                <li>${descriptions}</li>
                <li class="on">${shortSummary}</li>
            </ul>
            <span>Published: ${getTime(pubDate)}</span>
            <a href="${articleURL}" target="_blank">
                <p>Read More</p>
            </a>
            </div>
            <div class="mainNewsIMG">
             <a href="${articleURL}" target="blank">
                <figure class="mainNews">
                    <img src="${images}"  alt="">
                    <figcaption>Created by: ${articleCreator}</figcaption>
                </figure>
             </a>
            </div>
            <div class="border-bottom"></div>
        </section>
         `
         main.appendChild(mainNewsEl);
}
}

//Search Button and Submit API call
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const searchTerm = search.value;
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&api-key=${keyAPI}`;
  
    if (searchTerm) {
      getSearch(url)
  
      search.value = "";
    }
  
  })

//Pre-selected Options for News @headers
document.querySelectorAll('.find').forEach(item => {
    item.addEventListener('click', e => {
        console.log('Searching for: ' + e.target.textContent);

        const searchTerm = e.target.textContent;
        const url = `https://rss.nytimes.com/services/xml/rss/nyt/${searchTerm}.xml`;

        if(searchTerm) {
            getHomeNews(url, 2, 8)
        }

    })
})

//Pagination for Main news w/ the buttons
for(let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";

        switch(current[i]) {
            case current[0]: 
                getHomeNews(apiCallHomePage, 2, 8)
                break;
            case current[1]:
                getHomeNews(apiCallHomePage, 9, 16)
                break;
            case current[2]:
                getHomeNews(apiCallHomePage, 17, 23)
                break;
            default:
                getHomeNews(apiCallHomePage, 2, 8)
        }  
    });
}
//End of Pagination

//activate sticky class for header/navbar
window.onscroll = function () { stickFunction() };
let header = document.getElementById('test');
let stick = header.offsetTop;

function stickFunction() {
    if (window.pageYOffset > stick) {
        header.classList.add('stick');
    } else {
        header.classList.remove('stick')
    }
}

toggleBtn.addEventListener('click', function () {
    navbarLinks.classList.toggle('active')
});
//End of sticky class

//Function to remove Li's items displaying no text
function isItEmptyOrNot(item) {
    if(item.textContent === null) {
        item.classList.add('off')
    }
}

window.addEventListener('load', isItEmptyOrNot(listEl));
//End of function