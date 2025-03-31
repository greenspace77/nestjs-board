import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { DataSource } from 'typeorm';
import { Board } from './board.entity';

@Module({
  //imports: [TypeOrmModule.forFeature([BoardRepository])],
  controllers: [BoardsController],
  providers: [
    BoardsService,
    {
      provide: 'BOARD_REPOSITORY',
      useFactory: (dataSource: DataSource) => {
        return dataSource
          .getRepository(Board)
          .extend(BoardRepository.prototype);
      },
      inject: [DataSource],
    },
  ],
})
export class BoardsModule {}
