import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Client } from '../clients/clients.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ type: 'text' })
  passwordHash: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  location: string;

  @Column({ default: false })
  facebookAuthenticated: boolean;

  @Column({ type: 'text', nullable: true })
  facebookToken: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Client, (client) => client.company)
  clients: Client[];
}
