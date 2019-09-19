const controller = {
    isInsideCircle({ mouse, img, radius }) {
        const _radius = radius || img.clientHeight / 2;
        const imgRadius = img.clientHeight / 2;
        const imgCenterTop = img.offsetTop + imgRadius;
        const imgCenterLeft = img.offsetLeft + imgRadius;

        const mouseTop = mouse.pageY;
        const mouseLeft = mouse.pageX;

        const distanceMouseFromImgCenter = Math.sqrt(
            (imgCenterTop - mouseTop) ** 2 + (imgCenterLeft - mouseLeft) ** 2
        );

        return distanceMouseFromImgCenter <= _radius;
    },
    isMouseInsideCircle({ mouse, img }) {
        return controller.isInsideCircle({ mouse, img });
    },
    getSection({ mouse, img }) {
        const hour = controller.getHourPosition({ mouse, img });
        const ring = controller.getRingPosition({ mouse, img });
        return { hour, ring };
    },
    getHourPosition({ mouse, img }) {
        const imgRadius = img.clientHeight / 2;
        const imgCenterY = img.offsetTop + imgRadius;
        const imgCenterX = img.offsetLeft + imgRadius;

        const mouseY = mouse.pageY;
        const mouseX = mouse.pageX;

        const angleFromNegativeX =
            (Math.atan2(imgCenterY - mouseY, imgCenterX - mouseX) * 180) /
            Math.PI;
        const threeSixtyFromNegativeX =
            angleFromNegativeX > 0
                ? angleFromNegativeX
                : 360 + angleFromNegativeX;
        const angleFromTop =
            threeSixtyFromNegativeX - 90 >= 0
                ? threeSixtyFromNegativeX - 90
                : 270 + threeSixtyFromNegativeX;

        if (angleFromTop - 15 < 0) {
            return 12;
        } else if (angleFromTop - 15 < 30) {
            return 1;
        } else if (angleFromTop - 15 < 60) {
            return 2;
        } else if (angleFromTop - 15 < 90) {
            return 3;
        } else if (angleFromTop - 15 < 120) {
            return 4;
        } else if (angleFromTop - 15 < 150) {
            return 5;
        } else if (angleFromTop - 15 < 180) {
            return 6;
        } else if (angleFromTop - 15 < 210) {
            return 7;
        } else if (angleFromTop - 15 < 240) {
            return 8;
        } else if (angleFromTop - 15 < 270) {
            return 9;
        } else if (angleFromTop - 15 < 300) {
            return 10;
        } else if (angleFromTop - 15 < 330) {
            return 11;
        } else {
            return 12;
        }
    },
    getRingPosition({ mouse, img }) {
        const eyeRadius = 50;
        const innerRadius = 110;

        if (controller.isInsideCircle({ mouse, img, radius: eyeRadius })) {
            return false;
        } else if (
            controller.isInsideCircle({ mouse, img, radius: innerRadius })
        ) {
            return 'A';
        } else {
            return 'B';
        }
    }
};

export default controller;
