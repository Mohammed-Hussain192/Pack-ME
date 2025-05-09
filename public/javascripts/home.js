window.history.forward();
function noBack()
    {
        window.history.forward();
    }

var tl = gsap.timeline()
tl.from(".box", 
{  
        x: 900, 
        opacity:0,
        duration: 1,
        
      
        stagger:0.1
});
gsap.from(".pack",{
    opacity:0,
    x:-1000,
    duration:1.5,
    delay:1
})

tl.from(".first", 
    {  
         
        opacity:0,
        duration: 0.5,
        x:-400,
        perspective: "1000px",
        transform:"rotateX(40deg)",
    
        stagger:0.5
        
 });
 tl.from(".sec", 
    {  
         
        opacity:0,
        x:400,
        duration: 0.5,
        
    
        stagger:0.5
        
 });


gsap.from(".nav-3 img", 
        {  
            height:0,
            width:0, 
            opacity:0,
            delay:1,
            duration: 0.5,
            
        
            stagger:0.5
            
});

gsap.from(".models div ",{
    y:-100,
    opacity:0,
    duration:1,
    scrollTrigger:{
        trigger: '.models ',
         markers:false, 
        start: "top 75%", 
        end: "top 5%", 
        scrub: 1,
        stagger:0.5,
    }
})

gsap.from(".circle img ",{
    
    opacity:0,
    y:60,
   
    duration:2,
    scrollTrigger:{
        trigger: '.circle img ',
         markers:false, 
        start: "top 55%", 
        end: "top 15%", 
        scrub: 1,
        stagger:0.5,
    }
})


gsap.from(".in .one ",{
    scale:0.8,
   
    opacity:0,
    duration:3,
    scrollTrigger:{
        trigger: '.in .one ',
         markers:false, 
        start: "top 55%", 
        end: "top 15%", 
        scrub: 1,
        stagger:0.5,
    }
})
gsap.to(".im",{
    
    
    y:1000,
    zIndex: "1000",
    
  

    
    
    

    scrollTrigger:{
        trigger: '.im',
         markers:false, 
        start: "top 5%", 
        end: "top -100%", 
        scrub: 1,
        stagger:0.5,
    }
    
})

gsap.to(".st",{
    x:-1000,
    fontSize:"1000px",
    

    scrollTrigger:{
        trigger: '.st',
         markers:false, 
        start: "top 10%", 
        end: "top -100%", 
        scrub: 1,
        stagger:0.5,
    }
    
})

gsap.to(".rd",{
    x:1000,
    fontsize:"1000px",
    

    scrollTrigger:{
        trigger: '.rd',
         markers:false, 
        start: "top 10%", 
        end: "top -100%", 
        scrub: 1,
        stagger:0.5,
    }
    
})

var suc = document.querySelector(".suc")
gsap.to(".suc",{
    y:-1000,
    duration:0.3,
    display:"none",
    
   
    delay:3
})
gsap.from(".suc",{
    y:-1000,
    duration:0.3,
    height:0,
    
   
    delay:1
})

gsap.to(" .moment h1",{
    transform:"translate(-100%)",
    
    

    scrollTrigger:{
        trigger: '.done',
        scoller:"body",
        markers:false, 
        start: "top 0%", 
        end: "top -100%", 
        scrub:5,
        pin:true, 
       
       
       
    }
    
})
var loader= document.querySelector(".loader")
window.addEventListener("load",vanish)
function vanish(){
    loader.classList.add("disapper")
}

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



let menu = document.querySelector(".menu")
let hidden = document.querySelector(".hidden")
menu.addEventListener("click",()=>{
    
    // gsap.from(hidden,{
    //     opacity:0,
    //     duration:1,
    //     y:-300,
    //     display:"none"
    // })
    hidden.style.display="block"

})
let close = document.querySelector(".close")
// let hidden = document.querySelector(".hidden")
close.addEventListener("click",()=>{
    hidden.style.display="none"
    // gsap.to(hidden,{
    //     opacity:0,
    //     duration:1,
    //     y:-300,
    //     display:"none"
    // })
    
})