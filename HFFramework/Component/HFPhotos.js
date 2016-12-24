/**
 * Created by chengzhencai on 16/8/18. 上传照片
 */
'use strict';
import React, {Component, PropTypes} from 'react';
import {
    HFPage,
    HFText,
    HFConfiguration,
    StyleSheet,
    Text,
    Modal,
    Image,
    View,
    TouchableOpacity,
    Alert,
    Platform,
    DeviceEventEmitter
} from './../Framework';

import Toast from '@remobile/react-native-toast';

import Camera from 'react-native-camera';
import Api from './../Utility/Api';
import HFCameraRollPicker from './../Picker/HFCameraRollPicker';

class HFPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0,
            selected: [],
            isSubmit: false,
            rightDisabled: false
        };
    }

    getSelectedImages(images, current) {
        var num = images.length;
        this.setState({
            num: num,
            selected: images
        });
        if (num > 0) {
            this.setState({
                isSubmit: true
            });
        }
    }

    _onPress() {
        if (this.state.selected == null || this.state.selected.length == 0) {
            return false;
        }
        let self = this;
        this.setState({
            isSubmit: false,
            rightDisabled: true
        });
        Api.upload(this.state.selected, this.props.isAnnex)
            .then(res=> {
                let message = '图片上传失败';
                if (res.status === 1) {
                    DeviceEventEmitter.emit(this.props.pageKey, this.props.type, res.data);
                    message = '图片上传成功';
                    setTimeout(function () {
                        self.setState({
                            rightDisabled: false
                        });
                        self.props.navigator.pop();
                    }, 2000)
                } else {
                    this.setState({
                        rightDisabled: false
                    });
                }
                Toast.showLongCenter(message);
            });
    }

    render() {
        return (
            <HFPage
                navigation={{
                    navigator:this.props.navigator,
                    title:'相册',
                    flagLeft:true,
                    flagRight:true,
                    rightText:'保存',
                    onRightButtonPress:this._onPress.bind(this)
                }}
                innerView={
                    <View style={styles.container}>
                        <HFCameraRollPicker
                            groupTypes='SavedPhotos'
                            batchSize={9}
                            maximum={this.props.maximum}
                            selected={this.state.selected}
                            assetType='Photos'
                            imagesPerRow={3}
                            imageMargin={5}
                            callback={this.getSelectedImages.bind(this)}
                        />
                        <Modal
                            animationType='fade'
                            transparent={true}
                            visible={this.state.rightDisabled}
                            onShow={() => {}}
                            onRequestClose={() => {}}
                        >
                            <View style={styles.loadingView}>
                                <View
                                    style={{width:220,height:170,alignItems:'center',justifyContent:'center',backgroundColor:'#111',borderRadius: 20}}>
                                    <Image style={{width:200,height:150,alignItems:'center',justifyContent:'center',margin:10}}
                                           source={require('./../Image/loading_black.gif')}>
                                        <HFText style={{color:'white',marginTop:100}} text="图片上传中,请稍候..."/>
                                    </Image>
                                </View>
                            </View>
                        </Modal>
                    </View>
                }
            />
        );
    }
}

HFPhotos.protoTypes = {
    num: PropTypes.number
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        marginTop: 15,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    text: {
        fontSize: 16,
        alignItems: 'center',
        color: '#fff'
    },
    bold: {
        fontWeight: 'bold'
    },
    info: {
        fontSize: 12
    },
    back: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 16
    },
    loadingView: {
        flex: 1,
        backgroundColor: HFConfiguration.dialogBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

module.exports = HFPhotos;