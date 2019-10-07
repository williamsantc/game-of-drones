import { DefaultCrudRepository } from '@loopback/repository';
import { UserEntity } from '../entity/user.entity';
import { inject } from '@loopback/core';
import { DatabaseDataSource } from '../datasources';
import { DatasourcesConstants } from '../datasources/datasources.constants';

export class UserLoopbackRepository extends DefaultCrudRepository<
  UserEntity,
  typeof UserEntity.prototype.userNickname
> {
  constructor(@inject(DatasourcesConstants.IN_MEMORY_DATASOURCE) dataSource: DatabaseDataSource) {
    super(UserEntity, dataSource);
  }
}
