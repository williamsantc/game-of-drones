import { DefaultCrudRepository } from '@loopback/repository';
import { GameEntity } from '../entity/game.entity';
import { inject } from '@loopback/context';
import { DatabaseDataSource } from '../datasources';
import { DatasourcesConstants } from '../datasources/datasources.constants';

export class GameLoopbackRepository extends DefaultCrudRepository<GameEntity, typeof GameEntity.prototype.id> {
  constructor(@inject(DatasourcesConstants.IN_MEMORY_DATASOURCE) dataSource: DatabaseDataSource) {
    super(GameEntity, dataSource);
  }
}
