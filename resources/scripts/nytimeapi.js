const searchForm = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const art = document.getElementById('art')
const fashion = document.getElementById('fashion')

const bypass_cors_url = 'https://cors-anywhere.herokuapp.com/'

const headers_options = {
  method: 'GET',
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    "Accept": "application/json"
  }
}

let usrl = "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";
let keyAPI = "Wo0A0SDeIqsDBxWYtkbrnWrwmABjlGFZ";

async function getXml(url) {
  // let url = "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";
  let resp = await fetch(url, headers_options);
  let respData = await resp.text();


  getUsers(new window.DOMParser().parseFromString(respData, "text/xml"));


}


getXml(usrl)


const getUsers = (xml) => {
  const names = xml.getElementsByTagName('item');
  main.innerHTML = '';

  for (let i = 1; i < 7; i++) {

    //getAll images
    var images = xml.getElementsByTagName('media:content')[i].getAttribute("url");
    var img = document.createElement("img");
    img.src = `${images}`;
    //
    //title's
    const titles = xml.getElementsByTagName('title')[i];
    //
    //title's link
    const titleLink = xml.getElementsByTagName('link')[i];
    //
    //descriptions
    const descriptions = xml.getElementsByTagName('description')[i];
    //
    //publishedDate
    const pubDate = xml.getElementsByTagName('pubDate')[i];
    //
    //Media-descriptions
    const shortSummary = xml.getElementsByTagName('media:description')[i];
    //
    //article-url
    const articleURL = xml.getElementsByTagName('atom:link')[i].getAttribute("href");
    //

    const newsEl = document.createElement("div");
    newsEl.classList.add("article");
    newsEl.innerHTML = `
    <div class="news-info">
    <a href="${titleLink.textContent}"><h3>${titles.textContent}</h3></a>
    <span>Published: ${pubDate.textContent}</span>
    </div>
    <img 
    src="${images}"
    >
    <div class="descrition">
    ${descriptions.textContent}
    </div>
    <div class="summary">
    <h3>Summary:</h3>
    ${shortSummary.textContent}
    </div>
    <a href="${articleURL}" target="_blank"><p>Read More</p></a>
     `

    main.appendChild(newsEl);
  }
}

async function getXmlArt() {
  let url = "https://api.nytimes.com/services/xml/rss/nyt/Arts.xml";
  let resp = await fetch(url, headers_options);
  let respData = await resp.text();


  getUsersArt(new window.DOMParser().parseFromString(respData, "text/xml"));



}


getXmlArt()


const getUsersArt = (xml) => {
  const names = xml.getElementsByTagName('item');

  for (let i = 2; i < 12; i++) {

    //getAll images
    var images = xml.getElementsByTagName('media:content')[i].getAttribute("url");
    var img = document.createElement("img");
    img.src = `${images}`;
    //
    //title's
    const titles = xml.getElementsByTagName('title')[i];
    //
    //title's link
    const titleLink = xml.getElementsByTagName('link')[i];
    //
    //descriptions
    const descriptions = xml.getElementsByTagName('description')[i];
    //
    //publishedDate
    const pubDate = xml.getElementsByTagName('pubDate')[i];
    //
    //Media-descriptions
    const shortSummary = xml.getElementsByTagName('media:description')[i];
    //
    //article-url
    const articleURL = xml.getElementsByTagName('atom:link')[i].getAttribute("href");
    //

    const newsEl = document.createElement("div");
    newsEl.classList.add("data");
    newsEl.innerHTML = `
      <div class="news-info">
      <a href="${titleLink.textContent}"><h3>${titles.textContent}</h3></a>
      <span>Published: ${pubDate.textContent}</span>
     
       `

    art.appendChild(newsEl);
  }
}

async function getMostView() {
  let url = "https://rss.nytimes.com/services/xml/rss/nyt/MostViewed.xml";
  let resp = await fetch(url, headers_options);
  let respData = await resp.text();

  showMost(new window.DOMParser().parseFromString(respData, "text/xml"));



}

getMostView()

