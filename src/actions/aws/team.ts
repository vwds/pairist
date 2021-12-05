import { DataStore } from "@aws-amplify/datastore"
import { Team } from "../../models"
import { TeamActions } from "../../ports"
import { TeamData } from "../../types"

const createTeam = async (team: Partial<TeamData>): Promise<void> => {
    await DataStore.save(
        new Team({
            name: team.teamName
        })
    )
}

const updateTeam = (newValues: Partial<TeamData>): Promise<void> => Promise.resolve()
const addTeamMember = (teamId: string, teamName: string, memberEmail: string): Promise<void> => Promise.resolve()
const removeTeamMember = (teamId: string, userId: string): Promise<void> => Promise.resolve()


const AWSTeamActions: TeamActions = ({
    createTeam,
    updateTeam,
    addTeamMember,
    removeTeamMember
})

export default AWSTeamActions