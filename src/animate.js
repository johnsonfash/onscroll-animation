import _cssToJs from "./cssToJs";
import _error from "./exceptions";

export default class Animation {
  constructor(arg) {
    this.data = _error(arg);
    this.elements = [];
    this.elemParameters = [];
    this.startingMode;
    this.defaultParameter;
    this.typeFace;
    this.getElem();
  }

  defaultParam(obj) {
    this.defaultParameter = obj;
  }

  getElem() {
    for (let i = 0; i < this.data.keys.length; i++) {
      let arrFrm = Array.from(document.querySelectorAll(this.data.keys[i]))
      this.elements.push(arrFrm);
      for (let j = 0; j < arrFrm.length; j++) {
        this.elemParameters.push(this.data.values[i]);
      }
    }
    this.elements = this.elements.flat();
    this.startingMode = Array(this.elements.length).fill(1);

    this.typeFace = {
      animationName: "id",
      animationDuration: "duration",
      animationTimingFunction: "easing",
      animationDelay: "delay",
      animationIterationCount: "iterations",
      animationDirection: "direction",
      animationFillMode: "fill",
      animationPlayState: "animationPlayState",
      pixelCorrection: "pixelCorrection",
      run: "run"
    }
  }

  inView(elem, pixelCorrect) {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollPosition = scrollY + windowHeight;
    const elementPosition = elem.getBoundingClientRect().top + scrollY + elem.clientHeight;
    if (scrollY > elementPosition && scrollY != 0) {
      return false;
    } else if (scrollPosition > (elementPosition + pixelCorrect)) {
      return true;
    }
  }

  handleStyles(object) {
    try {
      if (!object.hasOwnProperty("parameters") && this.defaultParameter == undefined) throw "One of your selector object does not have a (parameters) key.";
      let styleArray = [];
      for (const key in object) {
        if (key == "parameters") continue;
        let cssJs = _cssToJs(object[key]);
        if (key != "from" && key != "to") cssJs.offset = key / 100;
        styleArray.push(cssJs);
      }
      return styleArray;
    } catch (error) {
      console.error(error);
    }
  }

  handleStylesParam(paramObj) {
    paramObj = _cssToJs(paramObj);
    let paramObjVal = Object.values(paramObj);
    let newParamObj = {};
    let otherParam = { pixelCorrection: 0 };
    let idx = 0;
    for (const keys in paramObj) {
      if (keys == 'pixelCorrection' || keys == 'animationPlayState' || keys == 'run') {
        otherParam[keys] = paramObjVal[idx];
      } else {
        newParamObj[this.typeFace[keys]] = paramObjVal[idx];
      }
      idx++;
    }
    return [newParamObj, otherParam];
  }

  animate() {
    for (let p = 0; p < this.elements.length; p++) {
      let el = this.elements[p];
      let elPrm = this.elemParameters[p];

      let cssActive = elPrm.hasOwnProperty("css");
      let animeStyle; let parameter;
      if (cssActive) {
        animeStyle = "css";
        let pCorr = { pixelCorrection: 0 };

        if (elPrm.hasOwnProperty("parameters")) {
          let pObj = _cssToJs(elPrm.parameters);

          if (pObj.hasOwnProperty("pixelCorrection")) pCorr.pixelCorrection = pObj.pixelCorrection;
        }
        parameter = [null, pCorr];
      } else {
        animeStyle = this.handleStyles(elPrm);
        parameter = this.defaultParameter && !elPrm.parameters ? this.handleStylesParam(this.defaultParameter) : this.handleStylesParam(elPrm.parameters);
      }
      if (this.inView(this.elements[p], parameter[1].pixelCorrection)) {

        if (animeStyle !== "css") {

          if (this.startingMode[p] == 1) {
            el.animate(animeStyle, parameter[0]);
            this.startingMode[p] = 0;
          }

          if (parameter[1].hasOwnProperty("animationPlayState")) {
            parameter[1].animationPlayState == "paused" ? el.pause() : el.play();
          }

        } else {
          el.classList.add(elPrm.css);
        }

      } else {
        let mode = 1;
        if (parameter[1].run == "once" && this.startingMode[p] == 0) mode = 0;
        this.startingMode[p] = mode;
        if (animeStyle === 'css') el.classList.remove(elPrm.css);
      }

    }
  }

  init() {
    this.animate();
    window.addEventListener('scroll', () => this.animate());
  }
}