import * as React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { I18n } from '../utils/i18n';

export interface AppProps {
    children:any;   //Elementos do modal
    titulo?:string; //Possui um titulo
    visivel:boolean; //Exibe ou não Modal
    onConfirmar?:any; //Função ao clicar no botão Confirmar
    onCancelar?:any; //Função ao clicar no botão Cancelar
}

/**
 * Cria um Modal customizável 
 * @param props 
 */
export function AppModal (props: AppProps) {

    const [confirmarLabel, setConfirmarLabel] = React.useState('');
    const [cancelarLabel, setCancelarLabel] = React.useState('');
  
    
    React.useEffect(() => {
        (async () => {
            setConfirmarLabel(await I18n.Instance.texto('confirm'));
            setCancelarLabel(await I18n.Instance.texto('cancel'));
        })()
    }, [])

    return (
      <Modal visible={props.visivel} animationType="slide" transparent>
          {/* Centraliza o Modal */}
           <View style={styles.modal}> 
            {/* Cria um fundo branco e arrendondado */}
            <View style={styles.container}> 
                {props.titulo != null && <Text style={styles.titulo}>{props.titulo}</Text>}
                
                {/* Exibe os conteúdos passado externamente */}
                {props.children}

                {/* Ajustar os botões */}
                <View style={styles.btns}>
                    <Button title={confirmarLabel} onPress={props.onConfirmar} type="clear" />
                    <Button title={cancelarLabel} onPress={props.onCancelar}  type="clear" />
                </View>
            </View>
          </View>
      </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'stretch',
        padding: 20,
    },
    titulo: {
        fontSize: 20
    },
    container: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    btns: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

