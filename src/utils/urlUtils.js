const urlUtils = {
    getUrlParams() {
        let urlParams = {};
        let e,
            r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);

        while ((e = r.exec(q))) {
            urlParams[e[1]] = decodeURIComponent(e[2]);
        }

        return urlParams;
    }
};

export default urlUtils;
