/**
 * Created by zhang on 16/11/4.完善信息
 */
import React, {Component} from 'react';
import {
    HFPage,
    HFTextInput,
    HFHugeButton,
    HFView,
    HFImage,
    HFTextButton,
    HFImageButton,
    StyleSheet,
    Platform,
    View
} from '../../../HFFramework/Framework';
import Constants from '../../Common/Constants'
import Handler from '../../../HFFramework/Utility/Handler';
import Service from '../../Common/Service';
import Api from '../../../HFFramework/Utility/Api';
import Navigator from '../../../HFFramework/Utility/Navigator';
import Toast from '@remobile/react-native-toast';
import PerfectInfo from '../Perfect/PerfectInfo'
import Register from './Register'
import GetPassWord1 from './GetPassword1'
import Dialog from '../../../HFFramework/Utility/Dialog';
import Home from '../../Component/Home/Home'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hugeButtonDisable: true,
            isLoading: false,
            message: '',
            username: '',
            password: '',
            pattern: new RegExp('^[1]{1}[3,4,5,7,8]{1}[0-9]{9}$'),
            imageSource: require('../../Image/Login/biyan.png'),
            imageFlag: true,
            secureTextEntry: true
        };
    }

    componentWillMount() {
        Handler.removeAll();
        Handler.save(Constants.storageKeyIsLogin, false);
        Handler.save(Constants.storageKeyIsPerfectInfo, false);
        Handler.save(Constants.storageKeyIsCertification, false);
        Handler.save(Constants.storageKeyIsCertifying, false);
    }

    canSubmit(username, password) {
        let hugeButtonDisable = true;
        if (username != null && password != null && username.length == 11 && this.state.pattern.test(username) && password.length > 5) {
            hugeButtonDisable = false;
        } else {
            hugeButtonDisable = true;
        }
        this.setState({
            hugeButtonDisable: hugeButtonDisable
        });
    }

    _onEndEditing(e) {
        if (!this.state.pattern.test(e.nativeEvent.text.trim())) {
            Toast.showShortCenter('手机号码格式错误');
        }
    }

    handlerChange(type, value) {
        let username = this.refs.inputUsername.getValue() ? this.refs.inputUsername.getValue() : ''
        let password = this.refs.inputPassword.getValue() ? this.refs.inputPassword.getValue() : ''
        switch (type) {
            case 'password':
                password = value;
                break;
            case 'username':
                username = value;
                break;
        }
        this.canSubmit(username, password);
    }

    toRegister() {
        Navigator.push({
            component: Register
        }, this.props.navigator)
    }

    toGetPassword() {
        Navigator.push({
            component: GetPassWord1
        }, this.props.navigator)
    }

    onImagePress() {
        if (this.state.imageFlag) {
            this.setState({
                imageSource: require('../../Image/Login/zhengyan.png'),
                imageFlag: false,
                secureTextEntry: false
            })
        } else {
            this.setState({
                imageSource: require('../../Image/Login/biyan.png'),
                imageFlag: true,
                secureTextEntry: true
            })
        }
    }

    handlerSubmit() {
        if (!this.state.pattern.test(this.refs.inputUsername.getValue())) {
            Toast.showShortCenter('手机号码格式错误');
            return false;
        }
        // this.refs.inputUsername.blur();
        this.setState({
            hugeButtonDisable: true,
            isLoading: true
        });
        let param = {
            action: 'login',
            username: this.refs.inputUsername.getValue(),
            password: this.refs.inputPassword.getValue()
        };
        var self = this;
        Api.get(Service.login, param, false)
            .then(res => {
                if (!res) {
                    self.setState({
                        isLoading: false,
                        hugeButtonDisable: false,
                    });
                    return false;
                }
                self.setState({
                    isLoading: false
                })
                if (res.status === 1) {
                    param.userId = res.userId;
                    param.doctorId = res.doctorId;
                    param.token = res.token;
                    param.data = res.data;
                    Service.userId = res.userId;
                    Service.doctorId = res.doctorId;
                    Service.token = res.token;
                    Handler.save(Constants.storageKeyUserToken, param);
                    Handler.save(Constants.storageKeyIsLogin, true);
                    Handler.save(Constants.storageKeyIsPerfectInfo, !(res['needImprove'] && res['needImprove'] == true));
                    Handler.save(Constants.storageKeyIsCertification, res['drStatus'] != null && res['drStatus'] == 2);
                    Handler.save(Constants.storageKeyIsCertifying, res['drStatus'] != null && res['drStatus'] == 3);
                    self.setState({
                        hugeButtonDisable: true,
                    });
                    if (res['needImprove'] && res['needImprove'] == true) {
                        Dialog.alert('您的信息未完善', null, null, function () {
                            Navigator.resetTo({
                                component: PerfectInfo,
                                passProps: {
                                    userInfo: res
                                }
                            }, self.props.navigator);
                        });
                    } else {
                        Navigator.resetTo({
                            component: Home,
                            passProps: {
                                navigator: self.props.navigator,
                                userInfo: res
                            }
                        }, self.props.navigator);
                    }
                } else {
                    Toast.showShortCenter(res.message);
                    self.setState({
                        hugeButtonDisable: false,
                    });
                }
            })
    }

    render() {
        return (
            <HFPage
                navigation={{navigator: this.props.navigator, title: '登录', flagLeft: false,}}
                innerView={
                    <View style={{flex: 1}}>
                        <HFView
                            style={styles.avatar}
                            innerView={
                                <HFImage
                                    ratioWidth={300}
                                    source={require('../../Image/logo11.png')}
                                />
                            }
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
                                    onChangeText={this.handlerChange.bind(this, 'username')}
                                    onEndEditing={this._onEndEditing.bind(this)}
                                />
                            }
                        />

                        <HFView
                            style={styles.rowInput}
                            innerView={
                                <View style={{flexDirection: 'row', backgroundColor: '#fff', borderRadius: 5}}>
                                    <HFTextInput
                                        ref='inputPassword'
                                        style={styles.textInput}
                                        placeholder='请输入六位以上密码'
                                        maxLength={18}
                                        flagImage={true}
                                        imageSource={require('../../Image/Login/mima.png')}
                                        imageStyle={{width: 25, height: 25}}
                                        secureTextEntry={this.state.secureTextEntry}
                                        onChangeText={this.handlerChange.bind(this, 'password')}
                                    />
                                    <HFImageButton
                                        style={styles.imageButton}
                                        source={this.state.imageSource}
                                        onPress={this.onImagePress.bind(this)}
                                    />
                                </View>
                            }
                        />

                        <HFHugeButton
                            text="登录"
                            disabled={this.state.hugeButtonDisable}
                            onPress={this.handlerSubmit.bind(this)}
                            style={{marginTop: 20}}
                        />
                        <HFView
                            innerView={
                                <View style={styles.remark}>
                                    <HFTextButton textStyle={{color: '#999'}} text="立即注册"
                                                  onPress={this.toRegister.bind(this)}/>
                                    <HFTextButton textStyle={{color: '#999'}} text="忘记密码？"
                                                  onPress={this.toGetPassword.bind(this)}/>
                                </View>
                            }
                        />
                    </View>
                }
            />
        )
    }
}
const styles = StyleSheet.create({
    avatar: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 40,
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
    imageButton: {
        marginTop: 0,
        height: 48,
        width: 40,
        backgroundColor: '#fff',
        borderWidth: 0
    },
    remark: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15
    }
})
