import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Cocktails {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Green Punch" })
  @Column()
  title: string;

  @ApiProperty({ example: "Refreshing non-alcoholic punch" })
  @Column()
  description: string;

  @ApiProperty({ example: 2.99 })
  @Column()
  price: number;
}
