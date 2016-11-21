/**
 * Created by zhang on 16/11/8. 找回密码
 * 第一步:填写手机号
 */
'use strict';
import React, {Component} from 'react';
import {
    HFPage,
    HFTextInput,
    HFHugeButton,
    HFText,
    HFView,
    HFImage,
    HFAlert,
    HFTextButton,
    HFMediumButton,
    HFImageButton,
    HFKeyboardSpacer,
    StyleSheet,
    Platform,
    View,
} from '../../../HFFramework/Framework';
import Config from '../../Common/Config'
import Service from '../../Common/Service';
import RenderIf from '../../../HFFramework/Utility/RenderIf';
import Navigator from '../../../HFFramework/Utility/Navigator';
import Api from '../../../HFFramework/Utility/Api';
import Toast from '@remobile/react-native-toast';
import Dialog from '../../../HFFramework/Utility/Dialog';

import GetPassWord2 from './GetPassword2'

export default class GetPassword1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            hugeButtonDisable: true,
            username: null,
        };
    }

    handlerChangeUsername(username) {
        let pattern = new RegExp('^[1]{1}[3,4,5,7,8]{1}[0-9]{9}$');
        if (username && username.length == 11 && pattern.test(username)) {
            this.setState({
                hugeButtonDisable: false
            });
        } else {
            this.setState({
                hugeButtonDisable: true
            });
        }
    }

    handlerSubmit() {
        this.setState({
            isLoading: false,
            hugeButtonDisable: true
        });
        let param = {
            action: 'forgetpassword',
            username: this.refs.inputUsername.getValue(),
        };
        Api.post(Service.verifyCode, param)
            .then(res => {
                this.setState({
                    hugeButtonDisable: false,
                });
                if (res) {
                    try {
                        if (res['status'] == 1) {
                            Navigator.push({
                                component: GetPassWord2,
                                passProps: {
                                    username: this.refs.inputUsername.getValue(),
                                },
                            }, this.props.navigator)
                        } else {
                            Toast.showShortCenter(res['message'])
                        }
                    } catch (e) {
                        Toast.showShortCenter('验证码校验失败')
                    }
                } else {
                    Toast.showShortCenter('请求验证码失败')
                }
            }).catch(e => {
            this.setState({
                hugeButtonDisable: false,
            });
            Toast.showShortCenter('网络错误')

        })
    }

    render() {
        return (
            <HFPage
                style={styles.mainContainer}
                navigation={{navigator: this.props.navigator, title: '找回密码', flagLeft: true,}}
                innerView={
                    <View style={styles.innerContainer}>
                                <HFText
                                    style={{marginTop: 15, marginBottom: 20, marginLeft: 15,color: '#666'}}
                                    text={'输入你的登录手机号'}
                                />
                                <HFView
                                    style={styles.rowInput}
                                    innerView={
                                        <HFTextInput
                                            ref='inputUsername'
                                            style={styles.textInput}
                                            placeholder='请输入手机号'
                                            keyboardType="numeric"
                                            maxLength={11}
                                            flagImage={true}
                                            imageSource={require('../../Image/Login/shouji.png')}
                                            imageStyle={{width: 25, height: 25}}
                                            onChangeText={this.handlerChangeUsername.bind(this)}
                                        />
                                    }
                                />
                                <HFHugeButton
                                    onPress={this.handlerSubmit.bind(this)}
                                    disabled={this.state.hugeButtonDisable}
                                    text='获取验证码'
                                />
                            </View>
                }
            />
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        flexDirection: 'column'
    },
    rowInput: {
        flex: 1,
        height: 50,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e4e4e4',
        borderRadius: 5
    },
    textInput: {
        height: 48,
        borderRadius: 5
    },
    captcha: {
        height: 50,
        marginTop: 0,
        marginRight: 15,
        width: 80,
        borderWidth: 1,
        borderColor: '#e4e4e4',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

module.exports = GetPassword1;
