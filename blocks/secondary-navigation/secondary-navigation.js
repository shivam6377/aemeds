// Create the main container for secondary navigation
const secondaryNavWrapper = document.createElement('div');
secondaryNavWrapper.classList.add('secondary-navigation-wrapper');

// Create the secondary navigation block
const secondaryNavBlock = document.createElement('div');
secondaryNavBlock.classList.add('secondary-navigation', 'block');
secondaryNavBlock.setAttribute('data-block-name', 'secondary-navigation');
secondaryNavBlock.setAttribute('data-block-status', 'loaded');

// Add the logo section
const logoContainer = document.createElement('div');
const logoDiv = document.createElement('div');
const logoPicture = document.createElement('picture');
const logoImg = document.createElement('img');
logoImg.src = '/content/dam/xwalk-shivam/content-at-scale.png';
logoImg.setAttribute('data-aue-prop', 'grand_vitara_logo');
logoImg.setAttribute('data-aue-label', 'Grand Vitara Logo');
logoImg.setAttribute('data-aue-type', 'media');

const logoAltText = document.createElement('p');
logoAltText.textContent = 'Logo grand vitara';
logoAltText.setAttribute('data-aue-prop', 'grand_vitara_logoalt');
logoAltText.setAttribute('data-aue-label', 'Grand Vitara Alt Text');
logoAltText.setAttribute('data-aue-type', 'text');

logoPicture.appendChild(logoImg);
logoDiv.appendChild(logoPicture);
logoDiv.appendChild(logoAltText);
logoContainer.appendChild(logoDiv);
secondaryNavBlock.appendChild(logoContainer);

// Function to create CTA buttons
const createCtaButton = (title, text) => {
    const ctaDiv = document.createElement('div');
    const buttonContainer = document.createElement('p');
    buttonContainer.classList.add('button-container');
    const ctaLink = document.createElement('a');
    ctaLink.href = '#';
    ctaLink.classList.add('button');
    ctaLink.title = title;
    ctaLink.textContent = text;
    ctaLink.setAttribute('data-aue-prop', 'ctaLinkText');
    ctaLink.setAttribute('data-aue-label', 'CTA Text');
    ctaLink.setAttribute('data-aue-type', 'text');
    buttonContainer.appendChild(ctaLink);
    ctaDiv.appendChild(buttonContainer);
    return ctaDiv;
};

// Add CTA buttons
const ctaButtons = [
    { title: 'Hlighlights', text: 'Hlighlights' },
    { title: 'Build Your own ', text: 'Build Your own ' },
    { title: 'Variants', text: 'Variants' },
    { title: 'specs', text: 'specs' },
    { title: 'Pricing', text: 'Pricing' },
];

ctaButtons.forEach(cta => {
    const ctaButton = createCtaButton(cta.title, cta.text);
    secondaryNavBlock.appendChild(ctaButton);
});

// Append the secondary navigation block to the wrapper
secondaryNavWrapper.appendChild(secondaryNavBlock);

// Finally, append the entire secondary navigation to the body or a specific container
document.body.appendChild(secondaryNavWrapper);

// Alternatively, append to a specific container
// document.getElementById('your-container-id').appendChild(secondaryNavWrapper);
