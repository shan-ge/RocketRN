/**
 * Created by chengzhencai on 16/9/4. 数据操作
 * save 方法  保存数据到本地
 *          key 键对值,
 *          param 保存数据,任何对象
 *          expires 失效时间,默认永久
 *
 *  load 方法 获取本地数据
 *          key 键对值,获取key相关的数据
 */
import {AsyncStorage, Platform} from 'react-native';
import Constants from './Constants';
const Handler = {
    keys: [],
    save(key, param, expires){
        if (this.keys.indexOf(key) > -1) {
            this.keys.push(key);
        }
        storage.save({
            key: key,
            rawData: param,
            expires: expires || null
        });
    },
    remove(key){
        storage.remove({key: key});
    },
    load(key){
        return new Promise(function (resolve, reject) {
            storage.load({
                key: key
            }).then(data=> {
                resolve(data)
            }).catch((e)=> {
                resolve(null);
            })
        })
    },
    removeAll(){
        AsyncStorage.clear();
    }
};
module.exports = Handler;