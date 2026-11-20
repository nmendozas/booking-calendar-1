import { In } from "typeorm";
import { AppDataSource } from "../db/data-source";
import { AvailabilitySlotEntity } from "../entities/AvailabilitySlotEntity";
import type { AvailabilitySlot, CreateSlotInput } from "../types";

function parseSeats(raw: string | null | undefined): string[] | null {
	if (!raw) return null;
	try {
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return null;
		const cleaned = parsed
			.filter((item): item is string => typeof item === "string")
			.map((item) => item.trim())
			.filter(Boolean);
		return cleaned.length > 0 ? cleaned : null;
	} catch {
		return null;
	}
}

function mapSlot(entity: AvailabilitySlotEntity): AvailabilitySlot {
	return {
		id: entity.id,
		name: entity.name,
		start_at: entity.start_at,
		end_at: entity.end_at,
		is_active: entity.is_active,
		seats: parseSeats(entity.seats),
		created_at: entity.created_at,
	};
}

export class SlotRepository {
	private repo() {
		return AppDataSource.getRepository(AvailabilitySlotEntity);
	}

	async findAll(): Promise<AvailabilitySlot[]> {
		const rows = await this.repo().find({ order: { start_at: "ASC" } });
		return rows.map(mapSlot);
	}

	async findActive(): Promise<AvailabilitySlot[]> {
		const rows = await this.repo().find({
			where: { is_active: 1 },
			order: { start_at: "ASC" },
		});
		return rows.map(mapSlot);
	}

	async findAvailable(): Promise<AvailabilitySlot[]> {
		return this.findActive();
	}

	async findAvailableByIds(ids: number[]): Promise<AvailabilitySlot[]> {
		if (ids.length === 0) return [];

		const rows = await this.repo().find({
			where: { is_active: 1, id: In(ids) },
			order: { start_at: "ASC" },
		});
		return rows.map(mapSlot);
	}

	async findByIds(ids: number[]): Promise<AvailabilitySlot[]> {
		if (ids.length === 0) return [];

		const rows = await this.repo().find({
			where: { id: In(ids) },
		});
		return rows.map(mapSlot);
	}

	async findById(id: number): Promise<AvailabilitySlot | null> {
		const row = await this.repo().findOneBy({ id });
		return row ? mapSlot(row) : null;
	}

	async create(input: CreateSlotInput): Promise<AvailabilitySlot> {
		const created = this.repo().create({
			name: input.name,
			start_at: input.start_at,
			end_at: input.end_at,
			seats:
				input.seats && input.seats.length > 0
					? JSON.stringify(input.seats)
					: null,
			is_active: 1,
		});
		const saved = await this.repo().save(created);
		return mapSlot(saved);
	}

	async update(
		id: number,
		payload: {
			is_active?: boolean;
			name?: string;
			start_at?: string;
			end_at?: string;
			seats?: string[] | null;
		},
	): Promise<AvailabilitySlot | null> {
		const updatePayload: {
			is_active?: number;
			name?: string;
			start_at?: string;
			end_at?: string;
			seats?: string | null;
		} = {};
		if (payload.is_active !== undefined) {
			updatePayload.is_active = payload.is_active ? 1 : 0;
		}
		if (payload.name !== undefined) {
			updatePayload.name = payload.name;
		}
		if (payload.start_at !== undefined) {
			updatePayload.start_at = payload.start_at;
		}
		if (payload.end_at !== undefined) {
			updatePayload.end_at = payload.end_at;
		}
		if (payload.seats !== undefined) {
			updatePayload.seats =
				payload.seats && payload.seats.length > 0
					? JSON.stringify(payload.seats)
					: null;
		}

		await this.repo().update(id, updatePayload);
		return this.findById(id);
	}

	async delete(id: number): Promise<boolean> {
		const result = await this.repo().delete(id);
		return !!result.affected;
	}
}
