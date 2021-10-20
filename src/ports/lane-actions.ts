export default interface LaneActions {
    createLane(teamId: string): Promise<string>
    lockLane(teamId: string, laneId: string): Promise<void>
    unlockLane(teamId: string, laneId: string): Promise<void>
    deleteLane(teamId: string, laneId: string): Promise<void>
}