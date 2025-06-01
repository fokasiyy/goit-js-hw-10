import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import { split } from "postcss/lib/list";


import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";


const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const input = document.querySelector('input');

const btn = document.querySelector('button');

let selectedDatesTime = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {


      const date = new Date();
      if(selectedDates[0] > date){
        selectedDatesTime = selectedDates[0];

        btn.removeAttribute('disabled', '');

      }else{
        btn.setAttribute('disabled', '');
        iziToast.show({              
          message: 'Please choose a date in the future'
      })
      }
    },
    
  };

  btn.addEventListener('click', clockTime);


  function clockTime(){
    input.setAttribute('disabled', '');
    btn.setAttribute('disabled', '');
    const intervalId = setInterval(() =>{
      const now = new Date();
      const mili = selectedDatesTime - now;

      if(mili <= 0){
        clearInterval(intervalId);
        input.removeAttribute('disabled', '');
        updateClock(0, 0, 0, 0);
        btn.removeEventListener('click', clockTime);
        
        return;
      }



      function convertMs(ms){
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
      
        // Remaining days
        const days = Math.floor(ms / day);
        // Remaining hours
        const hours = Math.floor((ms % day) / hour);
        // Remaining minutes
        const minutes = Math.floor(((ms % day) % hour) / minute);
        // Remaining seconds
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);
      
        return {days, hours, minutes, seconds};}
      

      
      const resultMathTime = convertMs(mili);
      

      updateClock(resultMathTime.days, resultMathTime.hours, resultMathTime.minutes, resultMathTime.seconds);

       

    }, 1000);
  }
  
  function updateClock(days, hours, minutes, seconds){
    dataDays.textContent = String(days).padStart(2, '0');
    dataHours.textContent = String(hours).padStart(2, '0');
    dataMinutes.textContent = String(minutes).padStart(2, '0');
    dataSeconds.textContent = String(seconds).padStart(2, '0');
  }



  
flatpickr('#datetime-picker', options);