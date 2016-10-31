/**
 * Created by shange on 16/8/26. HFImage的包装页面
 */

'use strict';
import React,{Component} from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity
} from "react-native"
import HFHorizontalRow from './HFSeparator';

export default class HFAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View ref={this.props.ref}>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.props.alertVisible}
                    onShow={() => {}}
                    onRequestClose={() => {}}>
                    <View style={styles.alertView}>
                        <View style={[styles.alertSubView,this.props.alertSubView]}>
                            <Text style={styles.alertText}>{this.props.alertText}</Text>
                            <HFHorizontalRow/>
                            <TouchableOpacity style={styles.buttonPress} onPress={this.props.buttonPress}>
                                <Text
                                    style={styles.alertButtonText}>{this.props.alertButtonText ? this.props.alertButtonText : '好的'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
};

var styles = StyleSheet.create({
    alertView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alertSubView: {
        height: 130,
        marginLeft: 60,
        marginRight: 60,
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#e4e4e4',
        flexDirection: 'column'
    },
    alertText: {
        flex: 1,
        height: 30,
        lineHeight: 25,
        fontSize: 16,
        margin: 16,
        marginTop: 25,
        fontWeight: '200',
        color: '#666666',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    alertButtonText: {
        flex: 1,
        height: 35,
        fontSize: 16,
        marginTop: 15,
        fontWeight: '300',
        color: '#00cf92',
    },
    buttonPress: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});