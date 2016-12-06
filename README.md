# 后发移动端react-native框架
使用ReactNative技术的App端整体框架解决方案

## 组件版本
- 本框架HFFramework `1.3.0` [更新日志](./changelog.md)
- 使用框架 React `15.3.2`
- 使用框架 ReactNative `0.37.0`
- 支持环境 IOS `^8.0`
- 支持环境 Android `^4.0`
- 第三方控件,请见 [package.json](./package.json)
- [其他组件](https://js.coach/react-native)

## 框架的目标
- 适应未来的ReactNative/IOS/Android版本
- 适应不同的终端及分辨率
- 自定义组件管理
- 页面样式的统一控制和灵活切换
- 路由和会话拦截器的控制
- 数据交互的管理
- 第三方组件引用的版本控制
- 用户操作指引
- 文字字体缩放控制
- 图片的预览友好显示
- 键盘的弹出和关闭
- 埋点日志
- 减少警告,消灭闪退

## 特殊配置
- 已锁定屏幕旋转
- 已解决华为的虚拟按键

--------
## 该版本待完善

* [ ] 对框架的性能还没有进行深入的测试
* [ ] 网络切换时的提醒
* [ ] 相机和本地图片的编辑(手动截取区域,自动获取旋转值并修正),压缩,上传,查看预览,查看原图,图片下载,重新加载
* [ ] 拦截器功能在打release包之后,在安卓真机上可能会失效的问题
* [ ] 在HFRowInput中的输入框与键盘自动滚动的匹配不好
* [ ] 埋点与日志记录，日志汇报
* [ ] 友盟的统计功能
* [ ] 各类加载进度管理
* [ ] 即时通讯功能
* [ ] 同一组件的同时调用
* [ ] 弹出层,以及其中的键盘遮挡问题

---
## 使用效果
<img src="/HFFramework/Image/ReadMe/1.png" width="310" height="552"/>
<img src="/HFFramework/Image/ReadMe/2.png" width="310" height="552"/>
--------

## 安装方法

我默认您已初识ReactNative的技术，否则请移步到 [ReactNative](https://github.com/facebook/react-native)

- 1、下载本项目
- 2、进入到本项目路径下，并执行`npm install`
- 3、执行 `rnpm link`
- 4、`react-native start`
- 5、`react-native run-ios` / `react-native run-android`

在/HFFramework/Configuration.js文件中，可以分别设置在不同分辨率下的显示样式。在查看效果时，您可以使用各种类型的真机，也可以启动指定类型的虚拟机，如 `react-native run-ios --simulator 'iPhone 6s Plus'`。

--------

## 项目目录说明
* **hfFramework/** <font color=gray>项目根目录</font>
    * **android/** <font color=gray>安卓原生目录</font>
    * **ios/** <font color=gray>苹果原生目录</font>
    * **Application/** <font color=gray>App应用目录,所有页面相关页面写在这里</font>
    * **HFFramework/** <font color=gray>框架目录</font>
        * **Component** <font color=gray>自定义组件</font>
        * **Demo** <font color=gray>功能示例</font>
        * **Image** <font color=gray>引用的图像</font>
        * **Layout** <font color=gray>布局</font>
        * **Picker** <font color=gray>选择器</font>
        * **Styles** <font color=gray>样式</font>
        * **Utility** <font color=gray>工具类</font>
        * *Configuration.js* <font color=gray>`重要配置页,每次开发新App都需要设置`</font>
        * *Framework.js* <font color=gray>引用框架页,所有页面引用组件都在这里进行.详见*./Demo/Demo.js*</font>
    * *index.ios.js* <font color=gray>苹果索引页,指向*hfFramework.js*</font>
    * *index.android.js* <font color=gray>安卓索引页,指向*hfFramework.js*</font>
    * *hfFramework.js* <font color=gray>首页</font>

--------

## ./Component/组件说明
|  名称 | 路径 | 功能说明 |
|  -------- | -------- | -------- |
|  **图像** | HFImage | 可本地可远程,缓存远程图片,自适应尺寸,有加载动画,获取图像失败则显示占位图,可点击查看大图 |
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

## ./Layout/布局说明
|  名称 | 路径 | 功能说明 |
|  -------- | -------- | -------- |
|  导航 | HFNavigation | 页面导航控制器 |
|  页面 | HFPage | 页面大框架,相当于<html/> |
|  页面-头部 | HFPageHeader | 页面头部,相当于html中的\<header/\> |
|  页面-内容 | HFPageBody | 页面内容,相当于html中的\<body/\> |
|  页面-尾部 | HFPageFooter | 页面尾部,相当于html中的\<footer/\> |
|  普通列表 | HFDataListView | 数据类型List,一次加载完毕 |
|  可分页列表 | HFDataPageView | 数据类型Page,有分页的包装List |
|  可索引列表 | HFDataAlphabetView | 数据类型Map,可按索引显示.如A-Z |
|  网格视图 | HFDataGridView | 每行显示指定数量的视图,类似九宫格等 |
|  空视图 | HFDataEmptyView | 列表为空时,显示的视图 |
|  行视图 | HFDataRowView | 列表的行视图 |
|  网页视图 | HFWebView | 网页的包装,包括链接/分享/刷新/使用浏览器打开/打开其它应用的功能 |
|  待.. | 补.. | 充.. |

## ./Utility/工具说明
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

--------

## ./Utility/Api及Navigator的返回码说明(适用于请求和页面跳转，前后端保持一致)
|  返回码 | 说明 | 结果 | 消息中心 |
|  -------- | -------- | -------- | -------- |
|  0 | 请求成功但数据为空 | 查询流程成功,但数据为空 | 无 |
|  1 | 请求成功 | 增删改查成功 | 无 |
|  2~99 | 其他一般返回码 | 业务自定义 | 无 |
|  <font color=yellow>以下返回码</font> | <font color=yellow>均由消息中心控制，</font> | <font color=yellow>各个业务页面对这些失败的返回码</font> | <font color=yellow>不做处理。</font> |
|  100~199 | 操作级别 | 100 刷新太过频繁，请稍等一会 | Toast短提示 |
|  200~299 | 网络级别 | 200 您当前正使用移动数据网络，是否继续？（大流量访问开始之前） <br/> 210 网络连接失败 | Confirm提示/Toast短提示 |
|  300~399 | 会话级别 | 300 登录失效，请重新登录 <br/> 310 该账号已在其它设备登录，请重新登录 <br/> 320 用户状态异常，请切换账号试试 <br/> 330 请您先完善信息 <br/> 340 请您先完成认证 | Toast短提示，跳转到登录页/反馈页/完善信息页/认证页 |
|  400~499 | 权限级别 | 400 您无权使用该功能 <br/> 410 您无权查看该数据 | Toast短提示 |
|  500~599 | 服务级别 | 500 后台返回异常 | Toast短提示 |
|  800~899 | 预言级别 | 预留的通知和事件，不确定未来会发生什么的保留接口 | Toast长提示 |
|  900~999 | 预言级别 | 预留的通知和事件，不确定未来会发生什么的保留接口 | Alert需要点击确定 |
|  1000~1099 | 应用级别 | 1000 无法获取客户端版本，请重新下载 <br/> 1010 客户端版本过低，请更新 <br/> 1020 客户端有误,请重新下载 | Confirm提示，确定到应用市场，取消继续使用 |


