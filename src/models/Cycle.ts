
export class Cycle {

    public constructor(public startHour: number, public startMinute: number, public finishHour?: number, public finishMinute?: number, public id?: number) {
        this.startHour = this.adjustHour(this.startHour);
        this.finishHour = this.adjustHour(this.finishHour);
    }

    private adjustHour(hour: number): number {
        return (hour < 24 ? hour : hour - 24 );
    }
}


export enum CycleType {
    MONOPHASIC, BIPHASIC, EVERYMAN, DYMAXION, UBERMAN
}