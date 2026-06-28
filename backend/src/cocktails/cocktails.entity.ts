import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Cocktails {
  @ApiProperty({
    example: 1,
    description: "Cocktail identifier",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Green Punch", description: "Name of the cocktail" })
  @Column()
  title: string;

  @ApiProperty({ example: "Refreshing non-alcoholic punch" })
  @Column()
  description: string;

  @ApiProperty({ example: 2.99 })
  @Column()
  price: number;
}
