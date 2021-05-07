const body = document.querySelector('body');

const overlay = document.querySelector('.overlay');
const popup = document.querySelectorAll(".popup");

const main = document.getElementById('main');
const main2 = document.getElementById('main2');
const pop =document.getElementById('pop');
const pop2 =document.getElementById('pop2');
 

let TodoList = []; 
let i=0; 

let flag =true;
let flag2=true;
let mainflag = true;

let currentTodoListId;


                //                      Functions Overview
                // 1)Initialisation part
                // 2)Functions for single Todo List
                // 3)Functions for Todo Items
                // 4)Some Small Functions To call the important functions (part-1,part-2,part-3)



//         ***********************************Part - 1 ********************************************
 

//         ******************************Initilisation*********************************************
function init() {
    if(mainflag) {
        main2.style.display = "none";
        main.style.display = "block";
        DisplayTodo();
    }
    else {
        main.style.display="none";
        main2.style.display="flex";
    }
}
init();




function toggle2() {
    if(flag2){
        console.log(flag + 'love');
        body.classList.remove('noscroll')
        main2.style.filter='none';
        pop2.style.visibility = 'hidden';
        flag2=false;
    }
    else {

        console.log(flag + 'love');
        body.classList.add('noscroll');
        main2.style.filter='blur(9px)';
        pop2.style.visibility='visible';
        flag2=true;
    }
}
toggle2();


function toggle() {
    if(flag){
        console.log(flag + 'love');
        body.classList.remove('noscroll')
        main.style.filter='none';
        pop.style.visibility = 'hidden';
        flag=false;
    }
    else {

        console.log(flag + 'love');
        body.classList.add('noscroll');
        main.style.filter='blur(9px)';
        pop.style.visibility='visible';
        flag=true;
    }
}
toggle();

function DisplayTodo() {
    const list = document.querySelector(".flex-cards-TodoLists");
    var child = list.lastElementChild;
    
    while (child) {
        list.removeChild(child);
        child = list.lastElementChild;
    }

    if(TodoList.length!=0){

        for(let idx=0; idx<TodoList.length; idx++) {
        
            const node = document.createElement("div");
            node.setAttribute("class", `ListName`);
            node.setAttribute("data-key", TodoList[idx].id);

            

            node.innerHTML = 
            `<div class = "card-heading" onclick="findupperNode(this)">${TodoList[idx].title}<hr></div>
            <div class = "card-body">
                <ul class = "tasks"></ul>
                <div class="footer ">
                <div class = "delete_btn" onclick="removeToDo(this)"><i class="fa fa-trash" aria-hidden="true"></i></div>
                <div class = "icon-btn " onclick="ViewTodoList(this)"><div class = "ico-btn__plus"></div></div>
                </div>
            </div>`;

            list.append(node);

            let currentTodoList = TodoList[idx];

            for (let j = 0; j < currentTodoList.subTask.length; j++) {
                let classToPut = currentTodoList.subTask[j].marked
                  ? "completed_tasks "
                  : "card-item";

                  
                const liNode = document.createElement("li");
                liNode.setAttribute("class", classToPut);
                liNode.setAttribute("data-key", currentTodoList.subTask[j].id);
                if(!(currentTodoList.subTask[j].marked )) {
                    liNode.innerHTML = 
                        `<div style="display: flex; align-content: center;">
                            <input class="checkbox mark" type="checkbox" onchange='mark(this);'>
                            <div>${currentTodoList.subTask[j].name}</div>
                        </div>`;
                }
                else {
                    liNode.innerHTML = 
                        `<div style="display: flex; align-content: center;">
                            <input class="checkbox marked" type="checkbox" onchange='mark(this);'>
                            <div>${currentTodoList.subTask[j].name}</div>
                        </div>`;
                }
                node.childNodes[2].childNodes[1].append(liNode);
            }
        }
    } 

    else {

    }
}

//         ******************************Initilisation*********************************************


//         ***********************************Part - 2 ********************************************
                                
//         ******************************Adding new Todo List**************************************
//         ******************************Deleting existing Todo List*******************************
//         **********Redirecting to Single Todo List(To view single selected Todo List)************
function AddTodo() {
    let title = document.getElementById('ListTitle').value;
    console.log(title);
    if(title!=="") {
        const list = {
            title,
            completed: false,
            subTask: [],
            id: Date.now(),
        };
        TodoList.push(list);
        
    }
    else {
        const list = {
            title: "My Todo " + i,
            completed: false,
            subTask: [],
            id: Date.now(),
        };
        i++;
        TodoList.push(list);
    }
    toggle();
    DisplayTodo();
}


