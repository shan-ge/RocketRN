/**
 * Created by chengzhencai on 16/8/25. 图片详情
 */

'use strict';
import React, {Component, PropTypes} from 'react';
import {
    HFPage,
    HFPhotosView,
    HFPhotoCamera,
    HFPhotos,
    HFSeparator,
    HFImage,
    HFText,
    View,
    Modal,
    TouchableOpacity,
    ListView,
    Dimensions,
    DeviceEventEmitter,
    StyleSheet,
} from './../Framework';

import ActionSheet from 'react-native-actionsheet';
import Toast from '@remobile/react-native-toast';
import RenderIf from './../Utility/RenderIf';

class HFPhotoUploadView extends Component {

    constructor(props) {
        super(props);
        this.type = 'add';
        this.state = {
            remark: '',
            images: [],
            rightDisabled: false,
        };
        this._renderImage = this._renderImage.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this._onPress = this._onPress.bind(this)
    }

    componentWillMount() {
        let images = [];
        this.props.images.map(item=> {
            images.push(item)
        });
        this.setState({
            images: images
        });
        var {width} = Dimensions.get('window');
        var {imageMargin, imagesPerRow, containerWidth} = this.props;

        if (typeof containerWidth != "undefined") {
            width = containerWidth;
        }
        this._imageSize = (width - (imagesPerRow + 1) * imageMargin - 32) / imagesPerRow;
        let self = this;
        this.listener = DeviceEventEmitter.addListener('HFPhotoUploadView', function (action, obj) {
            let _images = self.state.images;
            if (action && action === 'add') {
                if (obj && obj.length > 0) {
                    obj.map((item)=> {
                        _images.push(item);
                    })
                }
            } else {
                let ary = _images;
                _images.map((item, index)=> {
                    if (item.id === obj.id) {
                        ary.splice(index, 1)
                    }
                });
                _images = ary;
            }
            self.setState({
                images: _images
            })
        })
    }

    componentWillUnmount() {
        this.listener.remove();
    }

    onLeftButtonPress() {
        this.props.navigator.pop();
    }

    onRightButtonPress() {
        this.setState({
            rightDisabled: true
        });
        DeviceEventEmitter.emit(this.props.pageKey, this.props.type, this.state.images);
        Toast.showLongCenter('保存成功');
        let self = this;
        setTimeout(function () {
            self.setState({
                rightDisabled: false
            });
            self.props.navigator.pop();
        }, 1500)
    }

    onChange(event) {
        this.setState({
            remark: event.nativeEvent.text.trim()
        });
    }

    /**
     * action处理
     * @param index
     * @private
     */
    _handlePress(index) {
        if (index === 2) {
            this.onPressEvent(this.type)
        } else if (index === 1) {
            this.props.navigator.push({
                title: '相机',
                component: HFPhotoCamera,
                passProps: {
                    pageKey: 'HFPhotoUploadView',
                    type: this.type,
                    maxNum: 9 - this.state.images.length,
                    parent: this
                },
                display: false
            })
        }
    }

    onPressEvent(title) {
        this.props.navigator.push({
            title: title,
            component: HFPhotos,
            passProps: {
                pageKey: 'HFPhotoUploadView',
                title: title,
                type: this.type,
                maximum: 9 - this.state.images.length
            },
            display: false
        });

    }

    _onPress(isAdd, index) {
        if (isAdd) {
            if (this.state.images.length >= 9) {
                Toast.showShortCenter('最多添加9张图片')
                return false;
            }
            this.ActionSheet.show();
            return false;
        }
        this.props.navigator.push({
            component: HFPhotosView,
            passProps: {
                pageKey: 'HFPhotoUploadView',
                images: this.state.images,
                index: index,
            },
            display: false
        })
    }

    _renderImage(item, index) {
        var {imageMargin} = this.props;
        return (
            <TouchableOpacity
                key={index}
                style={{height:Dimensions.get('window').width/this.props.imagesPerRow,marginBottom: imageMargin, marginRight: imageMargin}}
                onPress={this._onPress.bind(this,false,index)}>
                <Image
                    source={{uri:item.relativePath+'thumbnail/'+item.fullName}}
                    style={{height: this._imageSize, width: this._imageSize}}>
                </Image>
            </TouchableOpacity>
        );
    }

    _renderRow() {
        var {imageMargin} = this.props;
        var items = this.state.images.map((item, index) => {
            if (item === null) {
                return null;
            }
            return this._renderImage(item, index);
        });

        return (
            <View style={styles.row}>
                {items}
                <TouchableOpacity
                    style={{marginBottom: imageMargin, marginRight: imageMargin}}
                    onPress={this._onPress.bind(this,true,null)}>
                    <Image
                        source={require('./../Image/Icon/photo_upload.png')}
                        style={{height: this._imageSize, width: this._imageSize}}>
                    </Image>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        let {navigator} = this.props;
        let photos = this._renderRow();
        let noremark = this.props.noremark;
        let flag = noremark != undefined && noremark != null && noremark;// 不显示备注
        return (
            <HFPage
                flagNoScroll={true}
                navigation={{
                    navigator:this.props.navigator,
                    title:'照片管理',
                    flagLeft:true,
                    flagRight:true,
                    rightText:'保存',
                    onRightButtonPress:this.onRightButtonPress.bind(this),
                }}
                innerView={
                    <View>
                        <View style={{flex:1,marginTop:10,paddingLeft:16}}>
                            {photos}
                        </View>
                        <ActionSheet
                            ref={(o) => this.ActionSheet = o}
                            options={['取消', '拍照',  '从手机相册选择']}
                            cancelButtonIndex={0}
                            onPress={this._handlePress.bind(this)}
                        />
                        <Modal
                            animationType='fade'
                            transparent={true}
                            visible={this.state.rightDisabled}
                            onShow={() => {}}
                            onRequestClose={() => {}}>
                            <View style={styles.loadingView}>
                                <View
                                    style={{width:220,height:170,alignItems:'center',justifyContent:'center',backgroundColor:'#111',borderRadius: 20}}>
                                    <HFImage style={{width:200,height:150,alignItems:'center',justifyContent:'center',margin:10}}
                                           source={require('./../Image/loading_black.gif')}>
                                        <Text style={{color:'white',fontSize:16,marginTop:100}}>图片上传中,请稍候...</Text>
                                    </HFImage>
                                </View>
                            </View>
                        </Modal>
                    </View>
                }
            />
        )
    }
}

HFPhotoUploadView.protoTypes = {
    type: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    input: {
        backgroundColor: '#fff',
        margin: 5,
        marginBottom: 5,
        height: 45,
        fontSize: 16
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    loadingView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

module.exports = HFPhotoUploadView;