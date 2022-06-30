import { Table, Column, Model, PrimaryKey } from "sequelize-typescript";

@Table({
  freezeTableName: true,
  modelName: "cults",
  timestamps: false,
  underscored: true,
})
class Cult extends Model {
  @PrimaryKey
  @Column
  id: number;
  primaryKey: true;

  @Column
  name: string;
}

export default Cult;
