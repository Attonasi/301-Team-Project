'use strict';

(function(module) {
  const diseaseController = {};
  diseaseController.index = () => {
    Data.fetchAll();
  };

  module.diseaseController = diseaseController;
})(window);
