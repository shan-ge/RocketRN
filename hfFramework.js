/**
 * Created by shange on 2016/10/21.
 * 后发App框架示例
 */
import React, {Component} from 'react';
import {HFNavigatorConfig, Navigator, AsyncStorage} from './HFFramework/Framework';
import Demo from './HFFramework/Demo/Demo';
import Storage from 'react-native-storage';

var storage = new Storage({
    storageBackend: AsyncStorage,
    // 最大容量，默认值1000条数据循环存储
    size: 1000,
    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: 1000 * 3600 * 24,
    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,
    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync同步方法，无缝返回最新数据。
    sync: {
        // 同步方法的具体说明会在后文提到
    }
});
global.storage = storage;
class hfFramework extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navigator
                initialRoute={{component: Demo}}
                configureScene={HFNavigatorConfig.configureScene}
                renderScene={HFNavigatorConfig.renderScene}
            />
        );
    }
}

module.exports = hfFramework;