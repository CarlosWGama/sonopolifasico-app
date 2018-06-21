import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Cycle, CycleType } from '../../models/Cycle';
import { CycleUtil } from '../../Util/CycleUtil';

/**
 * @author Carlos W. Gama
 */

@IonicPage()
@Component({
  selector: 'page-create-cycles-modal',
  templateUrl: 'create-cycles-modal.html',
})
export class CreateCyclesModalPage {

  sHour: string = "00";
  sMinute: string = "00";
  hours: string[] = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loadCtrl: LoadingController) {
    
    for (let i = 0; i < 24; i++) 
      this.hours.push((i < 10 ? "0"+i : i.toString() ));
  
  }

  ionViewDidLoad() {
   this.sHour = "00";
   this.sMinute = "00";
  }

  /** Fecha a janela */
  close(): void {
    this.viewCtrl.dismiss();
  }

  /** Cria os ciclos do usuário */
  create(): void {
    //Loading 
    let loading = this.loadCtrl.create({
      content: "Aguarde, estamos criando os ciclos",
      duration: 5000,
      dismissOnPageChange: true,
      enableBackdropDismiss: false
    });
    loading.present();

    //Criar ciclos
    let cycles: Cycle[] = [];
    let cycleType = this.navParams.get("cycle") as CycleType;
    let lastCycle: Cycle = null;

    switch(cycleType) {
      case CycleType.MONOPHASIC:
        //Ciclo 1
        lastCycle = CycleUtil.addHour(parseInt(this.sHour), parseInt(this.sMinute), 8);
        cycles.push(lastCycle);
        break;
      case CycleType.BIPHASIC:
        //Ciclo 1
        lastCycle = CycleUtil.addHour(parseInt(this.sHour), parseInt(this.sMinute), 6);
        cycles.push(lastCycle);

        //Ciclo 2
        lastCycle = CycleUtil.nextCycle(lastCycle.finishHour, lastCycle.finishMinute, 30, 6);
        cycles.push(lastCycle);

        break;
      case CycleType.EVERYMAN:
        //Ciclo 1
        lastCycle = CycleUtil.addHour(parseInt(this.sHour), parseInt(this.sMinute), 3);
        cycles.push(lastCycle);

        //Ciclo 2
        lastCycle = CycleUtil.nextCycle(lastCycle.finishHour, lastCycle.finishMinute, 20, 5);
        cycles.push(lastCycle);

        //Ciclo 3
        lastCycle = CycleUtil.nextCycle(lastCycle.finishHour, lastCycle.finishMinute, 20, 5);
        cycles.push(lastCycle);

        //Ciclo 4
        lastCycle = CycleUtil.nextCycle(lastCycle.finishHour, lastCycle.finishMinute, 20, 5);
        cycles.push(lastCycle);

        break;
      case CycleType.DYMAXION:
        //Ciclo 1
        lastCycle = CycleUtil.addMinute(parseInt(this.sHour), parseInt(this.sMinute), 30);
        cycles.push(lastCycle);

        //Ciclo 2
        lastCycle = CycleUtil.nextCycle(lastCycle.finishHour, lastCycle.finishMinute, 20, 6);
        cycles.push(lastCycle);

        //Ciclo 3
        lastCycle = CycleUtil.nextCycle(lastCycle.finishHour, lastCycle.finishMinute, 20, 6);
        cycles.push(lastCycle);

        //Ciclo 4
        lastCycle = CycleUtil.nextCycle(lastCycle.finishHour, lastCycle.finishMinute, 20, 6);
        cycles.push(lastCycle);

        break;
      case CycleType.UBERMAN:
        //Ciclo 1
        lastCycle = CycleUtil.addMinute(parseInt(this.sHour), parseInt(this.sMinute), 20);
        cycles.push(lastCycle);

        //Ciclo 2
        lastCycle = CycleUtil.nextCycle(lastCycle.finishHour, lastCycle.finishMinute, 20, 3);
        cycles.push(lastCycle);

        //Ciclo 3
        lastCycle = CycleUtil.nextCycle(lastCycle.finishHour, lastCycle.finishMinute, 20, 4);
        cycles.push(lastCycle);

        //Ciclo 4
        lastCycle = CycleUtil.nextCycle(lastCycle.finishHour, lastCycle.finishMinute, 20, 3);
        cycles.push(lastCycle);
        
        //Ciclo 5
        lastCycle = CycleUtil.nextCycle(lastCycle.finishHour, lastCycle.finishMinute, 20, 4);
        cycles.push(lastCycle);

        //Ciclo 6
        lastCycle = CycleUtil.nextCycle(lastCycle.finishHour, lastCycle.finishMinute, 20, 3);
        cycles.push(lastCycle);
        break;
    }

    console.log(cycles);
  }

}
