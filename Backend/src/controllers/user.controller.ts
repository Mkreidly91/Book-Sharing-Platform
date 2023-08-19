import express from 'express';
import UserModel from '../models/User';

import { AuthRequest } from '../middlewares/auth.middleware';

const followUser = async (req: AuthRequest, res: express.Response) => {
  try {
    const targetUserId = req.params.userId;

    const currentUserId = req.user._id;

    const targetUser = await UserModel.findById(targetUserId);
    const currentUser = await UserModel.findById(currentUserId);
    if (!targetUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isFollowing = currentUser.following.find((e) =>
      e._id.equals(targetUser._id)
    );

    let status;
    const { following } = currentUser;
    if (isFollowing) {
      const filtered = following.filter((e) => !e.equals(targetUser._id));
      currentUser.following = filtered;

      status = `unfollowed ${targetUser.name}`;
    } else {
      currentUser.following = [...following, targetUser._id];
      status = `followed ${targetUser.name}`;
    }
    console.log(currentUser.following);
    await currentUser.save();
    return res.status(200).send({ message: status });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

export { followUser };
