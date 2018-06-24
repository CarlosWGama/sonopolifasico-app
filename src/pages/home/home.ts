import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController, PopoverController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { NewCyclePage } from '../new-cycle/new-cycle';
import { CycleProvider } from '../../providers/cycle/cycle';
import { Cycle } from '../../models/Cycle';
import { CreateCustomCycleModalPage } from '../create-custom-cycle-modal/create-custom-cycle-modal';
import { CycleUtil } from '../../Util/CycleUtil';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { OptionMenuPage } from '../option-menu/option-menu';
import { TranslateService } from '@ngx-translate/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';

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

  //=================== TEXTOS TRADUZIDOS ==================//
  private updating: string;
  private textDeleteCycle: string;
  private textCancel: string;
  private textRemove: string;
  private textTitleDeleteAllCycle: string;
  private textMsgDeleteAllCycle: string;
  private textEnableNotification: string;
  private textDisableNotification: string;
  private textNotification: string;
  //=================== [FIM] TEXTOS TRADUZIDOS ==================//

  constructor(public navCtrl: NavController, 
    private cycleProvider: CycleProvider, 
    private alertCtrl: AlertController, 
    private loadCtrl: LoadingController,
    private admobFree: AdMobFree,
    private popoverCtrl: PopoverController,
    private not: LocalNotifications,
    private translate: TranslateService) {

  }

  hour: number;
  minute: number;

  ionViewDidLoad() {
    let time = new Date();
    this.hour = time.getHours();
    this.minute = time.getMinutes();
  
  
    // ADMOB
    const bannerConfig: AdMobFreeBannerConfig = {
      //id: 'ca-app-pub-8890411738087560/6356948030', //Código da propaganda
      isTesting: true,    //Remover isso em produção
      autoShow: true 
     };
     this.admobFree.banner.config(bannerConfig);
     this.admobFree.banner.prepare();


    //Ajusta Cyclos
    this.updateCycles();
  }

  public ionViewWillEnter () {
    //Traduções
    this.translate.get('updating').subscribe(text => this.updating = text);
    this.translate.get('alert_delete_cycle').subscribe(text => this.textDeleteCycle = text);
    this.translate.get('cancel').subscribe(text => this.textCancel = text);
    this.translate.get('remove').subscribe(text => this.textRemove = text);
    this.translate.get('alert_delete_cycle_sleep').subscribe(text => this.textTitleDeleteAllCycle = text);
    this.translate.get('alert_delete_msg_cycle_sleep').subscribe(text => this.textMsgDeleteAllCycle = text);
    this.translate.get('alert_enable_notification').subscribe(text => this.textEnableNotification = text);
    this.translate.get('alert_disable_notification').subscribe(text => this.textDisableNotification = text);
    this.translate.get('notification_time_to_bed').subscribe(text => this.textNotification = text);
    
  }

  /** Atualiza os ciclos e Chart */
  private updateCycles(): void {

    
      let loading = this.loadCtrl.create({
        content: this.updating,
        //dismissOnPageChange: true,
        enableBackdropDismiss: false
      });
  
     // loading.present();
      this.cycleProvider.getAll().then((cycles: Cycle[]) => {
        this.cycles = cycles;
        this.hasCycle = (this.cycles != null && this.cycles.length > 0) 
        this.createClock();
       // loading.dismiss();
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

  /**
   * Habilita | Desabilita notificação
   * @param Cycle
   */
  notification(cycle: Cycle): void {

    let text:string = (cycle.notification ? this.textDisableNotification : this.textEnableNotification);
    this.alertCtrl.create({
      message: text,
      buttons: [
        {text: this.textCancel, role: "cancel"},
        {text: "OK", handler: () => {
          cycle.notification = !cycle.notification;
          let enable: number = (cycle.notification ? 1 : 0);
          this.cycleProvider.updateNotification(cycle.id, enable);

          if (cycle.notification) { //Habilita
            let time = new Date();
            time.setHours(cycle.startHour, cycle.startMinute);
           

            this.not.schedule({
              id: cycle.id,
              title: this.textNotification,
              sound: 'file://sound.mp3',
              //trigger: { every: ELocalNotificationTriggerUnit.DAY , firstAt: time }
              //Precisa trocar no código disponibilizado pela node_modules/@ionic-native/local-notification/index.d.ts desabilitar a interface do every
              trigger: { every: { hour: cycle.startHour, minute: cycle.startMinute, second: 0 }, count: 1 }
            });
          } else { //Disabilita
            this.not.cancel(cycle.id);
          }

        }}
      ]
    }).present();

  
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
      message: this.textDeleteCycle,
      buttons: [
        {text: this.textCancel, role: "cancel"},
        {text: this.textRemove, handler: () => {
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
      title: this.textTitleDeleteAllCycle,
      message: this.textMsgDeleteAllCycle,
      buttons:[
        {text: this.textCancel, role:"cancel"},
        {text: this.textRemove, handler: (data) =>  {
          this.not.cancelAll();
          this.cycleProvider.deleteAll();
          this.navCtrl.setRoot(HomePage); //Atualiza a pagina
        }}
      ]
    }).present();
  }

  /**
   * Abre o menu de opções
   * @param event 
   */
  openOptionMenu(event) {
    let popover = this.popoverCtrl.create(OptionMenuPage);
    popover.present({ev: event});
  }

}
