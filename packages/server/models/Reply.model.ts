import { Comment, IComment } from "./Comment.model";
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
} from "sequelize-typescript";

export interface IReply {
    id: number;
    text: string;
    author: string;
    topic_id: number;
    topic: ITopic;
    comment_id: number;
    comment: IComment;
}

@Table
export class Reply extends Model<IReply> {
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
    @ForeignKey(() => Comment)
    declare comment_id: ITopic;
    @BelongsTo(() => Topic)
    declare comment: IComment;
}
