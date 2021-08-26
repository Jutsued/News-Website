const ss = document.getElementById('two');
const cc = document.getElementById('three');

ss.addEventListener('click', fun)
function fun() {
    document.location.href=`./resources/pages/page2.html`;
    console.log('2nd trial')
}

cc.addEventListener('click', zun)
function zun() {
    document.location.href=`./resources/pages/page3.html`;
    console.log('home page')
}

``