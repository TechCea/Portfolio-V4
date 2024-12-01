const subtitles = {
    es: ["Descubre mis proyectos", "Descubre mis habilidades", "en desarrollo web."],
    en: ["Discover my projects", "Discover my skills", "in web development."]
};

document.addEventListener("DOMContentLoaded", function () {
    const userLang = navigator.language.startsWith("es") ? "es" : "en";

    new Typed(".text", {
        strings: subtitles[userLang],
        typeSpeed: 50,
        backSpeed: 50,
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

    const translations = {
        es: {
            "nav-home": "Inicio",
            "nav-projects": "Proyectos",
            "nav-about": "Sobre mí",
            "main-title": "¡Vamos a ver mi portafolio!",
            "main-description": "Me encanta lo que hago porque me permite combinar mi creatividad con habilidades de comunicación visual y capacidad para resolver problemas.",
            "projects-title": "Proyectos <span>Importantes</span>",
            "studies-title": "Estudios",
            "studies-description": "Estudiante de Ingeniería en Sistemas en la Universidad Católica de El Salvador (UNICAES)",
            "download-cv": "Descargar CV",
            "scrum-title": "Metodología Scrum",
            "scrum-text": "Para el desarrollo de proyectos, utilizo metodologías Scrum.",
            "contact-tag-text": "Contactar",
            "contact-description": "Creando experiencias digitales únicas.<br>¡Hablemos sobre tu próximo proyecto!",
            "contact-email": "Envíame un Email",
            "contact-telegram": "DM en Telegram",
            "tittle-hey": "Ey Soy",
            "pixel-status": "Disponibles para nuevos proyectos",
            "pixel-title": "Ingeniero en Sistemas",
            "pixel-specialty": "Aplicaciones Web",
            "banner-text": "¡Te presento mi espacio creativo!",
            "about-title": "<span class='emoji'>👈</span> Proyectos en los que estoy Trabajando",
            "about-description": "A lo largo de mi carrera, he estado desarrollando proyectos innovadores y desafiantes, los cuales puedes explorar para conocer más sobre mi trabajo y las soluciones que he creado.<br><strong>¡Descubre en qué estoy trabajando ahora y cómo estos proyectos están dando vida a mis ideas!</strong>",
            "skills-title": "My <span>Skills</span>",
            "DataBase": "Base de Datos",
            "Tools": "Herramientas",
            "wrapper-header": "¿Tienes algún proyecto?",
            "wrapper-subtext": "Trabajemos juntos",
            "aboutTitle": "Sobre <span>Mí</span>",
            "profileInfo-header": "{ Desarrollador Frontend }",
            "profileInfo-intro": "Me llamo <strong>Carlos Javier Cea</strong> pero mis amigos me llaman <strong>Javi</strong>. Entré en este dinámico campo de forma inesperada, pero pronto descubrí una profunda satisfacción en la creación de interfaces, sitios web y experiencias digitales interactivas.",
            "profileInfo-skillset": "Aunque todavía me encuentro en proceso de formación para convertirme en un profesional, estoy dedicando tiempo y esfuerzo a desarrollar <span class='highlight'>habilidades en HTML, CSS, JavaScript y Angular</span>, así como a comprender mejor los <span class='highlight'>principios de diseño y experiencia de usuario</span>.",
            "profileInfo-growth": "Estoy enfocado en crecer como <span class='highlight'>futuro desarrollador Front-end</span>, buscando oportunidades para aprender y contribuir a <span class='highlight'>soluciones digitales innovadoras</span>. <span class='highlight'>Tengo pasión por la música</span>, lo que potencia mi concentración y creatividad. <span class='highlight'>Me considero un aprendiz ágil</span>, detallista y comprometido, y <span class='highlight'>valoro las lecciones aprendidas</span> a través de la experiencia.",
            "soft-pixel-title": "Ingeniero en UX/UI",
            "pixel-description-1": "Apasionado por la tecnología, con una actitud <strong>empática</strong>, responsable y comprometida. Me enfrento a cualquier desafío con el objetivo de crear soluciones eficientes y estéticamente cuidadas.",
            "pixel-description-2": "Me enfoco en el <strong>crecimiento continuo</strong> de mis competencias técnicas para optimizar tanto la experiencia de usuario (UX) como el diseño de interfaces (UI) en cada proyecto.",
            "soft-skills-title": "Habilidades blandas",
            "soft-skills-description-1": "En un entorno profesional en constante cambio, las <strong>habilidades blandas</strong> son esenciales para generar conexiones, impulsar la colaboración y gestionar proyectos de manera eficaz.",
            "soft-skills-description-2": "Más allá de las habilidades técnicas, el desarrollo de estas competencias permite adaptarse con agilidad y liderar con éxito.",
            "education-title": "Educación",
            "education-highlight": "Estudiante de Ingeniería en Sistemas Informáticos",
            "education-description": "Actualmente, curso mi cuarto año en la UNICAES, donde estoy desarrollando competencias en programación, arquitectura de sistemas y bases de datos. Estoy trabajando en proyectos de forma independiente para practicar y fortalecer mis habilidades en el campo.",
            "hobbies-title": "Gustos y pasatiempos",
            "hobby-games": "❤️ Juegos",
            "skill-flexibility": "Flexibilidad",
            "skill-creativity": "Creatividad",
            "skill-empathy": "Empatía",
            "skill-time-management": "Gestión del tiempo",
            "skill-adaptation": "Adaptación y tolerancia",
            "skill-continuous-learning": "Aprendizaje continuo",
            "skill-patience": "Paciencia",
            "skill-constructive-feedback": "Capacidad para aceptar críticas constructivas",
            "certificates-title": "Mis <span>Certificados</span>",
            "certificates-span": "Certificados",
            "certificate-1-title": "HTML y CSS para Principiantes",
            "certificate-1-provider": "Udemy",
            "certificate-1-date": "Certificación obtenida el <span>09/06/24</span>",
            "certificate-1-link": "Ver Certificado",
            "certificate-2-title": "Curso de Java - Nivel Básico",
            "certificate-2-provider": "Udemy",
            "certificate-2-date": "Certificación obtenida el <span>28/04/24</span>",
            "certificate-2-link": "Ver Certificado",
            "certificate-3-title": "Curso de Laravel 9",
            "certificate-3-provider": "Udemy",
            "certificate-3-date": "Certificación obtenida el <span>28/04/24</span>",
            "certificate-3-link": "Ver Certificado",
            "certificate-4-title": "Master Web & Mobile Design: Figma",
            "certificate-4-provider": "Udemy",
            "certificate-4-date": "Certificación obtenida el <span>20/06/2024</span>",
            "certificate-4-link": "Ver Certificado",
            "certificate-5-title": "Curso Profesional de Angular",
            "certificate-5-provider": "Codigo Facilito",
            "certificate-5-date": "Certificación obtenida el <span>29/10/24</span>",
            "certificate-5-link": "Ver Certificado",
            "certificate-6-title": "CSS3 Para Desarrollo Web",
            "certificate-6-provider": "Udemy",
            "certificate-6-date": "Certificación obtenida el <span>30/10/24</span>",
            "certificate-6-link": "Ver Certificado",
            "faq-title": "Preguntas <span>Frecuentes</span>",
            "question-1": "¿Cuál es tu experiencia en el desarrollo web?",
            "answer-1": "Estoy en las primeras etapas de mi carrera como desarrollador Front-end. Actualmente curso mi cuarto año de Ingeniería en Sistemas Informáticos en UNICAES, y he estado trabajando en proyectos independientes para mejorar mis habilidades en HTML, CSS y JavaScript.",
            "question-2": "¿Cuál es tu enfoque y especialidad en desarrollo?",
            "answer-2": "Me especializo en el desarrollo Front-end, donde disfruto combinando creatividad con habilidades para resolver problemas. Actualmente, estoy profundizando en herramientas como Angular y diseño UX/UI, con el objetivo de optimizar la experiencia del usuario en cada proyecto que realizo, buscando siempre un equilibrio entre funcionalidad y diseño atractivo.",
            "question-3": "¿Cómo abordas la resolución de problemas?",
            "answer-3": "Mi enfoque consiste en dividir el problema en partes más pequeñas, investigar soluciones y mantener siempre una actitud de aprendizaje. Me esfuerzo en comunicarme de forma clara y trabajar en equipo cuando sea necesario.",
            "question-4": "¿Cómo te mantienes actualizado con las nuevas tecnologías en desarrollo web?",
            "answer-4": "Me gusta estar al tanto de las últimas tendencias en desarrollo web mediante la lectura de blogs y artículos, participación en comunidades de desarrolladores y cursos online. Además, me aseguro de practicar regularmente con nuevas herramientas y frameworks como Angular, lo que me permite mantenerme actualizado y mejorar continuamente mis habilidades.",
            "question-5": "¿Qué tecnologías estás aprendiendo o utilizando?",
            "answer-5": "Actualmente estoy enfocándome en HTML, CSS, JavaScript y Angular, los cuales utilizo activamente en mis proyectos. También estoy explorando herramientas como Git y GitHub para la gestión eficiente de proyectos y el control de versiones, mejorando mis flujos de trabajo y colaboraciones.",
            "question-6": "¿Qué te motiva a seguir aprendiendo en desarrollo web?",
            "answer-6": "Me motiva la posibilidad de crear experiencias digitales únicas. Cada nuevo desafío es una oportunidad para mejorar mis habilidades y aprender nuevas tecnologías. Disfruto de la mezcla entre creatividad y técnica que ofrece el desarrollo web.",
            "question-7": "¿Tienes algún interés o pasatiempo fuera del desarrollo web?",
            "answer-7": "Me apasiona la música, los videojuegos, especialmente Pokémon, y leer mangas. Estos pasatiempos no solo me permiten relajarme, sino también encontrar inspiración creativa para mis proyectos. Además, disfruto pasar tiempo con mi familia y amigos, lo que me ayuda a mantener un buen equilibrio entre el trabajo y el ocio.",
            "contact-title": "Contacta <span>Conmigo</span>",
            "contact-form-title": "Ponte en contacto",
            "contact-submit": "Enviar <i class='bx bxs-send'></i>",
            "footer-text": "Desarrollado por TechCea"
        },
        en: {
            "nav-home": "Home",
            "nav-projects": "Projects",
            "nav-about": "About me",
            "main-title": "Let's go to see my portfolio!",
            "main-description": "I love what I do because it allows me to combine my creativity with visual communication skills and problem-solving ability.",
            "projects-title": "Major <span>Projects</span>",
            "studies-title": "Studies",
            "studies-description": "Systems Engineering student at Universidad Católica de El Salvador (UNICAES)",
            "download-cv": "Download CV",
            "scrum-title": "Scrum Methodology",
            "scrum-text": "For project development, I use Scrum methodologies.",
            "contact-tag-text": "Contact",
            "contact-description": "Creating unique digital experiences.<br>Let's talk about your next project!",
            "contact-email": "Send me an Email",
            "contact-telegram": "DM on Telegram",
            "tittle-hey": "Hey I'm",
            "pixel-status": "Available for new projects",
            "pixel-title": "Systems Engineer",
            "pixel-specialty": "Web Applications",
            "banner-text": "Welcome to my creative space!",
            "about-title": "<span class='emoji'>👈</span> Projects I'm Working On",
            "about-description": "Throughout my career, I've been developing innovative and challenging projects that you can explore to learn more about my work and the solutions I've created.<br><strong>Discover what I'm working on now and how these projects are bringing my ideas to life!</strong>",
            "skills-title": "Mis <span>Habilidades</span>",
            "DataBase": "DataBase",
            "Tools": "Tools",
            "wrapper-header": "Do you have a project?",
            "wrapper-subtext": "Let's work together",
            "aboutTitle": "About <span>Me</span>",
            "profileInfo-header": "{ Front-End Developer }",
            "profileInfo-intro": "My name is <strong>Carlos Javier Cea</strong>, but my friends call me <strong>Javi</strong>. I entered this dynamic field unexpectedly but soon found great satisfaction in creating interfaces, websites, and interactive digital experiences.",
            "profileInfo-skillset": "Although I am still in the process of becoming a professional, I am dedicating time and effort to developing <span class='highlight'>skills in HTML, CSS, JavaScript, and Angular</span> while better understanding the <span class='highlight'>principles of design and user experience</span>.",
            "profileInfo-growth": "I am focused on growing as a <span class='highlight'>future Front-End developer</span>, seeking opportunities to learn and contribute to <span class='highlight'>innovative digital solutions</span>. <span class='highlight'>I have a passion for music</span>, which enhances my concentration and creativity. <span class='highlight'>I consider myself a quick learner</span>, detail-oriented, and committed, and I <span class='highlight'>value the lessons learned</span> through experience.",
            "soft-pixel-title": "UX/UI Engineer",
            "pixel-description-1": "Passionate about technology, with an <strong>empathetic</strong>, responsible, and committed attitude. I tackle any challenge with the goal of creating efficient and aesthetically pleasing solutions.",
            "pixel-description-2": "I focus on <strong>continuous growth</strong> of my technical skills to optimize both user experience (UX) and interface design (UI) in every project.",
            "soft-skills-title": "Soft Skills",
            "soft-skills-description-1": "In an ever-changing professional environment, <strong>soft skills</strong> are essential to build connections, drive collaboration, and manage projects effectively.",
            "soft-skills-description-2": "Beyond technical skills, developing these competencies allows for agility and successful leadership.",
            "education-title": "Education",
            "education-highlight": "Systems Engineering Student",
            "education-description": "Currently in my fourth year at UNICAES, I am developing skills in programming, systems architecture, and databases. I work on independent projects to practice and strengthen my abilities in the field.",
            "hobbies-title": "Hobbies and Interests",
            "hobby-games": "❤️ Games",
            "skill-flexibility": "Flexibility",
            "skill-creativity": "Creativity",
            "skill-empathy": "Empathy",
            "skill-time-management": "Time management",
            "skill-adaptation": "Adaptation and tolerance",
            "skill-continuous-learning": "Continuous learning",
            "skill-patience": "Patience",
            "skill-constructive-feedback": "Ability to accept constructive feedback",
            "certificates-title": "My <span>Certificates</span>",
            "certificates-span": "Certificates",
            "certificate-1-title": "HTML and CSS for Beginners",
            "certificate-1-provider": "Udemy",
            "certificate-1-date": "Certification obtained on <span>09/06/24</span>",
            "certificate-1-link": "View Certificate",
            "certificate-2-title": "Java Course - Beginner Level",
            "certificate-2-provider": "Udemy",
            "certificate-2-date": "Certification obtained on <span>28/04/24</span>",
            "certificate-2-link": "View Certificate",
            "certificate-3-title": "Laravel 9 Course",
            "certificate-3-provider": "Udemy",
            "certificate-3-date": "Certification obtained on <span>28/04/24</span>",
            "certificate-3-link": "View Certificate",
            "certificate-4-title": "Master Web & Mobile Design: Figma",
            "certificate-4-provider": "Udemy",
            "certificate-4-date": "Certification obtained on <span>20/06/2024</span>",
            "certificate-4-link": "View Certificate",
            "certificate-5-title": "Professional Angular Course",
            "certificate-5-provider": "Codigo Facilito",
            "certificate-5-date": "Certification obtained on <span>29/10/24</span>",
            "certificate-5-link": "View Certificate",
            "certificate-6-title": "CSS3 For Web Development",
            "certificate-6-provider": "Udemy",
            "certificate-6-date": "Certification obtained on <span>30/10/24</span>",
            "certificate-6-link": "View Certificate",
            "faq-title": "Frequently <span>Asked Questions</span>",
            "question-1": "What is your experience in web development?",
            "answer-1": "I am in the early stages of my career as a Front-end developer. I am currently in my fourth year of Systems Engineering at UNICAES, and I have been working on independent projects to improve my skills in HTML, CSS, and JavaScript.",
            "question-2": "What is your focus and specialty in development?",
            "answer-2": "I specialize in Front-end development, where I enjoy combining creativity with problem-solving skills. Currently, I am delving into tools like Angular and UX/UI design, aiming to optimize the user experience in every project I work on, always seeking a balance between functionality and attractive design.",
            "question-3": "How do you approach problem-solving?",
            "answer-3": "My approach is to break down the problem into smaller parts, research solutions, and always maintain a learning attitude. I strive to communicate clearly and work in teams when necessary.",
            "question-4": "How do you stay up-to-date with new technologies in web development?",
            "answer-4": "I like to stay on top of the latest web development trends by reading blogs and articles, participating in developer communities, and taking online courses. Additionally, I make sure to practice regularly with new tools and frameworks like Angular, which helps me stay up-to-date and continually improve my skills.",
            "question-5": "What technologies are you learning or using?",
            "answer-5": "Currently, I am focusing on HTML, CSS, JavaScript, and Angular, which I actively use in my projects. I am also exploring tools like Git and GitHub for efficient project management and version control, improving my workflows and collaborations.",
            "question-6": "What motivates you to keep learning in web development?",
            "answer-6": "I am motivated by the possibility of creating unique digital experiences. Every new challenge is an opportunity to improve my skills and learn new technologies. I enjoy the blend of creativity and technique that web development offers.",
            "question-7": "Do you have any interests or hobbies outside of web development?",
            "answer-7": "I am passionate about music, video games, especially Pokémon, and reading mangas. These hobbies not only allow me to relax but also inspire creativity for my projects. Additionally, I enjoy spending time with my family and friends, which helps me maintain a good balance between work and leisure.",
            "contact-title": "Contact <span>Me</span>",
            "contact-form-title": "Get in touch",
            "contact-submit": "Submit <i class='bx bxs-send'></i>",
            "footer-text": "Developed by TechCea"
        }
    };

    for (const [id, text] of Object.entries(translations[lang])) {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = text; // Usa innerHTML para incluir etiquetas como <span>
        }
    }
}

// Listeners para los botones
document.getElementById('btn-es').addEventListener('click', () => changeLanguage('en'));
document.getElementById('btn-en').addEventListener('click', () => changeLanguage('es'));

// Carga el idioma seleccionado al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'es';
    changeLanguage(savedLang);
});


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




const openBtn = document.querySelector(".openMenu");
const closeBtn = document.querySelector(".closeMenu");
const navbar = document.querySelector(".navbar");

function ajustarVisibilidadMenu() {
    if (window.innerWidth > 768) {
        navbar.classList.remove("visible", "hidden");
        openBtn.style.display = "none";
    } else {
        navbar.classList.add("hidden");
        navbar.classList.remove("visible");
        openBtn.style.display = "block";
    }
}

ajustarVisibilidadMenu();

openBtn.addEventListener("click", () => {
    navbar.classList.remove("hidden");
    navbar.classList.add("visible");
    openBtn.style.display = "none";
});

closeBtn.addEventListener("click", () => {
    navbar.classList.add("hidden");
    navbar.classList.remove("visible");
    openBtn.style.display = "block";
});

window.addEventListener("resize", ajustarVisibilidadMenu);


