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

    // NarrowItDownController.$inject = ['MenuSearchService'];
    // function NarrowItDownController(menuSearchService) {
    //   var narrow = this;
    //   var searchTerm="";
        
    //   narrow.items = menuSearchService.getItems();

    //   narrow.narrowItDown = function () {
    //     menuSearchService.getMatchedMenuItems1(narrow.searchTerm).then(function(response) {
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //       })    
    //     };

    //     narrow.onRemove = function (itemIndex) {
    //       menuSearchService.removeItem(itemIndex);
    //     };
    // }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(menuSearchService) {
      var narrow = this;
      var searchTerm="";
        
      narrow.items = menuSearchService.getItems();

      narrow.narrowItDown = function () {
       narrow.found = menuSearchService.getMatchedMenuItems1(narrow.searchTerm);
       console.log(narrow.found);
      }       

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

        service.getMatchedMenuItems1 = function (searchTerm) {
          var promise = service.retrieveAllMenuItems();
          var matches = [];

          promise.then(function (response) {
            //console.log(response.data);
            var i;
            for( i in response.data.menu_items){
              if(response.data.menu_items[i].description.includes(searchTerm)){
                matches.push( { short_name:response.data.menu_items[i].short_name, 
                              name: response.data.menu_items[i].name, 
                              description: response.data.menu_items[i].description  });
                }
              }
              console.log(matches);
            })
          .catch(function (error) {
            console.log(error);
          })
        };
     
        service.retrieveAllMenuItems = function (searchTerm) {
          return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
          });
        };

    }
    
    })();
    