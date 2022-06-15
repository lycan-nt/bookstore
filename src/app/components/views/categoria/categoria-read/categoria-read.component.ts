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

  showProgres = false;
  constructor(
    private service: CategoriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showProgres = true;
    this.findAll();
  }

  findAll() {
      this.service.findAll().subscribe(res => {
      this.categorias = res;
      if (res.length > 0) 
        this.showProgres = false;   
    })
  }

  navegarParaCategoriaCreate() {
    this.router.navigate(['categorias/create']);
  }

}
