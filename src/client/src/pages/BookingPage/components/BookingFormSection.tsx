import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";

interface Props {
	email: string;
	handleSubmit: (e: React.FormEvent) => Promise<void>;
	loading: boolean;
	meetingPlace: string;
	name: string;
	note: string;
	selectedEndAt: string;
	selectedStartAt: string;
	setEmail: (value: string) => void;
	setMeetingPlace: (value: string) => void;
	setName: (value: string) => void;
	setNote: (value: string) => void;
	setSelectedEndAt: (value: string) => void;
	setSelectedStartAt: (value: string) => void;
	setWhatsapp: (value: string) => void;
	whatsapp: string;
	selectedSeat?: string;
	isSeatTrip?: boolean;
	t: (key: string) => string;
}

export default function BookingFormSection({
	email,
	handleSubmit,
	loading,
	meetingPlace,
	name,
	note,
	selectedEndAt,
	selectedStartAt,
	setEmail,
	setMeetingPlace,
	setName,
	setNote,
	setSelectedEndAt,
	setSelectedStartAt,
	setWhatsapp,
	whatsapp,
	selectedSeat,
	isSeatTrip = false,
	t,
}: Props) {
	const [css] = useStyletron();

	return (
		<form
			onSubmit={handleSubmit}
			className={css({
				backgroundColor: "var(--color-bg-secondary)",
				borderRadius: "12px",
				padding: "24px",
				border: "1px solid var(--color-bg-quaternary)",
			})}
		>
			<h2
				className={css({
					fontSize: "16px",
					fontWeight: 600,
					color: "var(--color-text-primary)",
					marginBottom: "16px",
				})}
			>
				{t("booking.yourInfo")}
			</h2>

			{isSeatTrip && (
				<div
					className={css({
						marginBottom: "14px",
						padding: "10px 12px",
						borderRadius: "8px",
						backgroundColor: "var(--color-bg-tertiary)",
						border: "1px solid var(--color-accent-300)",
						fontSize: "13px",
						color: selectedSeat
							? "var(--color-text-primary)"
							: "var(--color-text-tertiary)",
					})}
				>
					<strong>{t("booking.selectedSeatLabel")}:</strong>{" "}
					{selectedSeat || t("booking.seatRequired")}
				</div>
			)}

			<FormControl label={t("booking.startTime")}>
				<Input
					type="datetime-local"
					value={selectedStartAt}
					onChange={(e) => setSelectedStartAt(e.currentTarget.value)}
					disabled={isSeatTrip}
					required
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

			<FormControl label={t("booking.endTime")}>
				<Input
					type="datetime-local"
					value={selectedEndAt}
					onChange={(e) => setSelectedEndAt(e.currentTarget.value)}
					disabled={isSeatTrip}
					required
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

			<FormControl label={t("booking.fullName")}>
				<Input
					value={name}
					onChange={(e) => setName(e.currentTarget.value)}
					placeholder={t("booking.fullNamePlaceholder")}
					required
				/>
			</FormControl>

			<FormControl
				label={t("booking.whatsapp")}
				caption={t("booking.whatsappHelp")}
			>
				<Input
					value={whatsapp}
					onChange={(e) => setWhatsapp(e.currentTarget.value)}
					placeholder={t("booking.whatsappPlaceholder")}
					type="tel"
				/>
			</FormControl>

			<FormControl
				label={t("booking.email")}
				caption={t("booking.emailHelp")}
			>
				<Input
					value={email}
					onChange={(e) => setEmail(e.currentTarget.value)}
					placeholder="your@email.com"
					type="email"
				/>
			</FormControl>

			<FormControl label={t("booking.meetingPlace")}>
				<Input
					value={meetingPlace}
					onChange={(e) => setMeetingPlace(e.currentTarget.value)}
					placeholder={t("booking.meetingPlacePlaceholder")}
				/>
			</FormControl>

			<FormControl label={t("booking.note")}>
				<Textarea
					value={note}
					onChange={(e) => setNote(e.currentTarget.value)}
					placeholder={t("booking.notePlaceholder")}
				/>
			</FormControl>

			<Button
				type="submit"
				isLoading={loading}
				overrides={{
					BaseButton: {
						style: { width: "100%", marginTop: "8px" },
					},
				}}
			>
				{t("booking.submit")}
			</Button>
		</form>
	);
}
