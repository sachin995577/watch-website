



// NAVBAR START

const hamburger =
    document.getElementById("hamburger");

const mobileMenu =
    document.getElementById("mobileMenu");

const popupOverlay =
    document.getElementById("popupOverlay");

const popupButtons =
    document.querySelectorAll(
        "[data-popup]"
    );

const popups =
    document.querySelectorAll(".popup");

const closeButtons =
    document.querySelectorAll(
        ".popup-close"
    );


/* =========================================
   HAMBURGER MENU
========================================= */

hamburger.addEventListener(
    "click",
    function () {

        hamburger.classList.toggle(
            "active"
        );

        mobileMenu.classList.toggle(
            "active"
        );

        /*
         Prevent background scrolling
         when mobile menu is open
        */

        if (
            mobileMenu.classList.contains(
                "active"
            )
        ) {

            document.body.style.overflow =
                "hidden";

        } else {

            document.body.style.overflow =
                "";
        }

    }
);


/* =========================================
   MOBILE MENU LINKS
========================================= */

const mobileLinks =
    document.querySelectorAll(
        ".mobile-menu a"
    );


mobileLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                hamburger.classList.remove(
                    "active"
                );

                mobileMenu.classList.remove(
                    "active"
                );

                document.body.style.overflow =
                    "";

            }
        );

    }
);


/* =========================================
   OPEN POPUP
========================================= */

popupButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const popupID =
                    button.getAttribute(
                        "data-popup"
                    );

                /*
                 Close all existing popups
                */

                popups.forEach(
                    function (popup) {

                        popup.classList.remove(
                            "active"
                        );

                    }
                );


                /*
                 Open selected popup
                */

                const selectedPopup =
                    document.getElementById(
                        popupID
                    );

                if (selectedPopup) {

                    selectedPopup.classList.add(
                        "active"
                    );

                    popupOverlay.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =========================================
   CLOSE POPUP
========================================= */

function closeAllPopups() {

    popups.forEach(
        function (popup) {

            popup.classList.remove(
                "active"
            );

        }
    );


    popupOverlay.classList.remove(
        "active"
    );
}


/* =========================================
   CLOSE BUTTON
========================================= */

closeButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                closeAllPopups();

            }
        );

    }
);


/* =========================================
   OVERLAY CLICK
========================================= */

popupOverlay.addEventListener(
    "click",
    function () {

        closeAllPopups();

    }
);


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeAllPopups();

            hamburger.classList.remove(
                "active"
            );

            mobileMenu.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "";

        }

    }
);


/* =========================================
   PREVENT POPUP CLOSING
   WHEN CLICKING INSIDE
========================================= */

popups.forEach(
    function (popup) {

        popup.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }
);


/* =========================================
   WINDOW RESIZE
========================================= */

window.addEventListener(
    "resize",
    function () {

        /*
         If screen becomes desktop,
         close mobile menu.
        */

        if (window.innerWidth > 900) {

            hamburger.classList.remove(
                "active"
            );

            mobileMenu.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "";

        }

    }
);


// NAVBAR END


// BANNER SLIDE START

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
let autoSlide;


/* ===============================
   SHOW SLIDE FUNCTION
================================ */

function showSlide(index) {

    // Last ke baad first slide
    if (index >= slides.length) {
        currentSlide = 0;
    }

    // First ke pehle last slide
    else if (index < 0) {
        currentSlide = slides.length - 1;
    }

    else {
        currentSlide = index;
    }


    // Remove active class from all slides

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });


    // Remove active class from all dots

    dots.forEach((dot) => {
        dot.classList.remove("active");
    });


    // Current slide active

    slides[currentSlide].classList.add("active");


    // Current dot active

    dots[currentSlide].classList.add("active");

}


/* ===============================
   NEXT SLIDE
================================ */

function nextSlide() {

    showSlide(currentSlide + 1);

}


/* ===============================
   AUTO SLIDE START
   5 SECONDS
================================ */

function startAutoSlide() {

    autoSlide = setInterval(() => {

        nextSlide();

    }, 5000);

}


/* ===============================
   AUTO SLIDE RESET
================================ */

function resetAutoSlide() {

    clearInterval(autoSlide);

    startAutoSlide();

}


/* ===============================
   DOT CLICK
================================ */

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

        resetAutoSlide();

    });

});


/* ===============================
   START AUTO SLIDER
================================ */

