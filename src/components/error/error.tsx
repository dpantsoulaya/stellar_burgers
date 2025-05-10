import React from 'react';
import styles from './error.module.css';

type ErrorProps = {
	text?: string;
};

export const Error = ({ text }: ErrorProps): React.JSX.Element => {
	return <span className={styles.text}>{text}</span>;
};
