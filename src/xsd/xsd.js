import React from 'react';

import {List, InputItem, WhiteSpace, Toast} from 'antd-mobile';

import 'antd-mobile/dist/antd-mobile.css';
import '../config';
import $ from "jquery";

const Item = List.Item;
const Brief = Item.Brief;

class xsd extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            dataList: ''
        };
        this.router = context.router;
        this.watch = this.watch.bind(this);
        this.getshuju = this.getshuju.bind(this);
    }

    componentDidMount() {
        this.getshuju()
    }

    componentWillMount() {

    }

    getshuju() {
        var that = this;
        Toast.loading('Loading...', 0, () => {
            console.log('Load complete !!!');
        });
        this.serverRequest = $.ajax('http://nightly-dev.99tone.com/mapi/data/sales/salesDocs', {
            type: 'post',
            headers: {Authorization: 'Bearer ' + global.data.token},
            data: {pindex: 1, psize: 20},
            success(res) {
                Toast.hide()
                that.setState({
                    dataList: res.rows
                })
            }
        })
    }

    watch(docId,store,Name,date) {

        console.log(docId,store)
        const that = this;
        that.props.history.push({ pathname: "/xq", state: { docId:docId,shop:store,Name:Name,Date:date} })
    }

    render() {
        const style = {
            fontSize: '14',
            color: '#40a9ff'
        }

        return (
            <div>

                <WhiteSpace/>
                <List renderHeader={() => '销售历史'} className="my-list">
                    {this.state.dataList == '' ? '' : this.state.dataList.map((list) =>
                        <Item
                            arrow="horizontal"
                            thumb={<i className='JiutoneIcons jtion-save' style={style}></i>}
                            multipleLine
                            onClick={this.watch.bind(this, list.docId,list.store,list.docMakerRealName,list.createDate)}
                            key={list.id}
                        >
                            {list.docMakerRealName}
                            <Brief>{list.docId} ￥{list.sumMoney}</Brief><Brief>{list.createDate} {list.store}）</Brief>
                        </Item>

                    )}

                </List>
            </div>
        )
    }
}

export default xsd;