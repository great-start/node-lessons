import { DeleteResult, getManager } from 'typeorm';
import { IToken, Token } from '../../entity/token';

class TokenRepository {
    public async createToken(token: any): Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    public async findTokenByUserId(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }

    public async deleteTokenPair(userId: number): Promise<DeleteResult> {
        return getManager().getRepository(Token).delete({ userId });
    }
}

export const tokenRepository = new TokenRepository();
