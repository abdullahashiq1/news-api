const apiKey = `c9da55fe1618434db7986c0669bfa975`;
let articles = [];  // store the fetched news articles

const fetchDataFromAPI = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        articles = data.articles    // sorting store
        shuffleAndDisplayArticles();
        // displayNews(articles)
    } catch (error) {
        console.error('Error:', error.message);
        return [];
    }
};

const shuffleAndDisplayArticles = () =>{
    shuffleArticles();  // shuffle the articles
    displayNews(articles)   // display the shuffled articles

}

const shuffleArticles = () =>{
    for(let i = articles.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [articles[i], articles[j]] = [articles[j], articles[i]]
    }
}

const sortByDateBtn = document.getElementById('sorting-date');
    sortByDateBtn.addEventListener('click', ()=>{
        articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        displayNews(articles)
})

const displayNews = (allNews) =>{
    const container = document.getElementById('news-container');
    container.innerHTML = '';   //clear previous content

    allNews.forEach((news, index) =>{
        console.log(news)
        // || index ===1 || index === 2
        const div = document.createElement('div');
        div.classList.add('col-12');

        if(index === 0 || index === 2){
            div.classList.add('col-8');
            div.classList.remove('col-12');
        }  else{
            div.classList.add('col-sm-4')
        }
        
        // overlay text on image 
        div.innerHTML = `
        <div class="card" > 
            <div class="bg-image img-fluid">
                ${news.urlToImage  ? `<img src="${news.urlToImage}" style="height: 250px;" class="card-img-top" alt="...">` 
                : '<div class="no-image">No Image Available</div>'}
                <div class=" card-img-overlay  text-light pe-auto w-100">
                    <p class="p-2 m-0 text-hover">${news.title}</p>
                </div>
            </div>

            <div class="card-body">
                <p class="card-text">${news.description ? `${news.description.slice(0, 70)}` : `${news.description}`}</p>
            </div>    
        </div>
        <a href="${news.url}" target="_blank" class="ml-5 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
            Read More
        </a>
        `;
        container.appendChild(div);

    })
}

// trigger the loading of news
fetchDataFromAPI();
