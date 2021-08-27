import { ClassSerializerInterceptor, Controller, Get, Post, Query, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderItem } from './models/order-item.entity';
import { Order } from './models/order.entity';
import { OrderService } from './order.service';
import {Response} from 'express';
import { Parser } from 'json2csv';
import { HasPermission } from 'src/permission/has-permission.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @HasPermission('orders')
  @Get('orders')
  async all(@Query('page') page = 1) {
    //   return this.orderService.all(['order_items']); // load the order_items from the order
    return this.orderService.paginate(page, ['order_items']); // load the order_items from the order
  }

  @HasPermission('orders')
  @Post('export-csv')
  async export(@Res() response: Response) {
    const parser = new Parser({
      fields: [
        'ID',
        'Full Name',
        'Email',
        'Order Total Price',
        'Product Title',
        'Product Price',
        'Product Quantity',
      ],
    });

    const orders = await this.orderService.all(['order_items']);
    const json = [];
    orders.forEach((order: Order) => {
      json.push({
        ID: order.id,
        'Full Name': order.full_name,
        Email: order.email,
        'Order Total Price': '$' + order.total_price,
        'Product Title': '',
        'Product Price': '',
        'Product Quantity': '',
      });

      order.order_items.forEach((order_item: OrderItem) => {
        json.push({
          ID: '',
          'Full Name': '',
          Email: '',
          'Order Total Price': '',
          'Product Title': order_item.product_title,
          'Product Price': '$' + order_item.price,
          'Product Quantity': order_item.quantity,
        });
      });
    });

    const csv = parser.parse(json);
    response.header('Content-Type', 'text/csv');
    response.attachment('orders.csv');
    return response.send(csv);
  }

  @HasPermission('orders')
  @Get('orders-by-date')
  async chart() {
    return this.orderService.chart();
  }
}
