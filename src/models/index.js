// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ListItemReactions, ListItem, List, Person, Team, Lane, Track, Role, TeamPerson } = initSchema(schema);

export {
  ListItemReactions,
  ListItem,
  List,
  Person,
  Team,
  Lane,
  Track,
  Role,
  TeamPerson
};