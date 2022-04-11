export interface IUserPaginationInterface<T> {
    page: number,
    perPage: number,
    totalItems: number,
    data: T[]
}
