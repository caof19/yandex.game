import {
    AutoIncrement,
    Column,
    DataType,
    Unique,
    AllowNull,
    Model,
    PrimaryKey,
    Index,
    Table,
} from "sequelize-typescript";

export interface ITheme {
    id: number;
    theme: string;
    description: string;
}

@Table({
    timestamps: false,
    paranoid: true,
    tableName: "themes",
})
export class Themes extends Model<ITheme> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare id: number;

    @Index
    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    declare theme: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare description: string;
}
