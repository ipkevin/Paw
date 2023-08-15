
const formTop = document.getElementById("form-inline__top");
// const formBottom = document.getElementById("form-inline__bottom");

formTop.addEventListener('submit', event => {handleSubmit(event, "top");});  

const handleSubmit = async (event, formLocation) => {
    event.preventDefault();

    console.log("form location: "+formLocation);

    if (checkValid(event)) {

        // Get the utm_source
        const urlParams = new URLSearchParams(window.location.search);
        
        // convert all param names (not values) to lowercase to make sure we don't miss anything (as urlsearchparams.get() is case sensitive)
        const newParams = new URLSearchParams();
        for (const [name, value] of urlParams) { 
            newParams.append(name.toLowerCase(), value);
        }
        const utmString = newParams.get('utm_source');
        
        if (utmString !== null && utmString !== "") {
            console.log("Here is the utm_param: "+utmString);
        }
        
        // Get current URL incl pathname but not query params:
        const currUrl = window.location.href.split(/[?#]/)[0];
        console.log("here's the current url: "+currUrl);


        // send api call
        // async function postJSON(data) {
        //     try {
        //       const response = await fetch("https://example.com/profile", {
        //         method: "POST", // or 'PUT'
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(data),
        //       });
          
        //       const result = await response.json();
        //       console.log("Success:", result);
        //     } catch (error) {
        //       console.error("Error:", error);
        //     }
        //   }
          
        //   const data = { username: "example" };
        //   postJSON(data);


        // fire GA event after successful api call

        // receive response.  If successful, display confirmation message and links or redirect.
        // If error, display a message but let them submit again.


    } else {
        // 
        console.log("invalid form");
    }
}



const checkValid = (event) => {
    event.preventDefault();

    // Used to target the warning message element
    let emailWarning = event.target.getElementsByClassName("form-inline__warning-email")[0];
    let firstnameWarning = event.target.getElementsByClassName("form-inline__warning-firstname")[0];
    let lastnameWarning = event.target.getElementsByClassName("form-inline__warning-lastname")[0];
    let checkboxWarning = event.target.getElementsByClassName("form-inline__warning-checkbox")[0];

    let isValid = true;

    // Email validation
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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
    if ((event.target.firstnameField.value.length < 2)) {
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
    if ((event.target.lastnameField.value.length < 2)) {
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