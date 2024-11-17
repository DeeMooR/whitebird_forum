export interface IControlsPost {
  postId: number,
  likeUserIds: number[],
  dislikeUserIds: number[]
}

export let controlsPosts: IControlsPost[] = [
  {
    postId: 1,
    likeUserIds: [1, 3, 5, 12, 18, 23, 27, 33, 41],
    dislikeUserIds: [2, 11, 15]
  },
  {
    postId: 2,
    likeUserIds: [4, 3, 5, 94, 69, 91, 23, 71, 75],
    dislikeUserIds: [10, 54]
  },
  {
    postId: 3,
    likeUserIds: [10, 8, 1, 30, 32, 71, 52, 34, 93, 81, 86, 76, 54],
    dislikeUserIds: [6, 44, 18]
  },
  {
    postId: 4,
    likeUserIds: [5, 7, 6, 67, 34, 46, 48, 69, 94, 65, 13],
    dislikeUserIds: [4, 79]
  },
  {
    postId: 5,
    likeUserIds: [3, 10, 8, 58, 68, 61, 99, 36, 13, 32],
    dislikeUserIds: [7]
  },
  {
    postId: 6,
    likeUserIds: [10, 8, 5, 26, 15, 48, 44, 47, 84],
    dislikeUserIds: [6, 46, 30, 21]
  },
  {
    postId: 7,
    likeUserIds: [6, 10, 1, 68, 75, 67, 17, 72, 50, 83],
    dislikeUserIds: [7, 25, 73]
  },
  {
    postId: 8,
    likeUserIds: [6, 9, 3, 88, 55, 76, 24, 80, 97, 95],
    dislikeUserIds: [2, 59]
  },
  {
    postId: 9,
    likeUserIds: [2, 8, 7, 90, 62, 59, 98, 68],
    dislikeUserIds: [5, 35]
  },
  {
    postId: 10,
    likeUserIds: [5, 4, 10, 73, 36, 99, 56, 46, 76, 48],
    dislikeUserIds: [7, 61]
  },
  {
    postId: 11,
    likeUserIds: [7, 4, 5, 59, 98, 55, 74, 83, 88, 21, 47],
    dislikeUserIds: [6, 95]
  },
  {
    postId: 12,
    likeUserIds: [7, 4, 5, 47, 23, 64, 17, 26, 86, 97],
    dislikeUserIds: [1, 72, 28]
  },
  {
    postId: 13,
    likeUserIds: [9, 8, 2, 17, 37, 16, 26, 44, 72, 71, 56],
    dislikeUserIds: [5, 21]
  },
  {
    postId: 14,
    likeUserIds: [4, 2, 6, 21, 62, 94, 86, 98, 70, 52],
    dislikeUserIds: [1, 64, 58]
  },
  {
    postId: 15,
    likeUserIds: [4, 6, 7, 52, 54, 35, 55, 76, 20, 14, 95],
    dislikeUserIds: [8, 82, 25, 29]
  },
  {
    postId: 16,
    likeUserIds: [1, 7, 4, 53, 90, 29, 70, 21],
    dislikeUserIds: [2]
  },
  {
    postId: 17,
    likeUserIds: [3, 6, 4, 20, 79, 67, 41, 72],
    dislikeUserIds: [1, 35]
  },
  {
    postId: 18,
    likeUserIds: [1, 3, 9, 30, 23, 67, 97, 75, 15, 44, 78, 54],
    dislikeUserIds: [2]
  },
  {
    postId: 19,
    likeUserIds: [5, 4, 1, 86, 71, 32, 70, 84, 98, 12],
    dislikeUserIds: [7]
  },
  {
    postId: 20,
    likeUserIds: [1, 4, 6, 94, 30, 66, 53, 22, 100, 17, 21],
    dislikeUserIds: [10, 48]
  },
  {
    postId: 21,
    likeUserIds: [10, 4, 2, 98, 96, 26, 66, 48, 92],
    dislikeUserIds: [3, 81, 36]
  },
  {
    postId: 22,
    likeUserIds: [4, 5, 2, 94, 79, 78, 88, 23, 72],
    dislikeUserIds: [1, 71]
  },
  {
    postId: 23,
    likeUserIds: [1, 8, 2, 44, 86, 62, 90, 89, 94, 48, 28],
    dislikeUserIds: [6, 45, 61]
  },
  {
    postId: 24,
    likeUserIds: [8, 7, 2, 16, 28, 87, 33, 57, 80, 69],
    dislikeUserIds: [4, 18]
  },
  {
    postId: 25,
    likeUserIds: [6, 1, 5, 17, 41, 76, 32, 77, 87, 78, 57, 96],
    dislikeUserIds: [3, 75, 99]
  },
  {
    postId: 26,
    likeUserIds: [9, 2, 1, 40, 84, 73, 39, 99, 65, 87],
    dislikeUserIds: [7]
  },
  {
    postId: 27,
    likeUserIds: [2, 5, 10, 50, 82, 87, 36, 19, 84, 86],
    dislikeUserIds: [1, 13, 95, 96, 41]
  },
  {
    postId: 28,
    likeUserIds: [5, 9, 2, 74, 70, 37, 86, 58, 90, 71],
    dislikeUserIds: [4, 47]
  },
  {
    postId: 29,
    likeUserIds: [1, 7, 8, 56, 37, 35, 99, 14, 86, 91, 39],
    dislikeUserIds: [3, 59, 25, 67]
  },
  {
    postId: 30,
    likeUserIds: [9, 5, 7, 96, 57, 75, 71, 23, 41, 11, 26],
    dislikeUserIds: [10]
  },
  {
    postId: 31,
    likeUserIds: [1, 10, 6, 64, 13, 96, 68, 66, 73, 34],
    dislikeUserIds: [3, 97, 49, 60]
  },
  {
    postId: 32,
    likeUserIds: [4, 5, 6, 80, 83, 96, 17, 58, 87, 15],
    dislikeUserIds: [1, 92, 12]
  },
  {
    postId: 33,
    likeUserIds: [5, 2, 7, 40, 52, 18, 58, 56, 46, 71],
    dislikeUserIds: [4]
  },
  {
    postId: 34,
    likeUserIds: [1, 3, 7, 62, 25, 40, 76, 14, 57, 51, 88, 79],
    dislikeUserIds: [5, 69]
  },
  {
    postId: 35,
    likeUserIds: [3, 8, 9, 37, 12, 62, 98, 45, 39, 28],
    dislikeUserIds: [7, 60, 42, 21, 27]
  },
  {
    postId: 36,
    likeUserIds: [2, 6, 3, 73, 30, 50, 28, 88, 20, 80],
    dislikeUserIds: [7]
  },
  {
    postId: 37,
    likeUserIds: [5, 1, 6, 90, 86, 96, 71, 28, 81, 11, 89, 94, 82],
    dislikeUserIds: [4, 34, 62]
  },
  {
    postId: 38,
    likeUserIds: [3, 10, 2, 46, 29, 78, 55, 64, 49],
    dislikeUserIds: [4, 48, 97, 92]
  },
  {
    postId: 39,
    likeUserIds: [5, 3, 1, 84, 51, 92, 46, 60, 48, 11, 71, 89, 49],
    dislikeUserIds: [9, 85, 39, 41]
  },
  {
    postId: 40,
    likeUserIds: [8, 4, 10, 83, 32, 97, 76, 20],
    dislikeUserIds: [7, 27]
  },
  {
    postId: 41,
    likeUserIds: [9, 6, 3, 13, 81, 58, 56, 53, 97, 57],
    dislikeUserIds: [10, 37]
  },
  {
    postId: 42,
    likeUserIds: [8, 3, 4, 90, 19, 22, 56, 34],
    dislikeUserIds: [2, 23]
  },
  {
    postId: 43,
    likeUserIds: [9, 6, 8, 78, 94, 15, 88, 13, 87, 91],
    dislikeUserIds: [7, 36, 67, 37]
  },
  {
    postId: 44,
    likeUserIds: [3, 1, 2, 75, 26, 41, 44, 39, 71, 22, 47, 17],
    dislikeUserIds: [4, 19]
  },
  {
    postId: 45,
    likeUserIds: [9, 4, 6, 39, 42, 19, 34, 47, 85],
    dislikeUserIds: [5, 65]
  },
  {
    postId: 46,
    likeUserIds: [5, 10, 7, 53, 36, 20, 30, 78, 38, 73, 44, 58, 83],
    dislikeUserIds: [1]
  },
  {
    postId: 47,
    likeUserIds: [4, 5, 10, 61, 22, 12, 81, 90, 83, 54, 84],
    dislikeUserIds: [1, 64, 98]
  },
  {
    postId: 48,
    likeUserIds: [2, 6, 5, 31, 83, 20, 93, 45],
    dislikeUserIds: [10, 82, 25]
  },
  {
    postId: 49,
    likeUserIds: [6, 4, 10, 58, 15, 29, 55, 70, 39, 11, 44],
    dislikeUserIds: [3, 78, 64]
  },
  {
    postId: 50,
    likeUserIds: [7, 1, 9, 50, 19, 25, 30, 63, 45, 68, 22],
    dislikeUserIds: [8, 73, 31]
  },
  {
    postId: 51,
    likeUserIds: [6, 3, 10, 83, 40, 68, 50, 30, 84, 82],
    dislikeUserIds: [9, 36, 26]
  },
  {
    postId: 52,
    likeUserIds: [3, 9, 8, 24, 44, 48, 12, 57, 43, 28],
    dislikeUserIds: [6, 37, 54]
  },
  {
    postId: 53,
    likeUserIds: [1, 2, 8, 82, 100, 38, 97, 77, 18],
    dislikeUserIds: [6]
  },
  {
    postId: 54,
    likeUserIds: [3, 2, 1, 99, 36, 44, 98, 89, 49, 78, 65, 71],
    dislikeUserIds: [4, 35]
  },
  {
    postId: 55,
    likeUserIds: [4, 10, 5, 72, 84, 94, 25, 11, 33, 60, 52, 32],
    dislikeUserIds: [1]
  },
  {
    postId: 56,
    likeUserIds: [2, 7, 3, 26, 80, 20, 37, 73, 58],
    dislikeUserIds: [4, 56]
  },
  {
    postId: 57,
    likeUserIds: [10, 3, 6, 78, 86, 58, 52, 12, 71, 98, 74],
    dislikeUserIds: [7, 20, 13, 63, 92]
  },
  {
    postId: 58,
    likeUserIds: [3, 4, 1, 88, 80, 72, 45, 62, 46, 12, 93, 30, 27, 47],
    dislikeUserIds: [2, 59, 81, 54]
  },
  {
    postId: 59,
    likeUserIds: [9, 6, 1, 60, 84, 96, 40, 75, 71, 88, 68, 15],
    dislikeUserIds: [3, 29, 24, 82]
  },
  {
    postId: 60,
    likeUserIds: [7, 2, 10, 37, 72, 49, 73, 68],
    dislikeUserIds: [6, 47]
  },
  {
    postId: 61,
    likeUserIds: [7, 6, 1, 86, 33, 25, 76, 30, 17, 46, 47],
    dislikeUserIds: [5]
  },
  {
    postId: 62,
    likeUserIds: [4, 1, 10, 37, 90, 70, 40, 86, 93],
    dislikeUserIds: [3, 51]
  },
  {
    postId: 63,
    likeUserIds: [2, 1, 7, 79, 87, 58, 18, 81],
    dislikeUserIds: [8, 36, 42, 52, 61]
  },
  {
    postId: 64,
    likeUserIds: [8, 10, 9, 44, 60, 35, 67, 49, 62, 96],
    dislikeUserIds: [6, 98]
  },
  {
    postId: 65,
    likeUserIds: [9, 6, 7, 21, 63, 32, 92, 47, 54, 41],
    dislikeUserIds: [5, 78, 50, 35]
  },
  {
    postId: 66,
    likeUserIds: [1, 10, 5, 16, 20, 52, 49, 59, 74],
    dislikeUserIds: [2, 24]
  },
  {
    postId: 67,
    likeUserIds: [3, 6, 5, 98, 93, 36, 16, 80, 32, 68],
    dislikeUserIds: [1]
  },
  {
    postId: 68,
    likeUserIds: [4, 6, 7, 40, 47, 92, 62, 15, 99],
    dislikeUserIds: [9, 73, 13]
  },
  {
    postId: 69,
    likeUserIds: [1, 9, 2, 87, 16, 44, 31, 88, 100, 21],
    dislikeUserIds: [7]
  },
  {
    postId: 70,
    likeUserIds: [1, 3, 7, 28, 76, 11, 95, 15],
    dislikeUserIds: [2]
  },
  {
    postId: 71,
    likeUserIds: [2, 9, 7, 90, 75, 48, 24, 18, 15, 91, 34, 57],
    dislikeUserIds: [3, 76, 95]
  },
  {
    postId: 72,
    likeUserIds: [4, 7, 9, 12, 58, 29, 43, 16, 19, 30, 48, 54],
    dislikeUserIds: [10, 18, 21]
  },
  {
    postId: 73,
    likeUserIds: [8, 6, 10, 66, 16, 62, 45, 40],
    dislikeUserIds: [9, 43]
  },
  {
    postId: 74,
    likeUserIds: [8, 4, 5, 79, 38, 77, 40, 71],
    dislikeUserIds: [1, 90]
  },
  {
    postId: 75,
    likeUserIds: [3, 9, 2, 60, 70, 66, 28, 29, 13, 12, 31],
    dislikeUserIds: [6, 34, 64]
  },
  {
    postId: 76,
    likeUserIds: [4, 7, 10, 24, 80, 98, 82, 64],
    dislikeUserIds: [5]
  },
  {
    postId: 77,
    likeUserIds: [6, 3, 9, 80, 87, 14, 25, 32, 46, 11, 55, 66],
    dislikeUserIds: [2, 74]
  },
  {
    postId: 78,
    likeUserIds: [1, 3, 8, 78, 19, 94, 51, 84, 61],
    dislikeUserIds: [9, 87, 76, 88]
  },
  {
    postId: 79,
    likeUserIds: [2, 6, 8, 61, 89, 52, 95, 31, 47, 34],
    dislikeUserIds: [9]
  },
  {
    postId: 80,
    likeUserIds: [2, 6, 1, 74, 39, 75, 30, 66, 49, 89, 18, 23],
    dislikeUserIds: [5, 84, 79]
  },
  {
    postId: 81,
    likeUserIds: [3, 9, 5, 40, 30, 28, 37, 15, 12, 96],
    dislikeUserIds: [4, 36, 50, 29, 17]
  },
  {
    postId: 82,
    likeUserIds: [10, 7, 6, 60, 62, 28, 47, 23, 66, 57, 65, 39, 94],
    dislikeUserIds: [5, 31]
  },
  {
    postId: 83,
    likeUserIds: [10, 4, 2, 74, 85, 84, 44, 16, 31, 56, 89],
    dislikeUserIds: [3, 63, 81]
  },
  {
    postId: 84,
    likeUserIds: [6, 9, 10, 23, 63, 95, 44, 59, 38],
    dislikeUserIds: [8]
  },
  {
    postId: 85,
    likeUserIds: [8, 9, 2, 67, 92, 57, 56, 32, 91, 75, 77, 43],
    dislikeUserIds: [3, 34, 21, 26]
  },
  {
    postId: 86,
    likeUserIds: [9, 7, 10, 71, 62, 37, 81, 49, 84, 35, 19],
    dislikeUserIds: [6, 25, 77]
  },
  {
    postId: 87,
    likeUserIds: [9, 2, 3, 79, 26, 39, 86, 15, 74, 42, 95, 29],
    dislikeUserIds: [7, 25]
  },
  {
    postId: 88,
    likeUserIds: [10, 9, 3, 97, 88, 71, 45, 81, 29, 63],
    dislikeUserIds: [1, 78]
  },
  {
    postId: 89,
    likeUserIds: [6, 4, 1, 38, 40, 21, 45, 93, 95],
    dislikeUserIds: [5]
  },
  {
    postId: 90,
    likeUserIds: [3, 10, 2, 30, 99, 33, 12, 23, 69, 94],
    dislikeUserIds: [5, 48, 18]
  },
  {
    postId: 91,
    likeUserIds: [3, 9, 10, 25, 29, 89, 69, 22, 75],
    dislikeUserIds: [5, 67, 15]
  },
  {
    postId: 92,
    likeUserIds: [10, 5, 8, 21, 91, 44, 39, 74, 12, 96, 72],
    dislikeUserIds: [1, 46, 24]
  },
  {
    postId: 93,
    likeUserIds: [8, 6, 1, 92, 58, 89, 77, 67, 42],
    dislikeUserIds: [2]
  },
  {
    postId: 94,
    likeUserIds: [3, 4, 6, 95, 83, 89, 64, 59, 43, 80],
    dislikeUserIds: [8, 20, 88]
  },
  {
    postId: 95,
    likeUserIds: [9, 8, 3, 51, 14, 13, 74, 68, 17],
    dislikeUserIds: [4, 96, 43, 73]
  },
  {
    postId: 96,
    likeUserIds: [1, 2, 10, 30, 88, 64, 48, 52, 99, 61, 18],
    dislikeUserIds: [4, 28, 97, 17]
  },
  {
    postId: 97,
    likeUserIds: [8, 7, 9, 26, 79, 73, 43, 28, 88, 42, 59, 82, 17],
    dislikeUserIds: [2, 83, 25]
  },
  {
    postId: 98,
    likeUserIds: [4, 2, 8, 35, 20, 62, 98, 97, 24, 66],
    dislikeUserIds: [7]
  },
  {
    postId: 99,
    likeUserIds: [2, 5, 8, 59, 63, 94, 35, 42],
    dislikeUserIds: [3]
  },
  {
    postId: 100,
    likeUserIds: [9, 3, 2, 96, 29, 62, 91, 44, 92, 15, 13, 72],
    dislikeUserIds: [4, 27]
  }
]

export const getControlsPost = (id: number) => {
  let initControls: IControlsPost = {
    postId: 0,
    likeUserIds: [],
    dislikeUserIds: []
  };
  const controlsPost: IControlsPost = controlsPosts.find(obj => obj.postId === id) || initControls;
  const { postId, ...controls } = controlsPost;
  return controls;
}

export const updateControlsPost = (obj: IControlsPost) => {
  controlsPosts = controlsPosts.map(item => {
    return item.postId === obj.postId ? obj : item;
  });
}