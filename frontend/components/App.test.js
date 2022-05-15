// Write your tests here
import server from '../../backend/mock-server'
import React from 'react'
import AppFunctional from './AppFunctional'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'



test('sanity', () => {
  expect(true).toBe(true);
})

test('AppClass loads', () =>{
render(<AppFunctional />);
})

test('Coordinates text exists', () =>{
  render(<AppFunctional />)
  const coordinates = document.querySelector('#coordinates')
  screen.findByText(coordinates)
  expect(coordinates.textContent).toContain('Coordinates')
})

test('Submit button exists', () =>{
  render(<AppFunctional />);
  const submitButton = document.querySelector('#submit')
  screen.findByText(submitButton);
  expect(submitButton.type).toBe('submit')
})

test('Buttons exist', () =>{
    render(<AppFunctional />);
  const up = document.querySelector('#up')
  screen.findByText(up)
  expect(up.textContent).toBe('UP')
  const down = document.querySelector('#down')
  screen.findByText(down)
  expect(down.textContent).toBe('DOWN')
  const left = document.querySelector('#left')
  screen.findByText(left)
  expect(left.textContent).toBe('LEFT')
  const right = document.querySelector('#right')
  screen.findByText(right)
  expect(right.textContent).toBe('RIGHT')
  const reset = document.querySelector('#reset')
  screen.findByText(reset)
  expect(reset.textContent).toBe('reset')
  
})

test('can type in the email field', () =>{
  render(<AppFunctional />);
  const email = document.querySelector('#email');
  fireEvent.change(email, { target: { value: 'lisamdespain@gmail.com' } })
  screen.findByText('lisamdespain@gmail.com')
})