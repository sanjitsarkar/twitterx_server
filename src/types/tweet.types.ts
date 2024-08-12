export interface ITweet {
  id?: number;
  user_id?: number;
  content: string;
  created_at?: Date;
  updated_at?: Date;
  is_active?: boolean;
}

export interface IUserTweetsResponse extends ITweetResponse {
  userId: number
}
export interface ITweetResponse {
  pageNumber?: number, limit: number, searchQuery: string,
  sortBy?: string, orderBy?: string
  userId?: number
}
