function init(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
init();

var tl = gsap.timeline();

tl.from("#page1-img",{
    scale:0.5,
    duration:1,
    delay:2,
    borderRadius:`20px`
},"first")

tl.from("#page1-img img",{
    scale:1.3,
    duration:1,
    delay:2
},"first")

tl.from("#page1-logo svg",{
    y:-50,
    delay:1,
    opacity:0,
},"first")

tl.from("#nav",{
    y:-50,
    delay:3,
    opacity:0
},"first")

function clutterbaby1(){
    document.querySelectorAll("#text-container h2").forEach(function (elem) {

        var splitedText =elem.textContent.split("");
        var clutter = "";
        splitedText.forEach(function (e) {
          clutter += `<span>${e}</span>`;
        });
        elem.innerHTML = clutter;
      });
      
      
      gsap.to("#text-container h2 span", {
        color: "#e3e3c4",
        stagger: 0.3,
        scrollTrigger: {
          trigger: "#text-container h2 span",
          scroller: "#main",
          start: "top 55%",
          // markers:true,
          end: "top -20%",
          scrub: 2,
        },
      });
      
}
clutterbaby1();
  
  gsap.to("#page2 #svg2,#page2 #svg3",{
    left:'-100vw',
    scrollTrigger:{
      trigger:"#page2 #svg2",
      scroller:"#main",
      // markers:true,
      scrub:2,
    }
  })
  
  
  
function clutterbaby2(){
    document.querySelectorAll("#page3-text h1").forEach(function(dets){
        var page3Clutter = "";
        dets.textContent.split("").forEach(function(elm){
          page3Clutter+=`<span>${elm}</span>`
        })
        dets.innerHTML = page3Clutter
      })
      
      gsap.to("#page3-text h1 span",{
        color:"#434B34",
        stagger:.3,
        scrollTrigger:{
          trigger:"#page3",
          scroller:"#main",
        //   markers:true,
          start:"top 55%",
          end:"top 20%",
          scrub:2,
          
        }
      })
}
clutterbaby2();


var page3_anim = gsap.timeline();


page3_anim.from("#dis-left",{
    y:50,
    opacity:0,
    duration:1,
    stagger:1,
    scrollTrigger:{
        trigger:"#dis-left",
        scroller:"#main",
        markers:true,
        start:"top 80%",
        end:"top 70%",
        scrub:2
    }
})
page3_anim.from("#dis-right",{
    y:50,
    opacity:0,
    duration:1,
    stagger:1,
    scrollTrigger:{
        trigger:"#dis-left",
        scroller:"#main",
        // markers:true,
        start:"top 80%",
        end:"top 70%",
        scrub:2
    }
})

