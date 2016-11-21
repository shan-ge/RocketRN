/**
 * Created by shange on 2016/10/21.
 * 后发App框架示例
 */
import React, {Component} from 'react';
import {HFPage, HFText, HFDataListView, HFConfiguration, View, StyleSheet} from './../Framework';

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
                navigation={{navigator:this.props.navigator,title:'普通列表视图',flagLeft:true}}
                innerView={
                    <HFDataListView
                            flagReadCache={false}
                            fetchUrl='/product/insurancePackList'
                            fetchParam={{'userId':1}}
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

const styles = StyleSheet.create({});

module.exports = DemoDataListView;