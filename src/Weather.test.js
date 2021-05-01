import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Weather from './Weather'


it('check weather render', () => {
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

