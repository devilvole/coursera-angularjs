(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItemsDirective);


    function FoundItemsDirective() {
        var ddo = {
          templateUrl: 'foundItems.html',
          scope: {
            list: '<myList',
            title: '@',
            onRemove: '&'
          }
        };
      
        return ddo;
      }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(menuSearchService) {
      var narrow = this;
      var searchTerm="";
        
      narrow.items = menuSearchService.getItems();
      narrow.title = "Narrow down this list:";
      narrow.narrowItDown = function () {
        menuSearchService.getMatchedMenuItems(narrow.searchTerm).then(function(response) {
        })
        .catch(function (error) {
            console.log(error);
          })    
        };

        narrow.onRemove = function (itemIndex) {
          menuSearchService.removeItem(itemIndex);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var found = [];

        service.removeItem = function (itemIndex) {
          found.splice(itemIndex, 1);
        };
      

        service.getMatchedMenuItems = function (searchTerm) {
          service.found = [];
          return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
          }).then(function (response) {
            var i;
            for( i in response.data.menu_items){
              if(response.data.menu_items[i].description.includes(searchTerm)){
                found.push( { short_name:response.data.menu_items[i].short_name, 
                              name: response.data.menu_items[i].name, 
                              description: response.data.menu_items[i].description  });
              }
            }
            return found;
          });
        };

        service.getItems = function () {
          return found;
        };
    }
    
    })();
    