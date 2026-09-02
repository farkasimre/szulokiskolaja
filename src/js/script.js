/* function bgImagesSet */
// set the provided images as background images and fade them in

function bgImagesSet() {
  document.querySelectorAll(".bg-image").forEach(function (el) {
    var isMobile = window.matchMedia("(max-width: 768px)").matches;
    var imageUrl = isMobile && el.dataset.bgimageMobile ? el.dataset.bgimageMobile : el.dataset.bgimage;

    el.style.backgroundImage = `url(${imageUrl})`;
    requestAnimationFrame(() => el.classList.add("is-visible"));
  });
}
/* end of function bgImagesSet */


/*function SplideThumbnailCarousel */
/* Splide js thumbnail slider */
function SplideThumbnailCarousel() {
  if (!document.querySelector(".splide")) return;
  var splide = new Splide(".splide", {
    isNavigation: true,
    perPage: 4,
    perMove: 1,
    gap: "1rem",
    padding: { left: "5%", right: "5%" },
    breakpoints: {
      640: {
        perPage: 2,
        gap: "1rem",
      },
      480: {
        perPage: 1,
        gap: "1rem",
      },
    },
  });
  splide.mount();
}

/*MULTIPLE SLIDERS
    var elms = document.getElementsByClassName( 'splide' );

for ( var i = 0; i < elms.length; i++ ) {
  new Splide( elms[ i ] ).mount();
} */
/* end of function SplideThumbnailCarousel */

/*function PlyrAudioPlayer */
function PlyrAudioPlayer() {
// 1. Check if at least one .js-player element exists on the page
  const playerElements = document.querySelectorAll('.js-player');

  if (playerElements.length > 0) {
    // 2. Initialize Plyr instances
    const players = Plyr.setup(playerElements);

    // 3. Attach play/pause exclusive logic
    players.forEach(player => {
      player.on('play', () => {
        players.forEach(otherPlayer => {
          if (otherPlayer !== player) {
            otherPlayer.pause();
          }
        });
      });
    });
  }
  }
  /* end of function PlyrAudioPlayer */


document.addEventListener("DOMContentLoaded", function () {

    const yearElement = document.getElementById('year');
    yearElement.textContent = new Date().getFullYear();
    
  new WOW().init();

  bgImagesSet();

  SplideThumbnailCarousel();

  PlyrAudioPlayer();
});
