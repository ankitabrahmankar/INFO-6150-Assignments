
import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import './AddTodo.scss'
export class AddTodo extends Component {
  // state = {
  //   // title: ''
  // }
 

  constructor(props) {
		super(props)

		this.state = {
      title: '',
      description: '',
      dueDate: '',
      dueTime: '',
      isCompleted: false,
      open: false
		}
	}
//Post request to add 


  
  onChange = (e) => this.setState(
    { [e.target.name]: e.target.value });

  onSubmit = (e) => {
    //e.preventDefault();
   
    //this.props.addTodo(this.state);
    //this.setState({});
    // const currentDate =  new Date();
    // if(this.state.dueDate < currentDate)
    // {
    //   console.log("Wrong date");
    // }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    };
  
    console.log("on submit  --->",this.state);
    // alert(this.state);
    //this.setState({ isLoading: true });
    const apiUrl = '/todos';
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ todos: data}))

  }

  render() {
    const currentDate =  new Date().getDate();
    return (
      <form className="form" onSubmit={this.onSubmit} >
        <input 
          type="text" 
          name="title" 
          className= "input"
          placeholder="Title ..." 
          required
          //value={this.state.title}
          onChange={this.onChange}
        />
        <br></br>
          <input 
          type="text" 
          name="description"
          className= "input" 
          placeholder="Add description ..." 
          //value={this.state.title}
          onChange={this.onChange}
        />
         <br></br>
          <input 
          type="date" 
          name="dueDate" 
          className= "input"
          placeholder="Add dueDate ..." 
          //value={this.state.title}
          min = 'currentDate'
          onChange={this.onChange}
        />
         <br></br>
          <input 
          type="time" 
          name="dueTime" 
          className= "input"
          placeholder="Add dueTime ..." 
          onChange={this.onChange}
        />
        <br></br>
        <input 
          type="submit" 
          value="AddTodo" 
          className="btn"
        />
      </form>
    )
  }
}


export default AddTodo
