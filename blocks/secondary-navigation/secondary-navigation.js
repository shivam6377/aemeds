function createLogoHTML(component) {
    const logoImg = component.querySelector('[data-aue-prop="grand_vitara_logo"]');
    
  const ImgContainer = document.createElement('div');
  ImgContainer.classList.add('logo-container');
    
  const picture = document.createElement('picture');
 picture.appendChild(logoImg);
    ImgContainer.appendChild(picture);
    return ImgContainer;
  }
  
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
    block.innerHTML=temp.outerHTML;
  
    // const logoHTML = logoComponent ? createLogoHTML(logoComponent) : '';
    // const ctaHTML = ctas.map(cta => createCtaButtonHTML(cta)).join('');
  
    // block.innerHTML = `
    //   <div class="secondary-navigation-wrapper">
    //     <div class="secondary-navigation block" data-block-name="secondary-navigation" data-block-status="loaded">
    //       ${logoHTML}
    //       ${ctaHTML}
    //     </div>
    //   </div>
    // `;
  }
  