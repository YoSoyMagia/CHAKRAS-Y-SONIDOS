import { chakras } from "./chakras.js";

const app = document.getElementById("app");

chakras.forEach(chakra => {
    
    let template;
    if(chakra.nombre === "logo") {
        template = `
                <div class="contenedor__cancion">
                    <img class="contenedor__img" src="${chakra.imagen}" alt="${chakra.nombre}">
                </div>
                `;
    }
    else {
        template = `
                <div class="contenedor__cancion">
                    <h2 class="contenedor__h2a">${chakra.sanscrito}</h2>
                    <h2 class="contenedor__h2">${chakra.nombre}</h2>
                    <div class="contenedor__contImg">
                        <img class="contenedor__img img_chakra" src="${chakra.imagen}" alt="${chakra.nombre}">
                        <h3 class="contenedor__h3">${chakra.mantra}</h3>
                    </div>
                    <audio class="audio" controls preload="metadata" src="${chakra.audio}"></audio>
                </div>
                `;
    }

    
    app.insertAdjacentHTML("beforeend",template);

    let cont_canc = app.querySelectorAll(".contenedor__cancion")[app.children.length - 1];
    cont_canc.style.backgroundColor = chakra.color;

    if(chakra.video != null) {
        
        cont_canc.querySelector("img").addEventListener("click", () => {
            
            if(document.getElementById('video') &&
                document.getElementById('video').dataset.cancion !== chakra.nombre
            ) {
                document.getElementById('video').remove();
                app.insertAdjacentHTML("beforeend",chakra.video);
                document.getElementById('video').dataset.cancion = chakra.nombre;
            }
            else if(document.getElementById('video') !== null) {
                document.getElementById('video').remove();
            }
            else {
                
                app.insertAdjacentHTML("beforeend",chakra.video);
                document.getElementById('video').dataset.cancion = chakra.nombre;
            }

            
        })
    }
});