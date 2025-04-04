import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import styles from './style.module.css';

export const DropTarget = ({ accept, children, style, onDropHandler }) => {
	const [{ isHover }, dropTarget] = useDrop({
		accept: accept,
		drop({ id }) {
			onDropHandler(id);
		},
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
	});

	return (
		<div
			ref={dropTarget}
			className={`${styles.drop_target}`}
			style={{
				borderColor: isHover ? 'blue' : 'transparent',
				...style,
			}}>
			{children}
		</div>
	);
};

DropTarget.propTypes = {
	accept: PropTypes.string,
	children: PropTypes.node,
	style: PropTypes.any,
	onDropHandler: PropTypes.func,
};
