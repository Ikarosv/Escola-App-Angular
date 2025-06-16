import { Injectable } from '@angular/core';
import { Disciplina } from './lista-de-disciplinas/disciplina.model';
import { HttpClient } from '@angular/common/http';
import disciplinas from '../../public/assets/disciplinas.json';


@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {
  private disciplinas: Disciplina[] | null = null;
  private novo_id = disciplinas.length + 1;

  constructor(private http: HttpClient) {
    /* this.carregarDados(() => {});
    this.disciplinas = disciplinas.map((d, i) => new Disciplina(i+1, d.nome, d.descricao)); */
  }

  carregarDados(callback: () => void): void {
    this.http.get<Disciplina[]>('assets/disciplinas.json')
    .subscribe(data => {
      console.log('Disciplinas carregadas:', data);
      this.disciplinas = data.map((d, i) => new Disciplina(i + 1, d.nome as string, d.descricao as string))})
    .add(callback);
  }

  todas(): Disciplina[] {
    if (this.disciplinas === null) {
      throw new Error('Disciplinas não carregadas');
    }
    return this.disciplinas;
  }

  salvar(id: number | null, nome: string, descricao: string): Disciplina {
    if (id) {
      let d = this.encontrar(id);
      if (d) {
        d.nome = nome;
        d.descricao = descricao;
        return d;
      }
      throw new Error('Disciplina não encontrada');
    }
    const disciplina = new Disciplina(this.novo_id, nome, descricao);
    if (this.disciplinas === null) {
      this.disciplinas = [];
    }
    this.disciplinas.push(disciplina);
    this.novo_id++;
    return disciplina;
  }

  excluir(disciplina: number | Disciplina): void {
    let d = null;
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
    }
  }

  encontrar(arg: number | string): Disciplina | null {
    if (this.disciplinas === null) {
      throw new Error('Disciplinas não carregadas');
    }
    if (typeof arg === 'number') {
      return this.disciplinas.find(d => d.id === arg) || null;
    } else if (typeof arg === 'string') {
      return this.disciplinas.find(d => d.nome?.toLowerCase() === arg.toLowerCase()) || null;
    }
    return null;
  }
}
