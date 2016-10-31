/**
 * Created by shange on 2016/10/24. 页面视图
 *
 * flagHeader       :   {true|false}    是否需要页眉
 * flagFooter       :   {true|false}    是否需要页脚
 * flagNavigation   :   {true|false}    是否需要导航
 * flagLogin        :   {true|false}    是否需要登录
 * innerView        :   {<View/>}       内容视图
 */

'use strict';
import React, {Component} from 'react';
import {HFNavigation, HFPageHeader, HFPageFooter, HFPageBody, HFBaseStyle, HFConfiguration, HFKeyboardSpacer, HFText, View, ScrollView, StyleSheet} from './../Framework';

import RenderIf from './../Utility/RenderIf';

class HFPage extends Component {

    static defaultProps = {
        flagNavigation: false,
        flagHeader: false,
        flagFooter: false,
        navigation: {}
    };

    static propTypes = {
        flagNavigation: React.PropTypes.bool,
        flagHeader: React.PropTypes.bool,
        flagFooter: React.PropTypes.bool,
        navigation: React.PropTypes.object,
    };

    render() {
        return (
            <View ref={this.props.ref} style={[styles.outerView, this.props.style]}>
                {/** 导航(常驻页面顶部) **/}
                {RenderIf(this.props.flagNavigation)(
                    <HFNavigation navigator={this.props.navigator}
                                  title={this.props.navigation['title']}
                                  flagLeft={this.props.navigation['flagLeft']}
                                  leftText={this.props.navigation['leftText']}
                                  onLeftButtonPress={this.props.navigation['onLeftButtonPress']}
                                  leftDisabled={this.props.navigation['leftDisabled']}
                                  flagRight={this.props.navigation['flagRight']}
                                  rightText={this.props.navigation['rightText']}
                                  rightImageSource={this.props.navigation['rightImageSource']}
                                  onRightButtonPress={this.props.navigation['onRightButtonPress']}
                                  rightDisabled={this.props.navigation['rightDisabled']}
                    />
                )}
                {/** 页眉(常驻页面上部) **/}
                {RenderIf(this.props.flagHeader)(
                    <HFPageHeader/>
                )}
                {/** 页面内容 **/}
                <HFPageBody
                    innerView={this.props.innerView}
                    flagNoScroll={this.props.flagNoScroll}
                    flagFooter={true}
                    footerView={
                        <HFText text='© 后发科技' style={{alignSelf:'center',lineHeight:30}}/>
                    }
                    onRefresh={this.props.onRefresh}
                    pagePaddingBottom={HFConfiguration.pageBodyPadding[HFConfiguration.dpiIndex][2]}
                />
                {/** 页脚(常驻页面底部) **/}
                {RenderIf(this.props.flagFooter)(
                    <HFPageFooter/>
                )}
                {/** 键盘(只有在键盘弹出时才显示) **/}
                <HFKeyboardSpacer/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: HFConfiguration.pageBackground,
    }
});

module.exports = HFPage;