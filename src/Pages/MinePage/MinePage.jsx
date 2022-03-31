import { useState, useEffect, useContext } from 'react';

import { AuthContext } from 'App';
import { aojiCloumns } from 'Utils';
import { AojiService } from 'Network';

import {
  format,
  parseISO,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import { DataGrid } from '@mui/x-data-grid';

import Styled from './MinePage.styled';

const AojiButton = ({ onClickAoji, state }) => {
  return (
    <>
      {!state ? (
        <button onClick={onClickAoji}>시작!</button>
      ) : (
        <button onClick={onClickAoji}>종료!</button>
      )}
    </>
  );
};

const AojiLog = ({ data }) => {
  return (
    <h3>
      시작 시간 : {data.startAt}
      종료 시간 : {data.endAt}
      기록 시간 : {data.recodeTime}
    </h3>
  );
};

const Timer = ({ startTime, now }) => {
  console.log('start', startTime);
  console.log('now', now);
  return (
    <h1>
      {differenceInHours(now, startTime)}:{differenceInMinutes(now, startTime)}:
      {differenceInSeconds(now, startTime)}
    </h1>
  );
};

const MinePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDoing, setIsDoing] = useState(false);
  const [aojiLogs, setAojiLogs] = useState(null);
  const [startTime, setStartTime] = useState();
  const [now, setNow] = useState(new Date());
  let interv;
  // format(new Date(), 'HH:mm:ss')
  const auth = useContext(AuthContext);

  const handleClickButton = async () => {
    let result;
    if (isDoing) {
      clearInterval(interv);
      result = await AojiService.putEndAoji(auth.userId);
    } else {
      setStartTime(new Date());
      clockStart();
      result = await AojiService.postStartAoji(auth.userId);
    }
    console.log(result.data);
    setIsDoing(!isDoing);
    getMyAoji();
  };

  const clockStart = () => {
    interv = setInterval(() => {
      setNow(new Date());
    }, 1000);
  };

  const CloseModal = () => {
    setIsOpen(false);
  };
  const getMyAoji = async () => {
    const result = await AojiService.getMyAoji(auth.userId);
    const logs = result.data;
    let doingState = false;
    console.log(logs);
    logs.map(log => {
      if (log.endAt === null) doingState = true;
    });
    if (doingState) {
      console.log('asfas');
      clockStart();
      setStartTime(logs[logs.length - 1].startAt);
    }
    setAojiLogs(logs);
    setIsDoing(doingState);
  };
  useEffect(() => {
    getMyAoji();

    return () => {
      clearInterval(interv); // cleanup function을 이용
    };
  }, []);

  return (
    <Styled.AojiBackground>
      <div className="timer box">
        <Timer startTime={startTime} now={now} />
        <h2>⛏️ 보충학습 시작</h2>
        <AojiButton onClickAoji={handleClickButton} state={isDoing} />
      </div>

      <div className="log box">
        <h2>⛏️ 보충학습 기록</h2>
        {aojiLogs &&
          aojiLogs.map(log => {
            return <AojiLog data={log} key={log.aojiTimeIndex} />;
          })}
      </div>

      {/* {isOpen === 0 && <Modal />} */}
    </Styled.AojiBackground>
  );
};

export default MinePage;
