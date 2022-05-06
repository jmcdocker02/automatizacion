export function ValidarCorreo(ACorreo){
 
    const re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
	return re.exec(ACorreo);

}