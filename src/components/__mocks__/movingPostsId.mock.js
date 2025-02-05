export const mockMovingPostsId = [
  // [inputA (posts), inputB (postId), expected (result)]
  [
    [
      { id: 1, priority: 1 },
      { id: 2, priority: 1 },
      { id: 3, priority: 2 },
    ],
    2,
    { upPostId: 1, downPostId: null },
  ],
  [
    [
      { id: 1, priority: 1 },
      { id: 2, priority: 1 },
      { id: 4, priority: 1 },
      { id: 3, priority: 2 },
    ],
    2,
    { upPostId: 1, downPostId: 4 },
  ],
  [
    [
      { id: 1, priority: 1 },
      { id: 2, priority: 2 },
      { id: 3, priority: 2 },
      { id: 4, priority: 1 },
    ],
    2,
    { upPostId: null, downPostId: 3 },
  ]
];
