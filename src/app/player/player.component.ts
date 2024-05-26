import { Component, OnInit } from '@angular/core';
import { Player } from './player';
import { PlayerService } from './player.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit{
  public players: Player[];
  public size!: number;
  public salary!: number;
  public deletePlayer: number = 0;

  constructor(private playerService: PlayerService) {
    this.players = [];
   }

  ngOnInit(){
    this.getPlayers();
    this.getSize();
    this.getSalary();
  }

  public getPlayers(): void{
    this.playerService.getPlayers().subscribe(
      {
        next: (response: Player[])=>{
          this.players = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
      )
  }

  public getSize(): void{
    this.playerService.getSize().subscribe(
      {
        next: (response: number)=>{
          this.size = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }

  public getSalary(): void{
    this.playerService.getSalary().subscribe(
      {
        next: (response: number)=>{
          this.salary = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }

  public tryDeletePlayer(playerId: number): void{
    this.deletePlayer = playerId;
  }

  public onDeletePlayer(): void{
    this.playerService.deletePlayers(this.deletePlayer).subscribe(
      {
        next: (response: void) => {
          console.log(response);
          alert("Successfully removed player");
          this.getPlayers();
          this.getSalary();
          this.getSize();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.error.message);
        }
      }
    )
    document.getElementById("closeModalButton")?.click();
  }

  public onSearchPlayer(searchForm: NgForm): void{
    this.playerService.searchPlayers(searchForm.value).subscribe(
      {
        next: (response: Player[])=>{
          alert('Yay');
        },
        error: (error: HttpErrorResponse) => {
          alert(error.error.message);
        }
      }
    );
    console.log(searchForm.value);
  }
}
