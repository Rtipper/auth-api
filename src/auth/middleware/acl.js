'use strict';

module.exports = (capability) => {

  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capability)) {
        next();
      } else {
        next('Authentication Failed');
      }
    } catch (e) {
      next('Invalid Login');
    }

  }

}