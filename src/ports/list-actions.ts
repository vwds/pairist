import { ListData } from "../types";

export default interface ListActions {
    createList(teamId: string, list: Partial<ListData>): Promise<void>
    updateList(teamId: string, list: Partial<ListData>): Promise<void>
    deleteList(teamId: string, listId: string): Promise<void>
    reorderLists(teamId: string, listsWithNewOrders: ListData[]): Promise<void>
}