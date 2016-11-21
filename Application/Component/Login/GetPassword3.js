/**
 * Created by zhang on 16/11/8. 找回密码
 * 第三步:填写新密码
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
import Api from '../../../HFFramework/Utility/Api';
import Toast from '@remobile/react-native-toast';
import Dialog from '../../../HFFramework/Utility/Dialog';
import Navigator from '../../../HFFramework/Utility/Navigator';

import Login from './Login';
export default class GetPassword3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            username: this.props.username,
            verifyCode: this.props.verifyCode,
            password: null,
            secureTextEntry: true,
            hugeButtonDisable: true,
            iconSource: require('../../Image/Login/biyan.png'),
        };
    }

    handlerTogglePassword(event) {
        if (this.state.iconSource == require('../../Image/Login/biyan.png')) {
            this.setState({
                iconSource: require('../../Image/Login/zhengyan.png'),
                secureTextEntry: false
            });
        } else {
            this.setState({
                iconSource: require('../../Image/Login/biyan.png'),
                secureTextEntry: true
            });
        }
    }

    handlerChangePassword(password) {
        if (password && password.length >= 6 && password.length <= 18) {
            this.setState({
                password: password,
                hugeButtonDisable: false
            });
        } else {
            this.setState({
                hugeButtonDisable: true
            });
        }
    }

    handlerGotoLogin() {
        Navigator.resetTo({component: Login}, this.props.navigator);
    }

    handlerSubmit() {
        this.setState({
            isLoading: true
        });
        let param = {
            username: this.state.username,
            verifyCode: this.state.verifyCode,
            password: this.refs.inputPassword.getValue()
        };
        Api.post(Service.updatePassword, param)
            .then(res => {
                let self = this
                console.log(res)
                this.setState({
                    hugeButtonDisable: false,
                });
                if (res) {
                    try {
                        if (res['status'] == 1) {
                            Dialog.alert('重置密码成功', null, null, function () {
                                self.handlerGotoLogin()
                            })
                        } else {
                            Toast.showShortCenter(res['message'])
                        }
                    } catch (e) {
                        Toast.showShortCenter('解析失败');
                    }
                } else {
                    Toast.showShortCenter('请求失败');
                }
            }).catch(e => {
            Toast.showShortCenter('网络错误');
            this.setState({
                hugeButtonDisable: false,
            });
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
                            text={'重置你的密码'}
                        />
                        <HFView
                            style={styles.rowInput}
                            innerView={
                                <View style={{flexDirection: 'row',backgroundColor: '#fff', borderRadius: 5}}>
                                    <HFTextInput
                                        ref='inputPassword'
                                        style={styles.textInput}
                                        placeholder='请输入六位以上密码'
                                        maxLength={18}
                                        flagImage={true}
                                        autoFocus={true}
                                        imageSource={require('../../Image/Login/mima.png')}
                                        imageStyle={{width: 25,height: 25}}
                                        secureTextEntry={this.state.secureTextEntry}
                                        onChangeText={this.handlerChangePassword.bind(this)}
                                    />
                                    <HFImageButton
                                        style={styles.imageButton}
                                        source={this.state.iconSource}
                                        onPress={this.handlerTogglePassword.bind(this)}
                                    />
                                </View>
                            }
                        />
                        <HFHugeButton
                            onPress={this.handlerSubmit.bind(this)}
                            disabled={this.state.hugeButtonDisable}
                            text='确定'
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
        borderRadius: 5
    },
    imageButton: {
        marginTop: 0,
        height: 48,
        width: 40,
        backgroundColor: '#fff',
        borderWidth: 0
    },
});

module.exports = GetPassword3;
