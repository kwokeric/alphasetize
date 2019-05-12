const controller = {
    getMatches(index, list) {
        const currItem = list[index];
        const currCamKey = currItem.camKey || '';
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

        let perfectMatches = []; // same key
        let keyMatches = []; // key change
        let modeMatches = []; // mode change

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
    }
};

export default controller;
