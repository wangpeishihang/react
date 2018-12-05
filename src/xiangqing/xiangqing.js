import React from 'react';
import $ from 'jquery';
import '../config';
import {Toast, WhiteSpace, WingBlank, Button, List} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

const Item = List.Item;
const Brief = Item.Brief;


class xq extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            docId: props.location.state.docId,
            shop:props.location.state.shop,
            Name:props.location.state.Name,
            Date:props.location.state.Date,
            dataList:''
        };
        this.getshuju=this.getshuju.bind(this);
    }
    getshuju(){
        const that = this;
        Toast.loading('loading...',0,()=>{

        })
        $.ajax({
            url: 'https://nightly-dev.99tone.com/mapi/data/sales/salesDocDetailData',
            type: 'post',
            headers: {Authorization: 'Bearer ' + global.data.token},
            data: {docId: that.state.docId},
            success: function (res) {
                Toast.hide()
                if (res.success === true) {

                    that.setState({
                        dataList: res.rows
                    })
                }

            }
        })
    }
    componentDidMount() {
        this.getshuju()
    }


    render() {
        return (
            <div>

                <List  className="my-list">
                     <Item extra={this.state.docId}>单据号</Item>
                     <Item extra={this.state.shop}>门店</Item>
                     <Item extra={this.state.Name}>制单人</Item>
                     <Item extra={this.state.Date}>制单时间</Item>
                 </List>
                <WhiteSpace/>
                {this.state.dataList==''?'':(
                    <List renderHeader={() => '销售明细'} className="my-list">
                    <Item multipleLine extra={'￥ '+this.state.dataList[0].unitPrice*this.state.dataList[0].count}>
                        {this.state.dataList[0].goodsName} <Brief>单： ￥{this.state.dataList[0].unitPrice} * {this.state.dataList[0].count} 部</Brief>
                    </Item>
                        <Item extra={'￥ '+this.state.dataList[0].unitPrice*this.state.dataList[0].count}>应收</Item>
                        <Item extra={'￥ '+this.state.dataList[0].unitPrice}>实收</Item>
                </List>)}

            </div>
        );
    }

}


export default xq;
