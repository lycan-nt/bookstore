import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from './../livro.service';
import { FormControl, Validators } from '@angular/forms';
import { Livro } from './../livro.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

  titulo = new FormControl('', [Validators.minLength(3)]);
  nomeAutor = new FormControl('', [Validators.minLength(3)]);
  texto = new FormControl('', [Validators.minLength(10)]);
  id_cat: String = '';

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
    this.livro.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resp) => {
      this.livro = resp;
    })
  }

  update(): void {
    this.service.update(this.livro).subscribe((resp) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro atualizado com sucesso!');
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Falha ao atualizar livro...');
    })
  }

  getMessage() {
    if (this.titulo.invalid) {
      return 'O campo TITULO deve conter entre 3 e 100 carateres';
    }

    if (this.nomeAutor.invalid) {
      return 'O  campo NOME DO AUTOR deve conter entre 3 e 100 carateres';
    }

    if (this.texto.invalid) {
      return 'O campo TEXTO deve conter entre 10 e 2000000 carateres';
    }

    return false;
  }

}
