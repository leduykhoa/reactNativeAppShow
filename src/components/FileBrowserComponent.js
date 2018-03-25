/**
 * Copyright © 2009-2017 Lê Duy Khoa. All rights reserved.
 * Mail: leduykhoa060690@gmail.com
 * Skype: leduykhoa060690
 * Website: web-fast.com
 * Mobile: +84973421508
 * Date: 2018/03/25
 * Time: 16:04
 */


import React, {Component, ProgressBar} from 'react';
import {Button, ListView, Modal, Platform, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

const RNFS = require('react-native-fs');


export default class FileBrowserComponent extends Component {
    pathCurrent = '';
    constructor(props) {
        super(props);

        // Init data source
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
        this.state = {
            modalVisible: false,
            dataSource: ds.cloneWithRows([]),
            filesCurrent:[],
            // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
            pathCurrent: (Platform.OS === 'android') ?  RNFS.DocumentDirectoryPath : RNFS.MainBundlePath
        };

        this.changeItems = this.changeItems.bind(this);
    }

    // Get path of dir
    onClickButtonBack(){
        let pathSub = [];
        let pathArray = this.state.pathCurrent;
        pathArray = pathArray.split("/");

        for(let i = 0; i < pathArray.length - 1; i++){
            pathSub.push(pathArray[i]);
        }
        this.setState({pathCurrent: pathSub.join("/")});
        this.readDir();
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
        this.readDir();
    }

    changeItems(items){
        this.setState({filesCurrent: items});
        let allItem = [];
        // for(let i =0; i++)
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});

        this.setState({dataSource: ds.cloneWithRows(this.state.filesCurrent)});
    }

    // Scanner dir and return files - sub dir
    readDir(){
        RNFS.readDir(this.props.pathCurrent)
            .then((result) => {
                this.changeItems(result);
            })
            .then((contents) => {
                // log the file contents
                // console.log(contents);
            })
            .catch((err) => {
                // console.log(err.message, err.code);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={styles.content}>
                        <View>
                            <Text style={styles.title}>
                                Files browser
                            </Text>
                            <Button
                                onPress={() => {this.onClickButtonBack()}}
                                title="Back"
                                color="#841584"
                                accessibilityLabel="Back"
                            />
                        </View>
                        <View>
                            <Text>{this.state.pathCurrent}</Text>
                            <Text>{this.state.filesCurrent.length}</Text>
                            <ListView
                                dataSource={this.state.dataSource}
                                renderRow={(rowData) => <Text>{rowData.path}</Text>}
                            />
                            <Button
                                onPress={() => {this.setModalVisible(!this.state.modalVisible);}}
                                title="Cancel"
                                color="#841584"
                                accessibilityLabel="Cancel"
                            />
                        </View>
                    </View>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    content:{
        margin: 5
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});