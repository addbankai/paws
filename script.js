document.addEventListener('DOMContentLoaded', () => {
    const featuredCard = document.querySelector('.nft-card.featured');
    const sideCards = document.querySelectorAll('.nft-card.side');
    const nftDisplay = document.querySelector('.nft-display');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const nftCardImages = document.querySelectorAll('.nft-display .nft-card .nft-image');
    // const artistAvatar = document.querySelector('.nft-card.featured .artist-avatar'); // Removed from HTML

    // --- Image Randomization ---
    const imageCount = 79; // Number of images in the img folder
    const imagePaths = [];
    for (let i = 1; i <= imageCount; i++) {
        imagePaths.push(`img/xx1 (${i}).jpg`);
    }

    // Fisher-Yates (Knuth) Shuffle algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    }

    shuffleArray(imagePaths);

    // Assign random images (make sure there are enough images)
    // Removed artistAvatar check
    if (nftCardImages.length <= imagePaths.length) {
        let imageIndex = 0;
        // Assign to main NFT cards
        nftCardImages.forEach(img => {
            img.src = imagePaths[imageIndex];
            img.style.backgroundColor = 'transparent'; // Remove placeholder background
            imageIndex++;
        });
        // Artist avatar assignment removed
    } else {
        console.warn("Not enough unique images available for all card slots.");
        // Fallback: Assign potentially repeating random images if not enough unique ones
        nftCardImages.forEach(img => {
             img.src = imagePaths[Math.floor(Math.random() * imagePaths.length)];
             img.style.backgroundColor = 'transparent';
        });
         // Artist avatar assignment removed
    }


    // --- Card Hover Effect ---
    if (featuredCard && sideCards.length > 0 && nftDisplay) {
        // Add perspective to the container for the 3D effect (only needed for 3D transforms)
        // Check if perspective is needed based on current CSS (it is for translateZ)
        // nftDisplay.style.perspective = '1000px'; // Set in CSS media query now

        sideCards.forEach(card => {
            card.addEventListener('mouseover', () => {
                // Add push-back class to the featured card when hovering a side card
                featuredCard.classList.add('is-pushed-back');
            });

            card.addEventListener('mouseout', () => {
                // Remove push-back class when not hovering a side card anymore
                featuredCard.classList.remove('is-pushed-back');
            });
        });

         // Add perspective to the featured card itself for the 3D effect
        featuredCard.style.transformStyle = 'preserve-3d';
        // Ensure transition includes transform property (already added in CSS, but good practice)
        // featuredCard.style.transition = 'transform 0.6s'; // Set in CSS
    }

    // --- Mobile Menu Toggle ---
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Optional: Change hamburger icon to 'X' when menu is open
            const icon = mobileMenuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- Initialize Collection Slider ---
    const collectionSwiper = new Swiper('.collection-swiper', {
        // Optional parameters
        loop: true, // Enable continuous loop mode
        slidesPerView: 1, // Default slides per view
        spaceBetween: 20, // Space between slides

        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 480px
            480: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 4,
                spaceBetween: 30
            },
             // when window width is >= 1200px
            1200: {
                slidesPerView: 5,
                spaceBetween: 30
            }
        },

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true, // Allow clicking on pagination bullets
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

});
