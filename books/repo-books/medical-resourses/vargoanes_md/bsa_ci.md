   $(document).bind('mobileinit',function(){ $.mobile.pushStateEnabled = false; }); .ui-input-text input { min-height: 2.0em; } .weightUnitBox { padding-top: 19px; }

### BSA (Body Surface Area)

Determine body surface area based on height and weight using the Mosteller formula. Results are given in square meters. For clinical purposes BSA is a better indicator of metabolic mass than body weight because it is less affected by abnormal adipose mass.

Height:

  
  
  cm  1 in = 2.54 cm Please enter a valid numeric value

Weight:

  
  
  kg Please enter a valid numeric value

Calculate BSA

Reset

BSA

  
  
  m2  Please enter a valid numeric value

  
  

  
  
  

### Cardiac Index

Cardiac Output

  
  
  L/min Please enter a valid numeric value

Calculate CI

Reset

**Cardiac Index(CI)** relates the cardiac output from left ventricle in one minute to **body surface area(BSA)**, thus relating heart performance to the size of the individual.  
A large person has a higher cardiac output than a small person. The cardiac index represents cardiac output that has been adjusted to a person's size. Dividing cardiac output by the person’s body surface area, or BSA, will provide the cardiac index.  
  
**Normal CI range (in rest):** 2.6–4.2 L/min/m2.  
(The lower the CI, the worse the heart is functioning as a pump.)  

CI (Cardiac Index)

  
  
  \[L/(min x m2)\] Please enter a valid numeric value

  
  

The above calculations are to be used only as a reference.  
ALWAYS utilize your institutional protocols for all calculations.  
  
MeDiCalc  
[http://www.scymed.com/en/smnxps/psffd295.htm](http://www.scymed.com/en/smnxps/psffd295.htm)  
  
  

Cardiac Formulas  
**MedScape (accessed 06/2021)**  
https://emedicine.medscape.com/article/2172353-overview  
  
  

var bsa = angular.module("bsa\_calculator", \[\]); bsa.controller("MainCtrl", function($scope){ $scope.bsa = 0; $scope.cIndex = 0; $scope.calBSA = function() { $scope.bsa = (Math.pow($scope.bsaCentimeters,0.725))\*(Math.pow($scope.bsaKg,0.425))\*0.007184; }; $scope.calCI = function() { $scope.cIndex = ($scope.cardOutput)/($scope.bsa); }; $scope.resetBSA = function() { $scope.bsa = 0; $scope.bsaCentimeters = 0; $scope.bsaKg = 0; }; $scope.resetCI = function() { $scope.cardOutput = 0; $scope.cIndex = 0; }; });