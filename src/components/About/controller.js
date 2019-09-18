const controller = {
    isMouseInsideImage({ mouse, img }) {
        const imageTop = img.offsetTop;
        const imageLeft = img.offsetLeft;
        const imageBottom = imageTop + img.clientHeight;
        const imageRight = imageLeft + img.clientWidth;
        const mouseTop = mouse.pageY;
        const mouseLeft = mouse.pageX;
        return (
            mouseTop >= imageTop &&
            mouseTop <= imageBottom &&
            mouseLeft >= imageLeft &&
            mouseLeft <= imageRight
        );
    }
};

export default controller;
