import React ,{Component} from "react";
import {connect} from "react-redux";
import classes from './Login.css';
import * as actionsCreators from "../../../store/actions/index";
import { withRouter } from 'react-router'
import Input from "../../../components/UI/Input/Input";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';


class Login extends Component{
    state = {
        loginForm:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
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
    }

    inputChangedHandler(event, inputID){
        const updateLoginForm={
            ...this.state.loginForm
        };
        const updateFormElement={
            ...this.state.loginForm[inputID]
        };

        updateFormElement.value=event.target.value;
        updateFormElement.valid=this.checkValidity(updateFormElement.value,
        updateFormElement.validation);
        updateFormElement.touched=true;
        let formIsValid = true;
        for(let inputID in updateLoginForm){
            formIsValid = updateLoginForm[inputID].valid && formIsValid;
        }
        updateLoginForm[inputID]=updateFormElement;
        this.setState({
        loginForm:updateLoginForm,
        formIsValid:formIsValid
        });

    };

    linkToForgetPasswordPage = ()=>{
        this.props.history.push('/forgetpassword');
    };

     
    loginClickedHandler = (event)=>{
        event.preventDefault();
        let formData={};
        for(let formElementIdentifier in this.state.loginForm){
            formData[formElementIdentifier] = this.state.loginForm[formElementIdentifier].value;
        };

        this.props.onLoginStart(formData);
    };

    render(){
        const formElementsArray = [];
        for(let key in this.state.loginForm){
            formElementsArray.push({
                id:key,
                config:this.state.loginForm[key]
            });
        };
        let form = (
            <form onSubmit={this.loginClickedHandler}>
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
            <Button btnType="Success" disabled={!this.state.formIsValid}>SIGNIN</Button>
        </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.Login}>
                <h4>Enter your data to Signin :</h4>
                {form}
                <p><span onClick={this.linkToForgetPasswordPage}className={classes.Span}>Forget Password</span> </p>
            </div>
        );
    };
};

const mapStateToProps=state=>{
    return{
        loading:state.login.loading
    };
}
const mapDispatchToProps=dispatch=>{
    return{
        onLoginStart:(formData) => dispatch(actionsCreators.onLogin(formData))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login));