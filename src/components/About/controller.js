const controller = {
    isMouseInsideImage({ mouse, img }) {
        const imgRadius = img.clientHeight / 2;
        const imgCenterTop = img.offsetTop + imgRadius;
        const imgCenterLeft = img.offsetLeft + imgRadius;

        const mouseTop = mouse.pageY;
        const mouseLeft = mouse.pageX;

        const distanceMouseFromImgCenter = Math.sqrt(
            (imgCenterTop - mouseTop) ** 2 + (imgCenterLeft - mouseLeft) ** 2
        );

        return distanceMouseFromImgCenter <= imgRadius;
    }
};

export default controller;
