# 后发移动端react-native前端框架
使用ReactNative技术的App端整体框架解决方案

## 组件版本
- React ```15.3.2```
- ReactNative ```0.36.0```
- 第三方控件,请见package.json

## 框架的目标
- 适应将来的ReactNative版本
- 适应不同的终端及分辨率
- 自定义组件管理
- 页面样式的控制
- 导航的控制
- 数据交互的管理
- 第三方组件引用的版本控制
- 用户操作指引
- 文字字体缩放控制
- 图片的友好显示
- 键盘的弹出和关闭
- 减少警告和闪退
- 埋点日志

## 特殊配置
- 锁定屏幕旋转
- 华为的虚拟按键

## 需要安装的插件
- 列表视图 ```npm install --save react-native-gifted-listview```
- 左划按钮 ```npm install --save react-native-swipeout```
- 附件上传 ```npm install --save react-native-fetch-blob```
- 消息提示 ```npm install --save @remobile/react-native-toast```
- 应用缓存 ```npm install --save react-native-storage```
- UUID生成器 ```npm install --save react-native-uuid-generator```

## 当前版本需要特别加入到git的文件(详见.gitignore)
- node_modules/react-native-swipeout/index.js
- node_modules/react-native-gifted-spinner/GiftedSpinner.js
- node_modules/react-native-uuid-generator/index.js

--------

## 目录说明
* **hfFramework/** <font color=gray>项目根目录</font>
    * **android/** <font color=gray>安卓原生目录</font>
    * **ios/** <font color=gray>苹果原生目录</font>
    * **Application/** <font color=gray>App应用目录,所有页面相关页面写在这里</font>
    * **HFFramework/** <font color=gray>框架目录</font>
        * **Bridge** <font color=gray>桥接原生</font>
        * **Component** <font color=gray>自定义组件</font>
        * **Demo** <font color=gray>功能示例</font>
        * **Image** <font color=gray>引用的图像</font>
        * **Layout** <font color=gray>布局</font>
        * **Picker** <font color=gray>选择器</font>
        * **Styles** <font color=gray>样式</font>
        * **Utility** <font color=gray>工具类</font>
        * *Configuration.js* <font color=gray>```重要配置页,每次开发新App都需要设置```</font>
        * *Framework.js* <font color=gray>引用框架页,所有页面引用组件都在这里进行.详见*./Demo/Demo.js*</font>
    * *index.ios.js* <font color=gray>苹果索引页,指向*hfFramework.js*</font>
    * *index.android.js* <font color=gray>安卓索引页,指向*hfFramework.js*</font>
    * *hfFramework.js* <font color=gray>首页</font>

--------

## ./Component/组件说明
|  名称 | 路径 | 功能说明 |
|  -------- | -------- | -------- |
|  **图像** | HFImage | 可本地可远程,缓存远程图片,自适应尺寸,有加载动画,获取图像失败则显示占位图 |
|  **文本** | HFText | 从配置中获取字体样式,缩放控制.字体大小通过偏移量fontSizeDiff来设置其它尺寸 |
|  视图 | HFView | 可统一设置内外边距 |
|  文本段落 | HFParagraph | 显示一段文字 |
|  提示框 | HFAlert | 弹出一个提示框 |
|  确认提示框 | HFConfirm | 弹出一个有动作的提示框 |
|  选择框 | HFCheckbox | 单选/复选 |
|  开关 | HFSwitch | 打开/关闭 |
|  输入框 | HFTextInput | 在苹果和安卓下均有清空按钮,可显示小图标,可多行输入 |
|  巨大按钮 | HFHugeButton | 和屏幕一样宽的按钮 |
|  中型按钮 | HFMediumButton | 正常大小的按钮 |
|  图片按钮 | HFImageButton | 可以显示图片和文字的按钮 |
|  文字按钮 | HFTextButton | 看起来和文字一样的按钮,有点击事件的文字 |
|  标题 | HFHeading | 类似html中的H1,H2,H3,H4,H5,H6 |
|  键盘区 | HFKeyboardSpacer | 键盘附加功能区,可控制键盘的关闭,可访问剪贴板 |
|  字体图标 | HFIcon | 字体类型的图标,可设置字体样式 |
|  待.. | 补.. | 充.. |

## ./Layout/布局说明（尚未完成）
|  名称 | 路径 | 功能说明 |
|  -------- | -------- | -------- |
|  导航 | HFNavigation | 页面导航控制器 |
|  页面 | HFPage | 页面大框架,相当于<html/> |
|  页面-头部 | HFPageHeader | 页面头部,相当于<header/> |
|  页面-内容 | HFPageBody | 页面内容,相当于<body/> |
|  页面-尾部 | HFPageFooter | 页面尾部,<footer/> |
|  普通列表 | HFDataListView | 数据类型List,一次加载完毕 |
|  可分页列表 | HFDataPageView | 数据类型Page,有分页的包装List |
|  可索引列表 | HFDataAlphabetView | 数据类型Map,可按索引显示.如A-Z |
|  网格视图 | HFDataGridView | 每行显示指定数量的视图,类似九宫格等 |
|  空视图 | HFDataEmptyView | 列表为空时,显示的视图 |
|  行视图 | HFDataRowView | 列表的行视图 |
|  网页视图 | HFWebView | 网页的包装,包括链接/分享/刷新/使用浏览器打开/打开其它应用的功能 |
|  待.. | 补.. | 充.. |

## ./Utility/工具说明（尚未完成）
|  名称 | 路径 | 功能说明 |
|  -------- | -------- | -------- |
|  远程请求 | Api | 请求后台的方法 |
|  基础配置 | Config | host地址，不纳入git管理 |
|  常量 | Constants | 各种常量，storage的key等 |
|  时间控件 | DateUtil | 日期和时间的处理 |
|  缓存 | Handler | 存取storage |
|  日志 | Logger | 日志的打印和汇报 |
|  导航配置 | NavigatorConfig | 导航配置 |
|  按需加载 | RenderIf | 当符合条件时才加载指定内容 |
|  服务地址 | Service | 各个请求方法的后台路径 |
|  待.. | 补.. | 充.. |
