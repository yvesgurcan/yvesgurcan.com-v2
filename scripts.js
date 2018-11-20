const showContent = function(event) {
    const target = event.target.getAttribute('for');

    if (target) {
        console.log(target)
        const targetElem = document.getElementById(target);
        if (targetElem) {
            targetElem.classList.add('show');
        }
    }
    
}

const wheel = document.getElementById('wheel')
wheel.addEventListener('click', showContent)