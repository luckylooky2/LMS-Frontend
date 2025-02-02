import isToday from 'Utils/isToday';

import styled from 'styled-components';

const TodoInputForm = ({ onSubmit, onChange, setIsEdit, toDo, date }) => {
  const today = new Date();

  return (
    <InputFormBody onSubmit={onSubmit}>
      <InputFormContainer>
        <InputFormInput
          onChange={onChange}
          value={toDo.content}
          type="text"
          placeholder="오늘 할 일을 입력하세요."
          autoComplete="off"
          autoFocus
          onFocus={() => {
            setIsEdit('');
          }}
        />
        <InputFormButton
          variant="contained"
          onClick={onSubmit}
          disabled={!isToday(today, date)}
        >
          추가
        </InputFormButton>
      </InputFormContainer>
    </InputFormBody>
  );
};

const InputFormBody = styled.form``;

const InputFormContainer = styled.div`
  width: 100%;
`;
const InputFormInput = styled.input`
  border: 0px;
  border-bottom: 3px solid #c0c0c0;
  margin-top: 30px;
  font-size: 17px;
  height: 35px;
  width: calc(100% - 80px);
  text-align: center;
  outline-width: 0;
`;
const InputFormButton = styled.button`
  border-radius: 5px;
  margin-left: 15px;
  width: 60px;
  height: 40px;
  font-size: 17px;
  background-color: transparent;
  cursor: pointer;
`;

export default TodoInputForm;
