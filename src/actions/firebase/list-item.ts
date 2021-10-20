import { db, fieldValue } from '../../firebase';
import { ListItemActions } from '../../ports';
import { ListItemData } from '../../types';

const teamsRef = db.collection('teams');

async function createListItem(teamId: string, listId: string, item: Partial<ListItemData>): Promise<void> {
  await teamsRef.doc(teamId).collection('lists').doc(listId).collection('items').add({
    created: fieldValue.serverTimestamp(),
    text: item.text,
    order: item.order,
    reactions: {},
  });
}

async function updateListItem(
  teamId: string,
  listId: string,
  itemId: string,
  newValues: Partial<ListItemData>
): Promise<void> {
  await teamsRef
    .doc(teamId)
    .collection('lists')
    .doc(listId)
    .collection('items')
    .doc(itemId)
    .set(newValues, {
      merge: true,
    });
}

async function deleteListItem(teamId: string, listId: string, itemId: string): Promise<void> {
  await teamsRef
    .doc(teamId)
    .collection('lists')
    .doc(listId)
    .collection('items')
    .doc(itemId)
    .delete();
}

const FirebaseListItemActions: ListItemActions = ({
  createListItem,
  updateListItem,
  deleteListItem
})

export default FirebaseListItemActions