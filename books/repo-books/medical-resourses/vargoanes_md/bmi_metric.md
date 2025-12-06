   $(document).bind('mobileinit',function(){ $.mobile.pushStateEnabled = false; }); .ui-input-text input { min-height: 2.0em; } .weightUnitBox { padding-top: 19px; }

### Adult BMI - metric (Body Mass Index)

Find body fat measurements for **both adult men and women** based on height and weight.

Height:

  
  
  cm Please enter a valid numeric value

  

Weight:

  
  
  kg  Please enter a valid numeric value

  

  
  
  

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
  
  

Calculating BMI Using the Metric System  
Growth Chart Training  
https://www.cdc.gov/nccdphp/dnpao/growthcharts/training/bmiage/page5\_1.html  
  
  

var bmi\_metric = angular.module("bmi\_metric", \[\]); bmi\_metric.controller("MainCtrl", function($scope){ $scope.bmi\_metric = 0; //$scope.bmiCM = 0; //$scope.bmiKG = 0; $scope.calbmi = function() { $scope.bmi\_metric = ($scope.bmiKG/(($scope.bmiCM/100)\*($scope.bmiCM/100))); }; $scope.reset = function() { $scope.bmi\_metric = 0; $scope.bmiCM = 0; $scope.bmiKG = 0; }; });