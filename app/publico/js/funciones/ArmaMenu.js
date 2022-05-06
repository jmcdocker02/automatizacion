export function ArmaMenu(AJson){
  let menu = '';
  AJson.forEach(submenu => {
    menu += `<li>
      <a href="#${submenu.nombre.trim()}" data-bs-toggle="collapse" class="nav-link px-0 align-middle link-dark" aria-expanded="false">
        ${submenu.nombre} 
      </a>
      <ul class="nav flex-column ms-1 collapse" id="${submenu.nombre.trim()}" data-bs-parent="#menu" style="">`;
    submenu.opciones.forEach(opcion => {
      menu += `<li class="w-100">
            <button 
              id="id-${opcion.for04.trim().replace(/ /g, "")}"
              type="button" 
              class="btn btn-light" 
              data-opcionmenu="${opcion.for04.trim().replace(/ /g, "")}" 
              data-modulo="${submenu.nombre.trim().replace(/ /g, "")}" 
              data-idformulario="${opcion.for01.trim()}"
              data-nombreformulario="${opcion.for04.trim().replace(/ /g, "")}">
                ${opcion.ico02} ${opcion.for04.trim()} 
            </button>
          </li>`;    
        });
    menu += `</ul></li>`;
  });
  return menu;
}