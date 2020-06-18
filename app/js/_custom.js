'use strict';
document.addEventListener("DOMContentLoaded", function() {
    //Lazy Load
    let lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
    });
    lazyLoadInstance.update();
    //Telephone
    $('.tel').each(function () {
        let currentText = $(this).text();
        currentText = currentText.replace(/\s/g, '');
        $(this).attr('href',`tel:${currentText}`);
    });
    //Popups
    const togglePopup = (button,item)=>{
        if($(item).length>0){
            const closeButton = $(`${item} .popup-close`);
            $(button).click(function () {
                $(item).fadeIn(500);
            });
            closeButton.click(function () {
                $(item).fadeOut(500);
            })
        }
    };
    const salePopup = (item)=>{
        if($(item).length>0){
            const closeButton = $(`${item} .popup-close`);
            /*$(document).mouseleave(function(e){
                if (e.clientY < 10) {
                    $(item).fadeIn("fast");
                }
            });*/
            setTimeout(()=>{
                $(item).fadeIn("fast");
            },18000);
            closeButton.click(function () {
                $(item).fadeOut(500);
            })
        }
    };
    //Calculator check
    const calculatorLabelChecker = (item,input,label,name) =>{
        if($(item).length>0){
            let count = 1;
            $(item).each(function () {
                count+=1;
                $(this).find(input).attr('id',`${name}-${count}`);
                $(this).find(label).attr('for',`${name}-${count}`);
            })
        }
    };
    //Calculator checkboxes
    const calculatorCheckox = (item,dataType) =>{
        if($(item).length>0){
            let currentValue = '';
            $(item).click(function () {
                let checkedValue = $(this).val()+', ',newValue;
                if($(this).is(':checked')){
                    currentValue += $(this).val()+', ';
                    $('.window-calc-submit').attr(dataType,`${currentValue}`);
                }else{
                    newValue = currentValue.replace(`${checkedValue}`,'');
                    currentValue = newValue;
                    $('.window-calc-submit').attr(dataType,`${currentValue}`);
                }
            })
        }
    };
    //Calculator sizes
    const calculatorSizes = (item,data,input)=>{
        if($(item).length>0){
            let currentValue = '';
            $(item).each(function () {
                if($(this).val() !== '') {
                    currentValue += $(this).val() + ' ' + $(this).attr(data);
                    $(input).val(currentValue);
                }
            })
        }
    };
    //Youtube video
    const youtubeChange = ()=>{
        if($('.youtube').length>0){
            $('.youtube').each(function () {
                if($(this).attr('data-youtube') !== '') {
                    let youtube_url = $(this).attr('data-youtube');
                    youtube_url = youtube_url.replace('https://www.youtube.com/watch?v=', '');
                    $(this).attr('data-youtube', youtube_url);
                }
            });

        }
        //Video preview
        if($('.youtube').length>0) {
            (function () {
                if (!document.getElementsByClassName) {
                    // Поддержка IE8
                    const getElementsByClassName = function (node, classname) {
                        const a = [];
                        let re = new RegExp('(^| )' + classname + '( |$)');
                        let els = node.getElementsByTagName("*");
                        for (let i = 0, j = els.length; i < j; i++)
                            if (re.test(els[i].className)) a.push(els[i]);
                        return a;
                    };
                    var videos = getElementsByClassName(document.body, "youtube");
                } else {
                    var videos = document.querySelectorAll(".youtube");
                }
                let nb_videos = videos.length;
                for (let i = 0; i < nb_videos; i++) {
                    // Находим постер для видео, зная ID нашего видео
                    if (videos[i].getAttribute('data-youtube-img') !== '') {
                        videos[i].style.backgroundImage = 'url(' + videos[i].getAttribute('data-youtube-img') + ')';
                    } else {
                        videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].dataset.youtube + 'sddefault.jpg)';
                    }
                    // Размещаем над постером кнопку Play, чтобы создать эффект плеера
                    if(!videos[i].querySelector('.youtube-container')) {
                        const play = document.createElement("div"),
                            youtubeSettings = document.createElement('div');
                        if (videos[i].getAttribute('data-youtube-text')) {
                            const youtubeText = document.createElement('div');
                            youtubeText.setAttribute('class', 'youtube-text');
                            youtubeText.textContent = videos[i].getAttribute('data-youtube-text');
                            youtubeSettings.appendChild(youtubeText);
                        }
                        play.setAttribute("class", "play");
                        youtubeSettings.setAttribute('class', 'flex-container youtube-container');
                        youtubeSettings.appendChild(play);
                        videos[i].appendChild(youtubeSettings);
                    }
                    videos[i].onclick = function () {
                        // Создаем iFrame и сразу начинаем проигрывать видео, т.е. атрибут autoplay у видео в значении 1
                        const iframe = document.createElement("iframe");
                        let iframe_url = "https://www.youtube.com/embed/" + videos[i].dataset.youtube + "?autoplay=1&autohide=1";
                        if (this.getAttribute("data-params")) iframe_url += '&' + this.getAttribute("data-params");
                        iframe.setAttribute("src", iframe_url);
                        iframe.setAttribute("frameborder", '0');
                        // Высота и ширина iFrame будет как у элемента-родителя
                        iframe.style.width = this.style.width;
                        iframe.style.height = this.style.height;
                        // Заменяем начальное изображение (постер) на iFrame
                        this.parentNode.replaceChild(iframe, this);
                    }
                }
            })();
        }
    };
    youtubeChange();
    //Mobile slider
    const mobileSlider = (elem,mobileWidth) =>{
        let resize = false;
        const checkWidth = () =>{
            if ($(window).width() <= mobileWidth) {
                $(elem).slick({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow: '<span class="slider-btn slider-btn-left"></span>',
                    nextArrow: '<span class="slider-btn  slider-btn-right"></span>',
                })
            } else if ($(window).width() > mobileWidth && $(elem).hasClass('slick-initialized')) {
                $(elem).filter('.slick-initialized').slick('unslick');
            }
        }
        let doit;
        checkWidth();
        $(window).resize(function() {
            resize = true;
            if(resize === true) {
                clearTimeout(doit);
                doit = setTimeout(checkWidth, 1);
            }
        });
    };
    const AdaptiveBlocks = (mobileWidth,desktopCallback,mobileCallback)=>{
        const checkWidth = () =>{
            if ($(window).width() <= mobileWidth) {
                mobileCallback();
            } else if ($(window).width() > mobileWidth) {
                desktopCallback();
            }
        }
        let doit;
        let resize = false;
        if(resize === false) {
            checkWidth();
        }
        $(window).resize(function() {
            resize = true;
            if(resize === true) {
                clearTimeout(doit);
                doit = setTimeout(checkWidth, 1);
            }
        });
    };
    //Scroll
    const scrollTo = (elem,attr) => {
        $(elem).on("click", function () {
            let anchor = $(this).attr(attr);
            $('html, body').stop().animate({
                scrollTop: $(anchor).offset().top - 60
            }, 1500);
        });
    };
    scrollTo('.scrollTo a','href')
    //Tab func
    const tabElem = (item,container,name) =>{
        $(`${item}:first-child`).addClass('active');
        const projGallery = $(`${container}`),
            projectTabs = document.querySelectorAll(`${item}`),
            projectTab = $(`${item}`);
        projGallery.first().addClass('active');
        projectTab.first().addClass('active');
        let tabCount = 0;
        projGallery.each(function () {
            tabCount++;
            $(this).attr('id', `${name}-${tabCount}`);
        });
        for (let i = 0; i < projectTabs.length; i++) {
            projectTabs[i].setAttribute('data-href', `#${name}-${i + 1}`);
        }
        $(`${item}`).click(function () {
            if (!$(this).hasClass('active')) {
                let currentTab = $(this).attr('data-href');
                $(this).addClass('active').siblings().removeClass('active');
                if($(currentTab)){
                    $(currentTab).addClass('active').siblings().removeClass('active');
                }
            }
        });
    };
    // Youtube

    window.almComplete = function (alm) {
        //Blog page
        if($('.blog-nav-item').length>0){
            tabElem('.blog-nav-item','.blog-post-list','blog-container');
        }
        youtubeChange();
    };
    //Catalog
    const catalogClickDesk = () =>{
        $('.catalog-toggle').click(function () {
            $(this).toggleClass('active');
            if($(this).hasClass('active')){
                $('.catalog-menu-wrapper').stop().fadeIn('fast');
            }else{
                $('.catalog-menu-wrapper').stop().fadeOut('fast');
            }

        });
    };
    const catalogClickMobile = () =>{
        $('.catalog-toggle').click(function () {
            $(this).toggleClass('active');
            if($(this).hasClass('active')) {
                $('.header-nav').stop().fadeIn('fast');
            }else{
                $('.header-nav').stop().fadeOut('fast');
            }
        });
    };
    AdaptiveBlocks(1280,catalogClickDesk,catalogClickMobile);
    //Banner popup
    togglePopup('.play-banner-popup','.popup-video');
    //Projects slider
    if($('.projects-slider-item').length>0){
        $('.projects-slider').slick({
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 2,
            prevArrow: '<span class="slider-btn slider-btn-left"></span>',
            nextArrow: '<span class="slider-btn  slider-btn-right"></span>',
            responsive: [
                {
                    breakpoint: 1250,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        })
    }
    //Popups
    togglePopup('.btn-master','.popup-master');
    togglePopup('.window-calc-submit','.popup-master');
    togglePopup('.btn-write','.popup-write');
    togglePopup('.btn-call:not(.header-button-call)','.popup-call');
    //Calculator
    calculatorLabelChecker('.window-type-item','.lead-form-checkbox','.lead-form-checkbox-label','window-type');
    calculatorLabelChecker('.window-size-checkbox-item','.lead-form-checkbox','.lead-form-checkbox-label','window-size');
    calculatorCheckox('.window-type-item .lead-form-checkbox','data-type');
    calculatorCheckox('.window-size-checkbox','data-type-window');
    calculatorCheckox('.window-repair-radio','data-delivery');
    if($('.window-size-input').length>0){
        let count = 0;
        $('.window-sizes').each(function () {
            count+=1;
            $(this).find('.window-size-width').attr('data-number-item',`Размер ширины из блока ${count}`);
            $(this).find('.window-size-height').attr('data-number-item',`Размер высоты из блока ${count}`);
        });
    }
    $('.window-calc-submit').click(function () {
        if($(this).attr('data-type')){
            $('.window-type-repair').val($(this).attr('data-type'));
        }
        if($(this).attr('data-type-window')){
            $('.window-type-window').val($(this).attr('data-type-window'));
        }
        if($(this).attr('data-delivery')){
            $('.window-type-window-delivery').val($(this).attr('data-delivery').replace(',','')+' '+$('.window-repair-radio-dest').val()+'км');
        }
        calculatorSizes('.window-size-width','data-number-item','.window-type-window-width');
        calculatorSizes('.window-size-height','data-number-item','.window-type-window-height');
    });
    //Reviews video
    if($('.our-cases-slider-play').length>0) {
        $('.our-cases-slider-play').click(function () {
            let currentVideo = $(this).attr('data-video'),
                currentImg = $(this).attr('data-img'),
                currentText = $(this).next('.our-cases-slider-content').html(),
                currentGallery = $(this).parent().siblings('.our-cases-list-gallery').find('.our-cases-list-gallery-imgs').html();
            $('.popup-reviews-content').html(currentText);
            $('.popup-reviews-video-gallery').html(currentGallery);
            $('.popup-reviews-video').attr('data-youtube', currentVideo).attr('data-youtube-img', currentImg).addClass('youtube');
            youtubeChange();
        });
    }
    togglePopup('.our-cases-slider-play','.popup-reviews');
    $('.popup-reviews .popup-close').click(function () {
        $('.popup-reviews-video-gallery').html('');
        $('.popup-reviews-content').html('');
        $('.popup-reviews-video').attr('data-youtube', '').attr('data-youtube-img', '').removeClass('youtube').find('.youtube-container').remove();
    });
    //How work
    if($('.how-we-work-number').length>0){
        let count = 0;
        $('.how-we-work-number').each(function () {
            count+=1;
            $(this).text(count);
        });
    }
    //Service prices
    const ServicesPrice = (item,data,oldItem) =>{
        if($(item).length>0){
            let containerItem = document.querySelectorAll(item),menuItem = document.querySelectorAll('.services-menu-header');
            for(let i = 0;i<containerItem.length;i++){
                menuItem[i].setAttribute('data-item-price',`${data}-${i}`);
                containerItem[i].setAttribute('id',`${data}-${i}`);
            }
        }
        if($('.services-menu-header').length>0){
            $('.services-price-menu-item:first-child .services-menu-header').addClass('active');
            if(item === '.services-price-mobile-container') {
                $(`.services-price-menu-item:first-child ${item}`).addClass('active');
                $(`${oldItem}`).removeClass('active');
            }else {
                $(`${item}:first-child`).addClass('active');
                $(`${oldItem}`).removeClass('active');
            }
            $('.services-menu-header').click(function () {
                let currentItem = $(this).attr('data-item-price');
                $(this).addClass('active').parent().siblings().find('.services-menu-header').removeClass('active');
                if(item === '.services-price-mobile-container') {
                    $(`#${currentItem}`).addClass('active').parent().siblings().find(`${item}`).removeClass('active');
                }else{
                    $(`#${currentItem}`).addClass('active').siblings().removeClass('active');
                }
            });

        }
    };
    const ServicesPriceDesktop = () =>{
        ServicesPrice('.services-price-container','price-container','.services-price-mobile-container');
    };
    const ServicesPriceMobile = () =>{
        ServicesPrice('.services-price-mobile-container','price-mobile-container','.services-price-container');
    };

    AdaptiveBlocks(990,ServicesPriceDesktop,ServicesPriceMobile);

    //Employees slider
    if($('.employees-slider-item').length>0){
        $('.employees-slider').slick({
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 6,
            prevArrow: '<span class="slider-btn slider-btn-left"></span>',
            nextArrow: '<span class="slider-btn  slider-btn-right"></span>',
            responsive: [
                {
                    breakpoint: 1250,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 790,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        })
    }
    //Accordion
    if($('.faq-list-item').length>0){
        $('.faq-list-item').click(function () {
            $(this).toggleClass('active').siblings().removeClass('active');
        })
    }
    //Mobile header
    const HeaderBtnMobile = () =>{
        const headerBtnCall = $('.header-button-call');
        headerBtnCall.html(`<i class="fas fa-phone-alt"></i>`);
        headerBtnCall.click(function () {
            $('.header-bottom').toggleClass('active');
        })
    };
    const HeaderBtnDesktop = () =>{
        $('.header-button-call').html(`Перезвонить нам`);
        togglePopup('.header-button-call','.popup-call');
    };
    AdaptiveBlocks(1280,HeaderBtnDesktop,HeaderBtnMobile);
    //Why we slider
    mobileSlider('.why-we-advantages',794);
    //How we work
    mobileSlider('.how-we-work-list',794);
    //Why important
    mobileSlider('.why-important-list',794);
    //Sales popup
    salePopup('.popup-sale');
    //Blog page slider
    $('.blog-page-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        centerMode: true,
        variableWidth: true,
        arrows: false,
        adaptiveHeight: true
    });
    //Form file
    $('.lead-form-file').change(function(){
        let currentValue = $(this).val(),
            filename = currentValue.replace(/.*\\/g,'');
        $(this).parent().parent().find('.lead-form-file-text').text(filename);
    });
});