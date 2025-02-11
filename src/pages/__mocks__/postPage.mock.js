export const initState = {
  post: {
    post: {
      id: 1,
      title: 'title',
      body: 'body'
    },
    user: {
      id: 1,
      username: 'username',
      email: 'test@gmail.com'
    },
    isLoading: false,
    errorMessage: null,
  },
  local: {
    posts: [],
    isLoading: false
  },
  user: {
    user: {}
  }
}