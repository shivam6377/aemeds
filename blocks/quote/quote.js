export default function decorate(block) {
    const [quoteWrapper, quoteWrapper2] = block.children;
  
    const blockquote = document.createElement('blockquote');
    blockquote.textContent = quoteWrapper.textContent.trim();
    quoteWrapper.replaceChildren(blockquote);

    const blockquote2 = document.createElement('blockquote');
    blockquote2.textContent = quoteWrapper2.textContent.trim();
    quoteWrapper2.replaceChildren(blockquote2);
  }
  