// Fix Swiper slider after page load
document.addEventListener('DOMContentLoaded', function() {
    // Wait for all scripts to load
    setTimeout(function() {
        // Find all Swiper containers
        var swipers = document.querySelectorAll('.elementor-main-swiper');
        
        swipers.forEach(function(swiperEl) {
            // Remove old Swiper instance classes
            swiperEl.classList.remove('swiper-initialized');
            swiperEl.classList.remove('swiper-horizontal');
            swiperEl.classList.remove('swiper-pointer-events');
            swiperEl.classList.remove('swiper-backface-hidden');
            
            // Remove duplicate slides
            var duplicates = swiperEl.querySelectorAll('.swiper-slide-duplicate');
            duplicates.forEach(function(dup) {
                dup.remove();
            });
            
            // Get swiper settings from data attribute
            var widgetEl = swiperEl.closest('[data-settings]');
            if (widgetEl) {
                try {
                    var settings = JSON.parse(widgetEl.getAttribute('data-settings').replace(/&quot;/g, '"'));
                    
                    console.log('Initializing Swiper with settings:', settings);
                    
                    // Initialize Swiper with settings
                    var swiperInstance = new Swiper(swiperEl, {
                        slidesPerView: parseInt(settings.slides_per_view) || 1,
                        loop: settings.loop === 'yes',
                        autoplay: settings.autoplay === 'yes' ? {
                            delay: parseInt(settings.autoplay_speed) || 5000,
                            disableOnInteraction: false, // Keep autoplay after interaction
                            pauseOnMouseEnter: settings.pause_on_hover === 'yes'
                        } : false,
                        speed: parseInt(settings.speed) || 500,
                        navigation: {
                            nextEl: '.elementor-swiper-button-next',
                            prevEl: '.elementor-swiper-button-prev'
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                            type: settings.pagination || 'bullets'
                        },
                        spaceBetween: (settings.space_between && settings.space_between.size) || 10
                    });
                    
                    console.log('Swiper initialized:', swiperInstance);
                    
                    // Ensure autoplay starts
                    if (settings.autoplay === 'yes' && swiperInstance.autoplay) {
                        swiperInstance.autoplay.start();
                        console.log('Autoplay started');
                    }
                    
                } catch(e) {
                    console.error('Swiper init error:', e);
                }
            }
        });
    }, 1000); // Increased delay to ensure all dependencies loaded
});
