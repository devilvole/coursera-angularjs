(function () {
    'use strict';
    
    angular.module('MenuApp')
    .controller('CategoriesController', CategoriesController);
    
    
    CategoriesController.$inject = ['MenuDataService', 'items'];
    function CategoriesController(MenuDataService, items) {
      var mainList = this;
      mainList.items = items.data;

      console.log(items);
    }
    
    })();