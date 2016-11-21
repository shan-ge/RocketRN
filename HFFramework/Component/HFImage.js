/**
 * Created by shange on 2016/10/24. 图像
 */

'use strict';
import React, {Component} from 'react';
import {HFBaseStyle, HFConfiguration, Image, ActivityIndicator, StyleSheet} from './../Framework';

import RenderIf from './../Utility/RenderIf';

class HFImage extends Component {

    static defaultProps = {
        // 占位图
        placeholderSource: require('./../Image/no_image.png'),
        flagNoPlaceholder: false,// 是否显示占位图
        flagNoLoading: false,// 是否显示加载动画
        resizeMode: "cover",
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
        flagNoLoading: React.PropTypes.bool,
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
    }

    componentWillMount() {
        if (this.props.uri != null) {
            let self = this;
            let ratioWidth = this.props.ratioWidth;
            let ratioHeight = this.props.ratioHeight;
            Image.prefetch(this.props.uri).then(()=> {
                Image.getSize(this.props.uri, (w, h)=> {
                    let ratio = w / h;
                    // 注意,此二者不会同时生效
                    if (ratioWidth != null && ratioWidth > 0) {// 若定宽,则高度按比例自适应
                        h = parseInt(ratioWidth / ratio);
                        w = ratioWidth;
                    } else if (ratioHeight != null && ratioHeight > 0) {// 若定高,则宽度按比例自适应
                        w = parseInt(ratioHeight * ratio);
                        h = ratioHeight;
                    }
                    let _width = HFConfiguration.windowWidth;
                    if (w > _width) {
                        w = _width;
                        h = parseInt(w / ratio);
                    }
                    if (self) {
                        self.setState({
                            imageWidth: w,
                            imageHeight: h,
                        });
                    }
                }, error=> {
                    //console.error('获取图片尺寸失败');
                });
            }, error=> {
                //console.error('缓存图片失败');
            });
        }
    }

    render() {
        let source = this.props.source;
        if (source == null) {
            if (this.props.uri != null) {
                source = {uri: this.props.uri};
                // 如果是远程图片,以此来获取图片的真实尺寸并匹配屏幕.如果是本地图片需要自己定义尺寸.
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
        return (
            <Image
                source={source}
                resizeMode={this.props.resizeMode}
                style={[styles.image,{width:this.state.imageWidth,height:this.state.imageHeight},this.props.style]}
                onLoadStart={() => this.setState({imageLoading: true})}
                onLoad={() => this.setState({imageLoading: false})}
            >
                {RenderIf(!this.props.flagNoLoading)(
                    <ActivityIndicator animating={this.state.imageLoading} size="small"/>
                )}
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});

module.exports = HFImage;