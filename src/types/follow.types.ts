export interface IFollow {
  id?: number;
  follower_id: number;
  following_id: number;
  created_at?: string;
  updated_at?: string;
  is_active?: boolean;
}

export interface IFollowersOrFollowingsResponse {
  userId: number, pageNumber: number, limit: number, searchQuery: string,
  orderBy?: string, sortBy?: string
}