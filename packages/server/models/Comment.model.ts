import { IReply, Reply } from "./Reply.model";
import { ITopic, Topic } from "./Topic.model";
import {
    Table,
    Model,
    Column,
    AutoIncrement,
    PrimaryKey,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from "sequelize-typescript";

export interface IComment {
    id: number;
    text: string;
    author: string;
    topic_id: number;
}

@Table
export class Comment extends Model<IComment> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare id: number;
    @Column(DataType.STRING)
    declare text: string;
    @Column(DataType.STRING)
    declare author: string;
    @ForeignKey(() => Topic)
    declare topic_id: ITopic;
    @BelongsTo(() => Topic)
    declare topic: ITopic;
    @HasMany(() => Reply)
    declare replies: IReply[];
}
