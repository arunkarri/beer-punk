let api = 'https://api.punkapi.com/v2/beers';

let beerFilter = function (pgNo, rec) {
  return `https://api.punkapi.com/v2/beers?page=${pgNo}&per_page=${rec}`;
};

let contentRow = document.getElementById('content');

async function getBeers(pgNo, rec) {
  try {
    let beers = await fetch(beerFilter(pgNo, rec));
    let beerData = await beers.json();
    console.log(beerData);
    buildUI(beerData);
    buildPaginationUI();
  } catch (error) {
    console.log(error);
  }
}



// Pagination Code Starts
let pageNumber = 1;
let start = 0;
let end = 6;
let recordsPerPage = 6;

getBeers(pageNumber, recordsPerPage);

function loadPage(i) {
  pageNumber = i + 1;
  start = (pageNumber - 1) * recordsPerPage;
  end = pageNumber * recordsPerPage;
  getBeers(pageNumber, recordsPerPage);
  checkButtons();
}

function loadNextPage() {
  pageNumber++;
  getBeers(pageNumber, recordsPerPage);
  checkButtons();
}

function loadPrevPage() {
  pageNumber--;
  getBeers(pageNumber, recordsPerPage);
  checkButtons();
}

function checkButtons() {
  let prevButton = document.getElementById('prev');
  if (pageNumber === 1) {
    prevButton.className += ' disabled';
    setAttribute(prevButton, 'style', 'cursor: not-allowed;');
  } else {
    prevButton.classList.remove('disabled');
  }

  let nextButton = document.getElementById('next');
  if (end === 100) {
    nextButton.className += ' disabled';
    setAttribute(nextButton, 'style', 'cursor: not-allowed;');
  } else {
    nextButton.classList.remove('disabled');
  }
}
//Pagination Code Ends

// Build Pagination DOM
function buildPaginationUI() {
  let mainDiv = document.getElementById('pagination');
  mainDiv.innerHTML = '';

  let paginationDiv = createElement('div');
  setAttribute(paginationDiv, 'class', 'd-flex justify-content-center');
  appendChild(mainDiv, paginationDiv);

  let navBar = createElement('nav');
  setAttribute(navBar, 'aria-label', 'Pagination Data');
  appendChild(paginationDiv, navBar);

  let ul = createElement('ul');
  setAttribute(ul, 'class', 'pagination');
  appendChild(navBar, ul);


    //Create previous button and add it to the container
    let prevButton = createElement('li');
    setAttribute(prevButton, 'class', 'page-item');
    setAttribute(prevButton, 'id', 'prev');
    appendChild(ul, prevButton);

    let prevHyperLink = createElement('a');
    setAttribute(prevHyperLink, 'class', 'page-link');
    setAttribute(prevHyperLink, 'style', 'cursor: pointer;');
    setAttribute(prevHyperLink, 'onclick', `loadPrevPage()`);

    prevHyperLink.innerText = 'Previous';
    appendChild(prevButton, prevHyperLink);
    appendChild(ul, prevButton);

    //Create next button and add it to the container
    let nextButton = createElement('li');
    setAttribute(nextButton, 'class', 'page-item');
    setAttribute(nextButton, 'id', 'next');
    appendChild(ul, nextButton);

    let nextHyperLink = createElement('a');
    setAttribute(nextHyperLink, 'class', 'page-link');
    setAttribute(nextHyperLink, 'style', 'cursor: pointer;');
    setAttribute(nextHyperLink, 'onclick', `loadNextPage()`);
    nextHyperLink.innerText = 'Next';
    appendChild(nextButton, nextHyperLink);
    appendChild(ul, nextButton);

}

function buildUI(data) {
  contentRow.innerHTML = '';
  if (data.length === 0) {
    let noRes = createElement('h1');
    setAttribute(noRes, 'class', 'text-white align-middle');
    noRes.innerText = 'No Results Found !!!';
    appendChild(contentRow, noRes);
  }
  for (let i = 0; i < data.length; i++) {
    // create card
    let card = createElement('div');
    setAttribute(card, 'class', 'card m-2 col-md-6 col-lg-5 col-xl-3 col-sm-12 col-xs-12');
    appendChild(contentRow, card);

    let beerMan = createElement('span');
    
    appendChild(card, beerMan);
    let beerManImg = createElement('img');
    setAttribute(beerManImg, 'class', 'beer-man');
    beerManImg.src = './beer-man.png';
    appendChild(beerMan, beerManImg);

    let cardBody = createElement('div');
    setAttribute(cardBody, 'class', 'card-body text-center');
    appendChild(card, cardBody);

    let title = createElement('h5');
    setAttribute(title, 'class', 'card-title');
    title.innerText = data[i].name;
    appendChild(cardBody, title);


    let tagLine = createElement('i');
    tagLine.innerText = data[i].tagline;
    appendChild(cardBody, tagLine);

    let foodCombo = createElement('div');
    setAttribute(foodCombo, 'class','text-white food-text');
    foodCombo.innerText = 'Best food to fill your tummy with this beer: ';
    appendChild(cardBody, foodCombo);

    data[i].food_pairing.forEach((element)=>{
      let food= createElement('span');
      setAttribute(food, 'class','badge bg-dark text-white text-wrap');
      food.innerText = element;
      appendChild(foodCombo, food);
    });

    let tips = createElement('p');
    setAttribute(tips,'class','brew-tips');
    tips.innerHTML = `<u>Tip</u> : ${data[i].brewers_tips}`;
    appendChild(cardBody,tips);

    // append image to card
    let img = createElement('img');
    img.src = data[i].image_url;
    setAttribute(img, 'class', 'card-img-top card-img-custom');
    appendChild(card, img);
  }
}
