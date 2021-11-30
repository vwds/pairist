import { DataStore } from "@aws-amplify/datastore"
import { Lane } from "../../models"
import AWSLaneActions from "./lane"
import { datatype } from "faker"

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


describe("Lane action tests", () => {

    beforeEach(jest.clearAllMocks)

    const { createLane, lockLane, unlockLane, deleteLane, getAllLanes } = AWSLaneActions

    it("creates a lane", async () => {
        saveMock.mockResolvedValueOnce({ id: datatype.number().toString() })
        const teamId = datatype.number().toString()

        await createLane(teamId)

        expect(saveMock).toHaveBeenCalledWith(expect.objectContaining({
            teamID: teamId
        }))
    })

    it("locks a lane", async () => {
        const lane = new Lane({
            isLocked: false,
            teamID: datatype.number().toString()
        })
        const [teamId, laneId] = [lane.teamID!!, lane.id]
        queryMock.mockResolvedValueOnce(lane)
        saveMock.mockResolvedValueOnce({ id: lane.id })

        await lockLane(teamId, laneId)

        expect(queryMock).toHaveBeenCalled()
        expect(saveMock).toHaveBeenCalledWith(
            expect.objectContaining({
                id: laneId,
                teamID: teamId,
                isLocked: true
            }))
    })

    it("unlocks a lane", async () => {
        const lane = new Lane({
            isLocked: true,
            teamID: datatype.number().toString()
        })
        const [teamId, laneId] = [lane.teamID!!, lane.id]
        queryMock.mockResolvedValueOnce(lane)
        saveMock.mockResolvedValueOnce({ id: lane.id })

        await unlockLane(teamId, laneId)

        expect(queryMock).toHaveBeenCalled()
        expect(saveMock).toHaveBeenCalledWith(
            expect.objectContaining({
                id: laneId,
                teamID: teamId,
                isLocked: false
            }))
    })

    it("deletes a lane", async () => {
        const [teamId, laneId] = [datatype.number().toString(), datatype.number().toString()]

        await deleteLane(teamId, laneId)

        expect(deleteMock).toHaveBeenCalled()
    })


    it("gets all lanes", async () => {
        const teamId = datatype.number().toString()
        const lanes = [
            new Lane({
                isLocked: datatype.boolean(),
                teamID: teamId
            }),
            new Lane({
                isLocked: datatype.boolean(),
                teamID: teamId
            })
        ]
        queryMock.mockResolvedValueOnce(lanes)

        const fetchedLanes = await getAllLanes(teamId)

        expect(queryMock).toHaveBeenCalled()
        const thisTeamsLanes = lanes.filter(l => l.teamID === teamId)
        expect(fetchedLanes
            .every(l => thisTeamsLanes
                .some(ttl => ttl.id === l.laneId)
            )
        ).toBeTruthy()
    })
})