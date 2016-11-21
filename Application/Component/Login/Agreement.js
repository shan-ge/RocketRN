/**
 * Created by Zhang on 2016/11/7.
 */
'use strict';
import React, {Component} from "react";
import {
    HFPage,
    HFConfiguration,
    HFText,
    Text,
    View,
    ScrollView,
    Image,
    HFImage,
    Dimensions,
    StyleSheet,
    WebView
} from "./../../../HFFramework/Framework";
import Config from '../../Common/Config'
import Service from '../../Common/Service'

var { width, height } = Dimensions.get('window');

export default class Agreement extends Component {

    render() {
        let detailUrl = Config.host + Service.agreement
        return(
            <HFPage
                navigation={{navigator: this.props.navigator, title: '后发医生用户协议', flagLeft: true,}}
                innerView={
                        <WebView
                            bounces={false}
                            renderLoading={()=> {
                                return (
                                    <View style={styles.loadingView}>
                                        <Image
                                            source={require('../../Image/loading3.gif')}
                                            style={{width:50,height:50}}
                                        />
                                    </View>
                                );
                            }}
                            source={{uri:detailUrl}}
                            automaticallyAdjustContentInsets={true}
                            domStorageEnabled={false}
                            javaScriptEnabled={true}
                            startInLoadingState={true}
                            style={{width: width,height: height - 100}}
                        />
                }
            />
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        position: 'relative',
    },
    loadingView: {
        flex: 1,
        width:width-32,
        justifyContent: 'center',
        alignItems: 'center',
    },

});