import React ,{Component} from "react";
import {connect} from "react-redux";
import classes from './ResetPassword.css';
import * as actionsCreators from "../../../store/actions/index";
import Input from "../../../components/UI/Input/Input";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';

export class ResetPassword extends Component{
    state = {
        resetPasswordForm:{
            newPassword: {
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
            },
            confirmNewPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm Password'
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
    console.log('inputID',inputID);
     const updateResetPasswordForm={
        ...this.state.resetPasswordForm
    };
    const updateFormElement={
        ...updateResetPasswordForm[inputID]
    };

    updateFormElement.value=event.target.value;
    updateFormElement.valid=this.checkValidity(updateFormElement.value,
    updateFormElement.validation);
    updateFormElement.touched=true;
    let formIsValid = true;
    for(let inputID in updateResetPasswordForm){
        formIsValid = updateResetPasswordForm[inputID].valid && formIsValid;
    }
    updateResetPasswordForm[inputID]=updateFormElement;
    this.setState({
        resetPasswordForm:updateResetPasswordForm,
        formIsValid:formIsValid
    });

};


 
updateClickedHandler = (event)=>{
    event.preventDefault();
  
    //-------------------------
    let password={};
    for(let formElementIdentifier in this.state.resetPasswordForm){
        password[formElementIdentifier] = this.state.resetPasswordForm[formElementIdentifier].value;
    };
    console.log(password);
    this.props.onResetStart(password);
};

render(){
    const formElementsArray = [];
    for(let key in this.state.resetPasswordForm){
        formElementsArray.push({
            id:key,
            config:this.state.resetPasswordForm[key]
        });
    };
    let form = (
        <form onSubmit={this.updateClickedHandler}>
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
        <Button btnType="Success" disabled={!this.state.formIsValid}>UPDATE</Button>
    </form>
    );
    if ( this.props.loading ) {
        form = <Spinner />;
    }
    return (
        <div className={classes.ResetPassword}>
            <h4>Enter your password to update :</h4>
            {form}
        </div>
    );
};
};

// function mapStateToProps(state){
//     console.log(state.forgetPassword)
//     return {}
// }
const mapStateToProps=state=>{
    // console.log('resetPassword',state.forgetPassword);
    return{
        loading:state.resetPassword.loading,
        // resetPasswordKey:state.forgetPassword.resetKey
    };
}
const mapDispatchToProps=dispatch=>{
return{
    onResetStart:(password) => dispatch(actionsCreators.onResetPassword(password))
};
}
export default connect(mapStateToProps,mapDispatchToProps)(ResetPassword);
