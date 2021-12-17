//Get all main segment area
const container = document.querySelector("body .container");

const lower = document.querySelector("body .lowerthan800");

const upperArea = document.querySelector("body .container .upper-menu");
const middleArea = document.querySelector("body .container .middle-menu");
const lowerArea = document.querySelector("body .container .lower-menu");

//Welcoming area
const welcomingArea = document.getElementById("welcoming");

//Game area
const titleBox = document.querySelector("body .container .middle-menu .title");
const quizBox = document.querySelector("body .container .middle-menu .quiz-box");
const titleMessage = document.getElementById("message-title");
const bodyMessage = document.getElementById("message-body");
const urlLink = document.getElementById("urls");
const raavabottomright = document.getElementById("raavaBottomRight");
const raavaproject = document.getElementById("turn-white");

//Button
const welcomingProceedBtn = document.getElementById("quizButton");
const legitbutton = document.getElementById("legitButton");
const phishbutton = document.getElementById("phishingButton");
const correctAnswer = document.getElementById("correctanswer");
const wrongAnswer = document.getElementById("wronganswer");
const buttonPlaceHolder = document.getElementById("buttonAnswers");
const bubbleNext = document.getElementById("bubblenext");

//Baloon speech
const raavaBaloon = document.getElementById("speechBaloon");

//Status
let gameStatus = undefined;
let array1 ;
let array2 ;

let company ;

//Create object email
//Pretest1

let object = document.createElement("DIV");
object.classList.add("attachment");
let object2 = document.createElement("DIV");
object2.classList.add("top");
let object3 = document.createElement("IMG");
object3.src = "img/PDF-Grey.jpg";
object2.appendChild(object3);
let object4 = document.createElement("DIV");
object4.classList.add("bottom");
let object5 = document.createElement("DIV");
object5.classList.add("left");
let object6 = document.createElement("IMG");
object6.src = "img/PDF.jpg";
let object7 = document.createElement("P");
object7.innerHTML = "Agreement<br>2.8MB";
object5.appendChild(object6);
object5.appendChild(object7);
let object8 = document.createElement("DIV");
object8.classList.add("right");
let object9 = document.createElement("IMG");
object9.src = "img/download.png";
object8.appendChild(object9);
object4.appendChild(object5);
object4.appendChild(object8);
object.appendChild(object2);
object.appendChild(object4);

//Questions
let preTestQ = [
    {
        numb: 1,
        subject: "Company Agreement",
        senderName: "Samantha",
        senderInitial: "S",
        senderEmail: "samantha.s@yahoo.com",
        dateTime: "Oct 2, 2021, 03:01 PM",
        time: "03:01 PM",
        content: ',<br><br> Please find below the company agreement document about the join operation on coal mining in east Borneo, Indonesia. <br> Please let me know if you have read the document and inform me ASAP.<br><br>Samantha, Dexamining Co.Ltd. <hr> <br>'
  }, {
      numb: 2,
      subject: "2021 Project Budgeting",
      senderName: "Herman Fransiskus",
      senderInitial: "H",
      senderEmail: "herman.fransiskus@gmail.com",
      dateTime: "Oct 11, 2021, 04:41 PM",
      time: "04:41 PM"
  }, {
      numb: 3,
      subject: "Security Update: Your Password will Expires Today",
      senderName: "Outlook Mail",
      senderInitial: "O",
      senderEmail: "support@outlooks.com",
      dateTime: "Oct 23, 2021, 02:03 PM",
      time: "02:03 PM"
  }, {
      numb: 4,
      subject: "System Error in Seller Fees Value",
      senderName: "Ebay",
      senderInitial: "E",
      senderEmail: "no.reply@ebay.com",
      dateTime: "Oct 11, 2016, 05:11 PM",
      time: "05:11 PM" 
  }, {
      numb: 5,
      subject: "We notice unusual login attempt from your account",
      senderName: "Paypal",
      senderInitial: "P",
      senderEmail: "no-reply@paypal.net",
      dateTime: "Oct 25, 2021, 05:55 PM",
      time: "05:55 PM"
  }, {
      numb: 6,
      subject: "Now, working without leaving the house is no longer a dream",
      senderName: "Lionbridge",
      senderEmail: "recruitment@lionbridge.com",
      senderInitial: "L",
      dateTime: "Sept 10, 2021, 02:21 PM",
      time: "02:21 PM"      
  }, {
      numb: 7,
      subject: "Technical Support: Access Needed for Anti-Malware Installation",
      dateTime: "Oct 23, 2021, 10:21 AM",
      time: "10:21 AM"
  }, {
      numb: 8,
      subject: "Reset Password Attempt on Your Instagram Account",
      senderName: "Instagram",
      senderInitial: "I",
      senderEmail: "security@instagram.support.al",
      dateTime: "Sep 16, 2021, 09:24 PM",
      time: "09:24 PM"
  }, {
      numb: 9,
      subject: "New Authenticator App added as Sign-in Step",
      senderName: "Google",
      senderInitial: "G",
      senderEmail: "no-reply@accounts.google.com",
      dateTime: "Sep 17, 2021, 11:33 AM",
      time: "11:33 AM"
  }, {
      numb: 10,
      subject: "Your Netflix Account Suspended",
      senderEmail: "no-reply@netfliks.com",
      senderName: "Netflix",
      senderInitial: "N",
      dateTime: "Oct 20, 2021, 12:23 PM",
      time: "12:23 PM"
  }
];

console.log(preTestQ[0].senderName + " <"+ preTestQ[0].senderEmail + ">");
//Welcoming button clicked
const buttonSpace1 = document.createElement("DIV");
buttonSpace1.classList.add("button-space");
const buttonNext = document.createElement("DIV");
buttonNext.classList.add("button");
buttonNext.setAttribute('id','buttonNext');
const span = document.createElement("SPAN");
span.innerHTML = "Next";
buttonNext.appendChild(span);
buttonSpace1.appendChild(buttonNext);

