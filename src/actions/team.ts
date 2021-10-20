import { auth, db, funcs } from '../firebase';
import TeamActions from '../ports/team-actions';
import { TeamData } from '../types';

const teamsRef = db.collection('teams');
const createTeamFunc = funcs.httpsCallable('createTeam');
const addTeamMemberFunc = funcs.httpsCallable('addTeamMember');
const removeTeamMemberFunc = funcs.httpsCallable('removeTeamMember');

async function createTeam(team: Partial<TeamData>): Promise<void> {
  const { teamId, teamName } = team;

  if (!teamId) return;

  const currentUser = auth.currentUser;

  await createTeamFunc({
    teamId,
    teamName,
    userDisplayName: currentUser ? currentUser.displayName : '',
    userPhotoURL: currentUser ? currentUser.photoURL : '',
  });
}

async function updateTeam(newValues: Partial<TeamData>): Promise<void> {
  const opts: Partial<TeamData> = {};

  if (newValues.hasOwnProperty('teamName')) opts.teamName = newValues.teamName;

  await teamsRef.doc(newValues.teamId).set(
    {
      ...opts,
    },
    { merge: true }
  );
}

async function addTeamMember(teamId: string, teamName: string, memberEmail: string): Promise<void> {
  await addTeamMemberFunc({
    teamId,
    teamName,
    memberEmail,
  });
}

async function removeTeamMember(teamId: string, userId: string): Promise<void> {
  await removeTeamMemberFunc({
    teamId,
    userId,
  });
}

const FirebaseTeamActions: TeamActions = ({
  createTeam,
  updateTeam,
  addTeamMember,
  removeTeamMember
})

export default FirebaseTeamActions