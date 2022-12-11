import styles from '../styles/Home.module.scss';

export default function ContainerComponent({
	children,
	container = 'container',
}) {
	return <div className={styles[container]}>{children}</div>;
}
