   $(document).bind('mobileinit',function(){ $.mobile.pushStateEnabled = false; }); .ui-input-text input { min-height: 2.0em; } .weightUnitBox { padding-top: 19px; }

### MAP (Mean Arterial Pressure)

The mean arterial pressure (MAP) describes the average blood pressure in an individual. It is defined as the average arterial pressure during a single cardiac cycle.  
  
**Average MAP:** 70-105 mmHg.

Systolic BP:

  
  
  mmHg Please enter a valid numeric value

Diastolic BP:

  
  
  mmHg Please enter a valid numeric value

Calculate MAP

Reset

MAP:

  
  
  mmHg Please enter a valid numeric value

  
  

  
  
  

### Systemic Vascular Resistance (SVR)

Systemic vascular resistance (SVR) refers to the resistance to blood flow offered by all of the systemic vasculature, excluding the pulmonary vasculature.  
  
**SVR Average:** 1,200 dynes⋅sec⋅cm5  
**SVR Range:** 800 - 1,600 dynes⋅sec⋅cm5  
The lower the SVR, the less resistance, thus more dilated the vessel (more HYPOtensive).  
The higher the SVR, the more resistance, thus more constricted the vessel (more HYPERtensive).

**Cardiac Output (CO)**  
**CO Average:** 5 L/min  
**CO Range:** 4-6.5 L/min

Central Venous Pressure (CVP)

  
  
  mmHg Please enter a valid numeric value

Cardiac Output:

  
  
  L/min Please enter a valid numeric value

Calculate SVR

Reset

SVR:

  
  
  dyn·s/cm5 Please enter a valid numeric value

  
  

The above calculations are to be used only as a reference.  
ALWAYS utilize your institutional protocols for all calculations.  
  
MeDiCalc  
[http://www.scymed.com/en/smnxps/psffd295.htm](http://www.scymed.com/en/smnxps/psffd295.htm)  
  
  

Cardiac Formulas  
**MedScape (accessed 06/2021)**  
https://emedicine.medscape.com/article/2172353-overview  
  
  

var map = angular.module("map\_calculator", \[\]); map.controller("MainCtrl", function($scope){ $scope.map = 0; $scope.calMAP = function() { $scope.map = (($scope.dbp\*2)+$scope.sbp)/3; }; $scope.calSVR = function() { $scope.svr = (80\*($scope.map-$scope.cvp))/$scope.cardOutput; }; $scope.resetMAP = function() { $scope.map = 0; $scope.sbp = 0; $scope.dbp = 0; }; $scope.resetSVR = function() { $scope.svr = 0; $scope.cvp = 0; $scope.cardOutput = 0; }; });