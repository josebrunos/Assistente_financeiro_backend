import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  pergunta: string;

  @Column({ type: 'text' })
  resposta: string;

  @CreateDateColumn()
  data_criacao: Date;
}
