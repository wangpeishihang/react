import React from 'react';
import $ from 'jquery'
import {Select} from "antd";

class wodesp extends React.Component{

    constructor(props){
        super(props)
        this.state={
            bg:0
        };
    }
    handleChange(){

    }
    handleChange1(){

    }
    render() {
        const Option = Select.Option;
        return(
            <div>
                <div className="weui-search-bar" id="searchBar">
                    <form className="weui-search-bar__form">
                        <div className="weui-search-bar__box">
                            <i className="weui-icon-search"></i>
                            <input type="search" className="weui-search-bar__input" id="searchInput" placeholder="请输入关键字"/>
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

                        <Select  defaultValue='状态'
                                 onChange={this.handleChange1.bind(this)}>

                            <Option  value='审批中'>审批中</Option>
                            <Option  value='审批中'>同意</Option>
                            <Option  value='审批中'>拒绝</Option>
                            <Option  value='审批中'>撤销</Option>


                        </Select>

                    </div>
                    <div className='selectdiv'>

                        <Select  defaultValue='流程'
                                 onChange={this.handleChange.bind(this)}>

                            <Option  value='审批中'>测试</Option>
                            <Option  value='审批中'>高级分类</Option>
                            <Option  value='审批中'>基础分类</Option>
                            <Option  value='审批中'>默认分类</Option>


                        </Select>

                    </div>
                </div>
            </div>
        )

    }
}
export default wodesp;