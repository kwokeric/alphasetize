const controller = {
    isInsideCircle({ mouse, img, radius }) {
        const _radius = radius || img.clientHeight / 2;
        const imgRadius = img.clientHeight / 2;
        const imgCenterTop = img.offsetTop + imgRadius;
        const imgCenterLeft = img.offsetLeft + imgRadius;

        const parentOffsetTop = img.offsetParent
            ? img.offsetParent.offsetTop
            : 0;
        const parentOffsetLeft = img.offsetParent
            ? img.offsetParent.offsetLeft
            : 0;

        const mouseTop = mouse.pageY;
        const mouseLeft = mouse.pageX;

        const distanceMouseFromImgCenter = Math.sqrt(
            (imgCenterTop + parentOffsetTop - mouseTop) ** 2 +
                (imgCenterLeft + parentOffsetLeft - mouseLeft) ** 2
        );

        return distanceMouseFromImgCenter <= _radius;
    },
    isMouseInsideCircle({ mouse, img }) {
        return controller.isInsideCircle({ mouse, img });
    },
    getSection({ mouse, img }) {
        const { hour, rotation } = controller.getHourPosition({ mouse, img });
        const ring = controller.getRingPosition({ mouse, img });
        return { hour, rotation, ring };
    },
    getHourPosition({ mouse, img }) {
        const imgRadius = img.clientHeight / 2;
        const imgCenterY = img.offsetTop + imgRadius;
        const imgCenterX = img.offsetLeft + imgRadius;

        const parentOffsetY = img.offsetParent ? img.offsetParent.offsetTop : 0;
        const parentOffsetX = img.offsetParent
            ? img.offsetParent.offsetLeft
            : 0;

        const mouseY = mouse.pageY;
        const mouseX = mouse.pageX;

        const angleFromNegativeX =
            (Math.atan2(
                imgCenterY + parentOffsetY - mouseY,
                imgCenterX + parentOffsetX - mouseX
            ) *
                180) /
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
            return { hour: 12, rotation: 0 };
        } else if (angleFromTop - 15 < 30) {
            return { hour: 1, rotation: 30 };
        } else if (angleFromTop - 15 < 60) {
            return { hour: 2, rotation: 60 };
        } else if (angleFromTop - 15 < 90) {
            return { hour: 3, rotation: 90 };
        } else if (angleFromTop - 15 < 120) {
            return { hour: 4, rotation: 120 };
        } else if (angleFromTop - 15 < 150) {
            return { hour: 5, rotation: 150 };
        } else if (angleFromTop - 15 < 180) {
            return { hour: 6, rotation: 180 };
        } else if (angleFromTop - 15 < 210) {
            return { hour: 7, rotation: 210 };
        } else if (angleFromTop - 15 < 240) {
            return { hour: 8, rotation: 240 };
        } else if (angleFromTop - 15 < 270) {
            return { hour: 9, rotation: 270 };
        } else if (angleFromTop - 15 < 300) {
            return { hour: 10, rotation: 300 };
        } else if (angleFromTop - 15 < 330) {
            return { hour: 11, rotation: 330 };
        } else {
            return { hour: 12, rotation: 0 };
        }
    },
    getRingPosition({ mouse, img }) {
        const EYE_RADIUS = img.width / 6.1;
        const INNER_RADIUS = img.width / 2.86;

        if (controller.isInsideCircle({ mouse, img, radius: EYE_RADIUS })) {
            return false;
        } else if (
            controller.isInsideCircle({ mouse, img, radius: INNER_RADIUS })
        ) {
            return 'A';
        } else {
            return 'B';
        }
    }
};

export default controller;
