(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var list = this;

    list.items = ShoppingListCheckOffService.getToBuyItems();

    list.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var list = this;

    list.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // dear old Yaakov seems to have a very poor diet - I'll try to improve it!
    var toBuyItems = 
      [{name:'lettuce', quantity:7},
      {name:'radishes', quantity:311},
      {name:'tomatoes', quantity:34},
      {name:'jar of pickles', quantity:1},
      {name:'wholemeal bread', quantity:1},];

    var boughtItems = [];

    service.addToBuyItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      toBuyItems.push(item);
    };

    // docs say that splice should return the removed element
    // service.buyItem = function (itemIndex) {
    //   boughtItems.push( toBuyItems.splice(itemIndex, 1));
    // };

    service.buyItem = function (itemIndex) {
      boughtItems.push( toBuyItems[itemIndex]);
      toBuyItems.splice(itemIndex, 1);
    };

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };
  }

})();
