/*global jQuery:false */
jQuery(function($) {

    function setFixedTop(sh) {
        var sh_height = sh.innerHeight();
        
        if ($(window).scrollTop() > (sh.position().top + sh_height)) {
            sh.addClass('fixed-to-top');
            sh.parent().css({
                'height': sh_height + 'px'
            });
        } else if (sh.hasClass('fixed-to-top') && $(window).scrollTop() === sh.parent().position().top) {
            sh.removeClass('fixed-to-top');
            sh.parent().css({
                'height': 'auto'
            });
        }
    }/*Counter for dev*/
document.querySelectorAll(".blck-divider").forEach((el, index) => {
  el.setAttribute("data-order", index + 1);
});
/* remove this in production, it's just for development purposes to easily identify sections by their order  END*/

/* function bgImagesSet */
// set the provided images as background images and fade them in
/*
function bgImagesSet() {
  document.querySelectorAll(".bg-image").forEach(function (el) {
    var isMobile = window.matchMedia("(max-width: 768px)").matches;
    var imageUrl = isMobile && el.dataset.bgimageMobile ? el.dataset.bgimageMobile : el.dataset.bgimage;

    el.style.backgroundImage = `url(${imageUrl})`;
    requestAnimationFrame(() => el.classList.add("is-visible"));
  });
}*/

function bgImagesSet() {
  document.querySelectorAll(".bg-image").forEach(function (el) {
    var isMobile = window.matchMedia("(max-width: 768px)").matches;
    var imageUrl = isMobile && el.dataset.bgimageMobile ? el.dataset.bgimageMobile : el.dataset.bgimage;

    if (el.classList.contains("bg-image-panning")) {
      // Inject a <style> rule targeting this element's :after pseudo-element
      const id = el.dataset.bgPanningId || `bg-panning-${Math.random().toString(36).slice(2, 7)}`;
      el.dataset.bgPanningId = id;
      el.setAttribute("data-bg-panning-id", id);

      const styleTag = document.createElement("style");
      styleTag.textContent = `[data-bg-panning-id="${id}"]:after { background-image: url(${imageUrl}); }`;
      document.head.appendChild(styleTag);
    } else {
      el.style.backgroundImage = `url(${imageUrl})`;
    }

    requestAnimationFrame(() => el.classList.add("is-visible"));
  });
}


/* end of function bgImagesSet */

/* function wrapLetters */
/*wrap letters in span for the vertical text to can animate letters*/

function wrapLetters() {
  document.querySelectorAll(".vertical-text").forEach((element) => {
    const fragment = document.createDocumentFragment();
    [...element.textContent].forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      fragment.appendChild(span);
    });
    element.innerHTML = "";
    element.appendChild(fragment);
  });
}
/* end of function wrapLetters */

