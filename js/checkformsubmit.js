// Listen for form submit messages from the signup form iframes
window.addEventListener('message', function(event) {
    // Check the origin of the message for security
    if (event.origin !== "https://r2.dotdigital-pages.com") {
        return;
    }
    
    // Access the message data sent from the iframe
    var messageData = event.data;
    if (messageData === "upper form submitted") {
        dataLayer.push({'event': 'upper-form-submitted'});
    } else if (messageData == "lower form submitted") {
        dataLayer.push({'event': 'lower-form-submitted'});
    }
});