import { RoleData } from "../types";

export default interface RoleActions{
    createRole(teamId: string, role: Partial<RoleData>): Promise<void>
    updateRole(teamId: string, roleId: string, role: Partial<RoleData>): Promise<void>
    moveRoleToLane(teamId: string, roleId: string, laneId: string): Promise<void>
    deleteRole(teamId: string, roleId: string): Promise<void>
}