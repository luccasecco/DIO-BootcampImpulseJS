import db from "../db";
import DatabaseError from "../models/errors/databaseError";
import User from "../models/userModel";

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const query = `
    SELECT uuid, userName 
    FROM application_user
    `;

    const { rows } = await db.query<User>(query);
    return rows || [];
  }

  async findById(uuid:string): Promise<User> {
    try {
      const query = `
      SELECT uuid, userName 
      FROM application_user
      WHERE uuid = $1
      `;
  
      const values = [uuid];
      const { rows } = await db.query<User>(query, values);
      const [ user ] = rows;
      
      return user
    } catch (error) {
      
      throw new DatabaseError("Error in consult by ID", error);
    }

  }

  async findByUsernameAndPassword(userName: string, password: string): Promise<User | null> {
    
    try {
      const query = `
      SELECT uuid, userName 
      FROM application_user
      WHERE userName = $1 and
      password = crypt($2, 'xxxxxxx') 
    `
    const values = [userName, password];
    const { rows } = await db.query<User>(query, values);
    const [ user ] = rows;
    return user || null;
    } catch (error) {
      throw new DatabaseError('User not found', error)
    }
  }


  async create(user: User): Promise<string> {
    const script = `INSERT INTO application_user (userName, password) VALUES ($1, crypt($2, 'xxxxxxx')) RETURNING uuid`;
    
    const values = [user.userName, user.password];
    const { rows } = await db.query<{uuid: string }>(script, values);
    const [ newUser] = rows;

    return newUser.uuid;
  }

  async update(user: User): Promise<void> {
    const script = `UPDATE application_user SET userName = $1, password = crypt($2, 'xxxxxxx') WHERE uuid = $3`;
    
    const values = [user.userName, user.password, user.uuid];
    await db.query(script, values);
   
  }

  async remove(uuid: string): Promise<void> {
    const script = `DELETE FROM application_user WHERE uuid = $1`;

    const values = [uuid];
    await db.query(script, values);
  }
}

export default new UserRepository();