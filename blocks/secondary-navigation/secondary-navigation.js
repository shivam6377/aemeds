function createLogoHTML(component) {
    const logoImg = component.querySelector('[data-aue-prop="grand_vitara_logo"]');

    const ImgContainer = document.createElement('div');
    ImgContainer.classList.add('logo-container');

    const picture = document.createElement('picture');
    picture.appendChild(logoImg);
    ImgContainer.appendChild(picture);

    return ImgContainer;
}

function generateButtons(buttons) {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    buttons.forEach((button, index) => {
        const a = button.querySelector('[data-aue-prop="ctaLinkText"]');
        const newButton = document.createElement('a');
        newButton.href = a.href;
        newButton.textContent = a.textContent;

        if (index === 0) {
            newButton.classList.add('nav-button', 'active');
        } else {
            newButton.classList.add('nav-button');
        }

        buttonsContainer.appendChild(newButton);
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

    const logoHTML = createLogoHTML(logoComponent);
    const buttonsHTML = generateButtons(ctas);

    block.innerHTML = `
        <nav class="navbar">
            ${logoHTML.outerHTML}
            ${buttonsHTML.outerHTML}
        </nav>
    `;

    const navButtons = block.querySelectorAll('.nav-button');
    setupNavButtons(navButtons);
}
