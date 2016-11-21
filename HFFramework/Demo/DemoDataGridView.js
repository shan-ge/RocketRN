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
                navigation={{navigator:this.props.navigator,title:'网格列表视图',flagLeft:true}}
                innerView={
                    <HFDataGridView
                            flagReadCache={false}
                            columnCount={5}
                            fetchUrl='/product/insurancePackList'
                            fetchParam={{}}
                            renderRowView={()=>{
                                return (
                                    <View style={{height:150,backgroundColor:'red'}}>
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
});

module.exports = DemoDataGridView;