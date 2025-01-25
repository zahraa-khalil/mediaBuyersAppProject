import { IsArray, IsInt, IsNotEmpty, IsString, IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

export class AddTeamMembersDto {
  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MemberDto)
  members: MemberDto[];
}
