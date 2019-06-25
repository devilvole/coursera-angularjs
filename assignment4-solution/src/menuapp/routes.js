(function () {
    'use strict';
    
    angular.module('MenuApp')
    .config(RoutesConfig);
    
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
    
      // Redirect to home page if no other URL matches
      $urlRouterProvider.otherwise('/');
    
      // *** Set up UI states ***
      $stateProvider
    
      // Home page
      .state('home', {
        url: '/',
        templateUrl: 'src/menuapp/templates/home.template.html'
      })
    
      // Test page
      .state('test', {
        url: '/test',
        templateUrl: 'src/menuapp/templates/test.template.html'
      })
    
      // Test page
      .state('test.testy', {
        url: '/test/testy',
        templateUrl: 'src/menuapp/templates/testy.template.html'
      })
    
   
      // categories page
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/menuapp/templates/categories.template.html',
        controller: 'CategoriesController as mainList',
        resolve: {
          items: ['MenuDataService', function (MenuDataService) {
              return MenuDataService.getAllCategories();
          }]
        }
      })
    
      // list of category items
      .state('categories.items', {
        url: '/items/{shortName}',
        templateUrl: 'src/menuapp/templates/items.template.html',
        controller: 'ItemsController as menuItems',
        resolve: {
          items: ['$stateParams','MenuDataService', function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.shortName);
          }]
        }
      });

      
    }
    
    })();
    