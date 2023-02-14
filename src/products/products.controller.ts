import { UseGuards } from '@nestjs/common';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { JwtAuthGaurd } from 'dist/guards/auth-guard';
import { RoleDecorator } from 'src/commons/decorators/role.decorator';
import { Role } from 'src/commons/enums/role.enum';
import { AdminGaurd } from 'src/commons/guards/admin.gaurd';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGaurd,AdminGaurd)
  @RoleDecorator(Role.Admin)
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    return this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
  }

  @Get()
  async getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGaurd,AdminGaurd)
  @RoleDecorator(Role.Admin)
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    return this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    
  }

  @Delete(':id')
  @UseGuards(JwtAuthGaurd,AdminGaurd)
  @RoleDecorator(Role.Admin)
  async removeProduct(@Param('id') prodId: string) {
      return this.productsService.deleteProduct(prodId);
  }
}
