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
    HFDialog,
    HFPicker,
    HFTimePicker,
    HFText,
    View,
    HFImage,
    ScrollView,
    DeviceEventEmitter,
    Dimensions,
    StyleSheet} from './../Framework';

var { width, height } = Dimensions.get('window');
import Toast from '@remobile/react-native-toast';

import Constants from './../../Application/Common/Constants';
import RenderIf from './../Utility/RenderIf';
import Handler from './../Utility/Handler';
import Dialog from './../Utility/Dialog';
import Navigator from './../Utility/Navigator';
import UUIDGenerator from 'react-native-uuid-generator';

import Login from './../../Application/Component/Login/Login';

class HFPage extends Component {

    static defaultProps = {
        flagNoScroll: false,
        flagNoNavigation: false,
        flagHeader: false,
        flagFooter: false,
        flagSpinner: false,
        navigation: {},
    };

    static propTypes = {
        flagNoScroll: React.PropTypes.bool,
        flagNoNavigation: React.PropTypes.bool,
        flagHeader: React.PropTypes.bool,
        flagFooter: React.PropTypes.bool,
        navigation: React.PropTypes.object,
        flagSpinner: React.PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            pageId: null,
            navigator: this.props.navigation['navigator'],
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
            confirmCancelCallback: null,
            // dialog
            dialogVisible: false,
            dialogTitle: '提示',
            dialogButtonText : '我知道了',
            dialogCallback: null,
            // picker
            pickerVisible: false,
            pickerKey: null,
            pickerTitle: '请选择',
            pickerDatas: null,
            pickerValue: null,
            pickerCallback: null,
        };
    }

    componentWillMount() {
        let self = this;
        // 页面标识
        UUIDGenerator.getRandomUUID().then((uuid) => {
            if (self.refs.pageView) {
                self.setState({
                    pageId: uuid,
                });
                Handler.save(Constants.storageKeyPageId, uuid);
            }
        });
        // 监听器
        this.hfPageListener = DeviceEventEmitter.addListener('HFPage', function (type, value) {
            // 如果当前页面是活动的,则就在当前页面显示弹出层
            Handler.load(Constants.storageKeyPageId)
                .then(data=> {
                    if (self.refs.pageView && data == self.state.pageId) {
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
                                confirmCancelCallback: value['cancelCallback'],
                            });
                        } else if (type == 'HFConfirmCancel') {
                            self.setState({
                                confirmVisible: false,
                            });
                        } else if (type == 'HFDialog') {
                            self.setState({
                                dialogVisible: true,
                                dialogTitle: value['title'] || '提示',
                                dialogButtonText: value['buttonText'] || '确定',
                                dialogCallback: value['callback'],
                            });
                        } else if (type == 'HFDialogCancel') {
                            self.setState({
                                dialogVisible: false,
                            });
                        } else if (type == 'HFPicker') {
                            if (value['key'] != null && value['datas'] != null && value['datas'].length > 0) {
                                self.setState({
                                    pickerVisible: true,
                                    pickerKey: value['key'],
                                    pickerTitle: value['title'] || '请选择',
                                    pickerDatas: value['datas'],
                                    pickerValue: value['value'],
                                    pickerCallback: value['callback'],
                                });
                            }
                        } else if (type == 'HFPickerCancel') {
                            self.setState({
                                pickerVisible: false,
                            });
                        } else if (type == 'UserFilter') {// 拦截器
                            switch (value) {
                                case 'toLogin':
                                    Toast.showShortCenter('请您登录后再使用');
                                    Navigator.resetTo({component: Login}, self.props.navigator);
                                    break;
                            }
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
        let spinner = null;
        if (this.props.flagSpinner != null && this.props.flagSpinner == true) {
            spinner = <View style={styles.loadingView}>
                <HFImage
                    source={require('../Image/loading3.gif')}
                    style={{width:100,height:100}}
                />
            </View>
        }
        return (
            <View
                ref="pageView"
                style={[styles.outerView, this.props.style]}
                onLayout={()=>{
                    Handler.save(Constants.storageKeyPageId, this.state.pageId);
                    Constants.navigator = this.props.navigation['navigator'];
                }}
            >
                {/** 导航(常驻页面顶部) **/}
                {RenderIf(!this.props.flagNoNavigation)(
                    <HFNavigation
                        navigator={this.props.navigation['navigator']}
                        leftViewStyle={this.props.navigation['leftViewStyle']}
                        rightViewStyle={this.props.navigation['rightViewStyle']}
                        leftView={this.props.navigation['leftView']}
                        rightView={this.props.navigation['rightView']}
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
                    innerView={this.props.flagSpinner != null && this.props.flagSpinner == true ? spinner : this.props.innerView}
                    flagNoScroll={this.props.flagNoScroll}
                    onRefresh={this.props.onRefresh}
                    refreshing={this.props.refreshing}
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
                    cancelCallback={this.state.confirmCancelCallback}
                />
                {/** 弹出层 **/}
                <HFDialog
                    visible={this.state.dialogVisible}
                    title={this.state.dialogTitle}
                    buttonText={this.state.dialogButtonText}
                    callback={this.state.dialogCallback}
                    innerView={this.props.dialogInnerView}
                />
                {/** 选择器 **/}
                <HFPicker
                    visible={this.state.pickerVisible}
                    key={this.state.pickerKey}
                    title={this.state.pickerTitle}
                    datas={this.state.pickerDatas}
                    value={this.state.pickerValue}
                    callback={this.state.pickerCallback}
                />
                {/** 键盘(只有在键盘弹出时才显示) **/}
                <HFKeyboardSpacer
                    onToggle={(flagVisible, height)=>{
                        DeviceEventEmitter.emit('HFTabBar', 'HFKeyboardSpacer', !flagVisible);
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: HFConfiguration.pageBackground,
    },
    loadingView: {
        flex: 1,
        width: width,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

module.exports = HFPage;