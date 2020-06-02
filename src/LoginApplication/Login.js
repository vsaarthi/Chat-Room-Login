import React, { Component } from "react";
import 'antd/dist/antd.css';
import {Input, Button, message} from 'antd';
import Axios from 'axios';
import {connect} from 'react-redux';

class Login extends Component {
  constructor() {
    super();
    this.state = { 
      username:'',
      password :'', 
      loginPage: true, 
      accountPage: false,
      confirmPass:'',
      user:'', 
      pass:''};
  }
  
  //componentDidMount = () =>{
  //   const url = 'http://localhost:9000/login/statusChange'
  //   Axios.get(url)
  //   .then(res => {
  //     console.log(res)
  //   })
  // }

  onTextChange = e => this.setState({ [e.target.name]: e.target.value }) ;

  submit = () =>{
    const {username , password} = this.state
    const { SignInSubmit } = this.props
    const status = true
    const url = 'http://localhost:9000/login/authenticate';
        const user = {
            username,
            password,
            status:true
        }
        Axios.post(url, user).then((res) => {
          SignInSubmit(username,status);
          this.props.history.push('/chat')
        }).catch((e) => {
          message.error(e.response.data)
        });   
  }
  pageChange = () => this.setState({ loginPage : false, accountPage:true})

  backButton = () => this.setState({ loginPage : true, accountPage:false})

  createAccount=() =>{
    const { user, pass, confirmPass } = this.state
    if(pass === confirmPass){
      const url = 'http://localhost:9000/login/register';
            const userBody = {
                user,
                pass
            }
            Axios.post(url, userBody).then((res) => {
              message.success("Your account has been registered!!!")
              this.setState({ loginPage : true, accountPage:false})
              console.log(res)
            }).catch((e) => {
              message.error(e.response.data)
            });
    }
    else {
      message.error("Password and Confirm Password are different!!!")
    }
  }
  render() {
    const { loginPage,accountPage } = this.state
    return (
      <div>

        <div style={{height: '200px'}}>
        </div>
        {loginPage && <div style={{ marginLeft:'500px' , height: '280px', backgroundColor:'#ececec', width :'290px'}}>
          <h2 style ={{ textAlign: 'center'}}>Sign In</h2>
          <Input name = "username" onChange={e => this.onTextChange(e)} placeholder = "Username" style= {{width :'250px', marginTop:'10px', marginLeft:'20px'}} />
          <br/><br/>
          <Input.Password  name="password" onChange={e => this.onTextChange(e)} placeholder="Password" style= {{width :'250px', marginLeft:'20px'}} /> 
          <br/><br/>
          <Button  onClick={this.submit}  style = {{width :'250px', marginLeft:'20px', backgroundColor:'#70c5c0', color:'white'}}>Login</Button><br/><br/>
          <p style={{ marginLeft : '50px'}}>Don't have Account ? ... <Button  onClick={this.pageChange} type='link'>Sign Up</Button></p>
          </div>}

          {accountPage && <div style={{ marginLeft:'500px', height: '320px', backgroundColor:'#ececec', width :'290px'}}>
          <h2 style ={{ textAlign: 'center'}}>Sign Up</h2>
          <Input name = "user" onChange={e => this.onTextChange(e)} placeholder = "Username" style= {{width :'250px',marginTop:'10px', marginLeft:'20px'}} />
          <br/><br/>
          <Input.Password  name="pass" onChange={e => this.onTextChange(e)} placeholder="Password" style= {{width :'250px',marginLeft:'20px'}} />
          <br/><br/>
          <Input.Password  name="confirmPass" onChange={e => this.onTextChange(e)} placeholder="Confirm Password" style= {{width :'250px',marginLeft:'20px'}} /> 
          <br/><br/>
          <Button type = "primary" onClick={this.createAccount}  style = {{width :'250px', marginLeft:'20px', backgroundColor:'#70c5c0', color:'white', borderColor:'#70c5c0'}}>Register</Button><br/><br/>
          <Button type = "link" onClick={this.backButton} style={{ marginLeft : '90px'}} >Back to Sign In</Button>
          </div>}
          
      </div>
        );}
}

const mapDispatchToProps = (dispatch) => {
  return{
    SignInSubmit: (username,status) => dispatch({type:"SignInSubmit" , username,status})
  }
}

export default connect(null, mapDispatchToProps)(Login);