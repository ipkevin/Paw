let videoParam;

$(function () {
    const videos = {
        'world': {
            'parent': 'dMiln4Yibr0',
            '40games': 'WXNY7YB3V4I',
            'educator': 'JKEXwRC_q68',
            'introduction': 'ESCeA6LI2bM',
            'positive_screentime': 'XOe6516fTwY'
        },
        'school': {
            'introduction': 'EGWws4WHG5Y',
            'trailer': 'kfGb3mt9kdk',
            'parent': 'kYO-1Tnc6fI',
            'educator': 'ZaXjNohvo3Y',
            'second_language': 'fTOXk3UbpV4'
        }
    }

    let productLine;
    if (window.location.origin.indexOf('world') >= 0 || window.location.pathname.indexOf('world') >= 0) {
        productLine = 'world';
    } else if (window.location.origin.indexOf('school') >= 0 || window.location.pathname.indexOf('school') >= 0) {
        productLine = 'school';
    }

    const urlParams = new URLSearchParams(window.location.search);
    videoParam = urlParams.get('video') || 'default';

    if (videos[productLine][videoParam]) {
        let newURL = 'https://www.youtube.com/embed/' + videos[productLine][videoParam] + '?rel=0&enablejsapi=1&origin=' + window.location.origin;
        $('iframe.simple-video-frame').attr('src', newURL);
    }
});

let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player, mobilePlayer;
let playing = false;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
    mobilePlayer = new YT.Player('youtube-mobile', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !playing) {
        fbq('track', 'ViewContent', {content_name: 'PlayVideo', content_ids: [videoParam]});
        playing = true;
    } else if (event.data == YT.PlayerState.ENDED) {
        playing = false;
    }
}
