import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { EditarPerfilComponent } from 'src/app/modals/editar-perfil/editar-perfil.component';
import { ConfiguracionComponent } from 'src/app/modals/configuracion/configuracion.component';
import { CerrarSesionComponent } from 'src/app/modals/cerrar-sesion/cerrar-sesion.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage {
  constructor(private modalCtrl: ModalController) {}

  async abrirEditarPerfil() {
  const modal = await this.modalCtrl.create({
    component: EditarPerfilComponent
  });

  modal.onDidDismiss().then((result) => {
    if (result.data === 'actualizado') {
      this.ionViewWillEnter();
    }
  });

  await modal.present();
}

  async abrirConfiguracion() {
    const modal = await this.modalCtrl.create({
      component: ConfiguracionComponent,
    });
    await modal.present();
  }

  async abrirCerrarSesion() {
    const modal = await this.modalCtrl.create({
      component: CerrarSesionComponent,
    });
    await modal.present();
  }

  perfil: any = {
  nombre: 'Guardian Estelar',
  fechaNacimiento: '',
  correo: '',
  genero: ''
};

  ionViewWillEnter() {
  console.log('actualizando perfil');
  const guardado = localStorage.getItem('perfilUsuario');
  if (guardado) {
    const datos = JSON.parse(guardado);
    this.perfil.nombre = datos.nombre || 'Guardian Estelar';
    this.perfil.fechaNacimiento = datos.fechaNacimiento || '';
    this.perfil.correo = datos.correo || '';
    this.perfil.genero = datos.genero || '';
  }
}

}
