import { Component, OnInit } from '@angular/core';
import { CardsService } from '../service/cards.service';
import { response } from 'express';
import { Card } from '../models/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
cards:Card[]=[];
card:Card={
  id:0,
  cardNumber:'',
  cardholderName:'',
  expirationDate:'',
  cvv:0
}

  constructor(private cardService:CardsService)
{

}
  ngOnInit(): void {
    this.getAllCards();
  }
  getAllCards(){
    this.cardService.getAllCards().subscribe(response =>{
      this.cards=response;
      
      //console.log(response);
    })
  }
  onSubmit(): void {
    if (this.card.id) { 
      this.cardService.updateCard(this.card).subscribe(updatedCard => {
       
        const index = this.cards.findIndex(c => c.id === updatedCard.id);
        if (index !== -1) {
          this.cards[index] = updatedCard;
        }
        alert("Updated");
      });
    } else { 
      this.cardService.addCard(this.card).subscribe(newCard => {
        
        this.cards.push(newCard);
      });
      alert("Added");
    }
  }
  isHovered: { [key: number]: boolean } = {};
  toggleHover(cardId: number): void {
    if (this.isHovered[cardId] === undefined) {
      this.isHovered[cardId] = true;
    } else {
      this.isHovered[cardId] = !this.isHovered[cardId];
    }
  }

  deleteCard(id:number){
    this.cardService.delete(id).subscribe(
      response =>{
        this.getAllCards();
      }

    );
  }

  populateForm(card: Card) {
    this.card = card;
    console.log(this.card. expirationDate); 
  }
  
  updateCard(card:Card){
    this.cardService.updateCard(card).subscribe(
      response =>{
        this.getAllCards();
      }

    );

  }

}
