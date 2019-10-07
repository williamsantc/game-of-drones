import { BelongsToAccessor, DefaultCrudRepository, Getter, repository } from '@loopback/repository';
import { RoundEntity } from '../entity/round.entity';
import { inject } from '@loopback/context';
import { DatabaseDataSource } from '../datasources';
import { GameEntity } from '../entity/game.entity';
import { GameLoopbackRepository } from './game-loopback.repository';
import { DatasourcesConstants } from '../datasources/datasources.constants';

export class RoundLoopbackRepository extends DefaultCrudRepository<RoundEntity, typeof RoundEntity.prototype.id> {
  public static readonly GAME_RELATION_NAME = 'game';
  public readonly game: BelongsToAccessor<GameEntity, typeof RoundEntity.prototype.id>;

  constructor(
    @inject(DatasourcesConstants.IN_MEMORY_DATASOURCE) dataSource: DatabaseDataSource,
    @repository.getter(GameLoopbackRepository)
    gameLoopbackRepositoryGetter: Getter<GameLoopbackRepository>,
  ) {
    super(RoundEntity, dataSource);
    this.game = this.createBelongsToAccessorFor(
      RoundLoopbackRepository.GAME_RELATION_NAME,
      gameLoopbackRepositoryGetter,
    );
  }
}
