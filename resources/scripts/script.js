const toggleBtn = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');
const nyc = document.getElementById("nyc");

const bypass_cors_urls = 'https://cors-anywhere.herokuapp.com/'

const headers_option = {
    method: 'GET',
    headers: {
        // 'Access-Control-Allow-Origin': '*',
        "Accept": "application/json"
    }
}

let usrls = "https://api.nytimes.com/services/xml/rss/nyt/Economy.xml";
var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];


function getTime (input) {
  var timestamp = new Date(input).getTime();
  var Day = new Date(timestamp).getDate();
  var Month = monthNames[new Date(timestamp).getMonth() + 1];
  var Year = new Date(timestamp).getFullYear();
  var time = `${Month} ${Day}, ${Year}`
  return time;
}
async function worldXml() {
  let url = "https://rss.nytimes.com/services/xml/rss/nyt/NYRegion.xml";
  let resp = await fetch(url, headers_option);
  let respData = await resp.text();

  console.log(new window.DOMParser().parseFromString(respData, "text/xml"));
  showWorldXml(new window.DOMParser().parseFromString(respData, "text/xml"));
  

}


worldXml()


const showWorldXml = (xml) => {
  const names = xml.getElementsByTagName('item');
  
  for(let i = 2; i < 11; i++) {

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
    const pubDate = xml.getElementsByTagName('pubDate')[i].textContent;
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
    <span>Published: ${getTime(pubDate)}</span>
  
     `

    nyc.appendChild(newsEl);
  }
}


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

toggleBtn.addEventListener('click', function(){
  navbarLinks.classList.toggle('active')
});