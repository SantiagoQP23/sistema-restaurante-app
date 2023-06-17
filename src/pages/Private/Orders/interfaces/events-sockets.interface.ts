


export enum EventsOnSocket{
  newOrder = 'new-order',
  createOrder = 'create-order',
  updateOrder = 'update-order',
  deleteOrder = 'delete-order',
  updateTable = 'update-table',
}

export enum EventsEmitSocket {
  createOrder = 'create-order',
  updateOrder = 'update-order',
  changeTable = 'change-table',
  changeClient = 'change-client',
  updateOrderDetail = 'update-order-detail',
  addOrderDetail = 'add-order-detail',
  deleteOrderDetail = 'delete-order-detail',
  updateqtyDeliveredDetail = 'update-qty-delivered-detail', 
  deleteOrder = 'delete-order',
  payOrder = 'pay-order',
  deliverOrder = 'deliver-order',



}