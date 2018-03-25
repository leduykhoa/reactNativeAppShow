/**
 * Copyright © 2009-2017 Lê Duy Khoa. All rights reserved.
 * Mail: leduykhoa060690@gmail.com
 * Skype: leduykhoa060690
 * Website: web-fast.com
 * Mobile: +84973421508
 * Date: 2018/03/25
 * Time: 08:55
 */


import React, { Component } from 'react';
import { Text, View, TextInput, WebView, ListView, Platform } from 'react-native';

import FileBrowserComponent from './FileBrowserComponent';

export default class FormUploadComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Useless Placeholder' };
    }

    render() {
        return (
            <View style={{padding: 10}}>
                {/*<ListView*/}
                    {/*dataSource={this.state.dataSource}*/}
                    {/*renderRow={(rowData) => <Text>{rowData.path}</Text>}*/}
                {/*/>*/}
                <FileBrowserComponent/>
                {/*<View style={{borderWidth:1, borderColor : '#FF0000', flex:1}}>*/}
                    {/*<WebView source={{uri: "file:///android_asset/FormUploadComponent.html"}} style={{marginTop: 20}} />*/}
                {/*</View>*/}
                <Text style={{padding: 10, fontSize: 14}}>
                    {this.state.text}
                </Text>

            </View>
        );
    }
}
