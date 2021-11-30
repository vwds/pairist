import { DataStore } from "@aws-amplify/datastore"
import { Lane } from "../../models"
import { LaneActions } from "../../ports"
import { LaneData } from "../../types"

const createLane = (teamId: string) => DataStore.save(new Lane({
  teamID: teamId,
  isLocked: false
})).then(l => l.id)

const changeLaneState = async (teamId: string, laneId: string, isLocked: boolean) => {
  DataStore.query(Lane, laneId)
    .then(lane => DataStore.save(Lane.copyOf(lane!!, m => { m.isLocked = isLocked })))
}

const lockLane = async (teamId: string, laneId: string) => changeLaneState(teamId, laneId, true)

const unlockLane = async (teamId: string, laneId: string) => changeLaneState(teamId, laneId, false)

const deleteLane = async (teamId: string, laneId: string) => {
  await DataStore.delete(Lane, l =>
    l.id("eq", laneId) && l.teamID("eq", teamId)
  )
}

const getAllLanes = async (teamId: string): Promise<LaneData[]> => {
  const lanes = await DataStore.query(Lane, l => l.teamID("eq", teamId))
  return lanes.map(l => ({ laneId: l.id, isLocked: l.isLocked }))
}

const AWSLaneActions: LaneActions = ({
  createLane,
  lockLane,
  unlockLane,
  deleteLane,
  getAllLanes
})

export default AWSLaneActions
