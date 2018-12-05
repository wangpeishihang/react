import React from 'react';



import '../config';



class Fankui extends React.Component {
    render() {

        return (
            <div><textarea className='fankui' placeholder='任何现有功能无法使用，用的不爽，功能建议等等都提过来吧'></textarea>
                <input className='lianxi' placeholder='请留下您的联系方式，以便我们更好的了解您的反馈'></input>
                <button className='weui-btn weui-btn_primary buttontop'>提交</button>
                

            </div>
        )
    }
    }

export default Fankui;