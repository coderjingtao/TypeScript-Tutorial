export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errorCode?: string; // 业务错误码，例如 USER_NOT_FOUND
}

export interface PageData<T> {
  items: T[]; // 当前页的数据项
  total: number; // 总记录数
  page: number; // 当前页码
  pageSize: number; // 每页记录数
}
/*
Example:
{
  success: true,
  data: {
    items: User[];
    total: number;
    page: number;
    pageSize: number;
  };
  message?: string;
  errorCode?: string;
}
*/
export interface PaginatedResponse<T> extends ApiResponse<PageData<T>> {}

// 工具函数：快速构造响应
export const success = <T>(data: T, message = 'success'): ApiResponse<T> => ({
  success: true,
  data,
  message,
});

export const failure = <T>(
  message: string,
  errorCode?: string
): ApiResponse<T> => ({
  success: false,
  message,
  errorCode,
});