startAutoSlide();



// BANNER SLIDE END


// SPORTLIGHT SECTION START



document.addEventListener("DOMContentLoaded", function () {


    const track = document.querySelector(".carousel-track");

    const prevBtn = document.querySelector(".prev-btn");

    const nextBtn = document.querySelector(".next-btn");

    const carousel = document.querySelector(".spotlight-carousel");


    let originalCards = Array.from(
        track.querySelectorAll(".spotlight-card")
    );


    let visibleItems = 4;

    let currentIndex = 0;

    let autoSlide;

    let isAnimating = false;


    /* =========================
       DEVICE KE HISAB SE ITEMS
    ========================= */

    function getVisibleItems() {

        let screenWidth = window.innerWidth;


        if (screenWidth < 768) {

            return 1;

        }

        else if (screenWidth < 1024) {

            return 3;

        }

        else {

            return 4;

        }

    }


    /* =========================
       CAROUSEL BUILD
    ========================= */

    function buildCarousel() {


        visibleItems = getVisibleItems();


        track.innerHTML = "";


        /* LAST IMAGES CLONE */

        let lastClones = originalCards
            .slice(-visibleItems)
            .map(function (card) {

                return card.cloneNode(true);

            });


        /* FIRST IMAGES CLONE */

        let firstClones = originalCards
            .slice(0, visibleItems)
            .map(function (card) {

                return card.cloneNode(true);

            });


        /* LAST CLONES ADD */

        lastClones.forEach(function (card) {

            track.appendChild(card);

        });


        /* ORIGINAL 20 IMAGES */

        originalCards.forEach(function (card) {

            track.appendChild(card.cloneNode(true));

        });


        /* FIRST CLONES ADD */

        firstClones.forEach(function (card) {

            track.appendChild(card);

        });


        /* START POSITION */

        currentIndex = visibleItems;


        track.style.transition = "none";


        setTimeout(function () {

            updatePosition();

        }, 50);


        setTimeout(function () {

            track.style.transition =
                "transform 0.7s ease";

        }, 100);

    }


    /* =========================
       CARD WIDTH
    ========================= */

    function getCardWidth() {

        let cards = track.querySelectorAll(".spotlight-card");


        if (cards.length === 0) return 0;


        return cards[0].getBoundingClientRect().width;

    }


    /* =========================
       UPDATE POSITION
    ========================= */

    function updatePosition() {

        let cardWidth = getCardWidth();


        let movePosition =
            currentIndex * cardWidth;


        track.style.transform =
            `translateX(-${movePosition}px)`;

    }


    /* =========================
       NEXT SLIDE
    ========================= */

    function nextSlide() {

        if (isAnimating) return;


        isAnimating = true;


        currentIndex++;


        updatePosition();

    }


    /* =========================
       PREVIOUS SLIDE
    ========================= */

    function prevSlide() {

        if (isAnimating) return;


        isAnimating = true;


        currentIndex--;


        updatePosition();

    }


    /* =========================
       TRANSITION COMPLETE
    ========================= */

    track.addEventListener(
        "transitionend",
        function () {


            isAnimating = false;


            let totalImages =
                originalCards.length;


            /* LAST KE BAAD FIRST */

            if (
                currentIndex >=
                totalImages + visibleItems
            ) {

                track.style.transition = "none";


                currentIndex =
                    visibleItems;


                updatePosition();


                setTimeout(function () {

                    track.style.transition =
                        "transform 0.7s ease";

                }, 50);

            }


            /* FIRST KE PEHLE LAST */

            if (
                currentIndex <
                visibleItems
            ) {

                track.style.transition = "none";


                currentIndex =
                    totalImages + visibleItems - 1;


                updatePosition();


                setTimeout(function () {

                    track.style.transition =
                        "transform 0.7s ease";

                }, 50);

            }

        }
    );


    /* =========================
       BUTTON CLICK
    ========================= */

    nextBtn.addEventListener(
        "click",
        function () {

            nextSlide();

            restartAutoSlide();

        }
    );


    prevBtn.addEventListener(
        "click",
        function () {

            prevSlide();

            restartAutoSlide();

        }
    );


    /* =========================
       AUTO SLIDE
    ========================= */

    function startAutoSlide() {


        clearInterval(autoSlide);


        autoSlide = setInterval(
            function () {

                nextSlide();

            },
            3500
        );

    }


    /* =========================
       RESTART AUTO
    ========================= */

    function restartAutoSlide() {

        clearInterval(autoSlide);

        startAutoSlide();

    }


    /* =========================
       HOVER PAUSE
    ========================= */

    carousel.addEventListener(
        "mouseenter",
        function () {

            clearInterval(autoSlide);

        }
    );


    carousel.addEventListener(
        "mouseleave",
        function () {

            startAutoSlide();

        }
    );


    /* =========================
       RESIZE
    ========================= */

    let resizeTimer;


    window.addEventListener(
        "resize",
        function () {


            clearTimeout(resizeTimer);


            resizeTimer =
                setTimeout(
                    function () {

                        buildCarousel();

                    },
                    300
                );

        }
    );


    /* =========================
       START
    ========================= */

    buildCarousel();

    startAutoSlide();


});


