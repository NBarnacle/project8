let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".employees");
const overlay = document.getElementById("ov");
let modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modal = document.querySelector(".modal")

fetch(urlAPI)
.then(res => res.json()).then(res => res.results).then(displayEmployees).catch(err => console.log(err))

function displayEmployees(employeeData){
    employees = employeeData;
    var employeeHTML = "";
    console.log(employeeData);
    employees.forEach((employee, index) => {
        const div = document.createElement('div');

        div.className = 'card';
        let i = 12;
        employees.forEach(function(element){ 
          element.index = employees.length - i;
          div.dataset.index = employee.index;
          i--;
        console.log(employee.index)
         }
          );
          
          
       
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        console.log(employee);

 div.innerHTML += `

   <img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    </div>
    </div>
    `
    document.getElementById('employees').appendChild(div);
    });
  
    } 
    
    function displayModal(index) {
      overlay.classList.remove("hidden");
      let { name, dob, phone, email, location: { city, street, state, postcode
      }, picture } = employees[index];
      let date = new Date(dob.date);
      const content = document.createElement('div');  
      
      modalContainer.innerHTML += `
      <img class="avatar" src="${picture.large}" />
      <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      <hr />
      <p>${phone}</p>
      <p class="address">${street.number},${street.name}, ${state} ${postcode}</p>
      <p>Birthday:
      ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
      </div>
      `;
     
    }

      gridContainer.addEventListener('click', e => {
        console.log("hello");
        if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
        }
        });

        modalClose.addEventListener('click', () => {
          overlay.classList.add("hidden");
          modalContainer.innerHTML = "";
          });