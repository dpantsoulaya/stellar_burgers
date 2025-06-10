import { useDrop } from 'react-dnd';
import styles from './style.module.css';

type DropTargetProps = {
	accept: string;
	children: React.ReactNode;
	style?: React.CSSProperties;
	onDropHandler: (id: string) => void;
};

export const DropTarget = ({
	accept,
	children,
	style,
	onDropHandler,
}: DropTargetProps): React.JSX.Element => {
	const [{ isHover }, dropTarget] = useDrop({
		accept: accept,
		drop({ id }: { id: string }) {
			if (onDropHandler) onDropHandler(id);
		},
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
	});

	return (
		<div
			ref={dropTarget}
			className={`${styles.drop_target}`}
			data-testid='drop-container'
			style={{
				borderColor: isHover ? 'blue' : 'transparent',
				...style,
			}}>
			{children}
		</div>
	);
};
