import { Card } from 'reactstrap';
import styles from '../../styles/Register.module.scss';

export default function CardWrapper({ children }) {
	return <Card className={styles.card}>{children}</Card>;
}
