import { css } from 'astroturf';
import { DragEvent } from 'react';
import { Lock, Trash, Unlock } from 'react-feather';
import { PersonActions, TeamActions } from '../actions/firebase';
import { cn } from '../helpers';
import { useAdditionalUserInfo } from '../hooks/useAdditionalUserInfo';
import { useModal } from '../hooks/useModal';
import ConfirmDelete from './ConfirmDelete';
import IconButton from './IconButton';

interface Props {
  userId: string;
  displayName: string;
  photoURL: string;
  teamId: string;
  isLocked?: boolean;
  draggable: boolean;
  editable?: boolean;
}

export default function Person(props: Props) {
  const { displayName, teamId, isLocked, userId } = props;
  const { identiconString } = useAdditionalUserInfo(userId);
  const [, setModalContent] = useModal();

  const name = displayName || '(no display name)';

  function toggleLocked() {
    if (isLocked) {
      PersonActions.unlockPerson(teamId, userId);
    } else {
      PersonActions.lockPerson(teamId, userId);
    }
  }

  function removeMember() {
    setModalContent(
      <ConfirmDelete
        action={`remove ${displayName || 'this user'} from this team`}
        deletingText="Removing..."
        onConfirm={() => TeamActions.removeTeamMember(teamId, userId)}
      />
    );
  }

  function onDragStart(evt: DragEvent<HTMLDivElement>) {
    evt.dataTransfer.setData('entityType', 'person');
    evt.dataTransfer.setData('entityId', props.userId);
  }

  return (
    <div
      className={cn(styles.person)}
      draggable={props.draggable}
      onDragStart={onDragStart}
    >
      <div className={styles.photo}>
        {props.photoURL ? (
          <img className={styles.img} src={props.photoURL} alt={name} draggable={false} />
        ) : (
          <svg className={styles.img} width="80" height="80"
            data-jdenticon-value={identiconString ? identiconString : props.userId} />
        )}
      </div>

      <div className={styles.name}>{name}</div>

      {props.editable && (
        <div className={styles.buttons}>
          <IconButton
            icon={isLocked ? <Lock /> : <Unlock />}
            label={isLocked ? 'Unlock person' : 'Lock person'}
            onClick={toggleLocked}
            dark={isLocked}
          />
          <IconButton icon={<Trash />} label="Remove person from team" onClick={removeMember} />
        </div>
      )}
    </div>
  );
}

const styles = css`
  @import '../variables.scss';

  .person {
    background: var(--color-theme);
    border: 1px solid var(--color-border);
    display: inline-flex;
    color: inherit;
    transition: background 0.1s ease-in-out;
    border-radius: $unit-half;
    font-size: inherit;
    align-items: center;
    margin: $unit;
    user-select: none;

    &[draggable='true'] {
      cursor: move;
    }
  }

  .photo {
    height: 3em;

    svg {
      stroke: none;
    }
  }

  .img {
    width: 3em;
    height: 3em;
    border-radius: $unit-half;
  }

  .name {
    padding: 0 $unit;
  }

  .buttons {
    margin-right: $unit-half;
  }
`;
