/**
 * Created by shange on 2016/11/01. 空列表视图
 */

'use strict';
import React, {Component} from 'react';
import {HFBaseStyle, HFConfiguration, HFImage, View, ScrollView, RefreshControl, TouchableOpacity, StyleSheet} from './../Framework';

class HFDataEmptyView extends Component {

    static defaultProps = {
        emptyImageSource: require('./../Image/no_history.png'),
        emptyImageWidthHeightRatio: 1080 / 551,// 空视图的宽高比,宽度由框架来控制,开发者只给出比例即可
    };

    static propTypes = {
        renderEmptyView: React.PropTypes.func,// 空视图
        emptyImageWidthHeightRatio: React.PropTypes.number,// 空视图图片的宽高比
    };

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        };
    }

    onRefresh() {
        this.setState({
            refreshing: true
        });
        if (this.props.onRefresh) {
            let self = this;
            let result = this.props.onRefresh();
            if (result) {
                result.then(()=> {
                    self.setState({
                        refreshing: false
                    });
                });
                this.setState({
                    refreshing: false
                });
            }
        } else {
            this.setState({
                refreshing: false
            });
        }
    }

    render() {
        if (this.props.renderEmptyView) {
            return this.props.renderEmptyView;
        } else {
            let w = HFConfiguration.windowWidth;
            let h = parseInt(HFConfiguration.windowWidth / this.props.emptyImageWidthHeightRatio);
            let pt = (HFConfiguration.windowHeight - h - 100) / 3;
            pt = pt > 0 ? pt : 0;
            return (
                <ScrollView
                    style={styles.outerView}
                    refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh.bind(this)}
                                title="重新加载"
                                titleColor={HFConfiguration.mainColor}
                                tintColor={HFConfiguration.mainColor}
                                colors={[HFConfiguration.mainColor]}
                            />
                        }
                >
                    <View style={[styles.outerView,{alignItems:'center',justifyContent:'center',paddingTop:pt}]}>
                        <TouchableOpacity onPress={this.onRefresh.bind(this)}>
                            <HFImage source={this.props.emptyImageSource} style={{width:w,height:h}}/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    outerView: {
        flex: 1,
        alignSelf: 'stretch',
    },
});

module.exports = HFDataEmptyView;