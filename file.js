

var jobListings = [];

function fetchJobListings() {
  fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      jobListings = data;
      createJobListings(jobListings);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

var jobContainer = document.getElementById("main-container");

function createJobListings(jobListings) {
  jobContainer.innerHTML = "";
  jobListings.forEach(function (listing) {
    var listingHTML = `
      <div class="container">
        <div class="item-container">
          <div class="logo-container">
            <img src="${listing.logo}">
          </div>
          <div class="details-feature-displayer">
            <div class="features">
              <h5>${listing.company}</h5>
              ${listing.new ? '<h6 id="new">New!</h6>' : ''}
              ${listing.featured ? '<h6 class="featured"> Featured</h6>' : ''}
            </div>
            <h4>${listing.position}</h4>
            <div class="details-container">
              <p>${listing.postedAt}     <span class="demo">.</span></p>
              <p>${listing.contract}    <span class="demo">.</span></p>
              <p>${listing.location}</p>
            </div>
          </div>
        </div>
        <div class="language-container">
        <button class="language">${listing.role}</button>
        <button class="language">${listing.level}</button>
          ${listing.tools ? listing.tools.map(tool => `<button class="language">${tool}</button>`).join('') : ''}
          ${listing.languages ? listing.languages.map(language => `<button class="language">${language}</button>`).join('') : ''}
        </div>
      </div>
    `;
    jobContainer.innerHTML += listingHTML;
    let itemNew = document.getElementsByClassName("featured");
    for (x of itemNew) {
      let itemNewParent = x.parentNode
      let featuredNode = itemNewParent.parentNode;
      let itemContainerNode = featuredNode.parentNode;
      let mainContainerNode = itemContainerNode.parentElement
      mainContainerNode.classList.add("new-job");
    }
  })
}

fetchJobListings();

let searchInput = document.getElementById("search-bar");

let filterList = document.getElementsByClassName("filter-list");

function searchItem() {
  if (filterSearchDisplay.length === 0) {
    let container = document.getElementsByClassName("display-bar")[0];
    container.textContent = "Search.......";
    return createJobListings(jobListings)
  }
  let selectedFilters = filterSearchDisplay.map(option => option.toLowerCase());

  let filteredListings = jobListings.filter(function (listing) {
    for (let filter of selectedFilters) {
      if (
        listing.position.toLowerCase().includes(filter) ||
        listing.role.toLowerCase().includes(filter) ||
        listing.level.toLowerCase().includes(filter) ||
        listing.tools.some(tool => tool.toLowerCase().includes(filter)) ||
        listing.languages.some(language => language.toLowerCase().includes(filter)) ||
        (filter === 'featured' && listing.featured) ||
        (filter === 'new' && listing.new)
      ) {
        return true;
      }
    }
    return false;
  });

  createJobListings(filteredListings);
}


const filterOptions = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Senior",
  "Midweight",
  "Junior",
  "HTML",
  "CSS",
  "JavaScript",
  "REACT",
  "Python",
  "Sass",
  "Ruby",
  "RoR",
  "Vue",
  "Django",
  "New",
  "Featured"
];

filterOptions.forEach(function (option) {
  let optionContainer = document.createElement("div");
  optionContainer.textContent = option;
  optionContainer.className = "select-option";
  let optionContainerAppender = document.getElementById("search-option-container");
  optionContainerAppender.appendChild(optionContainer);
});

let filterSearchDisplay = [];

let inputCheck = document.getElementById("selected-options-container");
let filterListOptions = document.getElementsByClassName("select-option");

inputCheck.addEventListener("click", function () {
  if(this.innerHTML === ""){
    createJobListings(jobListings)
  }
  for (let i = 0; i < filterListOptions.length; i++) {
    filterListOptions[i].style.display =  "block";
  }
  
});

for (let i = 0; i < filterListOptions.length; i++) {
  filterListOptions[i].addEventListener("click", function () {
    let selectedValue = this.innerHTML;
    if (filterSearchDisplay.includes(selectedValue)) {
      alert("Already selected.");
    } else {
      filterSearchDisplay.push(selectedValue);
    }
    display();
    for (let i = 0; i < filterListOptions.length; i++) {
      filterListOptions[i].style.display = "none";
    }
    searchItem()
  });
}


function display() {
  let appender = document.getElementById("selected-options-container");
  appender.innerHTML = "";
  for (let x = 0; x < filterSearchDisplay.length; x++) {
    let displayedOptions = `
      <div class="search-options">
        <p>${filterSearchDisplay[x]}</p>
        <span class="pop-button">
          <img src="icon-remove.svg" alt="icon-remove">
        </span>
      </div>
    `;
    appender.innerHTML += displayedOptions;
  }
  let popButton = document.getElementsByClassName("pop-button");
  for (let j = 0; j < popButton.length; j++) {
    popButton[j].addEventListener("click", function (event) {
      event.stopPropagation(); 
      let buttonParent = this.parentElement;
      let indexOfOption = filterSearchDisplay.indexOf(filterSearchDisplay[j]);
      filterSearchDisplay.splice(indexOfOption, 1);
      buttonParent.remove(); 
      searchItem()
    })
  }
}

let clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", function () {
  let container = document.getElementsByClassName("display-bar")[0];
  container.innerHTML = "";
  filterSearchDisplay = [];
  createJobListings(jobListings);
  container.textContent = "Search.......";
});
