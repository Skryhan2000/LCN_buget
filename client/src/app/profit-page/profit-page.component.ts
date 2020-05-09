import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Profit } from '../shared/layouts/interfaces';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfitService } from '../shared/layouts/services/profit.service';

@Component({
  selector: 'app-profit-page',
  templateUrl: './profit-page.component.html',
  styleUrls: ['./profit-page.component.css']
})
export class ProfitPageComponent implements OnInit, OnDestroy, AfterViewInit {
@ViewChild('modal') modalRef: ElementRef
modal: MaterialInstance
form: FormGroup


profitId = null
profits: Profit[]=[]
loading = false

  constructor(private profitService: ProfitService) { }

  ngOnInit(): void {
       this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    });

    this.loading = true;
    this.profitService.fetch().subscribe((profits)=>{
      this.loading=false
      this.profits=profits
       })
    
    
  }

  ngOnDestroy(){
    this.modal.destroy();
  }

  ngAfterViewInit(){
    this.modal = MaterialService.initModal(this.modalRef)

  }

  onAddProfit(){
    this.profitId = null;
    this.form.reset({
      name: null,
      amount: null,
    });
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onDeleteProfit(event: Event, profit: Profit) {
    event.stopPropagation();
    const decision = window.confirm(`Удалить позицию "${profit.name}"?`);

    if (decision) {
      this.profitService.delete(profit).subscribe(
        (response) => {
          const idx = this.profits.findIndex((p) => p._id === profit._id);
          this.profits.splice(idx, 1);
          MaterialService.toast(response.message);
        },
        (error) => MaterialService.toast(error.error.message)
      );
    }
  }


 

  onCancel() {
    this.modal.close();
  }

  onSelectProfit(profit: Profit){
    this.profitId = profit._id;
    this.form.patchValue({
      name: profit.name,
      amount: profit.amount,
    });
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onSubmit(){
    this.form.disable();
    const newProfit: Profit = {
      name: this.form.value.name,
      amount: this.form.value.amount,
    };

    const complited = () => {
      this.modal.close();
      this.form.reset({ name: '', amount: 0.01 });
      this.form.enable();
    };

    if (this.profitId) {
      newProfit._id = this.profitId;
      this.profitService.update(newProfit).subscribe(
        (profit) => {
          const idx = this.profits.findIndex((p) => p._id === profit._id);
          this.profits[idx] = profit;
          MaterialService.toast('Изменения сохранены');
        },
        (error) => MaterialService.toast(error.error.message),
        complited
      );
    } else {
      this.profitService.create(newProfit).subscribe(
        (profit) => {
          MaterialService.toast('Позиция дохода создана');
          this.profits.push(profit);
        },
        (error) => MaterialService.toast(error.error.message),
        complited
      );
    }
  }
}
