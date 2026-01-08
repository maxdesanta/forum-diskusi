import React, { useEffect } from 'react'
import { Icon } from "@iconify/react";
import Hastag from '../../components/card-threads/hastag';
import Vote from '../../components/card-threads/vote';
import CardComment from '../../components/card-comment';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { asyncAddComment, asyncReceiveThreadDetail } from '../../state/threadDetail/action';
import { postedAt } from '../../utils';
import { asyncToggleDownVoteThreads, asyncToggleNeutralVoteThreads, asyncToggleUpVoteThreads } from '../../state/votesThread/action';
import { asyncToggleDownVoteComment, asyncToggleNeutralVoteComment, asyncToggleUpVoteComment } from '../../state/votesComment/action';

export default function DetailThreadPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const detailThread = useSelector((state) => state.detailThread);
    const authUser = useSelector((state) => state.authUser);
    const [content, setContent] = useInput('');
    const isLiked = authUser && detailThread?.upVotesBy?.includes(authUser.id);
    const isDisliked = authUser && detailThread?.downVotesBy?.includes(authUser.id);

    useEffect(() => {
        dispatch(asyncReceiveThreadDetail(id));
    }, [id, dispatch]);

    const handleComment = (e) => {
        e.preventDefault();

        if (!authUser) {
            alert("Silahkan login terlebih dahulu !");
            navigate('/login');
            return;
        }

        dispatch(asyncAddComment({ threadId: id, content }));
        setContent('');
        alert("Komentar berhasil dikirim !");
    }

     // buat vote
    const toggleUpVoteThreads = async (id) => {
        if (!authUser) {
            alert("Silahkan login terlebih dahulu !");
            navigate('/login');
            return;
        }

        const thread = detailThread;
        const isAlreadyUpVoted = thread.upVotesBy.includes(authUser.id);
        console.log(isAlreadyUpVoted);
        

        if (isAlreadyUpVoted) {
            await dispatch(asyncToggleNeutralVoteThreads(id));
        } else {
            await dispatch(asyncToggleUpVoteThreads(id));
        }

        dispatch(asyncReceiveThreadDetail(id));
    };
    const toggleDownVoteThreads = async (id) => {
        if (!authUser) {
            alert("Silahkan login terlebih dahulu !");
            navigate('/login');
            return;
        }

        const thread = detailThread;
        const isAlreadyDownVoted = thread.downVotesBy.includes(authUser.id);

        if (isAlreadyDownVoted) {
            await dispatch(asyncToggleNeutralVoteThreads(id));
        } else {
            await dispatch(asyncToggleDownVoteThreads(id));
        }

        dispatch(asyncReceiveThreadDetail(id));
    };

    const onUpVoteComment = (commentId) => {
        if (!authUser) {
            alert("Silahkan login terlebih dahulu !");
            navigate('/login');
            return;
        }
        const comment = detailThread.comments.find((comment) => comment.id === commentId);
        const isAlreadyVoted = comment.upVotesBy.includes(authUser.id);

        if (isAlreadyVoted) {
            dispatch(asyncToggleNeutralVoteComment(id, commentId));
            return;
        } else {
            dispatch(asyncToggleUpVoteComment(id, commentId));
        }
    }

    const onDownVoteComment = (commentId) => {
        if (!authUser) {
            alert("Silahkan login terlebih dahulu !");
            navigate('/login');
            return;
        }

        const comment = detailThread.comments.find((c) => c.id === commentId);
        const isAlreadyDownVoted = comment.downVotesBy.includes(authUser.id);

        if (isAlreadyDownVoted) {
            dispatch(asyncToggleNeutralVoteComment(id, commentId));
        } else {
            dispatch(asyncToggleDownVoteComment(id, commentId));
        }
    }

    if (!detailThread) return <p className="text-center mt-10">Memuat detail thread...</p>;

    return (
        <>
            <div className='flex flex-col gap-8'>
                {/* profile card */}
                <div className='flex justify-between items-center'>
                    {/* profile */}
                    <div className='flex gap-2 items-center'>
                        {!detailThread.owner?.avatar ? (
                            <Icon
                                icon="iconamoon:profile-circle-fill"
                                className="text-secondary"
                                width="42"
                                height="42"
                            />
                        ) : (
                            <img src={detailThread.owner?.avatar} alt="" className='w-10 h-10 rounded-full' />
                        )}
                        <p className='text-md'>{detailThread.owner?.name}</p> 
                    </div>
                    {/* hastag */}
                    <Hastag size={'text-xs'} title={detailThread.category} />
                </div>
                {/* thread information */}
                <div className='flex flex-col gap-5'>
                    <h3 className='text-3xl font-semibold'>{detailThread.title}</h3>
                    <div className="opacity-50 mt-2" dangerouslySetInnerHTML={{ __html: detailThread.body }}>
                    </div>
                    <div className='flex gap-5 items-center'>
                        {/* bad vote */}
                        <Vote onClick={(e) => {
                            e.preventDefault();
                            toggleDownVoteThreads(id)
                        }} iconName={isDisliked ? "icon-park-solid:bad-two" : "icon-park-outline:bad-two"} count={detailThread.downVotesBy?.length} />
                        {/* good vote */}
                        <Vote
                            onClick={(e) => {
                                e.preventDefault();
                                toggleUpVoteThreads(id);
                            }}
                            iconName={ isLiked ? "icon-park-solid:good-two" : "icon-park-outline:good-two" } count={detailThread.upVotesBy?.length} />
                        <p className='opacity-50 ml-5'>{postedAt(detailThread.createdAt)}</p>
                    </div>
                </div>
                {/* form comment */}
                <form onSubmit={handleComment} action={""}>
                    <div className='flex flex-col gap-3'>
                        <h4 className='text-xl font-semibold mb-3'>Beri Komentar</h4>
                        <textarea className='border-2 border-secondary rounded-md p-2 w-full' rows={5} id="content" value={content} onChange={setContent}></textarea>
                        <button type='submit' className='bg-btn text-acent cursor-pointer font-medium py-2 px-9 rounded-md w-full'>Kirim</button>
                    </div> 
                </form>
                {/* amount commnet */}
                <div>
                    <h4 className='text-xl font-semibold mb-3'>Komentar ({detailThread.comments?.length})</h4>

                    <div className='flex gap-10 flex-col'>
                        {detailThread.comments?.length == 0 ? (
                            <p>Tidak ada komentar</p>
                        ) : (
                            detailThread.comments?.map((comment) => (
                                <CardComment author={comment.owner?.name} avatar={comment.owner?.avatar} comment={comment.content} createdAt={postedAt(comment.createdAt)} id={comment.id} key={comment.id} downVotesBy={comment.downVotesBy} upVotesBy={comment.upVotesBy} currentUserid={authUser?.id} threadId={id} onUpVote={onUpVoteComment} onDownVote={onDownVoteComment} /> 
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
