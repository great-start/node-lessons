import { DeleteResult, getManager } from 'typeorm';
import { IToken, Token } from '../../entity/token';
import { ITokenDataToSave } from '../../interfaces/token.interface';

class TokenRepository {
    public async createToken(token: ITokenDataToSave): Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    public findByParams(filterObject: Partial<IToken>): Promise<IToken | undefined | void> {
        return getManager().getRepository(Token).findOne(filterObject);
    }

    public async findTokenByUserId(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }

    public async deleteTokenPair(userId: number): Promise<DeleteResult> {
        return getManager().getRepository(Token).delete({ userId });
    }
}

export const tokenRepository = new TokenRepository();
