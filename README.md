# **OnScroll Animation**

[![Build Status](https://travis-ci.com/johnsonfash/scroll-animation.svg?branch=master)](https://travis-ci.com/johnsonfash/scroll-animation) ![GitHub package.json version](https://img.shields.io/github/package-json/v/johnsonfash/scroll-animation)

![Twitter Follow](https://img.shields.io/twitter/follow/iamJohnsonFash?style=social)

Simple javascript library for animation when element(s) are in view while scrolling the browser.

* * *

## 🚀 **[Demo](https://johnsonfash.github.io/onscroll-animation/website.html)**

- [Custom website build](https://johnsonfash.github.io/onscroll-animation/website.html)
- [3D box animation](https://johnsonfash.github.io/onscroll-animation/3d-box.html)
- [Article Slides](https://johnsonfash.github.io/onscroll-animation/articles.html)

# ⚙ **Installation**

### **Option A.**

**NPM installation**

```html
npm install onscroll-animation --save
```

**Import:**

```javascript
import { Animation } from "onscroll-animation";

const animate = new Animation({
  ...
});
```

### **Option B.**

**Use CDN - load directly from jsDelivr CDN**

```html
<script src="https://cdn.jsdelivr.net/npm/onscroll-animation/dist/animate.bundle.min.js"></script>

var animate = new Animation({
  ...
});
```

# **Use**

```javascript
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
```

# **Explanation**

### **Animation class**

**`Animation({....})`** accept only an object **`{...}`**. This object contains css selectors like **`".grid10"`**, **`"section.two img, section.four img"`** etc.

Basically, this object properties can be any css selector, which a **`document.querySelector()`** method accepts.

The value for the **CSS Selector** i.e **`".grid4"`** must be an object which holds various **properties** and **values** for animation to work.

## **Properties**

**1\. `**parameters:[...]**`  or `parameters: {...}` ;**

This define **`@keyframes`** property for each element i.e `parameters: [...]` or `parameters: {...)` can be an array containing strings of regular css or object containing its javascript equivalent like the example below:

**run**

`run` can be omitted or included. This lets you determine if animation runs `once` or continous anytime an animated element is in view.

**pixelCorrection**

`pixel-correction` or `pixelCorrection` use to make correction (in pixel) to when animation starts for an element. i.e `100px` means scroll `100px` downward before animation starts for an element in viewport, and `-100px` the opposite.

```javascript
parameters: [
  "animation-duration: 1s",
  "animation-delay: 2s",
  "animation-fill-mode: forwards",
  "animation-time-function: ease-in",
  "pixel-correction: -200px",  // makes correction to how far down or up to go before element in view animates
  "run: once",   //can be ommited. default is to run everytime element is in view
    ..........
  ]
  
  or using object
  
  parameters: {
  animationDuration: "1s",
  animationDelay: "2s",
  animationFillMode: "forwards",
  animationTimeFunction: "ease-in",
  pixelCorrection: "-200px",
  run: "once",
    ..........
  ]
```

## NOTE:

There is non shortcut like **`"animation: drop 1s forwards"`** for now. Please specifically list out your @keyframes by name and function like in the example above.

Properties of a selector i.e **`parameters`**, `**from**`, **`to`**, **`0%`**, `**75%**` and more can both be an array, containing string equivalent of your regular css property or an object containing its equivalent in javascript. i.e **"max-width"** is **maxWidth** when working with objects.

**2\. `from: [...]` or `from:{...}`**

Similar to css property `from {.....}` used in `@keyframe`. i.e `from: ["width: 0px","height:20px"....]`

**3\. `to: [...]` or `to: {....}`**

Similar to css property `to: {.....}` used in `@keyframe` after defining `from {...}` i.e `to: {width: "100%",height: "200px"}`

**4\. `0: [...], 50: [...], 100:{.....}`**

This is similar to using percentage in `@keyframes`, only difference is not including the `%` sign i.e

```javascript
const animation = Animation({
  "#imag1": {
    parameters: [.....],
    0: ["width: 20px".....],
    30: [......],
    80: [.....]
  },
  ..........
});
animation.init();
```

# **Using custom css**

Without defining animation @keyframes in javascript, custom css can be used with each element by including a `class` that defines the `@keyframe` in your stylesheet i.e

```html
<body>
  <img alt="ball" scr="./asset/ball.jpg" class="image1"/>
</body>

<style>
  .move {
    animation: ballmove 1s forwards;
  }
  @keyframes ballmove{
    from {
      transform: -100px;
    }
    to {
      transform: 300px;
    }
  }
</style>

<script>
const animation  = new Animation({
  ".image1": {
    css: "move"  // adds custom css class only
  },
  "img": {
    css: "bounce"
  }
});
animation.init();
</script>
```

## **Animation.defaultParams()**

The Animation method `defaultParams()` defines a default paramter for each selector. Meaning you can ommit the parameters property for every element if they are all thesame i.e

```javascript
const animation = new Animation({
  ".grid1, .grid2": {
    from: [....],
    to: [....]
  },
  ".grid4": {
    0: [...],
    50: [...]
  }
  ........
});
animation.defaultParams(["animation-duration: 1s", "animation-fill-mode: forwards"]); // or animation.defaultParams({animationDuration: "2s".......});
animation.init();
```

You can also **ovaride** the `defaultParams()` method for an element by specifying its own `parameters` i.e

```javascript
const animation = new Animation({
  ".grid1, .grid2": {
    from: [....],
    to: [....]
  },
  ".grid4": {
    parameters: [....]  // override defaultParams
    0: [...],
    50: [...]
  }
  ........
});
animation.defaultParams(["animation-duration: 1s", "animation-fill-mode: forwards"]); // or animation.defaultParams({animationDuration: "2s".......});
animation.init();
```

## **Animation.init()**

The `init()` method initialize the animation to run after the page loads.

# More Example:

```javascrist
const animation = new Animation({
        ".one": {
          parameters: [
            "animation-duration: 1s",
            "pixel-correction: -100px",
            "animation-delay: .5s",
            "animation-time-function: linear"
          ],
          from: [
            "transform: translateY(-1000px)"
          ],
          to: [
            "transform: translateY(0px)"
          ]
        },
        ".two": {
          parameters: [
            "animation-duration: 1s",
            "pixel-correction: -300px"
          ],
          from: {
            transform: "rotate(0deg)"
          },
          to: [
            "transform: rotate(360deg)"
          ]
        },
        "article.three": {
          parameters: {
            animationDuration: "1s",
            animationFillMode: "forwards",
            animationTimingFunction: "ease-in"
          },
          0: [
            "transform: translateX(-1000px)",
          ],
          50: [
            "transform: translateX(1000px)",
            "background-color: red"
          ],
          100: [
            "transform: translateX(0px)"
          ]
        },
        ".four": {
          parameters: [
            "animation-duration: 1s"
          ],
          from: [
            "transform: skewX(20deg) translateX(-1000px)"
          ],
          to: [
            "transform: skewX(0deg) translateX(0px)"
          ]
        },
        ".five": {
          parameters: [
            "animation-duration: 1s"
          ],
          from: [
            "position: relative",
            "right: -1000px",
            "transform: skewX(-20deg)"
          ],
          to: [
            "position: relative",
            "right: 0px",
            "transform: skewX(0deg)"
          ]
        },
        ".six": {
          parameters: [
            "animation-duration: 2s",
            "animation-fill-mode: forwards",
          ],
          0: [
            "transform: translateY(0)"
          ],
          75: [
            "transform: translateY(50vh)"
          ]
        },
        ".seven": {
          parameters: [
            "animation-duration: 1.5s"
          ],
          from: [
          "transform: rotateY(0deg)"
          ],
          to: [
          "transform: rotateY(360deg)"
          ]
        }
      });
      animation.init();
```