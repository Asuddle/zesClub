import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import styles from '../../styles/Interest.module.scss';

export default function BecomeMemberModal({ open, handleClose }) {
	return (
		<div>
			<Modal
				className={styles.becomeMemberModal}
				isOpen={open}
				toggle={handleClose}
				centered
			>
				<Button className={styles.becomeMemberButton} onClick={handleClose}>
					Become Member
				</Button>
				<p className={styles.orText}>or</p>
				<Button className={styles.continueButton} onClick={handleClose}>
					Continue as Guest
				</Button>
				<p className={styles.alreadyLink} onClick={handleClose}>
					Already have account. <span>Login</span>
				</p>
			</Modal>
		</div>
	);
}
