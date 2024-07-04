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
button.innerHTML=newButton.outerHTML;
        // Append the new <a> element to buttonsContainer
        buttonsContainer.appendChild(button);
    });

    return buttonsContainer;
}

document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to the clicked button
            button.classList.add('active');
        });
    });
});






  
  export default function decorate(block) {
    const [logoComponent, ...ctas] = block.children;
console.log("block", block);
    console.log("Logo Component", logoComponent);
    console.log("ctaas", ctas[0].outerHTML);
    const temp=createLogoHTML(logoComponent);


    const temp2=generateButtons(ctas);
   
  
  
  
    block.innerHTML = `
    <nav class="navbar">
    ${temp.outerHTML}
    
    ${temp2.outerHTML}
</nav>
       
    `;
  }
  