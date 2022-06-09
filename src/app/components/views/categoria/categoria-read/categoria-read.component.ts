import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros', 'acoes'];

  categorias: Categoria[] = [];

  constructor(
    private service: CategoriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(res => {
      console.table(res);
      this.categorias = res;
    })
  }

  navegarParaCategoriaCreate() {
    this.router.navigate(['categorias/create']);
  }

}
