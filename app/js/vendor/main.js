
$(function () {

    initMap();
    $(".counter").each(function () {
        $(this).counterUp()
    });
    var home_slider = $(".slider").addClass("owl-carousel").owlCarousel({
        items: 1,
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        loop: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn'
    });
    $('.slider .owl-nav > button').on('click', function () {
        console.log("asdsa");
        home_slider.trigger('stop.owl.autoplay');
    });
    var home_gallery_slider = $(".home-gallery-slider").addClass("owl-carousel").owlCarousel({
        items: 1,
        nav: true,
        autoplay: true,
        autoplayTimeout: 2000,
        loop: true
    });
    $('.home-gallery-slider .owl-nav > button').on('click', function () {
        console.log("asdsa");
        home_gallery_slider.trigger('stop.owl.autoplay');
    });
    $(".popup-gallery").addClass("owl-carousel").owlCarousel({
        items: 1,
        nav: true,
        loop: true
    })

    var number_opinion=2;
    var opinion_loop = true;
    if ($(".home-opinion-item").length == 1) {
        number_opinion = 1;
        opinion_loop = false;
    }
    if ($(".home-opinion-item").length == 2) {
        opinion_loop = false;
    }
    var home_opinion_slider = $(".home-opinion__slider").addClass("owl-carousel").owlCarousel({
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 9000,
        loop: opinion_loop,
        responsive: {
            0: {
                items: 1
            },
            900: {
                items: number_opinion
            }
        }
    });
    $('.home-opinion__slider .owl-dots > button').on('click', function () {
        console.log("asdsa");
        home_opinion_slider.trigger('stop.owl.autoplay');
    });

    $(".menu-toggle").on("click", function () {
        $(this).toggleClass("open");
        $(".header__nav").fadeToggle();
        $("body").toggleClass("oh")
    })
    $(".back-menu").on("click", function () {
        var issubmenu = false;
        if ($(".submenu").length) {
            $(".submenu").each(function () {
                if ($(this).hasClass("open")) {
                    issubmenu = true
                }
            })
            if (issubmenu) {
                $(".submenu").removeClass("open")
            } else {
                $(".header__nav").fadeToggle();
                $("body").toggleClass("oh");
                $(".menu-toggle").toggleClass("open");
            }
        }
    });

    $("input:checkbox").on("change", function () {
        if ($(this).is(":checked")) {
            $(this).closest(".checkbox-with-text").find("label").addClass("open");
        } else {
            $(this).closest(".checkbox-with-text").find("label").removeClass("open");
        }
    })

    $(".open-search, .search .clear").on("click", function () {
        $(".search").toggleClass("open")
    })

    $(".submenu").each(function () {
        if ($(this).find("li").length > 9) {
            $(this).addClass("columns")
        }
    })
    $(".menu-list").on("click", function () {
        $(this).closest("li").find(".submenu").toggleClass("open")
    })

    // tabs

    $(".tabs .tabs__nav a").on("click", function(e) {
        e.preventDefault();
        var content = $(this).closest(".tabs");
        var target = $($(this).attr("href"));
        var _ = $(this);

        if ($(this).hasClass("open")) {

        } else {
            content.find(".tabs__content-item").hide();
            content.find(".tabs__nav a").removeClass("open");
            target.fadeIn();
            $(this).addClass("open");
        }
        $(this).closest(".tabs__nav").find("select option").each(function () {
            if ($(this).val() == _.attr("href")) {
                $(this).prop("selected", true)
            } else {
                $(this).prop("selected", false)
            }
        })
    })
    $(".tabs .tabs__nav select").on("change", function () {
        var content = $(this).closest(".tabs")
        var _ = $(this);
        var target = $(_.find("option:selected").attr("value"));

        $(this).closest(".tabs__nav").find("li").each(function () {
            if ($(this).find("a").attr("href") == _.find("option:selected").attr("value")) {
                $(this).find("a").addClass("open");
            } else {
                $(this).find("a").removeClass("open")
            }
        });
        content.find(".tabs__content-item").hide();
        target.fadeIn();
    });

    $(".accordion__btn").on("click", function () {
        var container = $(this).closest(".accordion");
        var content = $(this).closest(".accordion__item");

        if (content.hasClass("open")) {
            content.find(".accordion__content").slideUp();
            content.removeClass("open");
        } else {
            container.find(".accordion__content").slideUp();
            container.find(".accordion__item").removeClass("open");
            content.find(".accordion__content").slideDown();
            content.addClass("open");
        }

    });

    $(".gallery-list__item .news-thumb").on("click", function (e) {
        $($(this).attr("href")).addClass("open");
        e.preventDefault();
    })
    $(".gallery-popup-close").on("click", function (e) {
        $(".gallery-popup").removeClass("open");
        e.preventDefault();
    });

    $(document).mouseup(function(e)
    {
        var container = $(".popup-gallery");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            $(".gallery-popup").removeClass("open");
        }
    });

    $(".submenu-toggle").on("click", function () {
        $(this).closest("li").toggleClass("open");
        $(this).closest("li").find("ul").slideToggle()
    })
    $(window).on('scroll', function() {
        if ($(".home-counter__bg").length) {
            var x = $(this).scrollTop();
            $('.home-counter__bg').css('background-position', '0% ' + parseInt(-x / 8) + 'px');
        }

    });

});

function initMap() {
    var findMap = document.getElementsByClassName('gmap');
    var scriptUrl = "http://maps.google.com/maps/api/js" + "?key=AIzaSyCg3z65RVUcKhNs6loK8eoJ8clxBjvfmhM";

    var loadMap = function() {
        for (var i = findMap.length - 1; i >= 0; i--) {
            var myMap = findMap[i];

            var center = new google.maps.LatLng(myMap.getAttribute('data-lat'), myMap.getAttribute('data-lon'));
            var zoom  = parseInt(myMap.getAttribute('data-zoom')) || 14;

            if ($(window).width() < 1024) {
                zoom = 7
            }
            if ($(window).width() < 767) {
                zoom = 6
            }

            var map = new google.maps.Map(myMap, {
                zoom: zoom,
                center: center,
                disableDefaultUI: true,
                scrollwheel: false,
                zoomControl: true,
                styles: [
                    {
                        "featureType": "water",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#d3d3d3"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "stylers": [
                            {
                                "color": "#808080"
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#b3b3b3"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#ffffff"
                            },
                            {
                                "weight": 1.8
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#d7d7d7"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#ebebeb"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#a7a7a7"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#efefef"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#696969"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#737373"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#d6d6d6"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {},
                    {
                        "featureType": "poi",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#dadada"
                            }
                        ]
                    }
                ]
            });

            var markerOptions = {
                map: map,
                icon: 'http://work.getid.com.pl/zsp/images/marker.png',
                animation: google.maps.Animation.DROP,
                zIndex: 100,
                position: new google.maps.LatLng(myMap.getAttribute('data-lat'), myMap.getAttribute('data-lon'))
            };
            var marker = new google.maps.Marker(markerOptions);
            var markers = document.getElementsByClassName('gmap-marker');

            if (markers.length) {
                for (var z = markers.length - 1; z >= 0; z--) {
                    var marker_item = markers[z];
                    var markerOptions = {
                        map: map,
                        icon: marker_item.getAttribute('data-icon'),
                        position: new google.maps.LatLng(marker_item.getAttribute('data-lat'), marker_item.getAttribute('data-lon'))
                    };
                    var markerw = new google.maps.Marker(markerOptions);
                }
            }

        }
    };
    loadMap()
}