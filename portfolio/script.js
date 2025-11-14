var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
});

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y:"20",
        opacity:0,
        duration:2,
        ease:Expo.easeInOut

    })
      .to(".boundingelem",{
        y:"0",
        ease: Expo.easeInOut,
        delay:-1,
        duration:2,
        stagger:.2,
        
      })
      .from(".herofooter",{
        y:"-10",
        opacity:0,
        duration:1.5,
        delay:-1,
        ease: Expo.easeInOut,
      })
}

var lastx=0;
var lasty=0;

function skewEffect(){
  //defining default skew value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  

  window.addEventListener("mousemove",function(dets){
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.7, 1.3, dets.clientX-xprev);
    yscale = gsap.utils.clamp(0.7, 1.3, dets.clientY-yprev);
    
    xprev=dets.clientX;
    yprev=dets.clientY;

    lastx = dets.clientX;
    lasty = dets.clientY;
    // mouseFollower(xscale,yscale);
    updateCircle(xscale, yscale);

    timeout = setTimeout(function(){
      updateCircle(1, 1);
      
    },100);
    
  })
}

function updateCircle(xscale, yscale) {
  document.querySelector("#minicircle").style.transform =
    `translate(${lastx - 5}px, ${lasty - 5}px) scale(${xscale}, ${yscale})`;
}

// function mouseFollower(xscale,yscale){
//     window.addEventListener("mousemove", function(dets){
//         document.querySelector("#minicircle").style.transform = `translate(${dets.clientX-5}px,${dets.clientY-5}px) scale(${xscale},${yscale})`
//     });
// };


//animations on the projects



document.querySelectorAll(".elem").forEach((elem)=>{

  var xini = 0; //this is the initial value
  var diffrotate = 0; //I'll use this diff in rotate property

  elem.addEventListener("mouseleave",function(dets){
    gsap.to(elem.querySelector("img"),{
      opacity: 0,
      ease: Power3,
      duration:0.5,
    })
  });

  elem.addEventListener("mousemove",function(dets){
    var diff = (dets.clientY - elem.getBoundingClientRect().top);

    diffrotate = dets.clientX-xini;
    xini = dets.clientX; //resetting the value of x initial 

    gsap.to(elem.querySelector("img"),{
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20,20,diffrotate),
    })
  });
});

// mouseFollower()

firstPageAnim();
skewEffect();


