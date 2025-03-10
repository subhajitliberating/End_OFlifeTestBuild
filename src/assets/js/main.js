$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        // stagePadding: 120,
        loop:true,
        margin:10,
        dots: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:4.6
            }
        }
    })
});
