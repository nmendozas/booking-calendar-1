import { useStyletron } from "baseui";
import { Button } from "baseui/button";

interface Props {
	onAddClick: () => void;
	t: (key: string) => string;
}

export default function SlotsHeader({ onAddClick, t }: Props) {
	const [css] = useStyletron();

	return (
		<div
			className={css({
				display: "flex",
				justifyContent: "space-between",
				alignItems: "flex-start",
				flexWrap: "wrap",
				marginBottom: "24px",
				gap: "16px",
			})}
		>
			<div className={css({ flex: "1 1 220px", minWidth: 0 })}>
				<h1
					className={css({
						fontSize: "28px",
						fontWeight: 700,
						color: "var(--color-text-primary)",
						marginTop: 0,
						marginBottom: "8px",
					})}
				>
					{t("slots.title")}
				</h1>
				<p
					className={css({
						fontSize: "14px",
						lineHeight: 1.5,
						color: "var(--color-text-subtle)",
						margin: 0,
						maxWidth: "760px",
					})}
				>
					{t("slots.description")}
				</p>
			</div>
			<Button
				onClick={onAddClick}
				overrides={{
					BaseButton: {
						style: { whiteSpace: "nowrap", flexShrink: 0 },
					},
				}}
			>
				{t("slots.addSlot")}
			</Button>
		</div>
	);
}
