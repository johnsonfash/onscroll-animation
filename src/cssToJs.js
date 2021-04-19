const _cssToJs = (cssObj) => {
  try {
    if(typeof cssObj === 'object'){
      if(Array.isArray(cssObj)) {
        if(!cssObj.every(el=> typeof el === "string")) throw "Please check the array(s) in your object. One or more of its values is(are) not string.";
        let jsStyle = {};
        for(let i=0;i<cssObj.length;i++){
          let css = cssObj[i].split(":").map(s=>s.trim());
          if(css.length !== 2) throw "Invalid css string supplied to an array.";
          let cssToJs = (str) => str.replace(/\W+\w/g, (match)=> match.slice(-1).toUpperCase() );
          jsStyle[cssToJs(css[0])] = css[1];
        }
        cssObj = Object.assign({},jsStyle);
      }
      if(cssObj.hasOwnProperty("pixelCorrection")){
        cssObj.pixelCorrection = cssObj.pixelCorrection.replace(/[^\-0-9]/g,'')*1;
      }
      if(cssObj.hasOwnProperty("animationDuration") && isNaN(cssObj.animationDuration)){
        cssObj.animationDuration = cssObj.animationDuration.toString().slice(0,-1)*1000;
      }
      if(cssObj.hasOwnProperty("animationDelay")){
        cssObj.animationDelay = cssObj.animationDelay.slice(0,-1)*1000;
      }
      return cssObj;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = _cssToJs;