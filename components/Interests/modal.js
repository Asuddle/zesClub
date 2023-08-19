import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import styles from '../../styles/Interest.module.scss';
import { useRouter } from 'next/router';

export default function BecomeMemberModal({
	open,
	handleClose,
	showGuest = true,
}) {
	const router = useRouter();
	const handleLogin = () => {
		router.push('/login');
	};
	return (
		<div>
			<Modal
				className={styles.becomeMemberModal}
				isOpen={open}
				toggle={handleClose}
				centered
			>
				<Button className={styles.becomeMemberButton} onClick={handleLogin}>
					Become Member
				</Button>
				{showGuest && (
					<>
						<p className={styles.orText}>or</p>
						<Button className={styles.continueButton} onClick={handleClose}>
							Continue as Guest
						</Button>
					</>
				)}{' '}
				<p className={styles.alreadyLink} onClick={handleLogin}>
					Already have account. <span>Login</span>
				</p>
			</Modal>
		</div>
	);
}
