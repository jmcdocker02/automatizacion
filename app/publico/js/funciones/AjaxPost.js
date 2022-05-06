/**
 * Esta funcion sirve para invocar un servicio api con el metodo post.
 * @param {json} AJson - Este es un parametro de tipo json
 */
export async function AjaxPost(AJson) {
  const loader = document.getElementById("main-loader");
  if ( loader != null ) loader.style.display = "block";
  const {
    metodo, 
    url, 
    params, 
    cbSuccess 
  } = AJson;

  const options = {
      "method": "POST",
      "mode": "no-cors",
      "headers": {
          "Content-type": "application/json; charset=utf-8"
      },
      "data": params
  };
  await axios(url, options)
      .then(response => {
          cbSuccess(response.data);
      })
      .catch(e => {
          console.log(e);
      });
  if(loader != null)loader.style.display = "none";

}