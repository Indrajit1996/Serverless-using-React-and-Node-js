import React, { Component } from 'react'
import io from 'socket.io-client'
import encrypt from 'socket.io-encrypt'
import { USER_CONNECTED, LOGOUT } from '../Event';
import LoginForm from './LoginForm'

const SocketUrl = "http://192.168.0.104:3231"
class Layout extends Component {
    constructor(props){
        super(props);
        this.state = {
            socket: null,
            user: null
        }
    }
    componentWillMount() {
        this.initSocket();
    }

    initSocket = () => {
        const socket = io(SocketUrl)
        // encrypt('secret')(socket)
        socket.on('connect', () => {
            console.log("Connected");
        })
        this.setState({
            socket: socket
        })
    
}
    setUser = (user) => {
        const { socket } = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({user});
    }

    logout = () => {
        const {socket} = this.state;
        socket.emit(LOGOUT);
        this.setState({
            user: null
        })
    }

    render () {
        return (
            <div>
                <LoginForm socket={this.state.socket} setUser={this.setUser} />
            </div>
        )
    }
}

export default Layout