import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Disciplina } from './disciplina.model';
import { DisciplinasService } from '../disciplinas.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-lista-de-disciplinas',
  imports: [RouterLink],
  templateUrl: './lista-de-disciplinas.component.html',
  styleUrl: './lista-de-disciplinas.component.css'
})

export class ListaDeDisciplinasComponent {
  selecionado: Disciplina | null = null;
  disciplinas: Disciplina[] = [];

  constructor(private disciplinasService: DisciplinasService) {
    this.atualizarLista()
  }

  atualizarLista() {
    this.disciplinasService.todas().subscribe((allDisciplinas) => this.disciplinas = allDisciplinas)
  }
  
  excluir(disciplina: Disciplina) {
    if(confirm(`Tem certeza que deseja excluir a disciplina ${disciplina.nome} ?`)) {
      this.disciplinasService.excluir(disciplina, () => this.atualizarLista());
    }
  }

  selecionar(disciplina: Disciplina) {
    this.selecionado = disciplina
  }

}
