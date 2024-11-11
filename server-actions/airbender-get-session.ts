
'use server';
import { headers } from 'next/headers';
import { airbender } from '../airbender-utils';

const productKey = process.env.AIRBENDER_PRODUCT_KEY;

export const getSessionFromServer = async (user: string, name?: string) => {
  const forwardedIp = (await headers()).get('x-forwarded-for');
  const realIp = (await headers()).get('x-real-ip');

  const ipAddress = forwardedIp || realIp || 'no ip set';

  return await airbender.fetchSession({
    productKey: productKey || '',
    ipAddress,
    user,
    name 
  });
};