// SPORT LIGHT SECTION END


// NEW ARRIVALS SECTION


document.addEventListener("DOMContentLoaded", function () {

    const track = document.querySelector(".product-carousel-track");

    const cards = document.querySelectorAll(".product-card");

    const nextButton = document.querySelector(".product-next");

    const prevButton = document.querySelector(".product-prev");


    let currentIndex = 0;

    let autoSlide;


    /* ============================
       DEVICE KE HISAB SE
       KITNI IMAGE DIKHANI HAI
    ============================ */

    function getVisibleCards() {

        const screenWidth = window.innerWidth;


        // MOBILE
        if (screenWidth < 768) {
            return 1;
        }


        // TABLET
        if (screenWidth < 1200) {
            return 3;
        }


        // LAPTOP + LARGE SCREEN
        return 4;

    }


    /* ============================
       CAROUSEL UPDATE
    ============================ */

    function updateCarousel() {

        const visibleCards = getVisibleCards();

        const maxIndex = cards.length - visibleCards;


        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }


        if (currentIndex < 0) {
            currentIndex = maxIndex;
        }


        const movePercentage =
            currentIndex * (100 / visibleCards);


        track.style.transform =
            `translateX(-${movePercentage}%)`;

    }


    /* ============================
       NEXT BUTTON
    ============================ */

    nextButton.addEventListener("click", function () {

        const visibleCards = getVisibleCards();

        const maxIndex = cards.length - visibleCards;


        if (currentIndex >= maxIndex) {

            // LAST KE BAAD FIRST
            currentIndex = 0;

        } else {

            currentIndex++;

        }


        updateCarousel();

        restartAutoSlide();

    });


    /* ============================
       PREVIOUS BUTTON
    ============================ */

    prevButton.addEventListener("click", function () {

        const visibleCards = getVisibleCards();

        const maxIndex = cards.length - visibleCards;


        if (currentIndex <= 0) {

            // FIRST KE PEHLE LAST
            currentIndex = maxIndex;

        } else {

            currentIndex--;

        }


        updateCarousel();

        restartAutoSlide();

    });


    /* ============================
       AUTO SLIDE
       EVERY 4 SECOND
    ============================ */

    function startAutoSlide() {

        autoSlide = setInterval(function () {

            const visibleCards = getVisibleCards();

            const maxIndex =
                cards.length - visibleCards;


            if (currentIndex >= maxIndex) {

                currentIndex = 0;

            } else {

                currentIndex++;

            }


            updateCarousel();

        }, 4000);

    }


    /* ============================
       RESTART AUTO SLIDE
    ============================ */

    function restartAutoSlide() {

        clearInterval(autoSlide);

        startAutoSlide();

    }


    /* ============================
       WINDOW RESIZE
    ============================ */

    window.addEventListener("resize", function () {

        currentIndex = 0;

        updateCarousel();

    });


    /* ============================
       START
    ============================ */

    updateCarousel();

    startAutoSlide();

});


// NEW ARRIVALS END


// NEW ARRIVALS BEST SELLER START


