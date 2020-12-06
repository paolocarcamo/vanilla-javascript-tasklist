// [Define UI Variables]

// FORM
const form = document.querySelector('#task-form');
// Unordered List
const taskList = document.querySelector('.collection');
// Clear Button
const clearBtn = document.querySelector('.clear-tasks');
// Filter
const filter = document.querySelector('#filter');
// Input for typing in the task
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);

  // Remove task event
  taskList.addEventListener('click', removeTask);

  // Clear task event
  clearBtn.addEventListener('click', clearTasks);

  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// [ADD TASK - EVENT HANDLER]
function addTask(e) {
  // Test to see if there is anything entered inside of the input upon submit, if not -> ALERT will action
  if (taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');

  // Add class | with Materialize, in order for your UL to look good, the UL should have a class of "collection"
  // and the LI's should have a class of "collection-item"
  li.className = 'collection-item';

  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // Create new link element
  const link = document.createElement('a');

  // Add class
  link.className = 'delete-item secondary-content';

  // Add 'icon' HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append the link to li
  li.appendChild(link);

  // Append li to the ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage();

  // Clear the task input
  taskInput.value = '';

  e.preventDefault();
}

// [STORE TASK in LS - EVENT HANDLER]
function storeTaskInLocalStorage(task) {
  // First, we initialize our 'tasks' variable, which will essentially be an array
  let tasks;
  // Then, we use an if/else statement to check the contents of our local storage to act respectively.
  // The "IF" statement will use the .getItem method to retreive the data from LS and check to see if empty:
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
    // Our "ELSE" statement will set tasks equal to whatever is within our local storage. In order to do that,
    // we need to remember that LS can only store strings. That said, we use [JSON.parse();] in order to convert
    // the data into JSON, again, in this case, it's just one item - an array:
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // Afterward, what we want to do is use the .push() method in order to append into the tasks variable.
  tasks.push(task);

  // Then, the last thing we want to do is set it back to local storage, again ensuring that our data is
  // properly converted into a string using [JSON.stringify()]
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// [REMOVE TASK - EVENT HANDLER]
function removeTask(e) {
  // If the 'a' tag (e.target.parentElement) contains "delete-item" in its class list
  if (e.target.parentElement.classList.contains('delete-item')) {
    // Upon click, confirm if user is sure and remove li (e.taret.parentElement.parentElement)
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// [CLEAR TASKS - EVENT HANDLER]
function clearTasks() {
  // OPTION #1:
  // taskList.innerHTML = '';

  // OPTION #2 | FASTER*:
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);

    // RESOURCE FOR TWO OPTIONS ABOVE:
    // http://jsperf.com/innerhtml-vs-removechild
  }
}

// [FILTER TASKS - EVENT HANDLER]
function filterTasks(e) {
  // Targetting the value of the 'filter' input and converting to lower case
  const text = e.target.value.toLowerCase();

  // Making selection to focus on ALL the list items with the class of 'collection-item' - since we are using
  // 'querySelectorAll' it turns all of the relevant selected items into a node list. That being the case we
  // are then able to use forEach to loop through everything. Then, our callback function executes action with
  // the help of conditionals to dictate our filter parameters:
  document.querySelectorAll('.collection-item').forEach(function (task) {
    // This 'item' variable is set so that it is focused on the text Content of the first child of the li
    // in this case, this would be the textContent of the li tag
    const item = task.firstChild.textContent;
    // If there is no match, the index of our text would be equal to '-1', but in our 'if' condition,
    // it states that if the item to lowercase is NOT equal to '-1,' i.e. there IS a match, our display shows
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
      // Otherwise, if there is NO match to what is passed in, the display of that task will not show
    } else {
      task.style.display = 'none';
    }
  });
}
