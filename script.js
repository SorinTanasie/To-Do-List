const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input')

// Getting data from JSON file
const getTodo = async (file) =>{
    const response = await fetch(file);
    if(response.status!==200){
        throw new Error("nu s a fetchuit boss")
    }
    console.log(response);
    return response.json();
};

const data = getTodo('todos/todos.json');

data.then(data=>{
    console.log(data)
    data.forEach(element=>{
        generateTemplate(element.todo);
        console.log(element.todo)
    })
})


//add

const generateTemplate = todo =>{
    
    const html = `<li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
</li>`;
    list.innerHTML+=html;
}

addForm.addEventListener('submit',e =>{
    e.preventDefault();
    const todo=addForm.add.value.trim();

    if(todo.length){ 
        generateTemplate(todo);
        addForm.reset();
    }
}); 

//delete 

list.addEventListener('click', e =>{
    if(e.target.classList.contains("delete")){
        e.target.parentElement.remove();
    }
    
});

const filterTodos = (term) =>{
    Array.from(list.children)
     .filter((todo)=>!todo.textContent.toLowerCase().includes(term))
     .forEach((todo) => todo.classList.add('filtered'));

    Array.from(list.children)
     .filter((todo)=>todo.textContent.toLowerCase().includes(term))
     .forEach((todo) => todo.classList.remove('filtered'));
}

search.addEventListener('keyup',()=>{
    const term= search.value.trim().toLowerCase();
    filterTodos(term);
})

// const animation = (tab) =>{

//  setInterval(() =>{
//     let number = 75;
//     tab.style.width=`${number}px`
//     if(number === 300) {
//         clearInterval(animation);
//     } else{
//         number++;
//     }
// },10);}
// let number=75;
// let invers=300;
search.addEventListener('click',e=>{
    e.target.classList.add('active');
    addForm.add.classList.remove('active');
    
    // setInterval(() =>{
    //     search.style.width=`${number}px`
    //     delet.style.width=`${invers}px`;
    //     if(number === 300) {
    //         clearInterval();
    //     } else{
    //         console.log(number);
    //         number++;
    //         invers--;
    //     }
    // },10);
})

addForm.add.addEventListener('click',e=>{
    e.target.classList.add('active');
    search.classList.remove('active');
    // setInterval(() =>{
    //     delet.style.width=`${number}px`
    //     search.style.width=`${invers}px`
    //     if(number === 300) {
    //         clearInterval();
    //     } else{
    //         console.log(number);
    //         number++;
    //         invers--;
    //     }
    // },10);
})

const key='xss9j1BAgV1Tr2c0xCjWs6elnOGFNr89';


const getCity = async(city) =>{
    const base="http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;

    const request =await fetch(base + query);
    const data = await request.json();

    return data[0];
}

// getCity('craiova').then(data=>{ console.log(data.Key); getWeather(data.Key)})
// .catch(err => console.log(err));


const getWeather = async(city) =>{
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${city}?apiKey=${key}`;

    const response = await fetch(base + query);
    console.log(response.mode);
    const data = await response.json();
    console.log(response.mode);
    console.log(data);
}
getWeather("329260");