import React, {Component}from "react";
import classes from "./Register.css";
import Input from "../../../components/UI/Input/Input";
import * as actionsCreators from "../../../store/actions/index";
import {connect} from "react-redux";
import Button from "../../../components/UI/Button/Button";
// import {Redirect} from "react-router-dom";
import { withRouter } from 'react-router'
import Spinner from "../../../components/UI/Spinner/Spinner";

class Register extends Component{
    state = {
        registerForm :{
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your UserName'
                },
                value: '',
                validation:{
                    required:true,
                    uniqe:true
                },
                valid:false,
                touched:false
            },
            fname :{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your first name '
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            lname:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your last name '
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation:{
                    required:true,
                    isEmail: true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
            // ,
            // confirmPassword:{
            //     elementType: 'input',
            //     elementConfig: {
            //         type: 'password',
            //         placeholder: 'Confirm password'
            //     },
            //     value: '',
            //     validation: {
            //         required: true,
            //         minLength: 6
            //     },
            //     valid: false,
            //     touched: false
            // }
        },
        formIsValid:false
    };


checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
};

registerClickedHandler=(event)=>{
    event.preventDefault();// stop the default action of the element.

    const formData={};
    for(let formElementIdentifier in this.state.registerForm){
         formData[formElementIdentifier]=this.state.registerForm[formElementIdentifier].value;
    }
    var first = formData.fname ;
    var last = formData.lname ;
    delete formData['fname'];
    delete formData['lname'];
    formData["name"] = {
        first:first,
        last:last
    };
    // console.log(formData);
    this.props.onRegisterStart(formData);       
}

inputChangedHandler=(event,inputID)=>{
    const updateRegisterForm={
        ...this.state.registerForm
    }
    const updateFormElement={
       ...updateRegisterForm[inputID]
    }
    updateFormElement.value=event.target.value;
    updateFormElement.valid=this.checkValidity(updateFormElement.value,
       updateFormElement.validation);
       updateFormElement.touched=true;
       let formIsValid = true;
       for(let inputID in updateRegisterForm){
            formIsValid = updateRegisterForm[inputID].valid && formIsValid;
       }
    updateRegisterForm[inputID]=updateFormElement;
    this.setState({
        registerForm:updateRegisterForm,
        formIsValid:formIsValid
    });

}

linkToLoginPage = ()=>{
    this.props.history.push('/login');
};

render () {
    const formElementsArray = [];
    for (let key in this.state.registerForm) {
        formElementsArray.push({
            id: key,
            config: this.state.registerForm[key]
        });
    }
    let form = (
        <form onSubmit={this.registerClickedHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    label={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    inValid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                     />
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>REGISTER</Button>
        </form>
    );
    if ( this.props.loading ) {
        form = <Spinner />;
    }
    return (
        <div className={classes.Register}>
            <h4>Enter your data to register :</h4>
            {form}
            <p>If you already have an account please 
                <span onClick={this.linkToLoginPage}className={classes.Span}>Login</span> </p>
        </div>
    );
};

};

const mapStateToProps=state=>{
    console.log('registerState',state);
    return{
        loading:state.register.loading
    };
}
const mapDispatchToProps=dispatch=>{
    return{
        onRegisterStart:(formData) => dispatch(actionsCreators.onRegister(formData))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Register));