import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Disciplina } from './disciplina.model';


@Component({
  selector: 'app-lista-de-disciplinas',
  imports: [],
  templateUrl: './lista-de-disciplinas.component.html',
  styleUrl: './lista-de-disciplinas.component.css'
})

export class ListaDeDisciplinasComponent {
  @Input()
  selecionado: Disciplina | null = null;

  @Input()
  editando: Disciplina | null = null

  @Output()
  onEditar = new EventEmitter<Disciplina>()

  @Output()
  onExcluir = new EventEmitter<Disciplina>()

  @Input()
  disciplinas: Disciplina[] = [];

  @Output()
  onSelecionar = new EventEmitter<Disciplina>()

  selecionar(disciplina: Disciplina) {
    this.onSelecionar.emit(disciplina)
  }
  
  excluir(disciplina: Disciplina) {
    this.onExcluir.emit(disciplina)
  }

  editar(disciplina: Disciplina) {
    this.onEditar.emit(disciplina)
  }
}
