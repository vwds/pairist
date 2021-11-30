import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ListItemReactionsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ListItemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ListMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PersonMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TeamMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LaneMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TrackMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RoleMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TeamPersonMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class ListItemReactions {
  readonly id: string;
  readonly name: string;
  readonly count: number;
  readonly timestamp?: number;
  readonly listitemID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ListItemReactions, ListItemReactionsMetaData>);
  static copyOf(source: ListItemReactions, mutator: (draft: MutableModel<ListItemReactions, ListItemReactionsMetaData>) => MutableModel<ListItemReactions, ListItemReactionsMetaData> | void): ListItemReactions;
}

export declare class ListItem {
  readonly id: string;
  readonly text: string;
  readonly checked: string;
  readonly order: number;
  readonly reactions?: (ListItemReactions | null)[];
  readonly listID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ListItem, ListItemMetaData>);
  static copyOf(source: ListItem, mutator: (draft: MutableModel<ListItem, ListItemMetaData>) => MutableModel<ListItem, ListItemMetaData> | void): ListItem;
}

export declare class List {
  readonly id: string;
  readonly title: string;
  readonly order?: number;
  readonly items?: (ListItem | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<List, ListMetaData>);
  static copyOf(source: List, mutator: (draft: MutableModel<List, ListMetaData>) => MutableModel<List, ListMetaData> | void): List;
}

export declare class Person {
  readonly id: string;
  readonly userUUID?: string;
  readonly isLocked: boolean;
  readonly teams?: (TeamPerson | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Person, PersonMetaData>);
  static copyOf(source: Person, mutator: (draft: MutableModel<Person, PersonMetaData>) => MutableModel<Person, PersonMetaData> | void): Person;
}

export declare class Team {
  readonly id: string;
  readonly name: string;
  readonly persons?: (TeamPerson | null)[];
  readonly lanes?: (Lane | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Team, TeamMetaData>);
  static copyOf(source: Team, mutator: (draft: MutableModel<Team, TeamMetaData>) => MutableModel<Team, TeamMetaData> | void): Team;
}

export declare class Lane {
  readonly id: string;
  readonly isLocked: boolean;
  readonly tracks?: (Track | null)[];
  readonly roles?: (Role | null)[];
  readonly teamID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Lane, LaneMetaData>);
  static copyOf(source: Lane, mutator: (draft: MutableModel<Lane, LaneMetaData>) => MutableModel<Lane, LaneMetaData> | void): Lane;
}

export declare class Track {
  readonly id: string;
  readonly nam: string;
  readonly color: string;
  readonly emoji: string;
  readonly laneID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Track, TrackMetaData>);
  static copyOf(source: Track, mutator: (draft: MutableModel<Track, TrackMetaData>) => MutableModel<Track, TrackMetaData> | void): Track;
}

export declare class Role {
  readonly id: string;
  readonly name: string;
  readonly color: string;
  readonly emoji: string;
  readonly laneID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Role, RoleMetaData>);
  static copyOf(source: Role, mutator: (draft: MutableModel<Role, RoleMetaData>) => MutableModel<Role, RoleMetaData> | void): Role;
}

export declare class TeamPerson {
  readonly id: string;
  readonly personID: string;
  readonly teamID: string;
  readonly person: Person;
  readonly team: Team;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TeamPerson, TeamPersonMetaData>);
  static copyOf(source: TeamPerson, mutator: (draft: MutableModel<TeamPerson, TeamPersonMetaData>) => MutableModel<TeamPerson, TeamPersonMetaData> | void): TeamPerson;
}