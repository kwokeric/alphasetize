const cx = (...args) => {
    let result = [];

    args.forEach(arg => {
        if (!arg) {
            // do nothing
        } else if (typeof arg === 'string') {
            result.push(arg);
        } else if (typeof arg === 'object' && !(arg instanceof Array)) {
            Object.entries(arg).forEach(entry => {
                if (entry[1]) {
                    result.push(entry[0]);
                }
            });
        }
    });

    return result.join(' ');
};

export default cx;
