import React from 'react';
import {Select} from "antd";
import { List, InputItem, WhiteSpace } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../config';
class shoukuan extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fenqi:'不分期',
            money:0
        };
    }
    handleChange(){

    }
    comfirm(){

    }
    add(e){
        console.log(e)
        this.setState({
            money:e
        })
    }
    render() {

        const Option = Select.Option;
        return (
            <div>
                <div className='selectflex'>
                    <div className='selectdiv'>

                        <Select defaultValue={global.data.usershoplist[0].name} className='select-flex1'
                                onChange={this.handleChange.bind(this)}>
                            {global.data.usershoplist.map((shoplist) =>
                                <Option key={shoplist.id} value={shoplist.name}>{shoplist.name}</Option>
                            )}
                        </Select>

                    </div>
                    <div className='selectdiv'>

                        <Select defaultValue='不分期'
                                onChange={fenqi=>this.setState({fenqi})}>

                            <Option value='3期'>3期</Option>
                            <Option value='6期'>6期</Option>
                            <Option value='12期'>12期</Option>



                        </Select>

                    </div>
                </div>

                <List >
                    <InputItem

                        placeholder="收款备注"
                    />


                </List>
                <WhiteSpace/>
                <div className='money'> ￥{this.state.money}</div>
                <WhiteSpace/>
                <List >
                    <InputItem
                        type='money'
                        onChange={this.add.bind(this)}
                        placeholder="收款金额"
                        onVirtualKeyboardConfirm={this.comfirm()}

                    />


                </List>
            </div>
        )
    }
}

export default shoukuan;