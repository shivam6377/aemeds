export default function decorate(block) {
    const [bg, fg] = block.childern;
    bg.className = 'bg';
    fg.className = 'fg';
}
