import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';
import { Ciclo } from '../models/ciclo';

/**
 * Classe responsável por manter os ciclos dos usuários
 */
export class CicloProvider {

    /**
     * Busca um ciclo
     */
    public async buscar(): Promise<Ciclo[]> {
        const ciclosJSON = await AsyncStorage.getItem('ciclos');
        if (!ciclosJSON) return [];
        
        //Recupera os dados no formato Cycle[]
        const dados = JSON.parse(ciclosJSON);
        const ciclos = dados.map(c => Object.assign(new Ciclo, c));
        return ciclos;
    }

    /**
     * Cadastra um novo ciclo
     * @param ciclo 
     */
    public async cadastrar(ciclo: Ciclo) {
        ciclo.id = uuid.v1();
        const ciclos = await this.buscar();
        ciclos.push(ciclo);

        const ciclosJSON = JSON.stringify(ciclos);
        AsyncStorage.setItem('ciclos', ciclosJSON);
    }
    
    /**
     * Remove um Ciclo
     * @param id do ciclo
     */
    public async remover(id: string) {
        const ciclos = await this.buscar();
        const indexRemove = ciclos.map(c => c.id).indexOf(id);
        
        //Remove
        if (indexRemove != -1) {
            ciclos.splice(indexRemove, 1);
            const ciclosJSON = JSON.stringify(ciclos);
            AsyncStorage.setItem('ciclos', ciclosJSON);
        }
    }

    /**
     * Atualiza um ciclo
     * @param ciclo 
     */
    public async atualizar(ciclo: Ciclo) {
        const ciclos = await this.buscar();
        const index = ciclos.map(c => c.id).indexOf(ciclo.id);
        
        //Remove
        if (index != -1) {
            ciclos[index] = ciclo;
            const ciclosJSON = JSON.stringify(ciclos);
            AsyncStorage.setItem('ciclos', ciclosJSON);
        }
    }

}