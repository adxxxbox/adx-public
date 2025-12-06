   $(document).bind('mobileinit',function(){ $.mobile.pushStateEnabled = false; }); .ui-input-text input { min-height: 2.0em; } .weightUnitBox { padding-top: 19px; }

### Adult BMI (Body Mass Index)

Find body fat measurements for **both adult men and women** based on height and weight.

Height:

  
  
  Feet Please enter a valid numeric value

  
  Inches Please enter a valid numeric value

  

Weight:

  
  
  Lbs  Please enter a valid numeric value

  

  
  
  

Calculate

Reset

  

BMI 

**GUIDE**  
< 18.5 BMI Underweight  
18.5 - 24.9 BMI Normal Weight  
25.0 - 29.9 BMI Overweight  
30.0 - 34.9 BMI Obese  
35.0 - 39.9 BMI Severely Obese  
40.0 - 49.9 BMI Morbidly Obese  
50.0 - 59.9 BMI Superobese

**Equation**  
BMI = body weight(kg)/height2(m)

  
  

The above calculations are to be used only as a reference.  
ALWAYS utilize your institutional protocols for all calculations.  
  
MeDiCalc  
[http://www.scymed.com/en/smnxps/psffd295.htm](http://www.scymed.com/en/smnxps/psffd295.htm)  
  
  

The BMI Formula  
**WhatHeath (accessed 06/2021)**  
https://www.whathealth.com/bmi/formula.html  
  
  

var bmi = angular.module("bmi\_calculator", \[\]); bmi.controller("MainCtrl", function($scope){ $scope.bmi = 0; //$scope.bmiFeet = 0; //$scope.bmiInches = 0; //$scope.bmiPounds = 0; $scope.calbmi = function() { $scope.bmi = ($scope.bmiPounds/((($scope.bmiFeet\*12)+$scope.bmiInches)\*(($scope.bmiFeet\*12)+$scope.bmiInches)))\*703; }; $scope.reset = function() { $scope.bmi = 0; $scope.bmiFeet = 0; $scope.bmiInches = 0; $scope.bmiPounds = 0; }; });