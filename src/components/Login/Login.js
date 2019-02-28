import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from '../../ducks/reducer';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.register = this.register.bind(this)
    }

    componentDidMount(){
        this.checkUser();
    }
    
    checkUser = async () => {
        const { id } = this.props;
        if (!id){
            try {
                let res = await axios.get('/api/current');
                this.props.updateUser(res.data)
                this.props.history.push('/private')
                // console.log(res)
            } catch(err) {
            }
        } else {
            this.props.history.push('/private')
        }
    }

    handleChange(prop, val){
        this.setState({
            [prop]: val
        })
    }

    async register(){
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        try {
            let res = await axios.post('/auth/register', user)
            this.props.updateUser(res.data);
            this.props.history.push('/private')
        } catch(err) {
            console.log(err)
            alert('Choose a unique username');
        }
    
    }

    login = async () => {
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        try {
            let res = await axios.post('/auth/login', user);
            // console.log(res)
            this.props.updateUser(res.data);
            this.props.history.push('/private')
        } catch(err) {
            alert('Invalid login credentials');
        }
    }

    render(){
        const { username, password } = this.state;
        return(
            <div>
                <h2>Login Component</h2>
                <input 
                    value={username} 
                    onChange={e => this.handleChange('username', e.target.value)}
                    placeholder="username" 
                />
                <input 
                    type='password' 
                    value={password} 
                    onChange={e => this.handleChange('password', e.target.value)}
                    placeholder="password" 
                />
                <button onClick={ this.register }>Register</button>
                <button onClick={ this.login }>Login</button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        id: reduxState.id
    }
}
const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);