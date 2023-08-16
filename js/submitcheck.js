const IOS_STORE_URL = "https://www.apple.com/app-store/";
const ANDROID_STORE_URL = "https://play.google.com/";

const formTop = document.getElementById("form-inline__top");
// TO DO add bottom form reference
// const formBottom = document.getElementById("form-inline__bottom");

formTop.addEventListener('submit', event => {handleSubmit(event, "top");});  
// TO DO add bottom form event listener

const handleSubmit = async (event, formLocation) => {
    event.preventDefault();
    console.log("form location: "+formLocation);

    // Replace form's button label with loading image
    let currButtonCopy = event.target.getElementsByClassName("form-inline__button-copy")[0];
    let currLoading = event.target.getElementsByClassName("form-inline__button-loading")[0];
    (!currButtonCopy.classList.contains("form-inline__hide-misc")) ? currButtonCopy.classList.add("form-inline__hide-misc") : "";
    (currLoading.classList.contains("form-inline__hide-misc")) ? currLoading.classList.remove("form-inline__hide-misc") : "";

    if (checkValid(event)) {

        // Get the utm_source
        // 1st, grab all url params
        const urlParams = new URLSearchParams(window.location.search);
        // 2nd, convert all param names (not values) to lowercase to make sure we don't miss anything 
        // since urlsearchparams.get() is case sensitive
        const newParams = new URLSearchParams();
        for (const [name, value] of urlParams) { 
            newParams.append(name.toLowerCase(), value);
        }
        const utmString = newParams.get('utm_source');
        
        // Don't need this check.  Even if you assign null/empty to utmstring and assign to the data, receiver will ignore it
        // if (utmString !== null && utmString !== "") {
        //     // console.log("Here is the utm_param: "+utmString);
        // }
        
        // Get current URL incl pathname but not query params:
        const currUrl = window.location.href.split(/[?#]/)[0];
        // console.log("here's the current url: "+currUrl);


        // SEND THE API CALL
        const data = { 
            email: event.target.emailField.value,
            optInType: 'Single',
            emailType: 'Html',            
            REFERRER: utmString,
            SIGNUP_PAGE: currUrl,
            FIRSTNAME: event.target.firstnameField.value,
            LASTNAME: event.target.lastnameField.value,
        };
        // console.log("here is the data: "+JSON.stringify(data));
        
        // Send api call
        // TO DO: Setup timeout on the fetch after 10 seconds.
        // You can test this easily by pointing to local server url but running on another
        // network (like view on your phone -- it cannot access localhost on your pc)
        try {
            const response = await fetch("http://localhost:8080", {
            // const response = await fetch("https://pawnewslettersignupserver.azurewebsites.net/", {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
            
            });
            if (!response.ok) {
                console.log("here's raw response: ", JSON.stringify(response.status));
                throw new Error(response.status);
            }
            const result = await response.json();
            console.log("Success:", result);

            // Remove loading anim & add back btn copy
            (currButtonCopy.classList.contains("form-inline__hide-misc")) ? currButtonCopy.classList.remove("form-inline__hide-misc") : "";
            (!currLoading.classList.contains("form-inline__hide-misc")) ? currLoading.classList.add("form-inline__hide-misc") : "";

            // Fire GA event to track form submission; NB: GA will not count this if user has not consented yet
            if (formLocation === "top") {
                dataLayer.push({'event': 'upper-form-submitted'});
                console.log("upper form push event");
            } else if (formLocation === "bottom"){
                dataLayer.push({'event': 'lower-form-submitted'});
                console.log("lower form push event");
            }
        
            // Clear error msgs if they happen to be visible (ie, had a prev unsuccess submit, then succeeded without reloading)
            let errorMsgs = document.querySelectorAll(".form__error");
            errorMsgs.forEach((theErrMsg) => {
                (!theErrMsg.classList.contains("form__error--hide")) ? theErrMsg.classList.add("form__error--hide") : "";
            });

            // Show success message on both forms
            let successMsgs = document.querySelectorAll(".form__success");
            let isSupportedDevice = /iPhone|iPad|Android/i.test(navigator.userAgent); // check if on iOS/And so we know what msg to show
            successMsgs.forEach((theMsg) => {
                // unhide the success msg area 
                (theMsg.classList.contains("form__success--hide")) ? theMsg.classList.remove("form__success--hide") : "";
            
                // display the proper copy depending on whether can redirect or not
                if (isSupportedDevice) {
                    // show the redirect message
                    let redirMsg = theMsg.querySelector(".form__success-copy--redir");
                    if (redirMsg.classList.contains("form__success--hide")){
                        redirMsg.classList.remove("form__success--hide");
                    } 
                } else {
                    // show the non-redirecting messge
                    let redirMsg = theMsg.querySelector(".form__success-copy--noredir");
                    if (redirMsg.classList.contains("form__success--hide")){
                        redirMsg.classList.remove("form__success--hide");
                    } 
                }
            });
            // Now hide the signup forms
            formTop.classList.add("form-inline--hide");
            // TODO add bottomform

            // Redirect user to store page if possible
            if (isSupportedDevice) {
                setTimeout(() => {
                    if (/iPhone|iPad/i.test(navigator.userAgent)) {
                        location.href = IOS_STORE_URL;
                    } else {
                        location.href = ANDROID_STORE_URL;
                    }
                }, 3000);
            }
            
        } catch (error) {
            // NB: By default, this only catches network errors, not non-2xx responses from the server (eg, 3xx, 4xx).
            // In those cases, you must manually throw error from try block to catch them here.
            console.error("Error:", error);

            // Remove loading anim & add back btn copy
            (currButtonCopy.classList.contains("form-inline__hide-misc")) ? currButtonCopy.classList.remove("form-inline__hide-misc") : "";
            (!currLoading.classList.contains("form-inline__hide-misc")) ? currLoading.classList.add("form-inline__hide-misc") : "";
            
            // Display the error message above the form
            // NB: We must also check for & hide this msg in success condition
            let errorMsgs = document.querySelectorAll(".form__error");
            errorMsgs.forEach((theErrMsg) => {
                (theErrMsg.classList.contains("form__error--hide")) ? theErrMsg.classList.remove("form__error--hide") : "";
            });
        }
    } else {
        // Don't need to do much since check fxn already displayed input warnings
        console.log("invalid form");
        // Remove loading anim & add back btn copy
        (currButtonCopy.classList.contains("form-inline__hide-misc")) ? currButtonCopy.classList.remove("form-inline__hide-misc") : "";
        (!currLoading.classList.contains("form-inline__hide-misc")) ? currLoading.classList.add("form-inline__hide-misc") : "";
    }
}


// Function to check if email, firstname, and lastname are valid; Returns true if so, false otherwise
// Also displays/hides corresponding warning messages in form
const checkValid = (event) => {
    event.preventDefault();

    // Used to target the warning message element
    let emailWarning = event.target.getElementsByClassName("form-inline__warning-email")[0];
    let firstnameWarning = event.target.getElementsByClassName("form-inline__warning-firstname")[0];
    let lastnameWarning = event.target.getElementsByClassName("form-inline__warning-lastname")[0];
    let checkboxWarning = event.target.getElementsByClassName("form-inline__warning-checkbox")[0];

    let isValid = true;

    // Email validation
    const validRegex = /^[\w-\.\+]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!(event.target.emailField.value).match(validRegex)) {
        isValid = false;
        if (emailWarning.classList.contains("form-inline__warning-hide")) {
            emailWarning.classList.remove("form-inline__warning-hide");
        }
    } else {
        
        if (!emailWarning.classList.contains("form-inline__warning-hide")) {
            emailWarning.classList.add("form-inline__warning-hide");
        }
    }
    // First Name validation
    if ((event.target.firstnameField.value.length < 2 && event.target.firstnameField.value.length < 51)) {
        isValid = false;
        if (firstnameWarning.classList.contains("form-inline__warning-hide")){
            firstnameWarning.classList.remove("form-inline__warning-hide");
        }
    } else {
        if (!firstnameWarning.classList.contains("form-inline__warning-hide")){
            firstnameWarning.classList.add("form-inline__warning-hide");
        }
    }
    // Last Name validation
    if ((event.target.lastnameField.value.length < 2 && event.target.lastnameField.value.length < 51)) {
        isValid = false;
        if (lastnameWarning.classList.contains("form-inline__warning-hide")){
            lastnameWarning.classList.remove("form-inline__warning-hide");
        }
    } else {
        if (!lastnameWarning.classList.contains("form-inline__warning-hide")){
            lastnameWarning.classList.add("form-inline__warning-hide");
        }
    }

    // Consent opt-in validation
    if (!event.target.optinCheckbox.checked) {
        isValid = false;
        if (checkboxWarning.classList.contains("form-inline__warning-hide")) {
            checkboxWarning.classList.remove("form-inline__warning-hide");
        }
    } else {
        if (!checkboxWarning.classList.contains("form-inline__warning-hide")) {
            checkboxWarning.classList.add("form-inline__warning-hide");
        }
    }

    return isValid;
}