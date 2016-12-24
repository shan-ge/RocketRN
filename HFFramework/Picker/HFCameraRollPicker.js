/**
 * Created by chengzhencai on 16/8/19. 相冊
 */
import React, {Component,PropTypes} from 'react'
import {
    CameraRoll,
    Image,
    Platform,
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ListView,
    ActivityIndicator,
} from 'react-native'
class HFCameraRollPicker extends Component {


    static propTypes = {
        groupTypes: PropTypes.oneOf([
            'Album',
            'All',
            'Event',
            'Faces',
            'Library',
            'PhotoStream',
            'SavedPhotos'
        ]),
        maximum: PropTypes.number,
        assetType: PropTypes.oneOf([
            'Photos',
            'Videos',
            'All'
        ]),
        imagesPerRow: PropTypes.number,
        imageMargin: PropTypes.number,
        containerWidth: PropTypes.number,
        callback: PropTypes.func,
        selected: PropTypes.array,
        selectedMarker: PropTypes.element,
        backgroundColor: PropTypes.string,
    };

    static defaultProps = {
        groupTypes: 'SavedPhotos',
        maximum: 15,
        imagesPerRow: 3,
        imageMargin: 5,
        assetType: 'Photos',
        backgroundColor: 'white',
        selected: [],
        callback: function (selectedImages, currentImage) {
            console.log(currentImage);
            console.log(selectedImages);
        }
    };

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            images: [],
            selected: this.props.selected,
            lastCursor: null,
            loadingMore: false,
            noMore: false,
            dataSource: this.ds.cloneWithRows([]),
        };
    }

    componentWillMount() {
        var {width} = Dimensions.get('window');
        var {imageMargin, imagesPerRow, containerWidth} = this.props;

        if (typeof containerWidth != "undefined") {
            width = containerWidth;
        }
        this._imageSize = (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow;

        this.fetch();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selected: nextProps.selected
        });
    }

    fetch() {
        if (!this.state.loadingMore) {
            this.setState({loadingMore: true}, () => {
                this._fetch();
            });
        }
    }

    _fetch() {
        var {groupTypes, assetType} = this.props;

        var fetchParams = {
            first: this.props.batchSize,
            groupTypes: this.props.groupTypes,
            assetType: this.props.assetType
        };

        if (Platform.OS === "android") {
            // not supported in android
            delete fetchParams.groupTypes;
        }

        if (this.state.lastCursor) {
            fetchParams.after = this.state.lastCursor;
        }

        CameraRoll.getPhotos(fetchParams)
            .then((data) => this._appendImages(data));
    }

    _appendImages(data) {
        var assets = data.edges;
        var newState = {
            loadingMore: false,
        };

        if (!data.page_info.has_next_page) {
            newState.noMore = true;
        }

        if (assets.length > 0) {
            newState.lastCursor = data.page_info.end_cursor;
            newState.images = this.state.images.concat(assets);
            newState.dataSource = this.ds.cloneWithRows(
                this._nEveryRow(newState.images, this.props.imagesPerRow)
            );
        }

        this.setState(newState);
    }

    render() {
        var {imageMargin, backgroundColor} = this.props;
        return (
            <View
                style={[styles.wrapper, {padding: imageMargin, paddingRight: 0, backgroundColor: backgroundColor},]}>
                <ListView
                    style={{flex: 1}}
                    renderFooter={this._renderFooterSpinner.bind(this)}
                    onEndReached={this._onEndReached.bind(this)}
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    renderRow={rowData => this._renderRow(rowData)}/>
            </View>
        );
    }

    _renderImage(item) {
        var {selectedMarker, imageMargin} = this.props;

        var marker = selectedMarker ? selectedMarker :
            <Image
                style={[styles.marker, {width: 25, height: 25, right: imageMargin + 5}]}
                source={require('./../Image/Icon/checked.png')}
            />;

        return (
            <TouchableOpacity
                key={item.node.image.uri}
                style={{marginBottom: imageMargin, marginRight: imageMargin}}
                onPress={event => this._selectImage(item.node.image)}>
                <Image
                    source={{uri: item.node.image.uri}}
                    style={{height: this._imageSize, width: this._imageSize}}>
                    { (this._arrayObjectIndexOf(this.state.selected, 'uri', item.node.image.uri) >= 0) ? marker : null }
                </Image>
            </TouchableOpacity>
        );
    }

    _renderRow(rowData) {
        var items = rowData.map((item) => {
            if (item === null) {
                return null;
            }
            return this._renderImage(item);
        });

        return (
            <View style={styles.row}>
                {items}
            </View>
        );
    }

    _renderFooterSpinner() {
        if (!this.state.noMore) {
            return <ActivityIndicator style={styles.spinner}/>;
        }
        return null;
    }

    _onEndReached() {
        if (!this.state.noMore) {
            this.fetch();
        }
    }

    _selectImage(image) {
        var {maximum, imagesPerRow, callback} = this.props;

        // 如果是单选,则始终清空已选择的,且以本次选择的为准
        if (maximum == 1) {
            this.state.selected = [];
            this.setState({
                selected: []
            });
        }

        var selected = this.state.selected,
            index = this._arrayObjectIndexOf(selected, 'uri', image.uri);

        if (index >= 0) {
            selected.splice(index, 1);
        } else {
            if (selected.length < maximum) {
                selected.push(image);
            }
        }

        this.setState({
            selected: selected,
            dataSource: this.ds.cloneWithRows(
                this._nEveryRow(this.state.images, imagesPerRow)
            ),
        });

        callback(this.state.selected, image);
    }

    _nEveryRow(data, n) {
        var result = [],
            temp = [];

        for (var i = 0; i < data.length; ++i) {
            if (i > 0 && i % n === 0) {
                result.push(temp);
                temp = [];
            }
            temp.push(data[i]);
        }

        if (temp.length > 0) {
            while (temp.length !== n) {
                temp.push(null);
            }
            result.push(temp);
        }

        return result;
    }

    _arrayObjectIndexOf(array, property, value) {
        return array.map((o) => {
            return o[property];
        }).indexOf(value);
    }

}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        flex: 1
    },
    marker: {
        position: 'absolute',
        top: 5,
        backgroundColor: 'transparent'
    }
});

module.exports = HFCameraRollPicker;