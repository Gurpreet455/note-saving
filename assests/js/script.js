console.log("test");

btn = document.querySelector(".btn").addEventListener("click", function (e) {
  e.preventDefault();
  taskName = document.querySelector(".taskName").value;
  taskValue = document.querySelector(".taskValue").value;
  Datevalue = new Date();
  newDaysValue =
    Datevalue.getDate() +
    "-" +
    Datevalue.getMonth() +
    "-" +
    Datevalue.getFullYear();
  generateId = Math.floor(Math.random() * 100000000);
  var note = localStorage.getItem("notes");

  if (taskName == "" || taskValue == "") {
    alert("please enter valid inputs");
  } else {
    if (note == null) {
      taskContainer = [];
    } else {
      taskContainer = JSON.parse(note);
    }
    taskBox = {
      Id: generateId,
      Title: taskName,
      Task: taskValue,
      Date: newDaysValue,
    };
    taskContainer.push(taskBox);
    localStorage.setItem("notes", JSON.stringify(taskContainer));
    showNotes();
    tostifty("Task Added");
    document.tasks.reset();
  }
});

showNotes = () => {
  var note = localStorage.getItem("notes");
  if (note == null) {
    taskContainer = [];
  } else {
    taskContainer = JSON.parse(note);
  }
  strHtml = ``;
  taskContainer = JSON.parse(note);
  for (i = 0; i < taskContainer.length; i++) {
    strHtml += `<div class="task" id='${taskContainer[i].Id}'>
        <h4> <span class="taskVal">${taskContainer[i].Title} </span><span class="date">(${taskContainer[i].Date})</span></h4>
        <p class="taskTtl">${taskContainer[i].Task}</p>
        <div class="commands">
        <span class="updateBtn">Update</span>
          <span class="editBtn">Edit</span>
          <span class="dlt" >Delete</span>
        </div>
      </div>`;
  }
  document.querySelector(".task__output").innerHTML = strHtml;
};

document.querySelector(".task__output").addEventListener("click", function (e) {
  target = e.target;
  if (target.classList.contains("dlt")) {
    targetIdValue = target.parentElement.parentElement.getAttribute("id", "");
    var note = localStorage.getItem("notes");
    taskContainer = JSON.parse(note);
    for (i = 0; i < taskContainer.length; i++) {
      if (targetIdValue == taskContainer[i].Id) {
        newValue = taskContainer[i].Id;
        var index = taskContainer
          .map((x) => {
            return x.Id;
          })
          .indexOf(newValue);
        taskContainer.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(taskContainer));
        document.getElementById(`${newValue}`).remove();
        tostifty("Task Deleted");
      }
    }
  } else {
    return false;
  }
});

tostifty = (value) => {
  createMsgDiv = document.createElement("div");
  createMsg = document.createElement("p");
  createMsgDiv.setAttribute("class", "toast__msg");
  createMsg.setAttribute("class", "msg");
  createMsg.innerHTML = value;
  createMsgDiv.appendChild(createMsg);
  document.querySelector(".tostify").appendChild(createMsgDiv);
  setTimeout(function removeTost() {
    createMsgDiv = document.querySelector(".toast__msg").remove();
  }, 3000);
};

task = document
  .querySelector(".task__output")
  .addEventListener("click", function (e) {
    target = e.target;

    if (target.classList.contains("editBtn")) {
      target.style.display = "none";
      target.previousElementSibling.style.display = "block";
      taskTtl = target.parentElement.parentElement.children[0].children[0];
      taskVal = target.parentElement.parentElement.children[1];
      taskVal.setAttribute("contenteditable", "true");
      taskTtl.setAttribute("contenteditable", "true");
      taskTtl.style.outline = "1px solid #000";
      taskVal.style.outline = "1px solid #000";
      updateBtn = target.previousElementSibling;
      editBtn = document.querySelector('.editBtn');
      updateBtn.addEventListener("click", function (e) {
        target = e.target;
  
      if(taskTtl.innerHTML == '' || taskVal.innerHTML == '' ){
        alert("please enter valid inputs for update");
      
      }
      else{
        taskVal.setAttribute("contenteditable", "false");
        taskTtl.setAttribute("contenteditable", "false");
        taskTtl.style.outline = "none";
        taskVal.style.outline = "none";
        updateBtn.style.display = "none";
        editBtn.style.display = "block";
        var note = localStorage.getItem("notes");
         taskContainer = JSON.parse(note);
         targetIdValue = target.parentElement.parentElement.getAttribute("id",'');
         
      for(i=0;i<taskContainer.length;i++){

        if(targetIdValue == taskContainer[i].Id){
          newTaskVal = taskContainer[i].Task = taskVal.innerHTML;
          newTaskTtl = taskContainer[i].Title = taskTtl.innerHTML;
          localStorage.setItem("notes", JSON.stringify(taskContainer));
          showNotes();
          tostifty("Task Updated");
        }}} 
      });
  } else {
      return false;
    }
  });

showNotes();
