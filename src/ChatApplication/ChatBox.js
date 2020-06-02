import React, { Component } from "react";
import { Select, Button } from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import Axios from 'axios';

const { Option } = Select;
const io = require('socket.io-client');
const socket = io();

class ChatBox extends Component {
  constructor() {
    super();
    this.state = { msg: "", chat: [],  list:[], sendid:'', myid:'', mes:[] };
  }

  componentDidMount() {
    const { loginuser } = this.props
    if (loginuser === ''){
      this.props.history.push('/')
    }
    else{
        socket.on("chat message", ({ id,name, msg }) => {
          this.setState({
            chat: [ ...this.state.chat,{ id,name, msg }]
          });
        });
        const url = 'http://localhost:9000/login/getMessage';
        const user = {
            username : loginuser
        }
        Axios.post(url, user).then((res) => {
          
          let note = res.data
          console.log(note.split(','))
          this.setState({ mes : note.split(',')})
        })
      }
    }

      onTextChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
    
      onMessageSubmit = () => {
        const { loginuser } = this.props
        const name = loginuser
        const { msg } = this.state;
        socket.emit("chat message", { name, msg });
        this.setState({ msg: "" });
      };
    
      exit = () =>{
        const {  loginuser } = this.props
        const url = 'http://localhost:9000/login/logout';
        const user = {
            username:loginuser,
            status:false
        }
        Axios.post(url, user).then((res) => {
        this.props.history.push('/')
        })
      }

  render() {
    const { chat,mes } = this.state;
    const { loginuser } = this.props
    return (
      <div style={{ marginLeft:'20px'}}>
        <div style = {{ marginLeft:'93%' }}>
    <Button onClick = {this.exit} style = {{backgroundColor:'#70c5c0', color:'white'}} >Logout</Button></div>
     <h2 style={{color : "green" }}>Hi {loginuser}!!!</h2>
        <span>Message : </span>
        <input placeholder="Type a msg" name="msg" onChange={e => this.onTextChange(e)} value={this.state.msg}/> 
        &ensp; &ensp;
        <button onClick={this.onMessageSubmit}>Send</button><br/><br/>
        <div>
         {mes != '' ? mes.map((value, index) => {
        return <div><div><span style={{color : "red" }}> {value.split(':')[0]} </span> : {value.split(':')[1]}</div><br/></div>
      }) : '' }
        </div>
        <div> 
          {chat.map(({ id, name, msg }) => (
            <div><span style={{color : "red" }}> {name} </span> : {msg}
            <br/><br/>
            </div>
          ))}
        </div>
      </div>
        );}
}


const mapStateToProps = (state) => {
  return{
    loginuser: state.loginuser,
  }
}

export default connect(mapStateToProps, null)(ChatBox);
