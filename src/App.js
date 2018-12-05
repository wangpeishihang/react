import React from 'react';
import './App.css';
import $ from  'jquery';
import './config';
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import './acc.css';
import logo from './assest/logo.png'



class App extends React.Component {
    constructor(props,context) {
        super(props,context);
        this.router = context.router;
        this.state = {username: '', password: ''};
        this.Login = this.Login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getpassWord = this.getpassWord.bind(this);
    }


    componentDidMount() {

    }

    componentWillUnmount() {
      //  this.serverRequest.abort();
    }

    handleChange(event) {

        this.setState({
            username: event.target.value
        })

    }

    getpassWord(event) {

        this.setState({
            password: event.target.value
        })

    }

    Login() {
        var that=this;
        //that.props.history.push('/Home')
        if(that.state.username==''){
            Toast.info('用户名不能为空', 1);
            return false;
        }else if(that.state.password==''){
            Toast.info('密码不能为空', 1);
            return false;
        }else {
            Toast.loading('登陆中...', 2, () => {
                console.log('Load complete !!!');
            });
            this.serverRequest =$.post('https://nightly-dev.99tone.com/mapi/auth/login',{'username':that.state.username,'password':that.state.password},function (res) {

                if(res.success===true){
                    console.log(res)

                    global.data.usershoplist = res.user.stores;
                    global.data.userid = res.user.id;
                    global.data.token = res.token;
                    let a={};
                    a.realName = res.user.realName;
                    a.company = res.user.company
                    a.realNameWithId = res.user.realNameWithId;
                    a.verifyMobile = res.user.verifyMobile;
                    a.id = res.user.id;
                    global.data.user = a;
                    Toast.hide()
                    that.props.history.push('/Home')
                    console.log(global.data)
                }
            }.bind(this));


        }


    }

    render() {
        return (
            <div className='acc'>
                <div className='logo'>
                    <img src={logo}/>
                </div>

                <input className="Login" value={this.state.username} onChange={this.handleChange} type="text"
                       placeholder="用户名"/>
                <input className="Login" type="password" value={this.state.password} onChange={this.getpassWord}
                       placeholder="密码"/>
                <WhiteSpace />
                <Button onClick={this.Login.bind(this)} className='size-but'  type="primary">登陆</Button>


            </div>
        );
    }

}


export default App;
