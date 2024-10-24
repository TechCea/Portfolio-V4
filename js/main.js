document.addEventListener("DOMContentLoaded", function() {
    var typed = new Typed(".text", {
        strings: ["Front End Developer", "Web Developer", "System Engineer"],
        typeSpeed: 120,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
});
    
    document.addEventListener('DOMContentLoaded', function() {
        const toggle = document.getElementById('theme-toggle');
        const icon = toggle.querySelector('i');
        const profilePicture = document.getElementById('profile-picture');
    
        
        const lightModeImages = [
            "img/Picture0.0-.png",
            "img/Picture0.1-.png",
            "img/Picture1-.png",
            "img/Picture2-.png",
            "img/Picture3-.png",
            "img/Picture4-.png",
            "img/Picture5-.png",
            "img/Picture6-.png",
            "img/Picture7-.png",
            "img/Picture8-.png",
            "img/Picture9-.png"
        ];
    
        const darkModeImages = [
            "img/Picture0-dark.png",
            "img/Picture0.1-dark.png",
            "img/Picture1-dark.png",
            "img/Picture2-dark.png",
            "img/Picture3-dark.png",
            "img/Picture4-dark.png",
            "img/Picture5-dark.png",
            "img/Picture6-dark.png",
            "img/Picture7-dark.png",
            "img/Picture8-dark.png",
            "img/Picture9-dark.png"
        ];
    
        let currentIndex = 0;
        let timer;
        let isLightMode = false;
    
        function updateProfilePicture() {
            const images = isLightMode ? lightModeImages : darkModeImages;
            profilePicture.src = images[currentIndex];
        }
    
        function changeImage() {
            currentIndex = (currentIndex + 1) % (isLightMode ? lightModeImages : darkModeImages).length;
            updateProfilePicture();
        }
    
        function startAnimation() {
            timer = setInterval(changeImage, 3000); // Cambia la imagen cada 3 segundos
        }
    
        function toggleTheme(event) {
            event.preventDefault();
            document.documentElement.classList.toggle('light-mode');
            isLightMode = document.documentElement.classList.contains('light-mode');
    
            if (isLightMode) {
                icon.classList.remove('bx-moon');
                icon.classList.add('bx-sun');
                toggle.setAttribute('data-label', 'Modo Claro');
                localStorage.setItem('theme', 'light');
            } else {
                icon.classList.remove('bx-sun');
                icon.classList.add('bx-moon');
                toggle.setAttribute('data-label', 'Modo Noche');
                localStorage.setItem('theme', 'dark');
            }
    
            // Actualizar la imagen del perfil inmediatamente al cambiar el tema
            updateProfilePicture();
        }
    
        // Recuperar el tema del localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.classList.add('light-mode');
            isLightMode = true;
            icon.classList.remove('bx-moon');
            icon.classList.add('bx-sun');
            toggle.setAttribute('data-label', 'Modo Claro');
        } else {
            document.documentElement.classList.remove('light-mode');
            isLightMode = false;
            icon.classList.remove('bx-sun');
            icon.classList.add('bx-moon');
            toggle.setAttribute('data-label', 'Modo Noche');
        }
    
        // Iniciar la animación automáticamente cuando se carga la página
        startAnimation();
        updateProfilePicture(); // Asegurarse de que la imagen inicial sea la correcta
    
        toggle.addEventListener('click', toggleTheme);
    });
    
fetch('./js/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => buildPortfolio(data))
        .catch(error => console.error('There has been a problem with your fetch operation:', error));

    function buildPortfolio(projectsArr) {
        console.log('projectsArr:', projectsArr);
        let projects = [...projectsArr];
        projects.sort(function (a, b) {
            return b.rating - a.rating;
        });

        projects = projects.slice(0, 6);

        let container = document.querySelector(".elements");
        console.log('container:', container);

        for (const project of projects) {
            let element = document.createElement("div");
            element.classList.add("element");
            element.classList.add("a");
            element.classList.add("glass");
            element.setAttribute("dataID", project.id);
            let img = document.createElement("img");
            img.src = project.logo;
            element.appendChild(img);
            container.appendChild(element);
            console.log('Added element:', element);
        }

        portfolio(projectsArr);
    }

    function portfolio(arrayData) {
        let elements = [...document.getElementsByClassName('element')];
        elements.forEach(function (e) {
            e.addEventListener("click", () => {
                let banner = document.createElement("div");
                if (parseInt(e.getAttribute("dataID")) === 1) {
                    banner.classList.add("banner-custom");
                } else if (parseInt(e.getAttribute("dataID")) === 0) {  // Cambia '2' por el ID que desees
                    banner.classList.add("banner-custom-2");
                }
                let width = e.offsetWidth;
                let height = e.offsetHeight;
                let x = e.offsetTop;
                let y = e.offsetLeft;

                banner.style.top = x + "px";
                banner.style.left = y + "px";
                banner.style.width = width + 'px';
                banner.style.height = height + 'px';
                banner.style.padding = '0';
                banner.classList.add("banner");

                let content = document.createElement("div");
                content.classList.add("content");

                let closeButton = document.createElement("button");
                closeButton.classList.add("close-btn");
                closeButton.innerHTML = "&times;";
                closeButton.addEventListener("click", goBackElements);
                content.appendChild(closeButton);

                let h2 = document.createElement("h3");
                h2.innerText = arrayData[e.getAttribute("dataID")].name;
                content.appendChild(h2);
                let p = document.createElement("p");
                p.innerHTML = arrayData[e.getAttribute("dataID")].description;
                content.appendChild(p);
                let tech = document.createElement("div");
                tech.classList.add("skills-used");
                const arrayTech = arrayData[e.getAttribute("dataID")].technologies;
                for (const el of arrayTech) {
                    let skill = document.createElement("div");
                    skill.classList.add("skill");
                    let img = document.createElement("img");
                    img.src = "img/icons/" + el + '.svg';
                    let title = document.createElement("span");
                    title.textContent = el;
                    skill.appendChild(img);
                    skill.appendChild(title);
                    tech.appendChild(skill);
                }
                content.appendChild(tech);

                // Crear el contenedor de botones
                let buttonContainer = document.createElement("div");
                buttonContainer.classList.add("button-container");

                // Añadir botón "Take a look"
                let link = document.createElement("a");
                link.classList.add("link", "btn-primary");
                link.href = arrayData[e.getAttribute("dataID")].link || "#"; // Puedes agregar un enlace por defecto si no hay enlace
                link.setAttribute("target", "_blank");
                link.innerText = "Take a look";
                buttonContainer.appendChild(link);

                // Añadir botón de GitHub
                let githubLink = document.createElement("a");
                githubLink.classList.add("link", "btn-secondary");
                githubLink.href = arrayData[e.getAttribute("dataID")].github || "#"; // Puedes agregar un enlace por defecto si no hay GitHub
                githubLink.setAttribute("target", "_blank");

                let githubIcon = document.createElement("img");
                githubIcon.src = "img/icons/GitHub.svg";
                githubIcon.alt = "GitHub";
                githubIcon.style.width = "44px";
                githubIcon.style.height = "44px";
                githubLink.appendChild(githubIcon);

                buttonContainer.appendChild(githubLink);

                content.appendChild(buttonContainer);

                let spacingMobile = document.createElement("span");
                spacingMobile.classList.add('separatorMobile');
                content.appendChild(spacingMobile);

                banner.appendChild(content);
                document.querySelector('.elements').appendChild(banner);

                if (arrayData[e.getAttribute("dataID")].backgroundImage) {
                    banner.style.backgroundImage = `url(${arrayData[e.getAttribute("dataID")].backgroundImage})`;
                    banner.style.backgroundSize = 'cover';
                    banner.style.backgroundPosition = 'center';
                    banner.classList.add("banner-with-bg");
                } else {
                    banner.style.backgroundColor = arrayData[e.getAttribute("dataID")].backgroundColor || '#ffffff';
                }

                banner.classList.add("banner-expanded");

                setTimeout(() => {
                    content.classList.add("visible");
                }, 1200);
            });
        });

        function goBackElements() {
            let banner = document.querySelector('.banner');
            banner.classList.add("hide");
            setTimeout(() => {
                banner.remove();
            }, 500);
        }
    }


    // Seleccionar todos los elementos con la clase copyEmailButton
const emailButtons = document.querySelectorAll('.copyEmailButton');

// El correo electrónico a copiar
const email = "jav.alarconcea@gmail.com";

// Agregar evento click a cada botón
emailButtons.forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault(); // Prevenir la acción predeterminada del enlace

        // Copiar el correo electrónico al portapapeles
        navigator.clipboard.writeText(email).then(function() {
            // Mostrar alerta personalizada con SweetAlert2 como toast
            Swal.fire({
                icon: 'success',
                title: '¡Copiado!',
                text: 'Correo electrónico copiado al portapapeles',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        }).catch(function(err) {
            console.error("Error al copiar el correo electrónico: ", err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo copiar el correo electrónico',
                confirmButtonText: 'OK'
            });
        });
    });
});


 // Seleccionar todos los elementos con la clase copyDiscordButton
 const discordButtons = document.querySelectorAll('.copyDiscordButton');

 // Tu nombre de usuario de Discord a copiar
 const discordUser = "Baggins#9264"; // Reemplaza con tu Discord tag

 // Agregar evento click a cada botón
 discordButtons.forEach(button => {
     button.addEventListener("click", function(event) {
         event.preventDefault(); // Prevenir la acción predeterminada del enlace

         // Copiar el nombre de usuario de Discord al portapapeles
         navigator.clipboard.writeText(discordUser).then(function() {
             // Mostrar alerta personalizada con SweetAlert2 como toast
             Swal.fire({
                 icon: 'success',
                 title: '¡Copiado!',
                 text: 'Nombre de usuario de Discord copiado al portapapeles',
                 toast: true,
                 position: 'top-end',
                 showConfirmButton: false,
                 timer: 2000,
                 timerProgressBar: true
             });
         }).catch(function(err) {
             console.error("Error al copiar el nombre de usuario de Discord: ", err);
             Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'No se pudo copiar el nombre de usuario de Discord',
                 confirmButtonText: 'OK'
             });
         });
     });
 });


