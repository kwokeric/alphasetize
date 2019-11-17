const controller = {
    getMatches(index, list) {
        const currItem = list[index];
        let perfectMatches = []; // same key
        let keyMatches = []; // key change
        let modeMatches = []; // mode change

        if (!currItem) {
            return { perfectMatches, keyMatches, modeMatches };
        }

        const currCamKey = currItem.camKey;
        const currCamNum = Number(currCamKey.slice(0, currCamKey.length - 1));
        const stepUp =
            (currCamNum + 1 === 13 ? 1 : currCamNum + 1) +
            currCamKey[currCamKey.length - 1];
        const stepDown =
            (currCamNum - 1 === 0 ? 12 : currCamNum - 1) +
            currCamKey[currCamKey.length - 1];
        const stepSide =
            currCamNum +
            (currCamKey[currCamKey.length - 1] === 'A' ? 'B' : 'A');

        list.forEach((track, idx) => {
            if (idx === index) {
                // do nothing
            } else if (track.camKey === currCamKey) {
                perfectMatches.push(idx);
            } else if (track.camKey === stepUp || track.camKey === stepDown) {
                keyMatches.push(idx);
            } else if (track.camKey === stepSide) {
                modeMatches.push(idx);
            }
        });

        return { perfectMatches, keyMatches, modeMatches };
    },
    hasListChanged(list1, list2) {
        if (list1.length !== list2.length) {
            return true;
        }

        for (let i = 0; i < list1.length; i++) {
            if (list1[i] !== list2[i]) return true;
        }
        return false;
    }
};

export default controller;
