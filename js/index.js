let elementForm = document.querySelector('.js-form')
let KINOLAR = movies.slice( 0, 64)
let elementSearch = document.querySelector('.search-input')
let elCardWrapper = findElement(".wrapp");
let elCategorySelect = document.querySelector('.category-select')
const elCardTemplate = document.getElementById("template").content;
let elementImg = document.querySelector('.movie-link')
let sort = document.querySelector('.sort-select')
let regex = new RegExp()
let elPreviusbtn = document.querySelector('.previous');
let elNextbtn = document.querySelector('.next')
let elPageCount = document.querySelector('.page-count')
let limit = 8
let page = 1
let maxPage = Math.ceil(KINOLAR.length / limit)
console.log(maxPage);
const sortFunction = {
  az:(a , b) =>{
    if (a.title.toLowerCase() < b.title.toLowerCase()){
      return -1
    }else{
      return 1
    }
  },
  za:(a , b) =>{
    if (a.title.toLowerCase() < b.title.toLowerCase()){
      return 1
    }else{
      return -1
    }
  },
  hl:(a , b) =>{
    if (a.imdbRating < b.imdbRating){
      return 1
    }else{
      return -1
    }
  },
  lh:(a , b) =>{
    if (a.imdbRating < b.imdbRating){
      return -1
    }else{
      return 1
    }
  },
  no:(a , b) =>{
    if (a.year < b.year){
      return 1
    }else{
      return -1
    }
  },
  on:(a , b) =>{
    if (a.year < b.year){
      return -1
    }else{
      return 1
    }
  }
}

let getMovieGenres = (kinolar) =>{
  let categories = []
  kinolar.forEach(kino => {
    kino.categories.forEach(category => {
      if (!categories.includes(category)){
        categories.push(category)
      }
    
    })
  //  console.log(categories);
 })
 return categories
}

let renderCategories = () => {
  let allCategories = getMovieGenres(KINOLAR)
  allCategories.forEach((category) => {
    let categoryOption = document.createElement('option')
    categoryOption.textContent = category
    categoryOption.value = category
    elCategorySelect.appendChild(categoryOption)
  })
}
renderCategories()
getMovieGenres(KINOLAR)

let renderMovies = (arr) => {
  elCardWrapper.innerHTML = null
  arr.forEach((movie) => {
    let templateClone = elCardTemplate.cloneNode(true);
    let title = elCardTemplate.querySelector(".card-title");
    let img = elCardTemplate.querySelector(".card-img-top");
    let movieLink = elCardTemplate.querySelector(".movie-link");
    let texMvie= elCardTemplate.querySelector(".card-text");
    let year= elCardTemplate.querySelector(".year");
    let routine = elCardTemplate.querySelector(".reyting");

    title.textContent = movie.title;
    img.src = movie.bigPoster;
    movieLink.href = movie.trailer
    texMvie.textContent = movie.summary
    year.textContent = movie.year
    routine.textContent = movie.runtime
    elCardWrapper.append(templateClone);
  });
  
}


let handleSearch = (evt) => {
 evt.preventDefault();
 let category = elCategorySelect.value
 let searchValue = elementSearch.value.trim();
 let regex = new RegExp (searchValue, 'gi');
 if(category==='All') {
  fitredMovies = KINOLAR
 }else {
 fitredMovies = KINOLAR.filter((movie)=> movie.categories.includes(category))
}
console.log(sort.value);
fitredMovies = fitredMovies.filter((movie) =>movie.title.match(regex))
fitredMovies.sort(sortFunction[sort.value])
renderMovies(fitredMovies);
}

elPageCount.textContent = page

let handleNextpage = () => {
  page += 1
  if (page <= maxPage) {
    elPageCount.textContent = page
    renderMovies(KINOLAR.slice(limit*(page - 1), page*limit))
  }if (page === maxPage) {
    // elPreviusbtn.disabled = false
    elNextbtn.disabled = true
  }
  else {
    elNextbtn.disabled = false
  }
}


let handlePrevpage = () =>{
  page -=1
  if (page > 0) {
    elPageCount.textContent = page
    renderMovies(KINOLAR.slice(limit*(page - 1), page*limit))
  }

  if (page === 1){
    elPreviusbtn.disabled = true
  }

}


elementForm.addEventListener('submit', handleSearch)
renderMovies(KINOLAR.slice(0, 8))
elNextbtn.addEventListener('click', handleNextpage)
elPreviusbtn.addEventListener('click', handlePrevpage)