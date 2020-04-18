import * as React from 'react';
import { View, Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface AppHeaderProps {
    titulo: string
    back?: boolean;
    config?: boolean;
    onConfigClick?: any;
}

export function AppHeader (props: AppHeaderProps) {
    const navigation = useNavigation();
    let leftComponent = <View/>;
    if (props.back) {
        leftComponent = (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" color="white"/>
            </TouchableOpacity>
        )
    }

    let rightComponent = <View/>;
    if (props.config) {
        rightComponent = (
            <TouchableOpacity onPress={() => props.onConfigClick()}>
                <Icon name="settings" color="white"/>
            </TouchableOpacity>
        )
    }

    return (
      <Header
        leftComponent={leftComponent}
        containerStyle={{backgroundColor:'black', height: 70, paddingBottom: 15, justifyContent:'space-around'}}
        centerComponent={{text:props.titulo, style: {color:'white', fontSize: 20}}}
        rightComponent={rightComponent}
      />
    );
}
