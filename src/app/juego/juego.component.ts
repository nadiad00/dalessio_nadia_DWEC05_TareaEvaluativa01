import { Component, OnInit } from '@angular/core';
import { Configuracion } from './modelos/Configuracion';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  public formConfig: Configuracion;
  public nombre: string = "";
  public apellido: string = "";
  public numMax: number = 0;
  public numIntentos: number = 0;
  public nombreBool: boolean = false;
  public apellidoBool: boolean = false;
  public numMaxBool: boolean = false;
  public numIntentosBool: boolean = false;
  public validForm: boolean = false;
  public numRandom: number = 0;
  public numGuess: number = 0;
  public resultado: string = "";
  public intentosRestantes: number = 0;


  constructor() {
    this.formConfig = {tuNombre: this.nombre, tuApellido: this.apellido, tuNumMax: this.numMax, tuNumIntentos: this.numIntentos};
  }

  ngOnInit(): void {
  }

  // Al hacer click actualiza el objeto formConfig con los datos del formulario, deshabilita los campos de este y calcula el número a acertar
  getDatos(): void {
    this.formConfig = {tuNombre: this.nombre, tuApellido: this.apellido, tuNumMax: this.numMax, tuNumIntentos: this.numIntentos};
    this.validForm = true;

    for(let i:number = 0; i < document.getElementsByClassName("inputs").length; i++) {
      (document.getElementsByClassName("inputs")[i] as HTMLInputElement).disabled = true;
    }

    this.numRandom = Math.floor(Math.random() * this.formConfig.tuNumMax);

    this.intentosRestantes = this.formConfig.tuNumIntentos;
  }

  // Mira si los campos del formulario, al salir de ellos, son validos. Si lo son habilita el botón, si no lo deshabilita
  onBlurDatos(): void {
    this.nombreBool = false;
    this.apellidoBool = false;
    this.numMaxBool = false;
    this.numIntentosBool = false;

    if(this.nombre === "") {
      this.nombreBool = true;
    }
    if(this.apellido === "") {
      this.apellidoBool = true;
    }
    if(this.numMax < 4) {
      this.numMaxBool = true;
    }
    if(this.numIntentos < 1) {
      this.numIntentosBool = true;
    }
    if(!this.nombreBool && !this.apellidoBool && !this.numMaxBool && !this.numIntentosBool) {
      (document.getElementById("btn-datos") as HTMLButtonElement).disabled = false;
    } else {
      (document.getElementById("btn-datos") as HTMLButtonElement).disabled = true;
    }
  }

  adivinarNumero():void {

    // Registra la cantidad de intentos que quedan y si son 0 muestra una alerta y bloquea el botón
    this.intentosRestantes = this.intentosRestantes - 1;
    if(this.intentosRestantes <= 0) {
      alert("No te quedan intentos");
      (document.getElementById("btn-enviar") as HTMLButtonElement).disabled = true;
    }

    // Mira cuanto de lejos está el numero adivinado comparado con el correcto
    if(this.numGuess > this.numRandom){
      this.resultado = "purple";
    } else if(Number(this.numGuess) === (this.numRandom - 1)) {
      this.resultado = "red";
    } else if(Number(this.numGuess) === (this.numRandom - 2)) {
      this.resultado = "gold";
    } else if(Number(this.numGuess) <= (this.numRandom - 3)) {
      this.resultado = "blue";
    } else {
      this.resultado = "green";
      (document.getElementById("btn-enviar") as HTMLButtonElement).disabled = true;
    }
  }

}
