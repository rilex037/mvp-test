import {
  Table,
  Column,
  Model,
  PrimaryKey,
  BelongsTo,
  HasMany,
  HasOne,
  ForeignKey,
} from "sequelize-typescript";
import Cult from "./cult";

@Table({
  freezeTableName: true,
  modelName: "candidates",
  timestamps: false,
  underscored: true,
})
class Candidates extends Model {
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
  cult_id: string;

  @BelongsTo(() => Cult)
  cult: Cult;
}
export default Candidates;
