import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CreateCyclesModalPage } from '../create-cycles-modal/create-cycles-modal';
import { CycleUtil } from '../../Util/CycleUtil';

/**
 * @author Carlos W. Gama
 */
@IonicPage()
@Component({
  selector: 'page-new-cycle',
  templateUrl: 'new-cycle.html',
})
export class NewCyclePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCyclePage');
  }

  create(cycleType): void {
    this.modalCtrl.create(CreateCyclesModalPage, {cycle: CycleUtil.getTypeCycle(cycleType)}).present();   
  }

}

