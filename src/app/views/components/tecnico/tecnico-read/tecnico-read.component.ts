import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-read',
  templateUrl: './tecnico-read.component.html',
  styleUrls: ['./tecnico-read.component.css']
})
export class TecnicoReadComponent implements AfterViewInit {

  tecnicos: Tecnico[] = []; /* 2 */


  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'action']; /* 1 */
  
  dataSource = new MatTableDataSource<Tecnico>(this.tecnicos); /* 3 */

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service : TecnicoService,
    private router : Router) {} /* 4 */


  ngAfterViewInit() {
    
    this.findAll(); /* 5 */
  }

  findAll():void { /* 5 */
    this.service.findAll().subscribe((resposta) => {
      this.tecnicos = resposta;
      this.dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);
      this.dataSource.paginator = this.paginator;
      /* console.log(this.tecnicos) */
    })

  }

  navigateToCreate():void {
    this.router.navigate(['tecnicos/create'])
  }


}

