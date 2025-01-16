import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProjetComponent } from '../projet/projet.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

}
