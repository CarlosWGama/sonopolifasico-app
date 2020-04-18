import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { AppModal } from '../../components/app-modal';
import AsyncStorage from '@react-native-community/async-storage';
import { I18n } from '../../utils/i18n';

export interface ConfigHomeProps {
    modalAberto: boolean;
    fechouModal?:any;
}



export function ConfigHome (props: ConfigHomeProps) {
    const [idioma, setIdioma] = useState('pt-BR'); 
    //Inicializa a variavel de idiomas
    useEffect(() => {
        (async () => { 
            setIdioma(await AsyncStorage.getItem('app-lang'));
        })()
    }, [])

    return (
      <AppModal 
        visivel={props.modalAberto}
        onCancelar={() => props.fechouModal()}
        onConfirmar={async () => {
            await I18n.Instance.atualizarLang(idioma);
            props.fechouModal()
        }}>
            
            <Picker selectedValue={idioma} onValueChange={(lang) => {setIdioma(lang);}}>
                <Picker.Item label="Português" value="pt-BR"/>
                <Picker.Item label="English" value="en"/>
            </Picker>

      </AppModal>
    );
}
