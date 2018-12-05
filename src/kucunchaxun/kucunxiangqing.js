import React from 'react';
import $ from 'jquery';
import '../config';
import {Toast, WhiteSpace, WingBlank, Button, List} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

const Item = List.Item;
const Brief = Item.Brief;


class kcxq extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            goodsId: props.location.state.goodsId,
            dataList:''
        };
        this.getshuju=this.getshuju.bind(this);
    }

    componentDidMount() {
        this.getshuju()
    }
    componentWillMount() {

    }
    getshuju(){
        const that = this;
        Toast.loading('loading...',0,()=>{

        })
        $.ajax({
            url: 'https://nightly-dev.99tone.com/mapi/data/inventory/queryInventoryDetails',
            type: 'post',
            headers: {Authorization: 'Bearer ' + global.data.token,'Content-Type':'application/json'},
            dataType: "json",
            data: JSON.stringify({
                "categoryId":0,
                "storeIds":"0",
                "supplierId":0,
                "inputCategory":"A1",
                "searchType":"ALL",
                "goodsId":this.state.goodsId,
                "inUnitPrice":0.0,
                "storeCost":0.0,
                "age":0,
                "onwayFlag":false
            }),
            success: function (res) {
                Toast.hide()


                    that.setState({
                        dataList: res
                    })



            }
        })
    }
    render() {

        return (

                    <List  className="my-list">

                        {this.state.dataList==''?'':(this.state.dataList.map((list)=>
                        <Item multipleLine extra={'数量：'+list.count}>

                            <Brief>名称：{list.name}</Brief>
                            <Brief>串号：{list.goodsCode}</Brief>
                            <Brief>库龄：{list.age}</Brief>
                        </Item>

                            )


                        )}
                    </List>

        );
    }

}


export default kcxq;
