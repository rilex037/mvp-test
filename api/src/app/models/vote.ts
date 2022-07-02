import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Candidate from "./candidate";

@Table({
  freezeTableName: true,
  modelName: "votes",
  timestamps: false,
  underscored: true,
})
class Vote extends Model {
  @PrimaryKey
  @Column
  block_id: number;

  @Column
  user_address: string;

  @Column
  token_amount: number;

  @ForeignKey(() => Candidate)
  @Column
  candidate_id: number;

  @BelongsTo(() => Candidate)
  candidate: Candidate;
}

export default Vote;
