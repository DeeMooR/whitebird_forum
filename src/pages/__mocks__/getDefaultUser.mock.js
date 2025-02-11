export const mockGetDefaultUser = [
  {
    input: {},
    expected: {
      name: '',
      username: '',
      email: '',
      phone: '',
      city: '',
      zipcode: '',
      street: '',
      suite: '',
    }
  },
  {
    input: {
      name: 'John',
      username: 'john_doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: {
        city: 'New York',
        zipcode: '10001',
        street: '5th Avenue',
        suite: '101',
      },
    },
    expected: {
      name: 'John',
      username: 'john_doe',
      email: 'john@example.com',
      phone: '1234567890',
      city: 'New York',
      zipcode: '10001',
      street: '5th Avenue',
      suite: '101',
    }
  },
];