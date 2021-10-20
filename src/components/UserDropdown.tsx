import { ChevronDown, Lock, LogOut, User } from 'react-feather';
import { useHistory } from 'react-router-dom';
import UserActions from '../actions/user';
import { useModal } from '../hooks/useModal';
import { useSession } from '../hooks/useSession';
import { useAdditionalUserInfo } from '../hooks/useAdditionalUserInfo';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';
import EditProfile from './EditProfile';
import ResetPasswordDialog from './ResetPasswordDialog';
import HeaderButton from './HeaderButton';

export default function UserDropdown() {
  const session = useSession();
  const history = useHistory();
  const { identiconString } = useAdditionalUserInfo(session.userId);
  const [, setModalContent] = useModal();

  if (!session.loaded) {
    return <HeaderButton disabled content="Loading..." />;
  }

  if (!session.userId) {
    return null;
  }

  const displayName = session.displayName || session.email || '';
  const imageURL = session.photoURL || '';
  const imageHash = identiconString ? identiconString : session.userId || '';

  async function logOut() {
    await UserActions.logOut();
    history.push('/');
  }

  return (
    <Dropdown
      align="right"
      trigger={
        <HeaderButton
          icon={<ChevronDown />}
          content={displayName}
          imageURL={imageURL}
          imageHash={imageHash}
        />
      }
    >
      <DropdownItem leftIcon={<User />} onClick={() => setModalContent(<EditProfile />)}>
        Edit profile
      </DropdownItem>
      <DropdownItem
        leftIcon={<Lock />}
        onClick={() => setModalContent(<ResetPasswordDialog />)}
      >
        Reset password
      </DropdownItem>
      <DropdownItem leftIcon={<LogOut />} onClick={logOut}>
        Log out
      </DropdownItem>
    </Dropdown>
  );
}
