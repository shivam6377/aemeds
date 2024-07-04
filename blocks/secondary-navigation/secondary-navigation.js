function createLogoHTML(component) {
    const logoImg = component.querySelector('[data-aue-prop="grand_vitara_logo"]');
    const logoAltText = component.querySelector('[data-aue-prop="grand_vitara_logoalt"]');
    
    if (!logoImg || !logoAltText) return '';
    
    return `
      <div>
        <div>
          <picture><img src="${logoImg.src}" data-aue-prop="grand_vitara_logo" data-aue-label="Grand Vitara Logo" data-aue-type="media"></picture>
          <p data-aue-prop="grand_vitara_logoalt" data-aue-label="Grand Vitara Alt Text" data-aue-type="text">${logoAltText.innerText}</p>
        </div>
      </div>
    `;
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

    console.log("Logo Component", logoComponent);
    console.log("ctaas", ctas);
  
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
  