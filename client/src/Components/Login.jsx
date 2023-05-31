import { useState } from "react";
import "../App.css";
import "../CSS/login.css";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";

import notesCover from "../Images/bgimg.jpeg";
//import { createBrowserHistory } from 'history';
//import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Login() {
  //const history = useHistory();
  //const history = createBrowserHistory();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");

  const validate = (e) => {
    e.preventDefault();
    if (username === "" || password === "" || department === "") {
      alert("Username / Password / Department Missing!!!");
    } else if (
      department === "police" &&
      username === "PO1234" &&
      password === "1234"
    ) {
      navigate("/police");
    } else if (
      department === "forensics" &&
      username === "FO1234" &&
      password === "1234"
    ) {
      navigate("/forensichome");
    } else {
      alert("Wrong Username or Password or Department");
      navigate("/");
    }
  };

  return (
    <>
      <div className="center">
        <img
          width="270"
          src={notesCover}
        />
      </div>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <form onSubmit={validate}>
          <MDBInput
            wrapperClass="mb-4"
            label="Username"
            id="form1"
            type="id"
            onChange={(evt) => setUsername(evt.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form2"
            type="password"
            onChange={(evt) => setPassword(evt.target.value)}
          />

          <div className="d-flex justify-content-between mx-3 mb-4">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(evt) => setDepartment(evt.target.value)}
            >
              <option defaultValue="Choose">Select Department</option>
              <option value="police">Police</option>
              <option value="forensics">Forensic</option>
            </select>
          </div>

          <MDBBtn className="mb-4">Sign in</MDBBtn>
        </form>
      </MDBContainer>
    </>
  );
}

export default Login;

/*import React, { Component } from 'react';
import '../CSS/login.css'
import notesCover from '../Images/bgimg.jpeg';
//import {browserHistory} from 'react-router';
//import { createBrowserHistory } from "history";

class Login extends Component {
    componentDidMount(){
        document.title = "Login"
    };
    state = {
        username:'',
        password:'' 
    };
    validate = (state) =>{
        var uname = this.state.username;
        var pass =  this.state.password;
        if(uname==null || uname == '' || pass==null || pass=='')
            {
                alert("Username / Password Missing!!!");
            }
        else
            {
                if((uname=="PO1234") && (pass=="1234"))
                {
                    createBrowserHistory.push('/police');
                }  
                else if( (uname=="FO1234") && (pass=="1234"))
                {
                    createBrowserHistory.push('/forensichome');
                } 
                else
                {
                    alert("Wrong Username or Password");
                    createBrowserHistory.push('/');
                }    
            }
    };
    render()
    {
        return(
            <div className = "container signInCard center">
            <div className="card setCardWidth">
            <div className="card-image ">
              <img src={notesCover} alt="Notes" className = "cardImageHeight"/>
            </div>
          <div className="signInContainer card-content">
              <h4 className="grey-text card-title">Sign In</h4>
              <form onSubmit={this.submitted} className="signInForm">
                  <div className="input-field">
                      <i className="material-icons prefix grey-text text-darken-3">fingerprint</i>
                      <input type="text" id="email" onChange={(evt) => { /*this.state.username =  evt.target.value; }}/>
                      <label htmlFor="loginID">Login ID</label>
                  </div>
                  <div className="input-field">
                      <i className="material-icons prefix grey-text text-darken-3">lock</i>
                      <input id="password" type="password" onChange={(evt) => { /*this.state.password =  evt.target.value; }}></input>
                      <label htmlFor="password">Password</label>
                  </div>
                  <div className="input-field row">
                      <p className="col s4">
                          <label>
                              <input name="dept" type = "radio" value = "police"/>
                              <span>Police</span>
                          </label>
                      </p>
                      <p className="col s4">
                          <label>
                              <input name="dept" type = "radio" value = "forensics"/>
                              <span>Forensics</span>
                          </label>
                      </p>
                      <p className="col s4">
                          <label>
                              <input name="dept" type = "radio" value = "hospital"/>
                              <span>Hospital</span>
                          </label>
                      </p>
                  </div>
                  <div className="input-field center card-action">
                      <button className="btn grey darken-3" onClick={this.validate}>Sign In!</button>
                  </div>
              </form>
            </div>
          </div>
            </div>
        )
    }
}

export default Login;*/
