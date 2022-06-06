let elementForm = document.querySelector(".js-form");
let KINOLAR = movies.slice(0, 64);
let elementSearch = document.querySelector(".search-input");
let elCardWrapper = findElement(".wrapp");
let elCategorySelect = document.querySelector(".category-select");
const elCardTemplate = document.getElementById("template").content;
const elBookmarkTemplate = document.getElementById('bookmark-template').content
let elementImg = document.querySelector(".movie-link");
let regex = new RegExp();
let elPreviusbtn = document.querySelector(".previous");
let elNextbtn = document.querySelector(".next");
let elPageCount = document.querySelector(".page-count");
let elBookmarklist = document.querySelector('.bookmark_list')

let limit = 8;
let page = 1;
let maxPage = Math.ceil(KINOLAR.length / limit);
let bookmark = localStorage.getItem('bookmark') ? JSON.parse(localStorage.getItem('bookmark')) : []


const sortFunction = {
  az: (a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    } else {
      return 1;
    }
  },
  za: (a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return 1;
    } else {
      return -1;
    }
  },
  hl: (a, b) => {
    if (a.imdbRating < b.imdbRating) {
      return 1;
    } else {
      return -1;
    }
  },
  lh: (a, b) => {
    if (a.imdbRating < b.imdbRating) {
      return -1;
    } else {
      return 1;
    }
  },
  no: (a, b) => {
    if (a.year < b.year) {
      return 1;
    } else {
      return -1;
    }
  },
  on: (a, b) => {
    if (a.year < b.year) {
      return -1;
    } else {
      return 1;
    }
  },
};

let getMovieGenres = (kinolar) => {
  let categories = [];
  kinolar.forEach((kino) => {
    kino.categories.forEach((category) => {
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });
    //  console.log(categories);
  });
  return categories;
};

let renderCategories = () => {
  let allCategories = getMovieGenres(KINOLAR);
  allCategories.forEach((category) => {
    let categoryOption = document.createElement("option");
    categoryOption.textContent = category;
    categoryOption.value = category;
    elCategorySelect.appendChild(categoryOption);
  });
};
renderCategories();
getMovieGenres(KINOLAR);

let elementsWrapper = document.createDocumentFragment()

let renderMovies = (arr) => {
  elCardWrapper.innerHTML = null;
  arr.forEach((movie) => {
    let templateClone = elCardTemplate.cloneNode(true);
    let title = templateClone.querySelector(".card-title");
    let img = templateClone.querySelector(".card-img-top");
    let movieLink = templateClone.querySelector(".movie-link");
    let texMvie = templateClone.querySelector(".card-text");
    let year = templateClone.querySelector(".year");
    let routine = templateClone.querySelector(".reyting");
    let star =  templateClone.querySelector(".star");
    let elBookmarkbtn = templateClone.querySelector('.liked')

   
    
    title.textContent = movie.title;
    img.src = movie.bigPoster;
    movieLink.href = movie.trailer;
    texMvie.textContent = movie.summary;
    year.textContent ='year : ' +  movie.year ; 
    routine.textContent = movie.imdbRating;
    elBookmarkbtn.dataset.id = movie.imdbId
    elementsWrapper.append(templateClone);
   
    elCardWrapper.appendChild(elementsWrapper)

  });
};

let handleSearch = (evt) => {
  evt.preventDefault();
  let category = elCategorySelect.value;
  let searchValue = elementSearch.value.trim();
  let regex = new RegExp(searchValue, "gi");
  if (category === "All") {
    fitredMovies = KINOLAR;
  } else {
    fitredMovies = KINOLAR.filter((movie) =>
      movie.categories.includes(category)
    );
  }
  console.log(sort.value);
  fitredMovies = fitredMovies.filter((movie) => movie.title.match(regex));
  fitredMovies.sort(sortFunction[sort.value]);
  renderMovies(fitredMovies);
};

elPageCount.textContent = page;

elPreviusbtn.disabled = true;

let handleNextpage = () => {
  page += 1;
  if (page <= maxPage) {
    elPageCount.textContent = page;
    renderMovies(KINOLAR.slice(limit * (page - 1), page * limit));
  }
  if (page === maxPage) {
    elNextbtn.disabled = true;
  } else {
    elPreviusbtn.disabled = false;
    elNextbtn.disabled = false;
  }
};

let handlePrevpage = () => {
  page -= 1;
  if (page > 0) {
    elPageCount.textContent = page;
    renderMovies(KINOLAR.slice(limit * (page - 1), page * limit));
  }

  if (page === 1) {
    elPreviusbtn.disabled = true;
  }

  elNextbtn.disabled = false;
};

let elBookmarkWrapper = document.createDocumentFragment()

console.log(elBookmarkWrapper);

let renderBookmarks = (arr) =>{
  arr.forEach(bookmark =>{
   let bookmarkClone = elBookmarkTemplate.cloneNode(true)
   let title = bookmarkClone.querySelector('.bookmark__title')
   title.textContent = bookmark.title
    console.log(bookmarkClone, bookmark);
    elBookmarkWrapper.appendChild(bookmarkClone)
  })
  elBookmarklist.innerHTML = null
  elBookmarklist.append(elBookmarkWrapper)
}

let handleListEvent =(evt) => {
  if(evt.target.matches('.liked')){
    let foundMovie = KINOLAR.find((movie) => movie.imdbId===evt.target.dataset.id)
    let bookmarkMovie = bookmark.find(bookMark=> bookMark.imdbId ===evt.target.dataset.id)
    if (!bookmarkMovie){
      bookmark.push(foundMovie)
    }
    console.log(bookmarkMovie);

 
    localStorage.setItem('bookmark', JSON.stringify(bookmark))
    renderBookmarks(bookmark)
  }
}
renderBookmarks(bookmark)
renderMovies(KINOLAR.slice(0, 8));
elCardWrapper.addEventListener('click', handleListEvent )
elementForm.addEventListener("submit", handleSearch);
elNextbtn.addEventListener("click", handleNextpage);
elPreviusbtn.addEventListener("click", handlePrevpage);
// elBookmarkbtn.addEventListener('click',handleBookMark)