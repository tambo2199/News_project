let mess = document.getElementById('message');
mess.style.display = "none";

let ur = window.location.search.toString().toLowerCase().split("?");
let url;
let url_split = "";

if(ur[1] === undefined)
{
  url = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=95572d4506ad4ee2aa1b6a536d77c7b7';
}
else
{
  url_split = ur[1].split("=");
  url = `https://newsapi.org/v2/everything?q=${url_split[1]}&sources=bbc-news&apiKey=95572d4506ad4ee2aa1b6a536d77c7b7`;
}

const options = {
  method: 'GET',
}

fetch(url, options)
.then(res => res.json())
.then(json => {
  console.log(json);

  if(json.totalResults == 0){
    let mess = document.getElementById('message');
    mess.style.display = "block";
    mess.innerHTML = "Sorry. No news to see here."
  }

  json.articles.map((item) =>
  {
    const title = item.title;
    const published_date = item.publishedAt.toString().substring(0, 10);
    let published_date_split = published_date.split("-");
    let published_date_final = `${published_date_split[2]}/${published_date_split[1]}/${published_date_split[0]}`
    const publishedhour = item.publishedAt.toString().substring(11, 16);
    const description = item.description;
    const url_news = item.url;

    const news = `<div class = "news_space"><div class = "text"><h3>${title}</h3><p>published: ${published_date_final} ${publishedhour}</p></p><p>${description}</p><p class = "url_news"><a href="${url_news}">Read here</a></p></div></div>`;
    document.querySelector('.news').innerHTML += news;

  })

})
.catch(err => console.error('error:' + err));

function search(){

  let ur = window.location.href.toString().split("?");
  let v = document.getElementById('txt').value;
  let vi = v.split(" ");
  let i = 0;
  let q = "";
  let queryString = "";


  if(!v.toString().includes(" "))
  {
    window.location.href = ur[0] + `?search=${v}`;
  }
  else if(v.toString() == "")
  {
    let mess = document.getElementById('message');
    mess.style.display = "block";
    mess.style.color = "rgba(255, 255, 255, 0.9)";
    mess.innerHTML = "Sorry. No news to see here."
  }
  else
  {
    while(vi[i] !== undefined)
    {
      q = q + vi[i] + "+";
      i++
    }

    queryString = q.substring(0, q.length-1);

    window.location.href = `${ur[0]}?search=` + queryString;
  }
}


let page_title = document.getElementById('title').onclick = function()
{
  location.href = "./index.html";
}

document.getElementById('txt').onclick = function()
{
  if(document.getElementById('txt').value.toString() == "keyword")
  {
    document.getElementById('txt').value = "";
  }
  else
  {}
}
