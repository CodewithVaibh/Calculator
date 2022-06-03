import "./style.css";
import "./App.css";
import { useReducer } from "react";
import DigitButton from "./Digits";
import OperationButton from "./operation";

export const Actions = {
    add_digit: "add-digit",
    ChooseOperation: 'chooseoperation',
    Delete: 'delete',
    Clear: 'clear',
    Equals: 'equals'
}

function reducer(state, { type, payload }) {
    switch (type) {
        case Actions.add_digit:
            if (state.overwrite == true) {
                return {
                    ...state,
                    currentoperand: payload.digit,
                    overwrite: false
                }
            }
            if (payload.digit === "0" && state.currentoperand === "0") {
                return state
            }
            if (payload.digit === "." && state.currentoperand.includes(".")) {
                return state
            }
            return {
                ...state,
                currentoperand: `${state.currentoperand || ""}${payload.digit}`,
            }
        case Actions.Clear:
            return {}
        case Actions.ChooseOperation:
            if (state.previousoperand == null && state.currentoperand == null) {
                return state
            }
            if (state.currentoperand == null) {
                return {
                    ...state,
                    operation: payload.operation
                }
            }
            if (state.previousoperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousoperand: state.currentoperand,
                    currentoperand: null
                }
            }
            return {
                ...state,
                previousoperand: evaluate(state),
                operation: payload.operation,
                currentoperand: null
            }

        case Actions.Equals:
            if (state.currentoperand == null || state.previousoperand == null || state.operation == null) {
                return state
            }
            return {
                ...state,
                currentoperand: evaluate(state),
                previousoperand: null,
                operation: null,
                overwrite: true
            }
        case Actions.Delete:
            if (state.overwrite) {
                return {
                    ...state,
                    currentoperand: null,
                    overwrite: false
                }
            }
            if (state.currentoperand == null) { return state }
            return {
                ...state,
                currentoperand: state.currentoperand.slice(0, -1)
            }


    }
}


function evaluate({ currentoperand, previousoperand, operation }) {
    const prev = parseFloat(previousoperand)
    const curr = parseFloat(currentoperand)
    if (isNaN(prev) || isNaN(curr))
        return ""
    let res = ''
    switch (operation) {
        case "+":
            res = prev + curr
            break
        case "-":
            res = prev - curr
            break
        case "x":
            res = prev * curr
            break
        case "%":
            res = prev / curr
            break
    }
    return res;
}


function App() {
    const [{currentoperand,previousoperand,operation}, dispatch] = useReducer(reducer,{})
     return (
              <div className="Calculator-grid">
                <div className="Output">
                  <div className="Previous-operand">{previousoperand} {operation}</div>            
                  <div className="current-operand">{currentoperand}</div>            
                </div>
                <button className="span-two" onClick={() => dispatch({type: Actions.Clear})}>AC</button>
                <button onClick={() => dispatch({type:Actions.Delete})}>DEL</button> 
                <OperationButton operation="%" dispatch={dispatch}></OperationButton>                                                    
                <DigitButton digit="1" dispatch={dispatch}></DigitButton>                                                     
                <DigitButton digit="2" dispatch={dispatch}></DigitButton>                                                     
                <DigitButton digit="3" dispatch={dispatch}></DigitButton>                                                     
                <OperationButton operation="x" dispatch={dispatch}></OperationButton>                                                  
                <DigitButton digit="4" dispatch={dispatch}></DigitButton>                                                      
                <DigitButton digit="5" dispatch={dispatch}></DigitButton>                                                      
                <DigitButton digit="6" dispatch={dispatch}></DigitButton>                                                   
                <OperationButton operation="+" dispatch={dispatch}></OperationButton>                                                   
                <DigitButton digit="7" dispatch={dispatch}></DigitButton>                                                                                                          
                <DigitButton digit="8" dispatch={dispatch}></DigitButton>                                                                                                          
                <DigitButton digit="9" dispatch={dispatch}></DigitButton>                                                                                                
                <OperationButton operation="-" dispatch={dispatch}></OperationButton>                                                    
                <DigitButton digit="." dispatch={dispatch}></DigitButton>    
                <DigitButton digit="0" dispatch={dispatch}></DigitButton>   
                
                <button className="span-two" onClick={() => dispatch({type: Actions.Equals})}>=</button>
              </div>
            );
          }
          
          export default App;