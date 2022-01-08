'use strict';

const selectCars = document.getElementById('select-cars');
const carsContent = document.querySelector('.cars-content');
const info = document.querySelector('.info');

selectCars.style.cssText = `
    margin-left: 400px;
    font-size: 30px;
    margin-top: 40px;
    `;
info.style.cssText = `
    display: block;
    margin-left: 400px;
    font-size: 30px;
    margin-top: 40px;
    `;

const getData = (url) => {
    return fetch(url)
        .then(res => res.json())
        .then(data => {
          
            render(data);


        }).catch(error => {
            console.error(error.message);
        });
};
getData('https://bfs01.getcourse.ru/public/files/12250/88/84120897322424565eb4cddeea2b910a.json?e=1641653999&s=ELGjZiiiz8UzS-YrnOoUZg');

const render = (data) => {
    
    for (let key in data) {

      
        
        localStorage.setItem('cars', JSON.stringify(data[key]));
        data[key].forEach(item => {
           

            const {brand, model, price} = item;

            const option = document.createElement('option');
            
            option.innerHTML = `
                <option value ="${brand}">${brand}</option>
            `;
            
            selectCars.append(option);

            const div = document.createElement('div');

            div.classList.add('cars-info');
            div.style.cssText = `
                display: none;
                font-size: 20px;
                `;

            div.innerHTML = `
                
                <span class ="model">Тачка: ${brand} ${model}</span>
                <div class ="cars-price">Цена:${price}$</div>
            `;

            
           
            carsContent.append(div);

        });
        
    }
};
selectCars.addEventListener('click', (e) =>{
    e.preventDefault();
    const arr = JSON.parse(localStorage.getItem('cars'));
    const carInfo = document.querySelectorAll('.cars-info');
    
    carInfo[0].style.display = 'none';
    carInfo[1].style.display = 'none';
     
        if(e.target.value === '') {
             info.style.display = 'block';
        }

        console.log(e.target.value);
        arr.forEach((car, index) => {
            
            const {brand} = car;
        
          
            if (brand === e.target.value) {
                
                carInfo[index].style.cssText = `
                    display: block;
                    margin-left: 400px;
                    font-size: 30px;
                    margin-top: 15px;
                    `;
                info.style.display = 'none';
            } 
            
               
            
        });
            
    });