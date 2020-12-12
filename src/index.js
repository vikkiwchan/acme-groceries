import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import axios from 'axios';


const initialState = {
  groceries: []
};
const store = createStore((state = initialState, action)=> {
  if(action.type === 'LOAD'){
    state = {...state, groceries: action.groceries };
  }
  return state;
});


class _App extends Component{
  componentDidMount(){
    this.props.bootstrap();
  }
  render(){
    const { groceries } = this.props;
    return (
      <div>
        <h1>Acme Groceries</h1>
        <ul>
          {
            groceries.map( grocery => {
              return (
                <li key={ grocery.id } className={ grocery.purchased ? 'purchased': ''}>{ grocery.name }</li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

const App = connect(
  state => state,
  (dispatch)=> {
    return {
      bootstrap: async()=> {
        const groceries = (await axios.get('/api/groceries')).data;
        dispatch({
          type: 'LOAD',
          groceries
        })
      } 
    }
  }
)(_App);


render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));
