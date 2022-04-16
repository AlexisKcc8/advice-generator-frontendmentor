

const d = document;

d.addEventListener('DOMContentLoaded',e=>{
    
    const $numAdvice = d.querySelector('.card__num-advice');
    const $phrase = d.querySelector('.card__phrase');
    const $btn = d.querySelector('.card-btnAdvice');
    const $loader = d.querySelector('.container-loader');

    async function getData(){

        try {

            let aleatorio = Math.floor((Math.random() * (225 - 1 + 1)) + 1);
            // console.log(aleatorio)

            let res = await fetch(`https://api.adviceslip.com/advice/${aleatorio}`);
            let json = await res.json();

            // console.log(json.slip.id);
            // console.log(json.slip.advice);
            //* manipular el error en caso de haberlo lanzar una exeption
            
            if(!res.ok || json.slip.id === 48){
                throw {status: res.status, statusText: res.statusText}
            }

            //* pintar el resultado en el dom
            $numAdvice.textContent = `Advice #${json.slip.id}`;
            $numAdvice.style.opacity = 1;
            $phrase.textContent = `"${json.slip.advice}"`;
            $phrase.style.opacity = 1;

            d.addEventListener('click', (e) =>{

                if(e.target === $btn){
                    location.reload();
                }

            });
            
        } catch (error) {
            console.log(error);
            let message = error.statusText || "ocurrio un error"
            $phrase.textContent = "Error: " + error.status + ": " + message;
        }finally{
            $loader.classList.add('hiddenLoader');
        }
    }

    getData();


});