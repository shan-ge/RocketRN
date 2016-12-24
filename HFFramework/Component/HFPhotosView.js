/**
 * Created by chengzhencai on 16/8/29. 相片滚动操作
 */
import React, {Component, PropTypes} from 'react';
import {
    HFPage,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ListView,
    Dimensions,
    DeviceEventEmitter
} from './../Framework';

import Swiper from 'react-native-swiper';
import ActionSheet from 'react-native-actionsheet';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import RenderIf from './../Utility/RenderIf';

const {width, height}=Dimensions.get('window');

class HFPhotosView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dotype: this.props.dotype != null ? this.props.dotype : 'edit',
            imageSize: this.props.images.length,
            images: this.props.images,
            no: (this.props.index != null ? this.props.index : 0) + 1
        }
    }

    onRightButtonPress() {
        this.actionSheet.show();
    }

    _handlePress(index) {
        if (index === 1) {
            let _images = this.state.images;
            let _no = this.state.no;
            if (_no > 1 && _no <= _images.length) {
                _no--;
            } else if (_no === 1 && _images.length === 1) {
                _no = 0
            } else if (_no === 1 && _images.length > 1) {
                _no = 1;
            }
            let img = _images.splice(this.state.no - 1, 1);
            this.setState({
                imageSize: this.state.imageSize - 1,
                images: _images,
                no: _no
            });
            DeviceEventEmitter.emit(this.props.pageKey, 'del', img);
        }
    }

    _onMomentumScrollEnd(e, state, content) {
        this.setState({
            no: state.index + 1
        })
    }

    getImageView() {
        let imageView = this.state.images.map((item, index)=> {
            return (
                <View style={styles.row} key={index}>
                    <Image style={styles.image}
                           resizeMode="contain"
                           source={{uri:item.relativePath+'processed/'+item.fullName}}
                           indicator={ProgressBar}
                           indicatorProps={{
                                size: 80,
                                borderWidth: 0,
                                color: 'rgba(150, 150, 150, 1)',
                                unfilledColor: 'rgba(200, 200, 200, 0.2)'
                            }}
                    />
                </View>
            )
        });
        return (
            <Swiper style={styles.wrapper}
                    showsButtons={false}
                    loop={false}
                    loadMinimal={true}
                    index={this.state.no - 1}
                    onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}>
                {imageView}
            </Swiper>
        )
    }

    render() {
        let {navigator} = this.props;
        let imageView = this.getImageView();
        return (
            <View>
                {RenderIf(this.state.dotype == 'view')(
                    <Navigation
                        title={this.state.no+'/'+this.state.imageSize}
                        route={navigator}
                    />
                )}
                {RenderIf(this.state.dotype == 'edit')(
                    <Navigation
                        title={this.state.no+'/'+this.state.imageSize}
                        route={navigator}
                        rightText="删除"
                        onRightButtonPress={this.onRightButtonPress.bind(this)}
                    />
                )}
                {imageView}
                <ActionSheet
                    ref={(o) => this.actionSheet = o}
                    title="要删除这张照片吗?"
                    options={['取消', '删除']}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={1}
                    onPress={this._handlePress.bind(this)}
                />
            </View>
        )
    }
}

HFPhotosView.propTypes = {
    images: PropTypes.array.isRequired
};

var styles = StyleSheet.create({
    wrapper: {backgroundColor: '#000'},
    row: {
        flex: 1,
        backgroundColor: 'white'
    },
    image: {
        flex: 1,
        width: width
    }
});

module.exports = HFPhotosView;
