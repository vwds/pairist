import { DataStore } from "@aws-amplify/datastore"
import AWSTeamActions from "./team"
import { datatype } from "faker"
import { Team } from "../../models"
import { TeamData } from "../../types"

jest.mock("@aws-amplify/datastore", () => ({
    ...jest.requireActual("@aws-amplify/datastore"),
    DataStore: {
        save: jest.fn(),
        query: jest.fn(),
        delete: jest.fn()
    }
}))

const queryMock = DataStore.query as jest.MockedFunction<typeof DataStore.query>
const saveMock = DataStore.save as jest.MockedFunction<typeof DataStore.save>
const deleteMock = DataStore.delete as jest.MockedFunction<typeof DataStore.delete>


describe("AWS team actions", () => {
    const { createTeam, updateTeam, addTeamMember, removeTeamMember } = AWSTeamActions

    it("creates a new team", async () => {
        /*
            TODO: Before advancing, take into consideration that teamId in
            Firebase side is not really the "table" id but the path for which
            you will be taken to your team's page.

            So back to the drawing board.
        */
        saveMock.mockResolvedValueOnce({ id: datatype.number().toString() })
        const teamData = { teamName: datatype.string() } as TeamData

        await createTeam(teamData)

        expect(saveMock).toHaveBeenCalledWith(expect.objectContaining({
            name: teamData.teamName
        }))
    })
})