import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity({ name: "admin_credentials" })
export class AdminCredentialEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "text", unique: true })
	username!: string;

	@Column({ type: "text" })
	password_hash!: string;

	@Column({ type: "boolean", default: true })
	is_default_password!: boolean;

	@CreateDateColumn()
	created_at!: string;

	@UpdateDateColumn()
	updated_at!: string;
}
