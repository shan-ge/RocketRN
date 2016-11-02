/**
 * Created by shange on 2016/10/27. 网页视图
 */

'use strict';
import React, {Component} from 'react';
import {HFBaseStyle, HFConfiguration, View, WebView, StyleSheet} from './../Framework';

class HFWebView extends Component {

    static defaultProps = {};

    static propTypes = {
        uri: React.PropTypes.string,// 链接
        content: React.PropTypes.string,// 内容
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View ref={this.props.ref||'webView'} style={[styles.outerView,this.props.style]}>
                <WebView
                    style={styles.outerView}
                    source={this.props.uri?{uri: this.props.uri}:{html: this.props.content}}
                    automaticallyAdjustContentInsets={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerView: {
        flex: 1,
        alignSelf: 'stretch',
    },
});

module.exports = HFWebView;