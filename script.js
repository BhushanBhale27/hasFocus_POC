document.addEventListener("DOMContentLoaded", function() {
    // Get reference to the iframe and log container
    var iframe = document.getElementById('yourIframeId');
    var logContainer = document.getElementById('logContainer');
    var previousFocusStatus = document.hasFocus(); // Track the initial focus status

    // Ensure the logContainer exists before attempting to append to it
    if (!logContainer) {
        console.error("Log container not found!");
        return;
    }

    // Display browser version on UI
    var browserVersion = getBrowserVersion();
    var h2 = document.getElementById("h2");
    h2.innerHTML = "Your chrome version is " + browserVersion;

    // Event listener for when the iframe loads
    iframe.onload = function() {
        var focusStatus = document.hasFocus();
        var focusStatusValue = focusStatus ? "true" : "false";
        var message = "value of document.hasFocus(): " + focusStatusValue + ".";
        updateLog(message);
    };

    // Check focus status at intervals
    var checkInterval = 500;
    setInterval(function() {
        checkFocus();
    }, checkInterval);

    function checkFocus() {
        var currentFocusStatus = document.hasFocus();
        
        if (currentFocusStatus !== previousFocusStatus) {
            // Only update the log if the focus status has changed
            if (currentFocusStatus) {
                updateLog("Focus gained on the parent document.");
            } else {
                updateLog("Focus lost from the parent document.");
            }
            
            // Update the previousFocusStatus
            previousFocusStatus = currentFocusStatus;
        }
    }

    function updateLog(message) {
        var logElement = document.createElement('h3');
        logElement.innerText = message;
    
        // Prepend the new log element at the beginning of the logContainer
        logContainer.prepend(logElement);
    }
    function getBrowserVersion() {
        var userAgent = navigator.userAgent;
        var match = userAgent.match(/(Chrome|Firefox|Safari|MSIE|Trident)\/?\s*(\d+)/);
        if (match) {
            return match[2];
        }
        return "Unknown browser version";
    }
});
