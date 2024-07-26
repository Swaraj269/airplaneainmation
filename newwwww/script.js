gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,
  smartphone: true,
  multiplier: 1.3,
  firefoxMultiplier: 200,
  tablet: {
    smooth: true
  },
  smartphone: {
    smooth: true
  }
});

gsap.to("body", {
  autoAlpha: 1
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: document.querySelector("main").style.transform
    ? "transform"
    : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

var tl = gsap.timeline();

tl.from(".initial3dots",{
  y: 10,
  duration: 0.3,
  stagger: 0.2,
  ease: 'linear',
  repeat: 2,
  onComplete: ()=>{
    gsap.to(".firstdot",{
      x: "1.1vw",
      duration: 0.2,
      ease: 'linear',
      onComplete: ()=>{
        gsap.to(".firstdot",{
          opacity: 0,
        })
      }
    })
    gsap.to(".lastdot",{
      x: "-1.1vw",
      duration: 0.2,
      ease: 'linear',
      onComplete: ()=>{
        gsap.to(".lastdot",{
          opacity: 0,
        })
      }
    })
  }
});

tl.to(".box",{
  transform: "rotate(-45deg)",
  onComplete: ()=>{
    gsap.to(".firstdot",{
      x: '-0.1vw',
      opacity: 1,
      duration: 0.3,
      ease: 'linear',
    })
    gsap.to(".lastdot",{
      x: '0.1vw',
      opacity: 1,
      duration: 0.3,
      ease: 'linear',
    })
  }
})
tl.set(".box, .leftwing, .rightwing, .bottomleftwing, .bottomrightwing",{
  gap: 0,
});
tl.to(".airplanedots",{
  opacity: 1,
  duration: 0.4,
  ease: 'linear',
}, 'a');

tl.to(".box, .leftwing, .rightwing, .bottomleftwing, .bottomrightwing",{
  gap: "0.4vw",
  duration: 0.4,
  ease: 'linear',
}, 'a')
