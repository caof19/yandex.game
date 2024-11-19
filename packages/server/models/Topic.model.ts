import { Comment, IComment } from "./Comment.model";
import {
    AutoIncrement,
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";

export interface ITopic {
    id: number;
    title: string;
    text: string;
    author: string;
    comments: IComment[];
}
@Table
export class Topic extends Model<ITopic> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare id: number;
    @Column(DataType.STRING)
    declare title: string;
    @Column(DataType.STRING)
    declare text: string;
    @Column(DataType.STRING)
    declare author: string;
    @HasMany(() => Comment)
    declare comments: IComment[];
}
