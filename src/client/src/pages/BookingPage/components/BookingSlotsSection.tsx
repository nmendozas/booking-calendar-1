import { useStyletron } from "baseui";
import type { BusyInterval, Slot } from "../hooks/useBookingPage";
import SlotSelector from "./SlotSelector";

interface Props {
	formatDate: (date: string) => string;
	onSelect: (slot: Slot) => void;
	selectedSeat: string;
	onSelectSeat: (seat: string) => void;
	selectedSlotBusyIntervals: BusyInterval[];
	selectedSlot: number | null;
	selectedSlotData: Slot | null;
	slots: Slot[];
	t: (key: string) => string;
}

export default function BookingSlotsSection({
	formatDate,
	onSelect,
	selectedSeat,
	onSelectSeat,
	selectedSlotBusyIntervals,
	selectedSlot,
	selectedSlotData,
	slots,
	t,
}: Props) {
	const [css] = useStyletron();
	const configuredSeats = selectedSlotData?.seats ?? [];
	const bookedSeats = selectedSlotData?.booked_seats ?? [];

	return (
		<div className={css({ marginBottom: "32px" })}>
			<h2
				className={css({
					fontSize: "16px",
					fontWeight: 600,
					color: "var(--color-text-primary)",
					marginBottom: "12px",
				})}
			>
				{t("booking.availableTimes")}
			</h2>
			<SlotSelector
				slots={slots}
				selectedSlot={selectedSlot}
				onSelect={onSelect}
				formatDate={formatDate}
				t={t}
			/>

			{selectedSlot !== null && configuredSeats.length > 0 && (
				<div
					className={css({
						marginTop: "16px",
						padding: "14px",
						borderRadius: "10px",
						border: "1px solid var(--color-accent-300)",
						backgroundColor: "var(--color-bg-secondary)",
					})}
				>
					<div
						className={css({
							fontSize: "13px",
							fontWeight: 600,
							color: "var(--color-text-secondary)",
							marginBottom: "10px",
						})}
					>
						{t("booking.selectSeat")}
					</div>

					<div
						className={css({
							display: "grid",
							gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
							gap: "8px",
						})}
					>
						{configuredSeats.map((seat) => {
							const isBooked = bookedSeats.includes(seat);
							const isSelected = selectedSeat === seat;
							return (
								<button
									key={seat}
									type="button"
									disabled={isBooked}
									onClick={() => onSelectSeat(seat)}
									className={css({
										padding: "10px 12px",
										borderRadius: "8px",
										border: isSelected
											? "2px solid var(--color-accent-600)"
											: "1px solid var(--color-accent-300)",
										backgroundColor: isSelected
											? "var(--color-accent-300)"
											: isBooked
												? "var(--color-bg-primary)"
												: "var(--color-bg-tertiary)",
										color: isBooked
											? "var(--color-text-disabled)"
											: "var(--color-text-primary)",
										cursor: isBooked ? "not-allowed" : "pointer",
										opacity: isBooked ? 0.6 : 1,
										textAlign: "left",
										fontSize: "13px",
										fontWeight: isSelected ? 700 : 500,
									})}
								>
									<div>{seat}</div>
									<div
										className={css({
											fontSize: "11px",
											marginTop: "2px",
											color: isBooked
												? "var(--color-error-text)"
												: "var(--color-success-text)",
										})}
									>
										{isBooked
											? t("booking.seatOccupied")
											: t("booking.seatFree")}
									</div>
								</button>
							);
						})}
					</div>
				</div>
			)}

			{selectedSlot !== null && configuredSeats.length === 0 && (
				<div
					className={css({
						marginTop: "16px",
						padding: "14px",
						borderRadius: "10px",
						border: "1px solid var(--color-accent-300)",
						backgroundColor: "var(--color-bg-secondary)",
					})}
				>
					<div
						className={css({
							fontSize: "13px",
							fontWeight: 600,
							color: "var(--color-text-secondary)",
							marginBottom: "8px",
						})}
					>
						{t("booking.occupiedTimes")}
					</div>

					{selectedSlotBusyIntervals.length === 0 ? (
						<div
							className={css({
								color: "var(--color-text-tertiary)",
								fontSize: "13px",
							})}
						>
							{t("booking.noOccupiedTimes")}
						</div>
					) : (
						<div className={css({ display: "grid", gap: "6px" })}>
							{selectedSlotBusyIntervals.map((interval) => (
								<div
									key={`${interval.start_at}-${interval.end_at}`}
									className={css({
										color: "var(--color-text-primary)",
										fontSize: "13px",
									})}
								>
									{formatDate(interval.start_at)} -{" "}
									{formatDate(interval.end_at)}
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
