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

    public static validateCycle(newCycle: Cycle, cycles: Cycle[]): boolean {
        let valid = true;

        cycles.forEach((c: Cycle) => {
            //Normatizando ciclo para validação de hora inicila com hora final
            let nFinishHour = (newCycle.finishHour >= newCycle.startHour ? newCycle.finishHour : newCycle.finishHour + 24);
            let cFinishHour = (c.finishHour >= c.startHour ? c.finishHour : c.finishHour + 24);

            // =========== MESMO HORARIO ==============//
            if ((newCycle.startHour == c.startHour && c.startMinute == newCycle.startMinute) ||
                (newCycle.startHour == c.finishHour && c.finishMinute == newCycle.startMinute) ||
                (newCycle.finishHour == c.startHour && c.startMinute == newCycle.finishMinute) ||
                (newCycle.finishHour == c.finishHour && c.finishMinute == newCycle.finishMinute))
                    valid = false;
                   
            //============  Horario inicial ============//
            //Está entre
            if (c.startHour < newCycle.startHour && newCycle.startHour < cFinishHour) 
                valid = false;

            //Está na mesma hora inicial, porém minutos diferentes e válidos
            if ((newCycle.startHour == c.startHour && c.startMinute < newCycle.startMinute) &&
                (newCycle.startHour < cFinishHour ||
                (newCycle.startHour == c.finishHour && c.finishMinute > newCycle.startMinute))) 
                valid = false;

            //============ Horario final ==============/
            if (c.startHour < nFinishHour && nFinishHour < cFinishHour)
                valid = false;

            //Está na mesma hora Final, porém minutos diferentes e inválidos
            if (newCycle.finishHour == c.startHour && c.startMinute <= newCycle.finishMinute)  
                valid = false;

            //============ CHECANDO SE TEM CICLO DENTRO DO NOVO =============/
            if (newCycle.startHour < c.startHour && nFinishHour > cFinishHour) 
                valid = false;
        });

        return valid;
    } 

    /** Busca a porcentagem que cada horario ocupa */
    public static getClockPercent(cycles: Cycle[]): number[] {
        let percents: number[] = [];
        let day: number = 24 * 60;

        /** Recuper ao intervalo */
        let lastCycle: Cycle = null;
        /** Recupera o restante do temp dia que falta */
        let rest: number = day;
        cycles.forEach((c: Cycle) => {
            //Intervalo em relação ao ultimo ciclo
            if (lastCycle != null) {
                let duration = 0;
                let sHour = (lastCycle.finishHour <= c.startHour ? c.startHour : c.startHour + 24);
                let hours = sHour - lastCycle.finishHour;
               
                duration = (hours * 60) + c.startMinute - lastCycle.finishMinute;
               
                let percent = (duration * 100) / day;
                percents.push(percent);
                rest -= duration; 
            }
           
            //Porcentgaem do ciclo atual
            let percent = (c.duration * 100) / day;
            percents.push(percent);
            rest -= c.duration;
          
            lastCycle = c;
        });

        //Adiciona o horario que sobrou do dia
        if (rest > 0) {
            let percent = (rest * 100) / day;
            percents.push(percent);
        }
        return percents;
    }
}