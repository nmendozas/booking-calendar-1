import { useStyletron } from "baseui";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppToaster from "../../components/AppToaster";
import { useI18n } from "../../context/I18nContext";
import BookingFormSection from "./components/BookingFormSection";
import BookingHeader from "./components/BookingHeader";
import BookingInvalidState from "./components/BookingInvalidState";
import BookingLoadingState from "./components/BookingLoadingState";
import BookingSlotsSection from "./components/BookingSlotsSection";
import { useBookingPage } from "./hooks/useBookingPage";

export default function BookingPage() {
	const [css] = useStyletron();
	const navigate = useNavigate();
	const { t, locale } = useI18n();
	const { slugId } = useParams<{ slugId: string }>();
	const {
		email,
		handleSubmit,
		loading,
		meetingPlace,
		name,
		note,
		selectedEndAt,
		selectedSeat,
		selectedSlot,
		selectedSlotData,
		selectedSlotBusyIntervals,
		selectedStartAt,
		selectSlot,
		setEmail,
		setMeetingPlace,
		setName,
		setNote,
		setSelectedSeat,
		setSelectedEndAt,
		setSelectedStartAt,
		setWhatsapp,
		whatsapp,
		slots,
		createdAppointmentToken,
		valid,
	} = useBookingPage(slugId, t);

	useEffect(() => {
		if (!createdAppointmentToken) return;
		navigate(`/appointment/${createdAppointmentToken}`, { replace: true });
	}, [createdAppointmentToken, navigate]);

	const formatDate = (d: string) =>
		new Date(d).toLocaleString(locale, {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});

	// Loading state
	if (valid === null) {
		return <BookingLoadingState message={t("booking.loading")} />;
	}

	// Invalid slug id
	if (!valid) {
		return (
			<BookingInvalidState
				title={t("booking.invalidTitle")}
				message={t("booking.invalidMessage")}
			/>
		);
	}

	return (
		<div
			className={css({
				minHeight: "100vh",
				backgroundColor: "var(--color-bg-primary)",
				padding: "24px",
				display: "flex",
				justifyContent: "center",
			})}
		>
			<AppToaster />

			<div
				className={css({
					width: "100%",
					maxWidth: "1120px",
					paddingTop: "40px",
				})}
			>
				<BookingHeader
					title={t("booking.title")}
					subtitle={t("booking.subtitle")}
				/>

				<div
					className={css({
						display: "grid",
						gap: "24px",
						alignItems: "start",
						justifyContent: selectedSlot ? "stretch" : "center",
						"@media screen and (min-width: 960px)": {
							gridTemplateColumns: selectedSlot
								? "minmax(320px, 420px) minmax(0, 1fr)"
								: "minmax(320px, 420px)",
						},
					})}
				>
					<div
						className={css({
							width: "100%",
							maxWidth: "420px",
							justifySelf: selectedSlot ? "stretch" : "center",
						})}
					>
						<BookingSlotsSection
							slots={slots}
							selectedSlot={selectedSlot}
							selectedSlotData={selectedSlotData}
							selectedSeat={selectedSeat}
							onSelectSeat={setSelectedSeat}
							selectedSlotBusyIntervals={selectedSlotBusyIntervals}
							onSelect={selectSlot}
							formatDate={formatDate}
							t={t}
						/>
					</div>

					{selectedSlot && (
						<div
							className={css({
								minWidth: 0,
								"@media screen and (min-width: 960px)": {
									position: "sticky",
									top: "24px",
								},
							})}
						>
							<BookingFormSection
								email={email}
								handleSubmit={handleSubmit}
								loading={loading}
								meetingPlace={meetingPlace}
								name={name}
								note={note}
								selectedEndAt={selectedEndAt}
								selectedStartAt={selectedStartAt}
								setEmail={setEmail}
								setMeetingPlace={setMeetingPlace}
								setName={setName}
								setNote={setNote}
								setSelectedEndAt={setSelectedEndAt}
								setSelectedStartAt={setSelectedStartAt}
								setWhatsapp={setWhatsapp}
								whatsapp={whatsapp}
								selectedSeat={selectedSeat}
								isSeatTrip={Boolean(
									selectedSlotData?.seats && selectedSlotData.seats.length > 0,
								)}
								t={t}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
