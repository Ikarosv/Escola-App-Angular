import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Disciplina } from './disciplina.model';

@Component({
  selector: 'app-lista-de-disciplinas',
  imports: [NgFor],
  templateUrl: './lista-de-disciplinas.component.html',
  styleUrl: './lista-de-disciplinas.component.css'
})

export class ListaDeDisciplinasComponent {
  selecionado: Disciplina | null = null;
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
}
