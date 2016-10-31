/**
 * Created by shange on 2016/10/21.
 * 后发App框架示例
 */
import React, {Component} from 'react';
import {HFHeading,
    HFPage,
    HFDataPageView,
    HFDataAlphabetView,
    HFDataListView,
    HFDataGridView,
    HFWebView,
    HFImage,
    HFHugeButton,
    HFMediumButton,
    HFImageButton,
    HFConfiguration,
    HFParagraph,
    HFTextInput,
    HFSeparator,
    HFView,
    HFText,
    View,
    StyleSheet} from './../Framework';

import Demo1 from './Demo1';
import DemoDataPageView from './DemoDataPageView';
import DemoDataAlphabetView from './DemoDataAlphabetView';
import DemoDataListView from './DemoDataListView';

class Demo extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    toPage(type) {
        if (type == 'Next') {
            this.props.navigator.push({
                component: Demo1,
            })
        } else if (type == 'PageView') {
            this.props.navigator.push({
                component: DemoDataPageView,
            })
        } else if (type == 'AlphabetView') {
            this.props.navigator.push({
                component: DemoDataAlphabetView,
            })
        } else if (type == 'ListView') {
            this.props.navigator.push({
                component: DemoDataListView,
            })
        } else if (type == 'GridView') {
            this.props.navigator.push({
                component: DemoDataListView,
            })
        } else if (type == 'WebView') {
            this.props.navigator.push({
                component: DemoDataListView,
            })
        }
    }

    render() {
        return (
            <HFPage
                navigator={this.props.navigator}
                flagNavigation={true}
                navigation={{title:HFConfiguration.appName,flagRight:true,rightImageSource:require('./Image/demo_nav.png')}}
                onRefresh={()=>{alert('您刚刚刷新了数据...');}}
                innerView={
                    <View style={{flex:1,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                        <HFHeading level={1} text='[设备]' style={{alignSelf:'flex-start',marginBottom:10}}/>
                        <HFText text={'像素密度等级=' + HFConfiguration.pixelRatio + ',索引=' + HFConfiguration.dpiIndex}/>
                        <HFSeparator/>
                        <HFHeading level={1} text='[标题]' style={{alignSelf:'flex-start',marginBottom:10}}/>
                        <HFHeading level={1} text='标题1' style={{color:'#0000cc'}}/>
                        <HFHeading level={2} text='标题2' style={{color:'#dd3300'}}/>
                        <HFHeading level={3} text='标题3' style={{color:'#ff6d2d'}}/>
                        <HFHeading level={4} text='标题4(默认FontSize)' style={{color:'#333333'}}/>
                        <HFHeading level={5} text='标题5' style={{color:'#00cccc'}}/>
                        <HFHeading level={6} text='标题6' style={{color:'#cccccc'}}/>
                        <HFSeparator/>
                        <HFHeading level={1} text='[段落]' style={{alignSelf:'flex-start',marginBottom:10}}/>
                        <HFParagraph numberOfLines={2} text='有缩进的,段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落'/>
                        <HFParagraph numberOfLines={3} indentation={0} text='无缩进的,段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落段落'/>
                        <HFImage/>
                        <HFImage ratioWidth={500} style={{width:200,height:200}} uri="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQfCPyLIgrw3oEuIisrlnms646SmKWysDW9uxTzBkfohjQoDlhc"/>
                        <HFSeparator/>
                        <HFHeading level={1} text='[输入框]' style={{alignSelf:'flex-start',marginBottom:10}}/>
                        <HFTextInput placeholder='请输入账号...' flagImage={true}/>
                        <HFSeparator style={{marginTop:0,marginBottom:0}}/>
                        <HFTextInput placeholder='请输入密码...' secureTextEntry={true} flagImage={true} imageSource={require('./Image/lock_green.png')}/>
                        <HFSeparator style={{marginTop:0,marginBottom:0}}/>
                        <HFTextInput multiline={true} style={{height:100}} inputStyle={{height:80}}/>
                        <HFSeparator/>
                        <HFHeading level={1} text='[按钮]' style={{alignSelf:'flex-start',marginBottom:10}}/>
                        <HFImageButton flagLeftText={true} flagRightText={true} leftText="左" rightText="右" source={require('./Image/demo_nav.png')}/>
                        <HFMediumButton text="完成"/>
                        <HFHugeButton text="下一页"/>
                        <HFImageButton disabled={true} flagLeftText={true} flagRightText={true} leftText="左" rightText="右" source={require('./Image/demo_nav.png')}/>
                        <HFMediumButton disabled={true} text="完成"/>
                        <HFHugeButton disabled={true} text="下一页"/>
                        <HFSeparator/>
                        <HFHeading level={1} text='[视图]' style={{alignSelf:'flex-start',marginBottom:10}}/>
                        <HFHugeButton text="分页列表视图" onPress={()=>this.toPage('PageView')}/>
                        <HFHugeButton text="索引列表视图" onPress={()=>this.toPage('AlphabetView')}/>
                        <HFHugeButton text="普通列表视图" onPress={()=>this.toPage('ListView')}/>
                        <HFHugeButton text="网格视图" onPress={()=>this.toPage('GridView')}/>
                        <HFHugeButton text="网页视图" onPress={()=>this.toPage('WebView')}/>
                        <HFSeparator/>
                    </View>
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

module.exports = Demo;