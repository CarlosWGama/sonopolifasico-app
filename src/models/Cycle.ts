
export class Cycle {

    public constructor(public startHour: number, public startMinute: number, public finishHour?: number, public finishMinute?: number, public id?: number, public notification?: boolean) {
        this.startHour = this.adjustHour(this.startHour);
        this.finishHour = this.adjustHour(this.finishHour);
    }

    private adjustHour(hour: number): number {
        return (hour < 24 ? hour : hour - 24 );
    }

    get duration(): number {
        let duration = 0;
        let fHour = (this.finishHour >= this.startHour ? this.finishHour : this.finishHour + 24);
        let hours = fHour - this.startHour;

        duration = (hours * 60) - this.startMinute + this.finishMinute; 

        return duration;
    }
}


export enum CycleType {
    MONOPHASIC, BIPHASIC, EVERYMAN, DYMAXION, UBERMAN
}