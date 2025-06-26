import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListaDeDisciplinasComponent } from './lista-de-disciplinas/lista-de-disciplinas.component';
import { EditorDeDisciplinaComponent } from './editor-de-disciplina/editor-de-disciplina.component';
console.log('app.routes.ts loaded');
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'disciplinas',
    component: ListaDeDisciplinasComponent
  },
  {
    path: 'cadastrar-disciplina',
    component: EditorDeDisciplinaComponent
  },
  {
    path: 'editar-disciplina/:id',
    component: EditorDeDisciplinaComponent
  }
];
