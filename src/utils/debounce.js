const debounce = (fn, t) => {
    let timeout;

    return () => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            fn();
        }, t);
    };
};

export default debounce;
