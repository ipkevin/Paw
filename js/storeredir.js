const newParams = new URLSearchParams(window.location.search);
const utmVal = newParams.get('utm_source');
console.log("here is valud of utmval", utmVal);
if (utmVal){
    console.log("in utmVal check");
    if (utmVal === "metaiosprereg") {
        location.href = "https://apps.apple.com/us/app/endless-learning-academy/id1034523226";
    } else if (utmVal === "metaanprereg"){
        location.href = "https://play.google.com/store/apps/details?id=com.originatorkids.EndlessAlphabet";
    }
}
