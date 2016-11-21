/**
 * Created by shange on 2016/10/21.
 * 后发App框架示例
 */
import React, {Component} from 'react';
import {HFPage, HFText, HFWebView, HFHugeButton, HFConfiguration, View, StyleSheet} from './../Framework';

import Configuration from './../Configuration';

class DemoWebView extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <HFPage
                flagNoScroll={true}
                navigation={{navigator:this.props.navigator,title:'网页视图',flagLeft:true,flagRight:true,rightText:'刷新',onRightButtonPress:function(){alert('刷新网页');}}}
                innerView={
                    <HFWebView uri='http://static.hf.com/'/>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
});

module.exports = DemoWebView;