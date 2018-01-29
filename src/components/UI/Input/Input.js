import React from "react";
import classes from "./Input.css";

const input= (props)=>{
    let inputElement = null;
    const inputClasses=[classes.InputElement];

    if(props.inValid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch(props.inputElement){
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                onKeyDown={props.changed}
                onKeyUp={props.changed}
            />;
            break;
        case ('textarea'):
            inputElement = <textarea/>;
            break;
        case ( 'select' ):
            inputElement = <select/>;
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                onKeyDown={props.changed}
                onKeyUp={props.changed}
            />;
    };

    return(
        // jsx code here ...
        <div className={classes.Input}>
            {/* <label className={classes.Label}>{props.label}</label> */}
            {inputElement}
        </div>
    )
};

export default input;