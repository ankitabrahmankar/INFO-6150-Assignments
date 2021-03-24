import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './TodoItem.scss';

export class TodoItem extends Component {
    
    getStyle(){
        if(this.props.todo.isCompleted){
            return{
                textDecoration : "line-through"
                
            }
        }
        else{
            return{
                textDecoration : "none" 
            }
        }
    }

    getPStyle(){
        const currentDate = new Date();

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        console.log('this.props.todo.dueDate', this.props.todo.dueDate);

        var date = new Date(this.props.todo.dueDate);
        var dd = date.getDate()+1; 
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear(); 
        if(dd<10){dd='0'+dd} 
        if(mm<10){mm='0'+mm};
        var dueDate = mm+'/'+dd+'/'+yyyy

        console.log("Today----------->", today, dueDate);
        if(this.props.todo.isCompleted){
            return{
                backgroundColor : "#d0f0c0"
            }

        }
        else if(dueDate < today && this.props.todo.isCompleted !== true){
            return{
                backgroundColor : "#FA8072"
            }
              
        }
    }

    collapsible(){
        if(this.props.todo.open){
            return{
                display: "block"
            }
        }
        else{
            return{
                display: "none"
            }
        }
    }

   
    
    render() {
        const {id, title, description, dueDate, dueTime} = this.props.todo;
        return (
            <div style={this.getStyle()}>
               <p className="todo" style={this.getPStyle()}>
               <input type='checkbox' checked={this.props.todo.isCompleted} onChange={this.props.markComplete.bind(this,id)} /> {''}
               <button className="DeleteBtn" onClick={this.props.delTodo.bind(this, id)}>x</button>
               <button className="Show" onClick={this.props.show.bind(this, id)}>Show More</button>
                   {title}</p> 
                <div className="panel" style={this.collapsible()}>
				    {description} 
                   
			    </div> 
                <div className="panel" style={this.collapsible()}>
                    {dueDate}
                    
			    </div> 
                <div className="panel" style={this.collapsible()}>
                    {dueTime}
                    
			    </div> 
            </div>
        )
    }
}
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    }
export default TodoItem
