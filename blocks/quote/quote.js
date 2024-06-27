export default function decorate(block) {
    const [quoteWrapper, quoteWrapper2] = block.children;
  
    const blockquote = document.createElement('blockquote');
    blockquote.textContent = "hello";
    quoteWrapper.replaceChildren(blockquote);

    const blockquote2 = document.createElement('blockquote');
    blockquote2.textContent = "Hi";
    quoteWrapper2.replaceChildren(blockquote2);
  }
  