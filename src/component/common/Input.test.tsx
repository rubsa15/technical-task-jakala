import { render, screen } from '@testing-library/react';
import { Input } from './Input';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Input component', () => {
  it('should render correctly without props', () => {
    render(<Input />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('should render label and input correctly', () => {
    const label = 'Test Label';

    render(<Input id='test-input' name='testField' label={label} />);

    const input = screen.getByLabelText(label);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('should call the onChange function when the value changes', async () => {
    const handleChange = vi.fn();

    render(<Input onChange={handleChange} />);

    const inputElement = screen.getByRole('textbox');

    await userEvent.type(inputElement, 'Hello');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(5);
  });
});
