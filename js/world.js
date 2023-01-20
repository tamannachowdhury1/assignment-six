const loadCategories = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category);
    } catch (error) {
        console.log(error + ' correction this line');
    }

}
const displayCategories = (headLine) => {
    const headLineContainer = document.getElementById('headline-container');
    headLine.forEach(element => {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `

        <a onclick="loadNews('${element.category_id}'), toggleSpinner(true); "> ${element.category_name} </a>
    
        `;
        headLineContainer.appendChild(newDiv);
    });

}
const loadNews = async (id) => {
    try {
        const url = ` https://openapi.programming-hero.com/api/news/category/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayNewsCategories(data.data)
    } catch (error) {
        console.log(error + ' correction this line')
    }

}

let displayNewsCategories = (details) => {
    const showNews = document.getElementById('show-news');
    showNews.innerHTML = ``;
    //items found for cetegory
    if (details.length === 0) {
        document.getElementById('cata-id').innerHTML = 'NO ITEM HERE'
    } else {
        document.getElementById('cata-id').innerHTML = details.length + ' Items found for Cetegory';
    }

    //sort view
    details.sort((a, b) => {
        const sortContainer = document.getElementById('sort-container');
        const fff = (b.total_view - a.total_view)
        sortContainer.innerText = fff;

    });


    //news main section show
    details.forEach(element => {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                     <img src=" ${element.thumbnail_url} " class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h4 class="card-title "> ${element.title} </h4>
                        <p class="card-text fs-5"> ${element.details.slice(0, 340)} . . . </p>
                        <div class="d-flex">
                           <div>
                               <img src=" ${element.author.img} " class="img-thumbnail rounded-start"  alt="..." style="width:80px; height:80px; border-radius:50%">
                           </div>
                           <div>
                               <p class="card-text fs-5"> ${element.author.name} </p>
                               <p class="card-text"> ${element.author.published_date} </p>
                           </div>
                           <div class="pt-4">
                                <p class =" px-4 mx-4"> <i class="fa-solid fa-eye"> ${element.total_view} M </i> </p>
                           </div>
                           <div class="pt-3">
                                <button onclick="loadShowDetails('${element._id}')" class="btn btn-primary  px-4 mx-4" data-bs-toggle="modal" data-bs-target="#newsDetailModal" >Details</button>
                           </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        `;
        showNews.appendChild(newDiv);

    });
    //stop loader
    toggleSpinner(false);
}

// spinner loader 
const toggleSpinner = isLoading => {

    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}

// news details modal 
const loadShowDetails = async id => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        newsModalShow(data.data);
    }
    catch (err) {
        console.log(err + ' correction this line')
    }
}

const newsModalShow = news => {

    const showcontainer = document.getElementById('news-details');
    showcontainer.innerHTML = ' ';
    let newsDiv = document.createElement('div');

    newsDiv.innerHTML = `
            <h4>${news[0].title}</h4>      
            <img src=" ${news[0].image_url} " class="img-fluid rounded-start" alt="..." >
            <p class="card-text fs-5"> ${news[0].details.slice(0, 340)} </p>
            <div class= "d-flex">
                <div class="pt-4">
                    <img src= " ${news[0].author.img} " style="width:80px; height:80px; border-radius:50%" >
                </div>
                <div class="pt-4">
                  <p class="card-text fs-6"> ${news[0].author.name ? news[0].author.name : 'No found name!'} </p>
                  <p class="card-text"> ${news[0].author.published_date ? news[0].author.published_date : 'No found published date!'} </p>
                </div>
                <div class="pt-5">
                  <p class =" px-4 mx-4"> <i class="fa-solid fa-eye"> ${news[0].total_view ? news[0].total_view : 'no view data'} M </i> </p>
                </div>
            </div>
        `;

    showcontainer.appendChild(newsDiv);
}



loadCategories();



