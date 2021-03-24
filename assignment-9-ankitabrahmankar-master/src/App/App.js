import "./App.scss";
import React, { Component } from "react";
import Todos from "../todoComponent/todos";
import Header from "../header/Header";
import AddTodo from "../todoComponent/AddTodo";
class App extends Component {
  // state = {
  //   todos: [

  //   ]
  // };

  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      isLoading: false,
      visible: false,
    };
  }

  // componentDidMount() {
  //   this.setState({ isLoading: true });
  //   const apiUrl = '/todos';
  //   fetch(apiUrl)
  //     .then(response => response.json())
  //     .then(data => this.setState({ todos: data, isLoading: false }));
  // }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const apiUrl = "/todos";
    const response = await fetch(apiUrl);
    const data = await response.json();

console.log('due date --> ', data);


     data.forEach(val =>{
        var date = new Date(val.dueDate);
        var dd = date.getDate()+1; 
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear(); 
        if(dd<10){dd='0'+dd} 
        if(mm<10){mm='0'+mm};
        // var dueDate = dd+'/'+mm+'/'+yyyy
        val.dueDate = yyyy+"-"+mm+"-"+dd ; //mm+'/'+dd+'/'+yyyy;
    });


    
    this.setState({ todos: data, isLoading: false });
  }

  markComplete = (id) => {
    let object = {};
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.isCompleted = !todo.isCompleted;
          console.log('todo-->' ,todo);
          // mm/dd/yyyy --> yyyy-mm-dd


          var newdate =todo.dueDate.includes("/")? todo.dueDate.split("/")[2] +"-"+ todo.dueDate.split("/")[0] +"-"+todo.dueDate.split("/")[1]:todo.dueDate;
          console.log('new date : ', newdate)
           todo.dueDate = newdate;
          object = { ...object, ...todo };
        }

        return todo;
      }),
    });

    // alert(JSON.stringify(object));
    console.log("State -->", JSON.stringify(object));

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    };

    fetch("/todos/" + id, requestOptions).then((response) => response.json());
  };

  show = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.open = !todo.open;
        }
        return todo;
      }),
    });
  };

  delTodo = (id) => {
    console.log(id);

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    //this.setState({ isLoading: true });
    const apiUrl = "/todos/";
    fetch("/todos/" + id, requestOptions)
      .then((response) => response.json())
      .then(() => this.setState({ status: "Delete successful" }));

    this.setState({
      todos: [...this.state.todos.filter((todo) => todo.id !== id)],
    });
  };

  showForm = () => {
    this.setState({
      visible: true
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <Header />
          <Todos
            todos={this.state.todos}
            markComplete={this.markComplete}
            delTodo={this.delTodo}
            show={this.show}
          />
          {this.state.visible ? <AddTodo /> : null}
          <button
            className="AddTodoView"
            onClick={this.showForm}
          >
            ADD NEW TODO
          </button>
          {/* <AddTodo /> */}
        </div>
      </div>
    );
  }
}

export default App;
