window.onload = function() {
	TaskList = new Object();
	User = new Object();
	// write_localstorage();
	generate_layout();
}
function write_localstorage(){
	User[0] = {id: '1',username: 'Ram'}
	User[1] = {id: '2',username: 'Kumar'}
	User[2] = {id: '3',username: 'Ganesh'}
	User[3] = {id: '4',username: 'Karthick'}
	User[4] = {id: '5',username: 'suresh'}
	User[5] = {id: '6',username: 'Mani'}
	User[6] = {id: '7',username: 'Lokesh'}
	User[7] = {id: '8',username: 'John'}
	TaskList[0] = {id:'1', task_name:'test task1', assignee: User[1],start_date:'20/01/2017', status: 'Initial', description: 'test description', comment: 'testcomment',assigner:User[0] };
	TaskList[1] = {id:'2', task_name:'task2', assignee: User[2],start_date:'25/01/2017', status: 'Dev', description: 'task2 description', comment: 'task2 comment', assigner: User[0]};
	// TaskList[2] = {task_name:'task3', username: "Raja",start_date:'26/01/2017', status: 'QA', description: 'task3 description', comment: 'task3 comment'};
	// TaskList[3] = {task_name:'task4', username: "vinoth",start_date:'29/01/2017', status: 'Completed', description: 'task4 description', comment: 'task4 comment'};
	localStorage.setItem('Tasks',JSON.stringify(TaskList)); 
}

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
	var add_task = createcustomElement("button", {'id': 'add_task'}, 'column1-header', 'Add Task');
	var column1_body = createcustomElement("div", {'class': 'column1-body'}, 'column1-inner');

	tasks = localStorage.getItem('Tasks');
 	tasks = JSON.parse(tasks);

 	for (var i = 0; i < (Object.keys(tasks).length); i++) {
 		if(tasks[i].status == 'Initial'){console.log(tasks[0]);
 			setTaskDiv(tasks[i], 'column1-body', 'Initial','task-box'+tasks[i].id);
		}
 	}

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
}

/* Task block */
function setTaskDiv(task, divclass, status, childdivclass){console.log(task);
	createcustomElement("div", {'class': childdivclass},divclass);
	createcustomElement("label", {'class': 'task-label'},childdivclass,'Task Name : ');
	createcustomElement("label", {'class': 'task'}, childdivclass, task.task_name);
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
	if(status == 'Initial'){
		createcustomElement("button", {'id': 'move-to-dev-'+task.id}, childdivclass,'Move to Dev');
	}else if(status == 'Dev'){
		createcustomElement("button", {'id': 'move-to-dev-'+task.id}, childdivclass,'Move to QA');
	}else if(status == 'QA'){
		createcustomElement("button", {'id': 'move-to-dev-'+task.id}, childdivclass,'Move to Complted');
	}
	if(status != 'Completed'){
		var move_to_dev = document.getElementById('move-to-dev-'+task.id);
		move_to_dev.setAttribute('onclick', "move_to_next_level("+task.id+")");
	}

}
/* Move button click to update the task status from current status level to next status level*/
function move_to_next_level(id){
	tasks = localStorage.getItem('Tasks');
 	tasks = JSON.parse(tasks);
 	for (var i = 0; i < (Object.keys(tasks).length); i++) {
 		if(tasks[i].id == id){
 			if(tasks[i].status == "Initial"){alert('ji');
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

/*Create custom HTML element*/
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
	var elementvalue = document.getElementsByClassName(inner);console.log(elementvalue);
	elementvalue[0].appendChild(el);
	return inner;
}

function createTask(){

alert('hello');
}