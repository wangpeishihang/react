import React from 'react';
import { BrowserRouter as Router, Link} from "react-router-dom";
import $ from 'jquery';
import {Toast, WhiteSpace, WingBlank, Button,TabBar } from 'antd-mobile';
import '../config'
import './icon.css'




class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dataList: '',
            selectedTab: 'blueTab',
            hidden: false,
            fullScreen: true,};
        this.tcount=this.tcount.bind(this);

    }


    componentDidMount() {
            var that=this;


            if( global.data.dataList==''){
                Toast.loading('Loading...', 0, () => {
                    console.log('Load complete !!!');
                });
            this.serverRequest=$.ajax('https://nightly-dev.99tone.com/mapi/data/sales/reportDataPreview',{
                type: 'post',
                headers: {Authorization: 'Bearer ' + global.data.token},
                data: {'sid': 0,'rid':0},
                success(res) {
                    Toast.hide()
                    that.setState({
                        dataList: res
                    })
                    global.data.dataList=res
                    console.log(global.data.user)
                }
            })
            }else {
                that.setState({
                    dataList:  global.data.dataList
                })
            }
/*
        this.serverRequest=$.ajax('https://nightly-dev.99tone.com/mapi/data/common/allStores',{
            type: 'post',
            headers: {Authorization: 'Bearer ' + global.data.token},
            data: {'sid': 0,'rid':0},
            success(res) {
                console.log(res)
            }
        })*/

    }

    componentWillUnmount() {

        if( global.data.dataList==''){
            this.serverRequest.abort();
        }else {
            this.setState({
                dataList: global.data.dataList
            })
        }

    }


    tcount(){
        this.props.history.push({ pathname: "/Shuju", state: { title:'今日销量' ,biz:0,type:0,ds:0} })//此处跳转路由时，应该把业务类型及对应的查询分类传过去
    }
    tAmount(){
        this.props.history.push({ pathname: "/Shuju", state: { title:'今日销售额' ,biz:0,type:0,ds:1} })//此处跳转路由时，应该把业务类型及对应的查询分类传过去
    }
    tProfit(){
        this.props.history.push({ pathname: "/Shuju", state: { title:'今日毛利' ,biz:0,type:0,ds:2} })//此处跳转路由时，应该把业务类型及对应的查询分类传过去
    }
    yCount(){
        this.props.history.push({ pathname: "/Shuju", state: { title:'昨日销量' ,biz:0,type:1,ds:0} })//此处跳转路由时，应该把业务类型及对应的查询分类传过去
    }
    yAmount(){
        this.props.history.push({ pathname: "/Shuju", state: { title:'昨日销售额' ,biz:0,type:1,ds:1} })//此处跳转路由时，应该把业务类型及对应的查询分类传过去
    }
    yProfit(){
        this.props.history.push({ pathname: "/Shuju", state: { title:'昨日毛利' ,biz:0,type:1,ds:2} })//此处跳转路由时，应该把业务类型及对应的查询分类传过去
    }
    mobipayToday(){
        this.props.history.push({ pathname: "/Shuju", state: { title:'今日收款' ,biz:1,type:0,ds:0} })//此处跳转路由时，应该把业务类型及对应的查询分类传过去
    }
    mobipayWeek(){
        this.props.history.push({ pathname: "/Shuju", state: { title:'本周收款' ,biz:1,type:3,ds:0} })//此处跳转路由时，应该把业务类型及对应的查询分类传过去
    }
    mobipayMonth(){
        this.props.history.push({ pathname: "/Shuju", state: { title:'本月收款' ,biz:1,type:4,ds:0} })//此处跳转路由时，应该把业务类型及对应的查询分类传过去
    }

    renderContent(pageText) {


        if(pageText=='Life'){
            return (
                <div className="gezi">

                    <div onClick={this.tcount.bind(this)} className="gezi-flex">￥{this.state.dataList.tCount}

                        <p className="gezi-flex-text">今日销量</p>
                    </div>
                    <div className="gezi-flex" onClick={this.tAmount.bind(this)}>￥{this.state.dataList.tAmount}
                        <p className="gezi-flex-text">今日销售额</p>
                    </div>
                    <div className="gezi-flex" onClick={this.tProfit.bind(this)}>￥{this.state.dataList.tProfit}
                        <p className="gezi-flex-text">今日毛利</p>
                    </div>
                    <div className="gezi-flex" onClick={this.yCount.bind(this)}>￥{this.state.dataList.yCount}
                        <p className="gezi-flex-text">昨日销量</p>
                    </div>
                    <div className="gezi-flex" onClick={this.yAmount.bind(this)}>￥{this.state.dataList.yAmount}
                        <p className="gezi-flex-text">昨日销售额</p>
                    </div>
                    <div className="gezi-flex" onClick={this.yProfit.bind(this)}>￥{this.state.dataList.yProfit}
                        <p className="gezi-flex-text">昨日毛利</p>
                    </div>
                    <div className="gezi-flex" onClick={this.mobipayToday.bind(this)}>￥{this.state.dataList.mobipayToday}
                        <p className="gezi-flex-text">今日收款</p>
                    </div>
                    <div className="gezi-flex" onClick={this.mobipayWeek.bind(this)}>￥{this.state.dataList.mobipayWeek}
                        <p className="gezi-flex-text">本周收款</p>
                    </div>
                    <div className="gezi-flex" onClick={this.mobipayMonth.bind(this)}>￥{this.state.dataList.mobipayMonth}
                        <p className="gezi-flex-text">本月收款</p>
                    </div>


                </div>
            )
        }
        else if(pageText=='Koubei'){
            return (
                <div>
                    <div className="weui-grids" >
                        <div className="fenqi">收款分期</div>
                        <Link to='/shoukuan' className="weui-grid js_grid">

                            <div className="weui-grid__icon fastshoukuan">
                                <i className='JiutoneIcons jtion-kuaisushoukuan_v1'></i>
                            </div>
                            <p className="weui-grid__label">
                                快速收款
                            </p>
                        </Link>
                        <Link to='/myshoukuan' className="weui-grid js_grid">
                            <div className="weui-grid__icon wodesk">
                                <i className='JiutoneIcons jtion-jiaoyijilu'></i>
                            </div>
                            <p className="weui-grid__label">
                                我的收款
                            </p>
                        </Link>
                        <Link to='/jiaoyigenzong' className="weui-grid js_grid">
                            <div className="weui-grid__icon jiaoyigz">
                                <i className='JiutoneIcons jtion-shouxineduchaxun'></i>
                            </div>
                            <p className="weui-grid__label">
                                交易跟踪
                            </p>
                        </Link>

                    </div>
                    <div className="weui-grids" >
                        <div className="fenqi">购销操作</div>
                        <Link to='/xsd' className="weui-grid js_grid">
                            <div className="weui-grid__icon xsd">
                                <i className='JiutoneIcons jtion-xiaoshoudan'></i>
                            </div>
                            <p className="weui-grid__label">
                                销售单
                            </p>
                        </Link>
                        <Link to='/chuanhao' className="weui-grid js_grid">
                            <div className="weui-grid__icon ">
                                <i className='JiutoneIcons jtion-sales-query'></i>
                            </div>
                            <p className="weui-grid__label">
                                串号查询
                            </p>
                        </Link>
                        <Link to='/kucunchaxun' className="weui-grid js_grid">
                            <div className="weui-grid__icon kuncuncx">
                                <i className='JiutoneIcons jtion-kucunchaxun'></i>
                            </div>
                            <p className="weui-grid__label">
                                库存查询
                            </p>
                        </Link>
                        <Link to='/kucunfenbu' className="weui-grid js_grid">
                            <div className="weui-grid__icon kuncunfb">
                                <i className='JiutoneIcons jtion-inventory-distribution'></i>
                            </div>
                            <p className="weui-grid__label">
                                库存分布
                            </p>
                        </Link>

                    </div>
                    <div className="weui-grids" >
                        <div className="fenqi">审批流程</div>
                        <Link to='/wodesq' className="weui-grid js_grid">
                            <div className="weui-grid__icon wodesq">
                                <i className='JiutoneIcons jtion-wodeshenqing'></i>
                            </div>
                            <p className="weui-grid__label">
                                我的申请
                            </p>
                        </Link>
                        <Link to='/wodesp' className="weui-grid js_grid">
                            <div className="weui-grid__icon wodesp">
                                <i className='JiutoneIcons jtion-wodeshenpi'></i>
                            </div>
                            <p className="weui-grid__label">
                                我的审批
                            </p>
                        </Link>
                        <Link to='/csgw' className="weui-grid js_grid">
                            <div className="weui-grid__icon chaosonggw">
                                <i className='JiutoneIcons jtion-chaosongwodewudi'></i>
                            </div>
                            <p className="weui-grid__label">
                                抄送给我
                            </p>
                        </Link>
                        <Link to='/jbsq' className="weui-grid js_grid">
                            <div className="weui-grid__icon">
                                <i className='JiutoneIcons icon-jiabanshenqingbiao'></i>
                            </div>
                            <p className="weui-grid__label">
                                加班申请
                            </p>
                        </Link>
                        <Link to='/xjyz' className="weui-grid js_grid">
                            <div className="weui-grid__icon">
                                <i className='iconfont icon-xianjinyue'></i>
                            </div>
                            <p className="weui-grid__label">
                                现金预支
                            </p>
                        </Link>
                        <Link to='/gclc' className="weui-grid js_grid">
                            <div className="weui-grid__icon">
                                <i className='iconfont icon-chucha'></i>
                            </div>
                            <p className="weui-grid__label">
                                公差流程
                            </p>
                        </Link>
                        <Link to='/yg' className="weui-grid js_grid">
                            <div className="weui-grid__icon">
                                <i className='iconfont icon-yuangongruzhi'></i>
                            </div>
                            <p className="weui-grid__label">
                                员工
                            </p>
                        </Link>
                        <Link to='/xygrz' className="weui-grid js_grid">
                            <div className="weui-grid__icon">
                                <i className='iconfont icon-yuangongguanli'></i>
                            </div>
                            <p className="weui-grid__label">
                                新员工入职
                            </p>
                        </Link>
                        <Link to='/all' className="weui-grid js_grid">
                            <div className="weui-grid__icon">
                                <img src="img/icon.png" alt=""/>
                            </div>
                            <p className="weui-grid__label">
                                全部
                            </p>
                        </Link>
                    </div>

                </div>
            )
        }else {
            return(

                <div>
                    <div className="weui-cells">
                        <div className="weui-cell">
                            <div className="weui-cell__hd"><i className='JiutoneIcons jtion-yonghu'></i></div>
                            <div className="weui-cell__bd bd">
                                <p className='bd_p'>{global.data.user.realName} <span className='bd_span'>{global.data.user.id}</span></p>
                                <p className='bd_nextp'>{global.data.user.company.name}</p>
                            </div>
                            <div className="weui-cell__ft"></div>
                        </div>

                    </div>
                    <div className="weui-cells nextbutton">
                        <a className="weui-cell weui-cell_access" href="#/Fankui">
                            <div className="weui-cell__bd">
                                <p>帮助与反馈</p>
                            </div>
                            <div className="weui-cell__ft">
                            </div>
                        </a>
                        <a className="weui-cell weui-cell_access" href="javascript:;">
                            <div className="weui-cell__bd">
                                <p>关于久通</p>
                            </div>
                            <div className="weui-cell__ft">
                            </div>
                        </a>
                    </div>
                    <div className="weui-cells nextbutton1" >
                        <a className="weui-cell weui-cell_access" href="javascript:;">
                            <div className="weui-cell__bd">
                                退出登录
                            </div>

                        </a>
                    </div>
                </div>


            )
        }

    }
    render() {
        const style={height:'90%','WebkitOverflowScrolling': 'touch'}
        const style1={marginBottom:0}
        return (
            <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', bottom: 0 } : { height: 400 }}>


                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="工作台"
                        key="Life"
                        icon={<i className='JiutoneIcons jtion-gongzuotaiweixuanzhong1'></i>
                        }
                        selectedIcon={<i className='JiutoneIcons jtion-gongzuotaixuanzhong1'></i>
                        }
                        selected={this.state.selectedTab === 'blueTab'}

                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                        }}
                        data-seed="logId"
                    >
                        {this.renderContent('Life')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <i className='JiutoneIcons jtion-yewu2'></i>
                        }
                        selectedIcon={
                            <i className='JiutoneIcons jtion-yewu'></i>
                        }
                        title="业务"
                        key="Koubei"

                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                            });
                        }}
                        data-seed="logId1"
                    >
                        {this.renderContent('Koubei')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<i className='JiutoneIcons jtion-my2'></i>}
                        selectedIcon={<i className='JiutoneIcons jtion-my-active1'></i>}
                        title="我"
                        key="my"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'yellowTab',
                            });
                        }}
                    >
                        {this.renderContent('My')}
                    </TabBar.Item>
                </TabBar>
            </div>

            /*    <div className="weui-tab">

                  <div className="weui-tab__bd">

                       <div id="Home" className="weui-tab__bd-item weui-tab__bd-item--active">
                           <div className="gezi">

                               <div onClick={this.tcount.bind(this)} className="gezi-flex">￥{this.state.dataList.tCount}

                                   <p className="gezi-flex-text">今日销量</p>
                               </div>
                               <div className="gezi-flex" onClick={this.tAmount.bind(this)}>￥{this.state.dataList.tAmount}
                                   <p className="gezi-flex-text">今日销售额</p>
                               </div>
                               <div className="gezi-flex" onClick={this.tProfit.bind(this)}>￥{this.state.dataList.tProfit}
                                   <p className="gezi-flex-text">今日毛利</p>
                               </div>
                               <div className="gezi-flex" onClick={this.yCount.bind(this)}>￥{this.state.dataList.yCount}
                                   <p className="gezi-flex-text">昨日销量</p>
                               </div>
                               <div className="gezi-flex" onClick={this.yAmount.bind(this)}>￥{this.state.dataList.yAmount}
                                   <p className="gezi-flex-text">昨日销售额</p>
                               </div>
                               <div className="gezi-flex" onClick={this.yProfit.bind(this)}>￥{this.state.dataList.yProfit}
                                   <p className="gezi-flex-text">昨日毛利</p>
                               </div>
                               <div className="gezi-flex" onClick={this.mobipayToday.bind(this)}>￥{this.state.dataList.mobipayToday}
                                   <p className="gezi-flex-text">今日收款</p>
                               </div>
                               <div className="gezi-flex" onClick={this.mobipayWeek.bind(this)}>￥{this.state.dataList.mobipayWeek}
                                   <p className="gezi-flex-text">本周收款</p>
                               </div>
                               <div className="gezi-flex" onClick={this.mobipayMonth.bind(this)}>￥{this.state.dataList.mobipayMonth}
                                   <p className="gezi-flex-text">本月收款</p>
                               </div>


                           </div>
                       </div>


                       <div id="tab2" style={style} className="weui-tab__bd-item">
                           <div className="weui-grids" >
                               <div className="fenqi">收款分期</div>
                               <Link to='/shoukuan' className="weui-grid js_grid">

                                   <div className="weui-grid__icon">
                                       <i className='iconfont icon-shoukuan'></i>
                                   </div>
                                   <p className="weui-grid__label">
                                       快速收款
                                   </p>
                               </Link>
                               <Link to='/myshoukuan' className="weui-grid js_grid">
                                   <div className="weui-grid__icon">
                                       <i className='iconfont icon-shoukuan-'></i>
                                   </div>
                                   <p className="weui-grid__label">
                                       我的收款
                                   </p>
                               </Link>
                               <Link to='/jiaoyigenzong' className="weui-grid js_grid">
                                   <div className="weui-grid__icon">
                                       <i className='iconfont icon-jiaoyi'></i>
                                   </div>
                                   <p className="weui-grid__label">
                                       交易跟踪
                                   </p>
                               </Link>

                           </div>
                           <div className="weui-grids" >
                               <div className="fenqi">购销操作</div>
                               <Link to='/xsd' className="weui-grid js_grid">
                                   <div className="weui-grid__icon">
                                       <i className='iconfont icon-xiaoshoudanguanli'></i>
                                   </div>
                                   <p className="weui-grid__label">
                                       销售单
                                   </p>
                               </Link>
                               <Link to='/chuanhao' className="weui-grid js_grid">
                                   <div className="weui-grid__icon">
                                       <i className='iconfont icon-chaxunzhengshu'></i>
                                   </div>
                                   <p className="weui-grid__label">
                                       串号查询
                                   </p>
                               </Link>
                               <Link to='/kucunchaxun' className="weui-grid js_grid">
                                   <div className="weui-grid__icon">
                                       <i className='iconfont icon-kucunchaxun'></i>
                                   </div>
                                   <p className="weui-grid__label">
                                       库存查询
                                   </p>
                               </Link>
                               <Link to='/kucunfenbu' className="weui-grid js_grid">
                                   <div className="weui-grid__icon">
                                       <i className='iconfont icon-kucunduiji'></i>
                                   </div>
                                   <p className="weui-grid__label">
                                       库存分布
                                   </p>
                               </Link>

                           </div>
                           <div className="weui-grids" >
                               <div className="fenqi">审批流程</div>
                               <Link to='/wodesq' className="weui-grid js_grid">
                                   <div className="weui-grid__icon">
                                       <i className='iconfont icon-wodeshenpi'></i>
                                   </div>
                                   <p className="weui-grid__label">
                                       我的申请
                                   </p>
                               </Link>
                               <Link to='/wodesp' className="weui-grid js_grid">
                                   <div className="weui-grid__icon">
                                       <i className='iconfont icon-wodeshenpi'></i>
                                   </div>
                                   <p className="weui-grid__label">
                                       我的审批
                                   </p>
                               </Link>
                               <Link to='/csgw' className="weui-grid js_grid">
                                   <div className="weui-grid__icon">
                                       <i className='iconfont icon-chaosongwode'></i>
                                   </div>
                                   <p className="weui-grid__label">
                                       抄送给我
                                   </p>
                               </Link>
                               <Link to='/jbsq' className="weui-grid js_grid">
                                   <div className="weui-grid__icon">
                                       <i className='iconfont icon-jiabanshenqingbiao'></i>
                                   </div>
                                   <p className="weui-grid__label">
                                       加班申请
                                   </p>
                               </Link>
                               <Link to='/xjyz' className="weui-grid js_grid">
                                   <div className="weui-grid__icon">
                                       <i className='iconfont icon-xianjinyue'></i>
                                   </div>
                                   <p className="weui-grid__label">
                                       现金预支
                                   </p>
                               </Link>
                               <Link to='/gclc' className="weui-grid js_grid">
                                   <div className="weui-grid__icon">
                                       <i className='iconfont icon-chucha'></i>
                                   </div>
                                   <p className="weui-grid__label">
                                       公差流程
                                   </p>
                               </Link>
                               <Link to='/yg' className="weui-grid js_grid">
                                   <div className="weui-grid__icon">
                                       <i className='iconfont icon-yuangongruzhi'></i>
                                   </div>
                                   <p className="weui-grid__label">
                                       员工
                                   </p>
                               </Link>
                               <Link to='/xygrz' className="weui-grid js_grid">
                                   <div className="weui-grid__icon">
                                       <i className='iconfont icon-yuangongguanli'></i>
                                   </div>
                                   <p className="weui-grid__label">
                                       新员工入职
                                   </p>
                               </Link>
                               <Link to='/all' className="weui-grid js_grid">
                                   <div className="weui-grid__icon">
                                       <img src="img/icon.png" alt=""/>
                                   </div>
                                   <p className="weui-grid__label">
                                       全部
                                   </p>
                               </Link>


                           </div>
                       </div>

                       <div id="tab3" className="weui-tab__bd-item">
                           <div className="weui-cells">
                               <div className="weui-cell">
                                   <div className="weui-cell__hd"><img src="img/icon.png"/></div>
                                   <div className="weui-cell__bd bd">
                                       <p className='bd_p'>{global.data.user.realName} <span className='bd_span'>{global.data.user.id}</span></p>
                                       <p className='bd_nextp'>{global.data.user.realName}</p>
                                   </div>
                                   <div className="weui-cell__ft"></div>
                               </div>

                           </div>
                           <div className="weui-cells nextbutton">
                               <a className="weui-cell weui-cell_access" href="#/Fankui">
                                   <div className="weui-cell__bd">
                                       <p>帮助与反馈</p>
                                   </div>
                                   <div className="weui-cell__ft">
                                   </div>
                               </a>
                               <a className="weui-cell weui-cell_access" href="javascript:;">
                                   <div className="weui-cell__bd">
                                       <p>关于久通</p>
                                   </div>
                                   <div className="weui-cell__ft">
                                   </div>
                               </a>
                           </div>
                           <div className="weui-cells nextbutton1" >
                               <a className="weui-cell weui-cell_access" href="javascript:;">
                                   <div className="weui-cell__bd">
                                      退出登录
                                   </div>

                               </a>
                           </div>
                       </div>

                   </div>




            <div className="weui-tabbar">
               <a href="#Home" className="weui-tabbar__item weui-bar__item--on">

               <div className="weui-tabbar__icon">
                   <i className="iconfont icon-gongzuotai "></i>
               </div>
           <p style={style1} className="weui-tabbar__label">工作台</p>
           </a>
           <a href="#tab2" className="weui-tabbar__item">
               <div className="weui-tabbar__icon">
                   <i className="iconfont icon-yewu-xianxing "></i>
               </div>
               <p style={style1} className="weui-tabbar__label">业务</p>
           </a>
           <a href="#tab3" className="weui-tabbar__item">
               <div className="weui-tabbar__icon">
                   <i className="iconfont icon-ziyuan "></i>
               </div>
               <p style={style1} className="weui-tabbar__label">我</p>
           </a>
       </div>
       </div>*/

        );
    }
}


export default Home;
