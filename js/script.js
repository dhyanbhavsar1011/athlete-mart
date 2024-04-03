// slider js start
const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".banner");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

nextButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
});
// slider js ends

// Client Logo Starts
$(document).ready(function () {
  $(".customer-logos").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });
});
// Client Logo ends

// Search Bar popup start
document.querySelector(".open-popup").addEventListener("click", function () {
  document.querySelector(".custom-popup").style.display = "block";
});

document.querySelector(".close-popup").addEventListener("click", function () {
  document.querySelector(".custom-popup").style.display = "none";
});

document.querySelector(".search-button").addEventListener("click", function () {
  var searchTerm = document.querySelector(".search-input").value;
  var searchResults = document.querySelector(".search-results");
  searchResults.innerHTML = "Search results for: " + searchTerm;
});

// Search bar popup end

const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const inputField = document.getElementById("input");

minusButton.addEventListener("click", (event) => {
  event.preventDefault();
  const currentValue = Number(inputField.value) || 0;
  inputField.value = currentValue - 1;
});

plusButton.addEventListener("click", (event) => {
  event.preventDefault();
  const currentValue = Number(inputField.value) || 0;
  inputField.value = currentValue + 1;
});