welcomingProceedBtn.addEventListener("click", function(){
    //Hide welcoming area
    welcomingArea.style.display = "none";
    
    //Show title and middle box
    titleBox.style.display="block";
    titleMessage.innerHTML = "Raava Phishing Email Simulation Game";
    quizBox.style.display="block";
    bodyMessage.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to the Raava email phishing simulation game!In this game, you will be given 10 questions &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to know your awareness on how you can detect whether the email in the question is phishing or &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;not.<br><br>          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The game will consist of 2 (two) game parts, namely:<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. Pre-test as well as training (5 questions); and<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Post-test (5 Questions).<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In the pre-test, you will be given 5 questions and hints that you can follow to answer the questions &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that you have been given.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Remember! Pay close attention to the hint given, therefore you can answer the question correctly. <br><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Furthermore, the rules and technicalities of the game will be explained on the next page. Then to &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;make this game even more exciting, you will be asked to fill in your name and email, but don't you &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;worry, the name and email you input will never come out of your web browser and you can enter a &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fake name and email address to play this game.<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If it is clear, please click the button below:";
    
    raavabottomright.classList.remove("hide");
    gameStatus = "welcoming";
    console.log(gameStatus);
    bodyMessage.appendChild(buttonSpace1);
})

//Rules page
const buttonSpace2 = document.createElement("DIV");
buttonSpace2.classList.add("button-wrapper");

const buttonBack1 = document.createElement("DIV");
buttonBack1.classList.add("button-back");
const buttonBackButton = document.createElement("DIV");
buttonBackButton.classList.add("button");
buttonBackButton.setAttribute('id','backHome');
const span1 = document.createElement("SPAN");
span1.innerHTML = "Back to Homepage";
buttonBackButton.appendChild(span1);
buttonBack1.appendChild(buttonBackButton);

const buttonNext1 = document.createElement("DIV");
buttonNext1.classList.add("button-next");
const buttonNextButton = document.createElement("DIV");
buttonNextButton.classList.add("button");
buttonNextButton.setAttribute('id','proceedQuiz');
const span2 = document.createElement("SPAN");
span2.innerHTML = "Let's Go!";
buttonNextButton.appendChild(span2);
buttonNext1.appendChild(buttonNextButton);

buttonSpace2.appendChild(buttonBack1);
buttonSpace2.appendChild(buttonNext1);

const inputWrapper = document.createElement("DIV");
inputWrapper.classList.add("wrapper");

const inputName = document.createElement("INPUT");
inputName.classList.add("name-input");
inputName.setAttribute('id','player-name');
inputName.setAttribute('type','string');
inputName.setAttribute('placeholder','Input Name');

const inputEmail = document.createElement("INPUT");
inputEmail.classList.add("email-input");
inputEmail.setAttribute('id','player-email');
inputEmail.setAttribute('type','email');
inputEmail.setAttribute('placeholder','Input Email');

inputWrapper.appendChild(inputName);
inputWrapper.appendChild(inputEmail);

buttonSpace1.addEventListener("click", function(){
    bodyMessage.style.paddingTop = "10px";
    bodyMessage.innerHTML = "<span class='gameRules'>Game Rules</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. You will be given five pre-test questions equipped with instructions and hints on how to identify &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; phishing emails.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. After you finish the pre-test, you will be asked to do 5 (five) post-test questions, where you need &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to work on the questions with a limit of 30 seconds per question.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Each question is a multiple-choice question, and you are asked to choose whether the email in &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the question is a phishing email or not.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. At the end of each section your correct answer score will appear.<br><br><hr><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To make it more realistic, please input a make up name and email for your details<br>";
    bodyMessage.appendChild(inputWrapper);
    bodyMessage.appendChild(buttonSpace2);
    gameStatus = "rules";
    console.log(gameStatus);
})

buttonBack1.addEventListener("click", function(){
    window.location.reload();
})

//Pretest
const anchor1 = document.getElementById("anchor-pretest2a");

const anchor2 = document.getElementById("anchor-pretest2b");

const anchor3 = document.getElementById("anchor-pretest3a");

const anchor4 = document.getElementById("help-center");

const anchor5a = document.getElementById("paypal");
const anchor5b = document.getElementById("paypal1");
const anchor5c = document.getElementById("paypal2");
const anchor5d = document.getElementById("paypal3");
const anchor5e = document.getElementById("paypal4");
const anchor5f = document.getElementById("paypal5");
const anchor5g = document.getElementById("paypal6");
const anchor5h = document.getElementById("paypal-login");

const anchor6 = document.getElementById("lionbridgeanchor");

const anchor7a = document.getElementById("anchor-5a");

const anchor7b = document.getElementById("anchor-5b");

const anchor8 = document.getElementById("anchor-3");

const anchor9a = document.getElementById("anchor-10");
const anchor9b = document.getElementById("anchor-10b");
const anchor9c = document.getElementById("anchor-10c");
const anchor9d = document.getElementById("anchor-10d");
const anchor9e = document.getElementById("anchor-10e");
const anchor9f = document.getElementById("anchor-10f");
const anchor9g = document.getElementById("anchor-10g");
const anchor9h = document.getElementById("anchor-10h");

let trueCounter = 0;

let userName = undefined;

let userEmail = undefined;

const detail1 = document.getElementById("detail-1");

const detail2 = document.getElementById("detail-2");

const detail3 = document.getElementById("detail-3");

const detail4 = document.getElementById("detail-4");

const line1 = document.querySelector("body .container .middle-menu .quiz-box .line-1");

const line2 = document.querySelector("body .container .middle-menu .quiz-box .line-2");

const question = document.querySelector("body .container .middle-menu .quiz-box .question");

const senderNames = document.getElementById("sender-name");

const senderEmails = document.getElementById("sender-email");

const senderIcon = document.getElementById("sender-initials");

let pretestScore = 0;


//Question placeholder 
const questionPlaceholder = document.querySelector("body .container .middle-menu .quiz-box .question .email-placeholder-1");

const questionPlaceholder2 = document.querySelector("body .container .middle-menu .quiz-box .question .email-placeholder-2");

const questionPlaceholder3 = document.querySelector("body .container .middle-menu .quiz-box .question .email-placeholder-3");

const questionPlaceholder4 = document.querySelector("body .container .middle-menu .quiz-box .question .email-placeholder-4");

const q4RecipientName = document.getElementById("ebay-seller");

const questionPlaceholder5 = document.querySelector("body .container .middle-menu .quiz-box .question .email-placeholder-5");

const pretestEnd = document.getElementById("pretest-score");

const pretestMessage = document.getElementById("message1");

