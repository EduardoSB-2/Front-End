import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaga } from '../models/vaga.models';

@Injectable({
  providedIn: 'root'
})
export class VagaService {
  //atributos  -> Localhost
  private apiUrl = "http://localhost:3014/vagas"; //Caminho para o arquivo json


  constructor(private http: HttpClient) { }

  //Comunicação CRUD da API ( get/put/post/delete)

  //obter a lista de vagas (GET)

  getVagas(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(this.apiUrl);
  }

  //Cadastrar

  cadastrarVaga(vaga: Vaga): Observable<Vaga[]>{
    return this.http.post<Vaga[]>(this.apiUrl, vaga);
  }

  //Atualizar
  atualizarVaga(id: any, vaga: Vaga): Observable<Vaga[]>{
    const urlAtualizar = `${this.apiUrl}/${id}`;
    return this.http.put<Vaga[]>(urlAtualizar, vaga);
  }

  //Deletar
  removerVaga(id:any): Observable<Vaga[]>{
    const urlDeletar = `${this.apiUrl}/${id}`;
    return this.http.delete<Vaga[]>(urlDeletar);
  }
}
