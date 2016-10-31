/**
 * Created by shange on 2016/10/21.
 * 后发App框架示例
 */
import React, {Component} from 'react';
import {HFNavigatorConfig, Navigator} from './HFFramework/Framework';
import Demo from './HFFramework/Demo/Demo';

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