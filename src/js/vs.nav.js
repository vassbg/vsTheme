const vsNavContainer = document.querySelector('#vs-nav-container');

vsNavContainer.innerHTML += '<div id="vs-nav-mobile-icon"><span></span><span></span><span></span></div>';

const vsNav = document.querySelector('#vs-nav');
const vsNavItems = document.querySelectorAll('#vs-nav li');
const vsNavMobileIcon = document.querySelector('#vs-nav-mobile-icon');

const vsNavWidth = vsNav.offsetWidth;
const safeDist = 70;

const addVisible = e => {
    const sm = e.currentTarget.querySelector('ul');
    if ( sm ) sm.classList.add('visible');
}

const removeVisible = e => {
    const sm = e.currentTarget.querySelector('ul');
    if ( sm ) sm.classList.remove('visible');
}

const setMobile = () => {
    vsNav.classList.add('mobile');
    vsNavMobileIcon.classList.add('visible');
}

const setDesktop = () => {
    vsNav.classList.remove('mobile');
    vsNavMobileIcon.classList.remove('visible');
}

for (let i = 0; i < vsNavItems.length; i++){
    vsNavItems[i].addEventListener('mouseover', addVisible);
    vsNavItems[i].addEventListener('mouseout', removeVisible);
}

const setNav = () => {

    const vsNavContainerWidth = vsNavContainer.offsetWidth;
    if ( vsNavWidth + safeDist > vsNavContainerWidth ) setMobile();
    else  setDesktop();

}

vsNavMobileIcon.addEventListener('click', () => {
    vsNav.classList.toggle('visible');
    vsNavMobileIcon.classList.toggle('close');
})

setNav();
window.onresize = setNav;