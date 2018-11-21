const MOSAIC_ID = 'mosaic';
const NAME_ID = 'name';
const BOTTOM_ID = 'bottom';
const BOTTOM_DESCRIPTIONS_ID = 'bottom-descriptions';

let bottomClosed = true;

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

const showDescription = function (event, target) {
    let ref;
    let targetId;

    if (target) {
        ref = target;
    } else {
        ref = event.target;
    }

    targetId = ref.getAttribute('target')

    if (!targetId) {
        const parent = ref.parentElement;
        ref = parent;
        targetId = parent.getAttribute('target');

        if (!targetId) {
            const grandparent = ref.parentElement;
            ref = grandparent;
            targetId = grandparent.getAttribute('target');

            if (!targetId) {
                console.error('Target attribute of event not found.');
                return false;
            }
        }
    }

    const background = window.getComputedStyle(ref, null).getPropertyValue('background-color');

    const bottomDescriptions = document.getElementById(BOTTOM_DESCRIPTIONS_ID);

    let found = false
    for(let i = 0; i < bottomDescriptions.childNodes.length; i++) {
        const node = bottomDescriptions.childNodes[i];
        if (node.id === targetId) {
            found = true
            bottomClosed = false;
            const bottom = document.getElementById(BOTTOM_ID);
            if (node.style.display !== 'block' || bottomClosed) {
                bottom.style.background = background;
                bottom.style.display = 'block';
                node.style.display = 'block';
            } else {
                bottom.style.display = 'none';
                node.style.display = 'none';
            }
        } else if (node.style && node.style.display !== 'none') {
            node.style.display = 'none';
        }
    }

    if (!found) {
        console.error(`Description of '#${targetId}' not found.`);
    }
}

const hideDescription = function (event) {
    const bottom = document.getElementById(BOTTOM_ID);
    bottom.style.display = 'none';
    
    setTimeout(() => {
        const hash = window.location.hash.replace('#', '');
        const bottomDescription = document.querySelectorAll(`[target="${hash}"]`);
        if (hash && bottomDescription.length > 0) {
            bottomClosed = true;
            showDescription(null, bottomDescription[0]);
        } else {
            if (hash) {
                console.error(`Target identifier of '#${hash}' not found.`);
                bottomClosed = false;
            } else {
                bottomClosed = true;
            }
        }
        
        history.replaceState(null, null, ' ');
    }, 100)
}

const nameElem = document.getElementById(NAME_ID);
nameElem.addEventListener('click', toggleSorting);

const mosaicElem = document.getElementById(MOSAIC_ID);
const mosaicNodes = mosaicElem.childNodes;

for (let i = 0; i < mosaicNodes.length; i++) {
    const mosaicNode = mosaicNodes[i];
    mosaicNode.addEventListener('click', showDescription);
}

const bottomElem = document.getElementById(BOTTOM_ID);
bottomElem.addEventListener('click', hideDescription);