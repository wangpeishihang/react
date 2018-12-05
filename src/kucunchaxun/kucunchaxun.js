import React from 'react';
import $ from 'jquery'


import {List, Modal, InputItem, WhiteSpace, Toast, Switch, Checkbox, Accordion, Radio} from 'antd-mobile';

import 'antd-mobile/dist/antd-mobile.css';
import Button from "antd-mobile/lib/button";
import {Select} from "antd";
import './kucun.css'

const Item = List.Item;
const Brief = Item.Brief;
const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;

class myshoukuan extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            bg: 0,
            dataList: '',
            searchType: 'ALL',
            categoryId: 0,//商品分类
            storeIdsStr: 0,//门店id
            supplierId: 0,//供应商id
            age: 0,//库龄
            onwayFlag: false,//是否在途
            inputCategory: "A1",//型号编码
            pindex: 1,
            psize: 20,
            hasError: false,
            bianma: '',
            modal1: false,
            modal2: false,
            modal3: false,

            checkallshoplist:false,
            shoplists:[],
            ghshoplist:[],
            allRootCategories:[],
            values: 0,

        };
    }

    componentDidMount() {
        this.chaxun()
        let list=[];

        for (let i=0;i<global.data.usershoplist.length;i++){
            let a={};
            a.id=global.data.usershoplist[i].id;
            a.name=global.data.usershoplist[i].name;
            a.checked=true

            list.push(a)
        }

        this.setState({
            shoplists:list
        })


    }

    componentWillMount() {
    }

    chaxun() {
        var that = this;


        Toast.loading('Loading...', 0, () => {
            console.log('Load complete !!!');
        });
        this.serverRequest = $.ajax('https://nightly-dev.99tone.com/mapi/data/inventory/queryInventoryTotalInfo', {
            type: 'post',
            headers: {Authorization: 'Bearer ' + global.data.token, 'Content-Type': 'application/json'},
            dataType: "json",
            data: JSON.stringify({
                "categoryId": that.state.categoryId,//商品分类
                "storeIdsStr": that.state.storeIdsStr,//门店id
                "supplierId": that.state.supplierId,//供应商id
                "age": that.state.age,//库龄
                "onwayFlag": that.state.onwayFlag,//是否在途
                "inputCategory": that.state.inputCategory,//型号编码
                "searchType": that.state.searchType,//不区分。按规格。成本价。采购价
                "pindex": that.state.pindex,
                "psize": that.state.psize
            }),
            success(res) {
                Toast.hide()

                that.setState({
                    dataList: res.rows
                })


                that.huoqughshop()

            }
        })
    }

    search(key){

        let that = this;
        console.log(this.state.categoryId)
        console.log(this.state.shoplists)
        console.log(this.state.supplierId)
        console.log(this.state.age)
        console.log(this.state.onwayFlag)
        console.log(this.state.bianma)
        let a='';//此处a为门店列表
        for (let i=0;i<this.state.shoplists.length;i++){
            a=a+this.state.shoplists[i].id+','
        }
        if(this.state.bianma==''){
            this.onErrorClick()
           // return false
        }



            Toast.loading('Loading...', 0, () => {
                console.log('Load complete !!!');
            });
            this.serverRequest = $.ajax('https://nightly-dev.99tone.com/mapi/data/inventory/queryInventoryTotalInfo', {
                type: 'post',
                headers: {Authorization: 'Bearer ' + global.data.token, 'Content-Type': 'application/json'},
                dataType: "json",
                data: JSON.stringify({
                    "categoryId": this.state.categoryId,//商品分类
                    "storeIdsStr": a,//门店id
                    "supplierId": that.state.supplierId,//供应商id
                    "age": that.state.age,//库龄
                    "onwayFlag": that.state.onwayFlag,//是否在途
                    "inputCategory": that.state.bianma,//型号编码
                    "searchType": 'ALL',//不区分。按规格。成本价。采购价
                    "pindex": 1,
                    "psize": 20
                }),
                success(res) {
                    Toast.hide()

                    that.setState({
                        dataList: res.rows,
                        [key]: false,
                    })

                }
            })

    }

    click(e, searchType) {
        this.setState({
            bg: e,
            searchType: searchType
        })
        this.chaxun()
    }

    watch(goodsId) {
        this.props.history.push({pathname: "/kcxq", state: {goodsId: goodsId}})
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

    onClose = key => () => {

        if(key==='modal2'){
            this.search(key)




        }else {
            this.setState({
                [key]: false,
            });
        }

    }

    onErrorClick() {
        Toast.info('型号或编码必须填写')
    }

    onChange1(e) {
        this.setState({
            bianma:e
        })

    }

    handleChange() {

    }

    handleChange1() {

    }

    age(e) {
        this.setState({
            age:e
        })
    }

    checkshop = (id,name) => {
        let list=[];

        for (let i=0;i<this.state.shoplists.length;i++) {
            let a={};
            if(this.state.shoplists[i].id===id){
                a.id=this.state.shoplists[i].id;
                a.name=this.state.shoplists[i].name;
                a.checked=!this.state.shoplists[i].checked;
            }else {
                a.id = this.state.shoplists[i].id;
                a.name = this.state.shoplists[i].name;
                a.checked = this.state.shoplists[i].checked;
            }
            list.push(a)
        }
        this.setState({
            shoplists:list
        })


       console.log(this.state.shoplists)


    }
    checkallshop = (val) => {



        if(this.state.checkallshoplist===false){
            let list=[];
            for (let i=0;i<this.state.shoplists.length;i++){
                let a={};
                a.id=this.state.shoplists[i].id;
                a.name=this.state.shoplists[i].name;
                a.checked=true

                list.push(a)
            }

            this.setState({
                checkallshoplist:!this.state.checkallshoplist,
                shoplists:list
            })

        }else {
            let list=[];
            for (let i=0;i<this.state.shoplists.length;i++){
                let a={};
                a.id=this.state.shoplists[i].id;
                a.name=this.state.shoplists[i].name;
                a.checked=false

                list.push(a)
            }

            this.setState({
                checkallshoplist:!this.state.checkallshoplist,
                shoplists:list
            })
        }




    }
    /*
    checkgh(id,name){
        let list=[];
        if(id===0&&this.state.ghshoplist[0].checked===false){
            for (let i=0;i<this.state.ghshoplist.length;i++) {
                let a={};

                    a.id=this.state.ghshoplist[i].id;
                    a.abbr=this.state.ghshoplist[i].abbr;
                    a.checked=true;

                list.push(a)
            }


        }else if(id===0&&this.state.ghshoplist[0].checked===true){
            for (let i=0;i<this.state.ghshoplist.length;i++) {
                let a={};

                a.id=this.state.ghshoplist[i].id;
                a.abbr=this.state.ghshoplist[i].abbr;
                a.checked=false;

                list.push(a)
            }
        }else {


        for (let i=0;i<this.state.ghshoplist.length;i++) {
            let a={};
            if(this.state.ghshoplist[i].id===id){
                a.id=this.state.ghshoplist[i].id;
                a.abbr=this.state.ghshoplist[i].abbr;
                a.checked=!this.state.ghshoplist[i].checked;
            }else {
                a.id = this.state.ghshoplist[i].id;
                a.abbr = this.state.ghshoplist[i].abbr;
                a.checked = this.state.ghshoplist[i].checked;
            }
            list.push(a)
        }
        }
        this.setState({
            ghshoplist:list
        })
    }
    */

    categoryId(e){
        console.log(e)
        this.setState({
            categoryId:e
        })
    }
    checkgh(e){
            this.setState({
                supplierId:e
            })
    }

    render() {

        const style = {
            fontSize: '14',
            color: '#40a9ff'
        }
        const data1 = [
            {value: 0, label: 'doctor'},
            {value: 1, label: 'bachelor'},
        ];
        const data = [
            {value: 0, label: 'Ph.D.'},
            {value: 1, label: 'Bachelor'},
            {value: 2, label: 'College diploma'},

        ];
        const style11={paddingLeft:0}
        const Option = Select.Option;



        return (
            <div>
                <div className='myshoukuan'>
                    <div className={this.state.bg == 0 ? 'myshoukuan-flex active' : 'myshoukuan-flex'}
                         onClick={this.click.bind(this, 0, 'ALL')}>不区分
                    </div>
                    <div className={this.state.bg == 1 ? 'myshoukuan-flex active' : 'myshoukuan-flex'}
                         onClick={this.click.bind(this, 1, 'COLOR')}>按规格
                    </div>
                    <div className={this.state.bg == 2 ? 'myshoukuan-flex active' : 'myshoukuan-flex'}
                         onClick={this.click.bind(this, 2, 'COST')}>成本价
                    </div>
                    <div className={this.state.bg == 3 ? 'myshoukuan-flex active' : 'myshoukuan-flex'}
                         onClick={this.click.bind(this, 3, 'PURCHASE')}>采购价
                    </div>

                </div>
                <Button icon="search" onClick={this.showModal('modal2')} style={style}>搜 索</Button>
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
                        <List.Item>



                            <Item style={style11} onClick={this.showModal('modal1')} extra={<div >全部</div>}>门店</Item>
                            <Modal
                                popup
                                visible={this.state.modal1}
                                onClose={this.onClose('modal1')}
                                animationType="slide-up"

                            >


                                <div style={{height: 450, overflow: 'scroll'}}>
                                    <CheckboxItem  onChange={() => this.checkallshop()}>
                                        全选
                                    </CheckboxItem>



                                    {this.state.shoplists.map((shoplist) => (
                                        <CheckboxItem key={shoplist.id}  checked={shoplist.checked} onChange={() => this.checkshop(shoplist.id,shoplist.name)}>
                                            {shoplist.name}
                                        </CheckboxItem>
                                    ))}


                                </div>
                            </Modal>
                        </List.Item>
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
                                             onChange={this.age.bind(this)}>
                            <Option value='0'>不限</Option>
                            <Option value='15'>15天</Option>
                            <Option value='30'>30天</Option>
                            <Option value='60'>60天</Option>
                            <Option value='90'>90天</Option>


                        </Select>}>库龄</Item>


                        <WhiteSpace/>
                        <List.Item
                            extra={<Switch
                                checked={this.state.onwayFlag}
                                onChange={() => {
                                    this.setState({
                                        onwayFlag: !this.state.onwayFlag,
                                    });
                                }}
                            />}
                        >在途</List.Item>

                        <WhiteSpace/>


                        <List.Item>
                            <Button type="primary" onClick={this.onClose('modal2')}>搜索</Button>
                        </List.Item>
                    </List>
                </Modal>
                <WhiteSpace/>
                <List className="my-list">
                    {this.state.dataList == '' ? '' : this.state.dataList.map((list) =>
                        <Item
                            arrow="horizontal"
                            thumb={<i className='JiutoneIcons jtion-save' style={style}></i>}
                            multipleLine
                            onClick={this.watch.bind(this, list.goodsId)}
                            key={list.goodsId}
                        >
                            {list.name}
                            <Brief>库存量：{list.number}</Brief><Brief>{'采购价：￥' + list.storeCost}&nbsp;&nbsp;&nbsp;零售价：￥{+list.storeCostAmount}</Brief>
                        </Item>
                    )}

                </List>
            </div>
        )
    }
}

export default myshoukuan;