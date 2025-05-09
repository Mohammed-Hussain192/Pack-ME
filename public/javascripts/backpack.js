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


    var loader= document.querySelector(".loader")
window.addEventListener("load",vanish)
function vanish(){
    loader.classList.add("disapper")
}


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