gsap.from(".nav a",{
    x:9000,
    opacity:0,
    duration:2,
    stagger:0.5
})
gsap.from(".first h1",{
    delay:3,
    y:-2900,
    fontSize:"10vw",
    opacity:0,
    duration:1,
    stagger:0.5
})
gsap.from(".first p",{
    delay:4,
    height:0,
    opacity:0,
    duration:2,
    
})
gsap.from(".sec",{
    delay:3,
    y:900,
    opacity:0,
    duration:4,
    
})
gsap.from(".btu",{
    delay:5,
    y:9000,
    opacity:0,
    duration:2,
    
})
var main = document.querySelector(".container")

var cursor = document.querySelector(".cursor")
var cursor2 = document.querySelector(".cursor2")
var cursor3 = document.querySelector(".cursor3")
var cursor4 = document.querySelector(".cursor4")
var cursor5 = document.querySelector(".cursor5")
var cursor6 = document.querySelector(".cursor6")
var cursor7 = document.querySelector(".cursor7")

main.addEventListener("mousemove",function(e){
    gsap.to(cursor,{
        x:e.x,
        y:e.y,
        duration:1,
    })
    gsap.to(cursor2,{
        delay:0.1,
        x:e.x,
        y:e.y,
        duration:1,
    })
    gsap.to(cursor3,{
        delay:0.2,
        x:e.x,
        y:e.y,
        duration:1,
    })
    gsap.to(cursor4,{
        delay:0.3,
        x:e.x,
        y:e.y,
        duration:1,
    })
    gsap.to(cursor5,{
        delay:0.4,
        x:e.x,
        y:e.y,
        duration:1,
    })
    gsap.to(cursor6,{
        delay:0.5,
        x:e.x,
        y:e.y,
        duration:1,
    })
    gsap.to(cursor7,{
        delay:0.6,
        x:e.x,
        y:e.y,
        duration:1,
    })
    
  

})


var loader= document.querySelector(".loader")
window.addEventListener("load",vanish)
function vanish(){
    loader.classList.add("disapper")
}