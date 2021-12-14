import React from 'react';
import styled from 'styled-components';
import { useRouter } from "next/router";

function Update () {
  const router = useRouter();
  const { id } = router.query;

    return (
        <div>
          {id}
        </div>
    );
}

export default Update;