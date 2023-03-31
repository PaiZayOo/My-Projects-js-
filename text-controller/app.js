//select elements

const fonts = ['FreeSerif', 'FreeSans', 'FreeMono'];


const text = document.querySelector('#text');
const output = document.querySelector('#output');
const count = document.querySelector('#count');
const color = document.querySelector('#color');
const fontSize = document.querySelector('#fontSize');
const fontFamily = document.querySelector('#fontFamily');


fonts.forEach ( font => {
    fontFamily.append(new Option(font,font))
})
text.addEventListener('keypress', e => {
    output.innerText = text.value;
    count.innerText = text.value.length;
})

color.addEventListener('change', e => {
     output.style.color = color.value;
})

fontSize.addEventListener('change', e => {
    output.style.fontSize = fontSize.value + 'px';
})

fontFamily.addEventListener('change', e => {
    output.style.fontFamily = e.target.value;
})
