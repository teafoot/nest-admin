import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginatedResult } from './paginated_result';

@Injectable()
export abstract class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async all(relations: string[] = []): Promise<any[]> {
    return await this.repository.find({relations});
  }

  async paginate(page: number = 1, relations: string[] = []): Promise<PaginatedResult> {
    const take = 4;
    const [data, total] = await this.repository.findAndCount({
      take,
      skip: (page - 1) * take,
      relations
    });

    return {
      data,
      meta: {
        items_total: total,
        current_page: page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async create(data): Promise<any> {
    return await this.repository.save(data);
  }

  async findOne(condition, relations?: string[]): Promise<any> {
    return await this.repository.findOne(condition, { relations });
  }

  async update(id: number, data: any): Promise<any> {
    return await this.repository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return await this.repository.delete(id);
  }
}
