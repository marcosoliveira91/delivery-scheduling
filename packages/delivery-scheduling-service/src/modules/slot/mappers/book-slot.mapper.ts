import { BookSlot } from '../dtos/queries/book-slot-query.dto';
import { BookSlotQuery } from '../entities/query/book-slot-query.entity';

export class BookSlotMapper {

  public static toDomain(code: string, dto: BookSlot): BookSlotQuery {
    return {
      code,
      sellerCode: dto.sellerCode,
      customerCode: dto.customerCode,
    };
  }
}
