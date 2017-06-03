import { Component } from "@angular/core";
import { NavParams } from 'ionic-angular';
import { Acessorio } from '../../domain/carro/acessorio';
import { Carro } from '../../domain/carro/carro';
@Component({
  templateUrl: "escolha.html"
})
export class EscolhaPage{

  public carro: Carro;
  public acessorios: Acessorio[];
  private _precoTotal: number;


  constructor(public navParams: NavParams){
    this.carro = this.navParams.get('carroSelecionado');
    this._precoTotal = this.carro.preco;
    this.acessorios = [
      {nome: 'Freio ABS', preco:800 },
      {nome: 'Ar-condicionado', preco: 1000},
      {nome: 'MP3 Player', preco: 500}
    ];
  }

  get precoTotal(){
    return this._precoTotal;
  }

  atualizaTotal(ligado: boolean, acessorio: Acessorio){
    ligado ?
      this._precoTotal += acessorio.preco :
      this._precoTotal -= acessorio.preco;
  }
}
