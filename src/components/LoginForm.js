import React, { Component } from 'react'
import {VERIFY_USER} from '../Event';
import '../index.css';

var Crypto = require("crypto-js");

class LoginForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            nickname: "",
            error: "",
            array_values: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setUser = ({user, isUser}) => {
      
        let us = {id: Date.now()%1000 , name: this.state.nickname}

        let encrypted_data_name = Crypto.AES.encrypt(JSON.stringify(us.name), 'secret-key@123').toString();
        let encrypted_data_id = Crypto.AES.encrypt(JSON.stringify(us.id), 'secret-key@123').toString();

        let encrypt = {id: encrypted_data_id, name: encrypted_data_name}
        if(isUser){
            this.setError("Same Text")
            window.alert("Don't type the same text again")
        }
        else{
            this.props.setUser(encrypt);
            this.setError("");
        }   
    }
    setError = (error) => {
        this.setState({
            error
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {socket} = this.props;
        const {nickname, error} = this.state;
        socket.emit(VERIFY_USER, nickname, this.setUser);

        setTimeout(() => {
            this.setState({
                array_values:[...this.state.array_values, nickname],
                nickname: ""
            })
        }, 800);
    }

    handleChange = (e) => {
        this.setState({
            nickname: e.target.value,
            error: ""
        })

    }

    render () {
        let { nickname, error, array_values } = this.state;
        array_values = array_values ? array_values : []
        return (
            <div className="app">
            <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Enter a Text</label>
              <input type="text"
                    className="form-control" 
                    id="nickname" 
                    aria-describedby="emailHelp" 
                    placeholder="Text" 
                    value={this.state.nickname}
                    onChange={this.handleChange} />

              <small id="emailHelp" className="form-text text-muted">Please Type a message.</small>
              <small id="emailHelp" className="form-text text-muted">{error}</small>
            </div>
           
            {
                nickname ? 
                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button> 
                :
                <button type="submit" className="btn btn-primary" disabled>Submit</button> 
            }
          </form>

        
          <div className="container-box" style={{width: '100%', marginTop: '10px'}}>
          {
              array_values != '' ? 
                <div style={{background: "#ECE5DD", height: '1500px', transition: 'height 2s'}}>
                {

                    array_values.map((data, index) => {
                        if(index%2 == 1){
                            return (
                                <div className="container" >
                                    <div className="arrow" >
                                        <div className="outer" ></div>
                                        <div className="inner" style={{borderRight: '20px solid #dcf8c6'}}></div>
                                    </div>
                                <div className="message-body" style={{background: '#dcf8c6'}}>
                                    <p>{data}</p>
                                </div>
                                </div>
                         )
                        }
                        else {
                            return (
                                <div className="container" style={{position: 'relative',left: '800px', padding: '20px 0'}}>
                                    <div className="arrow">
                                        <div className="outer" ></div>
                                        <div className="inner"></div>
                                    </div>
                                <div className="message-body">
                                    <p>{data}</p>
                                </div>
                                </div>
                         )
                        }
                    })
                
                } </div>
             : null
          }
          </div>
                
            </div>
        )
    }
}


export default LoginForm





