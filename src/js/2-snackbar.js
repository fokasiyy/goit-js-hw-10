import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";



const input = document.querySelector('[name="delay"]');

const form = document.querySelector('form');



form.addEventListener('submit', (event) =>{
    event.preventDefault();
    const form = event.currentTarget;
    const delay = input.value;
    const radio = document.querySelector('input[name="state"]:checked');


    const result = new Promise((resolve, reject) =>{

        

        setTimeout(() =>{

            if(radio){
                if(radio.value === 'fulfilled'){
                    resolve(`FullFilled promise in ${delay}`);
                        

                    

                }

                else{
                    reject(`Rejected promise in ${delay}`)
                        
                    
                }

            }

        }, delay);
    })

    result
    .then(value =>{
        iziToast.show({              
            message: `FullFilled promise in ${delay}`
        })

    })
    .catch(
        error =>{
            iziToast.show({
                            
                message: `Rejected promise in ${delay}`
            })

        }
    )


    form.reset();

})