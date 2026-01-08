import React from 'react'
import PropTypes from 'prop-types'
import Hastag from './hastag'
import ProfileWriter from './profile-writer'
import Vote from './vote'
import { postedAt } from '../../utils'
import { Link } from 'react-router-dom'

export default function CardThreads({ url, title, body, hastag, author, avatar, totalComment, totalGood, totalBad, createdAt, id, onUpVote, onDownVote, upVotesBy, downVotesBy, currentUserid}) {
    const isliked = currentUserid && upVotesBy?.includes(currentUserid);
    const isDisliked = currentUserid && downVotesBy?.includes(currentUserid);

    return (
        <Link to={url}>
            <div className="bg-acent p-5 rounded-lg w-full shadow-sm flex flex-col gap-5">
                {/* profile group */}
                <div className="flex justify-between items-center">
                    {/* profile */}
                    <ProfileWriter author={author} avatar={avatar} />
                    {/* hastag */}
                    <Hastag title={hastag} />
                </div>
                {/* thread content */}
                <div>
                    <h3 className="text-2xl font-semibold line-clamp-1">
                        {title}
                    </h3>
                    <div className="opacity-50 line-clamp-1 mt-2" dangerouslySetInnerHTML={{ __html: body }}>
                    </div>
                </div>
                {/* end content */}
                <div className="flex gap-10 items-center">
                    {/* vote group */}
                    <div className="flex gap-3 items-end">
                        {/* bad vote */}
                        <Vote iconName={isDisliked ? "icon-park-solid:bad-two" : "icon-park-outline:bad-two"} count={totalBad} onClick={(e) => {
                            e.preventDefault();
                            onDownVote(id);
                        }} />
                        {/* good vote */}
                        <Vote iconName={isliked ? "icon-park-solid:good-two" : "icon-park-outline:good-two"} onClick={(e) => {
                            e.preventDefault();
                            onUpVote(id);
                        }} count={totalGood} />
                        {/* comment count */}
                        <Vote iconName="material-symbols:comment" count={totalComment} />
                    </div>
                    <p className="opacity-50">{postedAt(createdAt)}</p>
                </div>
            </div>
        </Link>
    )
}

CardThreads.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    hastag: PropTypes.string,
    author: PropTypes.string,
    avatar: PropTypes.string,
    totalComment: PropTypes.number,
    totalGood: PropTypes.number,
    totalBad: PropTypes.number,
    createdAt: PropTypes.string,
    id: PropTypes.string,
    onUpVote: PropTypes.func,
    onDownVote: PropTypes.func,
    upVotesBy: PropTypes.array,
    downVotesBy: PropTypes.array,
    currentUserid: PropTypes.string,
}