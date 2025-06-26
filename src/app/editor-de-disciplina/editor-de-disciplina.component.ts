import { Component, EventEmitter, inject, Input, Output,  } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Disciplina } from '../lista-de-disciplinas/disciplina.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DisciplinasService } from '../disciplinas.service';

@Component({
  selector: 'app-editor-de-disciplina',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './editor-de-disciplina.component.html',
  styleUrl: './editor-de-disciplina.component.css'
})
export class EditorDeDisciplinaComponent {
  private activatedRoute = inject(ActivatedRoute);
  id: number | null = null;
  nome = new FormControl('');
  descricao = new FormControl<string | undefined>('');
  editando: Disciplina | null = null
  private router = inject(Router);

  constructor(private disciplinasService: DisciplinasService) {

    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.disciplinasService.encontrar(params['id']).subscribe((disciplina) => {
          this.editando = disciplina;
          this.id = disciplina.id;
          this.nome.setValue(disciplina.nome);
          this.descricao.setValue(disciplina.descricao);
        });
      }
    });
  }
  
  salvar() {
    try {
      if (this.editando) {
        console.log('editando', this.editando);
        this.disciplinasService.salvar(this.id, this.nome.value as string, this.descricao.value).subscribe(() => {
          this.cancelar()
          this.router.navigate(['/disciplinas']);
        });
      } else {
        this.disciplinasService.salvar(null, this.nome.value as string, this.descricao.value as string).subscribe(() => {
          this.cancelar();
          this.router.navigate(['/disciplinas']);
        });
      }
    } catch(e) {
      console.log(e)
    }
  }
  cancelar() {
    this.id = null;
    this.nome.setValue(" ");
    this.descricao.setValue(" ");
    this.editando = null;
  }
}
