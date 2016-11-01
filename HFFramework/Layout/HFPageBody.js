/**
 * Created by shange on 2016/10/24. 文本
 */

'use strict';
import React, {Component} from 'react';
import {HFBaseStyle, HFConfiguration, View, ScrollView, RefreshControl, DeviceEventEmitter, StyleSheet} from './../Framework';

import RenderIf from './../Utility/RenderIf';

class HFPageBody extends Component {

    static defaultProps = {
        ref: 'hfPageBody',
        flagNoScroll: false,
        pagePaddingBottom: 0,
    };

    static propTypes = {
        flagNoScroll: React.PropTypes.bool,
        pagePaddingBottom: React.PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    componentWillMount() {
        var self = this;
        this.hfPageBodyListener = DeviceEventEmitter.addListener('HFPageBody', function (type, value) {
            if (type == 'HFTextInputScroll') {// 接收HFTextInputScroll的监听,当焦点聚焦到输入框时,将输入框滚动到指定的高度
                // 当前页面是可以滚动的
                if ((self.props.flagNoScroll == null || !self.props.flagNoScroll) && self.refs[self.props.ref]) {
                    self.refs[self.props.ref].scrollTo({
                        x: 0,
                        y: value,
                        animated: true
                    });
                }
            }
        })
    }

    componentWillUnmount() {
        if (this.hfPageBodyListener != null) {
            this.hfPageBodyListener.remove();
        }
    }

    onRefresh() {
        this.setState({refreshing: true});
        this.refreshFetchData().then(() => {
            this.setState({refreshing: false});
        });
    }

    refreshFetchData() {
        let self = this;
        return new Promise(function (resolve, reject) {
            if (self.props.onRefresh) {
                self.props.onRefresh();
            }
            resolve();
        });
    }

    render() {
        if (this.props.flagNoScroll) {// 适用于内部带有刷新组件的页面.如GiftedListView,ScrollView.(此时不设置HFBaseStyle.page)
            return (
                <View ref={this.props.ref} style={[styles.bodyView]}>
                    <View style={[styles.bodyView,this.props.style]}>
                        {this.props.innerView}
                    </View>
                    {/** 页脚 **/}
                    {RenderIf(this.props.flagFooter)(
                        <View style={[styles.footer,this.props.footerStyle]}>
                            {this.props.footerView}
                        </View>
                    )}
                </View>
            );
        } else {
            return (// 适用于外部刷新的页面
                <ScrollView ref={this.props.ref}
                            showsVerticalScrollIndicator={false}
                            style={[styles.bodyView]}
                            keyboardDismissMode="none"
                            keyboardShouldPersistTaps={true}
                            refreshControl={
                            this.props.onRefresh != undefined && this.props.onRefresh != null
                            ?
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh.bind(this)}
                                title="重新加载"
                                titleColor={HFConfiguration.mainColor}
                                tintColor={HFConfiguration.mainColor}
                                colors={[HFConfiguration.mainColor]}
                            />
                            :
                            null
                        }
                >
                    <View style={[styles.bodyView,HFBaseStyle.page,this.props.style]}>
                        {this.props.innerView}
                    </View>
                    {/** 页脚 **/}
                    {RenderIf(this.props.flagFooter)(
                        <View style={[styles.footer,this.props.footerStyle]}>
                            {this.props.footerView}
                        </View>
                    )}
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    bodyView: {
        flex: 1,
        alignSelf: 'stretch',
    },
    footer: {},
});

module.exports = HFPageBody;