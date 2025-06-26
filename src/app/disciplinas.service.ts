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

  salvar(id: number | null, nome: string, descricao?: string | null) {
    let disciplina = {
      id,
      nome,
      descricao
    }
    if (id) {
      console.log('editar', disciplina)
      return this.http.patch(this.API_URL + "/disciplinas/" + id, {
        nome: disciplina.nome,
        descricao: disciplina.descricao
      })
    } else {
      disciplina.id = this.gerarProximoId()
      console.log('salvar', disciplina)
      return this.http.post(this.API_URL + '/disciplinas', disciplina)
    }
  }

  excluir(disciplina: number | Disciplina, callback?: () => void) {
    let id;
    if (typeof disciplina == 'number') {
      id = disciplina
    } else {
      id = disciplina.id
    }
    console.log('excluir', id)
    return this.http.delete(this.API_URL + '/disciplinas/' + id).subscribe(callback)
  }

  encontrar(arg: number | string) {
    return this.http.get<Disciplina>(this.API_URL + '/disciplinas/' + arg)
  }

  gerarProximoId() {
    this.todas().subscribe((data) => this.disciplinas = data)
    if (this.disciplinas?.length === 0) return 1;

    const maiorId = Math.max(...this.disciplinas?.map((d) => d.id));
    return maiorId + 1
  }
}