const pretestButton = document.getElementById("pretestButton");

const posttestButton = document.getElementById("posttestButton");

const posttestMessage = document.getElementById("message2");

const scoreGreet = document.getElementById("effortAnswer");

const pretestScoring = document.getElementById("scorePretest");

const postTest1 = document.querySelector("body .container .middle-menu .quiz-box .question .post-test1");

const postTest2 = document.querySelector("body .container .middle-menu .quiz-box .question .post-test2");

const greetingPost2 = document.getElementById("greetingpost2");

const postTest3 = document.querySelector("body .container .middle-menu .quiz-box .question .post-test3");

const postTest3Greet = document.getElementById("instagramchange");

const postTest4 = document.querySelector("body .container .middle-menu .quiz-box .question .post-test4");

const postTest4UserCircle = document.getElementById("userCircle");

const postTest4UserEmail = document.getElementById("userInnerEmail");

const postTest5 = document.querySelector("body .container .middle-menu .quiz-box .question .post-test5");

const postTest5Greet = document.getElementById("needtoChange");

const dropDownButton = document.querySelector("body .container .middle-menu .quiz-box .line-2 .sender-details .lower-line .column-2");

const dropDownMessage = document.querySelector("body .container .middle-menu .quiz-box .line-2 .sender-details .column-2 .dropdown");

let ddclick = 0;

const raavaPretest = document.querySelector("body .container .raava-message");
const raavaPretestIcon = document.getElementById("raava-iconBottom");
const raavaMessage = document.getElementById("raavasaid");

buttonNext1.addEventListener("click", function(){
    let arrayA = inputEmail.value.split("@");
    let arrayB = arrayA[1].split(".");
    let esp = arrayB[0];
    if(inputName.value == null || inputName.value == "", inputEmail.value === null || inputEmail.value == ""){
        alert("please input name and email");
    }else if(inputEmail.value.includes("@") == false|| inputEmail.value.includes(".") == false){
        alert("please enter a fake or real email");
    }else if(esp == ""){
        alert("please provide an email");
    }else{
        line1.innerHTML = preTestQ[0].subject;
        senderNames.innerHTML = preTestQ[0].senderName + " &lt;"+ preTestQ[0].senderEmail + "&gt;";
        userName = inputName.value;
        senderIcon.style.backgroundColor = "#d9278f";
        senderIcon.innerHTML = preTestQ[0].senderInitial;
        userEmail = inputEmail.value;
        titleMessage.innerHTML = "Pre-Test 1/5";
        quizBox.removeChild(bodyMessage);
        bodyMessage.innerHTML = "";
        raavaPretestIcon.src ="img/Half_Body/D1.png";
        line1.classList.remove("hide");
        line2.classList.remove("hide");
        question.classList.remove("hide");
        raavaPretest.classList.remove("hide");
        raavaMessage.innerHTML = "Hi " + userName + " my name is Raava,<br>Here I will help you to identify what is phishing email looks like..";
        detail1.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp"+ preTestQ[0].senderName +" &lt;"+ preTestQ[0].senderEmail+"&gt;";
        detail2.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + userEmail.toLowerCase();
        detail3.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +preTestQ[0].dateTime;
        detail4.innerHTML = "&nbsp;" + preTestQ[0].subject;
        questionPlaceholder.innerHTML = "Hello " + userName + preTestQ[0].content;
        questionPlaceholder.appendChild(object);
        gameStatus = "pretest1";
        console.log(gameStatus);
        raavabottomright.classList.add("hide");
        array1 = userEmail.split("@");
        console.log(array1);
        array2 = array1[1].split(".");

        company = array2[0].charAt(0).toUpperCase() + array2[0].slice(1);
        console.log(company);
    }    
})

dropDownButton.addEventListener("click", function(){
    if (ddclick == 0){
        dropDownMessage.classList.remove("hide");
        ddclick += 1;
    }else{
        dropDownMessage.classList.add("hide");
        ddclick -= 1;
    }
})

anchor1.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "http://www.drive-google.com/herman.fransiskus";
    urlLink.style.display = "flex";
})

anchor1.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor1.addEventListener("click", function(){
    legitbutton.click();
})

anchor2.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "http://www.drive-google.com/herman.fransiskus";
    urlLink.style.display = "flex";
})

anchor2.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor2.addEventListener("click", function(){
    legitbutton.click();
})

anchor3.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "http://outlook-pcrisk.xyz/user-passwordreset";
    urlLink.style.display = "flex";
})

anchor3.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor3.addEventListener("click", function(){
    legitbutton.click();
})

anchor4.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "https://www.ebay.com/help/home";
    urlLink.style.display = "flex";
})

anchor4.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor5a.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "https://dev-paypal-services69.pantheonsite.io/wp-content/themes/fitnessbase/swah/customer_center/Secure324/myaccount/signin/?country.x=MA&amp;locale.x=en_MA";
    urlLink.style.display = "flex";
})

anchor5a.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor5b.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "https://dev-paypal-services69.pantheonsite.io/wp-content/themes/fitnessbase/swah/customer_center/Secure324/myaccount/signin/?country.x=MA&amp;locale.x=en_MA";
    urlLink.style.display = "flex";
})

anchor5b.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor5c.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "https://dev-paypal-services69.pantheonsite.io/wp-content/themes/fitnessbase/swah/customer_center/Secure324/myaccount/signin/?country.x=MA&amp;locale.x=en_MA";
    urlLink.style.display = "flex";
})

anchor5c.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor5d.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "https://dev-paypal-services69.pantheonsite.io/wp-content/themes/fitnessbase/swah/customer_center/Secure324/myaccount/signin/?country.x=MA&amp;locale.x=en_MA";
    urlLink.style.display = "flex";
})

anchor5d.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor5e.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "https://dev-paypal-services69.pantheonsite.io/wp-content/themes/fitnessbase/swah/customer_center/Secure324/myaccount/signin/?country.x=MA&amp;locale.x=en_MA";
    urlLink.style.display = "flex";
})

anchor5e.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor5f.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "https://dev-paypal-services69.pantheonsite.io/wp-content/themes/fitnessbase/swah/customer_center/Secure324/myaccount/signin/?country.x=MA&amp;locale.x=en_MA";
    urlLink.style.display = "flex";
})

