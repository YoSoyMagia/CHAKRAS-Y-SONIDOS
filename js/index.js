import { chakras } from "./chakras.js";

const app = document.getElementById("app");

chakras.forEach(chakra => {
    //console.log(chakra)
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
                    <h2 class="contenedor_h2">${chakra.nombre}</h2>
                    <img class="contenedor__img img_chakra" src="${chakra.imagen}" alt="${chakra.nombre}">
                    <h3 class="contenedor__h3">${chakra.mantra}</h3>
                    <audio class="audio" controls preload="metadata" src="${chakra.audio}"></audio>
                </div>
                `;
    }

    
    app.insertAdjacentHTML("beforeend",template);

    let cont_canc = app.querySelectorAll(".contenedor__cancion")[app.children.length - 1];
    cont_canc.style.backgroundColor = chakra.color;

    if(chakra.video != null) {
        console.log(cont_canc.querySelector("img"));
        cont_canc.querySelector("img").addEventListener("click", () => {
            console.log(document.getElementById('video'));
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
                console.log(chakra.video);
                app.insertAdjacentHTML("beforeend",chakra.video);
                document.getElementById('video').dataset.cancion = chakra.nombre;
            }

            
        })
    }
});