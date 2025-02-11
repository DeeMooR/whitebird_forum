export const mockGetPostDataFunc = (navigate) => ([
  {
    input: {
      param: '101',
      localPosts: [{ id: 101 }],
      userAccount: { 
        id: 1, 
        name: "John", 
        username: "john_doe", 
        email: "john@example.com" 
      },
      navigate
    },
    expected: {
      post: { id: 101 },
      user: {
        id: 1,
        name: "John",
        username: "john_doe",
        email: "john@example.com",
      },
      controls: true,
    }
  },
  {
    input: {
      param: '150',
      localPosts: [{ id: 101 }],
      userAccount: { 
        id: 1, 
        name: "John", 
        username: "john_doe", 
        email: "john@example.com" 
      },
      navigate
    },
    expected: {
      post: undefined,
      user: {
        id: 1,
        name: "John",
        username: "john_doe",
        email: "john@example.com",
      },
      controls: true,
    }
  },
  {
    input: {
      param: '50',
      localPosts: [],
      userAccount: { 
        id: 1, 
        name: "John", 
        username: "john_doe", 
        email: "john@example.com" 
      },
      navigate
    },
    expected: {
      postId: 50,
      navigate
    }
  },
]);