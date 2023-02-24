import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty({ description: 'Identificador da entidade' })
  id: number;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;
}
