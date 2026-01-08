import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import Vote from '../card-threads/vote';

export default function CardComment({ author, avatar, comment, createdAt, id, downVotesBy, upVotesBy, currentUserid, onUpVote, onDownVote }) {
  const isLiked = currentUserid && upVotesBy.includes(currentUserid);
  const isDisliked = currentUserid && downVotesBy.includes(currentUserid);

  return (
    <div className='flex gap-3 p-5 flex-col shadow-md rounded-md'>
      {/* profile group */}
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          { !avatar ? (
            <Icon
              icon="iconamoon:profile-circle-fill"
              className="text-secondary"
              width="42"
              height="42"
            />
          ) : (
            <img src={avatar} alt="" className='w-10 h-10 rounded-full' />
          )}
          <p className='text-md'>{author}</p>
        </div>
        {/* year */}
        <p className='opacity-50 text-sm'>{createdAt}</p>
      </div>
      {/* comment */}
      <div className="opacity-50 mt-2" dangerouslySetInnerHTML={{ __html: comment }}></div>
      {/* vote group */}
      <div className='flex gap-3 items-end'>
        {/* bad vote */}
        <Vote iconName={ isDisliked ? 'icon-park-solid:bad-two' : 'icon-park-outline:bad-two'} count={downVotesBy?.length} onClick={() => { onDownVote(id); }} />
        {/* good vote */}
        <Vote iconName={ isLiked  ? 'icon-park-solid:good-two' : 'icon-park-outline:good-two'} count={upVotesBy?.length} onClick={() => { onUpVote(id); }} />
      </div>
    </div>
  );
}


CardComment.propTypes = {
  author: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  comment: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentUserid: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};