
const formTop = document.getElementById("form-inline__top");
// const formBottom = document.getElementById("form-inline__bottom");

formTop.addEventListener('submit', event => {handleSubmit(event, "top");});  

const handleSubmit = async (event, formLocation) => {
    event.preventDefault();

    console.log("form location: "+formLocation);

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
        try {
            const response = await fetch("http://localhost:8080", {
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

            // Fire GA event to track form submission; NB: GA will not count this if user has not consented yet
            if (formLocation === "top") {
                dataLayer.push({'event': 'upper-form-submitted'});
                console.log("upper form push event");
            } else if (formLocation === "bottom"){
                dataLayer.push({'event': 'lower-form-submitted'});
                console.log("lower form push event");
            }
        
        } catch (error) {
            // NB: By default, this only catches network errors, not non-2xx responses from the server (eg, 3xx, 4xx).
            // In those cases, you must manually throw error from try block to catch them here.
            console.error("Error:", error);
        }
        

        // TODO:  receive response.  If successful, display confirmation message and links or redirect.
        // If error, display a message but let them submit again.

        // STRETCH TODO: Blank out both forms when one submits

    } else {
        // 
        console.log("invalid form");
    }
}


// Function: Checks if email, firstname, and lastname are valid; Returns true if so, false otherwise
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