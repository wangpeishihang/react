import React from 'react';

import {Select,Button } from 'antd';
import { DatePicker, List,LocaleProvider } from 'antd-mobile';

import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import './xjyz.css';
import '../config';



const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
class xjyz extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            bg: 0,
            date:now,
            enddate:now
        };
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
    state = {
        date: now,
        time: now,
        enddate:now

    }
    render() {
        const style = {'borderBottom': '1px solid #d9d9d9'}
        const style1 = {'marginTop': '10px', background: 'white'}
        const style2 = {background: 'white'}
        const style3={'margin': '0 20px'}
        const style4={'paddingLeft': '10px'}
        const Option = Select.Option;
        return (

            <LocaleProvider >
                <div>
                    <div style={style1}>
                        <p className='pa'>申请流程</p>
                        <div className='pa' style={style}>现金预支</div>
                    </div>
                    <div style={style2}>
                        <p className='pa'>单号</p>
                        <div className='pa' style={style}>SP201811260009</div>
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
                    <div style={style2} className='top'><p className='pa'>预支人（必填）</p><input className='xingming'/></div>
                    <div style={style2}><p className='pa'>预支金额（必填）</p><input className='xingming'/></div>
                    <div style={style2}><p className='pa'>预支用途（必填）</p><input className='xingming'/></div>
                    <div style={style2} className='bottom'><p className='pa'>日期</p>
                        <DatePicker
                            mode="date"
                            title="开始日期"
                            extra="Optional"
                            value={this.state.date}
                            onChange={date => this.setState({ date })}

                        >
                            <List.Item   arrow="horizontal">开始日期</List.Item>
                        </DatePicker>


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

export default xjyz;