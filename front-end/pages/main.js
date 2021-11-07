import React from 'react';
import styled from 'styled-components';
import Link from "next/link";


const Container = styled.div`
  margin-top: 300px;
`;

function main({ list }) {
    return (
        <div>
          <Container>
          {list.map((item) => (
              <Link href={`/view/${item.id}`}>
                <div>
                  {item.id}  
                </div>                
              </Link>
          ))}
          </Container>
        </div>
    );
}

export default main;