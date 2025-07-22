var heart = document.querySelector('#container i');
var container = document.querySelector('#container');
container.addEventListener('dblclick', () => { // double click
        heart.style.transform = "translate(-50%, -50%) scale(1)"; 
        heart.style.color = 'red';
        //vanish the heart but after 2 seconds
        setTimeout(() => {  // 2 seconds // delay the action and make Asynchronous
            heart.style.transform = "translate(-50%, -50%) scale(0)";
        }, 2000);
});


//e.g for timeout working
// setTimeout(() => { 
//   console.log('3 seconds passed');
// }, 3000);
// setTimeout(() => {  
//   console.log('5 seconds passed');
// }, 5000);
