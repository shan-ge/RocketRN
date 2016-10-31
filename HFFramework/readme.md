###实现的目标:
- 配置的统一管理
- 灵活的适应ReactNative的版本
- 适应不同的终端及分辨率
- 页面样式的统一控制
- 自定义组件统一控制
- 导航的统一控制
- 第三方组件引用的版本控制
- 字体缩放控制
- 用户操作指引
- 键盘的弹出和关闭
- 拦截器的管理
- 减少警告和闪退

###特殊配置
- 锁定屏幕旋转

###组件版本控制
- React ```15.3.2```
- ReactNative ```0.36.0```
- 其他第三方控件,要指定版本

###需要安装的插件
- 列表视图 ```npm install --save react-native-gifted-listview```
- 左划按钮 ```npm install --save react-native-swipeout```
- 附件上传 ```npm install --save react-native-fetch-blob```
- 消息提示 ```npm install --save @remobile/react-native-toast```
- 应用缓存 ```npm install --save react-native-storage```

###需要特别加入到git的文件(详见.gitignore)
- node_modules/react-native-swipeout/index.js
- node_modules/react-native-gifted-spinner/GiftedSpinner.js