document.addEventListener("DOMContentLoaded", function () {

    const tabs = document.querySelectorAll(".watch-tab");
    const tabContents = document.querySelectorAll(".watch-tab-content");

    let activeSlider = null;


    /* ==========================================
       TAB CHANGE
    ========================================== */

    tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            const targetId = this.getAttribute("data-tab");

            /* Remove active from tabs */
            tabs.forEach(function (item) {
                item.classList.remove("active");
            });

            /* Add active to clicked tab */
            this.classList.add("active");


            /* Hide all tab contents */
            tabContents.forEach(function (content) {
                content.classList.remove("active");
            });


            /* Show selected tab */
            const targetContent = document.getElementById(targetId);

            targetContent.classList.add("active");


            /* Reset slider */
            const track = targetContent.querySelector(".watch-slider-track");

            if (track) {
                track.style.transform = "translateX(0px)";
            }

            updateSlider(targetContent);

        });

    });


    /* ==========================================
       SLIDER FUNCTION
    ========================================== */

    function updateSlider(content) {

        const track = content.querySelector(".watch-slider-track");
        const cards = content.querySelectorAll(".watch-product-card");

        if (!track || cards.length === 0) {
            return;
        }


        const wrapper = content.querySelector(".watch-slider-wrapper");

        let currentIndex = 0;


        function getVisibleCards() {

            if (window.innerWidth <= 767) {
                return 1;
            }

            if (window.innerWidth <= 1199) {
                return 2;
            }

            return 4;
        }


        function moveSlider(direction) {

            const visibleCards = getVisibleCards();

            const maxIndex = Math.max(
                0,
                cards.length - visibleCards
            );

            currentIndex += direction;


            /* Stop at first */
            if (currentIndex < 0) {
                currentIndex = 0;
            }


            /* Stop at last */
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }


            const cardWidth = cards[0].offsetWidth;
            const gap = parseFloat(
                getComputedStyle(track).gap
            ) || 0;

            const moveAmount =
                currentIndex * (cardWidth + gap);


            track.style.transform =
                "translateX(-" + moveAmount + "px)";


            updateArrowState();
        }


        function updateArrowState() {

            const visibleCards = getVisibleCards();

            const maxIndex = Math.max(
                0,
                cards.length - visibleCards
            );

            const prevButton =
                document.querySelector(".watch-prev");

            const nextButton =
                document.querySelector(".watch-next");


            prevButton.disabled =
                currentIndex === 0;

            nextButton.disabled =
                currentIndex >= maxIndex;

        }


        /* ==========================================
           ARROWS
        ========================================== */

        const prevButton =
            document.querySelector(".watch-prev");

        const nextButton =
            document.querySelector(".watch-next");


        /* Remove previous listeners */
        prevButton.onclick = null;
        nextButton.onclick = null;


        prevButton.onclick = function () {
            moveSlider(-1);
        };


        nextButton.onclick = function () {
            moveSlider(1);
        };


        /* Resize reset */
        window.addEventListener("resize", function () {

            currentIndex = 0;

            track.style.transform =
                "translateX(0px)";

            updateArrowState();

        });


        updateArrowState();

    }


    /* ==========================================
       INITIAL SLIDER
    ========================================== */

    const firstContent =
        document.querySelector(".watch-tab-content.active");

    if (firstContent) {
        updateSlider(firstContent);
    }


    /* ==========================================
       WISHLIST
    ========================================== */

    document.querySelectorAll(".watch-wishlist")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                const icon =
                    this.querySelector("i");

                icon.classList.toggle("fa-regular");
                icon.classList.toggle("fa-solid");

            });

        });

});


// NEW ARRIVALS BEST SELLER END


// ANIMATION START


document.addEventListener("DOMContentLoaded", function () {

    const revealElements = document.querySelectorAll(".scroll-reveal");

    const revealObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });

});


// ANIMATION END




