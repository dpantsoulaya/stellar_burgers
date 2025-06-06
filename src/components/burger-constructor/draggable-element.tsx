import { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from '@services/store';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {
	clearDraggingElementIndex,
	getDraggingElementIndex,
	reorderElements,
	setDraggingElementIndex,
} from '@services/burger-constructor/slice';
import styles from './style.module.css';

type DraggableElementProps = {
	id: string;
	index: number;
	children: React.ReactNode;
};

type DragObject = {
	id: string;
	index: number;
};

// Идея взята из примера react-dnd,
export const DraggableElement = ({
	id,
	index,
	children,
}: DraggableElementProps): React.JSX.Element => {
	const dispatch = useDispatch();
	const draggingElementIndex = useSelector(getDraggingElementIndex);
	const ref = useRef<HTMLDivElement>(null);

	const [, drop] = useDrop<DragObject, unknown, unknown>({
		accept: 'element_reorder',
		hover: (item, monitor) => {
			if (!ref.current) {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) return;

			// Determine rectangle on screen
			const hoverBoundingRect = ref.current.getBoundingClientRect();
			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// Determine mouse position
			const clientOffset = monitor.getClientOffset();
			if (!clientOffset) return;

			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			// Time to actually perform the action
			dispatch(reorderElements({ toIndex: dragIndex, fromIndex: hoverIndex }));

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: 'element_reorder',
		item: () => {
			return { id, index };
		},
		end: () => {
			dispatch(clearDraggingElementIndex());
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	useEffect(() => {
		if (isDragging) {
			dispatch(setDraggingElementIndex({ index }));
		}
	}, [isDragging]);

	const opacity = draggingElementIndex === index ? 0 : 1;
	drag(drop(ref));

	return (
		<div
			className={styles.draggable_element_container}
			ref={ref}
			id={id}
			style={{ opacity }}>
			<DragIcon type='primary' />
			{children}
		</div>
	);
};
