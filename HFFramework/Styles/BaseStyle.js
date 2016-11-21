/**
 * Created by shange on 2016/10/22.
 *
 * 基础样式类,主要定义app的风格样式
 *
 * 包括通用的颜色/字体,以及不同分辨率下的默认尺寸.
 *
 */

import {StyleSheet} from 'react-native';
import Configuration from './../Configuration';

var dpiIndex = Configuration.dpiIndex;

const BaseStyle = StyleSheet.create({
    navigation: {
        height: Configuration.navigationHeight[dpiIndex],
        backgroundColor: Configuration.navigationBackground,
        borderBottomWidth: Configuration.navigationBorderBottomWidth,
        borderBottomColor: Configuration.navigationBorderBottomColor,
    },
    navigationText: {
        fontSize: Configuration.navigationFontSize[dpiIndex],
        color: Configuration.navigationFontColor,
    },
    navigationImage: {
        width: Configuration.navigationHeight[dpiIndex] / 3,
        height: Configuration.navigationHeight[dpiIndex] / 3,
    },
    page: {
        paddingTop: Configuration.pageBodyPadding[dpiIndex][0],
        paddingRight: Configuration.pageBodyPadding[dpiIndex][1],
        paddingBottom: Configuration.pageBodyPadding[dpiIndex][2],
        paddingLeft: Configuration.pageBodyPadding[dpiIndex][3],
    },
    button: {
        backgroundColor: Configuration.buttonBackground,
        borderWidth: Configuration.buttonBorderWidth,
        borderColor: Configuration.buttonBorderColor,
        borderRadius: Configuration.buttonBorderRadius,
    },
    buttonText: {
        fontSize: Configuration.buttonFontSize[dpiIndex],
        color: Configuration.buttonFontColor,
    },
    view: {
        paddingTop: Configuration.viewPadding[dpiIndex][0],
        paddingRight: Configuration.viewPadding[dpiIndex][1],
        paddingBottom: Configuration.viewPadding[dpiIndex][2],
        paddingLeft: Configuration.viewPadding[dpiIndex][3],
        marginTop: Configuration.viewMargin[dpiIndex][0],
        marginRight: Configuration.viewMargin[dpiIndex][1],
        marginBottom: Configuration.viewMargin[dpiIndex][2],
        marginLeft: Configuration.viewMargin[dpiIndex][3],
    },
    text: {
        fontFamily: Configuration.textFontFamily,
        fontSize: Configuration.textFontSize[dpiIndex],
        color: Configuration.textFontColor,
    },
    textInputView: {
        height: Configuration.textInputViewHeight[dpiIndex],
    },
    textInput: {
        fontFamily: Configuration.textInputFontFamily,
        fontSize: Configuration.textInputFontSize[dpiIndex],
        height: Configuration.textInputViewHeight[dpiIndex] - 2,
        color: Configuration.textInputFontColor,
    },
    icon: {
        width: Configuration.imageIconSize[dpiIndex],
        height: Configuration.imageIconSize[dpiIndex],
    },
    datePickerInput: {
        width: Configuration.windowWidth,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        borderWidth: 0,
    },
    datePickerDate: {
        fontFamily: Configuration.textInputFontFamily,
        fontSize: Configuration.textInputFontSize[dpiIndex],
        color: Configuration.textInputFontColor,
    },
    datePickerPlaceholder: {
        color: Configuration.placeholderColor,
    },
});
module.exports = BaseStyle;
