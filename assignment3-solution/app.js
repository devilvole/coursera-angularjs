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
            onRemove: '&'
          }
        };
      
        return ddo;
      }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(menuSearchService) {
      var narrow = this;
      var searchTerm="";
      var found = [];

      narrow.narrowItDown = function () {
        menuSearchService.getMatchedMenuItems(narrow.searchTerm).then(function(response) {
          console.log(response);
          narrow.found = response;
        })
        .catch(function (error) {
            console.log(error);
          })    
        };

        narrow.onRemove = function (itemIndex) {
          narrow.found.splice(itemIndex, 1);
        };
    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
           var found = [];
          return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
          }).then(function (response) {
            var i;
            for( i in response.data.menu_items){
              if( searchTerm!=="" && response.data.menu_items[i].description.includes(searchTerm)){
                found.push( { short_name:response.data.menu_items[i].short_name, 
                              name: response.data.menu_items[i].name, 
                              description: response.data.menu_items[i].description  });
              }
            }
            return found;
          });
        };
    }
    
    })();
    