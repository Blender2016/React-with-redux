import React ,{Component} from "react";
import {connect} from "react-redux";
import classes from './ForgetPassword.css';
import * as actionsCreators from "../../../store/actions/index";
import { withRouter } from 'react-router'
import Input from "../../../components/UI/Input/Input";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';


class ForgetPassword extends Component{
    state = {
        emailForm:{
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
            }
        }
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

    inputChangedHandler = (event, inputID) => {
        // console.log('resetKey from forget password :',this.props.resetKey);
        const updatedEmailForm = {
            ...this.state.emailForm,
            [inputID]: {
                ...this.state.emailForm[inputID],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.emailForm[inputID].validation),
                touched: true
            }
        };
        this.setState({emailForm: updatedEmailForm});
    }

    // linkToResetPasswordPage = ()=>{
    //     this.props.history.push('/resetpassword');
    // };

     
    sendEmailClickedHandler = (event)=>{
        event.preventDefault();
        let email={
            email:this.state.emailForm.email.value
        };
        this.props.onSendingEmailStart(email);
    };

    render(){
        let form = (
            <form onSubmit={this.sendEmailClickedHandler}>
                <Input
                    label={Object.keys(this.state.emailForm)[0]} 
                    elementType={this.state.emailForm.email.elementType}
                    elementConfig={this.state.emailForm.email.elementConfig}
                    value={this.state.emailForm.email.value}
                    inValid={!this.state.emailForm.email.valid}
                    shouldValidate={this.state.emailForm.email.validation}
                    touched={this.state.emailForm.email.touched}
                    changed={(event)=>this.inputChangedHandler(event,Object.keys(this.state.emailForm)[0])}
                     />
            <Button btnType="Success" disabled={!this.state.emailForm.email.valid}>SEND EMAIL</Button>
        </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ForgetPassword}>
                <h4>Enter your email to reset password :</h4>
                {form}
            </div>
        );
    };
};

const mapStateToProps=state=>{
    return{
        loading:state.forgetPassword.loading
    };
}
const mapDispatchToProps=dispatch=>{
    return{
        onSendingEmailStart:(email) => dispatch(actionsCreators.onSendingEmail(email))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ForgetPassword));