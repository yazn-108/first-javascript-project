"use strict";
// function for all active classes
function onclickActive(ele){
    ele.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ele.target.classList.add("active");
}
// function for all active classes
// Add Settings for user
let settingsIcon = document.querySelector(".settings-icon");
settingsIcon.addEventListener("click",(e) => {
    e.stopPropagation()
    let icon = document.querySelector(".settings-icon i");
    icon.classList.toggle("fa-spin");
    let settingsBox = document.querySelector(".settings-box");
    settingsBox.classList.toggle("open-settings");
    let closeFun = function(close){
        if(!settingsBox.contains(close.target)){
            icon.classList.remove("fa-spin");
            settingsBox.classList.remove("open-settings");
        };
    };
document.addEventListener("click",closeFun);
document.addEventListener("scroll",closeFun);
});
// color change
const colorsList = document.querySelectorAll(".colors-list li");
colorsList.forEach(li =>{
    li.addEventListener("click",(ele) =>{
       // تغيير قيمة متغير اللون العام
        // data-color حسب قيمة 
       document.documentElement.style.setProperty("--main-color",ele.target.dataset.color);
       // localStorage في متغير data-color تخزين قيمة    
       localStorage.setItem("page_theme",ele.target.dataset.color);
       // .active الرجوع إلى العنصر الاب ثم إلى جميع العناصر التي تحتوي على
       onclickActive(ele)
    });
});
let pageTheme = localStorage.getItem("page_theme")
if(pageTheme !== null){
    // إلى متغير اللون العام localStorage اضافة قيمة
    document.documentElement.style.setProperty("--main-color", pageTheme);
    // يتم ازالة الكلاس localStorage في حال وجود قيمة في 
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        // localStorage ثم يضاف إلى العنصر الذي قيمته تساوي قيمة 
        if(element.dataset.color === pageTheme){
        element.classList.add("active");
        }
       });
     
};
// random background
let random = true;
let stopRandom;
let backgroundOption = localStorage.getItem("background_option");
const randomBackground = document.querySelectorAll(".random-background button");
randomBackground.forEach(button =>{
    button.addEventListener("click",(ele) =>{
        onclickActive(ele)
       if(ele.target.dataset.option === "yes"){
        random = true;
        randomImg();
        localStorage.setItem("background_option",true);
       }else{
        random = false;
        clearInterval(stopRandom);
        localStorage.setItem("background_option",false);
       };

    });
});
if(backgroundOption !== null){
    if(backgroundOption === 'true'){
        random = true;
    }else{
        random = false;
    };
    randomBackground.forEach((element)=>{element.classList.remove("active");});
    if(backgroundOption === 'true'){
        document.querySelector(".random-background .yes").classList.add("active");
    }else{
        document.querySelector(".random-background .no").classList.add("active");
    };
}
let landingPage = document.querySelector(".landing-page");
let landingArray = ["1.png", "2.png", "3.jpg", "4.jpg", "5.jpg"];
function randomImg(){
    if(random === true) {
        stopRandom = setInterval(() => {
            // تم اضافة المتغير داخل الفنكشن حتى لا يتم طباعة رقم واحد فقط
            let randomNumber = Math.floor(Math.random() * landingArray.length)
            landingPage.style.backgroundImage = `url('imgs/${landingArray[randomNumber]}')`
        },1000);
    };  
};
randomImg();
// Our Skills
let ourSkills = document.querySelector(".skills");
window.onscroll = () =>{
    // المساحة التي فوق القسم
    let offsetTop = ourSkills.offsetTop;
    // console.log(offsetTop);
    // ارتفاع القسم بالبكسل (يتم حساب جميع المكونات المحيطة)
    let offsetHeight = ourSkills.offsetHeight;
    // console.log(offsetHeight);
    // ارتفاع الصفحة المعروضة
     let innerHeight = window.innerHeight;
    //  console.log(innerHeight);
     // ارتفاع السكرول بالبكسل
     let scrollY = window.scrollY;
    // console.log(scrollY);
    if(scrollY > (offsetTop + offsetHeight - innerHeight)){
        let allSkills = document.querySelectorAll(".skills .skill-progress span");
        allSkills.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        });
    };
};
let ourGallery = document.querySelectorAll(".our-gallery img");
ourGallery.forEach(img => {
    img.addEventListener("click", (ele) => {
        let overLay = document.createElement("div");
        overLay.className = "overlay";
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        if(img.alt !== ""){
            let imgTitle = document.createElement("h3");
            imgTitle.textContent = img.alt;
            popupBox.appendChild(imgTitle);
        }else{
            popupBox.style.overflow = "hidden";
        }
        let image = document.createElement("img");
        image.src = img.src;
        popupBox.appendChild(image);
        let closeTag = document.createElement("p");
        closeTag.className = "close-button";
        closeTag.textContent = "x";
        overLay.appendChild(closeTag);
        overLay.appendChild(popupBox)
        document.body.appendChild(overLay);
    });

});
document.addEventListener("click", (e) => {
    if (e.target.className == 'close-button'){
        e.target.parentElement.remove();};
});
// استخدام نفس الكود لاكثر من عنصر عبر استخدام الفنكشن
function goToTheSection(section){
    section.forEach((link) => {
        link.addEventListener("click",(e) =>{
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
};
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let allLinks = document.querySelectorAll("header button");
goToTheSection(allBullets);
goToTheSection(allLinks);
let bulletsOption = document.querySelectorAll(".bullets-option button");
let bullets = document.querySelector(".nav-bullets");
bulletsOption.forEach(button =>{
    button.addEventListener("click",(ele) =>{
        onclickActive(ele);
        if(button.dataset.option === "yes"){
            bullets.style.display = "block";
            localStorage.setItem("bullets_option","yes");
        }else{
            bullets.style.display = "none";
            localStorage.setItem("bullets_option","no");
        }
    });
});
let bulletsLocalStorage = localStorage.getItem("bullets_option");
if(bulletsLocalStorage !== null){
    bulletsOption.forEach((e) => {e.classList.remove("active");})
    if(bulletsLocalStorage === "yes"){
        bullets.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    }else{
        bullets.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}
let resetLocalStorage = document.querySelector(".settings-container .reset");
resetLocalStorage.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
});
let menuIcon = document.querySelector(".menu-icon");
menuIcon.addEventListener("click", (ele) => {
    ele.stopPropagation()
    menuIcon.classList.toggle("menu");
    let menuFunction = function(e){
        let menu = document.querySelector("header .menu ~ ul");
        if(e.target !== menu){
            menuIcon.classList.remove("menu");
        }
    }
    document.addEventListener("click", menuFunction);
    document.addEventListener("scroll", menuFunction);
})