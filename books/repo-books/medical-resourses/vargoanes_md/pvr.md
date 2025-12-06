   $(document).bind('mobileinit',function(){ $.mobile.pushStateEnabled = false; }); .ui-input-text input { min-height: 2.0em; } .weightUnitBox { padding-top: 19px; }

### PVR (Pulmonary Vascular Resistance)

Pulmonary Vascular Resistance (PVR) is the resistance to flow that must be overcome to push blood through the pulmonary vascular.  
  
**PVR Average:** 80 dynes⋅sec⋅cm5  
**PVR Range:** 40-180 dynes⋅sec⋅cm5  
The lower the PVR, the less resistance, thus more dilated the pulmonary artery.  
The higher the PVR, the more resistance, thus more constricted the pulmonary artery.  
Pulmonary hypertension: When the resting mean pulmonary artery pressure at or above 25 mmHg.  
The normal pulmonary vasculature is a low-pressure system with less than1/10th the resistance to flow observed in the systemic vascular bed.

Mean Pulm Art Press:

  
  
  mmHg Please enter a valid numeric value

Pulm Cap Wedge Press:

  
  
  mmHg Please enter a valid numeric value

Cardiac Output:

  
  
  L/min Please enter a valid numeric value

Calculate PVR

Reset

PVR:

  
  
  dyn·s/cm5 Please enter a valid numeric value

  
  

The above calculations are to be used only as a reference.  
ALWAYS utilize your institutional protocols for all calculations.  
  
MeDiCalc  
[http://www.scymed.com/en/smnxps/psffd295.htm](http://www.scymed.com/en/smnxps/psffd295.htm)  
  
  

Cardiac Formulas  
**MedScape (accessed 06/2021)**  
https://emedicine.medscape.com/article/2172353-overview  
  
  

var pvr = angular.module("pvr\_calculator", \[\]); pvr.controller("MainCtrl", function($scope){ $scope.pvr = 0; $scope.calPVR = function() { $scope.pvr = (80\*($scope.pap-$scope.pcw))/$scope.cardOutput; }; $scope.resetPVR = function() { $scope.pvr = 0; $scope.pap = 0; $scope.pcw = 0; $scope.cardOutput = 0; }; });