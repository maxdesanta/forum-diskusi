import React, { useEffect, useState } from "react";
import Filter from "../../components/filter";
import Search from "../../components/search";
import CardThreads from "../../components/card-threads";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetThreads } from "../../state/threads/action";
import { asyncGetUsers } from "../../state/users/action";
import {
  asyncToggleDownVoteThreads,
  asyncToggleUpVoteThreads,
} from "../../state/votesThread/action";

export default function Homepage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const authUser = useSelector((state) => state.authUser);
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  // const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetThreads());
    dispatch(asyncGetUsers());
  }, [dispatch]);

  // buat filter dan search
  const filterThreads = threads.filter((thread) => {
    const title = thread.title.toLocaleLowerCase() || "";
    const matchSearch = title.includes(search.toLowerCase());
    const matchCategory =
      category === "" || category === "Pilih"
        ? true
        : thread.category.toLowerCase() === category.toLocaleLowerCase();
    return matchSearch && matchCategory;
  });

  // buat vote
    const toggleUpVoteThreads = (id) => {
      console.log(id)
    dispatch(asyncToggleUpVoteThreads(id));
  };
    const toggleDownVoteThreads = (id) => {
        console.log(id)
    dispatch(asyncToggleDownVoteThreads(id));
  };

  return (
    <>
      <div className="flex justify-between flex-col gap-8">
        {/* group filter */}
        <div className="flex w-full justify-between gap-5">
          {/* search */}
          <Search keyword={search} setKeyword={setSearch} />
          {/* filter */}
          <Filter category={category} setCategory={setCategory} />
        </div>

        {/* card-layout */}
        <div className="flex flex-col gap-5">
          {/* card-content */}
          {filterThreads.length > 0 ? (
            filterThreads.map((thread) => {
              const author = users.find((user) => user.id === thread.ownerId);

              return (
                <CardThreads
                  key={thread.id}
                  url={`/thread/${thread.id}`}
                  id={thread.id}
                  onUpVote={toggleUpVoteThreads}
                  onDownVote={toggleDownVoteThreads}
                  title={thread.title}
                  body={thread.body}
                  hastag={thread.category}
                  currentUserid={authUser?.id}
                  author={author ? author.name : "Memuat nama..."}
                  avatar={author ? author.avatar : ""}
                  upVotesBy={thread.upVotesBy}
                  downVotesBy={thread.downVotesBy}
                  totalComment={thread.totalComments}
                  totalGood={thread.upVotesBy.length}
                  totalBad={thread.downVotesBy.length}
                  createdAt={thread.createdAt}
                />
              );
            })
          ) : (
            <p className="text-center text-gray-500">
              Thread tidak ditemukan...
            </p>
          )}
        </div>
      </div>
    </>
  );
}
