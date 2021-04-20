Scroll Animation
Build Status GitHub package.json version

Twitter Follow

Simple javascript library for animation when element(s) are in view while scrolling the browser.

🚀 Demo
Custom website build
3D box animation
Article Slides
⚙ Installation
Option A.
NPM installation

npm install scroll-animation --save
Import:

import { Animation } from "scroll-animation";

const animate = new Animation({
  ...
});
Option B.
Use CDN - load directly from jsDelivr CDN

<script src="https://cdn.jsdelivr.net/gh/johnsonfash/scroll-animation/dist/animate.bundle.min.js"></script>

var animate = new Animation({
  ...
});
Use
var animate = new Animation({
        ".grid11": {
          parameters: [
            "animation-duration: 0.8s",
            "animation-delay: 1s",
            "animation-fill-mode: forwards"
          ],
          to: ["transform: translateX(-150px)"]
        },
        "section.one .left, section.three .book, section.five .other": {
          from: ["left: -500px"],
          to: { left: "0px" }
        },
        "section.one .right, section.three .complex, section.five .person": {
          from: ["right: -500px"],
          to: ["right: 0px"]
        },
        "section.two": {
          from: ["opacity: 0", "transform: translateY(100px)"],
          to: [ "opacity: 1", "transform: translateY(0px)"]
        },
        ".grid10":{
          parameters: ["animation-duration: 0.8s", "animation-fill-mode: forwards"],
          to: ["transform: translateY(-110px)"]
        }
      });
      
      animate.defaultParam(["animation-duration: .8s", "run: once", "animation-fill-mode: forwards","pixel-correction: -100px", "animation-time-function: ease-out"]);
      animate.init();
Explanation
1. Animation({....}) accepts an object {...}. this object contains contains properties like ".grid10", "section.two img, section.four img".

Basically, this object properties can be any css selector, which a document.querySelector() method accepts.

2. The value for the CSS Selector must be an object which holds various properties and values for animation to work. This properties are explained below

parameters: [...] or parameters: {...} 
This lets you 