const _error = (obj) => {
  try {
    if(typeof obj !== "object" || obj === null) throw "Invalid initialization data type of "+ typeof obj + ". Please pass a valid object in the Animator class constructor.";
    const selectors = Object.keys(obj);
    const selectorValues = Object.values(obj);
    if( !selectorValues.every( el => typeof el === "object" && el !== null) ) throw "Invalid data type supplied to one or more of the css selector.";
    return {keys: selectors, values: selectorValues};
  } catch (error) {
    console.error(error);
  }
}

module.exports = _error;