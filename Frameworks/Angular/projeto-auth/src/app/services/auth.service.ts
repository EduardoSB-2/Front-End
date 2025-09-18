import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //atributos
  private apiUrl = 'http://localhost:3015/usuarios';
  private readonly CHAVE_AUTH =  'usuarioLogado';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  registrar(usuario:any):Observable<any>{
    //primeiro busca no banco de dados se o email cadastrado já existe
    return this.http.get<any[]>(`${this.apiUrl}?email=${usuario.email}`).pipe(
      switchMap(usuarios=>{
        if(usuarios.length>0){ //caso exista
          //cria uma mensagem de erro para ser tratada no try/catch
        return throwError (()=> new Error('Usuario já Cadastrado'));
        }else{//caso não exista
          //cadastra o usuario no BD
          return this.http.post(this.apiUrl, usuario);
        }
      })
    )
  }

  login(credenciais: any): Observable<boolean>{
    //pega as credenciais do usuario (email e senha)
    return this.http.get<any[]>(
      //verifica no BD se o email e senha foramm encontrados
      `${this.apiUrl}?email=${credenciais.email}&senha=${credenciais.senha}`).pipe(
      map(usuarios => {
        if(usuarios.length>0){// se foi encontrado
          //armazena as informações do usuario e a chave no LocalStorage
          localStorage.setItem(this.CHAVE_AUTH, JSON.stringify(usuarios[0]));
          //retorna que o acesso foi permitido
          return true;
        }else{ //caso não encontrado
          // fazer um erro
          //retornar que meu usuario não esta permitido ao acesso
          return false;
        }
      })
    )
  }

  logout(){
    localStorage.removeItem(this.CHAVE_AUTH); //remove a chave de autenticaçao do usuario
    this.router.navigate(['/home']); // redireciona para a página home
  }

  //verificar se o usuario já esta logado (CHAVE_AUTH)
  estaAutenticado():boolean{
    //vou transformar uma variavel do tipo texto em boolean
    return !!localStorage.getItem(this.CHAVE_AUTH) //vai retornar true ou false
  }

  //pegar as informações do usuario no LocalStorage
  getUsuarioAtual(): any{
    //retorna as informações do usuario autenticado, que esta armazenado no LocalStorage
    return JSON.parse(localStorage.getItem(this.CHAVE_AUTH) || "{}");
  }
}
