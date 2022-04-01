import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

export default (func: (arg0: NextApiRequest, arg1: NextApiResponse<any>, arg2: any) => any) => 
    (req: NextApiRequest, res: NextApiResponse, next: any) => 
    Promise.resolve(func(req, res, next))
        .catch(next)