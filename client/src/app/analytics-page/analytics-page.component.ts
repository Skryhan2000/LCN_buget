import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from '../shared/layouts/services/analytics.servece';
import { AnalyticsPage } from '../shared/layouts/interfaces';
import { Subscription } from 'rxjs';
import {Chart} from 'chart.js'

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit , OnDestroy{
@ViewChild('gain') gainRef: ElementRef
@ViewChild('order') orderRef: ElementRef

aSub: Subscription
average:number
pending=true
averageProfit:number
  constructor(private service: AnalyticsService) { }

  ngAfterViewInit(){
    const gainConfig: any={
label:'Сумма трат',
color:'rgb(255,99,132)'
    }

    const orderConfig: any={
      label:'Количество покупок',
      color:'rgb(255,99,132)'
          }

    this.aSub= this.service.getAnalytics().subscribe((data: AnalyticsPage)=>{
      this.average=data.average
      this.averageProfit=data.averageProfit

      gainConfig.labels=data.chart.map(item=>item.label)
      gainConfig.data=data.chart.map(item=>item.gain)

      orderConfig.labels=data.chart.map(item=>item.label)
      orderConfig.data=data.chart.map(item=>item.order)

      const gainCtx=this.gainRef.nativeElement.getContext('2d')
      gainCtx.canvas.height='300px'

      const orderCtx=this.orderRef.nativeElement.getContext('2d')
      orderCtx.canvas.height='300px'

      new Chart(gainCtx, createChartConfig(gainConfig))
      new Chart(orderCtx, createChartConfig(orderConfig))

      this.pending=false
    })
  }

  ngOnDestroy(){
    if(this.aSub){this.aSub.unsubscribe()}
  }
}

function createChartConfig({labels, data,label,color}){
  return{
    type:'line',
    options:{
      responsive: true
    },
    data:{
      labels,
      datasets:[
        {
          label,data,
          borderColor: color,
          steppedLine:false,
          fill:false
        }
      ]
    }
  }
}