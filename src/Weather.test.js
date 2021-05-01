import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Weather from './Weather'


it('check button render', () => {
    const { queryByTitle } = render(<Weather />)
    const btn = queryByTitle('button')
    expect(btn).toBeTruthy()
})


describe('check input', () => {
    it('input zipcode', () => {
        const { queryByTitle } = render(<Weather />)
        const input = queryByTitle('input')
        fireEvent.input(input)
        
    })
})

it('check input render', () => {
    const { queryByTitle } = render(<Weather />)
    const input = queryByTitle('input')
    expect(input).toBeTruthy()
})

describe('input change', () => {
    it('onChange', () => {
        const { queryByTitle } = render(<Weather />)
        const input = queryByTitle('input')
        fireEvent.change(input, { target: { value: '12345' }})
        expect(input.value).toBe('12345')
    })
})




