import { UserModel, type IUser } from "./auth.model.js";

class UserRepository {
    async createUser(data: Partial<IUser>): Promise<IUser> {
        const user = await UserModel.create(data);
        return user;
    }

    async findByEmail(email: string): Promise<IUser | null> {
        const user = await UserModel.findOne({ email });
        return user;
    }

    async findById(id: string): Promise<IUser | null> {
        const user = await UserModel.findById(id);
        return user;
    }

    async findByIdWithPassword(id: string): Promise<IUser | null> {
        const user = await UserModel
            .findById(id)
            .select("+password");

        return user;
    }

    async updateById(
        id: string,
        data: Partial<IUser>
    ): Promise<IUser | null> {
        const user = await UserModel.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true,
            }
        );

        return user;
    }

    async deleteById(id: string): Promise<IUser | null> {
        const user = await UserModel.findByIdAndDelete(id);
        return user;
    }
}

export const userRepository = new UserRepository();