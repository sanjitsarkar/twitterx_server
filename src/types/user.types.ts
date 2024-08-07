export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  password?: string;
  email?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUsersResponse {
  pageNumber: number, limit: number, searchQuery: string,
  sortBy?: string, orderBy?: string
}