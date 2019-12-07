export const loadWebComponent = (src): Promise<void> => {
    return new Promise((resolve, reject) => {
        const node = document.createElement('script');
        node.src = src;
        node.type = 'text/javascript';
        node.async = false;
        document.getElementsByTagName('head')[0].appendChild(node);
        setTimeout(() => {
            resolve();
        }, 2000);
    });
};