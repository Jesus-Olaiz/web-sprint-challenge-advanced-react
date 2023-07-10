import AppFunctional from './AppFunctional'
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'



// Write your tests here

test('Component renders', () => {
  render(<AppFunctional />)
})

test('Typing in input changes value', () => {
  render(<AppFunctional />)

  const emailInput = screen.getByPlaceholderText("type email")

  fireEvent.change(emailInput, {target: {value: "lady@gaga.com"}})

  expect(emailInput.value).toBe("lady@gaga.com")
  
})

test('Clicking UP movement button changes position correctly', () => {
  render(<AppFunctional />)

  const directionalButton = screen.getByText("UP")

  fireEvent.click(directionalButton)

  expect(screen.findByText('Coordinates (2,1)'))
})

test('Clicking "submit" button submits data and changes Message display correctly', () => {
  render(<AppFunctional />)

  const submit = document.getElementById("submit")
  const emailInput = document.getElementById("email")
  

  fireEvent.change(emailInput, {target : {value : "lady@gaga.com"}})
  fireEvent.click(submit)

  expect(screen.findByText("lady win #25"))


})

test('Clicking reset after movement resets all changed data', () => {
  render(<AppFunctional />)

  const up = screen.getByText("UP")
  const coords = document.getElementById("coordinates")
  const steps = document.getElementById("steps")
  const reset = document.getElementById("reset")

  fireEvent.click(up)

  fireEvent.click(reset)

  expect(coords.textContent).toBe('Coordinates (2, 2)')
  expect(steps.textContent).toBe('You moved 0 times')


})



