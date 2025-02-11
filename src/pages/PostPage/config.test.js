import { getPostDataFunc } from "./config";
import { getPost, setPostData } from "src/redux/slices";
import { mockGetPostDataFunc } from "../__mocks__/getPostDataFunc.mock";

jest.mock("src/redux/slices", () => ({
  getPost: jest.fn(),
  setPostData: jest.fn(),
}));

jest.mock("src/controlsPostsData", () => ({
  getControlsPost: jest.fn(() => true),
}));

const mockNavigate = jest.fn();

describe("getPostDataFunc", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call setPostData, if postId > 100', () => {
    const { input, expected } = mockGetPostDataFunc(mockNavigate)[0];
    getPostDataFunc(input);

    expect(setPostData).toHaveBeenCalledWith(expected);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should move to /forum, if postId > 100 and post did not find in localPosts', () => {
    const { input, expected } = mockGetPostDataFunc(mockNavigate)[1];
    getPostDataFunc(input);
    
    expect(setPostData).toHaveBeenCalledWith(expected);
    expect(mockNavigate).toHaveBeenCalledWith("/forum");
  });

  it('should call getPost, if postId <= 100', () => {
    const { input, expected } = mockGetPostDataFunc(mockNavigate)[2];
    getPostDataFunc(input);
    
    expect(getPost).toHaveBeenCalledWith(expected);
    expect(setPostData).not.toHaveBeenCalled();
  });
});
