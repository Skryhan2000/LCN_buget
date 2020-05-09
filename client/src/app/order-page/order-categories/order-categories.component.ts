import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/layouts/services/categories.service';
import { Category } from 'src/app/shared/layouts/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css']
})
export class OrderCategoriesComponent implements OnInit {

  categories$: Observable<Category[]>

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categories$=this.categoriesService.fetch()
  }

}
