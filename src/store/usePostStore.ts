import {create} from "zustand"
import { Post } from "../types/post"
type PostStore = {
    selectedPost:Post|null,
    setSelectedPost:(post:Post | null) => void
}

export const usePostStore = create<PostStore>((set) => ({
    selectedPost: null,
    setSelectedPost:(post) =>set({selectedPost:post})
}))