// MOST REVIEW LINK START

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       SELECT ELEMENTS
    ================================================= */

    const slider = document.querySelector(".reviewed-watch-track");
    const cards = document.querySelectorAll(".reviewed-watch-card");

    const previousButton =
        document.querySelector(".reviewed-watch-prev");

    const nextButton =
        document.querySelector(".reviewed-watch-next");


    /* =================================================
       CHECK SLIDER
    ================================================= */

    if (
        !slider ||
        cards.length === 0 ||
        !previousButton ||
        !nextButton
    ) {
        return;
    }


    /* =================================================
       CURRENT POSITION
    ================================================= */

    let currentPosition = 0;


    /* =================================================
       GET VISIBLE CARDS
    ================================================= */

    function getVisibleCards() {

        const screenWidth = window.innerWidth;


        if (screenWidth <= 767) {
            return 1;
        }


        if (screenWidth <= 1199) {
            return 2;
        }


        return 4;
    }


    /* =================================================
       GET CARD GAP
    ================================================= */

    function getGap() {

        const sliderStyle =
            window.getComputedStyle(slider);

        return parseFloat(sliderStyle.gap) || 0;
    }


    /* =================================================
       GET MAX POSITION
    ================================================= */

    function getMaximumPosition() {

        const visibleCards =
            getVisibleCards();

        return Math.max(
            0,
            cards.length - visibleCards
        );
    }


    /* =================================================
       MOVE SLIDER
    ================================================= */

    function moveSlider(direction) {

        const maximumPosition =
            getMaximumPosition();


        currentPosition =
            currentPosition + direction;


        /* STOP AT FIRST CARD */

        if (currentPosition < 0) {
            currentPosition = 0;
        }


        /* STOP AT LAST CARD */

        if (currentPosition > maximumPosition) {
            currentPosition = maximumPosition;
        }


        updateSliderPosition();
    }


    /* =================================================
       UPDATE SLIDER POSITION
    ================================================= */

    function updateSliderPosition() {

        if (!cards[0]) {
            return;
        }


        const cardWidth =
            cards[0].getBoundingClientRect().width;


        const gap =
            getGap();


        const distance =
            currentPosition * (cardWidth + gap);


        slider.style.transform =
            "translate3d(-" + distance + "px, 0, 0)";


        updateButtons();
    }


    /* =================================================
       UPDATE ARROWS
    ================================================= */

    function updateButtons() {

        const maximumPosition =
            getMaximumPosition();


        /* PREVIOUS */

        if (currentPosition <= 0) {

            previousButton.disabled = true;

        } else {

            previousButton.disabled = false;

        }


        /* NEXT */

        if (currentPosition >= maximumPosition) {

            nextButton.disabled = true;

        } else {

            nextButton.disabled = false;

        }

    }


    /* =================================================
       PREVIOUS BUTTON
    ================================================= */

    previousButton.addEventListener(
        "click",
        function () {

            moveSlider(-1);

        }
    );


    /* =================================================
       NEXT BUTTON
    ================================================= */

    nextButton.addEventListener(
        "click",
        function () {

            moveSlider(1);

        }
    );


    /* =================================================
       WISHLIST
    ================================================= */

    const wishlistButtons =
        document.querySelectorAll(
            ".reviewed-watch-wishlist"
        );


    wishlistButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const icon =
                    button.querySelector("i");


                if (!icon) {
                    return;
                }


                icon.classList.toggle(
                    "fa-regular"
                );


                icon.classList.toggle(
                    "fa-solid"
                );

            }
        );

    });


    /* =================================================
       RESIZE
    ================================================= */

    let resizeTimer;


    window.addEventListener(
        "resize",
        function () {

            clearTimeout(resizeTimer);


            resizeTimer = setTimeout(
                function () {

                    const maximumPosition =
                        getMaximumPosition();


                    /*
                       Agar resize ke baad current
                       position available cards se
                       bahar chali gayi ho to last
                       valid position par le aayenge.
                    */

                    if (
                        currentPosition >
                        maximumPosition
                    ) {

                        currentPosition =
                            maximumPosition;

                    }


                    updateSliderPosition();

                },
                150
            );

        }
    );


    /* =================================================
       INITIAL SETUP
    ================================================= */

    currentPosition = 0;

    slider.style.transform =
        "translate3d(0, 0, 0)";


    updateButtons();


});


// MOST RREVIEW LINK END


// TOP BRAND CAROUSEL START

/* =========================================
   TOP BRAND CAROUSEL JS
========================================= */

const brandTrack = document.getElementById("brandTrack");
const brandNext = document.getElementById("brandNext");
const brandPrev = document.getElementById("brandPrev");

const brandSlides = document.querySelectorAll(".brand-slide");

let brandIndex = 0;


/* =========================================
   GET NUMBER OF VISIBLE IMAGES
========================================= */

function getBrandVisibleSlides() {

    if (window.innerWidth <= 767) {
        return 1;
    }

    if (window.innerWidth <= 1199) {
        return 2;
    }

    return 3;
}


/* =========================================
   UPDATE SLIDER
========================================= */

function updateBrandSlider() {

    const visibleSlides = getBrandVisibleSlides();

    const maxIndex = brandSlides.length - visibleSlides;

    if (brandIndex > maxIndex) {
        brandIndex = maxIndex;
    }

    if (brandIndex < 0) {
        brandIndex = 0;
    }

    const slideWidth = 100 / visibleSlides;

    brandTrack.style.transform =
        `translateX(-${brandIndex * slideWidth}%)`;
}


