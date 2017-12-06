window.onload = function() {
	TaskList = new Object();
	User = new Object();
	writeLocalstorage();
	generateLayout();

}
function setLocalStorage(key, val) {
  localStorage.setItem(key, val);
}
/* User data and task data*/
function writeLocalstorage(){
	User = [
		  {id: 1 ,username: 'Ram'},
		  {id: 2 ,username: 'Kumar'},
		  {id: 3 ,username: 'Ganesh'},
		  {id: 4 ,username: 'Karthick'},
		  {id: 5 ,username: 'Suresh'},
		  {id: 6 ,username: 'Mani'},
		  {id: 7 ,username: 'Lokesh'},
		  {id: 8 ,username: 'John'}
		];
	TaskStatus = ["Initial", "Dev", "QA", "Completed"];
	// TaskList = [{id:1, task_name:'test task1', assignee: User[1],start_date:'20/01/2017', status: 0, description: 'test description', comments: {'id':1,'comment': 'test1 comment','commented-date': '22/02/2017 11:11:11'},assigner:User[0] }];
	// TaskList[1] = {id:2, task_name:'task2', assignee: User[2],start_date:'25/01/2017', status: 'Dev', description: 'task2 description', comments: {'id':2,'comment': 'test2 comment','commented-date': '20/08/2017 12:12:121'}, assigner: User[0]};
	// localStorage.setItem('Tasks',JSON.stringify(TaskList)); 
	// setLocalStorage('Tasks',JSON.stringify(TaskList)); 
	setLocalStorage('Users',JSON.stringify(User)); 
	setLocalStorage('TaskStatus',JSON.stringify(TaskStatus)); 
}
function getElementById(Id){
	return document.getElementById(Id);
}
function getElementsByClassName(classValue){
	var objectValue = document.getElementsByClassName(classValue); 
	return objectValue[0];
}
/* This method is used create overall page layout */
function generateLayout(){
	createCustomElementAppendClass("header", {'class': 'header'}, 'body');
	createCustomElementAppendClass("h1", {'class': 'header-title'}, 'header', 'Trello');
	createCustomElementAppendClass("div", {'class': 'main'}, 'body');
	createCustomElementAppendClass("div", {'class': 'container-box'}, 'main');
	/*Column 1*/
	createCustomElementAppendClass("div", {'class': 'column1'}, 'container-box');
	createCustomElementAppendClass("div", {'class': 'column1-inner'}, 'column1');
	createCustomElementAppendClass("div", {'class': 'column1-header'}, 'column1-inner');
	createCustomElementAppendClass("h3", {}, 'column1-header', 'Task List');
	createCustomElementAppendClass("div", {'class': 'column1-body'}, 'column1-inner');
 	var tasks = JSON.parse(localStorage.getItem('Tasks'));
 	TaskDivSetup(tasks, 0);
 	
 	createCustomElementAppendClass("button", {'id': 'add_task'}, 'column1-inner', 'Add Task');
 	var addTaskButton = document.getElementById('add_task');
	var addIcon = document.createElement('i');
	addIcon.setAttribute('class', 'fa fa-plus')
	addTaskButton.appendChild(addIcon);
	/*Column 2*/
	createCustomElementAppendClass("div", {'class': 'column2'}, 'container-box');
	createCustomElementAppendClass("div", {'class': 'column2-inner'}, 'column2');
	createCustomElementAppendClass("div", {'class': 'column2-header'}, 'column2-inner');
	createCustomElementAppendClass("h3", {}, 'column2-header', 'In Dev');
	createCustomElementAppendClass("div", {'class': 'column2-body'}, 'column2-inner');
	TaskDivSetup(tasks, 1);
	
	/*Column 3*/
	createCustomElementAppendClass("div", {'class': 'column3'}, 'container-box');
	createCustomElementAppendClass("div", {'class': 'column3-inner'}, 'column3');
	createCustomElementAppendClass("div", {'class': 'column3-header'}, 'column3-inner');
	createCustomElementAppendClass("h3", {}, 'column3-header', 'In QA');
	createCustomElementAppendClass("div", {'class': 'column3-body'}, 'column3-inner');

	TaskDivSetup(tasks, 2);
	/*Column 4*/
	createCustomElementAppendClass("div", {'class': 'column4'}, 'container-box');
	createCustomElementAppendClass("div", {'class': 'column4-inner'}, 'column4');
	createCustomElementAppendClass("div", {'class': 'column4-header'}, 'column4-inner');
	createCustomElementAppendClass("h3", {}, 'column4-header', "Completed");
	createCustomElementAppendClass("div", {'class': 'column4-body'}, 'column4-inner');
	TaskDivSetup(tasks, 3);
	createCustomElementAppendClass("footer", {'class': 'footer'}, 'body');
	createCustomElementAppendClass("p", {}, 'footer', 'Copyright © Ideas2IT | All Rights Reserved');
	var addTaskButton = document.getElementById('add_task');
	addTaskButton.setAttribute('onclick', 'createTask()');

	createCustomElementAppendClass("div", {'class': 'mpopup'}, 'body');
	createCustomElementAppendClass("div", {'class': 'mpopup-content'}, 'mpopup');
	createCustomElementAppendClass("div", {'class': 'mpopup-head'}, 'mpopup-content');
	createCustomElementAppendClass("span", {'class': 'close'}, 'mpopup-head', 'x');
	createCustomElementAppendClass("h2", {}, 'mpopup-head', 'Task Details');
	createCustomElementAppendClass("div", {'class': 'mpopup-main'}, 'mpopup-content');
	createCustomElementAppendClass("form", {'id': 'task-form'}, 'mpopup-main');
	createCustomElementAppendClass("input", {'id': 'task-name'}, 'mpopup-main');
	createCustomElementAppendClass("textarea", {'id': 'task-desc'}, 'mpopup-main');
	createCustomElementAppendClass("select", {'id': 'task-assignee'}, 'mpopup-main');
	createCustomElementAppendClass("select", {'id': 'task-assigner'}, 'mpopup-main');
	createCustomElementAppendClass("div", {'class': 'task-comment-sec'}, 'mpopup-main');
	createCustomElementAppendClass("textarea", {'id': 'task-comment'}, 'task-comment-sec');
	createCustomElementAppendClass("button", {'id': 'task-form-button'}, 'mpopup-main', 'Save');
	var taskFormButton = document.getElementById('task-form-button');
	taskFormButton.setAttribute('onclick', "setTask()");

	var users = JSON.parse(localStorage.getItem('Users'));
	assigneeValueSet(users);
	assignerValueSet();
	var assignee = document.getElementById('task-assignee');
	assignee.setAttribute('onchange', "assignerValueSet()");
}

