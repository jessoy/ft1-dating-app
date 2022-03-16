const Block = (props) => {
	const { blockUser, blockButtonText, blockClicked } = props;

	return (
		<div style={{ margin: "20px" }}>
			<button onClick={blockUser}>{blockButtonText}</button>
			{blockClicked && <p>user has been blocked</p>}
		</div>
	);
};

export default Block;
