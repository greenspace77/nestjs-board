import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
      super(User, dataSource.createEntityManager());
    }

  async createUser(authCredentialDto: AuthCredentialsDto): Promise<void> {
    const {username, password} = authCredentialDto;
    const user = this.create({
      username, 
      password
    });
    await this.save(user);
  }
}