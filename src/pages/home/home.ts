import { Component } from '@angular/core';
import { NavController, LoadingController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public carros;

  constructor(public navCtrl: NavController,
    private _htpp: Http,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) {

    let loader = this._loadingCtrl.create({
      content: "Buscando novos carros. Aguarde..."
    });

    loader.present();
    this._htpp
      .get('http://aluracar.herokuapp.com/')
      .map(res=> res.json())
      .toPromise()
      .then(carros => {
        loader.dismiss();
        this.carros = carros;
      },err => {
        console.log(err);
        loader.dismiss();
        this._alertCtrl
        .create({
          title:"Falha na conexão",
          buttons: [{text: 'Estou ciente!'}],
          subTitle: "Não foi possível obter a lista de carros. Tente mais tarde."
        }).present();
      });
  }

}
