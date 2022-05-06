/**
 * Esta funcion sirve para invocar un servicio api con el metodo post.
 * @param {json} AJson - Este es un parametro de tipo json
 */
 export async function Ajax(AJson) {
  const loader = document.getElementById("main-loader");
  if ( loader != null ) loader.style.display = "block";
  const {
    metodo, 
    url, 
    params, 
    modal,
    cbSuccess 
  } = AJson;
  if (modal) document.getElementById(`modal-${modal}`).classList.remove("show")
  const options = {
      "mode": "no-cors",
      "headers": {
          "Content-type": "application/json; charset=utf-8"
      }
  };
  
  const datos = (params === undefined) ? {} : params;
  await axios({
    "method": metodo,
    "url": url, 
    "options": options,
    "data": datos
  }).then(response => {
        cbSuccess(response.data);
      })
      .catch(e => {
          console.log(e);
      });
  if(loader != null)loader.style.display = "none";
  if (modal) document.getElementById(`modal-${modal}`).classList.add("show")
}