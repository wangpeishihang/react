import React from 'react';
import {Toast,Result, Icon, WhiteSpace,SearchBar,WingBlank } from "antd-mobile";
import $ from "jquery";
import 'antd-mobile/dist/antd-mobile.css';
const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;


class jiaoyigenzong extends React.Component{

    constructor(props){
        super(props)
        this.state={
            bg:0,
            dataList:'',
            value:''
        };
    }
    click(e){
        var that=this;
        Toast.loading('Loading...', 0, () => {
            console.log('Load complete !!!');
        });
        this.serverRequest=$.ajax('https://nightly-dev.99tone.com/mapi/data/mobipay/trackTrade',{
            type: 'get',
            headers: {Authorization: 'Bearer ' + global.data.token},
            data: {'docOrTradeId': this.state.value},
            success(res) {
                Toast.hide()

                that.setState({
                    dataList: res.rows
                })

            }
        })


    }
    getvalue(e){
        this.setState({
            value:e
        })
    }

    componentDidMount() {
        var that=this;

    }
    componentWillMount() {

    }
    render() {

        return(

            <div >
                <SearchBar
                    placeholder=""
                    maxLength={20}
                    cancelText='搜索'
                    value={this.state.value}
                    onChange={this.getvalue.bind(this)}
                    onCancel={this.click.bind(this)}
                    onSubmit={this.click.bind(this)}
                />
                <WhiteSpace />
                {this.state.dataList==''?(
                    <Result
                        img={myImg('https://gw.alipayobjects.com/zos/rmsportal/GIyMDJnuqmcqPLpHCSkj.svg')}
                        title=""
                        message="暂时没有收款历史记录"
                    />):''}



            </div>
        )
    }
}
export default jiaoyigenzong;