/**
 * Created by shange on 2016/10/21.
 * 后发App框架示例
 */
import React, {Component} from 'react';
import {HFPage, HFText, HFDataGridView, HFHugeButton, HFConfiguration, View, StyleSheet} from './../Framework';

import Configuration from './../Configuration';

class DemoDataGridView extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <HFPage
                flagNoScroll={true}
                flagNavigation={true}
                navigator={this.props.navigator}
                navigation={{title:'网格列表视图',flagLeft:true}}
                innerView={
                    <HFDataGridView
                            flagReadCache={false}
                            fetchUrl='/product/insurancePackList'
                            fetchParam={{}}
                            renderRowView={()=>{
                                return (
                                    <View style={{width:100,height:100,margin:5,backgroundColor:'red'}}>
                                        <HFText text="后发"/>
                                    </View>
                                );
                            }}
                        />
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

module.exports = DemoDataGridView;