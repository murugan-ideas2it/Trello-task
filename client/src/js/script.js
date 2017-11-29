window.onload = function() {
	TaskList = new Object();
	User = new Object();
	// write_localstorage();
	generate_layout();

}
/* User data and task data*/
function write_localstorage(){
	User[0] = {id: 1,username: 'Ram'}
	User[1] = {id: 2,username: 'Kumar'}
	User[2] = {id: 3,username: 'Ganesh'}
	User[3] = {id: 4,username: 'Karthick'}
	User[4] = {id: 5,username: 'suresh'}
	User[5] = {id: 6,username: 'Mani'}
	User[6] = {id: 7,username: 'Lokesh'}
	User[7] = {id: 8,username: 'John'}
	TaskList[0] = {id:1, task_name:'test task1', assignee: User[1],start_date:'20/01/2017', status: 'Initial', description: 'test description', comment: 'testcomment',assigner:User[0] };
	TaskList[1] = {id:2, task_name:'task2', assignee: User[2],start_date:'25/01/2017', status: 'Dev', description: 'task2 description', comment: 'task2 comment', assigner: User[0]};
	localStorage.setItem('Tasks',JSON.stringify(TaskList)); 
	localStorage.setItem('Users',JSON.stringify(User)); 
}
/* This method is used create overall page layout */
function generate_layout(){
	var header = createcustomElement("header", {'class': 'header'}, 'body');
	var headerh1 = createcustomElement("h1", {'class': 'header-title'}, 'header', 'Trello');
	var main = createcustomElement("div", {'class': 'main'}, 'body');
	var container = createcustomElement("div", {'class': 'container-box'}, 'main');
	/*Column 1*/
	var column1 = createcustomElement("div", {'class': 'column1'}, 'container-box');
	var column1_inner = createcustomElement("div", {'class': 'column1-inner'}, 'column1');
	var column1_header = createcustomElement("div", {'class': 'column1-header'}, 'column1-inner');
	var column1_h2 = createcustomElement("h3", {}, 'column1-header', 'Task');
	// var add_task = createcustomElement("button", {'id': 'add_task'}, 'column1-header', 'Add Task');
	var column1_body = createcustomElement("div", {'class': 'column1-body'}, 'column1-inner');
	tasks = localStorage.getItem('Tasks');
 	tasks = JSON.parse(tasks);
 	for (var i = 0; i < (Object.keys(tasks).length); i++) {
 		if(tasks[i].status == 'Initial'){
 			setTaskDiv(tasks[i], 'column1-body', 'Initial','task-box'+tasks[i].id);
		}
 	}
 	var add_task = createcustomElement("button", {'id': 'add_task'}, 'column1', 'Add Task');
 	var add_task_button = document.getElementById('add_task');
	var add_icon = document.createElement('i');
	add_icon.setAttribute('class', 'fa fa-plus')
	add_task_button.appendChild(add_icon);
	/*Column 2*/
	var column2 = createcustomElement("div", {'class': 'column2'}, 'container-box');
	var column2_inner = createcustomElement("div", {'class': 'column2-inner'}, 'column2');
	var column2_header = createcustomElement("div", {'class': 'column2-header'}, 'column2-inner');
	var column2_h2 = createcustomElement("h3", {}, 'column2-header', 'In Dev');
	var column2_body = createcustomElement("div", {'class': 'column2-body'}, 'column2-inner');

	for (var i = 0; i < (Object.keys(tasks).length); i++) {
 		if(tasks[i].status == 'Dev'){
 			setTaskDiv(tasks[i], 'column2-body', 'Dev','task-box'+tasks[i].id);
		}
 	}
	/*Column 3*/
	var column3 = createcustomElement("div", {'class': 'column3'}, 'container-box');
	var column3_inner = createcustomElement("div", {'class': 'column3-inner'}, 'column3');
	var column3_header = createcustomElement("div", {'class': 'column3-header'}, 'column3-inner');
	var column3_h2 = createcustomElement("h3", {}, 'column3-header', 'In QA');
	var column3_body = createcustomElement("div", {'class': 'column3-body'}, 'column3-inner');

	for (var i = 0; i < (Object.keys(tasks).length); i++) {
 		if(tasks[i].status == 'QA'){
 			setTaskDiv(tasks[i], 'column3-body', 'QA','task-box'+tasks[i].id);
			
		}
 	}
	/*Column 4*/
	var column4 = createcustomElement("div", {'class': 'column4'}, 'container-box');
	var column4_inner = createcustomElement("div", {'class': 'column4-inner'}, 'column4');
	var column4_header = createcustomElement("div", {'class': 'column4-header'}, 'column4-inner');
	var column4_h2 = createcustomElement("h3", {}, 'column4-header', 'Completed');
	var column4_body = createcustomElement("div", {'class': 'column4-body'}, 'column4-inner');
	for (var i = 0; i < (Object.keys(tasks).length); i++) {
 		if(tasks[i].status == 'Completed'){
 			setTaskDiv(tasks[i], 'column4-body', 'Completed','task-box'+tasks[i].id);
		}
 	}
	var footer = createcustomElement("footer", {'class': 'footer'}, 'body');
	var footer_content = createcustomElement("p", {}, 'footer', 'Copyright © Ideas2IT | All Rights Reserved');
	var add_task_button = document.getElementById('add_task');
	add_task_button.setAttribute('onclick', 'createTask()');


	createcustomElement("div", {'class': 'mpopup'}, 'body');
	createcustomElement("div", {'class': 'mpopup-content'}, 'mpopup');
	createcustomElement("div", {'class': 'mpopup-head'}, 'mpopup-content');
	createcustomElement("span", {'class': 'close'}, 'mpopup-head', 'x');
	createcustomElement("h2", {}, 'mpopup-head', 'Task Details');
	createcustomElement("div", {'class': 'mpopup-main'}, 'mpopup-content');
	createcustomElement("form", {'id': 'task-form'}, 'mpopup-main');
	createcustomElement("input", {'id': 'task-name'}, 'mpopup-main');
	createcustomElement("textarea", {'id': 'task-desc'}, 'mpopup-main');
	createcustomElement("select", {'id': 'task-assignee'}, 'mpopup-main');
	createcustomElement("select", {'id': 'task-assigner'}, 'mpopup-main');
	createcustomElement("button", {'id': 'task-form-button'}, 'mpopup-main', 'Save');
	var task_form_button = document.getElementById('task-form-button');
	task_form_button.setAttribute('onclick', "setTask()");

	var users = localStorage.getItem('Users');     
	users = JSON.parse(users);
	assigneeValueSet(users);
	assignerValueSet();
	var assignee = document.getElementById('task-assignee');
	assignee.setAttribute('onchange', "assignerValueSet()");
 	
}
/* This method is used to set the Assigner dropdown options */
function assignerValueSet(){
	var assignee = document.getElementById('task-assignee');
	var assigner = document.getElementById('task-assigner');
	assigner.options.length = 0;
	var users = localStorage.getItem('Users');     
	users = JSON.parse(users);
	var opt = document.createElement('option');
	opt.innerHTML = "Select Assigner";
			    opt.value = '';
			    assigner.appendChild(opt);
	for (var i = 0; i < (Object.keys(users).length); i++) {
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
	for (var i = 0; i < (Object.keys(users).length); i++) {
	    var opt = document.createElement('option');
	    opt.innerHTML = users[i].username;
	    opt.value = users[i].id;
	    assignee.appendChild(opt);
	}
}
/* This method is used to create the task view list */
function setTaskDiv(task, divclass, status, childdivclass){
	createcustomElement("div", {'class': childdivclass},divclass);

	createcustomElement("label", {'class': 'task-label'},childdivclass,'Task Name : ');
	createcustomElement("label", {'class': 'task'}, childdivclass, task.task_name);
	createcustomElement("span", {'id': 'edit-task'+task.id},childdivclass);
	createcustomElement("br", {}, childdivclass);
	createcustomElement("label", {'class': 'task-label'}, childdivclass,'Description : ');
	createcustomElement("label", {'class': 'task'}, childdivclass, task.description);
	createcustomElement("br", {}, childdivclass);
	createcustomElement("label", {'class': 'task-label'}, childdivclass,'Start Date : ');
	createcustomElement("label", {'class': 'task'}, childdivclass, task.start_date);
	createcustomElement("br", {}, childdivclass);
	createcustomElement("label", {'class': 'task-label'}, childdivclass,'Assignee : ');
	createcustomElement("label", {'class': 'task'}, childdivclass, task.assignee.username);
	createcustomElement("br", {}, childdivclass);
	createcustomElement("label", {'class': 'task-label'}, childdivclass,'Assigner : ');
	createcustomElement("label", {'class': 'task'}, childdivclass, task.assigner.username);
	createcustomElement("br", {}, childdivclass);
	if(status == 'Initial'){
		createcustomElement("button", {'id': 'move-to-dev-'+task.id}, childdivclass,'Move to Dev');
	}else if(status == 'Dev'){
		createcustomElement("button", {'id': 'move-to-back-'+task.id}, childdivclass,'Move to Initial');
		createcustomElement("button", {'id': 'move-to-dev-'+task.id}, childdivclass,'Move to QA');
	}else if(status == 'QA'){
		createcustomElement("button", {'id': 'move-to-back-'+task.id}, childdivclass,'Move to Dev');
		createcustomElement("button", {'id': 'move-to-dev-'+task.id}, childdivclass,'Move to Completed');
	}
	if(status != 'Completed'){
		var move_to_dev = document.getElementById('move-to-dev-'+task.id);
		move_to_dev.setAttribute('onclick', "move_to_next_level("+task.id+")");
	}
	if(status != 'Completed' && status != 'Initial'){
		var move_to_back = document.getElementById('move-to-back-'+task.id);
		move_to_back.setAttribute('onclick', "move_to_prev_level("+task.id+")");
	}
	
	// var edit_icon = document.createElement('i');
	// edit_icon.setAttribute('class', 'fa fa-edit');
	// createcustomElement("i", {'class': 'fa fa-edit-task'},childdivclass,'edit');
	var edit_task = document.getElementById('edit-task'+task.id);
	edit_task.setAttribute('class', "edit-task");
	edit_task.setAttribute('onclick', "editTask("+task.id+")");

	// var edit_task_span = document.getElementById('edit-task'+task.id);
	var edit_icon = document.createElement('i');
	edit_icon.setAttribute('class', 'fa fa-edit')
	edit_task.appendChild(edit_icon);


}
/* Move button click to update the task status from current status level to next status level*/
function move_to_next_level(id){
	tasks = localStorage.getItem('Tasks');
 	tasks = JSON.parse(tasks);
 	for (var i = 0; i < (Object.keys(tasks).length); i++) {
 		if(tasks[i].id == id){
 			if(tasks[i].status == "Initial"){
 				tasks[i].status = 'Dev';
 			}else if(tasks[i].status == "Dev"){
 				tasks[i].status = 'QA';
 			}else if(tasks[i].status == "QA"){
 				tasks[i].status = 'Completed';
 			}
 		} 
 	}
 	localStorage.setItem('Tasks', JSON.stringify(tasks));
	location.reload();
}
/* This method to move the task status from current level to previous level*/
function move_to_prev_level(id){
	tasks = localStorage.getItem('Tasks');
 	tasks = JSON.parse(tasks);
 	for (var i = 0; i < (Object.keys(tasks).length); i++) {
 		if(tasks[i].id == id){
 			if(tasks[i].status == "Dev"){
 				tasks[i].status = 'Initial';
 			}else if(tasks[i].status == "QA"){
 				tasks[i].status = 'Dev';
 			}
 		} 
 	}
 	localStorage.setItem('Tasks', JSON.stringify(tasks));
	location.reload();
}
/*Create custom HTML element common function*/
function createcustomElement(element,attribute,inner, text){
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
		var elementvalue = document.getElementsByClassName(inner);
		elementvalue[0].appendChild(el);
	// }
	
	return inner;
}
/* This method is used to add and edit task option to open the modal popup*/
function createTask(){
	var task_name = document.getElementById('task-name');
		task_name.setAttribute('placeholder', "Enter the Task Name");
	var task_desc = document.getElementById('task-desc');
		task_desc.setAttribute('placeholder', "Enter the Task Description");
	var task_assignee = document.getElementById('task-assignee');
	var task_assigner = document.getElementById('task-assigner');console.log(tasks);
	task_name.value = '';
	task_desc.value = '';
	task_assignee.value = '';
	task_assigner.value = '';

	// get the mPopup
	var mpopup = document.getElementsByClassName('mpopup')[0];
	// get the close action element
	var close = document.getElementsByClassName("close")[0];
    mpopup.style.display = "block";
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
/* This method is used to edit popup to prefill the form element value*/
function editTask(taskId){
	tasks = localStorage.getItem('Tasks');
 	tasks = JSON.parse(tasks);
	var task_name = document.getElementById('task-name');
	var task_desc = document.getElementById('task-desc');
	var task_assignee = document.getElementById('task-assignee');
	var task_assigner = document.getElementById('task-assigner');console.log(tasks);
	task_name.value = tasks[taskId-1].task_name;
	task_desc.value = tasks[taskId-1].description;
	task_assignee.value = tasks[taskId-1]['assignee'].id;
	task_assigner.value = tasks[taskId-1]['assigner'].id;
	console.log(tasks[taskId-1]['assignee'].id);

	var task_form_button = document.getElementById('task-form-button');
	task_form_button.setAttribute('onclick', "setTask('"+taskId+"')");

	// get the mPopup
	var mpopup = document.getElementsByClassName('mpopup')[0];
	// get the close action element
	var close = document.getElementsByClassName("close")[0];
    mpopup.style.display = "block";
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
	var task_name = document.getElementById('task-name');
	var task_desc = document.getElementById('task-desc');
	var task_assignee = document.getElementById('task-assignee');
	var task_assigner = document.getElementById('task-assigner');
	var task_name_value = task_name.value;
	var task_desc_value = task_desc.value;
	var tasks = JSON.parse(localStorage.getItem('Tasks'));
	var tasks = Object.keys(tasks).map(function (key) { return tasks[key]; });
	var users = JSON.parse(localStorage.getItem('Users'));

	if(taskId != "" && taskId != undefined){
		for (var i = 0; i < (Object.keys(tasks).length); i++) {
			if(tasks[i].id == taskId){
				tasks[i].task_name = task_name_value;
				tasks[i].description = task_desc_value;
				tasks[i].assignee = users[task_assignee.value-1];
				tasks[i].assigner = users[task_assigner.value-1];
				localStorage.setItem('Tasks', JSON.stringify(tasks));
			}
			console.log(tasks[i]);
		}

	}else{
		var formdata = new Object();
		formdata.id = (Object.keys(tasks).length)+1;
		formdata.task_name = task_name_value;
		formdata.description = task_desc_value;
		formdata.status = 'Initial';
		formdata.start_date = getCurrentDateTime();
		formdata.assigner = users[task_assigner.value-1];
		formdata.assignee = users[task_assignee.value-1];
		if(formdata.task_name != ""){
			tasks.push(formdata);
			localStorage.setItem('Tasks', JSON.stringify(tasks));
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
