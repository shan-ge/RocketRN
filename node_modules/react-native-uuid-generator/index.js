import { NativeModules } from 'react-native';

const { RNUUIDGenerator } = NativeModules;

export default {
    getRandomUUID(callback) {
        if (RNUUIDGenerator != undefined && RNUUIDGenerator != null) {
            if (callback) {
                RNUUIDGenerator.getRandomUUID(callback);
            }
            else {
                return new Promise((resolve, reject) => {
                    RNUUIDGenerator.getRandomUUID(resolve);
                });
            }
        } else {
            if (callback) {
                callback(this.getJSUuid());
            }
            return new Promise((resolve, reject) => {
                resolve(this.getJSUuid());
            });
        }
    },
    getJSUuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
};
