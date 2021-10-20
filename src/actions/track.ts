import { db, fieldValue } from '../firebase';
import TrackActions from '../ports/track-actions';
import { TrackData } from '../types';

const teamsRef = db.collection('teams');

async function createTrack(teamId: string, track: Partial<TrackData>): Promise<void> {
  await teamsRef.doc(teamId).collection('tracks').add({
    created: fieldValue.serverTimestamp(),
    name: track.name,
    color: track.color,
    emoji: track.emoji,
    laneId: '',
  });
}

async function updateTrack(teamId: string, trackId: string, track: Partial<TrackData>): Promise<void> {
  await teamsRef.doc(teamId).collection('tracks').doc(trackId).set(
    {
      name: track.name,
      color: track.color,
      emoji: track.emoji,
    },
    { merge: true }
  );
}

async function moveTrackToLane(teamId: string, trackId: string, laneId: string): Promise<void> {
  await teamsRef.doc(teamId).collection('tracks').doc(trackId).set(
    {
      laneId,
    },
    { merge: true }
  );
}

async function deleteTrack(teamId: string, trackId: string): Promise<void> {
  await teamsRef.doc(teamId).collection('tracks').doc(trackId).delete();
}

const FirebaseTrackActions: TrackActions = ({
  createTrack,
  updateTrack,
  moveTrackToLane,
  deleteTrack
})

export default FirebaseTrackActions