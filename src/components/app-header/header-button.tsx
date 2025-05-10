import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.module.css';

type HeaderButtonProps = {
	icon?: JSX.Element;
	text: string;
	link: string;
	active?: boolean;
};

export const HeaderButton = ({
	icon,
	text,
	link,
	active,
}: HeaderButtonProps): React.JSX.Element => {
	return (
		<NavLink to={link}>
			<div className={`p-4 mb-4 mt-4 ${styles.button_container}`}>
				{icon}
				<div>
					<span
						className={`p-2 text text_type_main-default ${
							active ? styles.active_button : styles.disabled_button
						}`}>
						{text}
					</span>
				</div>
			</div>
		</NavLink>
	);
};
