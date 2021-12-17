chrome.runtime.onMessage.addListener(gotMessage);
let raavaRun = 0;

(function runInitially(){
    const host = document.body;
    
    const bubleText = document.createElement('div');
    bubleText.setAttribute("id", "bubbletext");
    bubleText.style.cssText = 'display:flex; cursor: pointer; position:fixed; top:600px; right:150px; opacity:0; transition:1.5s; transform: scale(0) rotate(0); background-color:#e8e8e8; padding: 20px; border-radius:5px; font-family: "FontUtama";'
    
    const closeRaava = document.createElement('span');    
    closeRaava.innerHTML = 'close Raava';
    closeRaava.setAttribute("id", "close-text");
    closeRaava.style.cssText = 'color:white; font-size:12px; position:fixed; top:600px; right:150px; opacity:0; transition:1.5s; cursor:default;'
    
    const details = document.createElement('div');
    details.setAttribute("id", "detail-close");
    details.style.cssText = 'height:20px; width:20px; cursor: pointer; position:fixed; top:600px; right:150px; opacity:0; transition:1.5s; border-radius:5px; background-color:#757575;'
    
    const closeicon = document.createElement('div');
    const iconic = document.createElement('span');
    closeicon.className = 'close-icon';
    closeicon.setAttribute("id", "raava-close");
    closeicon.style.cssText = 'height:20px; width:20px; cursor: pointer; position:fixed; top:600px; right:150px; opacity:0; transition:1.5s; border-radius:50%; background-color:#ba0202; color:white;text-align:center;font-size:12px; line-height:22px; transform: scale(0) rotate(0);' 
    iconic.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"  width="1em" height="1em"  meet" viewBox="0 0 512 512"><path d="M400 54.1c63 45 104 118.6 104 201.9c0 136.8-110.8 247.7-247.5 248C120 504.3 8.2 393 8 256.4C7.9 173.1 48.9 99.3 111.8 54.2c11.7-8.3 28-4.8 35 7.7L162.6 90c5.9 10.5 3.1 23.8-6.6 31c-41.5 30.8-68 79.6-68 134.9c-.1 92.3 74.5 168.1 168 168.1c91.6 0 168.6-74.2 168-169.1c-.3-51.8-24.7-101.8-68.1-134c-9.7-7.2-12.4-20.5-6.5-30.9l15.8-28.1c7-12.4 23.2-16.1 34.8-7.8zM296 264V24c0-13.3-10.7-24-24-24h-32c-13.3 0-24 10.7-24 24v240c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24z" fill="currentColor"/></svg>'
    closeicon.appendChild(iconic);

    const icon = document.createElement('img');
    icon.src = chrome.runtime.getURL("img/icon-1.png");
    icon.className = 'raava-icon';
    icon.setAttribute("id", "raava-icon");
    icon.style.cssText = 'height:150px; width:150px; cursor: pointer; position:fixed; top:600px; right:5px; opacity:0; transition:1.5s; transform: scale(0) rotate(0);'
    
    host.appendChild(bubleText);
    host.appendChild(icon);
    host.appendChild(details);
    host.appendChild(closeRaava);
    host.appendChild(closeicon);
    
})();

