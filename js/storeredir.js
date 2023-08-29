const newParams = new URLSearchParams(window.location.search);
const utmVal = newParams.get('utm_source');
const IOS_STORE_URL_STOREREDIR = "https://apps.apple.com/us/app/paw-patrol-academy/id6444813487";
const ANDROID_STORE_URL_STOREREDIR = "https://play.google.com/store/apps/details?id=com.originatorkids.paw&pli=1";

console.log("here is valud of utmval", utmVal);
if (utmVal){
    // console.log("in utmVal check");
    if (utmVal == "gotostore") {
        // autodetects device and send to store. Default is Apple if not detected.
        // if (/iPhone|iPad/i.test(navigator.userAgent))
        if (/Android/i.test(navigator.userAgent)) {
            location.href = ANDROID_STORE_URL_STOREREDIR;
        } else {
            location.href = IOS_STORE_URL_STOREREDIR;
        }
    }
    if (utmVal === "metaiosprereg") {
        location.href = IOS_STORE_URL_STOREREDIR;
    } else if (utmVal === "metaanprereg"){
        location.href = ANDROID_STORE_URL_STOREREDIR;
    }
}