anchor5f.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor5g.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "https://dev-paypal-services69.pantheonsite.io/wp-content/themes/fitnessbase/swah/customer_center/Secure324/myaccount/signin/?country.x=MA&amp;locale.x=en_MA";
    urlLink.style.display = "flex";
})

anchor5g.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor5h.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "https://dev-paypal-services69.pantheonsite.io/wp-content/themes/fitnessbase/swah/customer_center/Secure324/myaccount/signin/?country.x=MA&amp;locale.x=en_MA";
    urlLink.style.display = "flex";
})

anchor5h.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor5a.addEventListener("click", function(){
    legitbutton.click();
})
anchor5b.addEventListener("click", function(){
    legitbutton.click();
})
anchor5c.addEventListener("click", function(){
    legitbutton.click();
})
anchor5d.addEventListener("click", function(){
    legitbutton.click();
})
anchor5e.addEventListener("click", function(){
    legitbutton.click();
})
anchor5f.addEventListener("click", function(){
    legitbutton.click();
})
anchor5g.addEventListener("click", function(){
    legitbutton.click();
})
anchor5h.addEventListener("click", function(){
    legitbutton.click();
})


anchor6.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "https://www.lionbridge.com/join-our-team";
    urlLink.style.display = "flex";
})

anchor6.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor7a.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "http://update-account-instagram.idigitalzone.com/";
    urlLink.style.display = "flex";
})

anchor7a.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor7b.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "http://update-account-instagram.idigitalzone.com/";
    urlLink.style.display = "flex";
})

anchor7b.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor7a.addEventListener("click", function(){
    legitbutton.click();
})

anchor7b.addEventListener("click", function(){
    legitbutton.click();
})

anchor8.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "https://myaccount.google.com/notifications";
    urlLink.style.display = "flex";
})

anchor8.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor9a.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "http://netfilx.com.zonefivestudio.com/NETFLIX/net";
    urlLink.style.display = "flex";
})

anchor9a.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor9b.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "http://netfilx.com.zonefivestudio.com/NETFLIX/net";
    urlLink.style.display = "flex";
})

anchor9b.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor9c.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "http://netfilx.com.zonefivestudio.com/NETFLIX/net";
    urlLink.style.display = "flex";
})

anchor9c.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor9d.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "http://netfilx.com.zonefivestudio.com/NETFLIX/net";
    urlLink.style.display = "flex";
})

anchor9d.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor9e.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "http://netfilx.com.zonefivestudio.com/NETFLIX/net";
    urlLink.style.display = "flex";
})

anchor9e.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor9f.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "http://netfilx.com.zonefivestudio.com/NETFLIX/net";
    urlLink.style.display = "flex";
})

anchor9f.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor9g.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "http://netfilx.com.zonefivestudio.com/NETFLIX/net";
    urlLink.style.display = "flex";
})

anchor9g.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})

anchor9h.addEventListener("mouseenter", function(){
    urlLink.innerHTML = "http://netfilx.com.zonefivestudio.com/NETFLIX/net";
    urlLink.style.display = "flex";
})

anchor9h.addEventListener("mouseleave", function(){
    urlLink.style.display = "none";
})


anchor9a.addEventListener("click", function(){
    legitbutton.click();
})

anchor9b.addEventListener("click", function(){
    legitbutton.click();
})

anchor9c.addEventListener("click", function(){
    legitbutton.click();
})

anchor9d.addEventListener("click", function(){
    legitbutton.click();
})

anchor9e.addEventListener("click", function(){
    legitbutton.click();
})

anchor9f.addEventListener("click", function(){
    legitbutton.click();
})

anchor9g.addEventListener("click", function(){
    legitbutton.click();
})

anchor9h.addEventListener("click", function(){
    legitbutton.click();
})

//Raava speech
const raavaNext = document.getElementById("buttonNextRaava");
let speechCounter = 0;

console.log(speechCounter);
raavaNext.addEventListener("click", function(){
    if(speechCounter == 0){
        raavaPretestIcon.src ="img/Half_Body/A2.png";
        raavaMessage.innerHTML = "There are several things that you should pay attention to every time you open an email, including: <br><br> 1. Pay close attention to the sender's email and make sure there is nothing unusual in the email; <br> 2. if you don't know the sender, don’t try to download the file attachment that was attached along with the email;<br>3. Always pay attention to where the link is in the email by hovering your mouse over the link or button that can be clicked on the email page, the link will later appear in the lower left corner of your web browser.";
        speechCounter += 1;
        console.log(speechCounter);
    }else if(speechCounter == 1){
        raavaPretestIcon.src ="img/Half_Body/A3.png";
        raavaMessage.innerHTML = "Cybercriminals (in this case 'phishers') usually use 'social engineering' techniques in trapping their targets. They can pretend to be a co-worker, friend, administrative or even technical officer in your office and use the name of a big brand to gain your trust, then set you up in a trap that has been prepared. We should always pay attention to the email used by the sender of the email, because they usually take advantage of your busy life so that you are caught off guard and fail to distinguish the sender's address from the email whether it is real or fake.<br> Phishing emails are usually sent using an unknown email service provider, and try to trick you by inserting extra letters or symbols into the email address to trick you.";
        speechCounter += 1;
        console.log(speechCounter);
    }else if(speechCounter == 2){
        raavaPretestIcon.src ="img/Half_Body/A1.png";
        raavaMessage.innerHTML = "Furthermore, you must always be vigilant and careful not to directly download files that are sent along with the email. Malware files can be inserted through other files using techniques such as steganography. Files with large sizes usually cannot be scanned by the email service provider that you use.Other thing to be aware of is that generally your business partners or co-workers will rarely use their personal email to discuss work or business issues. Therefore you have to pay close attention to the context of the email being sent.<br> Other thing to be aware of is that generally your business partners or co-workers will rarely use their personal email to discuss work or business issues. Therefore you have to pay close attention to the context of the email being sent.";
        speechCounter += 1;
        console.log(speechCounter);
    }else if(speechCounter == 3){
        raavaPretestIcon.src ="img/Half_Body/E3.png";
        raavaMessage.innerHTML = "At last, if there is a link or button included in an email, then you need to pay close attention to where the link takes you before clicking on the link or button. You do this by moving your cursor right on the button or link without having to click and in the lower left corner of your web browser a url of the button or link will appear. Pay close attention to the link whether the link is genuine by looking at the words of the link or you can also use search engines like Google to find out about the link by typing the link on the Google search page.";
        speechCounter += 1;
        console.log(speechCounter);
    }else if(speechCounter == 4){
        raavaPretestIcon.src ="img/Half_Body/E3.png";
        raavaMessage.innerHTML = "Now, I want to see the extent of your understanding of how to determine an email that you receive is a phishing email or not. In the first segment of the game, you will be given with 5 questions regarding phishing emails and real emails. In the first question, you get an email from your company's business partner. Do you think the email was a phishing email? <br> In this game you can move the cursor and click the dropdown button to view the details of the email that was sent. The dropdown button is next to the word 'to me'.";
        speechCounter += 1;
        console.log(speechCounter);
    }else if (speechCounter ==5){
        raavaPretest.classList.add("hide");
        raavabottomright.classList.remove("hide");
        raavabottomright.src ="img/Half_Body/F3.png";
        raavabottomright.style.height="255";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "Hmmm... What do you think the answer is?";
    }
})

