import { IPost } from "src/post/schemas/models/post.interface";
import { PostRepository } from "../post.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Post } from "src/post/schemas/post.schema";
import { Model } from "mongoose";

export class PostMongooseRepository implements PostRepository {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
    ){}
    getAllPost(limit: number, page: number): Promise<IPost[]> {
        const offset = (page - 1) * limit;

        return this.postModel.find().skip(offset).limit(limit).exec();
    }
    getPostById(postId: string): Promise<IPost> {
        return this.postModel.findById(postId).exec();
    }
    async createPost(post: IPost): Promise<void> {
        const createStock = new this.postModel(post);

        await createStock.save();
    }
    async updatePost(postId: string, post: IPost): Promise<IPost> {
        const result = await this.postModel.findByIdAndUpdate(postId, post, { new: true }).exec();
        return result;
    }
    
    async deletePost(postId: string): Promise<void> {
        await this.postModel.deleteOne({_id: postId}).exec();
    }

    async searchPosts(keyword: string): Promise<IPost[]> {
        const searchRegex = new RegExp(keyword, 'i'); // 'i' para case-insensitive
        return this.postModel
            .find({
                $or: [
                    { title: searchRegex },
                    { content: searchRegex },
                ],
            })
            .exec();
    }

}