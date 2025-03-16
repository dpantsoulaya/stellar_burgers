export const HeaderButton = ({ icon, text, active }) => {
	return (
		<div style={styles.container} className='p-4 mb-4 mt-4'>
			{icon}
			<div
				className='p-2 text text_type_main-default'
				style={{ color: active ? 'white' : '#8585AD' }}>
				{text}
			</div>
		</div>
	);
};

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
};
