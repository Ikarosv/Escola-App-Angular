import { Component } from '@angular/core';
import { ListaDeDisciplinasComponent } from './lista-de-disciplinas/lista-de-disciplinas.component';
import { Disciplina } from './lista-de-disciplinas/disciplina.model';
import { FormControl, FormsModule } from '@angular/forms';
import { EditorDeDisciplinaComponent } from './editor-de-disciplina/editor-de-disciplina.component';

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
  disciplinas: Disciplina[] = [
    new Disciplina('Língua Portuguesa', 'Estudo da língua portuguesa, incluindo gramática, interpretação de textos, ortografia e produção textual.'),
    new Disciplina('Arte', 'Exploração de diversas formas de expressão artística, como pintura, música, teatro e história da arte.'),
    new Disciplina('Educação Física', 'Prática de atividades físicas e esportes visando o desenvolvimento motor, social e da saúde.'),
    new Disciplina('Matemática', 'Estudo dos números, operações, geometria, álgebra, estatística e raciocínio lógico.'),
    new Disciplina('História', 'Análise de eventos históricos, sociedades antigas e modernas, e a construção da cidadania.'),
    new Disciplina('Geografia', 'Estudo do espaço geográfico, clima, relevo, populações, e suas interações com o meio ambiente.'),
    new Disciplina('Ciências', 'Compreensão dos fenômenos naturais através da biologia, química, física e ciências da Terra.'),
    new Disciplina('Redação', 'Desenvolvimento da escrita formal com foco em coesão, coerência e argumentação.'),
    new Disciplina('Língua Estrangeira Moderna - Inglês', 'Aprendizado da língua inglesa com foco em leitura, escrita, compreensão e conversação.'),
    new Disciplina('Ensino Religioso', 'Estudo das diferentes religiões, valores éticos e morais, promovendo respeito e tolerância.')
  ];

  selecionar(disciplina: Disciplina) {
    this.selecionado = disciplina
  }

  salvar() {
    if (this.editando){
      this.editando.nome = this.nome.value;
      this.editando.descricao = this.descricao.value;
    } else {
      const d = new Disciplina(this.nome.value, this.descricao.value);
      this.disciplinas.push(d);
    }
    this.nome.setValue("");
    this.descricao.setValue("");
    this.editando = null
  }

  excluir(disciplina: Disciplina) {
    if (this.editando == disciplina) {
      alert('Você não pode excluir uma disciplina que está editando');
    } else {
      if(confirm('Tem certeza que deseja excluir a disciplina ' + disciplina.nome + '?')) {
        const i = this.disciplinas.indexOf(disciplina)
        this.disciplinas.splice(i, 1)
      }
    }
  }

  editar(disciplina: Disciplina) {
    this.nome.setValue(disciplina.nome);
    this.descricao.setValue(disciplina.descricao);
    this.editando = disciplina;
  }
}
