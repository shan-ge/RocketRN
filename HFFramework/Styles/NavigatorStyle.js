/**
 * Created by chengzhencai on 16/8/8.导航栏样式
 */
import {StyleSheet} from 'react-native';
const NavigatorStyle = StyleSheet.create({
    // 页面框架
    container: {
        flex: 4,
        flexDirection: 'column'
    },
    // 导航栏
    navContainer: {
        backgroundColor: '#00cf92',
        paddingTop: 12,
        paddingBottom: 10
    },
    // 导航栏文字
    headText: {
        color: '#ffffff',
        fontSize: 22
    },
    // 按钮
    button: {
        height: 60,
        marginTop: 10,
        justifyContent: 'center', // 内容居中显示
        backgroundColor: '#00cf92',
        alignItems: 'center'
    },
    // 按钮文字
    buttonText: {
        fontSize: 16,
        color: '#ffffff'
    },
    // 左面导航按钮
    leftNavButtonText: {
        color: '#ffffff',
        fontSize: 16,
        marginLeft: 13
    },
    // 右面导航按钮
    rightNavButtonText: {
        color: '#ffffff',
        fontSize: 16,
        marginRight: 13
    },
    // 标题
    title: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        flex: 1                //Step 3
    }
});
module.exports = NavigatorStyle;