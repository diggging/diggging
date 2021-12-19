import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Paging from "../Paging";
import { setQuestion, setPage, setMine } from "../../modules/questions";
import Like from '../../public/static/images/Like';

function QuestionList({ data, count }) {
  
  const dispatch = useDispatch();
  const { page, bigCriteria, smallCriteria, loading, error, mineToken} = useSelector((state) => state.questions);

  const postPage = (page) => {
    dispatch(setPage(page));

    if(bigCriteria !== undefined) {
      dispatch(setQuestion(page, bigCriteria, smallCriteria));
    } else if (bigCriteria === undefined) {
      dispatch(setMine(page, smallCriteria, mineToken));
    }
  };
  
  return (
    <div>
      <ul>
        {data.map((list) => (
          <Link href={`/questions/${list.id}`} passHref>
            <ListContainer key={list.id}>
              <FlexContainer>
                <TitleHashContainer>
                  <ListTitle>{list.title}</ListTitle>
                  <ListHashContainer>
                    {list.question_tags.map((hash) => (
                      <ListHash>{hash}</ListHash>
                    ))}
                  </ListHashContainer>
                </TitleHashContainer>

                <ProfileContainer>
                  <ProfileImg></ProfileImg>
                  <ProfileName>{list.user.user_nickname}</ProfileName>
                </ProfileContainer>
              </FlexContainer>

              <DescContainer>{list.desc.slice(0, 315)}</DescContainer>

              <BottomContainer>
                {/* <BottomText>
                  <Like />
                </BottomText> */}
                <Like />
                <BottomText>
                  {list.helped_num}
                </BottomText>
                <BottomText>
                  답변
                </BottomText>
                <BottomText>
                  {list.comment_count}
                </BottomText>
              </BottomContainer>

              
            </ListContainer>
          </Link>
        ))}
      </ul>
      <Paging handlePageChange={postPage} page={page} count={count} />
    </div>
  );
}

export default React.memo(QuestionList);

const ListContainer = styled.ul`
  max-width: 67rem;
  height: 100%;
  background: #ffffff;
  box-shadow: 0rem 0.25rem 1.25rem rgba(0, 0, 0, 0.04);
  border-radius: 0.125rem;
  margin-top: 24px;
  padding: 1.625rem 2.1875rem;
  cursor: pointer;
`;

const TitleHashContainer = styled.div`
  width: 100%;
`;

const ListTitle = styled.div`
  width: 23.3819rem;
  height: 1.5rem;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.8125rem;
  color: #343434;
`;

const ListHashContainer = styled.div`
  width: 100%;
  height: 1.5rem;
  margin-top: 0.625rem;
  display: flex;
  align-items: center;
`;

const ListHash = styled.div`
  padding: 0.625rem;
  height: 1.125rem;
  background: rgba(219, 214, 199, 0.4);
  border-radius: 1.25rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 0.9375rem;
  margin-top: 0.625rem;
  font-size: 0.625rem;
  line-height: 1rem;
  text-align: right;
  color: #7A7A7A;
`;

const ProfileContainer = styled.div`
  width: 40px;
  height: 100%;
  float: right;
`;

const ProfileImg = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(239.19deg, #fabe56 26.85%, #fbd362 73.3%);
  border-radius: 50px;
  margin-bottom: 10px;
`;

const ProfileName = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #212529;
`;

const DescContainer = styled.div`
  width: 100%;
  height: 117px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 26px;
  color: #8d8c85;
  overflow: hidden;
  margin-top: 19px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;

const BottomText = styled.div`
  height: 16px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  margin-left: 5px;
  color: #8C8D8D;
  padding: 1.5px;
`;