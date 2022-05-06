export function ObtieneJSONFormulario(AFormulario){
  const json = {};
  const checkBox = {};
  const inputs = AFormulario.elements;
  let i=0;
  Object.values(inputs).forEach(input => {
    if(input.type==="checkbox" && input.checked){
     checkBox[i]=input.value;
     i++;
    }else{
     json[input.name] = input.value;
    }
  });
  if(i>0){json["checkBox"]=checkBox;}
  return json;
}