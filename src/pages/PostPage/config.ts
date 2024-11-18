import { NavigateFunction } from "react-router-dom";
import { getControlsPost } from "src/controlsPostsData";
import { IPost, IFullUser, Undefinable } from "src/interfaces";
import { getPost, setPostData } from "src/redux/slices";

interface IGetPostDataFunc {
  param: string | undefined, 
  localPosts: IPost[], 
  userAccount: Undefinable<IFullUser>, 
  navigate: NavigateFunction
}

export const getPostDataFunc = ({param, localPosts, userAccount, navigate}: IGetPostDataFunc) => {
  let func;
  const postId = +param!;
  if (postId > 100) {
    // обновление user, post, controls в postState данными из userState и localState
    const post = localPosts.find(post => post.id === postId);
    if (!post?.id) navigate('/forum');

    const user = { 
      id: userAccount.id,
      name: userAccount.name,
      username: userAccount.username,
      email: userAccount.email
    }
    const controls = getControlsPost(postId)
    func = setPostData({post, user, controls});
  } else {
    // запрос на получение user и post
    func = getPost({postId, navigate});
  }
  return func;
}