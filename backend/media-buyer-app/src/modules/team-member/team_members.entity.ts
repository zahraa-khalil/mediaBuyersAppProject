import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Company } from '../companies/company.entity';
import { User } from '../users/user.entity';

@Entity('team_members')
export class TeamMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, (company) => company.id)
  company: Company;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  user: User;

  @Column({ length: 255, unique: true })
  email: string; // Add this field

  @Column({ length: 255 })
  name: string; // Add this field

  @Column({ length: 50 })
  role: string;

  @Column({ length: 50, default: 'pending' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
