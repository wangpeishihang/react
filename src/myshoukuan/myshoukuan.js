import React from 'react';
import {Toast,Result, Icon, WhiteSpace} from "antd-mobile";
import $ from "jquery";
import 'antd-mobile/dist/antd-mobile.css';
const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
class myshoukuan extends React.Component{

    constructor(props){
        super(props)
        this.state={
            bg:0
        };
    }
    click(e){
        console.log(e)
        this.setState({
            bg:e,
              dataList:''
        })
    }

    componentDidMount() {
        var that=this;
        Toast.loading('Loading...', 0, () => {
            console.log('Load complete !!!');
        });
        this.serverRequest=$.ajax('https://nightly-dev.99tone.com/mapi/data/mobipay/getMyMobipayDocuments',{
            type: 'post',
            headers: {Authorization: 'Bearer ' + global.data.token},
            data: {'sid': 0,'rid':0},
            success(res) {
                Toast.hide()
                that.setState({
                    dataList: res.rows
                })
                global.data.dataList=res
            }
        })
    }
    componentWillMount() {

    }

    render() {

        return(
            <div>
            <div className='myshoukuan'>
                <div className={this.state.bg==0?'myshoukuan-flex active':'myshoukuan-flex'}  onClick={this.click.bind(this,0)}>全部</div>
                <div className={this.state.bg==1?'myshoukuan-flex active':'myshoukuan-flex'}  onClick={this.click.bind(this,1)}>等待支付</div>
                <div className={this.state.bg==2?'myshoukuan-flex active':'myshoukuan-flex'}  onClick={this.click.bind(this,2)}>已完成</div>
                <div className={this.state.bg==3?'myshoukuan-flex active':'myshoukuan-flex'}  onClick={this.click.bind(this,3)}>支付失败</div>

            </div>

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
export default myshoukuan;