function injectTheScript() {
    let params = {
            active: true,
            currentWindow: true
    }
        
    chrome.tabs.query(params, gotTabs);
    
    function gotTabs(tabs){
        console.log("tabs");
        let msg = {txt: "runRaava"} 
        chrome.tabs.sendMessage(tabs[0].id, msg);
    }      
}

function openGameTab() {
    let params = {
            active: true,
            currentWindow: true
    }
        
    chrome.tabs.query(params, gotTabs);
    
    function gotTabs(tabs){
        console.log("tabs");
        let msg = {txt: "openGameTab"} 
        chrome.tabs.sendMessage(tabs[0].id, msg);
    }
    
        
}

document.getElementById('runraava').addEventListener('click', injectTheScript);

document.getElementById('game').addEventListener('click',openGameTab);