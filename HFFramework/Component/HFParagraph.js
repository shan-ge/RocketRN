/**
 * Created by shange on 2016/10/24. 文本
 */

'use strict';
import React, {Component} from 'react';
import {HFView, HFText, HFBaseStyle, HFConfiguration, StyleSheet} from './../Framework';

class HFParagraph extends Component {
    static defaultProps = {
        fontSizeDiff: -2,
        numberOfLines: 0,
        indentation: 0,// 缩进,默认0个汉字
    };

    static propTypes = {
        fontSizeDiff: React.PropTypes.number,
        numberOfLines: React.PropTypes.number,
        indentation: React.PropTypes.number,
    };

    constructor(props) {
        super(props);
    }

    render() {
        let indentationText = '';
        for (let i = 0; i < this.props.indentation; i++) {
            indentationText += '    ';
        }
        return (
            <HFView ref={this.props.ref}
                    style={[styles.view,this.props.viewStyle]}
                    innerView={
                    <HFText fontSizeDiff={this.props.fontSizeDiff} numberOfLines={this.props.numberOfLines} allowFontScaling={HFConfiguration.textAllowFontScaling} style={[styles.paragraph,this.props.style]} text={indentationText + this.props.text}/>
                    }
            />
        );
    }
}

const styles = StyleSheet.create({
    view: {},
    paragraph: {
        color: HFConfiguration.textFontColor3,
    },
});

module.exports = HFParagraph;