import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export interface CardTypeSleepProps {
    card: any
}

/**
 * Card dos tipos de Sonos
 * @param props 
 */
export function CardTypeSleep (props: CardTypeSleepProps) {
    const navigation = useNavigation()
    return (
      <Card containerStyle={styles.card}>
          <Image source={props.card.imagem} style={styles.img}/>
          <Text style={styles.titulo}>{props.card.titulo}</Text>
          <Text style={styles.descricao}>{props.card.descricao}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <View style={styles.botao}>
                    <Icon  name="alarm"/>
                    <Text style={{fontSize: 18}}>Criar</Text>
            </View>
          </TouchableOpacity>
      </Card>
    );
}


const styles = StyleSheet.create({
    card: {
        height: 400,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: { height: 250, width: 250},
    titulo: {fontSize: 25, textAlign:'center'},
    descricao: {fontSize: 14, textAlign:'center'},
    botao: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20
    }
});