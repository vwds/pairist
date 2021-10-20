import { TrackData } from "../types";

export default interface TrackActions {
    createTrack(teamId: string, track: Partial<TrackData>): Promise<void>
    updateTrack(teamId: string, trackId: string, track: Partial<TrackData>): Promise<void>
    moveTrackToLane(teamId: string, trackId: string, laneId: string): Promise<void>
    deleteTrack(teamId: string, trackId: string): Promise<void>
}