import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaDeDisciplinasComponent } from './lista-de-disciplinas/lista-de-disciplinas.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass, NgStyle, ListaDeDisciplinasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'escola-app';
  isSpecial = true
  currentStyles: Record<string, string> = {}
  ngOnInit(): void {
    this.setCurrentStyles()
  }
  setCurrentStyles() {
    this.currentStyles = {
      'font-size': '24px'
    }
  }
}