/* =========================================
   NEXT BUTTON
========================================= */

brandNext.addEventListener("click", function () {

    const visibleSlides = getBrandVisibleSlides();

    const maxIndex = brandSlides.length - visibleSlides;

    if (brandIndex < maxIndex) {

        brandIndex++;

    } else {

        brandIndex = 0;

    }

    updateBrandSlider();

});


/* =========================================
   PREVIOUS BUTTON
========================================= */

brandPrev.addEventListener("click", function () {

    const visibleSlides = getBrandVisibleSlides();

    const maxIndex = brandSlides.length - visibleSlides;

    if (brandIndex > 0) {

        brandIndex--;

    } else {

        brandIndex = maxIndex;

    }

    updateBrandSlider();

});


/* =========================================
   AUTO SLIDE
========================================= */

let brandAutoSlide = setInterval(function () {

    const visibleSlides = getBrandVisibleSlides();

    const maxIndex = brandSlides.length - visibleSlides;

    if (brandIndex < maxIndex) {

        brandIndex++;

    } else {

        brandIndex = 0;

    }

    updateBrandSlider();

}, 4000);


/* =========================================
   RESIZE
========================================= */

window.addEventListener("resize", function () {

    updateBrandSlider();

});


/* =========================================
   INITIAL
========================================= */

updateBrandSlider();


// TOP BRAND CAROUSEL END



// SHOP BY CATEGORY 

/* =========================================
   SHOP BY CATEGORY CAROUSEL
========================================= */

const categoryTrack = document.getElementById("categoryTrack");

const categoryPrev = document.querySelector(".category-prev");
const categoryNext = document.querySelector(".category-next");

const categoryItems = document.querySelectorAll(".category-item");


let categoryPosition = 0;


/* =========================================
   GET VISIBLE ITEMS
========================================= */

function getCategoryVisibleItems() {

    const screenWidth = window.innerWidth;

    if (screenWidth <= 767) {
        return 2;
    }

    if (screenWidth <= 1199) {
        return 4;
    }

    return 6;
}


/* =========================================
   MOVE CAROUSEL
========================================= */

function moveCategoryCarousel() {

    const visibleItems = getCategoryVisibleItems();

    const totalItems = categoryItems.length;

    const maxPosition = totalItems - visibleItems;

    if (categoryPosition > maxPosition) {
        categoryPosition = maxPosition;
    }

    if (categoryPosition < 0) {
        categoryPosition = 0;
    }


    const itemWidth = categoryItems[0].getBoundingClientRect().width;

    const trackStyle = window.getComputedStyle(categoryTrack);

    const gap = parseFloat(trackStyle.gap) || 0;


    const moveAmount = itemWidth + gap;


    categoryTrack.style.transform =
        `translateX(-${categoryPosition * moveAmount}px)`;


    updateCategoryButtons(maxPosition);
}


/* =========================================
   NEXT
========================================= */

categoryNext.addEventListener("click", function () {

    const visibleItems = getCategoryVisibleItems();

    const maxPosition = categoryItems.length - visibleItems;


    if (categoryPosition < maxPosition) {

        categoryPosition++;

        moveCategoryCarousel();
    }
});


/* =========================================
   PREVIOUS
========================================= */

categoryPrev.addEventListener("click", function () {

    if (categoryPosition > 0) {

        categoryPosition--;

        moveCategoryCarousel();
    }
});


/* =========================================
   BUTTON STATE
========================================= */

function updateCategoryButtons(maxPosition) {

    categoryPrev.disabled = categoryPosition === 0;

    categoryNext.disabled = categoryPosition >= maxPosition;
}


/* =========================================
   RESPONSIVE RESET
========================================= */

window.addEventListener("resize", function () {

    categoryPosition = 0;

    moveCategoryCarousel();
});


/* =========================================
   AUTO SLIDE
========================================= */

let categoryAutoSlide = setInterval(function () {

    const visibleItems = getCategoryVisibleItems();

    const maxPosition = categoryItems.length - visibleItems;


    if (categoryPosition < maxPosition) {

        categoryPosition++;

    } else {

        categoryPosition = 0;

    }


    moveCategoryCarousel();

}, 4000);