document.querySelectorAll('.acordion li').forEach(item => {
    item.addEventListener('click', function() {
        const checkbox = this.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
    });
});

document.querySelectorAll('.acordion li .content-2').forEach(content => {
    content.addEventListener('click', function(event) {
        event.stopPropagation(); // Evita que el click cierre el acordeón
    });
});



function changeLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);

    // Cambia el texto de los elementos de navegación según el idioma
    const translations = {
        es: {
            home: "Inicio",
            projects: "Proyectos",
            about: "Sobre mí"
        },
        en: {
            home: "Home",
            projects: "Projects",
            about: "About me"
        }
    };

    document.querySelectorAll('.navbar-item a').forEach((element) => {
        const section = element.getAttribute('href').substring(1);
        element.textContent = translations[lang][section] || element.textContent;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'es';
    changeLanguage(savedLanguage);
    updateToggleButton(savedLanguage);
});

document.getElementById('language-toggle').addEventListener('click', function() {
    const currentLanguage = localStorage.getItem('selectedLanguage') || 'es';
    const newLanguage = currentLanguage === 'es' ? 'en' : 'es';
    changeLanguage(newLanguage);
    updateToggleButton(newLanguage);
});

function updateToggleButton(lang) {
    document.getElementById('btn-es').classList.toggle('active', lang === 'es');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
}




