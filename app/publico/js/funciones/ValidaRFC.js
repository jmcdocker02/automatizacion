export function ValidaRFC(rfcStr) {
  let strCorrecta;
  let valid;
  strCorrecta = rfcStr;	
  if (rfcStr.length == 12){
   valid = "^(([A-Z]|[a-z]|&){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))";
  }else{
   valid = "^(([A-Z]|[a-z]|&|\s){1})(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))";
  }
  let validRfc=new RegExp(valid);
  let matchArray=strCorrecta.match(validRfc); 
  if (matchArray==null) {  
   return false;
  }else{
    console.log(true);
   return true;
  }
 } 