import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController, Button } from 'ionic-angular';
import { Chart } from 'chart.js';
import { NewCyclePage } from '../new-cycle/new-cycle';
import { CycleProvider } from '../../providers/cycle/cycle';
import { Cycle } from '../../models/Cycle';
import { CreateCustomCycleModalPage } from '../create-custom-cycle-modal/create-custom-cycle-modal';

/**
 * @author Carlos W. Gama
 * @since 1.0.0
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("clock")
  clock: any;

  hasCycle: boolean = false;
  cycles: Cycle[] = [];

  constructor(public navCtrl: NavController, 
    private cycleProvider: CycleProvider, 
    private alertCtrl: AlertController, 
    private loadCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    this.updateCycles();
  }

  /** Atualiza os ciclos e Chart */
  private updateCycles(): void {
    let loading = this.loadCtrl.create({
      content:"Atualizando",
      //dismissOnPageChange: true,
      enableBackdropDismiss: false
    });

    loading.present();
    this.cycleProvider.getAll().then((cycles: Cycle[]) => {
      this.cycles = cycles;
      this.hasCycle = (this.cycles != null && this.cycles.length > 0) 
      //this.createClock();
      loading.dismiss();
    });
  }

  /**
   * Cria o relógio
   */
  private createClock() {
    
    var tempo = [];
    var cores = [];
    

    tempo = [3, 4.5, 0.2, 4];
    cores = [
      'rgba(86, 206, 86, 0.5)',
      'rgba(255, 255, 255, 0)',
      'rgba(86, 206, 86, 0.5)',
      'rgba(255, 255, 255, 0)'
    ];

    this.clock = new Chart(this.clock.nativeElement, {
      type: 'doughnut',
      data: {
          datasets: [{
              data: tempo,
              backgroundColor: cores
          }]
      },
      options: {
        tooltips: {enabled: false},
        animation: {animateRotate: false},
        rotation: -1.05 * 0.5 * (3),
        cutoutPercentage: 0,
        legend: {
          display: false
        }
      }
    });
  }

  /** Redireciona para a página de Criar novo Ciclo de Sono */
  newSleepCycle(): void {
    this.navCtrl.push(NewCyclePage);
  }

  /**
   * cria um unico cclo
   */
  newCycle(): void {
    this.navCtrl.push(CreateCustomCycleModalPage, {cycles: this.cycles});
  }

  /**
   * Deleta um ciclo 
   * @param id |ID do ciclo
   */
  delete(id: number): void {
    this.alertCtrl.create({
      message: "Tem certeza que deseja deletar esse ciclo?",
      buttons: [
        {text: "Cancelar", role: "cancel"},
        {text: "Excluir", handler: () => {
          this.cycleProvider.delete(id);
          this.updateCycles();
        }}
      ]
    }).present();
    
  }

  /**
   * Apaga todos ciclos ativos
   */
  deleteAll(): void {
    this.alertCtrl.create({
      title: "Deletar todos ciclos",
      message: "Essa ação não pode ser desfeita",
      buttons:[
        {text: "Cancelar", role:"cancel"},
        {text: "Excluir", handler: (data) =>  {
          this.cycleProvider.deleteAll();
          this.updateCycles();
        }}
      ]
    }).present();
  }

}
