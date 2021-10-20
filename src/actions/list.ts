import { db, fieldValue } from '../firebase';
import ListActions from '../ports/list-actions';
import { ListData } from '../types';

const teamsRef = db.collection('teams');

async function createList(teamId: string, list: Partial<ListData>): Promise<void> {
  await teamsRef
    .doc(teamId)
    .collection('lists')
    .add({
      created: fieldValue.serverTimestamp(),
      title: list.title || 'Untitled',
      order: list.order,
    });
}

async function updateList(teamId: string, list: Partial<ListData>): Promise<void> {
  await teamsRef
    .doc(teamId)
    .collection('lists')
    .doc(list.listId)
    .update({
      title: list.title || 'Untitled',
    });
}

async function deleteList(teamId: string, listId: string): Promise<void> {
  await teamsRef.doc(teamId).collection('lists').doc(listId).delete();
}

async function reorderLists(teamId: string, listsWithNewOrders: ListData[]): Promise<void> {
  const batch = db.batch();

  for (const list of listsWithNewOrders) {
    batch.set(
      teamsRef.doc(teamId).collection('lists').doc(list.listId),
      { order: list.order },
      { merge: true }
    );
  }

  await batch.commit();
}

const FirebaseListActions: ListActions = ({
  createList,
  updateList,
  deleteList,
  reorderLists
})

export default FirebaseListActions
