import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-closed',
  templateUrl: './os-closed.component.html',
  styleUrls: ['./os-closed.component.css']
})
export class OsClosedComponent implements AfterViewInit {

  lista: OS[] = []; /* 2 */


  displayedColumns: string[] = [ 'tecnico', 'cliente','abertura', 'fechamento', 'prioridade', 'status', 'action']; /* 1 */
  
  dataSource = new MatTableDataSource<OS>(this.lista); /* 3 */

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service : OsService,
    private router : Router, /* 4 */
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService) {}

  ngAfterViewInit() {
    
    this.findAll(); /* 5 */
  }

  findAll():void { /* 5 */
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(x => {
        if(x.status == "FINALIZADO") { /** ENCERRADO - aula 57 */
          this.lista.push(x)
        }
      })

      this.listarTecnico();
      this.listarCliente();
      this.dataSource = new MatTableDataSource<OS>(this.lista);
      this.dataSource.paginator = this.paginator;
      /* console.log(this.os) */
    })

  }

  listarTecnico():void {
    this.lista.forEach(x => {
      this.tecnicoService.findById(x.tecnico).subscribe(resposta => {
        x.tecnico = resposta.nome
      })
    })
  }

  listarCliente():void {
    this.lista.forEach(x => {
      this.clienteService.findById(x.cliente).subscribe(resposta => {
        x.cliente = resposta.nome
      })
    })
  }

prioridade(x : any) {
  if(x == 'BAIXA') {
    return 'baixa'
  } else if(x == 'MEDIA') {
    return 'media'
  } else {
    return 'alta'
  }
}

}

