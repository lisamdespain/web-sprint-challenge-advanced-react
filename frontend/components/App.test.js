// Write your tests here
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import AppClass from './AppClass';



test('sanity', () => {
  expect(true).toBe(true);
})

test('AppClass loads', () =>{
render(<AppClass />);
})

test('We have a header', () =>{
  render(<AppClass />);
  const header = screen.getByText(/Welcome to the GRID/i);
  expect(header).toBeInTheDocument();
})

test('Button text exists', () =>{
    render(<AppClass />);
    const rightButton = screen.getByText(/right/i)
    expect(rightButton).toBeInTheDocument();
    const leftButton = screen.getByText(/left/i)
    expect(leftButton).toBeInTheDocument();
    const downButton = screen.getByText(/down/i)
    expect(downButton).toBeInTheDocument();
    const upButton = screen.getByText(/up/i)
    expect(upButton).toBeInTheDocument();
    const resetButton = screen.getByText(/reset/i)
    expect(resetButton).toBeInTheDocument();
})

test('Link text exists', () =>{
      render(<AppClass />);
      const functionalLink = screen.getByDisplayValue(/functional/i)
      expect(functionalLink).toBeInTheDocument();
})

test('can type in the email field', () =>{
  render(<AppClass />);
  const emailInput = screen.getByPlaceholderText(/type email/i)
  fireEvent.type(emailInput, { target: { value: 'lisamdespain@gmail.com' } })
  expect(emailInput).toHaveValue('lisamdespain@gmail.com')
})