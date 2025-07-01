import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IPost } from "./models/post.interface";
import mongoose, { HydratedDocument } from "mongoose";

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post implements IPost {

    @Prop({type: mongoose.Schema.Types.ObjectId})
    id?: string;
    @Prop()
    title: string;
    @Prop()
    author: string;
    @Prop()
    intro: string;
    @Prop()
    content: string;
    @Prop()
    imageUrl: string;
    @Prop()
    videoUrl: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);