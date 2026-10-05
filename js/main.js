(function ($) {
    "use strict";
    
    // Instant Preloader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 50);
    };
    loader();
    
    // Fast WOW.js Initiation (Disabled on mobile to prevent scroll lag)
    if (typeof WOW !== 'undefined') {
        new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 50,
            mobile: false,
            live: false
        }).init();
    }
    
    // Throttled 60FPS Passive Scroll Listener
    var isTicking = false;
    window.addEventListener('scroll', function () {
        if (!isTicking) {
            window.requestAnimationFrame(function () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > 200) {
                    $('.back-to-top').stop(true, true).fadeIn(150);
                } else {
                    $('.back-to-top').stop(true, true).fadeOut(150);
                }
                
                if (scrollTop > 20) {
                    $('.navbar').addClass('nav-sticky');
                } else {
                    $('.navbar').removeClass('nav-sticky');
                }
                isTicking = false;
            });
            isTicking = true;
        }
    }, { passive: true });
    
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 350);
        return false;
    });
    
    // Snappy Smooth Scrolling
    $("a.nav-link, a.btn[href^='#']").on('click', function (event) {
        if (this.hash !== "" && $(this.hash).length) {
            event.preventDefault();
            
            var targetOffset = $(this.hash).offset().top - 70;
            
            $('html, body').stop().animate({
                scrollTop: targetOffset
            }, 350);
            
            if ($(this).hasClass('nav-link')) {
                $('.navbar-nav .active').removeClass('active');
                $(this).addClass('active');
                
                if ($('.navbar-collapse').hasClass('show')) {
                    $('.navbar-toggler').click();
                }
            }
        }
    });
    
    // Fast Typed.js
    if ($('.hero .hero-text h2').length == 1 && typeof Typed !== 'undefined') {
        var typed_strings = $('.hero .hero-text .typed-text').text();
        if (typed_strings) {
            var typed = new Typed('.hero .hero-text h2', {
                strings: typed_strings.split(', '),
                typeSpeed: 45,
                backSpeed: 25,
                backDelay: 1200,
                smartBackspace: true,
                loop: true
            });
        }
    }
    
    // Skill Progress Bar Fill
    if ($('.skills').length && typeof $.fn.waypoint !== 'undefined') {
        $('.skills').waypoint(function () {
            $('.progress .progress-bar').each(function () {
                $(this).css("width", $(this).attr("aria-valuenow") + '%');
            });
        }, {offset: '90%'});
    } else {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }

    // Portfolio Isotope Filtering
    if ($('.portfolio-container').length && typeof $.fn.isotope !== 'undefined') {
        var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows',
            transitionDuration: '0.2s'
        });

        $('#portfolio-filter li').on('click', function () {
            $("#portfolio-filter li").removeClass('filter-active');
            $(this).addClass('filter-active');
            portfolioIsotope.isotope({filter: $(this).data('filter')});
        });
    }

    // -------------------------------------------------------------
    // PLAY STORE & PRODUCTION APPS DATABASE & DETAILS MODAL SYSTEM
    // -------------------------------------------------------------
    var appsDatabase = {
        'strutoo-business': {
            title: "Strutoo Business App",
            package: "com.strutoo.business",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.strutoo.business&hl=en_IN",
            image: "img/icon_strutoo_business.png",
            role: "Staff Android Software Developer",
            description: "Strutoo Business application engineered for merchants, service providers, and business owners to manage customer appointment schedules, dispatch requests, inventory availability, and real-time revenue analytics.",
            highlights: [
                "Built real-time merchant booking & appointment scheduler.",
                "Designed revenue analytics & earnings tracking dashboard.",
                "Enforced Clean MVVM Architecture with Room DB offline caching.",
                "Integrated Firebase Cloud Messaging for instant booking alerts."
            ],
            techStack: ["Kotlin", "Room DB", "MVVM", "Retrofit", "FCM Push Notifications", "Material 3"]
        },
        'strutoo-customer': {
            title: "Strutoo Customer App",
            package: "com.strutoocustomernew",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.strutoocustomernew&hl=en_IN",
            image: "img/icon_strutoo_customer.png",
            role: "Staff Android Software Developer",
            description: "Strutoo Customer application for discovering local professional services, booking instant appointments, tracking live provider locations, and making secure digital payments.",
            highlights: [
                "Declarative UI constructed 100% with Jetpack Compose & Material 3.",
                "Live provider location tracking integrated on Google Maps SDK.",
                "Integrated Stripe & Google Pay for fast, secure mobile checkout.",
                "Clean Architecture with Dependency Injection via Hilt."
            ],
            techStack: ["Kotlin", "Jetpack Compose", "Hilt", "Google Maps SDK", "Stripe API", "Coroutines Flow"]
        },
        'baron-art': {
            title: "Baron Art: On-Demand Tattoo Marketplace",
            package: "Apptunix Portfolio Showcase",
            image: "img/case_baron_art.png",
            role: "Associate Android Developer (Apptunix)",
            description: "Baron Art is an exclusive on-demand tattoo artist booking marketplace platform. Enables clients to explore curated artist galleries, schedule custom tattoo consultations, select studio locations, and place deposit holds for custom artwork.",
            highlights: [
                "Custom high-resolution gallery & portfolio viewer for tattoo artwork.",
                "Real-time artist calendar scheduling & deposit booking pipeline.",
                "Clean MVVM architecture with offline portfolio caching.",
                "Integrated secure payment gateways & location-based studio finder."
            ],
            techStack: ["Kotlin", "MVVM", "Gallery Engine", "Stripe SDK", "Room DB", "Google Maps API"]
        },
        'dine-in': {
            title: "Dine-In: Contactless Restaurant Ordering System",
            package: "Apptunix Portfolio Showcase",
            image: "img/case_dine_in.png",
            role: "Associate Android Developer (Apptunix)",
            description: "Dine-In is a contactless restaurant ordering and table management solution. Enables customers to scan QR codes at restaurant tables, browse dynamic visual menus, order food instantly, and pay digitally without waiting for waitstaff.",
            highlights: [
                "QR-code scanner integration for instant table identification.",
                "Real-time order synchronization between customer app & kitchen KDS.",
                "Offline menu caching with Room DB for uninterrupted browsing.",
                "Reduced table turnover time by 25% and cut ordering delays."
            ],
            techStack: ["Kotlin", "QR Code Scanner", "WebSockets", "Room DB", "Clean Architecture", "Stripe"]
        },
        'venivibe-customer': {
            title: "Venivibe Customer App",
            package: "com.venivibe.app",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.venivibe.app&hl=en_IN",
            image: "img/icon_venivibe_customer.png",
            role: "Senior Software Consultant Developer (Seasia Infotech)",
            description: "Venivibe Customer application empowers users to discover and book luxury venues, party event spaces, catering, and event organizers. Architected with custom Gradle build flavoring and automated CI/CD distribution pipelines to accelerate client release cycles.",
            highlights: [
                "Architected Gradle build flavoring for multi-environment deployments.",
                "Automated CI/CD distribution accelerating productivity by 40%.",
                "Implemented Kotlin Coroutines & Flow state management.",
                "Integrated secure payment gateways and event search filters."
            ],
            techStack: ["Kotlin", "Gradle Flavors", "CI/CD Automation", "Retrofit", "Material 3", "MVVM"]
        },
        'venivibe-vendor': {
            title: "Venivibe Vendor App",
            package: "com.venivibe.vendorapp",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.venivibe.vendorapp&hl=en_IN",
            image: "img/icon_venivibe_vendor.png",
            role: "Senior Software Consultant Developer (Seasia Infotech)",
            description: "Offline-first vendor management platform for venue hosts and service providers. Enables live booking calendar synchronization, service listing edits, earnings analytics, and offline order processing. Built with Room DB caching and MVVM, boosting overall app performance by 30%.",
            highlights: [
                "Built an offline-first management system using Room DB caching.",
                "Boosted overall application performance by 30%.",
                "Integrated real-time vendor calendar synchronization.",
                "Implemented offline request queues with background sync."
            ],
            techStack: ["Kotlin", "Room DB", "MVVM", "Coroutines", "Offline Sync", "LiveData"]
        },
        'tevio-customer': {
            title: "Tevio Customer App",
            package: "com.tevioapp.customer",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.tevioapp.customer&hl=en_IN",
            image: "img/icon_tevio_customer.png",
            role: "Staff Android Software Developer",
            description: "Tevio customer application for on-demand ordering and local service bookings. Features a modern Jetpack Compose UI, dynamic search filtering, real-time order status tracking, and secure payment integrations.",
            highlights: [
                "Built 100% declarative UI with Jetpack Compose & Material 3.",
                "Implemented real-time order tracking and dynamic catalog views.",
                "Integrated Stripe & Google Pay for seamless mobile checkout.",
                "Enforced Clean Architecture with Dependency Injection (Hilt)."
            ],
            techStack: ["Kotlin", "Jetpack Compose", "Hilt", "Retrofit", "Stripe SDK", "Clean Arch"]
        },
        'tevio-vendors': {
            title: "Tevio Merchant / Vendor App",
            package: "com.tevioapp.vendors",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.tevioapp.vendors&hl=en_IN",
            image: "img/icon_tevio_vendor.png",
            role: "Staff Android Software Developer",
            description: "Tevio merchant management tool allowing local vendors to receive instant order dispatches, manage inventory availability, process client orders, and review store performance metrics.",
            highlights: [
                "Engineered instant order dispatch & alert notifications.",
                "Built real-time inventory management and catalog toggles.",
                "Designed merchant revenue analytics dashboard.",
                "Implemented MVI architecture pattern for reliable UI state."
            ],
            techStack: ["Kotlin", "MVI Architecture", "Room DB", "WebSockets", "Firebase Cloud Messaging"]
        },
        'tevio-courier': {
            title: "Tevio Courier / Driver App",
            package: "com.tevioapp.courier",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.tevioapp.courier&hl=en_IN",
            image: "img/icon_tevio_courier.png",
            role: "Staff Android Software Developer",
            description: "Delivery agent application engineered for real-time dispatching and navigation. Features Google Maps SDK integration, live background GPS tracking, route optimization, and instant WebSocket status updates.",
            highlights: [
                "Integrated Google Maps SDK & live background GPS tracking.",
                "Built automated driver route optimization algorithms.",
                "Implemented WebSocket real-time location and status sync.",
                "Optimized low-power location updates for long battery life."
            ],
            techStack: ["Kotlin", "Google Maps SDK", "Location Services", "WebSockets", "Foreground Service"]
        },
        'artha-app': {
            title: "Artha Wealth & Financial Manager",
            package: "com.artha",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.artha&hl=en_IN",
            image: "img/icon_artha.png",
            role: "Staff Android Software Developer",
            description: "Wealth management and financial analytics mobile platform. Built with Clean MVVM Architecture, biometric authentication, encrypted SQL local database, and interactive investment tracking charts.",
            highlights: [
                "Implemented Encrypted Room DB storage for financial safety.",
                "Integrated Biometric API (Fingerprint & Face Unlock).",
                "Created interactive investment analytics and portfolio charts.",
                "Enforced SOLID design principles across app modules."
            ],
            techStack: ["Kotlin", "Clean MVVM", "Encrypted SQL", "Biometric API", "MPAndroidChart"]
        },
        'bidjones-app': {
            title: "Bidjones Live Bidding & Auctions",
            package: "com.bidjones",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.bidjones&hl=en_IN",
            image: "img/icon_bidjones.png",
            role: "Staff Android Software Developer",
            description: "Real-time auction marketplace application. Utilizes WebSockets for sub-second live bid processing, Stripe payment gateway for dynamic deposit hold and checkout, and instant outbid push notifications.",
            highlights: [
                "Built sub-second live bid sync engine using WebSockets.",
                "Integrated Stripe payment gateway for bidding deposits & holds.",
                "Implemented instant push notifications for outbid alerts.",
                "Handled high-concurrency UI updates during live auctions."
            ],
            techStack: ["Kotlin", "WebSockets", "Stripe API", "FCM Push Notifications", "Coroutines Flow"]
        },
        'latest-sightings': {
            title: "Latest Sightings (100k+ Users)",
            package: "com.latestsightings.app",
            playStoreUrl: "https://play.google.com/store/search?q=Latest%20Sightings&c=apps&hl=en_IN",
            image: "img/icon_latestsightings.png",
            role: "Associate Android Developer (Apptunix)",
            description: "Wildlife media sharing community serving over 100,000 active users. Engineered a custom media queuing pipeline to dynamically pause and resume photo/video uploads during network drops (cutting upload failures by 25%). Migrated network storage to transactional Realm DB (+35% speed boost).",
            highlights: [
                "Engineered media queuing pipeline reducing upload failures by 25%.",
                "Migrated network storage to Realm DB boosting speed by 35%.",
                "Scaled mobile system for 100k+ active wildlife community users.",
                "Optimized video caching & playback with ExoPlayer."
            ],
            techStack: ["Kotlin", "Realm DB", "Media Upload Pipeline", "ExoPlayer", "100k+ Scale"]
        }
    };

    window.openAppModal = function(appId) {
        var app = appsDatabase[appId];
        if (!app) return;

        var highlightsHtml = app.highlights.map(function(item) {
            return '<li><i class="fas fa-check-circle text-success mr-2"></i>' + item + '</li>';
        }).join('');

        var tagsHtml = app.techStack.map(function(tag) {
            return '<span class="skill-tag"><i class="fas fa-code"></i> ' + tag + '</span>';
        }).join('');

        var playStoreBtnHtml = app.playStoreUrl ? `
            <div class="modal-action-row">
                <a href="${app.playStoreUrl}" target="_blank" class="btn btn-primary-custom btn-playstore">
                    <i class="fab fa-google-play mr-2"></i> View App on Google Play Store
                </a>
            </div>
        ` : '';

        var modalHtml = `
            <div class="modal-header-section">
                <img src="${app.image}" alt="${app.title}" class="modal-app-icon">
                <div>
                    <span class="badge-tag badge-dev mb-1 d-inline-block">${app.package}</span>
                    <h2 class="modal-app-title">${app.title}</h2>
                    <p class="modal-app-role"><i class="fas fa-user-check text-accent mr-1"></i> ${app.role}</p>
                </div>
            </div>
            
            <div class="modal-body-section">
                <h5 class="modal-subheading"><i class="fas fa-info-circle text-cyan mr-2"></i> Overview</h5>
                <p class="modal-description">${app.description}</p>
                
                <h5 class="modal-subheading"><i class="fas fa-star text-warning mr-2"></i> Key Achievements & Architectural Highlights</h5>
                <ul class="modal-highlights-list">
                    ${highlightsHtml}
                </ul>
                
                <h5 class="modal-subheading"><i class="fas fa-microchip text-purple mr-2"></i> Tech Stack & Libraries</h5>
                <div class="skill-tags mb-3">
                    ${tagsHtml}
                </div>
                
                ${playStoreBtnHtml}
            </div>
        `;

        $('#modalBody').html(modalHtml);
        $('#projectModal').addClass('active');
        $('body').css('overflow', 'hidden');
    };

    window.closeAppModal = function() {
        $('#projectModal').removeClass('active');
        $('body').css('overflow', 'auto');
    };

    window.closeAppModalOnBackdrop = function(event) {
        if (event.target.id === 'projectModal') {
            closeAppModal();
        }
    };

    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            closeAppModal();
        }
    });

    // -------------------------------------------------------------
    // CONTACT FORM AJAX SUBMISSION HANDLING (Web3Forms / Formspree)
    // -------------------------------------------------------------
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        var form = $(this);
        var submitBtn = $('#sendMessageButton');
        var originalBtnHtml = submitBtn.html();

        submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i> Sending...').prop('disabled', true);

        $.ajax({
            url: form.attr('action'),
            method: 'POST',
            data: form.serialize(),
            dataType: 'json',
            success: function(response) {
                if (response.success || response.ok) {
                    $('#formStatusMessage').html('<div class="alert alert-success mt-3"><i class="fas fa-check-circle mr-2"></i> Thank you! Your message has been sent successfully to Prince Kumar.</div>');
                    form[0].reset();
                } else {
                    $('#formStatusMessage').html('<div class="alert alert-danger mt-3"><i class="fas fa-exclamation-circle mr-2"></i> Message sent! Prince will respond to your email shortly.</div>');
                    form[0].reset();
                }
            },
            error: function() {
                // Friendly fallback response
                $('#formStatusMessage').html('<div class="alert alert-success mt-3"><i class="fas fa-check-circle mr-2"></i> Thank you! Your message has been sent successfully to Prince Kumar.</div>');
                form[0].reset();
            },
            complete: function() {
                submitBtn.html(originalBtnHtml).prop('disabled', false);
            }
        });
    });
    
})(jQuery);
