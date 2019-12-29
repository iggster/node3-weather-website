console.log('Client side javascript is loaded!')

//Select the element in the DOM you will work with.
const weatherForm = document.querySelector('form')
const searchField = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-1')

weatherForm.addEventListener("submit", (event) => {
 //Stops the browser from automatically refreshing after submit.
  event.preventDefault()
  message1.textContent = 'Loading. . .'
  message2.textContent = ''
       
  fetch('/weather?address='+searchField.value).then((response) => {
    response.json().then((data) => {
  
        if(data.error) {
          message1.textContent = 'Unable to find location, try another search.' // + data.error
        } else {
          message1.textContent = data.place_name + '<br>' + data.forecast
          //message2.textContent = data.forecast
        }  
    })
  }) 
  

})