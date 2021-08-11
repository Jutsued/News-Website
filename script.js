// var url = 'http://newsapi.org/v2/top-headlines?' +
//           'country=us&' +
//           'apiKey=452678616dde4b8b84d89424f422b04e';
// var req = new Request(url);
// fetch(req)
//     .then(function(response) {
//         return response.json();
//     }).then((data) => {
//         console.log(data)
//     })

// const searchForm = document.querySelector('.search');
// const input = document.querySelector('.input');
// const newsList = document.querySelector('.news-list');


const world = document.getElementById("world");

let countries = ["ar", "au", "br", "ca", "co", "cz", "eg", "de", "gr", "hk", "in", "it", "jp", "ng", "no", "kr", "za", "sa", "cn"];

let apKey = '3e070828bcc96aae620854db09456168';
let apiURL = `http://api.mediastack.com/v1/news?access_key=${apKey}&languages=en&countries=-us&limit=10`;


async function worldNews(url) {
    let resp = await fetch(url);
    let respData = await resp.json();
    console.log(respData)

    worldShowNews(respData.data);
}

worldNews(apiURL);

function worldShowNews(news){
    world.innerHTML = "";

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
        newsEl.classList.add("data");
        newsEl.innerHTML = `
        <div class="data-info">
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

        world.appendChild(newsEl) 

});

}