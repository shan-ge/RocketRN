/**
 * Created by shange on 2016/11/21.索引页
 */
import React, {Component} from 'react';
import {
    HFPage,
    HFMediumButton,
    View,
    StatusBar,
    Image,
    StyleSheet,
    Platform,
    Dimensions
} from  './../../HFFramework/Framework';
import Login from './Login/Login';
import Home from './Home/Home';
import GuidePage from './GuidePage';
import Constants from './../Common/Constants';
const {width, height}=Dimensions.get('window');

import Dialog from '../../HFFramework/Utility/Dialog';
import Api from '../../HFFramework/Utility/Api';
import Bridge from '../../HFFramework/Utility/Bridge';
import RenderIf from '../../HFFramework/Utility/RenderIf';
import Navigator from '../../HFFramework/Utility/Navigator';
import Handler from '../../HFFramework/Utility/Handler';

import Service from '../Common/Service';
import DeviceInfo from 'react-native-device-info';

class IndexPage extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // 用户
        Handler.load(Constants.storageKeyUserToken)
            .then(user=> {
                if (user) {
                    Service.userId = user.userId;
                    Service.doctorId = user.doctorId;
                    Service.token = user.token;
                }
            });
        //
        Constants.version = DeviceInfo.getVersion();
        Service.platform = Platform.OS === 'ios' ? Constants.platform_ios : Constants.platform_android;
        let {navigator} = this.props;
        // 检测版本号,是否需要升级
        //Api.post(Service.getVersionInfo)
        //    .then(response=> {
        //        Dialog.alertApiResponse(response, function () {
                    // 加载图
                    Bridge.readFile(Constants.fileHasShownGuide, function (result) {
                        if (result != null && result['message'] != '' && result['message'] == Constants.version) {
                            Handler.load(Constants.storageKeyIsLogin)
                                .then(res=> {
                                    if (res === true) {
                                        return Home;
                                    } else {
                                        return Login;
                                    }
                                }).then(component=> {
                                setTimeout(function () {
                                    Navigator.resetTo({
                                        component: component,
                                        passProps: {
                                            navigator: navigator
                                        }
                                    }, navigator);
                                }, 2000);
                            });
                        } else {
                            setTimeout(function () {
                                Navigator.resetTo({
                                    component: GuidePage,
                                    passProps: {
                                        navigator: navigator
                                    }
                                }, navigator);
                            }, 2000);
                        }
                    });
        //        });
        //    })
    }

    render() {
        // 之所以用HFPage,是因为上面用到了Dialog
        return (
            <HFPage
                navigation={{navigator: this.props.navigator}}
                flagNoNavigation={true}
                flagNoScroll={true}
                innerView={
                    <View style={{flex:1,alignSelf:'stretch'}}>
                        <StatusBar
                            hidden={true}
                            backgroundColor='rgba(0, 0, 0, 0.3)'
                            barStyle="default"
                            translucent={true}
                        />
                        <View style={styles.image}>
                            <Image
                                style={styles.image}
                                source={require('./../Image/Guide/startPage.png')}
                                resizeMode="stretch"
                            />
                            <HFMediumButton/>
                        </View>
                    </View>
                }
            />
        )
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: width,
        height: height
    }
});

module.exports = IndexPage;