console.log('Client side javascript file is loaded!');
//fetch : browser based function

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// }); //asynchronous, .then: callback



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading';
    messageTwo.textContent = '';
    let url = 'http://localhost:3000/weather?address=' + location;
    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;    
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    });
});

});