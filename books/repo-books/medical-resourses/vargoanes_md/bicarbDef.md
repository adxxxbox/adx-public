   $(document).bind('mobileinit',function(){ $.mobile.pushStateEnabled = false; }); .ui-input-text input { min-height: 2.0em; } .weightUnitBox { padding-top: 19px; }

### Bicarbonate Deficits

Bicarbonate Deficit is condition caused by excessive organic or inorganic acids in the body. The excess may be due to abnormally high acid production which arises during fever and starvation or loss of bases. This calculator is used to calculate HCO3-(bicarbonate) deficits in patients with metabolic acidosis.  
  
Giving bicarbonate to a patient with a true bicarbonate deficit is not controversial. Controversy occurs when the decrease in bicarbonate concentration is the result of its conversion to another base, which given time, can be converted back to bicarbonate.

Patients Weight:

  
  
  kg Please enter a valid numeric value

HCO3 Desired:

  
  
  mEq/L Please enter a valid numeric value

HCO3 Measured:

  
  
  mEq/L Please enter a valid numeric value

Calculate

Reset

Bicarbonate Deficit:

  
  
  mEq Please enter a valid numeric value

  
  

The above calculations are to be used only as a reference.  
ALWAYS utilize your institutional protocols for all calculations.  
  
MeDiCalc  
[http://www.scymed.com/en/smnxps/psffd295.htm](http://www.scymed.com/en/smnxps/psffd295.htm)  
  
  

var bcd = angular.module("bcd\_calculator", \[\]); bcd.controller("MainCtrl", function($scope){ $scope.bcd = 0; $scope.dHC03 = 24; $scope.calBCD = function() { $scope.bcd = 0.4\*$scope.pWeight\*($scope.dHC03-$scope.mHC03); }; $scope.reset = function() { $scope.bcd = 0; $scope.pWeight = 0; $scope.dHC03 = 24; $scope.mHC03 = 0; }; });