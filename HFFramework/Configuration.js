/**
 * Created by shange on 2016/10/22.
 *
 * 用于配置系统默认值(参考标准为iPhone 6下的展现形式.然后根据不同分辨率进行自动调整)
 *
 * 分辨率:
 * ldpi     :   240x320
 * mdpi     :   320x480
 * hdpi     :   480x800、480x854
 * xhdpi    :   960*720
 * xxhdpi   :   1280×720
 *
 * padding和margin:
 * [10, 10, 10, 10] :   顺序是top,right,bottom,left(和css的顺序保持一致)
 *
 */
/**
 * 显示区域的尺寸
 * ldpi     :   240x320
 * mdpi     :   320x480
 * hdpi     :   480x800、480x854
 * xhdpi    :   960*720
 * xxhdpi   :   1280×720
 */
import {Dimensions, PixelRatio, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

let dpiIndex = getDipIndex();
// 辅助色 #6bbc26 #
let mainColor = '#00cf92';// 测试用色:#dd3300,#00cf92,#ff6d2d,#333333
let textFontSize = [15, 15, 15, 16, 16];
let textInputFontSize = [13, 13, 13, 14, 14];
let buttonFontSize = [17, 17, 17, 18, 18];
/************************************************************************************************************************/
var Configuration = {
    // 应用
    appName: 'HFFramework',
    platform: Platform.OS,
    pixelRatio: PixelRatio.get(),
    dpiIndex: dpiIndex,
    windowWidth: width,
    windowHeight: height,
    mainColor: mainColor,
    mainFontSize: textFontSize[dpiIndex],
    mainInputFontSize: textInputFontSize[dpiIndex],
    // 导航栏
    bottomTabHeight: [55, 55, 55, 55, 55],// ldpi,mdpi,hdpi,xhdpi,xxhdpi
    navigationHeight: [60, 60, 60, 65, 70],// ldpi,mdpi,hdpi,xhdpi,xxhdpi
    navigationFontSize: [18, 18, 18, 18, 18],// ldpi,mdpi,hdpi,xhdpi,xxhdpi
    navigationFontColor: '#333333',
    navigationBackground: 'white',
    navigationBorderBottomWidth: 0.5,
    navigationBorderBottomColor: '#e4e4e4',
    separatorLineColor: '#e4e4e4',// 分隔线颜色
    // 页面(不会影响数据展示页DataView)
    pageBackground: '#f7f7f7',
    dialogBackground: 'rgba(0,0,0,0.2)',
    pageBodyPadding: [
        [0, 0, 0, 0],// ldpi
        [0, 0, 0, 0],// mdpi
        [0, 0, 0, 0],// hdpi
        [0, 0, 0, 0],// xhdpi
        [0, 0, 0, 0]// xxhdpi
    ],
    // 视图
    viewMargin: [
        [0, 0, 0, 0],// ldpi
        [0, 0, 0, 0],// mdpi
        [0, 0, 0, 0],// hdpi
        [0, 0, 0, 0],// xhdpi
        [0, 0, 0, 0]// xxhdpi
    ],
    viewPadding: [
        [0, 0, 0, 0],// ldpi
        [0, 0, 0, 0],// mdpi
        [0, 0, 0, 0],// hdpi
        [0, 0, 0, 0],// xhdpi
        [0, 0, 0, 0]// xxhdpi
    ],
    // 按钮
    buttonFontSize: buttonFontSize,
    buttonFontColor: '#ffffff',
    buttonHugeHeight: 40,
    buttonHugeMarginTop: 10,
    buttonHugeMarginLeftRight: [16, 16, 16, 16, 16],
    buttonMediumWidth: 100,
    buttonMediumHeight: 30,
    buttonMediumMarginTop: 10,
    buttonImageWidth: 100,
    buttonImageHeight: 30,
    buttonImageMarginTop: 10,
    buttonBackground: mainColor,
    buttonBorderWidth: 1,
    buttonBorderColor: mainColor,
    buttonBorderRadius: 5,
    // 文本
    textFontFamily: 'Helvetica',
    textFontColor: '#333333',// 主色,其余为备用色
    textFontColor1: '#333333',
    textFontColor2: '#666666',
    textFontColor3: '#999999',
    textFontColor4: '#cccccc',
    textFontColor5: '#dddddd',
    textFontColor6: '#dddddd',
    textAllowFontScaling: false,// 是否允许字体缩放(仅IOS下有效)
    textFontSize: textFontSize,// ldpi,mdpi,hdpi,xhdpi,xxhdpi
    // 输入框
    placeholderColor: '#cccccc',// 占位符字体颜色
    pickerHeight: 220,// 选择器高度
    textInputFontFamily: 'Helvetica',
    textInputFontColor: '#333333',
    textInputFontSize: textInputFontSize,// ldpi,mdpi,hdpi,xhdpi,xxhdpi
    textInputViewHeight: [50, 50, 50, 50, 50],// ldpi,mdpi,hdpi,xhdpi,xxhdpi
    textInputFocusMarginTop: [100, 100, 100, 100, 100],// 当焦点聚焦到输入框时,页面会自动滚动,该值等于将输入框放置在距离HFPageBody显示区域的上边距(如果设置为负数,则不自动滚动)
    // 图像
    imageIconSize: [20, 20, 20, 20, 20],// ldpi,mdpi,hdpi,xhdpi,xxhdpi
    rowMargin:[10, 10, 10, 10],//行
};
/************************************************************************************************************************/
// 通过像素密度来确定索引
function getDipIndex() {
    let pixelRatio = PixelRatio.get();
    switch (pixelRatio) {
        case 1:
            return 0;
        case 1.5:
            return 1;
        case 2:
            return 2;
        case 3:
            return 3;
        case 3.5:
            return 4;
        default:
            return 2;
    }
};

module.exports = Configuration;