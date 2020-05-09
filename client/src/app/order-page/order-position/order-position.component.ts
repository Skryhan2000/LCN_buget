import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PositionService } from 'src/app/shared/layouts/services/position.service';
import { Observable } from 'rxjs/index';
import { switchMap, map } from 'rxjs/operators';
import { Position } from 'src/app/shared/layouts/interfaces';
import { OrderService } from '../order.service';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-order-position',
  templateUrl: './order-position.component.html',
  styleUrls: ['./order-position.component.css'],
  })
export class OrderPositionComponent implements OnInit {
  positions$: Observable<Position[]>;
  constructor(
    private route: ActivatedRoute,
    private positionService: PositionService,
    private order: OrderService,
    // private posisionNew: P
  ) {}

   
  ngOnInit() {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionService.fetch(params['id']);
      }),
      map((positions: Position[]) => {
        return positions.map((position) => {
          position.quantity = 1;
          return position;
        });
      })
    );
  }

  addToOrder(position: Position) {
    MaterialService.toast(
      `Добавлено ${position.quantity} шт. ${position.name}`
    );
    this.order.add(position);
  }


  onAddPosition(position: Position){
  //this.positionService.create(position)
  
  }
}
