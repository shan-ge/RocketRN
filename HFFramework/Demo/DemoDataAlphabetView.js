/**
 * Created by shange on 2016/10/21.
 * 后发App框架示例
 */
import React, {Component} from 'react';
import {HFPage, HFText, HFDataAlphabetView, HFHugeButton, HFConfiguration, View, StyleSheet} from './../Framework';

import Configuration from './../Configuration';

class DemoDataAlphabetView extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <HFPage
                flagNoScroll={true}
                navigation={{navigator:this.props.navigator,title:'索引列表视图',flagLeft:true}}
                innerView={
                    <HFDataAlphabetView
                            flagReadCache={false}
                            fetchUrl='/treatment/findAllMedicineList'
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
});

module.exports = DemoDataAlphabetView;