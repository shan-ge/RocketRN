/**
 * Created by chengzhencai on 16/8/26. 相机
 *
 * 参考react native camera
 */
import React, {Component, PropTypes} from 'react';
import {
    HFText,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Modal,
    View,
    Text,
    Dimensions,
    DeviceEventEmitter
} from './../../HFFramework/Framework';

import Camera from 'react-native-camera';
import Api from './../Utility/Api';
import Toast from '@remobile/react-native-toast';

class HFPhotoCamera extends Component {
    constructor(props) {
        super(props);
        this.camera = null;
        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.cameraRoll,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto
            },
            photos: {},
            isLoading: true,
            buttonDisabled: false,
        };

        this.takePicture = this.takePicture.bind(this);
        this.switchType = this.switchType.bind(this);
        this.switchFlash = this.switchFlash.bind(this);
        this.savePicture = this.savePicture.bind(this);
    }

    /**
     * 拍照
     */
    takePicture() {
        if (this.camera) {
            this.camera.capture()
                .then((data) => {
                    if (this.state.length > this.props.maxNum) {
                        return false;
                    }
                    this.setState({photos: data, isLoading: false});
                })
                .catch(err => console.log(err));
        }
    }

    /**
     * 使用图片
     * @returns {boolean}
     */
    savePicture() {
        var images = [];
        if (!this.state.photos.path) {
            return false;
        }
        images.push({uri: this.state.photos.path});
        /**
         * 保存图片
         */
        this.setState({
            buttonDisabled: true
        });
        var self = this;
        Api.upload(images, this.props.isAnnex).then(res=> {
            if (res.status === 1 && res.data) {
                DeviceEventEmitter.emit(this.props.pageKey, this.props.type, res.data);
                Toast.showLongCenter(res.message);
                let {navigator} = this.props;
                setTimeout(function () {
                    self.setState({
                        buttonDisabled: false
                    });
                    navigator.pop();
                }, 1500)
            } else {
                this.setState({
                    buttonDisabled: false
                });
            }
        })
    }

    /**
     * 切换前后镜
     */
    switchType() {
        let newType;
        const {back, front} = Camera.constants.Type;

        if (this.state.camera.type === back) {
            newType = front;
        } else if (this.state.camera.type === front) {
            newType = back;
        }

        this.setState({
            camera: {
                ...this.state.camera,
                type: newType
            }
        });
    }

    get typeIcon() {
        let icon;
        const {back, front} = Camera.constants.Type;

        if (this.state.camera.type === back) {
            icon = require('./../Image/Icon/camera_rear_white.png');
        } else if (this.state.camera.type === front) {
            icon = require('./../Image/Icon/camera_front_white.png');
        }

        return icon;
    }

    /**
     *
     */
    switchFlash() {
        let newFlashMode;
        const {auto, on, off} = Camera.constants.FlashMode;

        if (this.state.camera.flashMode === auto) {
            newFlashMode = on;
        } else if (this.state.camera.flashMode === on) {
            newFlashMode = off;
        } else if (this.state.camera.flashMode === off) {
            newFlashMode = auto;
        }

        this.setState({
            camera: {
                ...this.state.camera,
                flashMode: newFlashMode
            }
        });
    }

    get flashIcon() {
        let icon;
        const {auto, on, off} = Camera.constants.FlashMode;

        if (this.state.camera.flashMode === auto) {
            icon = require('./../Image/Icon/flash_auto_white.png');
        } else if (this.state.camera.flashMode === on) {
            icon = require('./../Image/Icon/flash_on_white.png');
        } else if (this.state.camera.flashMode === off) {
            icon = require('./../Image/Icon/flash_off_white.png');
        }

        return icon;
    }

    render() {
        let view = this.state.isLoading ?
            <View style={styles.container}>
                <StatusBar animated hidden/>
                <Camera ref={(cam)=>{ this.camera=cam;}}
                        style={styles.preview}
                        aspect={this.state.camera.aspect}
                        captureTarget={this.state.camera.captureTarget}
                        type={this.state.camera.type}
                        flashMode={this.state.camera.flashMode}
                        defaultTouchToFocus
                />
                <View style={[styles.overlay, styles.topOverlay]}>
                    <TouchableOpacity
                        style={styles.typeButton}
                        onPress={this.switchType}>
                        <Image source={this.typeIcon}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.flashButton}
                        onPress={this.switchFlash}>
                        <Image source={this.flashIcon}/>
                    </TouchableOpacity>
                </View>
                <View style={[styles.overlay, styles.bottomOverlay]}>
                    <TouchableOpacity style={styles.cancelButton} onPress={()=>this.props.navigator.pop()}>
                        <HFText style={{color:'white'}} text="取消"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.captureButton} onPress={this.takePicture}>
                        <Image source={require('./../Image/Icon/photo_camera_36pt.png')}/>
                    </TouchableOpacity>
                </View>
            </View> :
            <View style={styles.container}>
                <StatusBar animated hidden/>
                <Image source={{uri:this.state.photos.path}}
                       style={{flex:1,width:Dimensions.get('window').width,height:Dimensions.get('window').height}}/>
                <View style={[styles.overlay, styles.resetOverlay]}>
                    <TouchableOpacity style={styles.resetButton}
                                      onPress={()=>this.setState({photos:'',isLoading:true})}>
                        <HFText style={{color:'white'}} text="重拍"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={this.savePicture}
                                      disabled={this.state.buttonDisabled}>
                        <HFText style={{color:'white'}} text="使用照片"/>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.buttonDisabled}
                    onShow={() => {}}
                    onRequestClose={() => {}}>
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
            </View>;

        return (
            <View style={{flex:1}}>
                {view}
            </View>

        )
    }
}
/**
 * 传递属性
 * @type {{pageKey: *, type: *}}
 */

HFPhotoCamera.propTypes = {
    pageKey: PropTypes.string,//主页
    type: PropTypes.string//类型
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
        flexDirection: 'row'
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    captureButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
        left: Dimensions.get('window').width / 5
    },
    cancelButton: {
        padding: 15,
        left: 0,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    typeButton: {
        padding: 5,
    },
    flashButton: {
        padding: 5,
    },
    resetOverlay: {
        flex: 1,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    resetButton: {
        padding: 15,
        left: 0,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    saveButton: {
        padding: 15,
        right: 0,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    loadingView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

module.exports = HFPhotoCamera;