import { render } from '@testing-library/react';
import { Footer } from '..'; 

describe('Footer', () => {
  it('should render Footer', () => {
    const { container } = render(<Footer />);

    const element = container.querySelector('footer');
    expect(element).toMatchSnapshot();
  });
});