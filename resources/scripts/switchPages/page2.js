const ss = document.getElementById('e');
const cc = document.getElementById('b');
const main2 = document.getElementById('main2');


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