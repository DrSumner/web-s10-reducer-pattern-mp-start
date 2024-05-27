import React from 'react' // 👈 you'll need the reducer hook
import { useReducer } from 'react'
import Quotes from './Quotes'
import QuoteForm from './QuoteForm'

// 👇 these are the types of actions that can change state
const CREATE_QUOTE = 'CREATE_QUOTE'
const DELETE_QUOTE = 'DELETE_QUOTE'
const EDIT_QUOTE_AUTHENTICITY = 'EDIT_QUOTE_AUTHENTICITY' // 👈 toggles the apocryphal property of a single quote
const SET_HIGHLIGHTED_QUOTE = 'SET_HIGHLIGHTED_QUOTE'     // 👈 highlights a quote (or un-highlights it)
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY'             // 👈 toggles whether to show all or only non-apocryphal

let id = 1
const getNextId = () => id++ // 👈 this is a helper to create new quotes
const quotes = [
  {
    id: getNextId(),
    quoteText: "Don't cry because it's over, smile because it happened.",
    authorName: "Dr. Seuss",
    apocryphal: false,
  },
  {
    id: getNextId(),
    quoteText: "So many books, so little time.",
    authorName: "Frank Zappa",
    apocryphal: false,
  },
  {
    id: getNextId(),
    quoteText: "Be yourself; everyone else is already taken.",
    authorName: "Oscar Wilde",
    apocryphal: false,
  },
]

// 👇 create your initial state object here

const state0 = {
  quotes: quotes,
  // values: {
  //   id: 0,
  //   quoteText: "",
  //   authorName: "",
  //   apocryphal: false,
  // },
    highlightedQuote: -1,
    displayAllQuotes: true
}

const reducer = (state, action) => {
  // 👇 implement your reducer here using the action types above
  switch (action.type) {
    case CREATE_QUOTE:
    return {...state, quotes: state.quotes.concat(action.payload)}
     case DELETE_QUOTE:
      return {...state, quotes: state.quotes.filter( quote => {
        return  quote.id !== action.payload
      }).map( quote => {
        
        return quote
      })
    }
      case EDIT_QUOTE_AUTHENTICITY:
        return {...state, quotes: state.quotes.map( quote => {
          if (quote.id === action.payload )
          {quote.apocryphal = !quote.apocryphal }
          return quote
          
        })}
      case SET_HIGHLIGHTED_QUOTE:
        return state.highlightedQuote === action.payload 
        ?{...state, highlightedQuote: null} 
        :{...state, highlightedQuote: action.payload}
      case TOGGLE_VISIBILITY:
        return {...state,  displayAllQuotes: !state.displayAllQuotes}
        default:
          return state
  }
}

export default function App() {
  // 👇 use the reducer hook to spin up state and dispatch
  const [state, dispatch] = useReducer(reducer, state0)

  const createQuote = ({ authorName, quoteText }) => {
    // 👇 use the helper function above to create a new quote
    const values = {
      id: getNextId(),
      quoteText: quoteText,
      authorName: authorName,
      apocryphal: false
    }
    // 👇 and dispatch it over to the reducer
    dispatch({type:CREATE_QUOTE, payload: values})

  }
  const deleteQuote = id => {
    // 👇 implement
    dispatch({type:DELETE_QUOTE, payload: id})
  }
  const editQuoteAuthenticity = id => {
    // 👇 implement
    dispatch({type:EDIT_QUOTE_AUTHENTICITY, payload: id})
  }
  const setHighlightedQuote = id => {
    // 👇 implement
    dispatch({type:SET_HIGHLIGHTED_QUOTE, payload: id})
  }
  const toggleVisibility = () => {
    // 👇 implement
    dispatch({type:TOGGLE_VISIBILITY})
  }

  return (
    <div id="mp">
      <h2>Module Project</h2>
      <Quotes
        quotes={state.quotes}
        deleteQuote={deleteQuote}
        editQuoteAuthenticity={editQuoteAuthenticity}
        setHighlightedQuote={setHighlightedQuote}
        toggleVisibility={toggleVisibility}
        highlightedQuote={state.highlightedQuote}
        displayAllQuotes={state.displayAllQuotes}
      // 👇 lots of props are missing! Check the Quotes component

      />
      <QuoteForm
        createQuote={createQuote}
        values={state.values}
      />
    </div>
  )
}
