import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { NewCyclePage } from '../new-cycle/new-cycle';
import { CycleProvider } from '../../providers/cycle/cycle';
import { Cycle } from '../../models/Cycle';
import { CreateCustomCycleModalPage } from '../create-custom-cycle-modal/create-custom-cycle-modal';
import { CycleUtil } from '../../Util/CycleUtil';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';


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

  /** COR USADA PARA OS CICLOS NO RELOGIO */
  private readonly CYCLE_COLOR: string = 'rgba(86, 206, 86, 0.5)';
  /** COR USADA PARA OS INTERVALOS NO RELOGIO */
  private readonly INTERVAL_COLOR: string = 'rgba(255, 255, 255, 0)';

  constructor(public navCtrl: NavController, 
    private cycleProvider: CycleProvider, 
    private alertCtrl: AlertController, 
    private loadCtrl: LoadingController,
    private admobFree: AdMobFree) {

  }

  ionViewDidLoad() {
    // ADMOB
    const bannerConfig: AdMobFreeBannerConfig = {
      //id: 'ca-app-pub-8890411738087560/6356948030', //Código da propaganda
      isTesting: true,    //Remover isso em produção
      autoShow: true 
     };
     this.admobFree.banner.config(bannerConfig);
     this.admobFree.banner.prepare();


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
      this.createClock();
      loading.dismiss();
    });
  }

  /**
   * Cria o relógio
   */
  private createClock() {
    
    var tempo: number[] = CycleUtil.getClockPercent(this.cycles);
    var cores = [];
    let change = true;
    
    tempo.forEach((x) => {
      cores.push((change ? this.CYCLE_COLOR : this.INTERVAL_COLOR));
      change = !change;
    });

    let positionRotation:number = 1;
    if (this.cycles.length > 0) 
      positionRotation = this.cycles[0].startHour + ((this.cycles[0].startMinute)/60);
    
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
        rotation: -1.05 * 0.25 * (6 - positionRotation),
        cutoutPercentage: 65,
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
          this.navCtrl.setRoot(HomePage); //Atualiza a pagina
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
          this.navCtrl.setRoot(HomePage); //Atualiza a pagina
        }}
      ]
    }).present();
  }

}