/* =========================================
   PAUSE ON HOVER
========================================= */

const categoryWrapper =
    document.querySelector(".category-carousel-wrapper");


categoryWrapper.addEventListener("mouseenter", function () {

    clearInterval(categoryAutoSlide);

});


categoryWrapper.addEventListener("mouseleave", function () {

    categoryAutoSlide = setInterval(function () {

        const visibleItems = getCategoryVisibleItems();

        const maxPosition = categoryItems.length - visibleItems;


        if (categoryPosition < maxPosition) {

            categoryPosition++;

        } else {

            categoryPosition = 0;

        }


        moveCategoryCarousel();

    }, 4000);

});


/* =========================================
   INITIAL LOAD
========================================= */

moveCategoryCarousel();

// SHOP BY CATEGORY END


/* =========================================
   TITAN VIDEO CAROUSEL JS
========================================= */

const titanTrack = document.querySelector(".titan-video-track");
const titanCards = document.querySelectorAll(".titan-video-card");

const titanPrev = document.querySelector(".titan-video-prev");
const titanNext = document.querySelector(".titan-video-next");

let titanCurrentIndex = 0;


/* =========================================
   GET VISIBLE CARDS
========================================= */

function getTitanVisibleCards() {

    if (window.innerWidth < 768) {
        return 1;
    }

    if (window.innerWidth < 1200) {
        return 3;
    }

    return 6;
}


/* =========================================
   UPDATE SLIDER
========================================= */

function updateTitanSlider() {

    const visibleCards = getTitanVisibleCards();

    const maxIndex = titanCards.length - visibleCards;

    if (titanCurrentIndex > maxIndex) {
        titanCurrentIndex = maxIndex;
    }

    if (titanCurrentIndex < 0) {
        titanCurrentIndex = 0;
    }

    const cardWidth = titanCards[0].offsetWidth;

    const gap = parseFloat(
        getComputedStyle(titanTrack).gap
    );

    const moveAmount = (cardWidth + gap) * titanCurrentIndex;

    titanTrack.style.transform =
        `translateX(-${moveAmount}px)`;
}


/* =========================================
   NEXT BUTTON
========================================= */

titanNext.addEventListener("click", function () {

    const visibleCards = getTitanVisibleCards();
    const maxIndex = titanCards.length - visibleCards;

    if (titanCurrentIndex < maxIndex) {

        titanCurrentIndex++;

        updateTitanSlider();
    }

});


/* =========================================
   PREVIOUS BUTTON
========================================= */

titanPrev.addEventListener("click", function () {

    if (titanCurrentIndex > 0) {

        titanCurrentIndex--;

        updateTitanSlider();
    }

});


/* =========================================
   RESIZE
========================================= */

window.addEventListener("resize", function () {

    updateTitanSlider();

});


/* =========================================
   VIDEO PLAY
========================================= */

titanCards.forEach(function (card) {

    const video = card.querySelector("video");

    video.play().catch(function () {
        // Browser autoplay restriction
    });


    /* Hover par video pause */
    card.addEventListener("mouseenter", function () {

        video.pause();

    });


    /* Mouse hataane par video play */
    card.addEventListener("mouseleave", function () {

        video.play().catch(function () {});

    });

});


/* =========================================
   INITIAL POSITION
========================================= */

updateTitanSlider();



/* EXPERIENCE THE WORLD OF TITAN START */

function updateTitanSlider() {

    const visibleCards = getTitanVisibleCards();

    const viewportWidth =
        titanTrack.parentElement.offsetWidth;

    const cardWidth =
        titanCards[0].offsetWidth;

    const gap =
        parseFloat(getComputedStyle(titanTrack).gap);


    /* =====================================
       PHONE
       CENTER CARD + SIDE PREVIEW
    ===================================== */

    if (window.innerWidth < 768) {

        const centerOffset =
            (viewportWidth - cardWidth) / 2;

        const moveAmount =
            centerOffset -
            (titanCurrentIndex * (cardWidth + gap));

        titanTrack.style.transform =
            `translateX(${moveAmount}px)`;

        return;
    }


    /* =====================================
       TABLET + DESKTOP
    ===================================== */

    const maxIndex =
        titanCards.length - visibleCards;

    if (titanCurrentIndex > maxIndex) {
        titanCurrentIndex = maxIndex;
    }

    if (titanCurrentIndex < 0) {
        titanCurrentIndex = 0;
    }

    const moveAmount =
        (cardWidth + gap) * titanCurrentIndex;

    titanTrack.style.transform =
        `translateX(-${moveAmount}px)`;
}


