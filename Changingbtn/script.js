var istatus = document.querySelector("#status")
var ibuy = document.querySelector("#btn")
var acart = document.querySelector("#btn2") 
ibuy.addEventListener("click", function(){
    istatus.innerHTML = "Sold Out"
    istatus.style.color = "red"
})

acart.addEventListener("click", function(){
    istatus.innerHTML = "Hurry Up! only 1 left"
    istatus.style.fontSize = "17px"
    istatus.style.color = "blue"
})