function checkElement(){
    const bubbleText = document.getElementById("bubbletext");
    
    let urlResult;
    let emailResult;
    let imageResult;
    
    let email = document.getElementById("senderemail");
    let emailArray = email.innerHTML.split("@");
    let senderEmail = emailArray[1];
    
    let links = document.getElementById("url");
    let url = links.href;
    
    let image = document.getElementById("imaji");
    let imgsources = image.src.split("_Chrome_Extension/");
    let imgsource = imgsources[1];
    console.log(imgsources);
    console.log(imgsource);
    
    bubbleText.style.fontSize = "13px";
    bubbleText.style.cursor = "default  ";
    bubbleText.style.top = "625px";
    
    fetch('http://127.0.0.1:5000/predict?a='+senderEmail+'&b='+url+'&c='+imgsource, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*"
        } 
    })
        .then((response) => {
            return response.json();
        }).then((myJson) => {
            console.log('GET response text:');
            if(myJson.url == "phishing"){
                bubbleText.innerHTML = "Potentially malicious <br> button/banner disabled";
                bubbleText.style.opacity = 1;
                bubbleText.style.transform = "scale(1)";
                setTimeout(function(){
                    bubbleText.innerHTML = "";
                    bubbleText.style.opacity = 0;
                    if(myJson.image == "ok"){
                        imageFound();
                    }
                }, 5000);
                links.style.pointerEvents = "none";
            }else if(myJson.url == "legitimate"){
                bubbleText.innerHTML = "This email is phish free";
                bubbleText.style.opacity = 1;
                bubbleText.style.transform = "scale(1)";
                setTimeout(function(){
                    bubbleText.innerHTML = "";
                    bubbleText.style.opacity = 0;
                    if(myJson.image == "ok"){
                        imageFound();
                    }
                }, 5000);
                links.style.pointerEvents = "auto";
            }
        });   
}
function runRaava() {
    const raava = document.getElementById("raava-icon");
    const closeBtn = document.getElementById("raava-close");
    const closeDetails = document.getElementById("detail-close");
    const closeText = document.getElementById("close-text");
    
    raava.style.opacity = 1;
    raava.style.transform = "scale(1) rotate(360deg)";
    
    checkElement();
    raavaRun = 1;
    
    raava.addEventListener("mouseover", function(){
        raava.style.transition=".8s";
        raava.style.top="575px";
        closeBtn.style.top="575px";
        closeBtn.style.transition=".8s";
        closeDetails.style.top="575px";
        closeDetails.style.transition=".8s";
        closeText.style.top="575px";
        closeText.style.transition=".8s";
    })
    raava.addEventListener("mouseout", function(){
        raava.style.transition=".8s";
        raava.style.top="600px";
        closeBtn.style.top="600px";
        closeBtn.style.transition=".8s";
        closeDetails.style.top="600px";
        closeDetails.style.transition=".8s";
        closeText.style.top="600px";
        closeText.style.transition=".8s";
    })
    
    raava.addEventListener("click", function(){
        if(closeBtn.style.opacity == 1 && closeBtn.style.transform == "scale(1) rotate(360deg)"){
            closeBtn.style.opacity = 0;
            closeBtn.style.transform = "scale(0) rotate(0)";
        }else{
            closeBtn.style.opacity = 1;
            closeBtn.style.transform = "scale(1) rotate(360deg)";
        }
    })
    
    closeBtn.addEventListener("mouseover", function(){
        closeDetails.style.width="95px";
        closeDetails.style.opacity=.3;
        closeText.style.right="170px";
        closeText.style.opacity=1;
        closeBtn.style.backgroundColor = "#f00000";
    })
      closeBtn.addEventListener("mouseout", function(){
        closeDetails.style.width="20px";
        closeDetails.style.opacity=0;
        closeText.style.right="150px";
        closeText.style.opacity=0;
        closeBtn.style.backgroundColor = "#993a3a";
    })
    
    closeBtn.addEventListener("click", function(){
        closeDetails.style.width="20px";
        closeDetails.style.opacity=0;
        closeText.style.right="150px";
        closeText.style.opacity=0;
        raava.style.opacity = 0;
        raava.style.transform = "scale(0) rotate(0)";
        closeBtn.style.opacity = 0;
        closeBtn.style.transform = "scale(0) rotate(0)";
        let links = document.getElementById("url");
        links.style.pointerEvents = "auto";
        raavaRun = 0;
    })
}

function imageFound(){
    const image1 = document.createElement('img');
    const image2 = document.createElement('img');
    const division = document.createElement('div');
    division.style.display = "grid";
    division.style.gridTemplateColumns = "auto auto";
    division.appendChild(image1);
    division.appendChild(image2);
    const textBubble = document.createElement('div');
    const closebutton = document.createElement('div');
    textBubble.innerHTML = "Raava found the original image version"
    closebutton.innerHTML = "X";
    closebutton.style.cursor = "pointer";
    const upper = document.createElement('div');
    upper.style.display = "grid";
    upper.style.gridTemplateColumns = "90% 10%";
    upper.appendChild(textBubble);
    upper.appendChild(closebutton);
    
    image1.src = chrome.runtime.getURL("img/fake.jpg"+ "?" + new Date().getTime());
    image2.src = chrome.runtime.getURL("img/real.jpg"+ "?" + new Date().getTime());
    image1.style.width = "100px";
    image1.style.height = "auto";
    image2.style.width = "100px";
    image2.style.height = "auto";
    division.style.marginTop = "10px";
    const bubbleText = document.getElementById("bubbletext");
    
    bubbleText.style.fontSize = "12px";
    bubbleText.style.display = "grid";
    bubbleText.style.gridTemplateRows =" 20% 80%";
    bubbleText.appendChild(upper);
    bubbleText.appendChild(division);
    bubbleText.style.opacity = 1;
    bubbleText.style.top = "535px";
    closebutton.addEventListener('click', function(){
        bubbleText.style.opacity = "0";
    })
}

function gotMessage(message, sender, sendResponse){
    console.log(message.txt);
    if(message.txt == "runRaava"){
        runRaava();
    }else{
        window.open(chrome.runtime.getURL("game/index.html"))
    }
}

const callback = (changelist, observer) => {
    console.log(changelist);
    if(raavaRun == 1){
        checkElement();
    } 
}

const observer = new MutationObserver(callback);

document.onreadystatechange = () =>{
    if(document.readyState === 'complete'){
        const elemen1 = document.getElementById("senderemail");
        const elemen2 = document.getElementById("url");
        const elemen3 = document.getElementById("imaji");
        observer.observe(elemen1, {
            characterData: false, attributes: false, childList: true, subtree: false
        });
        observer.observe(elemen2, {
            characterData: false, attributes: false, childList: true, subtree: false
        });
        observer.observe(elemen3, {
            characterData: false, attributes: false, childList: true, subtree: false
        });
    }
}