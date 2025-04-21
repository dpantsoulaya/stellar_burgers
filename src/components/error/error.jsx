import PropTypes from 'prop-types';
import styles from './error.module.css';

export const Error = ({ text }) => {
	return <span className={styles.text}>{text}</span>;
};

Error.propTypes = {
	text: PropTypes.string,
};
