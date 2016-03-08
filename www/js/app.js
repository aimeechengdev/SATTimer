// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.controller('MainCtrl', function($scope, Camera, $interval, $cordovaDialogs, $ionicPlatform) {

//   $ionicPlatform.ready(function() {
//  // $cordovaPlugin.someFunction().then(success, error);
//  $scope.ready = "i ready";
// });
var  messages = ["Reading","Writing and Language", "Math: No Calculator", "Math: Calculator", "Essay", "The End"];
var cnt = 0;
var second = 0;
var minute = 50;
var hour = 3;
var minuteStr = minute < 10 ? "0" + minute.toString() : minute.toString();
var secondStr = second < 10 ? "0" + second.toString() : second.toString();
$scope.timmer= "0" + hour.toString() + ":" + minuteStr + ":" + secondStr;
var stop1;
//var screenTimeout = false;
$scope.messageEn = false;
var enSoundFlag = false;
var enScreenTimeoutFlag = false;

  $scope.toggleScreenTimeout = function() {
    enScreenTimeoutFlag = !enScreenTimeoutFlag;
  }
  $scope.toggleSound = function() {
    enSoundFlag = !enSoundFlag;
  }
  $scope.startTimer = function() {
    if (enSoundFlag) $cordovaDialogs.beep(1);
    $scope.messageEn = true;
    $scope.message = messages[cnt];
  //  cnt++;
    if (!enScreenTimeoutFlag) {
      Camera.getPicture().then(function(imageURI) {
          $scope.chat.newName="right";
          console.log(imageURI);
          $scope.lastPhoto = imageURI;
        }, function(err) {
          $scope.chat.newName="error";
          console.err(err);
        }, {
          quality: 75,
          targetWidth: 320,
          targetHeight: 320,
          saveToPhotoAlbum: false
      });
    };
    if ( angular.isDefined(stop1) ) return;
          stop1 = $interval(function() {
            minuteStr = minute < 10 ? "0" + minute.toString() : minute.toString();
            secondStr = second < 10 ? "0" + second.toString() : second.toString();
            $scope.timmer= "0" + hour.toString() + ":" + minuteStr + ":" + secondStr;
            if(hour==2&&minute==45&&second==0)
            {
              cnt++;
              $scope.message = messages[cnt];
              if (enSoundFlag) $cordovaDialogs.beep(1);
            }
            if(hour==2&&minute==10&&second==0)
            {
              cnt++;
              $scope.message = messages[cnt];
              if (enSoundFlag) $cordovaDialogs.beep(1);
            }
            if(hour==1&&minute==45&&second==0)
            {
              cnt++;
              $scope.message = messages[cnt];
              if (enSoundFlag) $cordovaDialogs.beep(1);
            }
            if(hour==0&&minute==50&&second==0)
            {
              cnt++;
              $scope.message = messages[cnt];
              if (enSoundFlag) $cordovaDialogs.beep(1);
            }
            second--;
            if(second<0){
              minute--;
              if(minute<0){
                minute = 59;
                hour--;
                if(hour<0)
                {
                  cnt++;
                  $scope.message = messages[cnt];
                  if (enSoundFlag) $cordovaDialogs.beep(1);
                  $scope.stopTimer();
                }//hour
              }//minute
              second = 59;
            }//second
          }, 1000);//interval
  };//start timmer

  $scope.stopTimer = function() {
    if (enSoundFlag) $cordovaDialogs.beep(1);
    if (angular.isDefined(stop1)) {
      $interval.cancel(stop1);
      stop1 = undefined;
    }
  };
  $scope.resetTimer = function() {
    $scope.stopTimer();
    second = 0;
    minute = 50;
    hour = 3;
    cnt = 0;
    minuteStr = minute < 10 ? "0" + minute.toString() : minute.toString();
    secondStr = second < 10 ? "0" + second.toString() : second.toString();
    $scope.timmer= "0" + hour.toString() + ":" + minuteStr + ":" + secondStr;
    $scope.messageEn = false;
  };
  // $scope.toggleScreenTimeout = function(){
  //   screenTimeout = !screenTimeout;
  // };

});
