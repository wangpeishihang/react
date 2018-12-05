import React from 'react';
import $ from "jquery";
import {Toast} from "antd-mobile";
import {  Link} from "react-router-dom";
import '../config';
import { List ,WhiteSpace} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;


class sqlc extends React.Component{
    constructor(props){
        super(props)
        this.state={
            flows:[],
            flows1:[]
        }
    }


    componentDidMount() {
        let that = this;
        Toast.loading('Loading...', 0, () => {
            console.log('Load complete !!!');
        });
        this.serverRequest = $.ajax('https://nightly-dev.99tone.com/mapi/data/approve/categoriesWithFlows', {
            type: 'get',
            headers: {Authorization: 'Bearer ' + global.data.token},
            data: {status: that.state.ds, categories: that.state.cg},
            success(res) {
                Toast.hide()
                that.setState({
                    flows: res.categoriesWithFlows[0],
                    flows1: res.categoriesWithFlows[1]
                })

            }
        })
    }

    componentWillUnmount() {
        this.serverRequest.abort()
    }
    nextPage(e){
        switch (e) {
            case 6:
                this.props.history.push({pathname:'/xjyz'})
                break;
            case 7:
                this.props.history.push({pathname:'/jbsq',state:{flowid:7}})
                break;
            case 2:
                this.props.history.push({pathname:'/jbsq'})
                break;
            case 3:
                this.props.history.push({pathname:'/xygrz'})
                break;
            case 4:
                this.props.history.push({pathname:'/yg'})
                break;
            case 5:
                this.props.history.push({pathname:'/gclc'})
                break;

        }
    }
    render() {
        return (
            <div>
                {this.state.flows.length==0?'1':(


            <List renderHeader={() => this.state.flows.name} className="my-list">
                {this.state.flows.flows.map((flows)=>(
                    <Item
                        align="middle"
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                        key={flows.id}
                        onClick={this.nextPage.bind(this,flows.id)}
                    >
                        {flows.name}
                    </Item>
                ))}

            </List>

                )}
                <WhiteSpace/>
                {this.state.flows1.length==0?'1':(


                    <List renderHeader={() => this.state.flows1.name} className="my-list">
                        {this.state.flows1.flows.map((flows)=>(

                            <Item
                                align="middle"
                                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                                multipleLine
                                key={flows.id}
                                onClick={this.nextPage.bind(this,flows.id)}
                            >
                                {flows.name}
                            </Item>

                        ))}

                    </List>

                )}

            </div>
        );
    }
}
export default sqlc;