/*function SplideThumbnailCarousel */
/* Splide js thumbnail slider */
function SplideThumbnailCarousel() {
  if (!document.querySelector(".splide")) return;
  var splide = new Splide(".splide", {
    isNavigation: true,
    perPage: 2,
    perMove: 1,
    gap: "3rem",
    padding: { left: "5%", right: "15%" },
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

/* function UpdateParallax */
/* Add paralx to background image and  image elements */
function initParallax() {
  const bgItems = [];
  const fgItems = [];

  // Collect background items
  document.querySelectorAll("[data-parallax-bg]").forEach((el) => {
    bgItems.push({
      el,
      speed: parseFloat(el.dataset.parallaxBg) || 0.4,
    });
  });

  // Collect foreground items
  document.querySelectorAll("[data-parallax-fg]").forEach((el) => {
    fgItems.push({
      el,
      speed: parseFloat(el.dataset.parallaxFg) || -0.22,
      stiffness: parseFloat(el.dataset.springStiffness) || 0.045,
      damping: parseFloat(el.dataset.springDamping) || 0.82,
      current: 0,
      velocity: 0,
      target: 0,
    });
  });

  function updateParallax() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    // Background
  bgItems.forEach(({ el, speed }) => {
    const parent = el.parentElement;
    const rect = parent.getBoundingClientRect();

    // Skip if parent is completely outside the viewport
    if (rect.bottom < 0 || rect.top > vh) return;

    const parentTop = rect.top + scrollY;
    const relScroll = scrollY - parentTop;
    el.style.transform = `translateY(${relScroll * speed}px)`;
  });

    

    // Foreground (spring)
    fgItems.forEach((item) => {
      const { el, speed, stiffness, damping } = item;

      const rect = el.getBoundingClientRect();
      const naturalCenter = rect.top + rect.height / 2 - item.current;
      const distFromCenter = naturalCenter - vh / 2;

      item.target = distFromCenter * speed;

      const force = (item.target - item.current) * stiffness;
      item.velocity = (item.velocity + force) * damping;
      item.current += item.velocity;

      el.style.transform = `translateY(${item.current}px)`;
    });

    requestAnimationFrame(updateParallax);
  }

  updateParallax(); // start animation loop
}
/* end of function UpdateParallax */

/* function initMegaMenu */
/* Initialize the mega menu functionality */
function initMegaMenu() {
  const toggleBtn = document.getElementById("menu-trigger");
  const navbarMega = document.getElementById("navbar_dekeyzer_mega");
  const toggleBtnMega = document.getElementById("toggle_navbar_dekeyzer_mega");

  if (!navbarMega || !toggleBtnMega) return;

  const collapseInstance = new bootstrap.Collapse(navbarMega, { toggle: false });

  function toggleDynamicDiv(className, divId, targetId) {
    const existingDiv = document.getElementById(divId);
    const targetDiv = document.getElementById(targetId);
    const header = document.getElementById("header");

    if (!targetDiv) return;

    if (!existingDiv) {
      header.classList.add("fixed-to-top");

      const newDiv = document.createElement("div");
      newDiv.classList.add(className);
      newDiv.id = divId;

      targetDiv.appendChild(newDiv);
      targetDiv.classList.add("megamenu-active");
    } else {
      header.classList.remove("fixed-to-top");
      targetDiv.classList.remove("megamenu-active");
      existingDiv.remove();
    }
  }

  // Toggle button
  toggleBtn.addEventListener("click", function () {
    header.classList.toggle("fixed-to-top");
  });
  toggleBtnMega.addEventListener("click", function () {
    toggleDynamicDiv("bg-deep-maroon", "megabg", "blck-hero");
    collapseInstance.toggle();
  });
}
/*end of function initMegaMenu */

document.addEventListener("DOMContentLoaded", function () {
  new WOW().init();

  bgImagesSet();

  initMegaMenu();

  wrapLetters();

  initParallax();

  SplideThumbnailCarousel();
});



    var Ark_Uitvaartzorg = window.Ark_Uitvaartzorg || {};

    var min_device_w = 578;


    Ark_Uitvaartzorg.Init = function() {
       /* $('.swipebox').swipebox({
            useSVG: false,
            hideBarsDelay: 0,
        });
*/
        $(".bg-image").each(function() {
            var imageUrl = $(this).data('bgimage');
            $(this).css("background-image", "url(" + imageUrl + ")").fadeTo(600 , 1);
        });


       /* $('#slider-gallery').each(function() {
            var nr = $(this).data('nr');
            var slider_gallery = $(this).lightSlider({
                item: nr,
                loop: false,
                slideMove: 1,
                easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
                speed: 600,
                slideMargin: 30,
                responsive: [{
                        breakpoint: 992,
                        settings: {
                            item: nr - 1
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            item: nr - 1
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            item: 1
                        }
                    }
                ]
            });

            $('#goToPrevSlide').click(function() {
                slider_gallery.goToPrevSlide();
            });
            $('#goToNextSlide').click(function() {
                slider_gallery.goToNextSlide();
            });

        })*/
   
    };

    Ark_Uitvaartzorg.AlignItems = function() {

        if ($('.grid').length > 0) {
            w = 576;
            if ($('.grid').hasClass('grid-md')) {
                w = 767;
            }
            if ($(window).width() > w) {
                var $grid = $('.grid').colcade({
                    columns: '.grid-col',
                    items: '.grid-item'
                });
            } else {
                if (typeof $grid === 'object' && $grid !== null) {
                    $grid.colcade('destroy');
                }
            }
        }
    }

    Ark_Uitvaartzorg.MenuStick = function(sh) {
        if ($(window).width() > 991.99) {
            var stickyHeader = sh;
            var stickyHeaderTop = $(window).height();
            setFixedTop(stickyHeader, stickyHeaderTop);
        }
    };

      //=================
    //  Vertical scroll menu
    //=================
    Ark_Uitvaartzorg.ScrollVerticalonClick = function() {
        $('.scrollPage').click(function() {
            var t = $(this),
                elementClicked = t.attr("href"),
                destination = $(elementClicked).offset().top;

            $("html:not(:animated),body:not(:animated)").stop(true, false).animate({
                scrollTop: destination
            }, 1500, 'easeInOutExpo');
            return false;
        });
    };


      new WOW().init();

    $(document).ready(function() {
        //Popper.Defaults.modifiers.computeStyle.enabled = false;


        //init functions
        Ark_Uitvaartzorg.Init();
       Ark_Uitvaartzorg.AlignItems();



        $(window).on("scroll", function() {
             // Ark_Uitvaartzorg.MenuStick($('.h-in-stack'));
        });
        $(window).bind("orientationchange resize", function() {
            Ark_Uitvaartzorg.AlignItems();
        });
        $(window).on("load", function() {
          
        });
    });
});