/**
 * Created by shange on 16/8/10. checkbox
 *
 * <HFCheckbox
 *      value={dataRow['id']}
 *      label={dataRow['text']}
 *      checked={false}
 *      labelBefore={true}
 *      style={styles.style}
 *      checkboxStyle={styles.checkboxStyle}
 *      labelStyle={{paddingTop: 12,paddingLeft: 15,height: 40,fontSize: 15,justifyContent: 'flex-start',color: '#666666'}}
 *      checkboxSize={26}
 *      onPress={(checked,value,label)=>this.handlerDataRowPress(this, dataRow, !checked)}
 * />
 *
 */

'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight
} from "react-native"

var Icon = require('react-native-vector-icons/Ionicons');

export default class HFCheckbox extends Component {
    static defaultProps = {
        label: '',
        labelBefore: false,
        checked: false
    };

    static propTypes = {
        label: React.PropTypes.string,
        labelStyle: React.PropTypes.object,
        checked: React.PropTypes.bool,
        onChange: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            label: this.props.label,
            checked: props.checked
        };
    }

    componentWillMount() {
        //console.log("checkbox初始化");
    }

    componentWillReceiveProps(nextProps) {
        //console.log("checkbox接收到新参数:" + nextProps);
        this.setState({
            checked: nextProps.checked
        });
    }

    componentWillUnmount() {
        //console.log("checkbox组件被销毁了");
    }

    onChange() {
        this.setState({checked: !this.state.checked});
    }

    toggle() {
        //console.log("checkbox被点击了");
        this.setState({checked: !this.state.checked});
        // 调用父组件的方法
        const {onPress} = this.props;
        if (onPress) {
            onPress(this.state.checked, this.state.value, this.state.label);
        }
    }

    render() {
        var iconColor = "#cccccc";
        if (this.state.checked) {
            iconColor = "#00cf92";
        }
        var container = (
            <View style={styles.container}>
                <Icon name={'ios-checkmark-circle'} size={this.props.checkboxSize?this.props.checkboxSize:20}
                      style={[styles.checkbox, this.props.checkboxStyle]} color={iconColor}/>
                <View style={styles.labelContainer}>
                    <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
                </View>
            </View>
        );

        if (this.props.labelBefore) {
            container = (
                <View style={styles.container}>
                    <View style={styles.labelContainer}>
                        <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
                    </View>
                    <Icon name={'ios-checkmark-circle'} size={this.props.checkboxSize?this.props.checkboxSize:20}
                          style={[styles.checkbox, this.props.checkboxStyle]} color={iconColor}/>
                </View>
            );
        }

        return (
            <TouchableHighlight activeOpacity={100} style={this.props.style} onPress={this.toggle.bind(this)}
                                underlayColor='white'>
                {container}
            </TouchableHighlight>
        )
    }
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    checkbox: {
        flex: 1,
    },
    labelContainer: {
        flex: 10,
    },
    label: {
        fontSize: 15,
        lineHeight: 15,
        color: '#666666',
    }
});