/* EXPERIENCE THE WORLD OF TITAN END */




// FAQ SECTION START

/* =========================================
   FAQ ACCORDION
========================================= */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const faqItem = this.closest(".faq-item");

        /*
           Sirf clicked FAQ ko toggle karega.
           Baaki FAQ close nahi honge.
           Isliye saare FAQ ek saath open
           kiye ja sakte hain.
        */

        faqItem.classList.toggle("active");

    });

});



// FAQ SECTION END


// CUSTOMER SAY START

/* =========================================
   CUSTOMER SAY SLIDER
   ========================================= */

const sansoSlider = document.querySelector(".sanso-customer-slider");
const sansoTrack = document.querySelector(".sanso-customer-track");
const sansoCards = document.querySelectorAll(".sanso-customer-card");
const sansoDotsBox = document.querySelector(".sanso-customer-dots");

let sansoCurrentSlide = 0;


/* GET NUMBER OF CARDS */

function sansoGetCardsPerView() {

    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
        return 1;
    }

    if (screenWidth < 1200) {
        return 2;
    }

    return 3;
}


/* CREATE DOTS */

function sansoCreateDots() {

    sansoDotsBox.innerHTML = "";

    const cardsPerView = sansoGetCardsPerView();

    const totalSlides = Math.ceil(
        sansoCards.length / cardsPerView
    );

    for (let i = 0; i < totalSlides; i++) {

        const dot = document.createElement("button");

        dot.classList.add("sanso-customer-dot");

        dot.setAttribute(
            "aria-label",
            "Customer slide " + (i + 1)
        );

        dot.addEventListener("click", function () {

            sansoCurrentSlide = i;

            sansoMoveSlider();

        });

        sansoDotsBox.appendChild(dot);
    }

    if (sansoCurrentSlide >= totalSlides) {
        sansoCurrentSlide = totalSlides - 1;
    }

    sansoMoveSlider();
}


/* MOVE SLIDER */

function sansoMoveSlider() {

    const cardsPerView = sansoGetCardsPerView();

    const totalSlides = Math.ceil(
        sansoCards.length / cardsPerView
    );

    if (sansoCurrentSlide >= totalSlides) {
        sansoCurrentSlide = totalSlides - 1;
    }

    if (sansoCurrentSlide < 0) {
        sansoCurrentSlide = 0;
    }

    const sliderWidth = sansoSlider.clientWidth;

    const moveAmount =
        sansoCurrentSlide * sliderWidth;

    sansoTrack.style.transform =
        "translateX(-" + moveAmount + "px)";


    /* ACTIVE DOT */

    const allDots =
        document.querySelectorAll(".sanso-customer-dot");

    allDots.forEach(function (dot, index) {

        dot.classList.toggle(
            "active",
            index === sansoCurrentSlide
        );

    });
}


/* INITIAL */

sansoCreateDots();


/* RESIZE */

window.addEventListener("resize", function () {

    sansoCreateDots();

});


/* =========================================
   OPTIONAL AUTO SLIDE
   4 SECOND
   ========================================= */

let sansoAutoSlide = setInterval(function () {

    const cardsPerView = sansoGetCardsPerView();

    const totalSlides = Math.ceil(
        sansoCards.length / cardsPerView
    );

    if (sansoCurrentSlide < totalSlides - 1) {

        sansoCurrentSlide++;

    } else {

        sansoCurrentSlide = 0;

    }

    sansoMoveSlider();

}, 4000);


/* PAUSE ON MOUSE HOVER */

sansoSlider.addEventListener("mouseenter", function () {

    clearInterval(sansoAutoSlide);

});


/* START AGAIN */

sansoSlider.addEventListener("mouseleave", function () {

    sansoAutoSlide = setInterval(function () {

        const cardsPerView = sansoGetCardsPerView();

        const totalSlides = Math.ceil(
            sansoCards.length / cardsPerView
        );

        if (sansoCurrentSlide < totalSlides - 1) {

            sansoCurrentSlide++;

        } else {

            sansoCurrentSlide = 0;

        }

        sansoMoveSlider();

    }, 4000);

});

// CUSTOMER SAY END



