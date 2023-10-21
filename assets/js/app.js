cl = console.log;
const todoForm = document.getElementById("todoForm");
const todoControl = document.getElementById("todo");
const todoContainer = document.getElementById("todoContainer");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");

let todoArr = [
    {todoItem : "javaScript", todoId : '1'}
]

const onEdit = (ele) => {  // here edit functionality... 
    //cl(`Edited !`,ele)
    let getEditId = ele.parentNode.parentNode.id; // .getAttribute('id'); 
    cl(getEditId)
    localStorage.setItem("editId", getEditId)
    //cl(todoArr)

    let getObj = todoArr.find(todo => {
        return todo.todoId === getEditId
    })
    cl(getObj)
    todoControl.value = getObj.todoItem;
    submitBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');  
}

const onDelete = (ele) => {
    let getConfirmation = confirm('Are you sure, you want to remove this Item ?');
    cl(getConfirmation)
if(getConfirmation){

    cl("Deleted !",ele);
    let getDeletedId = ele.closest('li').id;
    cl(getDeletedId);

    let getIndex = todoArr.findIndex(todo => {
        return todo.todoId === getDeletedId
    })
    cl(getIndex)
    todoArr.splice(getIndex, 1);
    localStorage.setItem("todoArray", JSON.stringify(todoArr))
    document.getElementById(getDeletedId).remove();
    Swal.fire({
        icon: 'success',
        title: 'Todo Item is Removed',
        timer: 2500
    })
    }else{
        return
    }
}

const todoTemplating = (arr) => {
    let result =  '<ul class="list-group">';
    arr.forEach(ele => {
        result += `
                            <li class="list-group-item d-flex justify-content-between" id="${ele.todoId}">
                                <span>${ele.todoItem}</span>
                                <span>
                                    <button class="btn btn-primary" onclick="onEdit(this)">Edit</button>
                                    <button class="btn btn-danger" onclick="onDelete(this)">Delete</button>
                                </span>
                            </li>
                    `
    });
    result += `</ul>`
    todoContainer.innerHTML = result;
}

if(localStorage.getItem('todoArray')){
    todoArr = JSON.parse(localStorage.getItem("todoArray"))
}


todoTemplating(todoArr)
const onTodoHandler = (eve) => {
    eve.preventDefault();
    let todoObj = {
        todoItem : todoControl.value,
        todoId : uuidv4()
    }
    todoArr.push(todoObj);
    localStorage.setItem('todoArray', JSON.stringify(todoArr))
    eve.target.reset();     // eve = submit event and target = jis per event bind huaa hai 
    cl(todoArr)
    todoTemplating(todoArr);
    Swal.fire({
        icon: 'success',
        title: 'New Todo Item is Added',
        timer: 2500
    })
}



const onUpdateHandler = () => {
    let updatedVal = todoControl.value;
    cl(updatedVal)
    let updateId = localStorage.getItem("editId");
    //cl(updateId)

    // todoArr.forEach(todo => {
    //     if(todo.todoId === updateId){
    //         todo.todoId = updatedVal;
    //         todoForm.reset()
    //     }
    // })

    let getIndex = todoArr.findIndex(todo => {
        return todo.todoId === updateId
    })
    cl(getIndex)
    todoArr[getIndex].todoItem = updatedVal
    localStorage.setItem("todoArray", JSON.stringify(todoArr))
    let li = document.getElementById(updateId);
    cl(li.firstElementChild);
    li.firstElementChild.innerHTML = updatedVal;
    todoForm.reset();
    updateBtn.classList.add('d-none');
    submitBtn.classList.remove('d-none');
}


todoForm.addEventListener("submit", onTodoHandler);
updateBtn.addEventListener("click", onUpdateHandler)

function uuidv4() { 
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) { 
        const r = Math.random() * 16 | 0,  
            v = c == 'x' ? r : (r & 0x3 | 0x8); 
        return v.toString(16); 
    }); 
}

// pure function 