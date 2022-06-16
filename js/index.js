// here we choosed elements from html
let elementForm = document.querySelector(".js-form");
let KINOLAR = movies.slice(0, 104);
let elementSearch = document.querySelector(".search-input");
let elCardWrapper = findElement(".wrapp");
let elCategorySelect = document.querySelector(".category-select");
let sort = document.querySelector('.sort-select')
const elCardTemplate = document.getElementById("template").content;
const elBookmarkTemplate = document.getElementById('bookmark-template').content
let elementImg = document.querySelector(".movie-link");
let regex = new RegExp();
let elPreviusbtn = document.querySelector(".previous");
let elNextbtn = document.querySelector(".next");
let elPageCount = document.querySelector(".page-count");
let elBookmarklist = document.querySelector('.bookmark_list')
let elModalTitle = document.querySelector('.modal_title')
let elModalSummary = document.querySelector('.modal_text')
let elBookMarkList = document.querySelector('.bookmark_list')

// this is formula of pagenation

let limit = 8;
let page = 1;
let maxPage = Math.ceil(KINOLAR.length / limit);
let bookmark = localStorage.getItem('bookmark') ? JSON.parse(localStorage.getItem('bookmark')) : []

// this function of sort we sorted by this way 

const sortFunction = {
  // sorted from a to z
  az: (a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    } else {
      return 1;
    }
  },
  za: (a, b) => {
    // sorted from z to a
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return 1;
    } else {
      return -1;
    }
  },
  hl: (a, b) => {
    // sorted by the rating
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
    // sorted by the year of movie
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

// here we choose categories of movies
let getMovieGenres = (kinolar) => {
  // opened empty arr
  let categories = [];
  kinolar.forEach((kino) => {
    // raunded all movies
    kino.categories.forEach((category) => {
      // raunded all movies's category
      if (!categories.includes(category)) {
        // there aren't category 
        categories.push(category);
      }
    });
  });
  return categories;
};
// here we did rendering categories
let renderCategories = () => {
  let allCategories = getMovieGenres(KINOLAR);
  // here came all generes of movies 
  allCategories.forEach((category) => {
    // raunded all generes 
    let categoryOption = document.createElement("option");
    // created option tag 
    categoryOption.textContent = category;
    categoryOption.value = category;
    elCategorySelect.appendChild(categoryOption);
  });
};
renderCategories();
// called function 
(KINOLAR);
// we gave all movies to getMovieGenres

let elementsWrapper = document.createDocumentFragment()
// we made df wrapper 

let renderMovies = (arr) => {
  elCardWrapper.innerHTML = null;
  arr.forEach((movie) => {
    // here example of template
    let templateClone = elCardTemplate.cloneNode(true);
    // here we choosed all clone's elements
    let title = templateClone.querySelector(".card-title");
    let img = templateClone.querySelector(".card-img-top");
    let movieLink = templateClone.querySelector(".movie-link");
    let texMvie = templateClone.querySelector(".card-text");
    let year = templateClone.querySelector(".year");
    let routine = templateClone.querySelector(".reyting");
    let star =  templateClone.querySelector(".star");
    let elBookmarkbtn = templateClone.querySelector('.liked')
    let elModalBtn = templateClone.querySelector('.js-more')
   

    // here we gave value of elements
    title.textContent = movie.title;
    img.src = movie.bigPoster;
    movieLink.href = movie.trailer;
    texMvie.textContent = movie.summary;
    year.textContent ='year : ' +  movie.year ; 
    routine.textContent = movie.imdbRating;
    elBookmarkbtn.dataset.id = movie.imdbId
    elModalBtn.dataset.id = movie.imdbId
    elementsWrapper.append(templateClone);
   // we gave card equaled to df wrapper
    elCardWrapper.appendChild(elementsWrapper)

  });
};

// started search function
let handleSearch = (evt) => {
  // stopped event to catch value
  evt.preventDefault();
  // took value  of select and input 
  let category = elCategorySelect.value;
  let searchValue = elementSearch.value.trim();
  // here trimed of search value 
  let regex = new RegExp(searchValue, "gi");
  // here we checked in search value with regex's flag
  if (category === "All") {
    // here we gave condition filtredMovies = all movies
    fitredMovies = KINOLAR;
  } else {
    fitredMovies = KINOLAR.filter((movie) =>
      movie.categories.includes(category) );
   // here we filtred with categories 
  }
 
  fitredMovies = fitredMovies.filter((movie) => movie.title.match(regex));
  // here filtredMovies = filtred by the title of movies
  fitredMovies.sort(sortFunction[sort.value]);
  // here we sorted by the sort function and we gave value of sort value (input value)
  renderMovies(fitredMovies);
  // console.log(fitredMovies);
};
// started pagenations
elPageCount.textContent = page;
// here we gave page number 
elPreviusbtn.disabled = true;
// here did btn's styles
let handleNextpage = () => {
  page += 1;
  // here we added page if btn clicked
  if (page <= maxPage) {
    elPageCount.textContent = page;
    renderMovies(KINOLAR.slice(limit * (page - 1), page * limit));
    // here we wrote formula of the pagenation 
  }
  if (page === maxPage) {
    elNextbtn.disabled = true;
    // here current page = max page next btn = 0
  } else {
    elPreviusbtn.disabled = false;
    elNextbtn.disabled = false;
    // other time btns disabled false
  }
};

let handlePrevpage = () => {
  // here we returned back if btn clicked
  page -= 1;
  if (page > 0) {
    elPageCount.textContent = page;
    renderMovies(KINOLAR.slice(limit * (page - 1), page * limit));
  }

  if (page === 1) {
    elPreviusbtn.disabled = true;
    // here prev btn.true
  }
  elNextbtn.disabled = false;
  // here next btn.true
};

let elBookmarkWrapper = document.createDocumentFragment()
// here we made df wrapper for bookmarks

let renderBookmarks = (arr) =>{
  // started bookmarks 
  arr.forEach(bookmark =>{
   let bookmarkClone = elBookmarkTemplate.cloneNode(true)
  //  we took example of bookmark template 
   let elBookmarkItem = bookmarkClone.querySelector('.bookmark_item')
   // we chosed li element from template
   elBookmarkItem.dataset.id = bookmark.imdbId
   // here we gave id for li element from card
   let title = bookmarkClone.querySelector('.bookmark__title')
   title.textContent = bookmark.title
 // here equaled bookmark's title to card'stitle
    elBookmarkWrapper.appendChild(bookmarkClone)
    // here we appended bookmarkClone to df wrapper
  })
  elBookmarklist.innerHTML = null
  // at the first list had to empty
  elBookmarklist.append(elBookmarkWrapper)
  // here we appended df wrapper to list
}

let handleListEvent =(evt) => {
  // here several events function started 
  if(evt.target.matches('.liked')){
    // here checked evt.target in class = liked 
    let foundMovie = KINOLAR.find((movie) => movie.imdbId===evt.target.dataset.id)
    // here we find movie which evt.id = movie.id
    let bookmarkMovie = bookmark.find(bookMark=> bookMark.imdbId ===evt.target.dataset.id)
    // here we checked in bookmark if evt.id = oneBookmark
    if (!bookmarkMovie){
      bookmark.push(foundMovie)
      // bookmark pushed if in bookmark hadn't foundMovie
    }
    
    localStorage.setItem('bookmark', JSON.stringify(bookmark))
    // here we saved to local storage bookmark changed it to string
    renderBookmarks(bookmark)
  }else if(evt.target.matches('.js-more')){
    const foundMovies = KINOLAR.find((movie) => movie.imdbId ===evt.target.dataset.id) 
    // bookmark.dataset.id =  movie.imdbId
  
   elModalTitle.textContent = foundMovies.title
   elModalSummary.textContent = foundMovies.summary
   // here we gave madal's textContent movie's textContent 
  }
}

// we started delete bookmarks
let removeBookmark =(evt) => {
if (evt.target.matches('.remove')){
  // here we checked evt.target's class=remove
  let deleteId = evt.target.closest('li')
  // here we took the closest element li
  let ID =  deleteId.dataset.id
  // here ID = to li = id
  let DeleteBookMark = bookmark.filter(e=>e.imdbId != ID)
  // here arr = filtred evt.id =! li.id

  localStorage.setItem('bookmark', JSON.stringify(DeleteBookMark))
  // here we saved bookmark and deletedBookmark
  bookmark = DeleteBookMark
  // here we bookmark =DeleteBookMark
  renderBookmarks(DeleteBookMark)
  // renderBookmarks gave DeleteBookMark

}
}


renderBookmarks(bookmark)
renderMovies(KINOLAR.slice(0, 8));
elCardWrapper.addEventListener('click', handleListEvent )
elementForm.addEventListener("submit", handleSearch);
elNextbtn.addEventListener("click", handleNextpage);
elPreviusbtn.addEventListener("click", handlePrevpage);
elBookMarkList.addEventListener('click', removeBookmark)