/**/
function TaskDivSetup(tasks, status) {
	for (var i = 0; i < tasks.length; i++) {
 		if(tasks[i].status === status){
 			setTaskDiv(tasks[i], 'column'+(status+1)+'-body', status,'task-box'+tasks[i].id);
		}
 	}
}
/* This method is used to set the Assigner dropdown options */
function assignerValueSet(){
	var assignee = document.getElementById('task-assignee');
	var assigner = document.getElementById('task-assigner');
	assigner.options.length = 0;
	var users = JSON.parse(localStorage.getItem('Users'));
	var opt = document.createElement('option');
	opt.innerHTML = "Select Assigner";
			    opt.value = '';
			    assigner.appendChild(opt);
	for (var i = 0; i < users.length; i++) {
			if(users[i].id != assignee.value){
				var opt = document.createElement('option');
			    opt.innerHTML = users[i].username;
			    opt.value = users[i].id;
			    assigner.appendChild(opt);
			}
		}
		
}
/* This method is used to set the Assignee dropdown options */
function assigneeValueSet(users){
	var assignee = document.getElementById('task-assignee');
	for (var i = 0; i < users.length; i++) {
	    var opt = document.createElement('option');
	    opt.innerHTML = users[i].username;
	    opt.value = users[i].id;
	    assignee.appendChild(opt);
	}
}
/* This method is used to create the task view list */
function setTaskDiv(task, divclass, status, childdivclass){
	createCustomElementAppendClass("div", {'class': childdivclass},divclass);
	createCustomElementAppendClass("span", {'id': 'edit-task'+task.id},childdivclass);
	createCustomElementAppendClass("label", {'class': 'task task-name'}, childdivclass, task.task_name);
	createCustomElementAppendClass("br", {}, childdivclass);
	createCustomElementAppendClass("label", {'class': 'task start_date'}, childdivclass, task.start_date);
	if(task.assignee){
		createCustomElementAppendClass("label", {'class': 'task assignee', 'title': task.assignee.username}, childdivclass, task.assignee.username.substr(0, 1).toUpperCase());	
	}
	createCustomElementAppendClass("br", {}, childdivclass);
	if(status === 0){
		createCustomElementAppendClass("button", {'id': 'move-to-next-'+task.id}, childdivclass,'Move to Next');
	}else if(status === 1){
		createCustomElementAppendClass("button", {'id': 'move-to-back-'+task.id}, childdivclass,'Move to Back');
		createCustomElementAppendClass("button", {'id': 'move-to-next-'+task.id}, childdivclass,'Move to Next');
	}else if(status === 2){
		createCustomElementAppendClass("button", {'id': 'move-to-back-'+task.id}, childdivclass,'Move to Back');
		createCustomElementAppendClass("button", {'id': 'move-to-next-'+task.id}, childdivclass,'Move to Next');
	}
	if(status != 3){
		var moveToDev = document.getElementById('move-to-next-'+task.id);
		moveToDev.setAttribute('onclick', "moveToNextLevel("+task.id+")");
	}
	if(status != 3 && status != 0){
		var moveToBack = document.getElementById('move-to-back-'+task.id);
		moveToBack.setAttribute('onclick', "moveToPrevLevel("+task.id+")");
	}
	var editTask = document.getElementById('edit-task'+task.id);
	editTask.setAttribute('class', "edit-task");
	editTask.setAttribute('onclick', "editTask("+task.id+")");
	var editIcon = document.createElement('i');
	editIcon.setAttribute('class', 'fa fa-edit');
	editIcon.setAttribute('title', 'Edit');
	editTask.appendChild(editIcon);
}
/* Move button click to update the task status from current status level to next status level*/
function moveToNextLevel(id){console.log(id);
 	var tasks = JSON.parse(localStorage.getItem('Tasks'));
 	for (var i = 0; i < tasks.length; i++) {
 		if (tasks[i].id == id) {console.log(id);
		     console.log(tasks[i].status);
		     var currentTaskDiv = getElementsByClassName('task-box'+id); 
		     var nextColunDiv = getElementsByClassName('column'+(tasks[i].status + 2)+'-body'); 
		     if((tasks[i].status) == 0 || (tasks[i].status) == 1){
		     	var moveNextButton = '<button id="move-to-next-'+tasks[i].id+'" onclick="moveToNextLevel('+tasks[i].id+')">Move to Next</button>';
		     	var moveBackButton = '<button id="move-to-prev-'+tasks[i].id+'" onclick="moveToPrevLevel('+tasks[i].id+')">Move to Prev</button>';
		     	// console.log(document.getElementsByClassName('task-box-'+tasks[i].id));
		     	// console.log(currentTaskDiv);
		     	// currentTaskDiv.appendChild(moveNextButton);
		     	// currentTaskDiv.appendChild(moveBackButton);
		     	document.getElementsByClassName('task-box-'+tasks[i].id).innerHTML = moveNextButton;
		     	nextColunDiv.appendChild(currentTaskDiv);
		     }else if((tasks[i].status) == 2){
		     	var nextButton = document.getElementById( 'move-to-next-'+tasks[i].id );
				currentTaskDiv.removeChild( nextButton );
				nextColunDiv.appendChild(currentTaskDiv);
		     }
		     tasks[i].status = tasks[i].status + 1;
		}
 	}
 	setLocalStorage('Tasks',JSON.stringify(tasks));
	// location.reload();
}
/* This method to move the task status from current level to previous level*/
function moveToPrevLevel(id){
 	var tasks = JSON.parse(localStorage.getItem('Tasks'));
 	for (var i = 0; i < tasks.length; i++) {
 		if (tasks[i].id == id) {
		     tasks[i].status = tasks[i].status - 1;

		}
 	}
 	setLocalStorage('Tasks',JSON.stringify(tasks));
	location.reload();
}
/*Create custom HTML element common function*/
function createCustomElementAppendClass(element,attribute,inner, text){
	if(typeof(element) === "undefined"){return false;}
	if(typeof(inner) === "undefined"){inner = "";}
	var el = document.createElement(element);
	if(typeof(attribute) === 'object'){
		for(var key in attribute){el.setAttribute(key,attribute[key]);}
	}
	if(text){
		txtnode = document.createTextNode(text);
		el.appendChild(txtnode);
	}
	// if(inner == 'body'){console.log(inner);
	// 	var elementvalue = document.getElementsByClassName('body')[0];console.log(elementvalue[2]);
	// 	elementvalue.insertBefore(el, elementvalue.childNodes[2]);
	// }else{
		var elementValue = document.getElementsByClassName(inner);
		elementValue[0].appendChild(el);
	// }
	return inner;
}
/* This method is used to add and edit task option to open the modal popup*/
function createTask(){
	var taskName = document.getElementById('task-name');
		taskName.setAttribute('placeholder', "Enter the Task Name");
	var taskDesc = document.getElementById('task-desc');
		taskDesc.setAttribute('placeholder', "Enter the Task Description");
	var taskAssignee = document.getElementById('task-assignee');
	var taskAssigner = document.getElementById('task-assigner');
	var taskComment = document.getElementById('task-comment');
	taskName.value = '';
	taskDesc.value = '';
	taskAssignee.value = '';
	taskAssigner.value = '';
	// get the mPopup
	var mpopup = document.getElementsByClassName('mpopup')[0];
	// get the close action element
	var close = document.getElementsByClassName("close")[0];
    mpopup.style.display = "block";
    taskComment.style.display = "none";
	// close the mPopup once close element is clicked
	close.onclick = function() {
    	mpopup.style.display = "none";
	}
	// close the mPopup when user clicks outside of the box
	window.onclick = function(event) {
	    if (event.target === mpopup) {
	        mpopup.style.display = "none";
	    }
	}
}
/* This method is used to edit popup to prefill the form element value*/
function editTask(taskId){
	var taskComment = document.getElementById('task-comment');
	taskComment.setAttribute('placeholder', "Enter your comments here");
 	var tasks = JSON.parse(localStorage.getItem('Tasks'));
	var taskName = document.getElementById('task-name');
	var taskDesc = document.getElementById('task-desc');
	var taskAssignee = document.getElementById('task-assignee');
	var taskAssigner = document.getElementById('task-assigner');
	task = tasks[taskId-1];
	taskName.value = task.task_name;
	taskDesc.value = task.description;
	taskAssignee.value = task.assignee.id;
	taskAssigner.value = task.assigner.id;
	console.log('edit');
	console.log(task);
	console.log(task.assignee.id);
	// console.log(task['comments']);
	// console.log(Object.keys(task['comments']).length);
	// if((Object.keys(task['comments']).length) != ""){
	// 	createCustomElementAppendClass("div", {'class': 'comment-list'}, 'task-comment-sec');
	// 	createCustomElementAppendClass("ul", {'class': 'comment-ul'}, 'comment-list');
	// 	for (var i = 0; i < (Object.keys(task['comments']).length); i++) {
			
	// 		createCustomElementAppendClass("li", {'class': 'comment-li'}, 'comment-ul', task['comments'].comment);
	// 	}
	// }
	// console.log(task['comments']);
	var taskFormButton = document.getElementById('task-form-button');
	taskFormButton.setAttribute('onclick', "setTask('"+taskId+"')");

	// get the mPopup
	var mpopup = document.getElementsByClassName('mpopup')[0];
	// get the close action element
	var close = document.getElementsByClassName("close")[0];
    mpopup.style.display = "block";
    taskComment.style.display = "block";
	// close the mPopup once close element is clicked
	close.onclick = function() {
    	mpopup.style.display = "none";
	}
	// close the mPopup when user clicks outside of the box
	window.onclick = function(event) {
	    if (event.target == mpopup) {
	        mpopup.style.display = "none";
	    }
	}	
}
/* This method is used to add and edit task*/
function setTask(taskId){
	var taskName = document.getElementById('task-name');
	var taskDesc = document.getElementById('task-desc');
	var taskAssignee = document.getElementById('task-assignee');
	var taskAssigner = document.getElementById('task-assigner');
	var taskComment = document.getElementById('task-comment');
	var taskNameValue = taskName.value;
	var taskDescValue = taskDesc.value;
	var tasks = JSON.parse(localStorage.getItem('Tasks'));
	var tasks = Object.keys(tasks).map(function (key) { return tasks[key]; });
	var users = JSON.parse(localStorage.getItem('Users'));
	var comments = [];
	var commentObject = new Object();
	var commentObject = Object.keys(commentObject).map(function (key) { return commentObject[key]; });
	commentObject = {comment: taskComment.value, commented_date: getCurrentDateTime()}
	if(taskId != "" && taskId != undefined){
		for (var i = 0; i < tasks.length; i++) {
			if(tasks[i].id == taskId){
				tasks[i].task_name = taskNameValue;
 				tasks[i].description = taskDescValue;
 				tasks[i].assignee = users[taskAssignee.value-1];
 				tasks[i].assigner = users[taskAssigner.value-1];
				setLocalStorage('Tasks',JSON.stringify(tasks));
			}
		}
	}else{
		var formData = {
			"id" :  tasks.length+1,
			"task_name" : taskNameValue,
			"description": taskDescValue,
			"status": 0,
			"start_date": getCurrentDateTime(),
			"assigner": users[taskAssigner.value-1],
			"assignee": users[taskAssignee.value-1]
		};
		if(taskNameValue){
			tasks.push(formData);
			setLocalStorage('Tasks',JSON.stringify(tasks));
		}
	}
	
	location.reload();
}
/* This method will return the current date and time*/
function getCurrentDateTime(){
	var newDate = new Date();  
	var dateString = '';
	// Get the month, day, and year. 
	dateString += newDate.getDate() + "/";  
	dateString += (newDate.getMonth() + 1) + "/";  
	dateString += newDate.getFullYear() + " ";
	dateString += newDate.getHours() + ":";
	dateString += newDate.getMinutes() + ":"; 
	dateString += newDate.getSeconds();  
	return dateString;
}