   $(document).bind('mobileinit',function(){ $.mobile.pushStateEnabled = false; }); .ui-input-text input { min-height: 2.0em; } .weightUnitBox { padding-top: 19px; } function forward() { with (document.convert) { unit1.value = unit1.value.toString().replace(/\[^\\d\\.eE-\]/g,''); unit2.value = unit1.value\*(9/5)+32; } } function backward() { with (document.convert) { unit2.value = unit2.value.toString().replace(/\[^\\d\\.eE-\]/g,''); unit1.value = (unit2.value-32)\*(5/9); } }

###   Conversion of Temperature

**Please enable Javascript to use the unit converter**

  
  Type a value into one of the input fields below:

<table cellspacing="0" cellpadding="7" border="0"><tbody><tr><td><input step="0.1" name="unit1" size="10" maxlength="5" style="font-size:14px" onchange="forward()" value="" type="number"></td><td><strong>°C</strong></td></tr><tr><td><input step="0.1" name="unit2" size="10" maxlength="5" style="font-size:14px" onchange="backward()" value="" type="number"></td><td><strong>°F</strong></td></tr><tr><td><input value="Convert" style="font-size:14px;margin-bottom:15px" onclick="forward()" type="button"></td><td><input value="Reset" style="font-size:14px;margin-bottom:15px" onclick="reset()" type="button"></td></tr></tbody></table>

The above calculations are to be used only as a reference.  
ALWAYS utilize your institutional protocols for all calculations.  
  
MeDiCalc  
[http://www.scymed.com/en/smnxps/psffd295.htm](http://www.scymed.com/en/smnxps/psffd295.htm)