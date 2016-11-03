/**
 * Created by shange on 2016/10/24. 页面视图
 *
 * flagHeader       :   {true|false}    是否需要页眉
 * flagFooter       :   {true|false}    是否需要页脚
 * flagNoNavigation :   {true|false}    是否不需要导航
 * flagLogin        :   {true|false}    是否需要登录
 * flagNoScroll     :   {true|false}    是否不需要滚动
 * innerView        :   {<View/>}       内容视图
 */

'use strict';
import React, {Component} from 'react';
import {HFNavigation,
    HFPageHeader,
    HFPageFooter,
    HFPageBody,
    HFBaseStyle,
    HFConfiguration,
    HFKeyboardSpacer,
    HFAlert,
    HFConfirm,
    HFText,
    View,
    ScrollView,
    DeviceEventEmitter,
    StyleSheet} from './../Framework';

import Constants from './../Utility/Constants';
import RenderIf from './../Utility/RenderIf';
import Handler from './../Utility/Handler';
import UUIDGenerator from 'react-native-uuid-generator';

class HFPage extends Component {

    static defaultProps = {
        flagNoScroll: false,
        flagNoNavigation: false,
        flagHeader: false,
        flagFooter: false,
        navigation: {},
    };

    static propTypes = {
        flagNoScroll: React.PropTypes.bool,
        flagNoNavigation: React.PropTypes.bool,
        flagHeader: React.PropTypes.bool,
        flagFooter: React.PropTypes.bool,
        navigation: React.PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            pageId: null,
            // alert
            alertVisible: false,
            alertTitle: '提示',
            alertText: '提醒内容',
            alertButtonText: '我知道了',
            alertCallback: null,
            // confirm
            confirmVisible: false,
            confirmTitle: '提示',
            confirmText: '提醒内容',
            confirmButtonText: '确认',
            confirmCancelText: '取消',
            confirmCallback: null,
        };
    }

    componentWillMount() {
        let self = this;
        // 页面标识
        UUIDGenerator.getRandomUUID().then((uuid) => {
            self.setState({
                pageId: uuid,
            });
            Handler.save(Constants.storageKeyPageId, uuid);
        });
        // 监听器
        this.hfPageListener = DeviceEventEmitter.addListener('HFPage', function (type, value) {
            // 如果当前页面是活动的,则就在当前页面显示弹出层
            Handler.load(Constants.storageKeyPageId)
                .then(data=> {
                    if (data == self.state.pageId) {
                        if (type == 'HFAlert') {
                            self.setState({
                                alertVisible: true,
                                alertTitle: value['title'] || '提示',
                                alertText: value['text'] || '提醒内容',
                                alertButtonText: value['buttonText'] || '我知道了',
                                alertCallback: value['callback'],
                            });
                        } else if (type == 'HFAlertCancel') {
                            self.setState({
                                alertVisible: false,
                            });
                        } else if (type == 'HFConfirm') {
                            self.setState({
                                confirmVisible: true,
                                confirmTitle: value['title'] || '提示',
                                confirmText: value['text'] || '提醒内容',
                                confirmButtonText: value['buttonText'] || '确定',
                                confirmCancelText: value['cancelText'] || '取消',
                                confirmCallback: value['callback'],
                            });
                        } else if (type == 'HFConfirmCancel') {
                            self.setState({
                                confirmVisible: false,
                            });
                        }
                    }
                });
        })
    }

    componentWillUnMount() {
        if (this.hfPageListener) {
            this.hfPageListener.remove();
        }
    }

    render() {
        return (
            <View
                ref={this.props.ref}
                style={[styles.outerView, this.props.style]}
                onLayout={()=>{
                    Handler.save(Constants.storageKeyPageId, this.state.pageId);
                }}
            >
                {/** 导航(常驻页面顶部) **/}
                {RenderIf(!this.props.flagNoNavigation)(
                    <HFNavigation
                        navigator={this.props.navigation['navigator']}
                        title={this.props.navigation['title']}
                        flagLeft={this.props.navigation['flagLeft']}
                        leftText={this.props.navigation['leftText']}
                        onLeftButtonPress={this.props.navigation['onLeftButtonPress']}
                        leftDisabled={this.props.navigation['leftDisabled']}
                        flagRight={this.props.navigation['flagRight']}
                        rightText={this.props.navigation['rightText']}
                        rightImageSource={this.props.navigation['rightImageSource']}
                        onRightButtonPress={this.props.navigation['onRightButtonPress']}
                        rightDisabled={this.props.navigation['rightDisabled']}
                    />
                )}
                {/** 页眉(常驻页面上部) **/}
                {RenderIf(this.props.flagHeader)(
                    <HFPageHeader/>
                )}
                {/** 页面内容 **/}
                <HFPageBody
                    innerView={this.props.innerView}
                    flagNoScroll={this.props.flagNoScroll}
                    flagFooter={true}
                    footerView={
                        <HFText text='© 后发科技' style={{alignSelf:'center',lineHeight:30}}/>
                    }
                    onRefresh={this.props.onRefresh}
                    pagePaddingBottom={HFConfiguration.pageBodyPadding[HFConfiguration.dpiIndex][2]}
                />
                {/** 页脚(常驻页面底部) **/}
                {RenderIf(this.props.flagFooter)(
                    <HFPageFooter/>
                )}
                {/** 提示框 **/}
                <HFAlert
                    visible={this.state.alertVisible}
                    title={this.state.alertTitle}
                    text={this.state.alertText}
                    buttonText={this.state.alertButtonText}
                    callback={this.state.alertCallback}
                />
                {/** 确认提示框 **/}
                <HFConfirm
                    visible={this.state.confirmVisible}
                    title={this.state.confirmTitle}
                    text={this.state.confirmText}
                    buttonText={this.state.confirmButtonText}
                    cancelText={this.state.confirmCancelText}
                    callback={this.state.confirmCallback}
                />
                {/** 弹出层 **/}
                {/** 键盘(只有在键盘弹出时才显示) **/}
                <HFKeyboardSpacer/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: HFConfiguration.pageBackground,
    }
});

module.exports = HFPage;