/**
 * Created by Zhang on 16/8/26.
 */
import React, {Component} from 'react';
import {
    HFPage,
    HFTextInput,
    HFMediumButton,
    HFHugeButton,
    HFImageButton,
    HFView,
    HFImage,
    StyleSheet,
    View,
    Text
} from '../../../HFFramework/Framework';
import Service from '../../Common/Service'
import Toast from '@remobile/react-native-toast';
import Handler from '../../../HFFramework/Utility/Handler';
import Api from '../../../HFFramework/Utility/Api';
import Navigator from '../../../HFFramework/Utility/Navigator';
export default class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            hugeButtonDisable: true,
            secureTextEntry1: true,
            secureTextEntry2: true,
            secureTextEntry3: true,
            iconSource1: require('../../Image/Login/biyan.png'),
            iconSource2: require('../../Image/Login/biyan.png'),
            iconSource3: require('../../Image/Login/biyan.png'),
        };
    }

    /**
     * 输入框变更事件
     * @param type
     * @param event
     * @private
     */
    _onChange(type, value) {
        let oldPassword = this.refs.oldPassword.getValue();
        let newPassword = this.refs.newPassword.getValue();
        let confirmPassword = this.refs.confirmPassword.getValue();
        switch (type) {
            case 'old':
                oldPassword = value;
                break;
            case 'new':
                newPassword = value;
                break;
            case 'confirm':
                confirmPassword = value;
                break;
        }
        if (oldPassword.length > 5
            && oldPassword.length < 19
            && newPassword.length > 5
            && newPassword.length < 19
            && newPassword === confirmPassword
            && newPassword !== oldPassword) {
            this.setState({
                hugeButtonDisable: false
            })
        }

    }

    handlerTogglePassword(type) {
        switch (type){
            case 'old':
                if (this.state.iconSource1 == require('../../Image/Login/biyan.png')) {
                    this.setState({
                        iconSource1: require('../../Image/Login/zhengyan.png'),
                        secureTextEntry1: false
                    });
                } else {
                    this.setState({
                        iconSource1: require('../../Image/Login/biyan.png'),
                        secureTextEntry1: true
                    });
                }
                break
            case 'new':
                if (this.state.iconSource2 == require('../../Image/Login/biyan.png')) {
                    this.setState({
                        iconSource2: require('../../Image/Login/zhengyan.png'),
                        secureTextEntry2: false
                    });
                } else {
                    this.setState({
                        iconSource2: require('../../Image/Login/biyan.png'),
                        secureTextEntry2: true
                    });
                }
                break
            case 'confirm':
                if (this.state.iconSource3 == require('../../Image/Login/biyan.png')) {
                    this.setState({
                        iconSource3: require('../../Image/Login/zhengyan.png'),
                        secureTextEntry3: false
                    });
                } else {
                    this.setState({
                        iconSource3: require('../../Image/Login/biyan.png'),
                        secureTextEntry3: true
                    });
                }
                break
        }
    }


    /**
     * 新密码输入框失去焦点事件
     * @param e
     * @returns {boolean}
     * @private
     */
    _onNewEndEditing(e) {
        if (this.refs.oldPassword.getValue() === e.nativeEvent.text) {
            Toast.showLongCenter('新旧密码一致');
            this.setState({
                hugeButtonDisable: true
            });
            return false;
        }
        if (this.refs.confirmPassword.getValue() != '' && this.refs.confirmPassword.getValue() == e.nativeEvent.text) {
            Toast.showLongCenter('两次密码不一致');
            this.setState({
                hugeButtonDisable: true
            });
        }
    }

    /**
     * 确认密码失去焦点事件
     * @param e
     * @private
     */
    _onConfirmEndEditing(e) {
        if (this.refs.newPassword.getValue() != e.nativeEvent.text) {
            Toast.showLongCenter('两次密码不一致');
            this.setState({
                hugeButtonDisable: true
            });
        }
    }

    /**
     * 提交
     * @private
     */
    _onPress() {
        if (!this.state.hugeButtonDisable) {
            let self = this;
            let param = {
                oldPassword: this.refs.oldPassword.getValue(),
                newPassword: this.refs.newPassword.getValue()
            }
            Api.post(Service.changePassword, param, false)
                .then(res=> {
                    Toast.showShortCenter(res.message);
                    if (res.status === 1) {
                        setTimeout(()=> {
                            Navigator.jumpBack(self.props.navigator);
                        }, 1000)
                    }
                })
        }
    }

    render() {
        return (
            <HFPage
                navigation={{navigator: this.props.navigator, title: '修改密码', flagLeft: true,}}
                innerView={
                    <View>
                        <HFView
                            style={[styles.rowInput, {marginTop: 50}]}
                            innerView={
                                <View style={{flexDirection: 'row', backgroundColor: '#fff', borderRadius: 5}}>
                                    <HFTextInput
                                        ref='oldPassword'
                                        style={styles.textInput}
                                        placeholder='原密码'
                                        maxLength={18}
                                        flagImage={true}
                                        imageSource={require('../../Image/Login/mima.png')}
                                        imageStyle={{width: 25, height: 25}}
                                        onChangeText={this._onChange.bind(this, 'old')}
                                        secureTextEntry={this.state.secureTextEntry1}
                                    />
                                    <HFImageButton
                                        style={styles.imageButton}
                                        source={this.state.iconSource1}
                                        onPress={this.handlerTogglePassword.bind(this,'old')}
                                    />
                                </View>


                            }
                        />

                        <HFView
                            style={styles.rowInput}
                            innerView={
                                <View style={{flexDirection: 'row', backgroundColor: '#fff', borderRadius: 5}}>
                                    <HFTextInput
                                        ref='newPassword'
                                        style={styles.textInput}
                                        placeholder='新密码'
                                        maxLength={18}
                                        flagImage={true}
                                        imageSource={require('../../Image/Login/mima.png')}
                                        imageStyle={{width: 25, height: 25}}
                                        onChangeText={this._onChange.bind(this, 'new')}
                                        onEndEditing={this._onNewEndEditing.bind(this)}
                                        secureTextEntry={this.state.secureTextEntry2}
                                    />
                                    <HFImageButton
                                        style={styles.imageButton}
                                        source={this.state.iconSource2}
                                        onPress={this.handlerTogglePassword.bind(this,'new')}
                                    />
                                </View>

                            }
                        />
                        <HFView
                            style={styles.rowInput}
                            innerView={
                                <View style={{flexDirection: 'row', backgroundColor: '#fff', borderRadius: 5}}>
                                    <HFTextInput
                                        ref='confirmPassword'
                                        style={styles.textInput}
                                        placeholder='确认密码'
                                        maxLength={18}
                                        flagImage={true}
                                        imageSource={require('../../Image/Login/mima.png')}
                                        imageStyle={{width: 25, height: 25}}
                                        onChangeText={this._onChange.bind(this, 'confirm')}
                                        onEndEditing={this._onConfirmEndEditing.bind(this)}
                                        secureTextEntry={this.state.secureTextEntry3}
                                    />
                                    <HFImageButton
                                        style={styles.imageButton}
                                        source={this.state.iconSource3}
                                        onPress={this.handlerTogglePassword.bind(this,'confirm')}
                                    />
                                </View>

                            }
                        />
                        <HFHugeButton
                            text="保存"
                            disabled={this.state.hugeButtonDisable}
                            onPress={this._onPress.bind(this)}
                        />
                    </View>
                }
            />
        )
    }

}
const styles = StyleSheet.create({

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
});