import { TeamData } from "../types";

export default interface TeamActions {
    createTeam(team: Partial<TeamData>): Promise<void>
    updateTeam(newValues: Partial<TeamData>): Promise<void>
    addTeamMember(teamId: string, teamName: string, memberEmail: string): Promise<void>
    removeTeamMember(teamId: string, userId: string): Promise<void>
}