import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID, // Facebook App ID
      clientSecret: process.env.FACEBOOK_APP_SECRET, // Facebook App Secret
      callbackURL: process.env.FACEBOOK_CALLBACK_URL, // Redirect URI
      profileFields: ['id', 'displayName', 'emails'], // Data to fetch
      scope: [
        'public_profile',
        'email',
        'ads_management',
        'ads_read',
        'read_insights',
        'business_management',
      ], // Permissions required
    });

    console.log('???????????????????????????????', process.env.FACEBOOK_APP_ID);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const { id, displayName, emails } = profile;
    return {
      facebookId: id,
      name: displayName,
      email: emails?.[0]?.value || null,
      accessToken, // Pass the access token for further API calls
    };
  }
}
