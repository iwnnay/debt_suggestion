var Debt = function(options) {
  if (options.name === undefined) {
    throw "Debt cannot be instatiated without a name"
  }

  this.options = Object.assign(Debt.defaults, options);
};

Debt.defaults = {
  amount: 0,
  name: null, //This needs to be required
  apr: 29.99,
  min: 15
};

Debt.prototype.opts = function() {
  return this.options;
};
