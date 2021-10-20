export default interface PersonActions{
    movePersonToLane(teamId: string, userId: string, laneId: string): Promise<void>
    lockPerson(teamId: string, userId: string): Promise<void>
    unlockPerson(teamId: string, userId: string): Promise<void>
}