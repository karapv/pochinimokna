'use strict';
document.addEventListener("DOMContentLoaded", function() {
    //Lazy Load
    let lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
    });
    lazyLoadInstance.update();
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
    }
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
    const mobileSlider = (elem) =>{
        if ($(window).width() <= 880) {
            $(elem).slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            })
        }
        $(window).resize(function () {
            if ($(window).width() <= 880) {
                $(elem).slick({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                })
            } else if ($(window).width() > 880 && $(elem).hasClass('slick-initialized')) {
                $(elem).filter('.slick-initialized').slick('unslick');
            }
        });
    };
    //Scroll
    const scrollTo = (elem,attr) => {
        $(elem).on("click", function () {
            let anchor = $(this).attr(attr);
            console.log(anchor);
            $('html, body').stop().animate({
                scrollTop: $('#'+anchor).offset().top - 60
            }, 1500);
        });
    };
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
    $('.catalog-toggle').hover(function () {
        $('.catalog-menu-wrapper').fadeIn('fast');
    },function () {
        $('.catalog-menu-wrapper').fadeOut('fast');
    });
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
    togglePopup('.btn-call','.popup-call');
    //Calculator
    calculatorLabelChecker('.window-type-item','.lead-form-checkbox','.lead-form-checkbox-label','window-type');
    calculatorLabelChecker('.window-size-checkbox-item','.lead-form-checkbox','.lead-form-checkbox-label','window-size');
    if($('.window-size-checkbox-container').length>0){
        $('.window-size-checkbox-container').each(function () {
            if($(this).find('.window-size-checkbox-item').length == 2){
                $(this).find('.window-size-checkbox-item:last-child').css({'margin-left':'0'});
                $(this).find('.window-size-checkbox-item:first-child').css({'margin-right':'15px'});
            }
        })
    }
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
        let count = 0;
        $('.our-cases-slider-play').click(function () {
            let currentVideo = $(this).attr('data-video'), currentImg = $(this).attr('data-img'),currentText = $(this).next('.our-cases-slider-content').html();
            $('.popup-reviews-content').html(currentText);
            $('.popup-reviews-video').attr('data-youtube', currentVideo).attr('data-youtube-img', currentImg).addClass('youtube');
            youtubeChange();
        });
    }
    togglePopup('.our-cases-slider-play','.popup-reviews');
    $('.popup-reviews .popup-close').click(function () {
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
    if($('.services-price-container').length>0){
        let containerItem = document.querySelectorAll('.services-price-container'),menuItem = document.querySelectorAll('.services-price-menu-item');
        for(let i = 0;i<containerItem.length;i++){
            menuItem[i].setAttribute('data-item-price',`price-container-${i}`);
            containerItem[i].setAttribute('id',`price-container-${i}`);
        }
    }
    if($('.services-price-menu-item').length>0){
        $('.services-price-menu-item:first-child').addClass('active');
        $('.services-price-container:first-child').addClass('active');
        $('.services-price-menu-item').click(function () {
            let currentItem = $(this).attr('data-item-price');
            $(this).addClass('active').siblings().removeClass('active');
            $(`#${currentItem}`).addClass('active').siblings().removeClass('active');
        })
    }
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
                    breakpoint: 990,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                }
            ]
        })
    }
});

