import { IsUUID } from 'class-validator';

export class IdContaDto {
  @IsUUID()
  id_conta!: string;
}
