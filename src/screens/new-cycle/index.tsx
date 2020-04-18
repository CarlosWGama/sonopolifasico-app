import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { appStyle } from '../../theme/styles';
import { AppHeader } from '../../components/app-header';
import { I18n } from '../../utils/i18n';
import { CardTypeSleep } from './components';
import Carousel from 'react-native-snap-carousel';

export interface NewCycleState {
    i18n: any
    cards: {titulo:string, descricao: string, imagem:any, id:number}[]
}

/**
 * Tela de seleção do tipo de sono polifásico para criação de um novo ciclo
 */
export default class NewCycleScreen extends React.Component<any, NewCycleState> {
  constructor(props: any) {
    super(props);
    this.state = { 
        i18n: {},
        cards:[]
    };
  }

  async componentDidMount() {
      this.setState({
        //Coleta as traduções
        i18n: {
            title_new_cycle: await I18n.Instance.texto('title_new_cycle'),
            show_cards: await I18n.Instance.texto('show_cards')
        },
        //Cards dos tipos de sonos
        cards: [
            {titulo: await I18n.Instance.texto('monophasic'), descricao: await I18n.Instance.texto('monophasic_description'), imagem: require('./../../../assets/cycles/monophasic.png'), id:1},
            {titulo: await I18n.Instance.texto('biphasic'), descricao: await I18n.Instance.texto('biphasic_description'), imagem: require('./../../../assets/cycles/biphasic.png'), id:2},
            {titulo: await I18n.Instance.texto('everyman'), descricao: await I18n.Instance.texto('everyman_description'), imagem: require('./../../../assets/cycles/everyman.png'), id:3},
            {titulo: await I18n.Instance.texto('dymaxion'), descricao: await I18n.Instance.texto('dymaxion_description'), imagem: require('./../../../assets/cycles/dymaxion.png'), id:4},
            {titulo: await I18n.Instance.texto('uberman'), descricao: await I18n.Instance.texto('uberman_description'), imagem: require('./../../../assets/cycles/uberman.png'), id:5}
        ]
      })
  }

  public render() {
    const { i18n } = this.state;
    return (
        <View style={appStyle.container}>
            <AppHeader back titulo={i18n.title_new_cycle} />
    
            <View style={appStyle.main}>
                <Text style={{color:'white', textAlign:'center', fontSize: 17}}>{i18n.show_cards}</Text>
                
                {/* Carrosel com os cards dos tipos de sono polifasicos */}
                <Carousel
                    layout={'stack'} 
                    data={this.state.cards}
                    renderItem={({item, index}) => <CardTypeSleep card={item} key={item.id}/>}
                    sliderWidth={400}
                    itemWidth={350}/>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    
});
