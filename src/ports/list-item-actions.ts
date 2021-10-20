import { ListItemData } from "../types";

export default interface ListItemActions {
    createListItem(teamId: string, listId: string, item: Partial<ListItemData>): Promise<void>
    updateListItem(
        teamId: string,
        listId: string,
        itemId: string,
        newValues: Partial<ListItemData>
    ): Promise<void>
    deleteListItem(teamId: string, listId: string, itemId: string): Promise<void>
}