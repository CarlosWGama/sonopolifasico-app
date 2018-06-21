import { Cycle, CycleType } from '../models/Cycle';


export class CycleUtil {

    /**
     * Recebe um numero inteiro e converte para o tipo do Ciclo
     * @param cycle 
     */
    public static getTypeCycle(cycle: number): CycleType {
        if (cycle == 1) return CycleType.MONOPHASIC;
        if (cycle == 2) return CycleType.BIPHASIC;
        if (cycle == 3) return CycleType.EVERYMAN;
        if (cycle == 4) return CycleType.DYMAXION;
        if (cycle == 5) return CycleType.UBERMAN;
    }

    /**
     * Cria o próximo ciclo com base nas horas do ciclo anterior 
     * @param previousHour  | Hora que acabou o ultimo ciclo  
     * @param previousMinute | Minutos que acabou o ultimo ciclo
     * @param duration  | duração de um ciclo em segundos
     * @param interval  | Intervalo entre os ciclos em horas
     */
    public static nextCycle(previousHour: number, previousMinute: number, duration: number, interval: number): Cycle {
        let startHour = previousHour + interval;
        if (startHour >= 24) startHour -= 24;
     
        return CycleUtil.addMinute(startHour, previousMinute, duration);
    }

    /**
     * Cria o ciclo adicionando a duração em horas
     * @param sHour 
     * @param sMinute 
     * @param hours 
     */
    public static addHour(sHour: number, sMinute: number, hours: number): Cycle {
        let fHour = sHour + hours;
        if (fHour >= 24) fHour -= 24;
        let fMinute = sMinute;

        return new Cycle(sHour, sMinute, fHour, fMinute);

    }

    /**
     * Cria o ciclo adicioandno os minutos
     * @param sHour 
     * @param sMinute 
     * @param minute 
     */
    public static addMinute(sHour: number, sMinute: number, minute: number): Cycle {
        let fHour = sHour;
        let fMinute = sMinute + minute;
        
        //Ajustes
        let hours: number = Math.floor(fMinute / 60); //Verifica quantas horas serão adicioandas
        fHour += hours; //Adiciona as horas
        fMinute = fMinute % 60; //Retonra os minutos que sobrou

        if (fHour >= 24) fHour -= 24;
        
        return new Cycle(sHour, sMinute, fHour, fMinute);
    }
}