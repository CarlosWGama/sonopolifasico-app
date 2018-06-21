import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("clock")
  clock;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    
    
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

}
