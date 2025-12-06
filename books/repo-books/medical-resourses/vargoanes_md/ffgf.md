   $(document).bind('mobileinit',function(){ $.mobile.pushStateEnabled = false; }); .ui-input-text input { min-height: 2.0em; } .weightUnitBox { padding-top: 19px; }

### Functional Fresh Gas Flow

Fresh gas flow refers to the mixture of medical gases and volatile anaesthetic agents which is produced by an anaesthetic machine. The flow rate and composition of the fresh gas flow is determined by the anaesthetist.  
Typically the fresh gas flow emerges from the common gas outlet, a specific outlet on the anaesthetic machine to which the breathing attachment is then connected.  
Some older forms of breathing attachment, such as the Magill attachment, require high fresh gas flows (e.g. 7 litres/min) to prevent the patient from rebreathing their own expired carbon dioxide. More modern systems, e.g. the circle breathing attachment, use soda lime to absorb carbon dioxide, so that expired gas becomes suitable to re-use. With a very efficient circle system, the fresh gas flow may be reduced to the patient's minimum oxygen requirements (e.g. 250ml/min), plus a little volatile. Credit: Patrick Brown, SRNA

Total Flow:

  L/min

Please enter a valid numeric value

  

FiO2:

  

Please enter a valid numeric value

  

Calculate

Reset

  

O2 Flow(L/min) 

  

Air Flow(L/min) 

  
  

The above calculations are to be used only as a reference.  
ALWAYS utilize your institutional protocols for all calculations.  
  
MeDiCalc  
[http://www.scymed.com/en/smnxps/psffd295.htm](http://www.scymed.com/en/smnxps/psffd295.htm)  
  
  

A Novel Fresh Gas Flow Equation to Improve Anesthetic Precision and Safety.  
Virginia Commonwealth University. Richmond, VA.  
Brown, P. R. (2020).  
  
  

var ffgf\_calculator = angular.module("ffgf\_calculator", \[\]); ffgf\_calculator.controller("MainCtrl", function($scope){ $scope.o2flw = 0; $scope.airflw = 0; $scope.calco2flw = function() { $scope.o2flw = ($scope.tflw\*($scope.fio2 - 0.21))/0.79; $scope.airflw = ($scope.tflw - $scope.o2flw); }; $scope.reset = function() { $scope.o2flw = 0; $scope.airflw = 0; }; });