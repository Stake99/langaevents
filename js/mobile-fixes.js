/* MOBILE RESPONSIVENESS FIXES - JavaScript */

$(document).ready(function() {
    
    // 1. Mobile Navigation Toggle
    function initMobileNavigation() {
        // Create mobile menu toggle if it doesn't exist
        if ($('.js-colorlib-nav-toggle').length === 0) {
            $('body').prepend('<a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>');
        }
        // Ensure menu is in top position by default
        if (!$('body').hasClass('menu-top')) {
            $('body').addClass('menu-top');
            $('#colorlib-aside').hide();
            $('#colorlib-header').show();
            $('#colorlib-footer').show();
            $('#colorlib-main').css('margin-left', '0');
        }
        // Mobile menu toggle functionality
        $('.js-colorlib-nav-toggle').on('click', function(e) {
            e.preventDefault();
            var $menu = $('#colorlib-main-menu-top');
            var $toggle = $(this);
            if ($menu.hasClass('active')) {
                $menu.removeClass('active');
                $('body').removeClass('menu-show');
                $toggle.removeClass('active menu-opened');
            } else {
                $menu.addClass('active');
                $('body').addClass('menu-show');
                $toggle.addClass('active menu-opened');
            }
        });
        // Close mobile menu when clicking on menu items
        $('#colorlib-main-menu-top ul li a').on('click', function() {
            if ($(window).width() <= 992) {
                $('#colorlib-main-menu-top').removeClass('active');
                $('body').removeClass('menu-show');
                $('.js-colorlib-nav-toggle').removeClass('active menu-opened');
            }
        });
        // Close mobile menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('#colorlib-main-menu-top, .js-colorlib-nav-toggle').length) {
                if ($('#colorlib-main-menu-top').hasClass('active')) {
                    $('#colorlib-main-menu-top').removeClass('active');
                    $('body').removeClass('menu-show');
                    $('.js-colorlib-nav-toggle').removeClass('active menu-opened');
                }
            }
        });
        // Handle window resize
        $(window).on('resize', function() {
            if ($(window).width() > 992) {
                $('#colorlib-main-menu-top').removeClass('active');
                $('body').removeClass('menu-show');
                $('.js-colorlib-nav-toggle').removeClass('active');
            }
        });
    }
    
    // 2. Fix Testimonial Card Heights
    function fixTestimonialHeights() {
        if ($(window).width() <= 768) {
            $('.quote-testimonial-card').each(function() {
                var $card = $(this);
                var $text = $card.find('.testimonial-text');
                var cardHeight = $card.outerHeight();
                var otherElementsHeight = $card.find('.client-photo').outerHeight() + 
                                        $card.find('.client-name').outerHeight() + 
                                        $card.find('.client-title').outerHeight() + 60; // padding
                
                var availableHeight = cardHeight - otherElementsHeight;
                $text.css('max-height', availableHeight + 'px');
            });
        }
    }
    
    // 3. Fix Services Grid Layout
    function fixServicesLayout() {
        if ($(window).width() <= 768) {
            $('.colorlib-services .services-wrap').each(function() {
                var $wrap = $(this);
                var $desc = $wrap.find('.desc');
                
                // Ensure description doesn't overflow
                $desc.css({
                    'position': 'relative',
                    'margin-top': '0',
                    'width': '100%',
                    'left': '0',
                    'right': '0'
                });
            });
        }
    }
    
    // 4. Prevent Horizontal Scroll
    function preventHorizontalScroll() {
        $('body').css('overflow-x', 'hidden');
        
        // Check for elements that might cause horizontal scroll
        var windowWidth = $(window).width();
        $('*').each(function() {
            var elementRight = $(this).offset().left + $(this).outerWidth();
            if (elementRight > windowWidth) {
                $(this).css('max-width', '100%');
            }
        });
    }
    
    // 5. Improve Touch Targets
    function improveTouchTargets() {
        if ($(window).width() <= 768) {
            // Ensure all clickable elements have minimum touch target size
            $('a, button, .btn').each(function() {
                var $el = $(this);
                if ($el.outerHeight() < 44) {
                    $el.css('min-height', '44px');
                }
                if ($el.outerWidth() < 44) {
                    $el.css('min-width', '44px');
                }
            });
        }
    }
    
    // 6. Fix Image Aspect Ratios
    function fixImageAspectRatios() {
        $('.services-wrap .services-img, .about-img').each(function() {
            var $img = $(this);
            $img.css({
                'background-size': 'cover',
                'background-position': 'center center',
                'background-repeat': 'no-repeat'
            });
        });
    }
    
    // 7. Smooth Scroll for Anchor Links
    function initSmoothScroll() {
        $('a[href*="#"]:not([href="#"]):not([data-toggle])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 100
                    }, 1000);
                    return false;
                }
            }
        });
    }
    
    // 8. Lazy Load Images (if needed)
    function initLazyLoading() {
        $('img[data-src]').each(function() {
            var $img = $(this);
            var src = $img.attr('data-src');
            
            if (src) {
                $img.attr('src', src).removeAttr('data-src');
            }
        });
    }
    
    // 9. Window Resize Handler
    function handleWindowResize() {
        $(window).on('resize', function() {
            // Debounce resize events
            clearTimeout(window.resizeTimer);
            window.resizeTimer = setTimeout(function() {
                fixTestimonialHeights();
                fixServicesLayout();
                improveTouchTargets();
                preventHorizontalScroll();
                
                // Close mobile menu on resize to desktop
                if ($(window).width() > 992) {
                    $('body').removeClass('menu-show');
                    $('#colorlib-main-menu-top').removeClass('active');
                }
            }, 250);
        });
    }
    
    // Initialize all fixes
    function initAllFixes() {
        initMobileNavigation();
        fixTestimonialHeights();
        fixServicesLayout();
        preventHorizontalScroll();
        improveTouchTargets();
        fixImageAspectRatios();
        initSmoothScroll();
        initLazyLoading();
        handleWindowResize();
        
        console.log('Mobile responsiveness fixes initialized');
    }
    
    // Run fixes after DOM is ready
    initAllFixes();
    
    // Run fixes after images are loaded
    $(window).on('load', function() {
        fixTestimonialHeights();
        fixServicesLayout();
        preventHorizontalScroll();
    });
    
});

// Additional CSS fixes that need to be applied via JavaScript
$(document).ready(function() {
    
    // Add mobile-specific classes
    if ($(window).width() <= 768) {
        $('body').addClass('mobile-device');
    }
    
    if ($(window).width() <= 480) {
        $('body').addClass('small-mobile-device');
    }
    
    // Fix viewport meta tag if missing
    if (!$('meta[name="viewport"]').length) {
        $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">');
    }
    
});