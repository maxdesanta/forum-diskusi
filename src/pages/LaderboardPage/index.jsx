import React, { useEffect } from 'react';
import CardLaderboards from '../../components/card-laderboards';
import Heading from '../../components/heading';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetLaderboards } from '../../state/laderboards/action';

export default function LaderBoard() {
  const laderboardsData = useSelector((state) => state.laderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetLaderboards());
  }, [dispatch]);

  return (
    <>
      <Heading title='Laderboard' />

      {/* layout laderboard */}
      <div className='flex flex-col gap-3'>
        {/* card laderboard */}
        {laderboardsData.map((laderboard, index) => <CardLaderboards key={index} score={laderboard.score} name={laderboard.user.name} avatar={laderboard.user.avatar} />)}
        {/* <CardLaderboards />
                <CardLaderboards />
                <CardLaderboards /> */}
      </div>
    </>
  );
}
