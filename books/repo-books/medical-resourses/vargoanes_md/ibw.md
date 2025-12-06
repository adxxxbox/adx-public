   $(document).bind('mobileinit',function(){ $.mobile.pushStateEnabled = false; }); .ui-input-text input { min-height: 2.0em; } .weightUnitBox { padding-top: 19px; }

### Estimated Ideal Body Weight (kg)

Calculate estimated ideal body weight in kilograms.

Height:

  
  
  Inches Please enter a valid numeric value

Gender Male Female

  

Calculate

Reset

  

Ideal Body Weight(kg) 

**Equation**  
IBW(men) = Height (2.54 x inches) - 100 = Kg  
IBW(women) = Height (2.54 x inches) - 105 = Kg

  
  

The above calculations are to be used only as a reference.  
ALWAYS utilize your institutional protocols for all calculations.  
  
MeDiCalc  
[http://www.scymed.com/en/smnxps/psffd295.htm](http://www.scymed.com/en/smnxps/psffd295.htm)  
  
  

Calculating Ideal Body Weight: Keep It Simple  
Anesthesiology July 2017, Vol. 127, 203–204.  
Olivier Moreault, M.D.; Yves Lacasse, M.D., F.R.C.P.C.; Jean S. Bussières, M.D., F.R.C.P.C.  
  
  

var ibw = angular.module("ibw\_calculator", \[\]); ibw.controller("MainCtrl", function($scope){ $scope.IBWinches = 0; //$scope.IBWinches = 0; $scope.changeGender = function() { } $scope.calibw = function() { $scope.ibw = ($scope.IBWinches\*2.54)-$scope.selected\_gender; }; $scope.reset = function() { $scope.ibw = 0; $scope.IBWinches = 0; $scope.changeGender = 0; }; });