/**
 * Created by shange on 2016/10/24. 图像
 */

'use strict';
import React, {Component} from 'react';
import {HFBaseStyle, HFConfiguration, Image, StyleSheet} from './../Framework';

var self;
var imageRef;
var ratioWidth, ratioHeight;
class HFImage extends Component {

    static defaultProps = {
        // 占位图
        placeholderSource: require('./../Image/no_image.png'),
        flagNoPlaceholder: false,
        // 下面二者不会同时生效
        source: null,
        uri: null,
        // 下面二者不会同时生效,只对远程图片uri有效
        ratioWidth: 0,// 定宽值
        ratioHeight: 0,// 定高值
    };

    static propTypes = {
        uri: React.PropTypes.string,
        flagNoPlaceholder: React.PropTypes.bool,
        ratioWidth: React.PropTypes.number,
        ratioHeight: React.PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.state = {
            imageWidth: 100,
            imageHeight: 100,
            source: null,
            imageLoading: false,
        };
        self = this;
        ratioWidth = this.props.ratioWidth;
        ratioHeight = this.props.ratioHeight;
    }

    componentWillMount() {
        if (this.props.uri != null) {
            Image.prefetch(this.props.uri);
        }
    }

    render() {
        let source = this.props.source;
        if (source == null) {
            if (this.props.uri != null) {
                source = {uri: this.props.uri};
                var _width = HFConfiguration.windowWidth;
                // 如果是远程图片,以此来获取图片的真实尺寸并匹配屏幕.如果是本地图片需要自己定义尺寸.
                Image.getSize(this.props.uri, (w, h)=> {
                    let ratio = w / h;
                    if (w > _width) {
                        w = _width;
                        h = parseInt(w / ratio);
                    }
                    // 注意,此二者不会同时生效
                    if (ratioWidth != null && ratioWidth > 0) {// 若定宽,则高度按比例自适应
                        h = parseInt(ratioWidth / ratio);
                        w = ratioWidth;
                    } else if (ratioHeight != null && ratioHeight > 0) {// 若定高,则宽度按比例自适应
                        w = parseInt(ratioHeight * ratio);
                        h = ratioHeight;
                    }
                    /*
                     if (self && imageRef) {
                     self.setState({
                     imageWidth: w,
                     imageHeight: h,
                     });
                     }
                     imageRef.setNativeProps({
                     style: {
                     width: w,
                     height: h,
                     }
                     });
                     */
                });
            } else {
                // 既没有source,又没有uri.显示占位符
                let flagNoPlaceholder = this.props.flagNoPlaceholder;
                if (flagNoPlaceholder != null && flagNoPlaceholder) {
                    source = null;
                } else {
                    source = this.props.placeholderSource;
                }
            }
        }
        // 如果加载失败,则显示占位图
        return (
            <Image
                ref={ref=>imageRef = ref}
                source={source}
                resizeMode="contain"
                style={[styles.image,{width:this.state.imageWidth,height:this.state.imageHeight},this.props.style]}
                onLoadStart={(event) => this.setState({imageLoading: true})}
                onLoadEnd={(event)=>{
                    this.setState({imageLoading: false});
                    /*
                    let flagNoPlaceholder = this.props.flagNoPlaceholder;
                    if (flagNoPlaceholder == null || !flagNoPlaceholder) {
                        imageRef.setNativeProps({source: require('./../Image/no_image.png')});
                    }
                    */
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    image: {}
});

module.exports = HFImage;