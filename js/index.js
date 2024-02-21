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

    else if(chakra.audio.length > 1) {
        template = `
                <div class="contenedor__cancion">
                    <h2 class="contenedor__h2a">${chakra.sanscrito}</h2>
                    <h2 class="contenedor__h2">${chakra.nombre}</h2>
                    <div class="contenedor__contImg">
                        <img class="contenedor__img img_chakra" src="${chakra.imagen}" alt="${chakra.nombre}">
                        <h3 class="contenedor__h3">${chakra.mantra}</h3>
                    </div>
                    <div class="contenedor__panelcontrolAudio" id="${chakra.sanscrito}">
                        <img data-btn="previous" src="./assets/icons/arrow-left-circle.svg" alt="" class="audioActionBtn previous">
                        <audio class="audio" controls preload="metadata" data-pa="0" src="${chakra.audio[0]}"></audio>
                        <img data-btn="next" src="./assets/icons/arrow-right-circle.svg" alt="" class="audioActionBtn">
                    </div>
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


    // Inyecta el template
    
    app.insertAdjacentHTML("beforeend",template);

    // Configuración pasar audio

    const panel = document.getElementById(chakra.sanscrito);
    
    if(panel) {
        panel.querySelectorAll(".audioActionBtn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                let pos = null;

                if(e.target.dataset.btn === "next") {
                    pos = parseInt(e.target.parentElement.querySelector("audio").dataset.pa) + 1;    
                    pos = pos >= chakra.audio.length ? 0 : pos;
                }
                else if(e.target.dataset.btn === "previous") {
                    pos = parseInt(e.target.parentElement.querySelector("audio").dataset.pa) - 1;    
                    pos = pos < 0 ? chakra.audio.length - 1 : pos;
                }
                
    
                e.target.parentElement.querySelector("audio").src = chakra.audio[pos];
                e.target.parentElement.querySelector("audio").dataset.pa = pos;
            });
        })
    }
    else {}

    // Configuración agregar colores de las cards

    let cont_canc = app.querySelectorAll(".contenedor__cancion")[app.children.length - 1];
    cont_canc.style.backgroundColor = chakra.color;

    // Configuración visualización de los videos

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