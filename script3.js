const bypass_cors_url = 'https://cors-anywhere.herokuapp.com/'

const headers_options = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
}


const main = document.getElementById("main");
const art = document.getElementById("art");


let apiKey = '3e070828bcc96aae620854db09456168';
let catcherKey = 'Stxhq2ajMYCu6zC9KEJkardpc7jkNL8do8y8n-guGpM'
let api_URL = `${bypass_cors_url}http://api.mediastack.com/v1/news?access_key=${apiKey}&languages=en&keywords=newyork&limit=8`;
let art_URL = `${bypass_cors_url}http://api.mediastack.com/v1/news?access_key=${apiKey}&languages=en&countries&keywords=art&limit=6`;

async function getNews(url) {
    let resp = await fetch(url, headers_options);
    let respData = await resp.json();
    console.log(respData)

    showNews(respData.data);
}

async function getArt(url) {
    let resp = await fetch(url, headers_options);
    let respData = await resp.json();
    console.log(respData)

    showArt(respData.data);
}

getNews(api_URL);
getArt(art_URL);

function showNews(news){
    main.innerHTML = "";

    news.forEach((data) => {

    let dateNews = data.published_at;

    let newsApiDate = "2020-08-08T04:09:41Z" //API time Format

    let timestamp = new Date(dateNews).getTime();
    let Day = new Date(timestamp).getDate();
    let Month = new Date(timestamp).getMonth() + 1;
    let Year = new Date(timestamp).getFullYear();
    let OurNewDateFormat = `${Month}/${Day}/${Year}` ;

    if(data.image === null) {
        data.image = "./img/noimg.jpg"
    } else {
       data.image
    }


        const newsEl = document.createElement("div");
        newsEl.classList.add("article");
        newsEl.innerHTML = `
        <div class="news-info">
        <a href="${data.url}"><h3>${data.title}</h3></a>
        <span>Published: ${OurNewDateFormat}</span>
        </div>
        <img 
        src="${data.image}"
        alt = "${data.title}"
        >
        <div class="descrition">
        ${data.description}
        </div>
        <a href="${data.url}" target="_blank"><p>Read More</p></a>
        `;

        main.appendChild(newsEl) 

});

}

function showArt(news){
    art.innerHTML = "";

    news.forEach((data) => {

    let dateNews = data.published_at;

    let newsApiDate = "2020-08-08T04:09:41Z" //API time Format

    let timestamp = new Date(dateNews).getTime();
    let Day = new Date(timestamp).getDate();
    let Month = new Date(timestamp).getMonth() + 1;
    let Year = new Date(timestamp).getFullYear();
    let OurNewDateFormat = `${Month}/${Day}/${Year}` ;

    if(data.image === null) {
        data.image = "./img/noimg.jpg"
    } else {
       data.image
    }


        const newsEl = document.createElement("div");
        newsEl.classList.add("article");
        newsEl.innerHTML = `
        <div class="news-info">
        <a href="${data.url}"><h3>${data.title}</h3></a>
        <span>Published: ${OurNewDateFormat}</span>
        </div>
        <img 
        src="${data.image}"
        alt = "${data.title}"
        >
        <div class="descrition">
        ${data.description}
        </div>
        <a href="${data.url}" target="_blank"><p>Read More</p></a>
        `;

        art.appendChild(newsEl) 

});

}