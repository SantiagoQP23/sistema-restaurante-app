

export interface UpdateOrderDto{

  id: string;
  tableId?: string;
  clientId?: string;
 
  people?: number;
  status?: string;
  discount?: number;


}



export interface PayOrderDto{
  id: string;
  discount?: number;
}

  