//Bubble next button clicked
bubbleNext.addEventListener("click", function(){
    if(gameStatus == "pretest1"){
        raavabottomright.src = "img/Half_Body/F2.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "It seems...";
        titleMessage.innerHTML = "Pre-Test 2/5";
        questionPlaceholder.classList.add("hide");
        questionPlaceholder2.classList.remove("hide");
        line1.innerHTML = preTestQ[1].subject;
        senderIcon.style.backgroundColor = "#21de5d";
        senderIcon.innerHTML = preTestQ[1].senderInitial;
        senderNames.innerHTML = preTestQ[1].senderName + " &lt;"+ preTestQ[1].senderEmail + "&gt;";
        detail1.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp"+ preTestQ[1].senderName +" &lt;"+ preTestQ[1].senderEmail+"&gt;";
        detail2.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + userEmail.toLowerCase();
        detail3.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +preTestQ[1].dateTime;
        detail4.innerHTML = "&nbsp;" + preTestQ[1].subject;
        questionPlaceholder.innerHTML = "Hello " + userName + preTestQ[1].content;
        wrongAnswer.classList.add("hide");
        correctAnswer.classList.add("hide");
        buttonPlaceHolder.classList.remove("hide");
        bubbleNext.classList.add("hide");
        gameStatus = "pretest2";
        console.log(gameStatus);
    }else if (gameStatus == "pretest2"){
        raavabottomright.src = "img/Half_Body/F1.png";
        titleMessage.innerHTML = "Pre-Test 3/5";
        senderIcon.style.backgroundColor = "#21acde";
        senderIcon.innerHTML = preTestQ[2].senderInitial;
        questionPlaceholder2.classList.add("hide");
        questionPlaceholder3.classList.remove("hide");
        line1.innerHTML = preTestQ[2].subject;
        senderNames.innerHTML = preTestQ[2].senderName + " &lt;"+ preTestQ[2].senderEmail + "&gt;";
        detail1.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp"+ preTestQ[2].senderName +" &lt;"+ preTestQ[2].senderEmail+"&gt;";
        detail2.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + userEmail.toLowerCase();
        detail3.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +preTestQ[2].dateTime;
        detail4.innerHTML = "&nbsp;" + preTestQ[2].subject;
        wrongAnswer.classList.add("hide");
        correctAnswer.classList.add("hide");
        buttonPlaceHolder.classList.remove("hide");
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "What do you think the answer is?";
        bubbleNext.classList.add("hide");
        gameStatus = "pretest3";
        console.log(gameStatus);
    } else if(gameStatus == "pretest3"){
        raavabottomright.src = "img/Half_Body/F3.png";
        questionPlaceholder3.classList.add("hide");
        questionPlaceholder4.classList.remove("hide");
        q4RecipientName.innerHTML = userName;
        titleMessage.innerHTML = "Pre-Test 4/5";
        senderIcon.style.backgroundColor = "#c2bf08";
        senderIcon.innerHTML = preTestQ[3].senderInitial;
        line1.innerHTML = preTestQ[3].subject;
        senderNames.innerHTML = preTestQ[3].senderName + " &lt;"+ preTestQ[3].senderEmail + "&gt;";
        detail1.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp"+ preTestQ[3].senderName +" &lt;"+ preTestQ[3].senderEmail+"&gt;";
        detail2.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + userEmail.toLowerCase();
        detail3.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +preTestQ[3].dateTime;
        detail4.innerHTML = "&nbsp;" + preTestQ[3].subject;
        wrongAnswer.classList.add("hide");
        correctAnswer.classList.add("hide");
        buttonPlaceHolder.classList.remove("hide");
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "What do you think the answer is..";
        bubbleNext.classList.add("hide");
        gameStatus = "pretest4";
        console.log(gameStatus);
    } else if(gameStatus == "pretest4"){
        raavabottomright.src = "img/Half_Body/F1.png";
        questionPlaceholder4.classList.add("hide");
        questionPlaceholder5.classList.remove("hide");
        titleMessage.innerHTML = "Pre-Test 5/5";
        senderIcon.style.backgroundColor = "#c2bf08";
        senderIcon.innerHTML = preTestQ[4].senderInitial;
        line1.innerHTML = preTestQ[4].subject;
        senderNames.innerHTML = preTestQ[4].senderName + " &lt;"+ preTestQ[4].senderEmail + "&gt;";
        detail1.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp"+ preTestQ[4].senderName +" &lt;"+ preTestQ[4].senderEmail+"&gt;";
        detail2.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + userEmail.toLowerCase();
        detail3.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +preTestQ[4].dateTime;
        detail4.innerHTML = "&nbsp;" + preTestQ[4].subject;
        wrongAnswer.classList.add("hide");
        correctAnswer.classList.add("hide");
        buttonPlaceHolder.classList.remove("hide");
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "Hmmm... Have you got the right answer?";
        bubbleNext.classList.add("hide");
        gameStatus = "pretest5";
        console.log(gameStatus);
    }else if(gameStatus == "pretest5"){
        line1.classList.add("hide");
        line2.classList.add("hide");
        wrongAnswer.classList.add("hide");
        correctAnswer.classList.add("hide");
        question.classList.add("hide");
        raavabottomright.src="img/Raava-presisi.png";
        raavabottomright.style.height= "auto";
        raavaBaloon.style.display = "none";
        raavaBaloon.innerHTML = ""
        bubbleNext.classList.add("hide");
        console.log(pretestScore);
        if(pretestScore == 5){
            titleMessage.innerHTML = "Pre-Test Score";
            pretestEnd.classList.remove("hide");
            pretestMessage.classList.remove("hide");
            scoreGreet.innerHTML = "Marvelous, " +userName +"!"
            pretestScoring.innerHTML = pretestScore+"/5";
            pretestButton.classList.remove("hide");
            gameStatus = "pretestscore";
        }else if(pretestScore < 5){
            titleMessage.innerHTML = "Pre-Test Score";
            pretestEnd.classList.remove("hide");
            pretestMessage.classList.remove("hide");
            pretestButton.classList.remove("hide");
            scoreGreet.innerHTML = "Good efort, " +userName
            pretestScoring.innerHTML = pretestScore+"/5";
            gameStatus = "pretestscore";
        }
    }else if(gameStatus == "posttest1"){
        raavabottomright.src = "img/Half_Body/F1.png";
        postTest1.classList.add("hide");
        postTest2.classList.remove("hide");
        titleMessage.innerHTML = "Post-Test 2/5";
        senderIcon.style.backgroundColor = "#ff7300";
        senderIcon.innerHTML = company.charAt(0);
        line1.innerHTML = preTestQ[6].subject;
        senderNames.innerHTML = company + " &lt;technicalsupport@"+ array2[0] + ".xyz&gt;";
        detail1.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp"+ company + " &lt;technicalsupport@"+ array2[0] + ".xyz&gt;";
        detail2.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + userEmail.toLowerCase();
        detail3.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +preTestQ[6].dateTime;
        detail4.innerHTML = "&nbsp;" + preTestQ[6].subject;
        wrongAnswer.classList.add("hide");
        correctAnswer.classList.add("hide");
        buttonPlaceHolder.classList.remove("hide");
        raavaBaloon.style.display = "none";
        bubbleNext.classList.add("hide");
        greetingPost2.innerHTML = "Hi " + userName +",<br><br>";
        gameStatus = "posttest2";
        console.log(gameStatus);
        startcount();
    }else if(gameStatus == "posttest2"){
        raavabottomright.src = "img/Half_Body/F2.png";
        postTest2.classList.add("hide");
        postTest3.classList.remove("hide");
        postTest3Greet.innerHTML = userName;
        titleMessage.innerHTML = "Post-Test 3/5";
        senderIcon.style.backgroundColor = "#e68cb6";
        senderIcon.innerHTML = preTestQ[7].senderInitial;
        line1.innerHTML = preTestQ[7].subject;
        senderNames.innerHTML = preTestQ[7].senderName + " &lt;"+ preTestQ[7].senderEmail + "&gt;";
        detail1.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp"+ preTestQ[7].senderName +" &lt;"+ preTestQ[7].senderEmail+"&gt;";;
        detail2.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + userEmail.toLowerCase();
        detail3.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +preTestQ[7].dateTime;
        detail4.innerHTML = "&nbsp;" + preTestQ[7].subject;
        wrongAnswer.classList.add("hide");
        correctAnswer.classList.add("hide");
        buttonPlaceHolder.classList.remove("hide");
        raavaBaloon.style.display = "none";
        bubbleNext.classList.add("hide");
        gameStatus = "posttest3";
        console.log(gameStatus);
        startcount();
    } else if(gameStatus == "posttest3"){
        raavabottomright.src = "img/Half_Body/F2.png";
        postTest3.classList.add("hide");
        postTest4.classList.remove("hide");
        postTest4UserCircle.innerHTML = userName.charAt(0).toUpperCase();
        postTest4UserEmail.innerHTML = array1[0] + "@gmail.com";
        titleMessage.innerHTML = "Post-Test 4/5";
        senderIcon.style.backgroundColor = "#edca91";
        senderIcon.innerHTML = preTestQ[8].senderInitial;
        line1.innerHTML = preTestQ[8].subject;
        senderNames.innerHTML = preTestQ[8].senderName + " &lt;"+ preTestQ[8].senderEmail + "&gt;";
        detail1.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp"+ preTestQ[8].senderName +" &lt;"+ preTestQ[8].senderEmail+"&gt;";;
        detail2.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + userEmail.toLowerCase();
        detail3.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +preTestQ[8].dateTime;
        detail4.innerHTML = "&nbsp;" + preTestQ[8].subject;
        wrongAnswer.classList.add("hide");
        correctAnswer.classList.add("hide");
        buttonPlaceHolder.classList.remove("hide");
        raavaBaloon.style.display = "none";
        bubbleNext.classList.add("hide");
        gameStatus = "posttest4";
        console.log(gameStatus);
        startcount();
    }else if(gameStatus == "posttest4"){
        raavabottomright.src = "img/Half_Body/F1.png";
        postTest4.classList.add("hide");
        postTest5.classList.remove("hide");
        postTest5Greet.innerHTML = userName;
        titleMessage.innerHTML = "Post-Test 5/5";
        senderIcon.style.backgroundColor = "#ab0000";
        senderIcon.innerHTML = preTestQ[9].senderInitial;
        line1.innerHTML = preTestQ[9].subject;
        senderNames.innerHTML = preTestQ[9].senderName + " &lt;"+ preTestQ[9].senderEmail + "&gt;";
        detail1.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp"+ preTestQ[9].senderName +" &lt;"+ preTestQ[9].senderEmail+"&gt;";;
        detail2.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + userEmail.toLowerCase();
        detail3.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +preTestQ[9].dateTime;
        detail4.innerHTML = "&nbsp;" + preTestQ[9].subject;
        wrongAnswer.classList.add("hide");
        correctAnswer.classList.add("hide");
        buttonPlaceHolder.classList.remove("hide");
        raavaBaloon.style.display = "none";
        bubbleNext.classList.add("hide");
        gameStatus = "posttest5";
        console.log(gameStatus);
        startcount();
    }else if(gameStatus == "posttest5"){
        line1.classList.add("hide");
        line2.classList.add("hide");
        wrongAnswer.classList.add("hide");
        correctAnswer.classList.add("hide");
        question.classList.add("hide");
        raavabottomright.src="img/Raava-presisi.png";
        raavabottomright.style.height= "auto";
        raavaBaloon.style.display = "none";
        raavaBaloon.innerHTML = ""
        bubbleNext.classList.add("hide");
        console.log(postTestScore);
        countdown1.style.display = "none";
        if(postTestScore == 5){
            titleMessage.innerHTML = "Post-Test Score";
            pretestEnd.classList.remove("hide");
            pretestMessage.classList.add("hide");
            posttestMessage.classList.remove("hide");
            pretestButton.classList.add("hide");
            posttestButton.classList.remove("hide");
            scoreGreet.innerHTML = "Marvelous, " +userName +"!"
            pretestScoring.innerHTML = postTestScore+"/5";
            gameStatus = "posttestscore";
            confetti.start();
        }else if(postTestScore < 5 && postTestScore >= 3){
            titleMessage.innerHTML = "Post-Test Score";
            pretestEnd.classList.remove("hide");
            pretestMessage.classList.add("hide");
            posttestMessage.classList.remove("hide");
            pretestButton.classList.add("hide");
            posttestButton.classList.remove("hide");
            scoreGreet.innerHTML = "Good efort, " +userName
            pretestScoring.innerHTML = postTestScore+"/5";
            gameStatus = "posttestscore";
        }else if(postTestScore < 3){
            titleMessage.innerHTML = "Post-Test Score";
            pretestEnd.classList.remove("hide");
            pretestMessage.classList.add("hide");
            posttestMessage.classList.remove("hide");
            pretestButton.classList.add("hide");
            posttestButton.classList.remove("hide");
            scoreGreet.innerHTML = "You've been hacked " +userName
            pretestScoring.innerHTML = postTestScore+"/5";
            gameStatus = "posttestscore";
            raavaproject.style.color = "white";
            upperArea.style.backgroundColor = "#166d3b";
            upperArea.style.backgroundImage = "linear-gradient(180deg, #166d3b 0%, #121314 60%)";
            document.body.style.backgroundImage = "url(img/Hacked.gif)";
        }
    }
})
//Legit and Phishing button clicked
legitbutton.addEventListener("click", function(){
    if (gameStatus == "pretest1"){
        buttonPlaceHolder.classList.add("hide");
        wrongAnswer.classList.remove("hide");
        raavaBaloon.style.display = "flex";
        raavabottomright.src="img/Half_Body/C2.png";
        raavaBaloon.innerHTML = "As I explained earlier, in general, your business partner will not discuss work issues using his personal email. Always be vigilant and avoid downloading the attachment file that is attached in the email.";
        bubbleNext.classList.remove("hide");
    }else if (gameStatus == "pretest2"){
        buttonPlaceHolder.classList.add("hide");
        wrongAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/C3.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "If you pay close attention, the link and button in the email will direct you to the 'http://drive-google.com' page. Where that page is not Google's official page, which it should be 'https://www.drive.google'.com'";
        bubbleNext.classList.remove("hide");
    } else if (gameStatus == "pretest3"){
        buttonPlaceHolder.classList.add("hide");
        wrongAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/C1.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "The URL and email address in the email do not belong to the Outlook, therefore it can be classified that the email is a phishing email. Stay alert!";
        bubbleNext.classList.remove("hide");
    } else if(gameStatus == "pretest4"){
        buttonPlaceHolder.classList.add("hide");
        correctAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/E1.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "The email is the original email that eBay sent to the seller in 2016. If you take a look carefully, both the URL and the link are owned by eBay.com. In addition, direct greeting by using your name at the beginning of a sentence is usually not done by phishers.";
        pretestScore += 1;
        bubbleNext.classList.remove("hide");
    } else if (gameStatus == "pretest5"){
        buttonPlaceHolder.classList.add("hide");
        wrongAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/C1.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "If you pay attention to the sender's email,  the link used by the sender is a fake link and it does not belong to paypal. This email is taken from the paypal-community.com site.";
        bubbleNext.innerHTML = "Show Result";
        bubbleNext.classList.remove("hide");
    }else if (gameStatus == "posttest1"){
        buttonPlaceHolder.classList.add("hide");
        correctAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/E3.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "This email is an email from Lionbridge and the URL and link in it are the property of the company concerned.";
        bubbleNext.classList.remove("hide");
        bubbleNext.innerHTML = "Next Question";
        postTestScore += 1;
        stopcount();
        console.log("Posttest score: " + postTestScore);
    }else if (gameStatus == "posttest2"){
        buttonPlaceHolder.classList.add("hide");
        wrongAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/C1.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "It is certain that this email is a phishing email. Pay close attention to the used email address. This is why phishing is so dangerous, phishers can easily find out which email provider that You use.";
        bubbleNext.classList.remove("hide");
        stopcount();
    }else if (gameStatus == "posttest3"){
        buttonPlaceHolder.classList.add("hide");
        wrongAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/C3.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "This email is a phishing email, although it uses messages from an existing email that is very similar. Stay alert!";
        bubbleNext.classList.remove("hide");
        stopcount();
    }else if (gameStatus == "posttest4"){
        buttonPlaceHolder.classList.add("hide");
        correctAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/E1.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "The URL and email contained in the email are the original property of Google. The email is a notification email from Google.";
        bubbleNext.classList.remove("hide");
        postTestScore += 1;
        stopcount();
        console.log("Posttest score: " + postTestScore);
    }else if (gameStatus == "posttest5"){
        buttonPlaceHolder.classList.add("hide");
        wrongAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/C2.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "The URL and email address used by the sender is a fake URL and email. Always pay close attention to every detail.";
        bubbleNext.innerHTML = "Show Result";
        bubbleNext.classList.remove("hide");
        stopcount();
    }
})

