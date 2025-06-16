import { Component } from '@angular/core';
import { ListaDeDisciplinasComponent } from './lista-de-disciplinas/lista-de-disciplinas.component';
import { Disciplina } from './lista-de-disciplinas/disciplina.model';
import { FormControl } from '@angular/forms';
import { EditorDeDisciplinaComponent } from './editor-de-disciplina/editor-de-disciplina.component';
import { DisciplinasService } from './disciplinas.service';
import disciplinas from '../../public/assets/disciplinas.json';

@Component({
  selector: 'app-root',
  imports: [ListaDeDisciplinasComponent, EditorDeDisciplinaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'escola-app';
  nome = new FormControl<string>('');
  descricao = new FormControl('');
  selecionado: Disciplina | null = null;
  editando: Disciplina | null = null
  // disciplinas: Disciplina[] = disciplinas.map((d,i) => new Disciplina(i+1, d.nome, d.descricao));
  disciplinas: Disciplina[] = [];

  constructor(private disciplinasService: DisciplinasService) {
    this.disciplinasService.carregarDados(() => {
      this.disciplinas = this.disciplinasService.todas();
    })
  }

  selecionar(disciplina: Disciplina) {
    this.selecionado = disciplina
  }

  salvar() {
    if (this.editando){
      this.disciplinasService.salvar(this.editando.id, this.nome.value as string, this.descricao.value as string);
    } else {
      const novaDisciplina = new Disciplina(disciplinas.length + 1, this.nome.value as string, this.descricao.value as string);
      this.disciplinasService.salvar(null, novaDisciplina.nome as string, novaDisciplina.descricao as string);
    }
    this.nome.setValue("");
    this.descricao.setValue("");
    this.editando = null
  }

  excluir(disciplina: Disciplina) {
    if (this.editando == disciplina) {
      alert('Você não pode excluir uma disciplina que está editando');
    } else {
      if(confirm(`Tem certeza que deseja excluir a disciplina ${disciplina.nome} ?`)) {
        this.disciplinasService.excluir(disciplina);
      }
    }
  }

  editar(disciplina: Disciplina) {
    this.nome.setValue(disciplina.nome);
    this.descricao.setValue(disciplina.descricao);
    this.editando = disciplina;
  }
}
