(function () {
    'use strict';
    
    angular.module('MenuApp')
    .controller('ItemsController', ItemsController);
    
    ItemsController.$inject = ['MenuDataService', 'items'];
    function ItemsController(MenuDataService, items) {
      var menuItems = this;
      menuItems.items = items.data.menu_items;

      //console.log(menuItems.items);
    }
    
    })();