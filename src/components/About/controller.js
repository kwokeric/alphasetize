const controller = {
    isMouseInsideImage({ e, img }) {
        const imageTop = img.offsetTop;
        const imageLeft = img.offsetLeft;
        const imageBottom = imageTop + img.clientHeight;
        const imageRight = imageLeft + img.clientWidth;
        const mouseTop = e.pageY;
        const mouseLeft = e.pageX;
        return (
            mouseTop >= imageTop &&
            mouseTop <= imageBottom &&
            mouseLeft >= imageLeft &&
            mouseLeft <= imageRight
        );
    }
};

export default controller;
