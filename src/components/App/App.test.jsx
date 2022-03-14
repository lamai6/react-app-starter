import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Count incrementation', () => {
  it('should increment counter when clicking on increment button', () => {
    render(<App />);
    const title = screen.getByRole('heading', { name: /counter/i });
    const incButton = screen.getByRole('button', { name: /increment/i });

    expect(title).toHaveTextContent('Counter: 0');
    fireEvent.click(incButton);
    expect(title).toHaveTextContent('Counter: 1');
  });
});

describe('Count decrementation', () => {
  it('should decrement counter when clicking on decrement button', () => {
    render(<App />);
    const title = screen.getByRole('heading', { name: /counter/i });
    const incButton = screen.getByRole('button', { name: /increment/i });
    const decButton = screen.getByRole('button', { name: /decrement/i });

    fireEvent.click(incButton);
    expect(title).toHaveTextContent('Counter: 1');
    fireEvent.click(decButton);
    expect(title).toHaveTextContent('Counter: 0');
  });

  it('should not decrement counter under 0 when clicking on decrement button', () => {
    render(<App />);
    const title = screen.getByRole('heading', { name: /counter/i });
    const decButton = screen.getByRole('button', { name: /decrement/i });

    expect(title).toHaveTextContent('Counter: 0');
    fireEvent.click(decButton);
    expect(title).toHaveTextContent('Counter: 0');
  });
});

describe('Count reset', () => {
  it('should reset counter when clicking on reset button', () => {
    render(<App />);
    const title = screen.getByRole('heading', { name: /counter/i });
    const incButton = screen.getByRole('button', { name: /increment/i });
    const resButton = screen.getByRole('button', { name: /reset/i });

    fireEvent.click(incButton);
    fireEvent.click(incButton);
    expect(title).toHaveTextContent('Counter: 2');
    fireEvent.click(resButton);
    expect(title).toHaveTextContent('Counter: 0');
  });
});
