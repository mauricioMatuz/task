import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ItemCreate,
  ItemDelete,
  ItemEdit,
  ItemGetAll,
  ItemGetOneById,
} from 'src/app/items';
import { ItemEntity } from 'src/infrastructure/Entity/itemEntity';
import { ItemResponseDto } from './dto/response';
import { ItemNotFoundError } from 'src/app/items/ItemGetOneById/ItemNotFoundError';
import { Create, Edit, FindOneParams } from './dto/validation';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import * as fs from 'fs';

@Controller('items')
export class ItemsController {
  constructor(
    @Inject('ItemGetAll') private readonly itemGetAll: ItemGetAll,
    @Inject('ItemOneById') private readonly itemGetOne: ItemGetOneById,
    @Inject('ItemCreate') private readonly itemCreate: ItemCreate,
    @Inject('ItemEdit') private readonly itemEdit: ItemEdit,
    @Inject('ItemDelete') private readonly ItemDelete: ItemDelete,
  ) {}

  private mapToDto(itemEntity: ItemEntity): ItemResponseDto {
    return {
      id: itemEntity.id,
      name: itemEntity.name,
      title: itemEntity.title,
      url: itemEntity.url,
      idTask: itemEntity.idTask,
      createAt: itemEntity.createdAt.toISOString(),
    };
  }

  @Get()
  async items() {
    return (await this.itemGetAll.run()).map((item) => item.toPlainObject);
  }

  @Get(':id')
  async item(@Param() params: FindOneParams) {
    try {
      return (await this.itemGetOne.run(params.id)).toPlainObject();
    } catch (error) {
      if (error instanceof ItemNotFoundError) return new NotFoundException();
      throw error;
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: Create,
  ) {
    const ext = file.originalname.split('.')[1];
    const uniqueName = `${uuidv4()}.${ext}`;
    const publicDir = join(__dirname, '../../../../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }
    const filePath = join(publicDir, uniqueName);
    fs.writeFileSync(filePath, file.buffer);
    const create = await this.itemCreate.run(
      uniqueName,
      file.originalname,
      process.env.URL_IMAGE + `${uniqueName}`,
      body.idTask,
      new Date(),
    );
    return this.mapToDto(create);
  }

  @Put(':id')
  async edit(@Param() params: FindOneParams, @Body() body: Edit) {
    try {
      const item = await this.itemEdit.run(
        params.id,
        body.name,
        body.title,
        body.url,
        body.idTask,
        new Date(),
      );
      return this.mapToDto(item);
    } catch (error) {
      if (error instanceof ItemNotFoundError) return new NotFoundException();
      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param() params: FindOneParams) {
    await this.ItemDelete.run(params.id);
  }
}