phishbutton.addEventListener("click", function(){
    if (gameStatus == "pretest1"){
        buttonPlaceHolder.classList.add("hide");
        correctAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/E3.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "As I explained earlier, in general, your business partner will not discuss work issues using his personal email. Always be vigilant and avoid downloading the attachment file that is attached in the email.";
        pretestScore += 1;
        bubbleNext.classList.remove("hide");
    }else if (gameStatus == "pretest2"){
        buttonPlaceHolder.classList.add("hide");
        correctAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/E2.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "If you pay close attention, the link and button in the email will direct you to the 'http://drive-google.com' page. Where that page is not Google's official page, which it should be 'https://www.drive.google'.com'";
        pretestScore += 1;
        bubbleNext.classList.remove("hide");
    }else if (gameStatus == "pretest3"){
        buttonPlaceHolder.classList.add("hide");
        correctAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/E1.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "The URL and email address in the email do not belong to the Outlook, therefore it can be classified that the email is a phishing email. Stay alert!";
        pretestScore += 1;
        bubbleNext.classList.remove("hide");
    }else if(gameStatus == "pretest4"){
        buttonPlaceHolder.classList.add("hide");
        wrongAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/C1.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "The email is the original email that eBay sent to the seller in 2016. If you take a look carefully, both the URL and the link are owned by eBay.com. In addition, direct greeting by using your name at the beginning of a sentence is usually not done by phishers.";
        bubbleNext.classList.remove("hide");
    }else if (gameStatus == "pretest5"){
        buttonPlaceHolder.classList.add("hide");
        correctAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/E2.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "If you pay attention to the sender's email,  the link used by the sender is a fake link and it does not belong to paypal. This email is taken from the paypal-community.com site.";
        pretestScore += 1;
        bubbleNext.innerHTML = "Show Result";
        bubbleNext.classList.remove("hide");
    }else if (gameStatus == "posttest1"){
        buttonPlaceHolder.classList.add("hide");
        wrongAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/C2.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "This email is an email from Lionbridge and the URL and link in it are the property of the company concerned.";
        bubbleNext.innerHTML = "Next Question";
        bubbleNext.classList.remove("hide");
        stopcount();
    }else if (gameStatus == "posttest2"){
        buttonPlaceHolder.classList.add("hide");
        correctAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/E2.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "It is certain that this email is a phishing email. Pay close attention to the used email address. This is why phishing is so dangerous, phishers can easily find out which email provider that You use.";
        postTestScore += 1;
        console.log("Posttest score: " + postTestScore);
        bubbleNext.classList.remove("hide");
        stopcount();
    }else if (gameStatus == "posttest3"){
        buttonPlaceHolder.classList.add("hide");
        correctAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/E1.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "This email is a phishing email, although it uses messages from an existing email that is very similar. Stay alert!";
        postTestScore += 1;
        console.log("Posttest score: " + postTestScore);
        bubbleNext.classList.remove("hide");
        stopcount();
    }else if (gameStatus == "posttest4"){
        buttonPlaceHolder.classList.add("hide");
        wrongAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/C1.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "The URL and email contained in the email are the original property of Google. The email is a notification email from Google.";
        bubbleNext.classList.remove("hide");
        stopcount();
    }else if (gameStatus == "posttest5"){
        buttonPlaceHolder.classList.add("hide");
        correctAnswer.classList.remove("hide");
        raavabottomright.src="img/Half_Body/E3.png";
        raavaBaloon.style.display = "flex";
        raavaBaloon.innerHTML = "The URL and email address used by the sender is a fake URL and email. Always pay close attention to every detail.";
        postTestScore += 1;
        console.log("Posttest score: " + postTestScore);
        bubbleNext.innerHTML = "Show Result";
        bubbleNext.classList.remove("hide");
        stopcount();
    }
})

