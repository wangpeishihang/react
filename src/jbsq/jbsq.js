import React from 'react';

import {Select, Button} from 'antd';
import {DatePicker, List, LocaleProvider, Toast, InputItem, WhiteSpace,TextareaItem} from 'antd-mobile';
import 'antd/dist/antd.css';
import '../config';
import 'antd-mobile/dist/antd-mobile.css';
import './jbsq.css';
import $ from "jquery";

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);


class inPut extends React.Component {
    render() {
        return (
            <div>
                <WhiteSpace/>
                <List>
                    <InputItem
                        clear
                        placeholder=""

                    >标题</InputItem>

                </List>
            </div>)
    }
}


class NubinPut extends React.Component {
    render() {
        return (
            <div>
                <WhiteSpace/>
                <List>
                    <InputItem
                        clear
                        placeholder=""
                        type='number'

                    >标题</InputItem>

                </List>
            </div>)
    }
}

class textarea extends React.Component {
    render() {
        return (
            <div>
                <WhiteSpace/>
                <List renderHeader={() => 'Count'}>
                    <TextareaItem

                        rows={5}
                        count={100}
                    />
                </List>
            </div>)
    }
}

class componentdaterange extends React.Component {
    render() {
        return (
            <div>
                <WhiteSpace/>
                <List renderHeader={() => 'Count'}>
                    <DatePicker
                        mode="date"
                        title="开始日期"
                        extra="Optional"



                    >
                        <List.Item arrow="horizontal">开始日期</List.Item>
                    </DatePicker>
                    <DatePicker
                        mode="date"
                        title="结束日期"
                        extra="Optional"


                    >
                        <List.Item arrow="horizontal">结束日期</List.Item>
                    </DatePicker>
                </List>
            </div>)
    }
}


class jbsq extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            bg: 0,
            date: now,
            time: now,
            enddate: now,
            docId: '',
            flowId: 7,
            approvers: [],
            name: '',
            fields: []
        };
    }

    componentDidMount() {
        let that = this;
        Toast.loading('Loading...', 0, () => {
            console.log('Load complete !!!');
        });
        this.serverRequest = $.ajax('https://nightly-dev.99tone.com/mapi/data/approve/newDocumentId', {
            type: 'get',
            headers: {Authorization: 'Bearer ' + global.data.token},
            success(res) {

                that.setState({
                    docId: res.docId,

                })

                $.ajax(' https://nightly-dev.99tone.com/mapi/data/approve/applyDocument/view', {
                    type: 'get',
                    headers: {Authorization: 'Bearer ' + global.data.token},
                    data: {id: 0, flowId: that.state.flowId},
                    success(res) {
                        Toast.hide()
                        that.setState({
                            approvers: res.approvers,
                            name: res.name,
                            fields: res.fields

                        })


                    }
                })


            }
        })

    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    onChange(date, dateString) {
        console.log(date, dateString);
    }

    onChange1(date, dateString) {
        console.log(date, dateString);
    }


    render() {
        const style = {'borderBottom': '1px solid #d9d9d9'}
        const style1 = {'marginTop': '10px', background: 'white'}
        const style2 = {background: 'white'}
        const style3 = {'margin': '0 20px'}
        const style4 = {'paddingLeft': '10px'}
        const Option = Select.Option;

        return (

            <LocaleProvider>
                <div>
                    <div style={style1}>
                        <p className='pa'>申请流程</p>
                        <div className='pa' style={style}>加班申请</div>
                    </div>
                    <div style={style2}>
                        <p className='pa'>单号</p>
                        <div className='pa' style={style}>{this.state.docId}</div>
                    </div>
                    <div className='select'>
                        <div className='select-flex' style={style4}>所在门店（必填）</div>
                        <Select defaultValue={global.data.usershoplist[0].name} className='select-flex'
                                onChange={this.handleChange.bind(this)}>
                            {global.data.usershoplist.map((shoplist) =>
                                <Option key={shoplist.id} value={shoplist.name}>{shoplist.name}</Option>
                            )}
                        </Select>

                    </div>

                    <div style={style2} className='top'><p className='pa'>姓名</p><input className='xingming'/></div>
                    <div style={style2}><p className='pa'>所属门店</p><input className='xingming'/></div>
                    <div style={style2}><p className='pa'>岗位</p><input className='xingming'/></div>
                    <div style={style2}><p className='pa'>加班天数</p><input className='xingming'/></div>
                    <div style={style2} className='bottom'><p className='pa'>加班日期（必填）</p>

                        <DatePicker
                            mode="date"
                            title="开始日期"
                            extra="Optional"
                            value={this.state.date}
                            onChange={date => this.setState({date})}

                        >
                            <List.Item arrow="horizontal">开始日期</List.Item>
                        </DatePicker>
                        <DatePicker
                            mode="date"
                            title="结束日期"
                            extra="Optional"
                            value={this.state.enddate}
                            onChange={enddate => this.setState({enddate})}
                        >
                            <List.Item arrow="horizontal">结束日期</List.Item>
                        </DatePicker>

                    </div>
                    <div style={style2}><p className='pa'>加班事由</p>
                        <textarea className='xingming'></textarea>
                    </div>
                    <div className='select'>
                        <div className='select-flex' style={style4}>审批人（必填）</div>
                        <Select defaultValue='陈' className='select-flex'
                                onChange={this.handleChange.bind(this)}>

                            <Option value='陈'>陈</Option>

                        </Select>

                    </div>
                    <Button className='top' type="primary" block>提交</Button>
                </div>
            </LocaleProvider>

        )

    }
}

export default jbsq;