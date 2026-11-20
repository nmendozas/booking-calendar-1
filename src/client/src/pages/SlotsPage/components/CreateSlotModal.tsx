import { Button, KIND, SIZE } from "baseui/button";
import { Checkbox } from "baseui/checkbox";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import {
	Modal,
	ModalBody,
	ModalButton,
	ModalFooter,
	ModalHeader,
} from "baseui/modal";
import { useState } from "react";
import { DEFAULT_CAR_SEATS } from "../hooks/useSlotsPage";

interface Props {
	endAt: string;
	isOpen: boolean;
	loading: boolean;
	onClose: () => void;
	onCreate: () => void;
	selectedSeats: string[];
	setSelectedSeats: (seats: string[]) => void;
	setSlotName: (value: string) => void;
	setEndAt: (value: string) => void;
	setStartAt: (value: string) => void;
	slotName: string;
	startAt: string;
	t: (key: string) => string;
	isEditing?: boolean;
}

export default function CreateSlotModal({
	endAt,
	isOpen,
	loading,
	onClose,
	onCreate,
	selectedSeats,
	setSelectedSeats,
	setSlotName,
	setEndAt,
	setStartAt,
	slotName,
	startAt,
	t,
	isEditing = false,
}: Props) {
	const [customSeat, setCustomSeat] = useState("");

	const allKnownSeats = Array.from(
		new Set([...DEFAULT_CAR_SEATS, ...selectedSeats]),
	);

	const toggleSeat = (seat: string) => {
		if (selectedSeats.includes(seat)) {
			setSelectedSeats(selectedSeats.filter((item) => item !== seat));
		} else {
			setSelectedSeats([...selectedSeats, seat]);
		}
	};

	const handleAddCustomSeat = () => {
		const trimmed = customSeat.trim();
		if (!trimmed) return;
		if (!selectedSeats.includes(trimmed)) {
			setSelectedSeats([...selectedSeats, trimmed]);
		}
		setCustomSeat("");
	};
	return (
		<Modal
			onClose={onClose}
			isOpen={isOpen}
			overrides={{
				Dialog: {
					style: {
						backgroundColor: "var(--color-bg-secondary)",
						borderRadius: "12px",
					},
				},
			}}
		>
			<ModalHeader>
				{isEditing ? t("slots.editTitle") : t("slots.createTitle")}
			</ModalHeader>
			<ModalBody>
				<FormControl label={t("slots.name")}>
					<Input
						value={slotName}
						placeholder={t("slots.namePlaceholder")}
						onChange={(e) => setSlotName(e.currentTarget.value)}
					/>
				</FormControl>
				<FormControl label={t("slots.startTime")}>
					<Input
						type="datetime-local"
						value={startAt}
						onChange={(e) => setStartAt(e.currentTarget.value)}
						overrides={{
							Root: {
								style: {
									borderColor: "var(--color-accent-300)",
									borderWidth: "1px",
									backgroundColor: "var(--color-bg-tertiary)",
								},
							},
						}}
					/>
				</FormControl>
				<FormControl label={t("slots.endTime")}>
					<Input
						type="datetime-local"
						value={endAt}
						onChange={(e) => setEndAt(e.currentTarget.value)}
						overrides={{
							Root: {
								style: {
									borderColor: "var(--color-accent-300)",
									borderWidth: "1px",
									backgroundColor: "var(--color-bg-tertiary)",
								},
							},
						}}
					/>
				</FormControl>
				<FormControl
					label={`${t("slots.seatsLabel")} (${selectedSeats.length})`}
					caption={t("slots.seatsHint")}
				>
					<div style={{ display: "grid", gap: "8px" }}>
						{allKnownSeats.map((seat) => (
							<Checkbox
								key={seat}
								checked={selectedSeats.includes(seat)}
								onChange={() => toggleSeat(seat)}
							>
								{seat}
							</Checkbox>
						))}
						<div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
							<Input
								value={customSeat}
								placeholder={t("slots.customSeatPlaceholder")}
								onChange={(e) => setCustomSeat(e.currentTarget.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										handleAddCustomSeat();
									}
								}}
							/>
							<Button
								type="button"
								kind={KIND.secondary}
								size={SIZE.compact}
								onClick={handleAddCustomSeat}
							>
								{t("slots.addSeat")}
							</Button>
						</div>
					</div>
				</FormControl>
			</ModalBody>
			<ModalFooter>
				<div
					style={{
						display: "flex",
						gap: "10px",
						justifyContent: "flex-end",
						width: "100%",
					}}
				>
					<ModalButton kind={KIND.tertiary} onClick={onClose}>
						{t("slots.cancel")}
					</ModalButton>
					<ModalButton onClick={onCreate} isLoading={loading}>
						{isEditing ? t("slots.save") : t("slots.create")}
					</ModalButton>
				</div>
			</ModalFooter>
		</Modal>
	);
}
