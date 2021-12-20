import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Paging from "../Paging";
import { setQuestion, setPage, setMine } from "../../modules/questions";
import HeartIcon from '../../public/static/images/HeartIcon.js';

function QuestionList({ data, count }) {
  
  const dispatch = useDispatch();
  const { page, bigCriteria, smallCriteria, loading, error, mineToken} = useSelector((state) => state.questions);
  const [removeTagDesc, setRemoveTagDesc] = useState([]);

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
        {removeTagDesc.length > 0 ? (<></>) : null}
        {data && data.map((list) => (
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
                  <ProfileImg>
                    <Image
                      src={`${list.user.user_profile_image}`}
                      width={50}
                      height={50}
                      alt="profileImage"
                      quality={100}
                      // layout="fill"
                      objectFit="cover"
                    />
                  </ProfileImg>
                  <ProfileName>{list.user.user_nickname}</ProfileName>
                </ProfileContainer>

              </FlexContainer>

              <DescContainer>{list.desc.replace(/(<([^>]+)>)/ig,"").slice(0, 315)}</DescContainer>
              <BottomContainer>
                <HeartBtn></HeartBtn>
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
  width: 100%;
  /* height: 1.5rem; */
  font-family: 'Pretendard-SemiBold';
  font-size: 1.25rem;
  line-height: 1.8125rem;
  color: #343434;
  display: flex;
  align-items: center;
  margin-right: 0;
  margin-bottom: 0.6rem;

  min-width: 36.125rem;

  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
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
  border-radius: 1.25rem;
  background-color: #F1EFE9;
  font-family: 'Pretendard-SemiBold';
  font-size: 0.625rem;
  line-height: 1;
`;

const ProfileContainer = styled.div`
  width: 40px;
  height: 100%;
  float: right;
`;

const ProfileImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-bottom: 10px;
  & img {
    border-radius: 50%;
  }
`;

const ProfileName = styled.div`
  font-family: 'Pretendard-Medium';
  font-size: 0.875rem;
  color: #8C8D8D;
  text-align: center;
  line-height: 16px;
  
  min-width: 
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
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
  height: 6.75rem;
  
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 4; //4줄이면 자르기
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
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
  font-family: 'Pretendard-Regular';
  font-size: 0.6rem;
  line-height: 16px;
  text-align: right;
  margin-left: 5px;
  color: #8C8D8D;
  padding: 1.5px;
`;

const HeartBtn = styled(HeartIcon)`
  margin-left: 1rem;
  vertical-align: middle;

  path {
    fill: #FFD358;
  }
  /* & :hover path{
    fill: #FFD358;
  } */
`;