import ErrorHandler from '../../models/ErrorHandler';

class ThemeAController {
  defaultMethod() {
    throw new ErrorHandler(501, 'Not implemented method');
  }
  initMethod() {
    return {
      text: `You've reached the ${this.constructor.name} default method`
    };
  }
}

export = new ThemeAController();