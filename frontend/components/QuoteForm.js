import React  from 'react' // 👈 you'll need the reducer hook
import { useReducer } from 'react'

// 👇 these are the types of actions that can change state
const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'

// 👇 create your initial state object here
const state0 = {
  values: {
    id: 0,
    quoteText: "",
    authorName: "",
    apocryphal: false,
  },
}
// 👇 create your reducer function here
const reducer = (state, action) => {
  switch (action.type){
    case CHANGE_INPUT:
     return action.payload.name == 'authorName' 
     ?{...state, values:{...state.values, authorName: action.payload.value}}
     :{...state, values:{...state.values, quoteText: action.payload.value}}
    
    case RESET_FORM:
    return {...state, values: state0.values}
    default:
      return state
  }
}

export default function TodoForm({values ,createQuote = () => { } }) {
  
  // 👇 use the reducer hook to spin up state and dispatch

const [state, dispatch] = useReducer(reducer, state0)

  const onChange = (evt) => {
    // 👇 implement
    const {value, name } = evt.target
   dispatch({type:CHANGE_INPUT, payload: {name, value}})
    
    console.log(value, name)
  }
  const resetForm = () => {
    // 👇 implement
    dispatch({type:RESET_FORM})
  }
  const onNewQuote = (e) => {
    e.preventDefault()
    const authorName = state.values.authorName
    const quoteText = state.values.quoteText
    // 👇 implement
    createQuote({ authorName, quoteText })
    resetForm()
  }

  // 👇 some props are missing in the JSX below:
  return (
    <form id="quoteForm" onSubmit={onNewQuote}>
      <h3>New Quote Form</h3>
      <label><span>Author:</span>
        <input
          type='text'
          name='authorName'
          placeholder='type author name'
          onChange={onChange}
          value={state.values.authorName}
        />
      </label>
      <label><span>Quote text:</span>
        <textarea
          type='text'
          name='quoteText'
          placeholder='type quote'
          onChange={onChange}
          value={state.values.quoteText}
        />
      </label>
      <label><span>Create quote:</span>
        <button
          role='submit'
        >DO IT!</button>
      </label>
    </form>
  )
}
