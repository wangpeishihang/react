import React from 'react';
import $ from 'jquery';

import {Router,Route,Switch,} from "react-router";
import {Redirect } from 'react-dom';

import {Select, LocaleProvider, Button} from 'antd';
import {DatePicker, List, Toast, WhiteSpace} from 'antd-mobile';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import '../config';
import 'mfb/src/mfb';
import 'mfb/src/mfb.css';
import sqlc from './shenqingliucheng'

const Option = Select.Option;
const Item = List.Item;
const Brief = Item.Brief;



class wodesq extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            documentStatus: [],
            categories: [],
            myApplies: [],
            total: '',
            ds: -1,
            cg: -1
        };
    }


    handleOnClick = () => {
        // some action...
        // then redirect
        this.setState({redirect: true});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/sample" />; //or <Redirect push to="/sample?a=xxx&b=yyy" /> 传递更多参数
        }

        return <button onClick={this.handleOnClick} type="button">Button</button>;
    }


    componentDidMount() {
        let that = this;
        Toast.loading('Loading...', 0, () => {
            console.log('Load complete !!!');
        });


        $.ajax('https://nightly-dev.99tone.com/mapi/data/approve/basicData', {
            type: 'get',
            headers: {Authorization: 'Bearer ' + global.data.token},

            success(res) {

                that.setState({
                    documentStatus: res.documentStatus,
                    categories: res.categories
                })

                that.search()

            }
        })

    }

    componentWillUnmount() {
        this.serverRequest.abort()
    }

    handleChange(e) {
        this.setState({
            ds: e
        })

        this.search()
    }

    handleChange1(e) {
        this.setState({
            cg: e
        })
        this.search()
    }

    search() {
        let that = this;
        this.serverRequest = $.ajax('https://nightly-dev.99tone.com/mapi/data/approve/myApplies', {
            type: 'post',
            headers: {Authorization: 'Bearer ' + global.data.token},
            data: {status: that.state.ds, categories: that.state.cg},
            success(res) {
                Toast.hide()
                that.setState({
                    myApplies: res.rows,
                    total: res.total
                })

            }
        })
    }

    showModal = key => (e) => {

        let that = this;
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });


        //第一次点击 加载所有数据然后保存方便调用
        if (key == 'modal2') {
            this.props.history.push({pathname:'/sqlc'})


        }
    }

    render() {

        return (



            <div>
                <div className="weui-search-bar" id="searchBar">
                    <form className="weui-search-bar__form">
                        <div className="weui-search-bar__box">
                            <i className="weui-icon-search"></i>
                            <input type="search" className="weui-search-bar__input" id="searchInput"
                                   placeholder="请输入关键字"/>
                            <a href="javascript:" className="weui-icon-clear" id="searchClear"></a>
                        </div>
                        <label className="weui-search-bar__label" id="searchText">
                            <i className="weui-icon-search"></i>
                            <span>搜索</span>
                        </label>
                    </form>
                    <a href="javascript:" className="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
                </div>
                <div className='selectflex'>
                    <div className='selectdiv'>
                        {this.state.documentStatus.length == 0 ? '' : (
                            <Select
                                defaultValue={this.state.documentStatus[0].id}
                                onChange={this.handleChange.bind(this)}>
                                {
                                    this.state.documentStatus.map((ds) => (
                                        <Option key={ds.id} value={ds.id}>{ds.notes}</Option>
                                    ))

                                }


                            </Select>
                        )}

                    </div>
                    <div className='selectdiv'>
                        {this.state.categories.length == 0 ? '' : (
                            <Select defaultValue='流程'
                                    onChange={this.handleChange1.bind(this)}>

                                {this.state.categories.map((cg) => (
                                    <Option key={cg.id} value={cg.id}>{cg.name}</Option>
                                ))

                                }


                            </Select>
                        )}
                    </div>
                </div>

                <WhiteSpace/>
                <List className="my-list">
                    {this.state.myApplies.length == 0 ? '' : (
                        <Item
                            arrow="horizontal"
                            thumb={<i className='JiutoneIcons jtion-save'></i>}
                            multipleLine


                        >
                            1
                            <Brief>库存量：1</Brief><Brief>'采购价：￥' + 1&nbsp;&nbsp;&nbsp;零售价：￥1</Brief>
                        </Item>
                    )}


                </List>


                <ul id="menu" className="mfb-component--br mfb-zoomin" data-mfb-toggle="hover">
                    <li className="mfb-component__wrap">
                        <button onClick={this.showModal('modal2')} data-mfb-label="Child Button 1"
                                className="mfb-component__button--child">ADD</button>

                    </li>
                </ul>

            </div>
        )

    }
}

export default wodesq;
