import React from 'react';

import {Helmet} from "react-helmet";
import Highcharts from 'highcharts';
import '../config';
import $ from 'jquery';
import {Toast, WhiteSpace, WingBlank, Button} from 'antd-mobile';
import axios from 'axios';

const p = {tip1: '', tip2: '', tip3: '', tip4: '', shuju1: '', shuju2: '', shuju3: '', shuju4: ''};
function Tip(props) {
    return <div>
        <div className='tip'>
            <div className='toptip'></div>
            <div className='centertip'>{props.shuliang}</div>
        </div>
        <div className='bottomtip'>
            <div className='bottomtip-flex'><p>{p.tip1 + p.shuju1.toString()}</p></div>
            <div className='bottomtip-flex'><p>{p.tip2 + p.shuju2}</p></div>
        </div>
    </div>
}
class Shuju extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.location.state === undefined ? '' : this.props.location.state.title,
            biz: props.location.state === undefined ? '' : this.props.location.state.biz,
            type: props.location.state === undefined ? '' : this.props.location.state.type,
            ds: props.location.state === undefined ? '' : this.props.location.state.ds,
            tip: '',
            is:props.location.state.type,
            shujulist: ''
        };
    }
    hightchart(biz, type, ds, sid, rid, tip) {
        const that = this;
        const date = [];
        const shuliang = [];
        //绘制图表前，请求获取数据接口
        Toast.loading('Loading...', 0, () => {
            console.log('Load complete !!!');
        });
        this.serverRequest = $.ajax('https://nightly-dev.99tone.com/mapi/data/sales/reportDataDetail', {
            type: 'post',
            headers: {Authorization: 'Bearer ' + global.data.token},
            data: {biz: biz, type: type, ds: ds, sid: ds, rid: rid},
            success(res) {
                that.setState({
                    shujulist: res.rows
                })
                Toast.hide()
                // localStorage.setItem('rows',res.rows)


                for (let i = 0; i < res.rows.length; i++) {

                    date.push(res.rows[i].item);
                    shuliang.push(res.rows[i].value)
                }
                const newChart = Highcharts.chart('container', {
                    chart: {
                        type: 'line'
                    },
                    credits: {
                        enabled: false     //不显示LOGO
                    },
                    title: {
                        text: '',
                        style: {
                            "fontSize": "12px",   //字体大小
                            fontWeight: 'bold'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: date,
                        minTickInterval: type > 2 ? 2 : 4,
                        labels: {
                            style: {
                                'fontSize': '8px'
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                // 开启数据标签
                                enabled: false
                            },
                            // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                            enableMouseTracking: true
                        }
                    },
                    series: [{
                        name: '订单数',
                        data: shuliang
                    }]
                });
                that.chart = newChart
            }
        })


        /*
        if (biz === 0 && type === 0 && ds === 0) {

            json = global.data.tcount.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.tcount;
            p.shuju1=global.data.tcount[1].percent;
            p.shuju2=global.data.tcount[1].value;
            p.shuju3=1;
            p.shuju4=2;
        } else if (biz === 0 && type === 1 && ds === 0) {
            json = global.data.yCount.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.yCount;
        } else if (biz === 0 && type === 2 && ds === 0) {
            json = global.data.yCountq.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.yCountq;
        } else if (biz === 0 && type === 3 && ds === 0) {
            json = global.data.yCountweek.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.yCountweek;
        } else if (biz === 0 && type === 4 && ds === 0) {
            json = global.data.yCountmonth.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.yCountmonth;
        }
        //以上为销售额统计 、、今日 、、昨日、、前天、、周、、月
        if (biz === 0 && type === 0 && ds === 1) {
            json = global.data.tAmount.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.tAmount;
        } else if (biz === 0 && type === 1 && ds === 1) {
            json = global.data.yAmount.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.yAmount;
        } else if (biz === 0 && type === 2 && ds === 1) {
            json = global.data.yAmountq.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.yAmountq;
        } else if (biz === 0 && type === 3 && ds === 1) {
            json = global.data.yAmountweek.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.yAmountweek;
        } else if (biz === 0 && type === 4 && ds === 1) {
            json = global.data.yAmountmonth.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.yAmountmonth;
        }
        //以上为销售金额统计 、、今日 、、昨日、、前天、、周、、月

        if (biz === 0 && type === 0 && ds === 2) {
            json = global.data.tProfit.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.tProfit;
        } else if (biz === 0 && type === 1 && ds === 2) {
            json = global.data.yProfit.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.yProfit;
        } else if (biz === 0 && type === 2 && ds === 2) {
            json = global.data.yProfitq.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.yProfitq;
        } else if (biz === 0 && type === 3 && ds === 2) {
            json = global.data.yProfitweek.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.yProfitweek;
        } else if (biz === 0 && type === 4 && ds === 2) {
            json = global.data.yProfitmonth.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.yProfitmonth;
        }
        //以上为毛利统计 、、今日 、、昨日、、前天、、周、、月

        if (biz === 1 && type === 0 && ds === 0) {
            json = global.data.mobipayToday.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.mobipayToday;
        } else if (biz === 1 && type === 1 && ds === 0) {
            json = global.data.mobipayy.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.mobipayy;
        } else if (biz === 1 && type === 2 && ds === 0) {
            json = global.data.mobipayq.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.mobipayq;
        } else if (biz === 1 && type === 3 && ds === 0) {
            json = global.data.mobipayWeek.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.mobipayWeek;
        } else if (biz === 1 && type === 4 && ds === 0) {
            json = global.data.mobipayMonth.length === 0 ? this.getshuju(biz, type, ds, sid, rid) : global.data.mobipayMonth;
        }*/
        //以上为收款统计 、、今日 、、昨日、、前天、、周、、月





    }


    componentDidMount() {

        this.hightchart(this.state.biz, this.state.type, this.state.ds, 0, 0);//此处应该传获取到的商家的全部分类id，和商品全部分类的id
      /*  switch (this.state.is) {
            case 0:
                p.tip1 = '较前日 ';
                p.tip2 = '前一天 ';

                this.setState({

                    is:0
                })

                p.shuju1=this.state.shujulist[0].percent;
                p.shuju2=this.state.shujulist[0].value;
                break;
            case 1:
                p.tip1 = '较前日 ';
                p.tip2 = '前一天 ';

                this.setState({

                    is:1
                })

                p.shuju1=this.state.shujulist[0].percent;
                p.shuju2=this.state.shujulist[0].value;
                break;
            case 2:
                p.tip1 = '较前日 ';
                p.tip2 = '前一天 ';

                this.setState({

                    is:2
                })

                p.shuju1=this.state.shujulist[0].percent;
                p.shuju2=this.state.shujulist[0].value;
                break;
            case 3:
                p.tip1 = '较前日 ';
                p.tip2 = '前一天 ';

                this.setState({

                    is:3
                })

                p.shuju1=this.state.shujulist[0].percent;
                p.shuju2=this.state.shujulist[0].value;
                break;
            case 4:
                p.tip1 = '较上月同比 ';
                p.tip2 = '上月同比 ';

                this.setState({

                    is:4
                })

                p.shuju1=this.state.shujulist[0].percent;
                p.shuju2=this.state.shujulist[0].value;
                break;
        }*/

    }

    componentWillMount() {
        //   this.serverRequest.abort();

    }



    tcount(e) {

        //   this.hightchart(this.state.biz,0,this.state.ds,0,0) //根据点击的类型查询信息并绘制图表

        const tip = '今日'
        this.hightchart(0, 0, 0, 0, 0, tip)
        p.tip1 = '较前日 ';
        p.tip2 = '前一天 ';

        this.setState({
            title:tip,
            is:0
        })
        //判断今天是周几
   /*     const a = new Array(7, 5, 4, 3, 2, 1, 6);
        const week = new Date().getDay();
        const d=a[week];
        for (let i=0;i<d;i++){
            p.shuju3+=parseInt(this.state.shujulist[i].value)
        }
        for (let i=d;i<d+7;i++){
            p.shuju4+=parseInt(this.state.shujulist[i].value)
        }*/
        p.shuju1=this.state.shujulist[0].percent+'%';
        p.shuju2=this.state.shujulist[0].value;

    }

    yesterDay(e) {
        const tip = '昨日'
        this.hightchart(0, 1, 0, 0, 0, tip)
        p.tip1 = '较前日 ';
        p.tip2 = '前一天 ';
        p.tip3 = '较上周同比 ';
        p.tip4 = '上周同比 ';

        this.setState({
            title:tip,
            is:1
        })
        p.shuju1=this.state.shujulist[0].percent+'%';
        p.shuju2=this.state.shujulist[0].value;
    }

    qiantTian(e) {
        const tip = '前日'
        this.hightchart(0, 2, 0, 0, 0, tip)
        p.tip1 = '较前日 ';
        p.tip2 = '前一天 ';
        p.tip3 = '较上周同比 ';
        p.tip4 = '上周同比 ';

        this.setState({
            title:tip,
            is:2
        })
        p.shuju1=this.state.shujulist[0].percent+'%';
        p.shuju2=this.state.shujulist[0].value;
    }

    Week(e) {
        const tip = '本周'
        this.hightchart(0, 3, 0, 0, 0, tip)
        p.tip1 = '较四周前同比 ';
        p.tip2 = '四周前同比 ';
        p.tip3 = '较上周同比 ';
        p.tip4 = '上周同比 ';

        this.setState({
            title:tip,
            is:3
        })
        p.shuju1=this.state.shujulist[0].percent+'%';
        p.shuju2=this.state.shujulist[0].value;
    }

    Months(e) {
        const tip = '本月'
        this.hightchart(0, 4, 0, 0, 0, tip)
        p.tip1 = '较上月同比 ';
        p.tip2 = '上月同比 ';
        p.tip3 = '较去年同比 ';
        p.tip4 = '去年同比 ';


        this.setState({
            title:tip,
            is:4
        })
        p.shuju1=parseInt(this.state.shujulist[0].percent)-parseInt(this.state.shujulist[1].value)+'%';
        p.shuju2=this.state.shujulist[1].value
    }



    render() {

        return (

            <div>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>{this.state.title}</title>
                </Helmet>
                <div className='title'>
                    <div className={this.state.is==0?'title-flex active':'title-flex'} onClick={this.tcount.bind(this,0)} data-d="0" data-t="今日">今日</div>
                    <div className={this.state.is==1?'title-flex active':'title-flex'} onClick={this.yesterDay.bind(this,1)} data-d="1" data-t="昨日">昨日</div>
                    <div className={this.state.is==2?'title-flex active':'title-flex'} onClick={this.qiantTian.bind(this,2)} data-d="2" data-t="前日">前日</div>
                    <div className={this.state.is==3?'title-flex active':'title-flex'} onClick={this.Week.bind(this,3)} data-d="3" data-t="周">本周</div>
                    <div className={this.state.is==4?'title-flex active':'title-flex'} onClick={this.Months.bind(this,4)} data-d="4" data-t="月">本月</div>

                </div>
                {this.state.shujulist == '' ? '' : (
                    <div>
                <div className='tip'>

                    <div className='centertip'>{this.state.shujulist[0].value}</div>
                </div>
                <div className='bottomtip'>
                    <div className='bottomtip-flex'><p>{p.tip1 + p.shuju1.toString()}</p></div>
                    <div className='bottomtip-flex'><p>{p.tip2 + p.shuju2}</p></div>
                </div>
                <div className='chartstitle'>趋势图</div>

                <div id="container" className='charts'></div>
                <div className='chartstitle'>详细数据</div>
                <div className='xiangxitip1'>
                    <div className='xiangxitip-flex1'>时段</div>
                    <div className='xiangxitip-flex1'>销量</div>
                    <div className='xiangxitip-flex1'>较前日</div>
                    {this.state.shujulist.map((list) =>
                        <div className='xiangxitip' key={list.item}>
                            <div className='xiangxitip-flex'>
                                {list.item}
                            </div>
                            <div className='xiangxitip-flex'>
                                {list.value}
                            </div>
                            <div className='xiangxitip-flex'>
                                {list.percent}%
                            </div>
                        </div>)}
                </div></div>)}

            </div>
        )
    }


}

export default Shuju;