const MOSAIC_ID = 'mosaic';
const NAME_ID = 'name';
const BOTTOM_ID = 'bottom';
const BOTTOM_CLOSE_ID = 'bottom-close';
const BOTTOM_DESCRIPTIONS_ID = 'bottom-descriptions';



const toggleSorting = function () {
    const mosaicElem = document.getElementById(MOSAIC_ID)
    const nameElem = document.getElementById(NAME_ID);
    if (
        mosaicElem.style.flexDirection !== 'row-reverse'
        || mosaicElem.style.flexWrap !== 'wrap-reverse') {
        mosaicElem.style.flexDirection = 'row-reverse';
        mosaicElem.style.flexWrap = 'wrap-reverse';
        mosaicElem.classList.add('animate-shuffle-reverse');
        nameElem.classList.add('reverse')
        mosaicElem.classList.remove('animate-shuffle');
    } else {
        mosaicElem.style.flexDirection = '';
        mosaicElem.style.flexWrap = '';
        mosaicElem.classList.add('animate-shuffle');
        nameElem.classList.remove('reverse')
        mosaicElem.classList.remove('animate-shuffle-reverse');
    }
}

const showDescription = function (event) {
    const targetId = event.target.getAttribute('target')

    const background = window.getComputedStyle(event.target, null).getPropertyValue('background-color');

    if (!targetId) {
        console.error('No target ID.')
        return false;
    }

    const bottomDescriptions = document.getElementById(BOTTOM_DESCRIPTIONS_ID);

    for(let i = 0; i < bottomDescriptions.childNodes.length; i++) {
        const node = bottomDescriptions.childNodes[i];
        if (node.id === targetId) {
            const bottom = document.getElementById(BOTTOM_ID);
            if (node.style.display === 'block') {
                bottom.style.display = 'none';
                node.style.display = 'none';
            } else {
                bottom.style.background = background;
                bottom.style.display = 'block';
                node.style.display = 'block';
            }
        } else if (node.style && node.style.display !== 'none') {
            node.style.display = 'none';
        }
    }
}

const hideDescription = function (event) {
    const bottom = document.getElementById(BOTTOM_ID);
    bottom.style.display = 'none';
}

const nameElem = document.getElementById(NAME_ID);
nameElem.addEventListener('click', toggleSorting);

const mosaicElem = document.getElementById(MOSAIC_ID);
const mosaicNodes = mosaicElem.childNodes;

for (let i = 0; i < mosaicNodes.length; i++) {
    const mosaicNode = mosaicNodes[i];
    mosaicNode.addEventListener('click', showDescription);
}

const bottomCloseElem = document.getElementById(BOTTOM_CLOSE_ID);
bottomCloseElem.addEventListener('click', hideDescription);