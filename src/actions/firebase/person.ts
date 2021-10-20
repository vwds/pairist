import { db } from '../../firebase';
import { PersonActions } from '../../ports';

const teamsRef = db.collection('teams');

async function movePersonToLane(teamId: string, userId: string, laneId: string) {
  const newSettings: {
    laneId: string;
    isLocked?: boolean;
  } = {
    laneId,
  };

  if (laneId) {
    // We only want to update this field when we are moving this person into an
    // actual lane. And if we're moving this person to a lane, we know they should
    // not be considered locked anymore.
    newSettings.isLocked = false;
  }

  await teamsRef.doc(teamId).collection('people').doc(userId).set(newSettings, { merge: true });
}

async function lockPerson(teamId: string, userId: string): Promise<void> {
  await teamsRef.doc(teamId).collection('people').doc(userId).set(
    {
      isLocked: true,
      laneId: '',
    },
    { merge: true }
  );
}

async function unlockPerson(teamId: string, userId: string): Promise<void> {
  await teamsRef.doc(teamId).collection('people').doc(userId).set(
    {
      isLocked: false,
    },
    { merge: true }
  );
}

const FirebasePersonActions: PersonActions = ({
  movePersonToLane,
  lockPerson,
  unlockPerson
})

export default FirebasePersonActions