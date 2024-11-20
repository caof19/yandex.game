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

export interface IReaction {
    id: number;
    emoji: string;
    author: string;
    topic_id: number;
}

@Table({ timestamps: false })
export class Reaction extends Model<IReaction> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare id: number;
    @Column(DataType.STRING)
    declare emoji: string;
    @Column(DataType.STRING)
    declare author: string;
    @ForeignKey(() => Topic)
    declare topic_id: ITopic;
    @BelongsTo(() => Topic)
    declare topic: ITopic;
}
