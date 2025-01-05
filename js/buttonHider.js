const BLACKLISTED_ARIA_LABELS = new Set([
    'grok',
    'lists',
    'jobs',
    'communities',
    'premium',
    'verified orgs',
]);

const observer = new MutationObserver(() => {
    removeTheButtonsWithSwag();
});
observer.observe(document, { childList: true, subtree: true });

function removeTheButtonsWithSwag() {
    const pageNavs = document.getElementsByTagName('nav');
    for (let i = 0; i < pageNavs.length; i++) {
        const navChild = pageNavs[i];
        const navChildChildren = navChild.children;
        if (!(navChildChildren && navChildChildren.length)) {
            continue;
        }
        for (let j = 0; j < navChildChildren.length; j++) {
            const subChild = navChildChildren[j];
            const tagType = subChild.tagName;
            if (tagType.toLowerCase() === 'a') {
                const childAriaLabel = subChild.ariaLabel;
                if (childAriaLabel !== null && BLACKLISTED_ARIA_LABELS.has(childAriaLabel.toLowerCase())) {
                    subChild.remove();
                }
            }
        }
    }
}
