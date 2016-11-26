(function (window, angular, undefined) {

  'use strict';

  function AuthorizationRouterConfig($stateProvider) {
    // Account-based config.
    $stateProvider
      .state('log_in', {
        url: '/log_in',
        templateUrl: 'users/log-in.html',
        data: {
          loginRequired: false
        },
        controller: 'LogInController',
        controllerAs: 'vm'
      })
      .state('sign_up', {
        url: '/sign_up',
        templateUrl: 'users/sign-up.html',
        data: {
          loginRequired: false
        },
        controller: 'SignUpController',
        controllerAs: 'vm'
      });

    // Users-based config.
    $stateProvider
      .state('app.profile', {
        url: '/profile',
        template: '<div ui-view></div>',
        data: {
          loginRequired: true
        },
        abstract: true
      })
      .state('app.profile.detail', {
        url: '/detail',
        templateUrl: 'users/profile-detail.html',
        data: {
          loginRequired: true
        },
        resolve: {
          userProfile: function (UserProfileModel, loadUserProfile) {
            if (!UserProfileModel.hasUserProfile()) {
              return loadUserProfile();
            }

            return UserProfileModel;
          }
        },
        controller: 'ProfileDetailController',
        controllerAs: 'vm'
      })
      .state('app.profile.edit', {
        url: '/edit',
        templateUrl: 'users/profile-edit.html',
        data: {
          loginRequired: true
        },
        resolve: {
          userProfile: function (UserProfileModel, loadUserProfile) {
            if (!UserProfileModel.hasUserProfile()) {
              return loadUserProfile();
            }

            return UserProfileModel;
          }
        },
        controller: 'ProfileEditController',
        controllerAs: 'vm'
      })
      .state('app.profile.change_password', {
        url: '/change_password',
        templateUrl: 'users/change-password.html',
        data: {
          loginRequired: true
        },
        controller: 'ChangePasswordController',
        controllerAs: 'vm'
      });
  }

  angular.module('safefamilies')
    .config(['$stateProvider', AuthorizationRouterConfig]);

})(window, window.angular);