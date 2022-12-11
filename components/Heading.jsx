import styles from '../styles/Home.module.scss';

export default function HeadingComponent({
	heading,
	subHeading,
	subBoldHeading,
}) {
	return (
		<div className={styles.headingWrapper}>
			<p className={styles.heading}>{heading}</p>
			<p className={styles.subHeading}>
				{subHeading} <span>{subBoldHeading}</span>
			</p>
		</div>
	);
}
