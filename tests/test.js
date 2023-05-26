import { render, cleanup, screen } from '@testing-library/svelte';
import Nfc from '$lib/front/Nfc.svelte';

// Run cleanup after each test
afterEach(cleanup);

// Write your tests
describe('MyComponent', () => {
  it('should render correctly', () => {
    render(Nfc);

    // Assert something about the rendered component
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
