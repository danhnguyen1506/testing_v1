import React from 'react'

export default class Product extends React.Component {
    render() {
        const { price, quantity, name } = this.props
        return (
        <div>
            <div>
            {name} - &#36;{price} {quantity ? `x ${quantity}` : null}
            </div>
        </div>
    )
    }
}