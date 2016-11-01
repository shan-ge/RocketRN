/**
 * Created by shange on 2016/10/21.
 * 后发App框架示例
 */
import React, {Component} from 'react';
import {HFPage, HFText, HFDataListView, HFHugeButton, HFConfiguration, View, StyleSheet} from './../Framework';

import Configuration from './../Configuration';

class DemoDataListView extends Component {

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
                navigation={{title:'普通列表视图',flagLeft:true}}
                innerView={
                    <HFDataListView
                            flagReadCache={false}
                            fetchUrl='/product/insurancePackList1'
                            fetchParam={{}}
                            renderRowView={()=>{
                                return (
                                    <View>
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

module.exports = DemoDataListView;