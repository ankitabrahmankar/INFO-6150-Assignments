import React, { Component } from 'react'
import TodoItem  from './TodoItem';
//import PropTypes from 'prop-types';

export class todos extends Component {

   
    render() {
         console.log('todos',this.props);

        return this.props.todos.map((todo) =>(
               <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} delTodo={this.props.delTodo} show={this.props.show}/>
            ));
       
         
    }
}

// todos.propTypes = {
//     todos: PropTypes.array.isRequired,
//     }
export default todos


