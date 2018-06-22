import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Button } from 'ionic-angular';
import { CycleProvider } from '../../providers/cycle/cycle';
import { Cycle } from '../../models/Cycle';
import { CycleUtil } from '../../Util/CycleUtil';
import { HomePage } from '../home/home';

/**
 *  @author Carlos W. Gama
 *  @since 1.0.0
 */

@IonicPage()
@Component({
  selector: 'page-create-custom-cycle-modal',
  templateUrl: 'create-custom-cycle-modal.html',
})
export class CreateCustomCycleModalPage {

  sHour: string = "00";
  sMinute: string = "00";
  fHour: string = "00";
  fMinute: string = "00";
  hours: string[] = []

  private cycles: Cycle[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private cycleProvider: CycleProvider,
    private alertCtrl: AlertController) {

    for (let i = 0; i < 24; i++) 
      this.hours.push((i < 10 ? "0"+i : i.toString() ));
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCustomCycleModalPage');
    this.sHour = "00";
    this.sMinute = "00";
    this.fHour = "00";
    this.fMinute = "00";
    this.cycles = this.navParams.get('cycles') as Cycle[];
  }

  /** Cria o ciclo */
  create(): void {
    let newCycle: Cycle = new Cycle(Number(this.sHour), Number(this.sMinute), Number(this.fHour), Number(this.fMinute));

    if (CycleUtil.validateCycle(newCycle, this.cycles)) {
      this.cycleProvider.create(newCycle);
      this.navCtrl.push(HomePage);
    } else {
      this.alertCtrl.create({
        message: "Horário não permitido, conflito como outro ciclo",
        buttons: ['OK']
      }).present(); 
    }
  }

}
