gsap.to(".suc",{
    display:"none",
    y:-1000,
    duration:2,

    
   
    delay:3
})
gsap.from(".suc",{
    y:-1000,
    duration:1,
    height:0,
    
   
    delay:1
})
var loader= document.querySelector(".loader")
window.addEventListener("load",vanish)
function vanish(){
    loader.classList.add("disapper")
}