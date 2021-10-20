import { db, fieldValue } from '../../firebase';
import { RoleActions } from '../../ports';
import { RoleData } from '../../types';

const teamsRef = db.collection('teams');

async function createRole(teamId: string, role: Partial<RoleData>) {
  await teamsRef.doc(teamId).collection('roles').add({
    created: fieldValue.serverTimestamp(),
    name: role.name,
    color: role.color,
    emoji: role.emoji,
    laneId: '',
  });
}

async function updateRole(teamId: string, roleId: string, role: Partial<RoleData>) {
  await teamsRef.doc(teamId).collection('roles').doc(roleId).set(
    {
      name: role.name,
      color: role.color,
      emoji: role.emoji,
    },
    { merge: true }
  );
}

async function moveRoleToLane(teamId: string, roleId: string, laneId: string) {
  await teamsRef.doc(teamId).collection('roles').doc(roleId).set(
    {
      laneId,
    },
    { merge: true }
  );
}

async function deleteRole(teamId: string, roleId: string) {
  await teamsRef.doc(teamId).collection('roles').doc(roleId).delete();
}

const FirebaseRoleActions: RoleActions = ({
  createRole,
  updateRole,
  moveRoleToLane,
  deleteRole
})

export default FirebaseRoleActions