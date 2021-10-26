import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements AfterViewInit {

  clientes: Cliente[] = []; /* 2 */


  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'action']; /* 1 */
  
  dataSource = new MatTableDataSource<Cliente>(this.clientes); /* 3 */

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service : ClienteService,
    private router : Router) {} /* 4 */


  ngAfterViewInit() {
    
    this.findAll(); /* 5 */
  }

  findAll():void { /* 5 */
    this.service.findAll().subscribe((resposta) => {
      this.clientes = resposta;
      this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
      this.dataSource.paginator = this.paginator;
      /* console.log(this.tecnicos) */
    })

  }

  navigateToCreate():void {
    this.router.navigate(['clientes/create'])
  }


}
