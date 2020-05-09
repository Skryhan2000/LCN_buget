export interface User {
  email: string;
  password: string;
}

export interface Message {
  message: string;
}

export interface Category {
  name: string;
  imagePath?: string;
  user?: string;
  _id?: string;
}

export interface Position {
  name: string;
  cost: number;
  category: string;
  user?: string;
  _id?: string;
  quantity?: number; //Виртуальное поле
}

export interface Category {
  name: string;
  imagePath?: string;
  user?: string;
  _id?: string;
}

export interface Order {
  date?: Date;
  order?: number;
  list: OrderPosition[];
  user?: string;
  _id?: string;
}

export interface OrderPosition {
  name: string;
  quantity: number;
  cost: number;
  _id?: string;
}

export interface Filter{
  start?: Date
  end?: Date
  order?: number
}

export interface Profit{
  name: string
  amount: number
  _id?: string
  user?: string
}

export interface OverviewPage{
  orders:OverviewPageItem
  gain:OverviewPageItem
}

export interface OverviewPageItem{
  percent:number
  compare:number
  yesterday:number
  isHigher:boolean
}

export interface AnalyticsPage{
  average: number
  averageProfit: number
  chart:  AnalyticsChartItem[]
}

export interface AnalyticsChartItem{
  gain: number
  order:number
  label: string
}