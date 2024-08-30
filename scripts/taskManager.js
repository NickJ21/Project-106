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

    //save to server (post)
    $.ajax({
        type: "post",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(taskSave),
        contentType: "application/json",
        success: function (response) {
            console.log(response)
        },
        error: function (error) {
            console.log(error)
        }
    });
    displayTask(taskSave);
}

//display from server (get)
function displayTask(task) {
    let syntax = `<div class = "task" style="border-color:${task.color}">
    <div class = "info">
    <h5> ${task.title} </h5>
    <p> ${task.description} </p>
    </div>
    <label class = "status bg-info-subtle"> ${task.status}</label>
    <div class = "date-budget">
    <label>${task.date} </label> <br>
    <label>${task.budget} </label> 

    </div>
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
                if(task.name === "Nick"){
                    displayTask(task);
                }
            }
        }
    })
}


function init() {
    $("#btnSave").click(saveTask);
    loadTask();
}


window.onload = init


//create loadTask() function