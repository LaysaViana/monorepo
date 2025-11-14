// src/shared/Checkbox.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  test('renderiza corretamente com o texto fornecido', () => {
    render(<Checkbox>Produto Único</Checkbox>);

    const labelElement = screen.getByText(/Produto Único/i);
    expect(labelElement).toBeInTheDocument();

    const checkboxInput = screen.getByRole('checkbox');
    expect(checkboxInput).toBeInTheDocument();
  });

  test('dispara onChange ao ser clicado', () => {
    const handleChange = jest.fn();
    render(
      <Checkbox type="radio" onChange={handleChange}>
        Produto Único
      </Checkbox>
    );

    const checkboxInput = screen.getByRole('radio');
    fireEvent.click(checkboxInput);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