//Posttest start
const proceedPostTest = document.getElementById("proceedposttest");

const tryAgain = document.getElementById("tryAgain");

const closeGame = document.getElementById("closeGame");

let postTestScore = 0;

proceedPostTest.addEventListener("click", function(){
    raavabottomright.src = "img/Half_Body/F1.png";
    raavabottomright.style.height = "255";
    pretestEnd.classList.add("hide");
    line1.classList.remove("hide");
    line2.classList.remove("hide");
    question.classList.remove("hide");
    questionPlaceholder5.classList.add("hide");
    buttonPlaceHolder.classList.remove("hide");
    titleMessage.innerHTML = "Post-Test 1/5";
    postTest1.classList.remove("hide");
    senderIcon.style.backgroundColor = "#b00230";
    senderIcon.innerHTML = preTestQ[5].senderInitial;
    line1.innerHTML = preTestQ[5].subject;
    senderNames.innerHTML = preTestQ[5].senderName + " &lt;"+ preTestQ[5].senderEmail + "&gt;";
    detail1.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp"+ preTestQ[5].senderName +" &lt;"+ preTestQ[5].senderEmail+"&gt;";
    detail2.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + userEmail.toLowerCase();
    detail3.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +preTestQ[5].dateTime;
    detail4.innerHTML = "&nbsp;" + preTestQ[5].subject;
    gameStatus = "posttest1";
    console.log(gameStatus);
    countdown1.style.display = "block";
    timerTitle.innerHTML="TIMER";
    startcount();
})

