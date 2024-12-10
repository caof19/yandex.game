import {
    AutoIncrement,
    Column,
    DataType,
    AllowNull,
    Model,
    PrimaryKey,
    ForeignKey,
    Table,
} from "sequelize-typescript";
import { Themes } from "./Themes.model";

export interface IUserTheme {
    id: number;
    theme: string;
    device: string;
    userId: string;
}

@Table({
    timestamps: false,
    paranoid: true,
    tableName: "user_theme",
})
export class UserTheme extends Model<IUserTheme> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare id: number;

    @ForeignKey(() => Themes)
    @AllowNull(false)
    @Column(DataType.STRING)
    declare theme: string;

    @Column(DataType.STRING)
    declare device: string;

    // @ForeignKey(() => User) TODO: Нету модельки пользователя
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        field: "user_id",
    })
    declare userId: string;
}
