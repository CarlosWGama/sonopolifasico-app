import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { appStyle } from '../../theme/styles';
import { I18n } from '../../utils/i18n';
import { AppHeader } from '../../components/app-header';
import { ConfigHome } from './components';
import { Ciclo } from '../../models/ciclo';

export interface HomeState {
    i18n: any;
    modalConfig: boolean;
    ciclos: Ciclo[];
}

export default class HomeScreen extends React.Component<any, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
        i18n: {},
        modalConfig: false,
        ciclos:[]
    };  
  }

  async componentDidMount() {
    //Busca os textos
    this.setState({ciclos: [
      new Ciclo(20, 30, 21, 30, '1', true),
      new Ciclo(22, 30, 23, 30, '2', true)
    ]}) 
    await this._atualizarTextos();
  }

  /** Atualiza os idiomas */
  async _atualizarTextos() {
    //Busca os textos 
    this.setState({
        i18n: {
            title_your_cycles:await I18n.Instance.texto('title_your_cycles'),
            not_has_cycle:await I18n.Instance.texto('not_has_cycle'),
            create_new_cycle:await I18n.Instance.texto('create_new_cycle'),
        }
    })
  }

  /** Atualiza os textos para o idioma correto sempre que atualiza a tela */
  async _fecharModal() {
    this.setState({modalConfig: false})
    this._atualizarTextos();
  }

  // ============================================= RENDER ===========================================//
  /** Componentes a serem exibidos quando não há ciclo criado ainda */
  _renderSemCiclo = () => (
      <View>          
          {/* Exibe caso não exista nenhum Ciclo cadastro no usuário */}
          <View style={styles.not_has_cycle}>
            <Text style={{textAlign:'center'}}>{this.state.i18n.not_has_cycle}</Text>
          </View>
        
          {/* Botão para cadastrar novo sono polifasico */}
          <Button 
            title={this.state.i18n.create_new_cycle} 
            buttonStyle={styles.create_new_cycle} 
            onPress={() => this.props.navigation.navigate('new_cycle')}
            />
      </View>
  )

  /** Conteúdo a ser exibido se existir ciclos */
  _renderCiclos = () => {
    const { i18n } = this.state;
    const { navigation } = this.props;
    return (
      <View style={appStyle.main}>
        <Text>Olá mundo</Text>
      </View>
    );
  }

  /** Renderizar a tela */
  public render() {
    const {i18n} = this.state;
    const {navigation} = this.props;
    return (
      <View style={appStyle.container}>
          {/* HEADER */}
          <AppHeader titulo={i18n.title_your_cycles} config onConfigClick={() => this.setState({modalConfig:true})}/>

          {/* CONTEUDO PRINCIPAL */}
          {this.state.ciclos.length == 0 ? this._renderSemCiclo() : this._renderCiclos()}

          {/* MODAL DO CONFIG  */}
          <ConfigHome modalAberto={this.state.modalConfig} fechouModal={() => this._fecharModal()}/>
            
      </View>
    );
  }
}

const styles = StyleSheet.create({
    not_has_cycle: {
        padding: 10,
        backgroundColor: 'white',
        margin:10,
        borderRadius: 5
    },
    create_new_cycle: {
        backgroundColor: 'orange'
    }

});
