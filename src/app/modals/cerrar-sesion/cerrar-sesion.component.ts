import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.scss'],
  standalone: false,
})
export class CerrarSesionComponent {
  constructor(private modalCtrl: ModalController, private navCtrl: NavController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  confirmar() {
    this.modalCtrl.dismiss();
    this.navCtrl.navigateRoot('/login');
  }
}