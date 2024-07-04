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

    buttons.forEach(button =>
        buttonsContainer.appendChild(button)
        
   );

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
    console.log("ctaas", ctas);
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
  