import React, { Component } from 'react';
import './Private.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from '../../ducks/reducer';
import { clearUser } from '../../ducks/reducer';

class Private extends Component {

    componentDidMount(){
        this.getUser();
    }

    getUser = async () => {
        const { id } = this.props;
        if(!id){
            try {
                let res = await axios.get('/api/current');
                this.props.updateUser(res.data)
                // console.log(res)
            } catch(err) {
                this.props.history.push('/')
            }
        }
    }

    logout = async () => {
        await axios.post('/auth/logout');
        this.props.clearUser();
        this.props.history.push('/');
    }

    render(){
        const { username, img, balance } = this.props;
        return(
            <div>
                <button onClick={ this.logout }>Log Out</button>
                <h1>{username}</h1>
                <img src={img} alt='user' />
                <p>{balance}</p>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

const mapDispatchToProps = {
    updateUser,
    clearUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Private);