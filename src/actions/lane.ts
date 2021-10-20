import { db, fieldValue } from '../firebase';
import { LaneActions } from '../ports';

const teamsRef = db.collection('teams');

async function createLane(teamId: string): Promise<string> {
  const doc = await teamsRef.doc(teamId).collection('lanes').add({
    created: fieldValue.serverTimestamp(),
    isLocked: false,
  });

  return doc.id;
}

async function lockLane(teamId: string, laneId: string) {
  await teamsRef.doc(teamId).collection('lanes').doc(laneId).update({
    isLocked: true,
  });
}

async function unlockLane(teamId: string, laneId: string) {
  await teamsRef.doc(teamId).collection('lanes').doc(laneId).update({
    isLocked: false,
  });
}

async function deleteLane(teamId: string, laneId: string) {
  await teamsRef.doc(teamId).collection('lanes').doc(laneId).delete();
}

const FirebaseLaneActions = (): LaneActions => ({
  createLane,
  lockLane,
  unlockLane,
  deleteLane
})

export default FirebaseLaneActions
