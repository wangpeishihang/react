import {Toast} from "antd-mobile";
import $ from "jquery";

Toast.loading('Loading...', 0, () => {
    console.log('Load complete !!!');
});
this.serverRequest = $.ajax('https://nightly-dev.99tone.com/mapi/data/inventory/queryInventoryTotalInfo', {
    type: 'post',
    headers: {Authorization: 'Bearer ' + global.data.token, 'Content-Type': 'application/json'},
    dataType: "json",

    success(res) {
        Toast.hide()

       return res.rows

    }
})