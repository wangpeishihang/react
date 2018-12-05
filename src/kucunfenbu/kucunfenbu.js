import React from 'react';
import 'mfb/src/mfb'
import 'mfb/src/mfb.css'
import {Modal, List, Button, WhiteSpace, WingBlank, InputItem, Switch, Checkbox, Toast} from 'antd-mobile';
import {Select} from "antd";
import $ from "jquery";



const Item = List.Item;
const Brief = Item.Brief;
const CheckboxItem = Checkbox.CheckboxItem;
const Option = Select.Option;
class kucunfenbu extends React.Component{

    constructor(props){
        super(props)
        this.state={
            modal2: false,
            ghshoplist:[],
            allRootCategories:[],
            categoryId:''
        };
    }


    componentDidMount() {
        this.huoqughshop()
    }
    componentWillMount() {
    }

    showModal = key => (e) => {

        let that=this;
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });


        //第一次点击 加载所有数据然后保存方便调用
        if(key=='modal2'){

            if(global.data.allRootCategories.length!=0){
                that.setState({
                    allRootCategories: global.data.allRootCategories
                })
            }else {
                Toast.loading('Loading...', 0, () => {
                    console.log('Load complete !!!');
                });
                $.ajax('http://nightly-dev.99tone.com/mapi/data/common/allRootCategories', {
                    type: 'post',
                    headers: {Authorization: 'Bearer ' + global.data.token, 'Content-Type': 'application/json'},

                    success(res) {

                        that.setState({
                            allRootCategories: res.rows
                        })
                        global.data.allRootCategories=res.rows
                        Toast.hide()

                    }
                })
            }

        }
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    onErrorClick(){
        Toast.info('型号或编码必须填写')
    }
    onChange1(e) {
        this.setState({
            bianma:e
        })

    }


    huoqughshop(){

        let that=this;
        Toast.loading('Loading...', 0, () => {
            console.log('modal3');
        });
        $.ajax('https://nightly-dev.99tone.com/mapi/data/common/allSuppliers', {
            type: 'post',
            headers: {Authorization: 'Bearer ' + global.data.token, 'Content-Type': 'application/json'},

            data: {
                "ids": 0,

            },
            success(res) {

                let list=[];

                for (let i=0;i<res.rows.length;i++){
                    let a={};
                    a.id=res.rows[i].id;
                    a.abbr=res.rows[i].abbr;
                    a.checked=false

                    list.push(a)
                }


                that.setState({
                    ghshoplist: list
                })
                Toast.hide()

            }
        })
    }

    checkgh(e){
        this.setState({
            supplierId:e
        })
    }
    categoryId(e){
        this.setState({
            categoryId:e
        })
    }
    guilei(){

    }
    area(){

    }
    render() {
        const style={
            textAlign: 'center',
            lineHeight:'54px'
        }



        return(
            <div>库存分布

                <ul id="menu" className="mfb-component--br mfb-zoomin" data-mfb-toggle="hover">
                    <li className="mfb-component__wrap">
                        <a href="javascript:;" className="mfb-component__button--main" style={style}>
                            more

                        </a>
                        <ul className="mfb-component__list">
                            <li>

                                <Button onClick={this.showModal('modal2')} data-mfb-label="Child Button 1" className="mfb-component__button--child">搜索</Button>
                                <WhiteSpace />
                                <Modal
                                    popup
                                    visible={this.state.modal2}
                                    onClose={this.onClose('modal2')}
                                    animationType="fade"
                                >
                                    <List renderHeader={() => <div>查询</div>} className="popup-list ">


                                    <InputItem
                                        type="text"
                                        placeholder="输入型号或编码"
                                        error={this.state.hasError}
                                        onErrorClick={this.onErrorClick.bind(this)}
                                        onChange={this.onChange1.bind(this)}
                                        value={this.state.bianma}
                                    >型号或编码</InputItem>



                                    <WhiteSpace/>




                                    <Item extra={
                                        this.state.ghshoplist.length==0?'':(
                                            <Select  defaultValue={this.state.ghshoplist.length==0?'0':this.state.ghshoplist[0].id} onChange={this.checkgh.bind(this)}>
                                                {this.state.ghshoplist.map((ghlist)=>(
                                                    <Option  key={ghlist.id} value={ghlist.id}>{ghlist.abbr}&nbsp;&nbsp;&nbsp;</Option>
                                                ))}
                                            </Select>
                                        )




                                    }>供货商</Item>
                                    <WhiteSpace/>

                                    <Item extra={
                                        this.state.allRootCategories.length==0?'':(
                                            <Select  defaultValue={this.state.allRootCategories.length==0?'1':this.state.allRootCategories[0].id} onChange={this.categoryId.bind(this)}>
                                                {this.state.allRootCategories.map((allRootCategories)=>(
                                                    <Option  key={allRootCategories.id} value={allRootCategories.id}>{allRootCategories.name}&nbsp;&nbsp;&nbsp;</Option>
                                                ))}
                                            </Select>
                                        )




                                    }>商品分类</Item>


                                    <WhiteSpace/>

                                    <Item extra={<Select defaultValue='0'
                                                         onChange={this.guilei.bind(this)}>
                                        <Option value='0'>不区分</Option>
                                        <Option value='15'>按规格</Option>



                                    </Select>}>归类</Item>


                                    <WhiteSpace/>
                                        <Item extra={<Select defaultValue='0'
                                                             onChange={this.area.bind(this)}>
                                            <Option value='0'>全部区域</Option>
                                            <Option value='15'>苏州</Option>
                                            <Option value='30'>上海</Option>



                                        </Select>}>区域</Item>

                                    <WhiteSpace/>


                                    <List.Item>
                                        <Button type="primary" onClick={this.onClose('modal2')}>搜索</Button>
                                    </List.Item>
                                </List>
                                </Modal>
                            </li>

                        </ul>
                    </li>
                </ul>
            </div>



        )
    }
}
export default kucunfenbu;