//path for the todo.json file
const contentsPath = "data/todo.json";

// Fetching the elements from HTML
const todoContainer = document.getElementById("todo-container");
const ul = document.getElementById("mainUl");


let li, a;

//Function to populate the contents of JSON file 
const populate = (contents) => {
  contents.forEach((todo) => {
    li = document.createElement("li");
    li.setAttribute("id", "titleTodo");
    li.classList.add("collapsible");
    var text = todo.title;
    li.innerHTML = text;

    var doneBtn = document.createElement("button");
    doneBtn.setAttribute("id", "doneBtn");
    doneBtn.classList.add("doneBtn");
    doneBtn.innerHTML = "Mark Done";
    li.appendChild(doneBtn);

    //Trying to put ul inside li for details of todo
    let ul_sub = document.createElement("ul");
    ul_sub.classList.add("panel");
    let li_sub1, li_sub2, li_sub3, text_sub;

    li_sub1 = document.createElement("li");
    text_sub = todo.description;
    li_sub1.innerHTML = text_sub;

    li_sub2 = document.createElement("li");
    text_sub = todo.dueDate;
    li_sub2.innerHTML = text_sub;

    li_sub3 = document.createElement("li");
    text_sub = todo.time;
    li_sub3.innerHTML = text_sub;

    ul_sub.appendChild(li_sub1);
    ul_sub.appendChild(li_sub2);
    ul_sub.appendChild(li_sub3);

    li.appendChild(ul_sub);
    ul.appendChild(li);
  });

  todoContainer.appendChild(ul);
  collapsible();
};

//Function to create collapsible for the elements from todo.json file
const collapsible = () => {
  let list = document.getElementsByClassName("collapsible");
  console.log("List is -->", list.length, list);

  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.children[1];
      console.log("Panel is --->", panel);

      if (panel.style.display == "block") {
        console.log("setting view to NONE inside if--->");
        panel.style.display = "none";
      } else {
        console.log("inside Else-->");
        panel.style.display = "block";
      }
    });

    var btn = list[i].children[0];
    btn.addEventListener("click", function () {
      if (list[i].style.textDecoration == "") {
        list[i].style.textDecoration = "line-through";
        list[i].children[1].style.textDecoration = "line-through";
      } else {
        list[i].style.textDecoration = "";
        list[i].children[1].style.textDecoration = "";
      }
    });
  }
};

//Function to create new view to add new todo into the list
const showForm = () => {
  document.getElementById("addTodoForm").style.display = "block";
};

//Function which actually created new todo 
const newElement = () => {
  let li = document.createElement("li");
  li.classList.add("collapsible1");
  var title = document.getElementById("titleInput").value;
  li.innerHTML = title;
  if (title == "") {
    alert("You must write something!");
    return;
  }
  var doneBtn = document.createElement("button");
  doneBtn.setAttribute("id", "doneBtn");
  doneBtn.classList.add("doneBtn");
  doneBtn.innerHTML = "Mark Done";
  li.appendChild(doneBtn);

  let ul_sub = document.createElement("ul");
  ul_sub.classList.add("panelSub");
  let li_sub1, li_sub2, li_sub3, text_sub;

  li_sub1 = document.createElement("li");
  text_sub = document.getElementById("descriptionInput").value;
  li_sub1.innerHTML = text_sub;

  li_sub2 = document.createElement("li");
  text_sub = document.getElementById("dueDateInput").value;
  li_sub2.innerHTML = text_sub;

  li_sub3 = document.createElement("li");
  text_sub = document.getElementById("timeInput").value;
  li_sub3.innerHTML = text_sub;

  ul_sub.appendChild(li_sub1);
  ul_sub.appendChild(li_sub2);
  ul_sub.appendChild(li_sub3);

  li.appendChild(ul_sub);
  document.getElementById("mainUl").appendChild(li);

  console.log("------------------------------>", li.children);

  //markdone -
  li.children[0].addEventListener("click", function () {
    if (li.style.textDecoration == "") {
      li.style.textDecoration = "line-through";
      li.children[1].style.textDecoration = "line-through";
    } else {
      li.style.textDecoration = "";
      li.children[1].style.textDecoration = "";
    }
  });

  //collapsible
  li.addEventListener("click", function () {
    this.classList.toggle("active");
    var panelSub = this.children[1];
    console.log("Panel is --->", panelSub);

    if (panelSub.style.display == "block") {
      console.log("setting view to NONE inside if--->");
      panelSub.style.display = "none";
    } else {
      console.log("inside Else-->");
      panelSub.style.display = "block";
    }
  });
};

//Function which takes data from json and using XHR displays it 
const showButton = document.getElementById("todo-show");
showButton.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", contentsPath);
  xhr.addEventListener("load", (evt) => {
    const contents = JSON.parse(evt.target.responseText);
    populate(contents);
  });
  xhr.send();
});
