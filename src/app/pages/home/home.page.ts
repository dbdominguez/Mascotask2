import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})

export class HomePage {
  //Por
  nombreMascota = 'Kitty';
  estadoMascota = 75;

  imagenMascota = 'assets/pet/PetStandar.gif';
  habitoActual = 'ejercicio';
  iconoHabitoActual = 'walk-outline';

  //Variables
  habitosHoy: any[] = [];
  progresoGuardado = false;
  fraseActual: string = '';
  frasesMascota: string[] = [];


  constructor(private router: Router, private alertCtrl: AlertController, private toastCtrl: ToastController,) {}


  //Dia Actual
  getDiaActual(): string {
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return dias[new Date().getDay()];
}


  //Para llamar al localstore
  ionViewWillEnter() {
  //Cargar habitos hoy
  const todos = JSON.parse(localStorage.getItem('habitosHoy') || '[]');
  const diaActual = this.getDiaActual();
  this.habitosHoy = todos.filter((habito: any) =>
    habito.dias && habito.dias.includes(diaActual)
  );

  const historial = JSON.parse(localStorage.getItem('historialHabitos') || '[]');
  const hoy = new Date().toLocaleDateString();
  this.progresoGuardado = historial.some((d: any) => d.fecha === hoy);

  //Cargar frases mascota
  const guardadas = JSON.parse(localStorage.getItem('frasesMascota') || '[]');
  this.frasesMascota = guardadas.length ? guardadas : [
    'Meow, ¡No olvides hidratarte!',
    'Vamos bien hoy 💪',
    '*Ronroneo* ¿Ya hiciste ejercicio?',
    'Recuerda respirar profundo 🌬️',
    '¡Demos lo mejor hoy!',
    '¡Meow-tástico!',
    '¿Faltaron hábitos por completar?. Esta bien, ¡a seguir intentándolo!'
  ];

  this.fraseActual = this.frasesMascota[
    Math.floor(Math.random() * this.frasesMascota.length)
  ];
}

  //Guardar progreso de habitos
  guardarProgreso() {
  const todos = JSON.parse(localStorage.getItem('habitosHoy') || '[]');
  const diaActual = this.getDiaActual();

  const actualizados = todos.map((h: any) => {
    const encontrado = this.habitosHoy.find(hh => hh.id === h.id && h.dias.includes(diaActual));
    return encontrado ? { ...h, completado: encontrado.completado } : h;
  });

  localStorage.setItem('habitosHoy', JSON.stringify(actualizados));
}


//Mostrar mensaje
async mostrarToast(mensaje: string) {
  const toast = await this.toastCtrl.create({
    message: mensaje,
    duration: 2000,
    color: 'success',
    position: 'bottom'
  });
  await toast.present();
}


//Guardar progreso del día
async guardarResumenDelDia() {
  const alerta = await this.alertCtrl.create({
    header: '¿Guardar progreso de hoy?',
    message: 'Ojo: Se bloquearán los hábitos marcados y no podrás modificarlos más tarde.',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Guardar',
        handler: () => {
          const fechaHoy = new Date().toLocaleDateString();
          const total = this.habitosHoy.length;
          const cumplidos = this.habitosHoy.filter(h => h.completado).length;

          const historial = JSON.parse(localStorage.getItem('historialHabitos') || '[]');

          const yaExiste = historial.find((d: any) => d.fecha === fechaHoy);
          if (!yaExiste) {
            historial.push({ fecha: fechaHoy, total, cumplidos });
            localStorage.setItem('historialHabitos', JSON.stringify(historial));
            this.progresoGuardado = true;
            this.mostrarToast('✅ Progreso del día guardado correctamente');
          } else {
            this.mostrarToast('ℹ️ El progreso de hoy ya está registrado');
          }
        }
      }
    ]
  });

  await alerta.present();
}
  
  //Navegar a pagina perfil
  goToPerfil() {
    this.router.navigate(['/profile']);
}

  //Pestaña Misiones
  public alertButtons = ['OK'];
  public alertInputs = [
    {
      type: 'checkbox',
      label: 'Cumple con al menos 1 hábitos hoy',
      value: 'habitos_2',
      checked: false,
      disabled: true
    },
    {
      type: 'checkbox',
      label: 'Cumple con todos los hábitos hoy',
      value: 'habitos_todos',
      checked: false,
      disabled: true
    },
    {
      type: 'checkbox',
      label: 'Entra a la aplicación por primera vez',
      value: 'entrada_1',
      checked: true,
      disabled: true
    }
  ];

  
}