function removeToDo(element) {
    let tempElement = element.parentNode.parentNode.parentNode;
    console.log("gonna delete this!!");
  
    for (let idx = 0; idx < TodoList.length; idx++) {
        console.log(TodoList[idx].id);
        console.log(tempElement.getAttribute("data-key"));
      if (TodoList[idx].id == tempElement.getAttribute("data-key")) 
      {
        console.log(TodoList[idx]);
        console.log("gonna delete this too!!");
        TodoList.splice(idx, 1);
        tempElement.parentNode.removeChild(tempElement);
        break;
      }
    }
    DisplayTodo();
}


function redirect(id) {
    currentTodoListId=id;

    console.log(id);
  
    let currentTodo;
    //Find in the todo array
    for (let idx = 0; idx < TodoList.length; idx++) {
      if (TodoList[idx].id == id) {
        currentTodo = TodoList[idx];
        break;
      }
    }
    console.log("It's her Vs me ",currentTodo);

    
    mainflag=false;
    init();
    
    document.getElementById("currentHeading").textContent = currentTodo.title;
    document.getElementById("currentHeading-1").textContent = currentTodo.title;
    document.getElementById("currentHeading-1")
    .parentNode.parentNode.setAttribute("data-key", currentTodo.id);

    console.log("in single list");
    console.log(currentTodo);

    const list = document.querySelector("#SelectedTodoList_Items");
    var child = list.lastElementChild;
    
    while (child) {
        list.removeChild(child);
        child = list.lastElementChild;
    }

    for (let idx = 0; idx < currentTodo.subTask.length; idx++) {
        let classToPut = currentTodo.subTask[idx].marked
            ? "completed_tasks" : "task_item";

        const liNode = document.createElement("li");
        liNode.setAttribute("class", classToPut);
        liNode.setAttribute("data-key", currentTodo.subTask[idx].id);
        console.log(currentTodo.subTask[idx].name);

        if(!(currentTodo.subTask[idx].marked )) {
            liNode.innerHTML = 
                `<div style="display: flex; align-content: center;">
                    <input class="checkbox mark" type="checkbox" onchange='mark(this);'>
                    <div>${currentTodo.subTask[idx].name}</div>
                </div>`;
        }
        else {
            liNode.innerHTML = 
                `<div style="display: flex; align-content: center;">
                    <input class="checkbox marked" type="checkbox" onchange='mark(this);'>
                    <div>${currentTodo.subTask[idx].name}</div>
                </div>`;
        }


        list.append(liNode);
    }
    
}

//         ******************************Adding new Todo List**************************************
//         ******************************Deleting existing Todo List*******************************
//         **********Redirecting to Single Todo List(To view single selected Todo List)************



//         ***********************************Part - 3 ********************************************
 


//         ********************Adding new Todo Item to selected TodoList***************************
//         ******************************Marking Completed Items***********************************

function AddTodoItem() {
    let TaskName = document.getElementById("ItemToAdd").value;
    let id = currentTodoListId;
    if (TaskName !== "") {
        for (let idx = 0; idx < TodoList.length; idx++) {
            if (TodoList[idx].id == id) {
                TodoList[idx].subTask.push({
                    name: TaskName,
                    marked: false,
                    id: Date.now(),
                });
                console.log(TodoList[idx]);
                break;
            }
        }
    }
    redirect(id);
    // flag2=true;
    toggle2(); 
    
}






//         ***********************************Part - 4 ********************************************
 

//         *****************Some Small Functions To call the important functions*******************

function ViewTodoList(element) {

    flag2 = false;
    currentTodoListId =element.parentNode.parentNode.parentNode.getAttribute("data-key");
    console.log("ViewTodoList");
    console.log(currentTodoListId);
    redirect(currentTodoListId);
    console.log("toggle2");
    toggle2();
}

function goback() {
    mainflag=true;
    init();
}


function findupperNode(elem) {
    redirect(elem.parentNode.getAttribute("data-key"));
}

function midFun(elem) {
    console.log("areeeey!!");
    flag2=false;
    toggle2();  
    redirect(currentTodoListId);
}

function mark(elem) {
    let element  = elem.parentNode.parentNode;
    let listitemId = element.getAttribute("data-key");
    let CTId;
    if(mainflag) {
        CTId =element.parentNode.parentNode.parentNode.getAttribute("data-key");
    }
    else {
        CTId = element.parentNode.parentNode.parentNode.getAttribute("data-key");
    }
    console.log("to be marked true");
    console.log(CTId);
    console.log(listitemId);
    for(let idx=0; idx<TodoList.length; idx++) {

        if(TodoList[idx].id==CTId) {

            for(let j=0; j<TodoList[idx].subTask.length; j++) {
                if(TodoList[idx].subTask[j].id == listitemId) {
                    TodoList[idx].subTask[j].marked = true ;
                    break;
                    console.log("marked true");
                }
            }
            break;
        }
    }
    if(mainflag) DisplayTodo();
    else redirect(currentTodoListId);
}



//         *****************Some Small Functions To call the important functions*******************
