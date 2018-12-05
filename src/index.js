import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route} from "react-router-dom";

import './index.css';
import App from './App';
import Home from './index/home';
import Shuju from './index/shuju';
import Fankui from './index/fankui';
import Shoukuan from './shoukuanfast/shoukuan';
import myShoukuan from './myshoukuan/myshoukuan';
import Jiaoyigenzong from './jiaoyigenzong/jiaoyigenzong';
import Chuanhao from './chuanhao/chuanhao';
import Kucunchaxun from './kucunchaxun/kucunchaxun';
import Kucunfenbu from "./kucunfenbu/kucunfenbu";
import * as serviceWorker from './serviceWorker';
import Wodesq from './wodesq/wodesq';
import Wodesp from './wodesp/wodesp';
import Csgw from './csgw/csgw';
import Jbsq from './jbsq/jbsq';
import Xjyz from './xjyz/xjyz';
import Gclc from './gclc/gclc';
import Yg from './yg/yg';
import xyGrz from './xygrz/xygrz';
import xSd from './xsd/xsd';
import Xq from './xiangqing/xiangqing'
import kcXq from './kucunchaxun/kucunxiangqing'
import shopList from './kucunchaxun/shopList';
import sqlc from './wodesq/shenqingliucheng'

ReactDOM.render(

        <Router >
            <div className='all'>
                <Route exact path='/' component={App}/>
                <Route   path='/home' component={Home}/>
                <Route   path='/shuju' component={Shuju}/>
                <Route   path='/fankui' component={Fankui}/>
                <Route   path='/shoukuan' component={Shoukuan}/>
                <Route   path='/myshoukuan' component={myShoukuan}/>
                <Route   path='/jiaoyigenzong' component={Jiaoyigenzong}/>
                <Route   path='/chuanhao' component={Chuanhao}/>
                <Route   path='/kucunchaxun' component={Kucunchaxun}/>
                <Route   path='/kucunfenbu' component={Kucunfenbu}/>
                <Route   path='/wodesq' component={Wodesq}/>
                <Route   path='/wodesp' component={Wodesp}/>
                <Route   path='/csgw' component={Csgw}/>
                <Route   path='/jbsq' component={Jbsq}/>
                <Route   path='/xjyz' component={Xjyz}/>
                <Route   path='/gclc' component={Gclc}/>
                <Route   path='/yg' component={Yg}/>
                <Route   path='/xygrz' component={xyGrz}/>
                <Route   path='/xsd' component={xSd}/>
                <Route   path='/xq' component={Xq}/>
                <Route   path='/kcxq' component={kcXq}/>
                <Route   path='/shoplist' component={shopList}/>
                <Route   path='/sqlc' component={sqlc}/>




            </div>

        </Router>


   , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
