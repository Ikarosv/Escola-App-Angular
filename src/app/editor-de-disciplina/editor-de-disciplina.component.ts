import { Component, EventEmitter, Input, Output,  } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Disciplina } from '../lista-de-disciplinas/disciplina.model';

@Component({
  selector: 'app-editor-de-disciplina',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './editor-de-disciplina.component.html',
  styleUrl: './editor-de-disciplina.component.css'
})
export class EditorDeDisciplinaComponent {
  @Input()
  nome = new FormControl('');
  @Input()
  descricao = new FormControl('');
  @Input()
  editando: Disciplina | null = null

  @Output()
  onSalvar = new EventEmitter()
  
  salvar() {
    this.onSalvar.emit()
  }
  cancelar() {
    this.nome.setValue(" ");
    this.descricao.setValue(" ");
    this.editando = null;
  }
}
