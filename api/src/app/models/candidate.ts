import {
  Table,
  Column,
  Model,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Cult from "./cult";

@Table({
  freezeTableName: true,
  modelName: "candidates",
  timestamps: false,
  underscored: true,
})
class Candidate extends Model {
  @PrimaryKey
  @Column
  id: number;
  primaryKey: true;

  @Column
  name: string;

  @Column
  age: number;

  @ForeignKey(() => Cult)
  @Column
  cult_id: number;

  @BelongsTo(() => Cult)
  cult: Cult;
}

export default Candidate;
