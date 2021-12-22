import React from 'react';
import { useRouter } from 'next/router'

function EmailVerify() {
  const router = useRouter();
  const {uid, token} = router.query;

    return (
        <div>
          uid : {uid}
          <br />
          token: {token}
        </div>
    );
}

export default EmailVerify;