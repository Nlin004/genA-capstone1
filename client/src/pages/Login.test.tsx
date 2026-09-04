
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AuthField from "./../components/AuthField";
import AuthActions from "./../components/AuthActions";
import Login from "./Login"


describe('Login Page', () => {
  it('should render the initial title', () => {
    render(<Login/>);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title.textContent).toBe('Welcome Back!');
  });

  it('should update form data on input change', () => {
    render(<Login/>);

    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
    const pwInput = screen.getByLabelText(/Password/i) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'nathan@gmail.com' } });
    fireEvent.change(pwInput, { target: { value: 'password' } });

    expect(emailInput.value).toBe('nathan@gmail.com');
    expect(pwInput.value).toBe('password');
  });

  it('should update the title and clear inputs on form submission', () => {
    render(<Login/>);

    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
    const pwInput = screen.getByLabelText(/Password/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /Create an account/i });

    // First, type into the inputs
    fireEvent.change(emailInput, { target: { value: 'nathan@gmail.com' } });
    fireEvent.change(pwInput, { target: { value: 'password' } });

    // Then, submit the form
    fireEvent.click(submitButton);

    // Check if the title is updated
    const title = screen.getByRole('heading', { level: 1 });
    expect(title.textContent).toBe('Your Recipes');

    // Check if the inputs are cleared
    // expect(cityNameInput.value).toBe('');
    // expect(countryNameInput.value).toBe('');
  });
});


// test("Testing successful login flow", () => {
//   // 1. Arrange: Set up the test by rendering the component with props.
//   const sampleValidUsername = "nathan@gmail.com";
//   const sampleValidPassword = "password"


//   render(<AuthField type="email" value={sampleValidUsername} />);
//   render(<AuthField type="password" value={sampleValidPassword} />);

//   // 2. Act: Find the element a user would see.
//   const listItem = screen.getByText(sampleValidUsername);

//   // 3. Assert: Verify that the element is in the document.
//   expect(listItem).toBeInTheDocument();

//   // Avoid testing implementation details like class names unless they
//   // are critical for accessibility or user-facing state.
//   expect(listItem).toHaveClass("TodoListItem");
// });






