import React, { Component } from "react";
import {connect} from 'react-redux';
import {Button } from 'antd';
import Axios from 'axios';



class welcome extends Component {

  componentDidMount = () =>{
    const { loginuser } = this.props
    if (loginuser === '')
    {
      this.props.history.push('/')
    }
  }

  exit = () =>{
    const { signOut, loginuser } = this.props
    const url = 'http://localhost:9000/login/logout';
    const user = {
        username:loginuser,
        status:true
    }
    Axios.post(url, user).then((res) => {
    signOut(false)
    this.props.history.push('/')
    })
  }

  render() {
    const { loginuser} = this.props
    return (
    <div>
      <div style = {{height : '10px'}}></div>
    <div style = {{ marginLeft:'93%' }}>
    <Button onClick = {this.exit} style = {{backgroundColor:'#70c5c0', color:'white'}} >Logout</Button></div>
    <div style = {{ marginLeft : '100px', marginRight :'50px'}}><h1>Hi {loginuser} !!! </h1></div>
    </div>
    )}
}

const mapDispatchToProps = (dispatch) => {
  return{
    signOut: (status) => dispatch({type:"SignOut" ,status})
  }
}

const mapStateToProps = (state) => {
  return{
    loginuser: state.loginuser,
    status:state.status
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(welcome);