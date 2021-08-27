import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Product } from './models/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { UploadController } from './upload/upload.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CommonModule // jwt
  ],
  controllers: [ProductController, UploadController],
  providers: [ProductService]
})
export class ProductModule {}
