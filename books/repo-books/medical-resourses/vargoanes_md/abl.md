Maximum ABL Calculation    $(document).bind('mobileinit',function(){ $.mobile.pushStateEnabled = false; }); .ui-input-text input { min-height: 2.5em; } .weightUnitBox { padding-top: 19px; }

### Maximum ABL Calculation

Patient’s Weight:

  kg lbs

aAverage Blood Volume: Select a option Preterm 95 mL/kg Term (37 weeks) 85 mL/kg < 12 months 80 mL/kg 1-6 years 77 mL/kg Adult Male 75 mL/kg Adult Female 65 mL/kg

Enter patient's starting HCT:

Enter lowest acceptable HCT:

Calculate

Reset

Your Patient’s Estimated Blood Volume (mLs)

Your patient's Allowable Blood Loss for Lowest HCT (mL)

**Formulas**  
EBV = weight (kg) \* Average blood volume  
Allowable Blood Loss = \[EBV\*(Hi-Hf)\]/Hi  

  
  
  
  

The above calculations are to be used only as a reference.  
ALWAYS utilize your institutional protocols for all calculations.  
  
MeDiCalc  
[http://www.scymed.com/en/smnxps/psffd295.htm](http://www.scymed.com/en/smnxps/psffd295.htm)  
  
  

**Calculate Allowable Blood Loss**  
**Manuels Web (accessed 06/2021)**  
https://www.manuelsweb.com/blood\_loss.htm  
  
Perioperative blood loss: estimation of blood volume loss or hemoglobin mass loss?  
**Blood Transfusion 2020 Jan; 18(1): 20–29.  
Sebastian Jaramillo, Mar Montane-Muntane, Pedro L. Gambus, David Capitan, 1 Ricard Navarro- Ripoll, and Annabel Blasi**  
  
  

var abl = angular.module("abl\_calculator", \[\]); abl.controller("MainCtrl", function($scope){ $scope.abv = 0; $scope.acceptableHCT = 27; $scope.currentHCT = 0; $scope.weight = 0; $scope.weightUnit = 'kg'; $scope.changeWeight = function() { if($scope.weight != undefined) { if( $scope.weightUnit == 'lbs') { $scope.weight = $scope.weight\*2.2046; } else { $scope.weight = $scope.weight/2.2046; } } }; $scope.changeGender = function() { } $scope.calabv = function() { if($scope.currentHCT != 0){ console.log($scope.weightUnit); $scope.abv = parseInt($scope.selected\_gender); if( $scope.weightUnit == 'kg') { $scope.allowableBloodLoss = ((($scope.abv\*($scope.currentHCT - $scope.acceptableHCT))/$scope.currentHCT)\*$scope.weight) ; $scope.abv = $scope.abv\*$scope.weight; } else { $scope.allowableBloodLoss = ((($scope.abv\*($scope.currentHCT - $scope.acceptableHCT))/$scope.currentHCT)\*($scope.weight/2.2046)) ; $scope.abv = $scope.abv\*($scope.weight/2.2046); } } else { $scope.abv = parseInt($scope.selected\_gender); if( $scope.weightUnit == 'kg') { $scope.abv = $scope.abv\*$scope.weight; } else { $scope.abv = $scope.abv\*($scope.weight/2.2046); } } }; $scope.reset = function() { $scope.allowableBloodLoss = 0; $scope.abv = 0; $scope.currentHCT = 0; $scope.acceptableHCT= 0; $scope.weight = 0; }; });