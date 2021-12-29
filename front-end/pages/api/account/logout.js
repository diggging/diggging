import cookie from 'cookie';

export default async (req, res) => {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', [
      cookie.serialize('access', '', {
        httpOnly: true, //javascript로access할 수 없게 막음
        secure: process.env.NODE_ENV !== 'development', //false
        //true로 바꾸고싶으면 .env가서 development다른걸로 바꾸기 ex) 'production'
        expires: new Date(0), //Date(0) = 1970년 1월1일. expire됨
        sameSite: 'strict',
        path: '/api/',
      }),
      cookie.serialize('refresh','', {
        httpOnly: true, //javascript로access할 수 없게 막음
        secure: process.env.NODE_ENV !== 'development', //false
        //true로 바꾸고싶으면 .env가서 development다른걸로 바꾸기 ex) 'production'
        expires: new Date(0), //하루(24시간)
        sameSite: 'strict',
        path: '/api/',
      }
    )
  ]);
    return res.status(200).json({
      success: 'Successfully logged out'
    });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      error: `Method ${req.method} now allowed`
    });
  }
};