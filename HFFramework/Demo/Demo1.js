/**
 * Created by shange on 2016/10/21.
 * 后发App框架示例
 */
import React, {Component} from 'react';
import {HFPage, HFHugeButton, HFConfiguration, View, StyleSheet} from './../Framework';

import Configuration from './../Configuration';

class Demo1 extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    toTheme(color) {
    }

    render() {
        return (
            <HFPage
                navigation={{navigator:this.props.navigator,title:HFConfiguration.appName,flagLeft:true}}
                innerView={
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <HFHugeButton text="红色主题" style={styles.buttonRed} onPress={this.toTheme.bind(this,'#dd3300')}/>
                        <HFHugeButton text="绿色主题" style={styles.buttonGreen} onPress={this.toTheme.bind(this,'#00cf92')}/>
                        <HFHugeButton text="橙色主题" style={styles.buttonOrange} onPress={this.toTheme.bind(this,'#ff6d2d')}/>
                        <HFHugeButton text="黑色主题" style={styles.buttonBlack} onPress={this.toTheme.bind(this,'#333333')}/>
                    </View>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    buttonRed: {
        backgroundColor: '#dd3300',
        borderColor: '#dd3300',
    },
    buttonGreen: {
        backgroundColor: '#00cf92',
        borderColor: '#00cf92',
    },
    buttonOrange: {
        backgroundColor: '#ff6d2d',
        borderColor: '#ff6d2d',
    },
    buttonBlack: {
        backgroundColor: '#333333',
        borderColor: '#333333',
    },
});

module.exports = Demo1;