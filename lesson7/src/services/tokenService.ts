import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';
import { IToken } from '../entity/token';
import { tokenRepository } from '../repositories/token/tokenRepository';

class TokenService {
    public async generateTokenPair(payload: any):
        Promise<{ accessToken: string, refreshToken: string }> {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY as string, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, config.SECRET_REFRESH_KEY as string, { expiresIn: '1d' });

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId: number, refreshToken: string): Promise<IToken> {
        const tokenFromDB = await tokenRepository.findTokenByUserId(userId);
        if (tokenFromDB) {
            tokenFromDB.refreshToken = refreshToken;
            return tokenRepository.createToken(tokenFromDB);
        }

        return tokenRepository.createToken({ refreshToken, userId });
    }

    public async deleteUserTokenPair(userId: number) {
        return tokenRepository.deleteTokenPair(userId);
    }

    verifyToken(authToken: string, tokenType = 'access'): JwtPayload {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        return jwt.verify(authToken, secretWord as string) as JwtPayload;
    }
}

export const tokenService = new TokenService();
