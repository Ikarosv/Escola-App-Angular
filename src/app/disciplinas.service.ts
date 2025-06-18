import { Injectable } from '@angular/core';
import { Disciplina } from './lista-de-disciplinas/disciplina.model';
import { HttpClient } from '@angular/common/http';
import disciplinas from '../../public/assets/disciplinas.json';


@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {
  API_URL = 'http://localhost:3000'
  private disciplinas: Disciplina[] = [];
  private novo_id = disciplinas.length + 1;

  constructor(private http: HttpClient) {
    this.todas().subscribe(data => this.disciplinas = data)
  }

  todas() {
    return this.http.get<Disciplina[]>(this.API_URL + '/disciplinas')
  }

  salvar(id: number | null, nome: string, descricao?: string) {
    let disciplina = {
      id,
      nome,
      descricao
    }
    if (id) {
      console.log('salvar', disciplina)
      return this.http.patch(this.API_URL + "/disciplinas/" + id, disciplina)
      /* let d = this.encontrar(id);
      if (d) {
        d.nome = nome;
        d.descricao = descricao;
        return d;
      }
      throw new Error('Disciplina não encontrada'); */
    } else {
      disciplina.id = this.gerarProximoId()
      console.log('salvar', disciplina)
      return this.http.post(this.API_URL + '/disciplinas', disciplina, {
        observe: 'body'
      })
    }
    /* const disciplina = new Disciplina(this.novo_id, nome, descricao);
    if (this.disciplinas === null) {
      this.disciplinas = [];
    }
    this.disciplinas.push(disciplina);
    this.novo_id++; */
    /* return disciplina; */
  }

  excluir(disciplina: number | Disciplina) {
    let id;
    if (typeof disciplina == 'number') {
      id = disciplina
    } else {
      id = disciplina.id
    }
    console.log(this.API_URL + '/disciplinas/' + id)
    return this.http.delete(this.API_URL + '/disciplinas/' + id)
   /*  let d = null;
    if (this.disciplinas === null) {
      throw new Error('Disciplinas não carregadas');
    }
    if (typeof disciplina === 'number') {
      d = this.encontrar(disciplina);
      if (!d) {
        throw new Error('Disciplina não encontrada');
      }
    } else {
      const index = this.disciplinas.indexOf(disciplina);
      if (index > -1) {
        this.disciplinas.splice(index, 1);
      } else {
        throw new Error('Disciplina não encontrada');
      }
    } */
  }

  /* encontrar(arg: number | string): Disciplina | null {
    return this.http.get<Disciplina | null>(this.API_URL + '/disciplinas/' + arg)
    if (this.disciplinas === null) {
      throw new Error('Disciplinas não carregadas');
    }
    if (typeof arg === 'number') {
      return this.disciplinas.find(d => d.id === arg) || null;
    } else if (typeof arg === 'string') {
      return this.disciplinas.find(d => d.nome?.toLowerCase() === arg.toLowerCase()) || null;
    }
    return null;
  } */

  gerarProximoId() {
    this.todas().subscribe((data) => this.disciplinas = data)
    if (this.disciplinas?.length === 0) return 1;

    const maiorId = Math.max(...this.disciplinas?.map((d) => d.id));
    return maiorId + 1
  }
}
