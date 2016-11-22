/**
 * Created by chengzhencai on 16/9/20. 引导页
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    StatusBar
} from 'react-native'
import Swiper from 'react-native-swiper';
import Login from './Login/Login';
import Home from './Home/Home';
const {width, height}=Dimensions.get('window');

import Bridge from '../../HFFramework/Utility/Bridge';
import Navigator from '../../HFFramework/Utility/Navigator';
import Handler from '../../HFFramework/Utility/Handler';
import Constants from './../Common/Constants';

class GuidePage extends Component {
    constructor(props) {
        super(props);
    }

    toFirstPage() {
        //
        Bridge.writeFile(Constants.fileHasShownGuide, Constants.version, 0);
        //
        let {navigator} = this.props;
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
    }

    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar hidden={true}/>
                <Swiper style={styles.wrapper}
                        sdot={<View style={{backgroundColor:'rgba(255,255,255,.3)', width: 13, height: 13,borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                        activeDot={<View style={{backgroundColor: '#f1f1f1', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                        paginationStyle={{bottom: 50}}
                        loop={false}>
                    <View style={styles.row}>
                        <Image style={styles.image} source={require('../Image/Guide/1.png')}
                               resizeMode={Image.resizeMode.cover}
                        />
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.image} source={require('../Image/Guide/2.png')}
                               resizeMode={Image.resizeMode.cover}
                        />
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.image} source={require('../Image/Guide/3.png')}
                               resizeMode={Image.resizeMode.cover}>
                            <View style={styles.bottom}>
                                <TouchableOpacity
                                    style={styles.btn}
                                    underlayColor='transparent'
                                    onPress={this.toFirstPage.bind(this)}>
                                    <Text style={styles.text}>HFFramework</Text>
                                </TouchableOpacity>
                            </View>
                        </Image>
                    </View>
                </Swiper>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    wrapper: {backgroundColor: 'transparent'},
    row: {
        flex: 1
    },
    image: {
        flex: 1,
        width: width,
        height: height,
    },
    bottom: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        right: 0,
        left: 0,
        bottom: 82,
    },
    btn: {
        borderWidth: 1,
        borderColor: '#00cf92',
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 20,
    },
    text: {
        color: '#00cf92',
        fontSize: 18,
    }
});

module.exports = GuidePage;