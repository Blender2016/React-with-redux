import React ,{Component} from "react";
import Aux from "../../hoc/Aux/Aux";
import classes from "./Layout.css";
// import {connect} from "react-redux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

class Layout extends Component{

    render(){
        return(
        <Aux>
            <Toolbar />
            <main className={classes.Content}>{this.props.children}</main>
        </Aux>
        );
    }
}


export default Layout;