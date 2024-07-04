function createLogoHTML(component) {
    const logoImg = component.querySelector('[data-aue-prop="grand_vitara_logo"]');
    
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('logo-container');
    
    if (logoImg) {
        const picture = document.createElement('picture');
        picture.appendChild(logoImg.cloneNode(true));
        imgContainer.appendChild(picture);
    }
    
    return imgContainer;
}

function generateButtons(buttons) {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    buttons.forEach((button, index) => {
        let a = button.querySelector('[data-aue-prop="ctaLinkText"]');
        
        if (a) {
            const newButton = document.createElement('a');
            newButton.href = a.href;
            newButton.textContent = a.textContent;
            
            if (index === 0) {
                newButton.classList.add('nav-button', 'active');
            } else {
                newButton.classList.add('nav-button');
            }

            button.innerHTML = newButton.outerHTML;
            buttonsContainer.appendChild(button);
        }
    });

    return buttonsContainer;
}

function setupNavButtons(navButtons) {
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

export default function decorate(block) {
    const [logoComponent, ...ctas] = block.children;

    const temp = createLogoHTML(logoComponent);
    const temp2 = generateButtons(ctas);

    block.innerHTML = `
        <nav class="navbar">
            ${temp.outerHTML}
            ${temp2.outerHTML}
        </nav>
    `;

    const navbarButtons = block.querySelectorAll('.nav-button');    
    setupNavButtons(navbarButtons);
}
