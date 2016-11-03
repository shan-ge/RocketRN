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
let mainColor = '#00cf92';// 测试用色:#dd3300,#00cf92,#ff6d2d,#333333
let textFontSize = [15, 15, 15, 16, 18];
let textInputFontSize = [13, 13, 13, 14, 15];
let buttonFontSize = [17, 17, 17, 18, 20];
/************************************************************************************************************************/
var Configuration = {
    // 应用
    appName: '后发App框架',
    platform: Platform.OS,
    pixelRatio: PixelRatio.get(),
    dpiIndex: dpiIndex,
    windowWidth: width,
    windowHeight: height,
    mainColor: mainColor,
    mainFontSize: textFontSize[dpiIndex],
    mainInputFontSize: textInputFontSize[dpiIndex],
    // 导航栏
    navigationHeight: [60, 60, 60, 65, 70],// ldpi,mdpi,hdpi,xhdpi,xxhdpi
    navigationFontSize: [16, 16, 16, 17, 18],// ldpi,mdpi,hdpi,xhdpi,xxhdpi
    navigationFontColor: '#ffffff',
    navigationBackground: mainColor,
    // 页面(不会影响数据展示页DataView)
    pageBackground: '#f0f0f0',
    pageBodyPadding: [
        [10, 16, 50, 16],// ldpi
        [10, 16, 50, 16],// mdpi
        [10, 16, 50, 16],// hdpi
        [10, 16, 50, 16],// xhdpi
        [10, 16, 50, 16]// xxhdpi
    ],
    // 视图
    separatorLineColor: '#dddddd',// 分隔线颜色
    viewMargin: [
        [10, 0, 10, 0],// ldpi
        [10, 0, 10, 0],// mdpi
        [10, 0, 10, 0],// hdpi
        [10, 0, 10, 0],// xhdpi
        [10, 0, 10, 0]// xxhdpi
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
    buttonHugeHeight: 50,
    buttonHugeMarginTop: 10,
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
    textAllowFontScaling: false,// 是否允许字体缩放(仅IOS下有效)
    textFontSize: textFontSize,// ldpi,mdpi,hdpi,xhdpi,xxhdpi
    // 输入框
    textInputFontFamily: 'Helvetica',
    textInputFontColor: '#333333',
    textInputFontSize: textInputFontSize,// ldpi,mdpi,hdpi,xhdpi,xxhdpi
    textInputViewHeight: [40, 40, 40, 45, 50],// ldpi,mdpi,hdpi,xhdpi,xxhdpi
    textInputFocusMarginTop: [100, 100, 100, 100, 100],// 当焦点聚焦到输入框时,页面会自动滚动,该值等于将输入框放置在距离HFPageBody显示区域的上边距(如果设置为负数,则不自动滚动)
    // 图像
    imageIconSize: [20, 20, 20, 22, 25],// ldpi,mdpi,hdpi,xhdpi,xxhdpi
};
/************************************************************************************************************************/
// 通过像素密度来确定索引
function getDipIndex() {
    let pixelRatio = PixelRatio.get();
    if (pixelRatio == 1) {
        return 0;
    } else if (pixelRatio == 1.5) {
        return 1;
    } else if (pixelRatio == 2) {
        return 2;
    } else if (pixelRatio == 3) {
        return 3;
    } else if (pixelRatio == 3.5) {
        return 4;
    } else {
        return 2;
    }
};

module.exports = Configuration;