const showMost = (xml) => {
  const names = xml.getElementsByTagName('item');

  for (let i = 2; i < 12; i++) {

    //getAll images
    var images = xml.getElementsByTagName('media:content')[i].getAttribute("url");
    var img = document.createElement("img");
    img.src = `${images}`;
    //
    //title's
    const titles = xml.getElementsByTagName('title')[i];
    //
    //title's link
    const titleLink = xml.getElementsByTagName('link')[i];
    //
    //descriptions
    const descriptions = xml.getElementsByTagName('description')[i];
    //
    //publishedDate
    const pubDate = xml.getElementsByTagName('pubDate')[i];
    //
    //Media-descriptions
    const shortSummary = xml.getElementsByTagName('media:description')[i];
    //
    //article-url
    const articleURL = xml.getElementsByTagName('atom:link')[i].getAttribute("href");
    //

    const newsEl = document.createElement("div");
    newsEl.classList.add("data");
    newsEl.innerHTML = `
      <div class="news-info">
      <a href="${titleLink.textContent}"><h3>${titles.textContent}</h3></a>
      <span>Published: ${pubDate.textContent}</span>
     
       `

    most.appendChild(newsEl);
  }
}

async function getFashion() {
  let url = "https://rss.nytimes.com/services/xml/rss/nyt/FashionandStyle.xml";
  let resp = await fetch(url, headers_options);
  let respData = await resp.text();

  showFashion(new window.DOMParser().parseFromString(respData, "text/xml"));



}

getFashion()

const showFashion = (xml) => {
  const names = xml.getElementsByTagName('item');

  for (let i = 2; i < 12; i++) {

    //getAll images
    var images = xml.getElementsByTagName('media:content')[i].getAttribute("url");
    var img = document.createElement("img");
    img.src = `${images}`;
    //
    //title's
    const titles = xml.getElementsByTagName('title')[i];
    //
    //title's link
    const titleLink = xml.getElementsByTagName('link')[i];
    //
    //descriptions
    const descriptions = xml.getElementsByTagName('description')[i];
    //
    //publishedDate
    const pubDate = xml.getElementsByTagName('pubDate')[i];
    //
    //Media-descriptions
    const shortSummary = xml.getElementsByTagName('media:description')[i];
    //
    //article-url
    const articleURL = xml.getElementsByTagName('atom:link')[i].getAttribute("href");
    //

    const newsEl = document.createElement("div");
    newsEl.classList.add("data");
    newsEl.innerHTML = `
      <div class="news-info">
      <a href="${titleLink.textContent}"><h3>${titles.textContent}</h3></a>
      <span>Published: ${pubDate.textContent}</span>
     
       `

    fashion.appendChild(newsEl);
  }
}

async function getSearch(url) {
  let resp = await fetch(url, headers_options);
  let respData = await resp.json();

  // showSearch(new window.DOMParser().parseFromString(respData, "text/xml"));
  // console.log(new window.DOMParser().parseFromString(respData, "text/docs"));
  console.log(respData)
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


    if (images === undefined) {
      images = "../img/noimg.jpg"
    } else {
      images = "http://www.nytimes.com/" + images;
    }

    const newsEl = document.createElement("div");
    newsEl.classList.add("article");
    newsEl.innerHTML = `
    <div class="news-info">
    <a href="${titleLink}"><h3>${titles}</h3></a>
    <span>Published: ${pubDate}</span>
    </div>
    <img 
    src="${images}"
    >
    <div class="descrition">
    ${descriptions}
    </div>
    <div class="summary">
    <h3>Summary:</h3>
    ${shortSummary}
    </div>
    <a href="${articleURL}" target="_blank"><p>Read More</p></a>
     `

    main.appendChild(newsEl);
  } //////////////////////////////////////////




  //////////////////////////////////////////////
}

//Form/ get input and fetch it
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&api-key=${keyAPI}`;

  if (searchTerm) {
    getSearch(url)

    search.value = "";
  }

})

//Enable Nav to fetch API by clicking
document.querySelectorAll('.find').forEach(item => {
  item.addEventListener('click', e => {
    console.log(e.target.textContent)

    const searchTerm = e.target.textContent;
    const url = `https://rss.nytimes.com/services/xml/rss/nyt/${searchTerm}.xml`;

    if (searchTerm) {
      getXml(url)
    }
  })
})