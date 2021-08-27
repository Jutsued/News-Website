const ss = document.getElementById('e');
const cc = document.getElementById('b');
const main2 = document.getElementById('main2');
const searhForm = document.getElementById('form');
const searh = document.getElementById('search');


ss.addEventListener('click', fun)
function fun() {
    document.location.href=`../pages/page3.html`;
    console.log('2nd trial')
}

cc.addEventListener('click', zun)
function zun() {
    document.location.href=`../../index.html`;
    console.log('home page')
}


const headrs = {
    method: 'GET',
    headers: {
        // 'Access-Control-Allow-Origin': '*',
        "Accept": "application/json"
    }
}

let urll = "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";


async function secondXml(url) {
    // let url = "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";
    let resp = await fetch(url, headrs);
    let respData = await resp.text();
  
  
    secondPage(new window.DOMParser().parseFromString(respData, "text/xml"));
  
  
  }
  
  
  secondXml(urll)
  
  
  const secondPage = (xml) => {
    const names = xml.getElementsByTagName('item');
    main2.innerHTML = '';
    
    for(let i = 8; i < 15; i++) {
  
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
      
      main2.appendChild(newsEl);
    }
  }


  async function secondSearch(url) {
    let resp = await fetch(url, headers_options);
    let respData = await resp.json();
  
    // showSearch(new window.DOMParser().parseFromString(respData, "text/xml"));
    // console.log(new window.DOMParser().parseFromString(respData, "text/docs"));
    console.log(respData)
    showSecondSearch(respData);
  
  }
  
  
  const showSecondSearch = (xml) => {
    var data = xml.response.docs;
    main2.innerHTML = "";
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
  
      main2.appendChild(newsEl);
    }
  }
  
  //Form/ get input and fetch it
  searhForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const searchTerm = searh.value;
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&api-key=${keyAPI}`;
  
    if (searchTerm) {
      secondSearch(url)
  
      searh.value = "";
    }
  
  })