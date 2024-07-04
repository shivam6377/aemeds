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
        // Find the <a> tag inside the button element
        let a = button.querySelector('[data-aue-prop="ctaLinkText"]');
        
        // Create a new <a> element with appropriate classes
        const newButton = document.createElement('a');
        newButton.href = a.href; // Set href if needed
        newButton.textContent = a.textContent; // Copy text content
        
        // Add classes based on index (assuming first button should be active)
        if (index === 0) {
            newButton.classList.add('nav-button', 'active');
        } else {
            newButton.classList.add('nav-button');
        }

        // Append the new <a> element to buttonsContainer
        buttonsContainer.appendChild(newButton);
    });

    return buttonsContainer;
}


// Example usage:



  function createCtaButtonHTML(component) {
    const ctaLinkText = component.querySelector('[data-aue-prop="ctaLinkText"]');
    
    if (!ctaLinkText) return '';
    
    return `
      <div>
        <p class="button-container">
          <a href="#" data-aue-prop="ctaLinkText" data-aue-label="CTA Text" data-aue-type="text" title="${ctaLinkText.title}" class="button">${ctaLinkText.innerText}</a>
        </p>
      </div>
    `;
  }
  
  export default function decorate(block) {
    const [logoComponent, ...ctas] = block.children;
console.log("block", block);
    console.log("Logo Component", logoComponent);
    console.log("ctaas", ctas[0].outerHTML);
    const temp=createLogoHTML(logoComponent);


    const temp2=generateButtons(ctas);
   
  
    // const logoHTML = logoComponent ? createLogoHTML(logoComponent) : '';
    // const ctaHTML = ctas.map(cta => createCtaButtonHTML(cta)).join('');
  
    block.innerHTML = `
    <nav class="navbar">
    ${temp.outerHTML}
    
    ${temp2.outerHTML}
</nav>
       
    `;
  }
  