import { Exclude, Transform } from 'class-transformer';

export class UserEntity {
  id: string;
  login: string;
  version: number;

  @Transform(({ value }) => +value)
  createdAt: Date;

  @Transform(({ value }) => +value)
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
