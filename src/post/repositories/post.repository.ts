import { IPost } from "../schemas/models/post.interface";

export abstract class PostRepository {
    abstract getAllPost(limit: number, page: number): Promise<IPost[]>;
    abstract getPostById(postId: string): Promise<IPost>;
    abstract createPost(post: IPost): Promise<void>;
    abstract updatePost(postId: string, post: IPost): Promise<IPost>;
    abstract deletePost(postId: string): Promise<void>;
    abstract searchPosts(keyword: string): Promise<IPost[]>;
}