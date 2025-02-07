import { getModalManageAction } from "./config";
import { changeUserByAdmin, createLocalPost, updateComment, updateLocalPost, updatePost, updatePostInPostPage } from "src/redux/slices";

jest.mock("src/redux/slices", () => ({
  changeUserByAdmin: jest.fn(),
  createLocalPost: jest.fn(),
  updateComment: jest.fn(),
  updateLocalPost: jest.fn(),
  updatePost: jest.fn(),
  updatePostInPostPage: jest.fn(),
}));

const mockData = { id: 1, name: "Test" };

describe("getModalManageAction", () => {
  it("should call changeUserByAdmin when users_update is passed", () => {
    getModalManageAction.users_update(mockData);
    expect(changeUserByAdmin).toHaveBeenCalledWith(mockData);
  });

  it("should call updatePost when posts_update is passed", () => {
    getModalManageAction.posts_update(mockData);
    expect(updatePost).toHaveBeenCalledWith(mockData);
  });

  it("should call updateLocalPost when localPosts_update is passed", () => {
    getModalManageAction.localPosts_update(mockData);
    expect(updateLocalPost).toHaveBeenCalledWith(mockData);
  });

  it("should call createLocalPost when posts_add is passed", () => {
    getModalManageAction.posts_add(mockData);
    expect(createLocalPost).toHaveBeenCalledWith(mockData);
  });

  it("should call updatePostInPostPage when post_update is passed", () => {
    getModalManageAction.post_update(mockData);
    expect(updatePostInPostPage).toHaveBeenCalledWith(mockData);
  });

  it("should call updateComment when comment_update is passed", () => {
    getModalManageAction.comment_update(mockData);
    expect(updateComment).toHaveBeenCalledWith(mockData);
  });
});