tryAgain.addEventListener("click", function(){
    window.location.reload();
})

closeGame.addEventListener("click", function(){
    window.close();
})

//********************** TIMER ***************************
const countdown1 = document.getElementById("countdowntimer1");
const countdownElement1 = document.getElementById("test1");

//countdown
let x = setInterval(runCountdown1,1000);
var timer = 30;
function runCountdown1() {
    countdownElement1.innerHTML = timer;
    timer--;
     if (timer < 0){
        clearInterval(x);
        if(gameStatus == "posttest1"){
            phishbutton.click();
        }else if(gameStatus == "posttest2"){
            legitbutton.click();
        }else if(gameStatus == "posttest3"){
            legitbutton.click();
        }else if(gameStatus == "posttest4"){
            phishbutton.click();
        }else if(gameStatus == "posttest5"){
            legitbutton.click();
        }
     } 
}

function startcount(){
    timer = 30;
    x=setInterval(runCountdown1,1000);
}

function stopcount(){
    clearInterval(x);
}

const timerTitle = document.querySelector("body .container .countdown-timer .timer");


stopcount();

function detectMob1() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

function detectMob2() {
    return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) );
}

(function() {      
    let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    
    let detectmob2 = detectMob2();
    let detectmob1 = detectMob1();
    
    if (isMobile || detectmob1 || detectmob2) {
        container.style.display = "none";
        lower.style.display = "block";
        timerTitle.style.display = "none";
    }
 });
