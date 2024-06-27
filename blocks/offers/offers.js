// Utility function to create elements with class
function createElementWithClass(tagName, classNames) {
    const element = document.createElement(tagName);
    if (classNames) {
        var classNamesArray = classNames.split(' ');
        classNamesArray.forEach(function(className) {
            element.classList.add(className); 
        });  
      
    }
    return element;
  }
  
  // Function to create and append CTA element with SVG image
  function createCTAElement(ctaText, ctaUrl) {
    const ctaLink = createElementWithClass('a', 'btn--link btn--link-primary');
    ctaLink.setAttribute('href', ctaUrl || '#');
  
    const span = document.createElement('span');
    const img = document.createElement('img');
    img.src = '/content/dam/xwalk-shivam/north_east.svg'; // Replace with your SVG image path
    span.appendChild(img);
  
    ctaLink.textContent = ctaText || 'View More';
    ctaLink.appendChild(span);
  
    return ctaLink;
  }
  
// Function to create teaser card with title, description, and action
function createTeaserCard(title, description, actionText, actionUrl, teaserClass) {
    const teaserContainer = createElementWithClass('div', 'light-teaser buyers-guide-teaser');
    const teaserCard = createElementWithClass('div', `teaser__card ${teaserClass}`);
    const teaserContent = createElementWithClass('div', 'teaser__content');
    const teaserInfo = createElementWithClass('div', 'teaser__info');
    const teaserTitle = createElementWithClass('div', 'teaser__title');
    const h3 = document.createElement('h3');
    h3.textContent = title || '';
  
    const teaserDescription = createElementWithClass('div', 'teaser__description');
    teaserDescription.innerHTML = `<p>${description || ''}</p>`;
  
    const teaserActions = createElementWithClass('div', 'teaser__actions');
    const actionLink = document.createElement('a');
    actionLink.setAttribute('href', actionUrl || '#');
    actionLink.setAttribute('title', actionUrl || '#');
    actionLink.classList.add('button', 'primary__btn');
    actionLink.setAttribute('target', '_blank');
    actionLink.textContent = actionText || 'Know More';
  
    teaserTitle.appendChild(h3);
    teaserInfo.appendChild(teaserTitle);
    teaserInfo.appendChild(teaserDescription);
    teaserActions.appendChild(actionLink);
  
    teaserContent.appendChild(teaserInfo);
    teaserContent.appendChild(teaserActions);
    teaserCard.appendChild(teaserContent);
    teaserContainer.appendChild(teaserCard);
  
    return teaserContainer;
  }
  
  function extractBlockChildren(block){
    const [component, card1, card2, card3, card4] = block.children;

    return{
      component,
      card1,
      card2,
      card3,
      card4
    }
  }

  function extractElementFromBlock(block, selector){
    return block.querySelector(selector);
  }


  
  // Function to build the HTML structure
  function buildStructure(block) {

    const blockChilren = extractBlockChildren(block);
    console.log("BlockChilren:", blockChilren);

    const section = createElementWithClass('section', 'deals-offers-container');
    const wrapper = createElementWithClass('div', 'immersive__wrapper-light');
    const contentDiv = createElementWithClass('div', 'immersive__content');
    const actionDiv = createElementWithClass('div', 'immersive__action-btn');
  
    // Add main content
    const h2 = document.createElement('h2');
    h2.textContent = 'Exciting offers and deals for you!';
    const p = document.createElement('p');
    p.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet.';
    contentDiv.appendChild(h2);
    contentDiv.appendChild(p);
  
    // Add CTA button
    const ctaElement = createCTAElement('View More', '#');
    actionDiv.appendChild(ctaElement);
  
    // Create sub-container
    const subContainer = createElementWithClass('div', 'sub-container');
    const leftContainer = createElementWithClass('div', 'left-container');
    const leftImg = document.createElement('img');
    leftImg.setAttribute('src', '/content/dam/xwalk-shivam/desktop-left-img.png');
    leftImg.setAttribute('alt', 'mobile img');
    leftContainer.appendChild(leftImg);
  
    const rightContainer = createElementWithClass('div', 'right-container');
  
    // Right container card 1
    const rightCard1 = createElementWithClass('div', 'right-container__card-1');
    const img1 = document.createElement('img');
    img1.setAttribute('src', '/content/dam/xwalk-shivam/mobile-image.png');
    img1.setAttribute('alt', 'mobile img');
    const content1 = createElementWithClass('div', 'right-container__content');

    const innerContent1 = createElementWithClass('div', 'immersive__content');
    const strong = document.createElement('strong');
    strong.textContent = 'Lorem Ipsum';
    innerContent1.appendChild(strong);
    
    const p1 = document.createElement('p');
    p1.textContent = 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet lorem ipsum.';
    innerContent1.appendChild(p1);
    
    const action1 = createElementWithClass('div', 'immersive__action');
    const a1 = document.createElement('a');
    a1.setAttribute('href', '#');
    a1.setAttribute('title', '#');
    a1.classList.add('button', 'primary__btn');
    a1.setAttribute('target', '_self');
    a1.textContent = 'Get Exchange';

    action1.appendChild(a1);
    innerContent1.appendChild(action1);

    content1.appendChild(innerContent1);
    rightCard1.appendChild(img1);
    rightCard1.appendChild(content1);
    
    // Right container sub-container
    const rightSubContainer = createElementWithClass('div', 'right-container-subcontainer');
  
    // Right container card 2
    const rightCard2 = createElementWithClass('div', 'right-container__card-2');
    const teaserCard2 = createTeaserCard('Lorem Ipsum', 'Lorem ipsum dolor sit amet lorem ipsum dolor.', 'Know More', 'https://google.com', 'teaser-light');
    rightCard2.appendChild(teaserCard2);
  
    // Right container card 3
    const rightCard3 = createElementWithClass('div', 'right-container__card-3');
    const teaserCard3 = createTeaserCard('Lorem Ipsum', 'Lorem ipsum dolor sit amet lorem ipsum dolor.', 'Know More', 'https://google.com', 'teaser-dark');
    rightCard3.appendChild(teaserCard3);
  
    rightSubContainer.appendChild(rightCard2);
    rightSubContainer.appendChild(rightCard3);
  
    rightContainer.appendChild(rightCard1);
    rightContainer.appendChild(rightSubContainer);
  
    subContainer.appendChild(leftContainer);
    subContainer.appendChild(rightContainer);
  
    wrapper.appendChild(contentDiv);
    wrapper.appendChild(actionDiv);
    wrapper.appendChild(subContainer);
  
    section.appendChild(wrapper);
  
    return section;
  }
  
  // Main decorate function that orchestrates element extraction and structure building
  export default function decorate(block) {
    const generatedHTML = buildStructure(block);
  
    // Append the generated HTML structure to the block
    block.appendChild(generatedHTML);
  
    // Return or log if needed
    console.log("Generated HTML Structure:", generatedHTML.outerHTML);
  }