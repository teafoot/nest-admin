import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Exclude() // to not show when querying the API
  first_name: string;

  @Column()
  @Exclude() // to not show when querying the API
  last_name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: string;

  //

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  order_items: OrderItem[]; // order has many order_items

  @Expose() // to show when querying the API
  get full_name(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  @Expose() // to show when querying the API
  get total_price(): number {
    return this.order_items.reduce(
      (sum, order_item) => sum + order_item.quantity * order_item.price,
      0,
    );
  }
}
