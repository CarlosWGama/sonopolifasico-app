import AsyncStorage from '@react-native-community/async-storage';

/**
 * Classe criada para buscaro os textos em diferentes idiomas
 */
export class I18n {
    private static instante:I18n;
    public lang: string|null = '';

    static get Instance() {
        if (I18n.instante == null){
            I18n.instante = new I18n();
            I18n.instante.initialize();
        }
        return I18n.instante;
    }

    private constructor() { }

    private async initialize() {
        this.lang = await AsyncStorage.getItem('app-lang');
        if (!this.lang) this.lang = 'en';
    }

    public async atualizarLang(lang: string) {
        try {
            await AsyncStorage.setItem('app-lang', lang);
        } catch(erro) {
            console.log(erro)
        }
        this.lang = lang;
    }

    public texto(texto: string) {
        console.log(this.lang, texto);
        if (!this.lang) this.lang = 'en';
        let pacoteIdiomas = null;
        switch(this.lang) {
            case 'pt-BR': pacoteIdiomas = require('./../assets/i18n/pt-BR.json'); break;
            default: pacoteIdiomas = require('./../assets/i18n/en.json'); break;
        }
        if (pacoteIdiomas[texto]) 
            return pacoteIdiomas[texto]
        return null;
    }


}