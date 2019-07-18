import React from 'react'

class SearchBar extends React.Component{
    render() {
		const { onInputChange } = this.props;
		let input

		return (
			<div style={{'margin':'15px 0'}}>
				<input
					placeholder="Search a product..."
					ref={ node => {
						input = node
					}}
					onChange={ () => {
						onInputChange(input.value)
					}} />
			</div>
		)
	}
}

export default connect()(SearchBar)