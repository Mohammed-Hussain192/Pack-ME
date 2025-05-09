gsap.to(".suc",{
    y:-1000,
    duration:0.5,
    
   
    
   
    delay:3
})
gsap.from(".suc",{
    y:-1000,
    duration:0.5,
    
   
    
   
    delay:0.01
})
var loader= document.querySelector(".loader")
window.addEventListener("load",vanish)
function vanish(){
    loader.classList.add("disapper")
}