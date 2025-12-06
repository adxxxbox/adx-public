   $(document).bind('mobileinit',function(){ $.mobile.pushStateEnabled = false; }); .ui-input-text input { min-height: 2.0em; } .weightUnitBox { padding-top: 19px; }

### AdBW (Adjusted Body Weight)

This is the IBW adjusted by a factor, usually 0.4 or 40% and it is used especially in cases where the actual weight is more than 20% of the ideal one. It provides a better insight and can be used to calculate energy requirements in obesity cases. For IBW<< Actual weight we continue by calculating the AdBW according to:  
AdBW = IBW + 0.4 \* (Actual weight – IBW)

Ideal Body Weight:

  kg

Please enter a valid numeric value

  

Actual Weight:

  kg

Please enter a valid numeric value

  

  

Calculate

Reset

  

Adjusted Body Weight(kg) 

  
  

The above calculations are to be used only as a reference.  
ALWAYS utilize your institutional protocols for all calculations.  
  
MeDiCalc  
[http://www.scymed.com/en/smnxps/psffd295.htm](http://www.scymed.com/en/smnxps/psffd295.htm)  
  
  

GlobalRxpH  
https://globalrph.com/medcalcs/adjusted-body-weight-ajbw-and-ideal-body-weight-ibw-calc/  
  
  

var adbw = angular.module("adbw\_calculator", \[\]); adbw.controller("MainCtrl", function($scope){ $scope.adbw = 0; $scope.changeGender = function() { } $scope.caladbw = function() { $scope.adbw = ($scope.bmiKG - $scope.ibw)\*0.4 + $scope.ibw; }; $scope.reset = function() { $scope.adbw = 0; $scope.bmiKG = 0; $scope.ibw = 0; }; });