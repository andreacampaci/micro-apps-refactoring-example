export const loadWebComponent = (url: string, $state): Promise<void> => {
    return new Promise((resolve, reject) => {
        const node = document.createElement('script');
        const hasComponentsAlreadyLoad = $state.getters.hasComponentsAlreadyLoad(url) as boolean;
        if (hasComponentsAlreadyLoad) {
            resolve();
        } else {
            node.src = url;
            node.type = 'text/javascript';
            node.async = false;
            document.getElementsByTagName('head')[0].appendChild(node);
            $state.dispatch('componentsLazy', url);
            setTimeout(() => {
                resolve();
            }, 1500);
        }
    });
};