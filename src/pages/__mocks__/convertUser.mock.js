export const mockConvertUser = [
  {
    inputA: {
      name: 'John',
      username: 'john_doe',
      email: 'john@example.com',
      phone: '1234567890',
      city: 'New York',
      zipcode: '10001',
      street: '5th Avenue',
      suite: '101',
    },
    inputB: 1,
    expected: {
      id: 1,
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
    }
  },
  {
    inputA: {
      name: 'John',
      username: 'john_doe',
      email: 'john@example.com',
      phone: '1234567890',
    },
    inputB: 1,
    expected: {
      id: 1,
      name: 'John',
      username: 'john_doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: {
        city: undefined,
        zipcode: undefined,
        street: undefined,
        suite: undefined,
      },
    }
  }
]