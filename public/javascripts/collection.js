var tl = gsap.timeline()
tl.from(".box", 
{  
        x: 900, 
        opacity:0,
        duration: 1,
        
        
        stagger:0.1
});
var loader= document.querySelector(".loader")
window.addEventListener("load",vanish)
function vanish(){
    loader.classList.add("disapper")
}
gsap.from(".pack",{
    opacity:0,
    x:-1000,
    duration:1.5,
    delay:1
})
gsap.from(".nav-3 img", 
    {  
        height:0,
        width:0, 
        opacity:0,
        delay:1,
        duration: 0.5,
        
    
        stagger:0.5
        
});

 gsap.from("#under1 #item1 ",{
   
   
   
    opacity:0,
    
    height:0,
    
    duration:3,
    scrollTrigger:{
        trigger: '#under1 #item1 ',
         markers:false, 
        start: "top 50%", 
        end: "top 49%", 
        scrub: 1,
        stagger:0.5,
    }
})
gsap.from("#under2 #item2 ",{
   

  
    height:0,
   
    opacity:0,
    duration:1,
  
    scrollTrigger:{
        trigger: '#under2 #item2 ',
         markers:false, 
         start: "top 50%", 
         end: "top 49%", 
        scrub: 1,
        stagger:0.5,
    }
})
gsap.from("#under3 #item3 ",{
   
   
   
    height:0,
   
    opacity:0,
    duration:3,
  
    scrollTrigger:{
        trigger: '#under3 #item3 ',
         markers:false, 
         start: "top 50%", 
         end: "top 49%",
        scrub: 1,
        stagger:0.5,
    }
})
gsap.from("#under4 #item4 ",{
   
    

    height:0,
   
    opacity:0,
    duration:3,
  
    scrollTrigger:{
        trigger: '#under4 #item4 ',
         markers:false, 
         start: "top 50%", 
         end: "top 49%",
        scrub: 1,
        stagger:0.5,
    }
})


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

gsap.to(".card1 ",{
   
   x:-2000,
  
   display:"none",
    
   
    scrollTrigger:{
        trigger: '.card1',
         markers:false, 
        start: "top 1%", 
        end: "top -5%", 
        scrub: 1,
        
    }
})
gsap.to(".card2 ",{
   
    y:-2000,
   
    display:"none",
     
    
     scrollTrigger:{
         trigger: '.card2',
          markers:false, 
         start: "top 1%", 
         end: "top -5%", 
         scrub: 1,
       
     }
 })
 
 gsap.to(".card3 ",{
   
    y:2000,
    
    display:"none",
     
    
     scrollTrigger:{
         trigger: '.card3',
          markers:false, 
         start: "top 1%", 
         end: "top -5%", 
         scrub: 1,
   
     }
 })

 gsap.to(".card4 ",{
   
    x:2000,
    
    display:"none",
     
    
     scrollTrigger:{
         trigger: '.card4',
          markers:false, 
         start: "top 1%", 
         end: "top -5%", 
         scrub: 1,
        
     }
 })
 
