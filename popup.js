

chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
    var url = tabs[0].url;
    theUrl="https://malicious-url-detectorv5.herokuapp.com/api?query="+url;
    theUrl2="https://malicious-url-detectorv5.herokuapp.com/result?url="+url;
    //console.log(url);
    //alert ("Hello")
  
    if (url!="chrome://newtab/")
    {
        fetch(theUrl2)
        //console.log("Script Started");
        var obj;

        fetch(theUrl)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                obj = myJson;
                if(obj.malware == false)
                {
                    
                    document.body.style.backgroundColor = "red";
                }
                else if (obj.malware == true)
                {
                    alert("Malware Detected!!");
                    if (window.confirm("Do you want to leave?")) { 
                        window.open("https://www.google.com", "Thanks for using our web application!");
                      }
                    //window.alert("No MALWARE");               

                    document.body.style.backgroundColor = "green";

                }

            });
        console.log(obj);
        
        
    }
    

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        chrome.runtime.reload();
    });
});







