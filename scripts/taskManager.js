function saveTask() {
    const title = $("#txtTitle").val();
    const description = $("#txtDescription").val();
    const color = $("#txtColor").val();
    const date = $("#startDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();
    console.log(title, description, color, date, status, budget);

    let taskSave = new Task(title, description, color, date, status, budget);
    console.log(taskSave);

    if (!title || !description || !date || !status){
        alert("Please fill out the required fields");
        return;
    }

    //save to server (post)
    $.ajax({
        type: "post",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(taskSave),
        contentType: "application/json",
        success: function (response) {
            console.log(response)
            displayTask(taskSave);
            clearForm();
        },
        error: function (error) {
            console.log(error);
            alert("There was an error saving your task. Please try again")
        }
    });
}

function clearForm(){
    $("#txtTitle, #txtDescription, #txtColor, #startDate, #selStatus, #numBudget").val("");
}

//display from server (get)
function displayTask(task) {
    let syntax = `<div class = "task" style="border-color:${task.color}" data-id="${task._id}">
    <div class = "info">
    <h5> ${task.title} </h5>
    <p> ${task.description} </p>
    </div>
    <label class = "status bg-info-subtle"> ${task.status}</label>
    <div class = "date-budget">
    <label>${task.date} </label> <br>
    <label>${task.budget} </label> 

    </div>
    <button class= "btn btn-danger btn-sm delete-task">Delete</button>
    </div>
    `;

    $("#list").append(syntax);
}

function loadTask(){
    $.ajax({
        type: "get",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        success: function(response){
            console.log("response: ",response)

            let data = JSON.parse(response);
            console.log("response json: ", data);

            //travel the array, get some element from the arry
            for(let i=0; i<data.length; i++){
                let task = data[i];
                if(task.name === "NickJ"){
                    displayTask(task);
                }
            }
        }
    })
}

function deleteTask(id){
    $.ajax({
        type: "delete",
        url: `http://fsdiapi.azurewebsites.net/api/tasks/${id}`,
        success: function(response){
            console.log("Task deleted successfully", response);
            //Remove the task from the DOM
            $(`div[data-id="${id}"]`).remove();
        },
        error: function(error){
            console.log("Error deleting task", error);
            alert("There was an error deleting the task")
        }
    });
}


function init() {
    $("#btnSave").click(saveTask);
    loadTask();

    $("#list").on("click", ".delete-task", function(){
        let taskId= $(this).closest(".task").data("id");
        if (confirm("Are you sure you want to delete this task?")){
            deleteTask(taskId);
        }
    })
}


window.onload = init


//create loadTask() function