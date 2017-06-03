import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,Alert } from 'ionic-angular';
import { Carro } from '../../domain/carro/carro';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
@Component({
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  public agendamento: Agendamento;
  private _alerta: Alert;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _http: Http,
    private _alertCtrl: AlertController
  ) {

    this.carro = this.navParams.get('carro');
    this.precoTotal = this.navParams.get('precoTotal');
    this.agendamento = new Agendamento(this.carro, this.precoTotal);

    this._alerta = this._alertCtrl.create({
      title: "Aviso",
      buttons: [
        {text: "Ok",
        handler: () =>{
          this.navCtrl.setRoot(HomePage);
        }
      }]
    });
  }

  agenda(){
    if(!this.agendamento.nome || !this.agendamento.endereco || !this.agendamento.email){
      this._alertCtrl.create({
        title:"Preenchimento obrigatório",
        subTitle: "Você deve preencher todas as informações",
        buttons: [{text: "Ok"}]
      }).present();
      return;
    }

    let api = `http://aluracar.herokuapp.com/salvarperdido?carro=${this.agendamento.carro.nome}&preco=${this.agendamento.valor}&nome=${this.agendamento.nome}&endereco=${this.agendamento.endereco}&email=${this.agendamento.email}&dataAgendamento=${this.agendamento.data}`;
    this._http
    .get(api)
    .toPromise()
    .then(() => {
      this._alerta.setSubTitle('Agendamento realizado com sucesso!')
      this._alerta.present();
    })
    .catch(err => {
      console.log(err);
      this._alerta.setSubTitle('Não foi possível realizar o agendamento :(')
      this._alerta.present();
    });
  }



}
