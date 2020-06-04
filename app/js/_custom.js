'use strict';
document.addEventListener("DOMContentLoaded", function() {
    //Lazy Load
    let lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
    });
    lazyLoadInstance.update();
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
    }
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
    if($('.youtube').length>0){
        $('.youtube').each(function () {
            let youtube_url = $(this).attr('data-youtube');
            youtube_url = youtube_url.replace('https://www.youtube.com/watch?v=','');
            $(this).attr('data-youtube',youtube_url);
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
                    videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].dataset.youtube + '/sddefault.jpg)';
                }
                // Размещаем над постером кнопку Play, чтобы создать эффект плеера
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
                videos[i].append(youtubeSettings);
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
        window.almComplete = function (alm) {
            //Blog page
            if($('.blog-nav-item').length>0){
                tabElem('.blog-nav-item','.blog-post-list','blog-container');
            }
            if($('.youtube').length>0){
                $('.youtube').each(function () {
                    let youtube_url = $(this).attr('data-youtube');
                    youtube_url = youtube_url.replace('https://www.youtube.com/watch?v=','');
                    $(this).attr('data-youtube',youtube_url);
                });
                (function(){
                    if (!document.getElementsByClassName) {
                        // Поддержка IE8
                        const getElementsByClassName = function(node, classname) {
                            const a = [];
                            let re = new RegExp('(^| )'+classname+'( |$)');
                            let els = node.getElementsByTagName("*");
                            for(let i=0,j=els.length; i < j; i++)
                                if(re.test(els[i].className))a.push(els[i]);
                            return a;
                        };
                        var videos = getElementsByClassName(document.body,"youtube");
                    } else {
                        var videos = document.querySelectorAll(".youtube");
                    }
                    let nb_videos = videos.length;
                    for (let i=0; i < nb_videos; i++) {
                        if(videos[i].childNodes.length < 1) {
                            // Находим постер для видео, зная ID нашего видео
                            if (videos[i].getAttribute('data-youtube-img') !== '') {
                                videos[i].style.backgroundImage = 'url(' + videos[i].getAttribute('data-youtube-img') + ')';
                            } else {
                                videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].dataset.youtube + '/sddefault.jpg)';
                            }
                            // Размещаем над постером кнопку Play, чтобы создать эффект плеера
                            const play = document.createElement("div"),
                                youtubeSettings = document.createElement('div');
                            if(videos[i].getAttribute('data-youtube-text')){
                                const youtubeText = document.createElement('div');
                                youtubeText.setAttribute('class','youtube-text');
                                youtubeText.textContent = videos[i].getAttribute('data-youtube-text');
                                youtubeSettings.appendChild(youtubeText);
                            }
                            play.setAttribute("class","play");
                            youtubeSettings.setAttribute('class','flex-container youtube-container');
                            youtubeSettings.appendChild(play);
                            videos[i].append(youtubeSettings);
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
                    }
                })();
            }
        };

});

