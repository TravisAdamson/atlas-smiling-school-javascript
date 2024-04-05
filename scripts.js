jQuery(function ($) {

function showLoader() {
  jQuery(".loader").show();
}

  function hideLoader() {
    $(".loader").hide();
  }

  function fetchQuotes() {
    showLoader();
   
    $.ajax({
     url: "https://smileschool-api.hbtn.info/quotes",
     method: "GET",
     dataType: "json",
     success: function (data) {
       if (data && data.length > 0) {
         const carouselInner = document.querySelector(".carousel-inner");
         carouselInner.innerHTML = "";
   
         data.forEach(function (quote) {
           var quoteItem = `<div class="carousel-item">
                            <div class="quote-item">
                              <img src="${quote.pic_url}" class="quote-image">
                              <blockquote class="blockquote">
                                <p class="quote-text">${quote.text}</p>
                                <h4 class="quote-text">${quote.name}</h4>
                                <div class="quote-text"><span>${quote.title}</span><div>
                              </blockquote>
                            </div>
                          </div>`;
   
           carouselInner.innerHTML += quoteItem;
         });
   
         const carouselItems = document.querySelectorAll(".carousel-item");
         carouselItems[0].classList.add("active");
       } else {
         console.error("No quotes received from the API");
       }
   
       hideLoader();
     },
     error: function (error) {
       console.error("Error fetching quotes:", error);
   
       hideLoader();
     },
    });
   }

   function fetchTutorials() {
    fetch('https://smileschool-api.hbtn.info/popular-tutorials')
      .then(response => response.json())
      .then(data => {
        initializeCarousel(data);
      })
      .catch(error => console.error('Error fetching data:', error));
   }

   function fetchLatestVids() {
    fetch('https://smileschool-api.hbtn.info/latest-videos')
      .then(response => response.json())
      .then(data => {
        initializeCarousel2(data);
      })
      .catch(error => console.error('Error fetching data:', error));
   }

   function initializeCarousel(data) {
    data.forEach(item => {
      $('#popular-card').append(`
              <div class="card p-3" >
                <img src="${item.thumb_url}" alt="${item.title}" class="card-img-top">
                <div class="card-img-overlay" style="top: 25px; top: 5%">
                  <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay m-auto" />
                </div>
                <div class="card-body">
                  <h5 class="card-title font-weight-bold">${item.title}</h5>
                  <p class="card-text text-muted">${item['sub-title']}</p>
                  <div class="creator d-flex align-items-center">
                    <img src="${item.author_pic_url}" alt="${item.author}" class="rounded-circle" width="30px">
                    <h6 class="pl-3 m-0 main-color">${item.author}</h6>
                  </div>
                </div>
                <div class="info pt-3 d-flex justify-content-between">
                  <div class="rating">
                    <img class="" src="./images/rating.png">
                  </div>
                  <div class="duration">
                    <span>${item.duration}</span>
                  </div>
                </div>
              </div>
      `);
    });    
    console.log("data populated");
    $('#popular-card').slick({
      slidesToShow: 3.99, 
      slidesToScroll: 1,
      prevArrow: $(".prev1"),
      nextArrow: $(".next1"),
      infinity: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });
    console.log("carousel initialized");
  }

  function initializeCarousel2(data) {
    data.forEach(item => {
      $('#latest-card').append(`
              <div class="card p-3" >
                <img src="${item.thumb_url}" alt="${item.title}" class="card-img-top">
                <div class="card-img-overlay" style="top: 25px; top: 5%">
                  <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay m-auto" />
                </div>
                <div class="card-body">
                  <h5 class="card-title font-weight-bold">${item.title}</h5>
                  <p class="card-text text-muted">${item['sub-title']}</p>
                  <div class="creator d-flex align-items-center">
                    <img src="${item.author_pic_url}" alt="${item.author}" class="rounded-circle" width="30px">
                    <h6 class="pl-3 m-0 main-color">${item.author}</h6>
                  </div>
                </div>
                <div class="info pt-3 d-flex justify-content-between">
                  <div class="rating">
                    <img class="" src="./images/rating.png">
                  </div>
                  <div class="duration">
                    <span>${item.duration}</span>
                  </div>
                </div>
              </div>
      `);
    });    
    console.log("data populated");
    $('#latest-card').slick({
      slidesToShow: 3.99, 
      slidesToScroll: 1,
      prevArrow: $(".prev2"),
      nextArrow: $(".next2"),
      infinity: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });
    console.log("carousel initialized");
  }

  fetchQuotes();
  fetchTutorials();
  fetchLatestVids();
});
